import { createElement } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, type MockInstance, test, vi } from "vitest";
import { page } from "vitest/browser";
import { useIsMobile } from "@/registry/core/hooks/use-mobile";

const MOBILE = { width: 375, height: 800 };
const DESKTOP = { width: 1280, height: 800 };
const BREAKPOINT = { width: 768, height: 800 };

type ObservedQuery = {
	query: string;
	add: MockInstance<MediaQueryList["addEventListener"]>;
	remove: MockInstance<MediaQueryList["removeEventListener"]>;
};

const rendered: boolean[] = [];
const cleanups: Array<() => void> = [];

function Probe() {
	const isMobile = useIsMobile();
	rendered.push(isMobile);
	return createElement("span", null, String(isMobile));
}

function container() {
	const element = document.createElement("div");
	document.body.append(element);
	return element;
}

function track(element: Element, root: Root) {
	let mounted = true;
	const unmount = () => {
		if (!mounted) return;
		mounted = false;
		root.unmount();
		element.remove();
	};
	cleanups.push(unmount);
	return unmount;
}

function render() {
	const element = container();
	const root = createRoot(element);
	const unmount = track(element, root);
	root.render(createElement(Probe));
	return { element, unmount };
}

function observeMediaQueries() {
	const observed: ObservedQuery[] = [];
	const matchMedia = window.matchMedia.bind(window);

	vi.spyOn(window, "matchMedia").mockImplementation((query) => {
		const list = matchMedia(query);
		observed.push({
			query,
			add: vi.spyOn(list, "addEventListener"),
			remove: vi.spyOn(list, "removeEventListener"),
		});
		return list;
	});

	return observed;
}

// Two frames pass React's effects and any re-render they schedule.
function settle() {
	return new Promise<void>((resolve) =>
		requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
	);
}

afterEach(() => {
	for (const cleanup of cleanups.splice(0)) cleanup();
	vi.restoreAllMocks();
	rendered.length = 0;
});

test("reports a narrow viewport on the first render", async () => {
	await page.viewport(MOBILE.width, MOBILE.height);

	const { element } = render();
	await vi.waitUntil(() => rendered.length > 0);

	expect(rendered[0]).toBe(true);
	expect(element.textContent).toBe("true");

	await settle();
	expect(rendered).toEqual([true]);
});

test("reports the breakpoint width as wide", async () => {
	await page.viewport(BREAKPOINT.width, BREAKPOINT.height);

	render();
	await vi.waitUntil(() => rendered.length > 0);

	expect(rendered[0]).toBe(false);

	await settle();
	expect(rendered).toEqual([false]);
});

test("follows the viewport across the breakpoint", async () => {
	await page.viewport(DESKTOP.width, DESKTOP.height);

	const { element } = render();
	await vi.waitFor(() => expect(element.textContent).toBe("false"));

	await page.viewport(MOBILE.width, MOBILE.height);
	await vi.waitFor(() => expect(element.textContent).toBe("true"));

	await page.viewport(DESKTOP.width, DESKTOP.height);
	await vi.waitFor(() => expect(element.textContent).toBe("false"));
});

test("removes its listener when the component unmounts", async () => {
	await page.viewport(MOBILE.width, MOBILE.height);
	const queries = observeMediaQueries();

	const { unmount } = render();
	await vi.waitUntil(() => rendered.length > 0);

	const subscribed = queries.filter(({ add }) => add.mock.calls.length > 0);
	expect(subscribed).toHaveLength(1);
	const [type, listener] = subscribed[0].add.mock.calls[0];

	unmount();

	expect(subscribed[0].remove).toHaveBeenCalledWith(type, listener);
});

test("renders on a server that has no viewport to read", async () => {
	await page.viewport(MOBILE.width, MOBILE.height);
	vi.spyOn(window, "matchMedia").mockImplementation(() => {
		throw new Error("a server render read window.matchMedia");
	});

	const markup = renderToStaticMarkup(createElement(Probe));

	expect(markup).toBe("<span>false</span>");
	expect(rendered).toEqual([false]);
});

test("hydrates server markup on a narrow viewport with no mismatch", async () => {
	await page.viewport(MOBILE.width, MOBILE.height);
	const element = container();
	element.innerHTML = renderToStaticMarkup(createElement(Probe));
	rendered.length = 0;
	const onRecoverableError = vi.fn();

	const root = hydrateRoot(element, createElement(Probe), {
		onRecoverableError,
	});
	track(element, root);

	await vi.waitFor(() => expect(rendered).toEqual([false, true]));

	expect(element.textContent).toBe("true");
	expect(onRecoverableError).not.toHaveBeenCalled();
});

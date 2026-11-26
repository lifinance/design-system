import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
	afterEach,
	beforeEach,
	expect,
	type MockInstance,
	test,
	vi,
} from "vitest";
import { useDevWarning } from "@/registry/core/hooks/use-dev-warning";

let warn: MockInstance<typeof console.warn>;
const roots: Root[] = [];

function Probe({
	condition,
	message,
}: {
	condition: boolean;
	message: string;
}) {
	useDevWarning(condition, message);
	return null;
}

function render(props: { condition: boolean; message: string }) {
	const root = createRoot(document.createElement("div"));
	roots.push(root);
	act(() => {
		root.render(createElement(Probe, props));
	});
	return root;
}

beforeEach(() => {
	warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
	for (const root of roots.splice(0)) act(() => root.unmount());
	warn.mockRestore();
});

test("logs nothing while the condition is false", () => {
	render({ condition: false, message: "quiet" });
	expect(warn).not.toHaveBeenCalled();
});

test("logs a message once, however many components hit it", () => {
	const hit = { condition: true, message: "repeated" };
	render(hit);
	render(hit);
	render(hit);
	expect(warn).toHaveBeenCalledTimes(1);
	expect(warn).toHaveBeenCalledWith("repeated");
});

test("logs when the condition turns true after mount", () => {
	const root = render({ condition: false, message: "later" });
	expect(warn).not.toHaveBeenCalled();
	act(() => {
		root.render(createElement(Probe, { condition: true, message: "later" }));
	});
	expect(warn).toHaveBeenCalledWith("later");
});

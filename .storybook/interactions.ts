import { expect, waitFor } from "storybook/test";

const focusedElement = () =>
	document.activeElement instanceof HTMLElement ? document.activeElement : null;

/**
 * Waits until the keyboard focus sits inside an open popup. Base UI moves the
 * initial focus from a `requestAnimationFrame` callback, so a popup is visible
 * for at least one frame before it accepts keys, and a key sent in that frame
 * goes to the trigger instead. Call this before the first key.
 */
export async function waitForFocusWithin(popup: HTMLElement) {
	await waitFor(() => expect(popup).toContainElement(focusedElement()));
}

/**
 * Delays every animation frame callback by `ms` and returns a restore function.
 * The delay widens the gap between a popup becoming visible and Base UI moving
 * the focus into it, so a play function that sends a key too early fails on
 * every run instead of at random. Call the restore function in a `finally`.
 */
export function delayAnimationFrames(ms: number) {
	const browserRequestAnimationFrame = window.requestAnimationFrame;
	window.requestAnimationFrame = (callback: FrameRequestCallback) =>
		window.setTimeout(() => callback(performance.now()), ms);
	return () => {
		window.requestAnimationFrame = browserRequestAnimationFrame;
	};
}

/**
 * Moves the browser pointer to the center of `element`, which puts the element
 * into the CSS `:hover` state so a `hover:` utility paints. Storybook's
 * `userEvent.hover` dispatches pointer events without setting `:hover`. Call
 * this outside a `waitFor` callback. The pointer leaves the element when the
 * test ends.
 */
export async function hover(element: Element) {
	const { cdp } = await import("vitest/browser");
	const { onTestFinished } = await import("vitest");
	const session = cdp();
	const movePointer = (x: number, y: number) =>
		session.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });

	// Later test files run in the same page, so the pointer moves off at the end.
	onTestFinished(async () => {
		await movePointer(-1, -1);
	});

	const frame = window.frameElement?.getBoundingClientRect();
	const box = element.getBoundingClientRect();
	// The story renders in a scaled iframe and the pointer takes page coordinates.
	const scale = frame ? frame.width / window.innerWidth : 1;
	await movePointer(
		(frame?.left ?? 0) + (box.left + box.width / 2) * scale,
		(frame?.top ?? 0) + (box.top + box.height / 2) * scale,
	);
	await waitFor(() => expect(element.matches(":hover")).toBe(true));
}

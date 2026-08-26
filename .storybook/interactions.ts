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

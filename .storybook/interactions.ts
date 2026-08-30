import type { UserEventObject } from "storybook/test";
import { expect, waitFor } from "storybook/test";

const focusedElement = () =>
	document.activeElement instanceof HTMLElement ? document.activeElement : null;

/**
 * Waits until the keyboard focus sits on `target` or inside it. Base UI settles
 * the focus of an open popup from a `requestAnimationFrame` callback, so a key
 * sent in the frame after the popup appears goes elsewhere. Call this before
 * the first key with the element that holds the focus while the popup is open,
 * which is the popup itself for a menu and the input for a combobox.
 */
export async function waitForFocusWithin(target: HTMLElement) {
	await waitFor(() => expect(target).toContainElement(focusedElement()));
}

/**
 * Sends `keys` until `expectation` passes. A key press reaches a popup once and
 * is then gone, and Base UI gives an open popup the keyboard from a callback,
 * so the first key after the popup opens can arrive before the popup reads it.
 * A wait placed before the press cannot close that window, because it reports a
 * state that was true in the past. Pass only keys that leave the same state
 * when they repeat, such as `Home` and `End`.
 */
export async function pressUntil(
	userEvent: UserEventObject,
	keys: string,
	expectation: () => void,
) {
	await waitFor(
		async () => {
			await userEvent.keyboard(keys);
			expectation();
		},
		{ interval: 250 },
	);
}

function withPatchedPlay<Context>(
	play: ((context: Context) => unknown) | undefined,
	patch: () => () => void,
) {
	return async (context: Context) => {
		const restore = patch();
		try {
			await play?.(context);
		} finally {
			restore();
		}
	};
}

function delayAnimationFrames(ms: number) {
	const browserRequestAnimationFrame = window.requestAnimationFrame;
	window.requestAnimationFrame = (callback: FrameRequestCallback) =>
		window.setTimeout(() => callback(performance.now()), ms);
	return () => {
		window.requestAnimationFrame = browserRequestAnimationFrame;
	};
}

/**
 * Wraps `play` so it runs with every animation frame callback delayed. The
 * delay widens the gap between a popup becoming visible and Base UI settling
 * the focus, so a play function that sends a key too early fails on every run
 * instead of at random. Spread the original story and pass its `play` to get a
 * regression copy of it, tagged `!autodocs` so it stays off the docs page.
 */
export function withDelayedFocus<Context>(
	play: ((context: Context) => unknown) | undefined,
) {
	return withPatchedPlay<Context>(play, () => delayAnimationFrames(300));
}

function loseFirstKeyInsideList() {
	const loseKey = (event: KeyboardEvent) => {
		const target = event.target;
		if (target instanceof Element && target.closest('[role="listbox"]')) {
			event.stopPropagation();
			document.removeEventListener("keydown", loseKey, true);
		}
	};
	document.addEventListener("keydown", loseKey, true);
	return () => {
		document.removeEventListener("keydown", loseKey, true);
	};
}

/**
 * Wraps `play` so the first key that arrives inside an open list never reaches
 * a keyboard handler. A play function meets that state when it sends a key
 * before Base UI gives the open popup the keyboard, so a play function that
 * presses a key once fails on every run instead of at random. Spread the
 * original story and pass its `play` to get a regression copy of it, tagged
 * `!autodocs` so it stays off the docs page.
 */
export function withDelayedKeyboardHandover<Context>(
	play: ((context: Context) => unknown) | undefined,
) {
	return withPatchedPlay<Context>(play, loseFirstKeyInsideList);
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

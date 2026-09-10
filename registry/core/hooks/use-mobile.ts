import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribe(onChange: () => void) {
	const query = window.matchMedia(MOBILE_QUERY);
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
	return window.matchMedia(MOBILE_QUERY).matches;
}

// A server has no viewport to measure, and React reads the same value for the
// render that hydrates the markup the server sent.
function getServerSnapshot() {
	return false;
}

export function useIsMobile() {
	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

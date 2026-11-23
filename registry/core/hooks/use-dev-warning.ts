import * as React from "react";

const warned = new Set<string>();

/** Logs `message` to the console in development while `condition` is true.
 * Each message logs once per page, however many components hit it. */
export function useDevWarning(condition: boolean, message: string) {
	React.useEffect(() => {
		if (process.env.NODE_ENV === "production") return;
		if (!condition || warned.has(message)) return;
		warned.add(message);
		console.warn(message);
	}, [condition, message]);
}

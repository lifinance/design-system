/// <reference types="vite/client" />

import {
	buildThemeModes,
	deriveThemes,
	type Manifest,
	type Theme,
} from "./theme-registry";

// Every registry manifest in the repo root. A new brand's manifest joins the
// toolbar, the theme CSS, and the snapshot modes without further wiring.
// vite.config.ts derives the same set for the test projects through its own
// loader, since import.meta.glob only exists inside the Vite pipeline.
const manifests = Object.values(
	import.meta.glob<Manifest>("../registry*.json", {
		eager: true,
		import: "default",
	}),
);

export type { Theme };

export const themes = deriveThemes(manifests);

// Chromatic opt-ins. The preview disables snapshots globally; a story opts in
// by setting one of these as its chromatic parameter.

// One frame in light and dark.
export const snapshot = {
	disableSnapshot: false,
	modes: { light: { mode: "light" }, dark: { mode: "dark" } },
};

// One frame in every overridden theme and mode.
export const themeSnapshot = {
	disableSnapshot: false,
	modes: buildThemeModes(themes),
};

// One frame in a single brand's themes and modes.
export const brandSnapshot = (brand: string) => ({
	disableSnapshot: false,
	modes: buildThemeModes(themes.filter((theme) => theme.brand === brand)),
});

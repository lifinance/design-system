import { describe, expect, it } from "vitest";
import {
	buildThemeCss,
	buildThemeModes,
	deriveThemes,
	type Manifest,
	overridden,
} from "./theme-registry";

const core: Manifest = {
	name: "core",
	items: [
		{
			name: "tokens",
			type: "registry:theme",
			cssVars: {
				light: {
					background: "white",
					secondary: "light-gray",
					link: "var(--secondary)",
				},
				dark: {
					background: "black",
					secondary: "dark-gray",
					link: "var(--secondary)",
				},
			},
		},
		{ name: "base", type: "registry:style" },
	],
};

const brand: Manifest = {
	name: "brand",
	items: [
		{
			name: "tokens",
			type: "registry:theme",
			cssVars: {
				light: { secondary: "pink", radius: "1rem" },
				dark: { background: "navy" },
			},
		},
		{
			name: "tokens-alt",
			type: "registry:theme",
			cssVars: { light: { background: "ivory" } },
		},
	],
};

const bare: Manifest = {
	name: "bare",
	items: [{ name: "tokens", type: "registry:theme", cssVars: {} }],
};

describe("deriveThemes", () => {
	const themes = deriveThemes([brand, bare, core]);

	it("sorts core first and marks only its default theme as base", () => {
		expect(themes.map((theme) => theme.id)).toEqual([
			"core",
			"bare",
			"brand",
			"brand-alt",
		]);
		expect(themes.map((theme) => theme.isBase)).toEqual([
			true,
			false,
			false,
			false,
		]);
	});

	it("names variant themes <brand>-<variant> with a combined title", () => {
		const alt = themes.find((theme) => theme.id === "brand-alt");
		expect(alt).toMatchObject({
			title: "Brand / Alt",
			brand: "brand",
			source: "@brand/tokens-alt",
		});
	});

	it("detects dark support from the dark block", () => {
		expect(themes.find((theme) => theme.id === "brand")?.modes).toEqual([
			"light",
			"dark",
		]);
		expect(themes.find((theme) => theme.id === "brand-alt")?.modes).toEqual([
			"light",
		]);
	});

	it("ignores items that are not themes", () => {
		expect(themes.some((theme) => theme.source === "@core/base")).toBe(false);
	});
});

it("discovers selector-based theme items for preview and snapshot modes", () => {
	const perps: Manifest = {
		name: "perps",
		items: [
			{
				name: "jumper-tokens",
				type: "registry:item",
				css: {
					'body[data-theme="jumper"]': { "--primary": "purple" },
					'.dark body[data-theme="jumper"]': {
						"--primary": "dark-purple",
					},
				},
			},
		],
	};
	const theme = deriveThemes([core, perps]).find(
		(entry) => entry.id === "perps-jumper",
	);
	if (!theme) {
		throw new Error("Perps Jumper theme was not derived");
	}

	expect(theme).toMatchObject({
		title: "Perps / Jumper",
		brand: "perps",
		source: "@perps/jumper-tokens",
		modes: ["light", "dark"],
		cssVars: {
			light: { primary: "purple" },
			dark: { primary: "dark-purple" },
		},
	});
	expect(buildThemeModes([theme])).toEqual({
		"perps-jumper light": { theme: "perps-jumper", mode: "light" },
		"perps-jumper dark": { theme: "perps-jumper", mode: "dark" },
	});
	const css = buildThemeCss(deriveThemes([core, perps]));
	expect(css).toContain("--primary:purple;");
	expect(css).toContain("--primary:dark-purple;");
	expect(css).not.toContain("----primary");
});

describe("overridden", () => {
	const themes = deriveThemes([brand, bare, core]);

	it("keeps the base and any theme with overrides, drops empty ones", () => {
		expect(themes.filter(overridden).map((theme) => theme.id)).toEqual([
			"core",
			"brand",
			"brand-alt",
		]);
	});
});

describe("buildThemeModes", () => {
	it("emits one entry per overridden theme and mode", () => {
		expect(buildThemeModes(deriveThemes([brand, bare, core]))).toEqual({
			"core light": { theme: "core", mode: "light" },
			"core dark": { theme: "core", mode: "dark" },
			"brand light": { theme: "brand", mode: "light" },
			"brand dark": { theme: "brand", mode: "dark" },
			"brand-alt light": { theme: "brand-alt", mode: "light" },
		});
	});
});

describe("buildThemeCss", () => {
	const css = buildThemeCss(deriveThemes([brand, bare, core]));

	it("puts the base on :root and .dark", () => {
		expect(css).toContain(
			":root{--background:white;--secondary:light-gray;--link:var(--secondary);}",
		);
		expect(css).toContain(
			".dark{--background:black;--secondary:dark-gray;--link:var(--secondary);}",
		);
	});

	it("resolves the light block so a derived token reads the theme's value", () => {
		// --link reads --secondary. CSS substitutes a custom property where it is
		// declared, so the theme's own --secondary sits in the same block.
		expect(css).toContain(
			'[data-theme="brand"]{--background:white;--secondary:pink;--link:var(--secondary);--radius:1rem;}',
		);
	});

	it("resolves the dark block so light-only overrides cannot bleed", () => {
		// brand overrides secondary in light only; dark mode must fall back to
		// the core dark value, exactly as a consumer install resolves it.
		expect(css).toContain(
			'.dark [data-theme="brand"]{--background:navy;--secondary:dark-gray;--link:var(--secondary);}',
		);
	});

	it("emits no dark block for a light-only theme", () => {
		expect(css).toContain(
			'[data-theme="brand-alt"]{--background:ivory;--secondary:light-gray;--link:var(--secondary);}',
		);
		expect(css).not.toContain('.dark [data-theme="brand-alt"]');
	});
});

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
				light: { background: "white", secondary: "light-gray" },
				dark: { background: "black", secondary: "dark-gray" },
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
		expect(css).toContain(":root{--background:white;--secondary:light-gray;}");
		expect(css).toContain(".dark{--background:black;--secondary:dark-gray;}");
	});

	it("scopes a theme's light overrides as a delta", () => {
		expect(css).toContain(
			'[data-theme="brand"]{--secondary:pink;--radius:1rem;}',
		);
	});

	it("resolves the dark block so light-only overrides cannot bleed", () => {
		// brand overrides secondary in light only; dark mode must fall back to
		// the core dark value, exactly as a consumer install resolves it.
		expect(css).toContain(
			'.dark [data-theme="brand"]{--background:navy;--secondary:dark-gray;}',
		);
	});

	it("emits no dark block for a light-only theme", () => {
		expect(css).toContain('[data-theme="brand-alt"]{--background:ivory;}');
		expect(css).not.toContain('.dark [data-theme="brand-alt"]');
	});
});

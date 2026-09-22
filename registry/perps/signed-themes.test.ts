import { describe, expect, it } from "vitest";
import coreManifest from "../../registry.json";
import perpsManifest from "../../registry.perps.json";
import fixture from "./signed-theme-fixture.json";

type Color = {
	alpha: number;
	components: readonly number[];
	hex: string;
	token: string;
	variableId: string;
};

type Mode = Record<string, Color>;
type Theme = { light: Mode; dark: Mode };

type ThemeItem = {
	name: string;
	type: string;
	cssVars?: {
		theme?: Record<string, string>;
		light?: Record<string, string>;
		dark?: Record<string, string>;
	};
	css?: Record<string, Record<string, string>>;
};

const themes = fixture.themes as Record<
	"whitelabel" | "jumper" | "mode",
	Theme
>;
// The Figma export signs colors only. A theme also ships structural tokens,
// which have no signed value and cannot be parsed as a color.
const nonColorTokens = new Set<string>(fixture.nonColorTokens);
const items = perpsManifest.items as ThemeItem[];

const rgba = (value: string) => {
	const match = value.match(
		/^rgba?\(\s*([\d.]+)[, ]+\s*([\d.]+)[, ]+\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/,
	);
	if (!match) {
		throw new Error(`Unsupported browser color: ${value}`);
	}
	return [
		Number(match[1]) / 255,
		Number(match[2]) / 255,
		Number(match[3]) / 255,
		match[4] === undefined ? 1 : Number(match[4]),
	];
};

const authoredRgba = (value: string) => {
	const hex = value.match(/^#([\dA-F]{6})$/i)?.[1];
	if (hex) {
		return [
			Number.parseInt(hex.slice(0, 2), 16) / 255,
			Number.parseInt(hex.slice(2, 4), 16) / 255,
			Number.parseInt(hex.slice(4, 6), 16) / 255,
			1,
		];
	}
	const rgb = value.match(
		/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)%\s*\)$/,
	);
	if (!rgb) {
		throw new Error(`Unsupported authored color: ${value}`);
	}
	return [
		Number(rgb[1]) / 255,
		Number(rgb[2]) / 255,
		Number(rgb[3]) / 255,
		Number(rgb[4]) / 100,
	];
};

const assertAuthoredColor = (actual: string, expected: Color) => {
	const authored = authoredRgba(actual);
	for (const channel of [0, 1, 2]) {
		expect(Math.round(authored[channel] * 255)).toBe(
			Math.round(expected.components[channel] * 255),
		);
	}
	expect(Math.abs(authored[3] - expected.alpha)).toBeLessThanOrEqual(1e-6);
};

const expectedToken = (path: string) => {
	const [, , group, name] = path.split("/");
	if (group === "sidebar") {
		return name === "sidebar" ? "sidebar" : `sidebar-${name}`;
	}
	if (group === "chart") {
		return name;
	}
	if (group === "shadow") {
		return name === "shadow" ? "shadow-color" : `shadow-color-${name}`;
	}
	if (group === "custom") {
		const special: Record<string, string> = {
			"bg-muted": "muted-strong",
			"bg-static": "static-background",
			"border-static": "static-border",
		};
		return special[name] ?? name.replace(/^bg-/, "");
	}
	return group;
};

const assertResolvedColor = (actual: string, expected: Color) => {
	const probe = document.createElement("span");
	probe.style.color = actual;
	document.body.append(probe);
	const resolved = rgba(getComputedStyle(probe).color);
	probe.remove();

	const halfEightBitStep = 0.5 / 255;
	expect(Math.abs(resolved[0] - expected.components[0])).toBeLessThanOrEqual(
		halfEightBitStep,
	);
	expect(Math.abs(resolved[1] - expected.components[1])).toBeLessThanOrEqual(
		halfEightBitStep,
	);
	expect(Math.abs(resolved[2] - expected.components[2])).toBeLessThanOrEqual(
		halfEightBitStep,
	);
	expect(Math.abs(resolved[3] - expected.alpha)).toBeLessThanOrEqual(
		halfEightBitStep,
	);
};

const cssRule = (selector: string, vars: Record<string, string>) =>
	`${selector}{${Object.entries(vars)
		.map(
			([name, value]) =>
				`${name.startsWith("--") ? name : `--${name}`}:${value}`,
		)
		.join(";")}}`;

const normalizeCssVars = (vars: Record<string, string>) =>
	Object.fromEntries(
		Object.entries(vars).map(([token, value]) => [
			token.replace(/^--/, ""),
			value,
		]),
	);
const assertTheme = (
	actual: { light: Record<string, string>; dark: Record<string, string> },
	expected: Theme,
) => {
	for (const mode of ["light", "dark"] as const) {
		const signed = expected[mode];
		const colors = Object.keys(actual[mode]).filter(
			(token) => !nonColorTokens.has(token),
		);
		expect(colors).toHaveLength(Object.keys(signed).length);
		for (const entry of Object.values(signed)) {
			expect(
				actual[mode][entry.token],
				`${mode}: --${entry.token}`,
			).toBeDefined();
			assertAuthoredColor(actual[mode][entry.token], entry);
			assertResolvedColor(actual[mode][entry.token], entry);
		}
	}
};

describe("signed Perps themes", () => {
	it("keeps Mode as an exact duplicate of Jumper", () => {
		expect(themes.mode).toEqual(themes.jumper);
	});

	it("maps every semantic source path to one stable CSS variable", () => {
		for (const theme of [themes.whitelabel, themes.jumper]) {
			for (const mode of ["light", "dark"] as const) {
				const entries = Object.entries(theme[mode]);
				expect(entries).toHaveLength(88);
				expect(new Set(entries.map(([, { token }]) => token)).size).toBe(88);
				expect(
					new Set(entries.map(([, { variableId }]) => variableId)).size,
				).toBe(88);
				for (const [path, entry] of entries) {
					expect(entry.token, path).toBe(expectedToken(path));
				}
			}
		}
	});

	it("uses semantic paths instead of unsafe codeSyntax aliases", () => {
		const light = themes.whitelabel.light;
		const dark = themes.whitelabel.dark;

		expect(light["colors/light/background"].token).toBe("background");
		expect(light["colors/light/accent"].token).toBe("accent");
		expect(light["colors/light/accent-foreground"].token).toBe(
			"accent-foreground",
		);
		expect(light["colors/light/ring"].token).toBe("ring");
		expect(dark["colors/dark/sidebar/sidebar"].token).toBe("sidebar");
		expect(dark["colors/dark/custom/focus"].token).toBe("focus");
		expect(dark["colors/dark/ring"].variableId).not.toBe(
			dark["colors/dark/custom/focus"].variableId,
		);
	});

	it("publishes every signed Whitelabel color in light and dark mode", () => {
		const item = items.find(({ name }) => name === "tokens");
		expect(item?.type).toBe("registry:theme");
		expect(item?.cssVars?.light).toBeDefined();
		expect(item?.cssVars?.dark).toBeDefined();
		assertTheme(
			item?.cssVars as {
				light: Record<string, string>;
				dark: Record<string, string>;
			},
			themes.whitelabel,
		);
	});

	it("publishes every signed Jumper color with correct dark selector precedence", () => {
		const item = items.find(({ name }) => name === "jumper-tokens");
		expect(item?.type).toBe("registry:item");
		const light = item?.css?.['body[data-theme="jumper"]'];
		const dark = item?.css?.['.dark body[data-theme="jumper"]'];
		expect(light).toBeDefined();
		expect(dark).toBeDefined();
		assertTheme(
			{
				light: normalizeCssVars(light ?? {}),
				dark: normalizeCssVars(dark ?? {}),
			},
			themes.jumper,
		);

		const previousTheme = document.body.getAttribute("data-theme");
		const wasDark = document.documentElement.classList.contains("dark");
		const style = document.createElement("style");
		style.textContent = `${cssRule('body[data-theme="jumper"]', light ?? {})}${cssRule('.dark body[data-theme="jumper"]', dark ?? {})}`;
		document.head.append(style);
		document.body.setAttribute("data-theme", "jumper");

		try {
			for (const mode of ["light", "dark"] as const) {
				document.documentElement.classList.toggle("dark", mode === "dark");
				const bodyStyle = getComputedStyle(document.body);
				for (const expected of Object.values(themes.jumper[mode])) {
					const value = bodyStyle.getPropertyValue(`--${expected.token}`);
					expect(value, `${mode}: --${expected.token}`).not.toBe("");
					assertResolvedColor(`var(--${expected.token})`, expected);
				}
			}
		} finally {
			style.remove();
			document.documentElement.classList.toggle("dark", wasDark);
			if (previousTheme === null) {
				document.body.removeAttribute("data-theme");
			} else {
				document.body.setAttribute("data-theme", previousTheme);
			}
		}
	});

	it("ships the radius token in both Perps themes", () => {
		const tokens = items.find(({ name }) => name === "tokens");
		expect(tokens?.cssVars?.light?.radius).toBe("0.75rem");
		expect(tokens?.cssVars?.dark?.radius).toBe("0.75rem");

		const jumper = items.find(({ name }) => name === "jumper-tokens");
		expect(jumper?.css?.['body[data-theme="jumper"]']?.["--radius"]).toBe(
			"0.75rem",
		);
		// The light selector wins in both modes, so a dark repeat would only
		// duplicate the value.
		expect(
			jumper?.css?.['.dark body[data-theme="jumper"]']?.["--radius"],
		).toBeUndefined();
	});

	it("registers a Tailwind color utility for every shipped role", () => {
		const coreTokens = coreManifest.items.find(({ name }) => name === "tokens");
		const perpsTokens = items.find(({ name }) => name === "tokens");
		const registrations: Record<string, string | undefined> = {
			...(coreTokens?.cssVars?.theme ?? {}),
			...(perpsTokens?.cssVars?.theme ?? {}),
		};
		const shipped = new Set(
			Object.values(themes.whitelabel.light).map(({ token }) => token),
		);

		for (const token of shipped) {
			expect(registrations[`color-${token}`], token).toBe(`var(--${token})`);
		}
	});
});

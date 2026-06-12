export type Vars = Record<string, string>;

export interface RegistryItem {
	name: string;
	type: string;
	cssVars?: { theme?: Vars; light?: Vars; dark?: Vars };
}

export interface Manifest {
	name: string;
	items: RegistryItem[];
}

export interface Theme {
	id: string;
	title: string;
	brand: string;
	source: string;
	isBase: boolean;
	modes: readonly string[];
	cssVars: { light?: Vars; dark?: Vars };
}

const titleCase = (name: string) =>
	name.charAt(0).toUpperCase() + name.slice(1);

// Each registry:theme item is one theme. "tokens" is the brand's default theme;
// "tokens-<name>" is a named theme of the same brand, so azure appears as
// "Widget / Azure". Core's default theme is the base every other theme layers
// over. A theme supports dark mode when its item carries a dark block.
export function deriveThemes(manifests: Manifest[]): Theme[] {
	return manifests
		.slice()
		.sort((a, b) =>
			a.name === "core"
				? -1
				: b.name === "core"
					? 1
					: a.name.localeCompare(b.name),
		)
		.flatMap((manifest) =>
			manifest.items
				.filter((item) => item.type === "registry:theme")
				.map((item) => {
					const variant = item.name.replace(/^tokens-?/, "");
					return {
						id: variant ? `${manifest.name}-${variant}` : manifest.name,
						title: variant
							? `${titleCase(manifest.name)} / ${titleCase(variant)}`
							: titleCase(manifest.name),
						brand: manifest.name,
						source: `@${manifest.name}/${item.name}`,
						isBase: manifest.name === "core" && !variant,
						modes: item.cssVars?.dark ? ["light", "dark"] : ["light"],
						cssVars: { light: item.cssVars?.light, dark: item.cssVars?.dark },
					};
				}),
		);
}

// A theme with no overrides renders identically to core, so it earns no
// snapshot and no test projects of its own.
export const overridden = (theme: Theme): boolean =>
	theme.isBase ||
	Object.keys(theme.cssVars.light ?? {}).length > 0 ||
	Object.keys(theme.cssVars.dark ?? {}).length > 0;

// Every overridden theme in each of its modes. Chromatic uses this for the one
// place that needs per-theme snapshots (the Design Tokens swatches), and the
// Vitest config derives one test project per entry.
export function buildThemeModes(
	themes: Theme[],
): Record<string, { theme: string; mode: string }> {
	return Object.fromEntries(
		themes
			.filter(overridden)
			.flatMap((theme) =>
				theme.modes.map((mode) => [
					`${theme.id} ${mode}`,
					{ theme: theme.id, mode },
				]),
			),
	);
}

function block(selector: string, vars?: Vars): string {
	const body = Object.entries(vars ?? {})
		.map(([token, value]) => `--${token}:${value};`)
		.join("");
	return body ? `${selector}{${body}}` : "";
}

// The core base goes on :root and .dark; every other theme is a light delta
// scoped by [data-theme], plus a fully resolved dark block (core dark layered
// under the theme's dark overrides). The resolved dark block matches what a
// consumer install produces: the CLI merges light values into :root and dark
// values into .dark, where .dark wins in dark mode, so a token overridden only
// in light never reaches dark mode. A dark delta alone could not guarantee
// that here, because the [data-theme] block comes after .dark in this sheet.
export function buildThemeCss(themes: Theme[]): string {
	const base = themes.find((theme) => theme.isBase);
	let css = "";
	for (const theme of themes) {
		if (theme.isBase) {
			css +=
				block(":root", theme.cssVars.light) +
				block(".dark", theme.cssVars.dark);
			continue;
		}
		css += block(`[data-theme="${theme.id}"]`, theme.cssVars.light);
		if (theme.modes.includes("dark")) {
			css += block(`.dark [data-theme="${theme.id}"]`, {
				...base?.cssVars.dark,
				...theme.cssVars.dark,
			});
		}
	}
	return css;
}

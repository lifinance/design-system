export type Vars = Record<string, string>;

export interface RegistryItem {
	name: string;
	type: string;
	cssVars?: { theme?: Vars; light?: Vars; dark?: Vars };
	css?: Record<string, Vars>;
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

// A registry:theme item is one installable theme. A <variant>-tokens item can
// carry selector-scoped variables for a conditional theme installed with the
// brand. Core's default theme is the base every other preview layers over.
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
			manifest.items.flatMap((item): Theme[] => {
				let variant = item.name.replace(/^tokens-?/, "");
				let cssVars = {
					light: item.cssVars?.light,
					dark: item.cssVars?.dark,
				};

				if (item.type !== "registry:theme") {
					variant = item.name.replace(/-tokens$/, "");
					if (variant === item.name) {
						return [];
					}
					const light = item.css?.[`body[data-theme="${variant}"]`];
					const dark = item.css?.[`.dark body[data-theme="${variant}"]`];
					if (!light) {
						return [];
					}
					const normalize = (vars?: Vars) =>
						vars &&
						Object.fromEntries(
							Object.entries(vars).map(([token, value]) => [
								token.replace(/^--/, ""),
								value,
							]),
						);
					cssVars = { light: normalize(light), dark: normalize(dark) };
				}

				return [
					{
						id: variant ? `${manifest.name}-${variant}` : manifest.name,
						title: variant
							? `${titleCase(manifest.name)} / ${titleCase(variant)}`
							: titleCase(manifest.name),
						brand: manifest.name,
						source: `@${manifest.name}/${item.name}`,
						isBase: manifest.name === "core" && !variant,
						modes: cssVars.dark ? ["light", "dark"] : ["light"],
						cssVars,
					},
				];
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

// The core base goes on :root and .dark; every other theme is a fully resolved
// block scoped by [data-theme], core layered under the theme's own overrides.
// That matches a consumer install, where the CLI merges every value into :root
// and .dark. Full resolution is required: a var()-valued token substitutes where
// it is declared, and the [data-theme] block comes after .dark in this sheet.
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
		css += block(`[data-theme="${theme.id}"]`, {
			...base?.cssVars.light,
			...theme.cssVars.light,
		});
		if (theme.modes.includes("dark")) {
			css += block(`.dark [data-theme="${theme.id}"]`, {
				...base?.cssVars.dark,
				...theme.cssVars.dark,
			});
		}
	}
	return css;
}

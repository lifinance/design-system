import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { deriveThemes, type Manifest } from "./theme-registry";

const root = path.resolve(import.meta.dirname, "..");
const manifests = [
	"registry.json",
	"registry.widget.json",
	"registry.perps.json",
	"registry.jumper.json",
].map(
	(file) =>
		JSON.parse(fs.readFileSync(path.join(root, file), "utf8")) as Manifest,
);

const themes = deriveThemes(manifests);
const base = themes.find((theme) => theme.isBase);
const modes = ["light", "dark"] as const;

const subtleForegroundRoles = ["destructive", "success", "info"] as const;

test.each(
	subtleForegroundRoles,
)("the base derives the %s subtle foreground from its role tokens", (role) => {
	for (const mode of modes) {
		const value = base?.cssVars[mode]?.[`${role}-subtle-foreground`];

		expect(value, mode).toContain(`var(--${role})`);
		expect(value, mode).toContain("var(--foreground)");
	}
});

// A color-mix value in the base states a relationship between two role tokens
// of the same theme. A literal override freezes it, so the token stops tracking
// the role color it mixes and the pairing can drop below the contrast floor.
test("a theme that overrides a mixed token keeps referencing its role tokens", () => {
	for (const theme of themes.filter(({ isBase }) => !isBase)) {
		for (const mode of modes) {
			const baseVars = base?.cssVars[mode] ?? {};

			for (const [name, value] of Object.entries(theme.cssVars[mode] ?? {})) {
				if (!baseVars[name]?.includes("color-mix(")) continue;

				expect(value, `${theme.id} ${mode}: --${name}`).toContain("var(--");
			}
		}
	}
});

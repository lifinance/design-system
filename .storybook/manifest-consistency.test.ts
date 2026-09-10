import fs from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";
import { deriveThemes, type Manifest } from "./theme-registry";

const root = path.resolve(import.meta.dirname, "..");
const manifestFiles = fs
	.readdirSync(root)
	.filter((file) => /^registry.*\.json$/.test(file))
	.sort();
const manifests = manifestFiles.map(
	(file) =>
		JSON.parse(fs.readFileSync(path.join(root, file), "utf8")) as Manifest,
);
const packageJson = JSON.parse(
	fs.readFileSync(path.join(root, "package.json"), "utf8"),
) as { scripts: Record<string, string> };

it("builds every manifest discovered by Storybook and Vitest", () => {
	const build = packageJson.scripts["registry:build"];

	for (const [index, manifest] of manifests.entries()) {
		const script = `registry:build:${manifest.name}`;
		expect(build, manifestFiles[index]).toContain(`pnpm ${script}`);
		expect(packageJson.scripts[script], script).toContain(manifestFiles[index]);
	}
});

it("previews every theme shipped by a registry manifest", () => {
	const previewSources = new Set(
		deriveThemes(manifests).map(({ source }) => source),
	);

	for (const manifest of manifests) {
		for (const item of manifest.items) {
			const conditionalTheme =
				item.name.endsWith("-tokens") &&
				item.css !== undefined &&
				Object.keys(item.css).some((selector) =>
					selector.startsWith('body[data-theme="'),
				);
			if (item.type === "registry:theme" || conditionalTheme) {
				expect(previewSources, `@${manifest.name}/${item.name}`).toContain(
					`@${manifest.name}/${item.name}`,
				);
			}
		}
	}
});

it("registers every core color role in the canonical token item", () => {
	const core = manifests.find(({ name }) => name === "core");
	const tokens = core?.items.find(({ name }) => name === "tokens");
	const values = new Set([
		...Object.keys(tokens?.cssVars?.light ?? {}),
		...Object.keys(tokens?.cssVars?.dark ?? {}),
	]);

	values.delete("radius");
	for (const token of values) {
		expect(tokens?.cssVars?.theme?.[`color-${token}`], token).toBe(
			`var(--${token})`,
		);
	}
});

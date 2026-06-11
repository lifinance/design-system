/// <reference types="vitest/config" />
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";
import type { TestProjectConfiguration } from "vitest/config";
import {
	deriveThemes,
	type Manifest,
	overridden,
} from "./.storybook/theme-registry";

const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// Every overridden theme and mode the registry manifests declare. A new brand
// manifest or a new theme adds its own test projects automatically, the same
// way it joins the Storybook toolbar (see .storybook/modes.ts, the preview's
// loader for the same derivation). Tests, including the accessibility checks,
// run once per entry, so a contrast failure in any theme or mode fails the
// build. Themes without overrides render identically to core and get no
// projects of their own.
const manifests: Manifest[] = fs
	.readdirSync(dirname)
	.filter((file) => /^registry.*\.json$/.test(file))
	.map((file) =>
		JSON.parse(fs.readFileSync(path.join(dirname, file), "utf-8")),
	);

const themeModes = deriveThemes(manifests)
	.filter(overridden)
	.flatMap((theme) => theme.modes.map((mode) => ({ id: theme.id, mode })));

const storybookProject = (
	name: string,
	env?: Record<string, string>,
): TestProjectConfiguration => ({
	extends: true,
	plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
	test: {
		name,
		env,
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({}),
			instances: [{ browser: "chromium" }],
		},
	},
});

// Storybook's test widget spawns Vitest itself and supports one project per
// Storybook config, so it gets a single project on the default theme. The
// full theme and mode matrix runs through the CLI and in CI.
const projects: TestProjectConfiguration[] =
	process.env.VITEST_STORYBOOK === "true"
		? [storybookProject("storybook")]
		: [
				{
					extends: true,
					test: {
						name: "unit",
						environment: "node",
						include: [".storybook/**/*.test.ts"],
					},
				},
				...themeModes.map(({ id, mode }) =>
					storybookProject(`storybook-${id}-${mode}`, {
						STORYBOOK_THEME: id,
						STORYBOOK_MODE: mode,
					}),
				),
			];

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@/registry": path.resolve(dirname, "./registry"),
			"@": path.resolve(dirname, "."),
		},
	},
	test: { projects },
});

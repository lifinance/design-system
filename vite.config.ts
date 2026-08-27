/// <reference types="vitest/config" />
import fs from "node:fs";
import os from "node:os";
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

// Storybook's test widget spawns Vitest itself and supports one project per
// Storybook config, so it gets a single project on the default theme. The
// full theme and mode matrix runs through the CLI and in CI.
const widgetRun = process.env.VITEST_STORYBOOK === "true";

// Each project opens its own browser pool and the pools run at the same time,
// so the open tab count is the project count times the per-project worker
// count. Vitest sizes each pool from the whole machine, which oversubscribes
// the CPU and stretches a single pointer or key action into tens of seconds.
const workersPerProject = Math.max(
	1,
	Math.floor(os.availableParallelism() / (widgetRun ? 1 : themeModes.length)),
);

const storybookProject = (
	name: string,
	env?: Record<string, string>,
): TestProjectConfiguration => ({
	extends: true,
	plugins: [storybookTest({ configDir: path.join(dirname, ".storybook") })],
	test: {
		name,
		env,
		maxWorkers: workersPerProject,
		// A story that opens an overlay waits for its transitions, and the a11y
		// check runs on top of that, so the Vitest default is too tight.
		testTimeout: 20_000,
		browser: {
			enabled: true,
			headless: true,
			provider: playwright({}),
			instances: [{ browser: "chromium" }],
		},
	},
});

const projects: TestProjectConfiguration[] = widgetRun
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

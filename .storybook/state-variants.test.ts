import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { expect, test } from "vitest";

const root = path.resolve(import.meta.dirname, "..");
const variantsPath = "../registry/core/state-variants.css";
const variantNames = [
	"data-open",
	"data-closed",
	"data-checked",
	"data-unchecked",
	"data-selected",
	"data-disabled",
	"data-active",
	"data-horizontal",
	"data-vertical",
];

test("Storybook imports the registry state variants", () => {
	const storybookCss = fs.readFileSync(
		path.join(root, ".storybook/index.css"),
		"utf8",
	);

	expect(storybookCss).toContain(`@import "${variantsPath}";`);
});

test("the built token item ships every state variant", () => {
	const output = fs.mkdtempSync(path.join(os.tmpdir(), "lifi-state-variants-"));
	try {
		execFileSync(
			process.execPath,
			["scripts/build-registry.mjs", "registry.json", "core", output],
			{ cwd: root, stdio: "pipe" },
		);
		const tokens = JSON.parse(
			fs.readFileSync(path.join(output, "default/tokens.json"), "utf8"),
		) as { css?: Record<string, unknown> };
		const shippedVariants = Object.keys(tokens.css ?? {}).map(
			(rule) => rule.split(" ")[1],
		);

		expect(shippedVariants).toEqual(variantNames);
	} finally {
		fs.rmSync(output, { recursive: true, force: true });
	}
}, 30_000);

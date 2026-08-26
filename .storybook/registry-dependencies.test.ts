import fs from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";

type Registry = {
	items: Array<{
		name: string;
		dependencies?: string[];
		files?: Array<{ path: string }>;
	}>;
};

const root = path.resolve(import.meta.dirname, "..");
const manifests = [
	"registry.json",
	"registry.widget.json",
	"registry.perps.json",
	"registry.jumper.json",
];

test("registry items declare the Remix Icon dependency they import", () => {
	for (const manifestPath of manifests) {
		const manifest = JSON.parse(
			fs.readFileSync(path.join(root, manifestPath), "utf8"),
		) as Registry;

		for (const item of manifest.items) {
			const importsRemixIcon = item.files?.some(({ path: filePath }) =>
				fs
					.readFileSync(path.join(root, filePath), "utf8")
					.includes('from "@remixicon/react"'),
			);

			if (importsRemixIcon) {
				expect(
					item.dependencies ?? [],
					`${manifestPath}: ${item.name}`,
				).toContain("@remixicon/react");
			}
		}
	}
});

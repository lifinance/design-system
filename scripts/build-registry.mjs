// Builds one namespace's registry into two distribution forms with shadcn/utils:
//   <output>/<style>      cn-* resolved to utilities (transformStyle)
//   <output>/<style>/cn   cn-* renamed to lifi-* and kept, style shipped as item css
//
// usage: build-registry.mjs <manifest> <namespace> <output>

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createStyleMap, transformStyle } from "shadcn/utils";
import { twMerge } from "tailwind-merge";

const [, , manifestPath, namespace, output] = process.argv;
if (!manifestPath || !namespace || !output) {
	console.error("usage: build-registry.mjs <manifest> <namespace> <output>");
	process.exit(1);
}

const ROOT = process.cwd();
const SHADCN = path.join(ROOT, "node_modules/.bin/shadcn");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

const core = JSON.parse(read("registry.json"));
const manifest = JSON.parse(read(manifestPath));
const isComponent = (item) => (item.files ?? []).length > 0;

const overrides = new Map(
	manifest.items.filter(isComponent).map((i) => [i.name, i]),
);
const components = core.items
	.filter(isComponent)
	.map((i) => overrides.get(i.name) ?? i);
for (const [name, item] of overrides) {
	if (!components.some((c) => c.name === name)) components.push(item);
}

const nonComponents = manifest.items.filter((i) => !isComponent(i));
if (namespace !== "core") {
	const defined = new Set(nonComponents.map((i) => i.name));
	nonComponents.push(
		...core.items.filter(
			(i) => i.type === "registry:base" && !defined.has(i.name),
		),
	);
}

// Theme deps stay @core/* (a brand theme extends the core palette); others rescope.
const rescope = (item) =>
	namespace === "core" ||
	item.type === "registry:theme" ||
	!item.registryDependencies
		? item
		: {
				...item,
				registryDependencies: item.registryDependencies.map((d) =>
					d.replace(/^@core\//, `@${namespace}/`),
				),
			};
const items = [...components, ...nonComponents].map(rescope);

const styleNames = fs
	.readdirSync(path.join(ROOT, "registry/core/styles"))
	.filter((f) => f.endsWith(".css"))
	.map((f) => path.basename(f, ".css").replace(/^style-/, ""));

// Ship persistent utility classes under the lifi- namespace: the shadcn CLI strips
// cn-* on install, so the consumer-facing (preserved) form renames structural cn-*
// to lifi-*, which the CLI leaves intact. Functional cn-* the CLI transforms by name
// (menu, direction, font) stay cn- so that behavior still runs on add.
const FUNCTIONAL = new Set([
	"cn-menu-target",
	"cn-menu-translucent",
	"cn-logical-sides",
	"cn-rtl-flip",
	"cn-font-heading",
]);
const toLifi = (s) =>
	s.replace(/\bcn-[\w-]+\b/g, (m) =>
		FUNCTIONAL.has(m) ? m : `lifi-${m.slice(3)}`,
	);

function attachStyleCss(item, styleMap) {
	const classes = new Set();
	for (const file of item.files ?? []) {
		for (const [cn] of read(file.path).matchAll(/cn-[\w-]+/g)) {
			if (styleMap[cn]) classes.add(cn);
		}
	}
	if (classes.size === 0) return;
	const rules = {};
	for (const cn of classes) {
		// styleMap concatenates core base + brand delta (delta last); twMerge collapses
		// the overlap so a brand override wins cleanly, matching the inline form.
		rules[`.${toLifi(cn)}`] = { [`@apply ${twMerge(styleMap[cn])}`]: {} };
	}
	item.css = { "@layer components": rules };
}

async function buildVariant(out, styleName, styleMap, resolve) {
	const tempDir = path.join(ROOT, ".registry-build", namespace);
	fs.rmSync(tempDir, { recursive: true, force: true });
	fs.mkdirSync(tempDir, { recursive: true });
	const built = structuredClone(items);
	for (const item of built) {
		for (const file of item.files ?? []) {
			const dest = path.join(tempDir, file.path);
			fs.mkdirSync(path.dirname(dest), { recursive: true });
			const source = read(file.path);
			fs.writeFileSync(
				dest,
				resolve && file.path.endsWith(".tsx")
					? await transformStyle(source, { styleMap })
					: toLifi(source),
			);
		}
		if (!resolve) attachStyleCss(item, styleMap);
	}
	fs.writeFileSync(
		path.join(tempDir, "registry.json"),
		JSON.stringify({ ...manifest, items: built }, null, "\t"),
	);
	execFileSync(
		SHADCN,
		["build", "registry.json", "--output", path.resolve(ROOT, out)],
		{
			stdio: "inherit",
			cwd: tempDir,
		},
	);
	fs.rmSync(tempDir, { recursive: true, force: true });
}

for (const styleName of styleNames) {
	// Delta before base: createStyleMap prepends later files and transformStyle
	// resolves with tailwind-merge (last wins), so the delta must come first to win.
	const base = `registry/core/styles/style-${styleName}.css`;
	const delta = `registry/${namespace}/styles/style-${styleName}.css`;
	const chain = namespace !== "core" && exists(delta) ? [delta, base] : [base];
	const styleMap = createStyleMap(chain.map(read).join("\n"));
	await buildVariant(`${output}/${styleName}`, styleName, styleMap, true);
	await buildVariant(`${output}/${styleName}/cn`, styleName, styleMap, false);
	console.log(`✓ ${namespace}/${styleName} → ${output}/${styleName} (+ /cn)`);
}

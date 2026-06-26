// Builds one namespace's registry into two distribution forms, once per style. A consumer
// selects a style through the {style} segment of the registry URL (r/<ns>/<style>/...),
// so a style of one name applies across every namespace:
//   <output>/<style>             default   cn-* resolved to utilities (shadcn's default);
//                                          styling is baked in
//   <output>/<style>/customize   customize every styled class kept as lifi-* and mapped in
//                                          the item css, so a consumer restyles it in plain
//                                          CSS, no Tailwind build
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

// Effective item set: a namespace inherits @core's components and its registry:base
// catalog, then overlays its own items by name (a same-named brand item replaces
// core's). Theme and style stay brand-local; every brand brings its own. Component
// cross-deps rescope @core/* to @<ns>/* so each namespace is self-contained; a theme
// keeps @core/tokens because a brand palette extends core's.
const core = JSON.parse(read("registry.json"));
const manifest = JSON.parse(read(manifestPath));

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

const inherited =
	namespace === "core"
		? core.items
		: core.items.filter(
				(i) => i.type !== "registry:theme" && i.type !== "registry:style",
			);
const byName = new Map(inherited.map((i) => [i.name, i]));
for (const item of manifest.items) byName.set(item.name, item);
const items = [...byName.values()].map(rescope);

// In the customize form every class the style defines (i.e. present in the style map)
// is renamed cn-* -> lifi-* and shipped as a css rule, so a consumer who cannot reach
// the install config (anyone embedding the widget, say) can still restyle it by
// remapping the class. Classes the style does not define stay cn-*: they are pure CLI
// behavior markers (menu dark-targeting, rtl flips, font swap) that the shadcn CLI
// rewrites by name on `add` and carry no utilities to override. lifi-* names are left
// intact by the CLI, so the shipped rule survives install.
const toLifi = (src, styleMap) =>
	src.replace(/\bcn-[\w-]+\b/g, (m) =>
		styleMap[m] ? `lifi-${m.slice(3)}` : m,
	);

// The customize form's item css: `.lifi-x { @apply <utilities> }` for each styled class
// the source uses. styleMap concatenates core base + brand delta (delta last); twMerge
// collapses the overlap so a brand override wins, matching the default form.
const styleRules = (src, styleMap) => {
	const rules = {};
	for (const [cn] of src.matchAll(/\bcn-[\w-]+\b/g)) {
		if (styleMap[cn]) {
			rules[`.lifi-${cn.slice(3)}`] = {
				[`@apply ${twMerge(styleMap[cn])}`]: {},
			};
		}
	}
	return rules;
};

// The two distribution forms. `content` transforms one source file; `css` (customize
// only) derives the item's css rules from the original source.
const FORMS = [
	{
		subdir: "",
		content: (src, file, styleMap) =>
			file.endsWith(".tsx") ? transformStyle(src, { styleMap }) : src,
	},
	{
		subdir: "customize",
		content: (src, _file, styleMap) => toLifi(src, styleMap),
		css: styleRules,
	},
];

async function buildVariant(form, style, styleMap) {
	const tempDir = path.join(ROOT, ".registry-build", namespace);
	fs.rmSync(tempDir, { recursive: true, force: true });
	fs.mkdirSync(tempDir, { recursive: true });

	const built = structuredClone(items);
	for (const item of built) {
		const rules = {};
		for (const file of item.files ?? []) {
			const src = read(file.path);
			const dest = path.join(tempDir, file.path);
			fs.mkdirSync(path.dirname(dest), { recursive: true });
			fs.writeFileSync(dest, await form.content(src, file.path, styleMap));
			if (form.css) Object.assign(rules, form.css(src, styleMap));
		}
		if (form.css && Object.keys(rules).length > 0) {
			item.css = { "@layer components": rules };
		}
	}

	fs.writeFileSync(
		path.join(tempDir, "registry.json"),
		JSON.stringify({ ...manifest, items: built }, null, "\t"),
	);
	execFileSync(
		SHADCN,
		[
			"build",
			"registry.json",
			"--output",
			path.resolve(ROOT, output, style, form.subdir),
		],
		{ stdio: "inherit", cwd: tempDir },
	);
	fs.rmSync(tempDir, { recursive: true, force: true });
}

const styleNames = fs
	.readdirSync(path.join(ROOT, "registry/core/styles"))
	.filter((f) => f.endsWith(".css"))
	.map((f) => path.basename(f, ".css").replace(/^style-/, ""));

for (const styleName of styleNames) {
	// Delta before base: createStyleMap prepends later files and transformStyle resolves
	// with twMerge (last wins), so the brand delta must come first to win.
	const base = `registry/core/styles/style-${styleName}.css`;
	const delta = `registry/${namespace}/styles/style-${styleName}.css`;
	const chain = namespace !== "core" && exists(delta) ? [delta, base] : [base];
	const styleMap = createStyleMap(chain.map(read).join("\n"));
	for (const form of FORMS) await buildVariant(form, styleName, styleMap);
	console.log(
		`✓ ${namespace}/${styleName} → ${output}/${styleName} (+ /customize)`,
	);
}

import fs from "node:fs";
import { createStyleMap, transformStyle } from "shadcn/utils";
import { expect, test } from "vitest";

const styles = fs.readFileSync(
	new URL("../registry/core/styles/style-default.css", import.meta.url),
	"utf8",
);

test("the default tabs distribution keeps the pill trigger radius", async () => {
	const styleMap = createStyleMap(styles);
	const source = `export function Trigger() {
	return <button className="cn-tabs-trigger" />;
}`;

	const transformed = await transformStyle(source, { styleMap });

	expect(transformed).toContain(
		"group-data-[variant=pill]/tabs-list:rounded-lg",
	);
});

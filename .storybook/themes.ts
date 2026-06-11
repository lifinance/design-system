import { themes } from "./modes";
import { buildThemeCss } from "./theme-registry";

// The registry manifests are the single source of token values. The preview
// derives its theme CSS from them, layered the same way a consumer install
// resolves: see buildThemeCss.

if (typeof document !== "undefined") {
	const style = document.createElement("style");
	style.dataset.themes = "registry";
	style.textContent = buildThemeCss(themes);
	document.head.append(style);
}

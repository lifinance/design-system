import type { Preview } from "@storybook/react-vite";
import * as React from "react";
import "./index.css";
import "./style-registry.css";
import "./themes";
import { themes } from "./modes";

const preview: Preview = {
	parameters: {
		options: {
			storySort: {
				order: ["Getting started", "Foundations", "Core", "Jumper", "Widget"],
			},
		},
		controls: {
			disableSaveFromUI: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: "error",
		},
		chromatic: {
			// No story is snapshotted by default, so documentation and test stories
			// are free. A story opts in with a snapshot parameter from modes.ts.
			disableSnapshot: true,
		},
		docs: {
			// Show the rendered JSX, not the story source. Without this, a story with an
			// arg-less render function prints its `render: () => (...)` wrapper in the
			// docs "Show code" panel. Decorators are layout-only, so keep them out.
			source: { type: "dynamic", excludeDecorators: true },
		},
	},
	globalTypes: {
		theme: {
			description: "Theme",
			toolbar: {
				title: "Theme",
				icon: "paintbrush",
				items: themes.map((theme) => ({ value: theme.id, title: theme.title })),
				dynamicTitle: true,
			},
		},
		mode: {
			description: "Light or dark mode",
			toolbar: {
				title: "Mode",
				icon: "contrast",
				items: [
					{ value: "light", title: "Light", icon: "sun" },
					{ value: "dark", title: "Dark", icon: "moon" },
				],
				dynamicTitle: true,
			},
		},
	},
	// The Vitest projects in vite.config.ts run this preview once per theme and
	// mode, passed in as env vars. Outside the test run both are unset, so the
	// app starts on the first theme in light mode.
	initialGlobals: {
		theme: import.meta.env.STORYBOOK_THEME ?? themes[0].id,
		mode: import.meta.env.STORYBOOK_MODE ?? "light",
	},
	tags: ["autodocs"],
	decorators: [
		(Story, ctx) => {
			// A brand-specific component pins its theme with a story-level global,
			// which also locks the toolbar control for its stories.
			const theme =
				themes.find((entry) => entry.id === ctx.globals.theme) ?? themes[0];
			const dark = theme.modes.includes("dark") && ctx.globals.mode === "dark";

			React.useLayoutEffect(() => {
				document.body.setAttribute("data-theme", theme.id);
				document.body.setAttribute("data-style", theme.brand);
				document.documentElement.classList.toggle("dark", dark);
			}, [theme.id, theme.brand, dark]);

			return (
				<div className="bg-background text-foreground p-6">
					<Story />
				</div>
			);
		},
	],
};

export default preview;

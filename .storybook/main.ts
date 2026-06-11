import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: [
		"../docs/**/*.mdx",
		"../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		"../registry/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	typescript: {
		reactDocgen: "react-docgen-typescript",
	},
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-mcp",
	],
	framework: "@storybook/react-vite",
};
export default config;

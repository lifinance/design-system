import type { Meta, StoryObj } from "@storybook/react-vite";
import { themeSnapshot, themes } from "../.storybook/modes";
import {
	type ColorRow,
	ColorTokenTable,
	type ComponentTokenRow,
	ComponentTokenTable,
	DoDont,
	type Guideline,
	InfoTable,
	type RadiusRow,
	RoundedTokenTable,
	TypographyTokens,
} from "./DesignTokens";

const SURFACES: ColorRow[] = [
	{ name: "background", foreground: "foreground", use: "The page background" },
	{
		name: "card",
		foreground: "card-foreground",
		use: "Raised surfaces such as cards and panels",
	},
	{
		name: "popover",
		foreground: "popover-foreground",
		use: "Floating surfaces: menus, tooltips, and dialogs",
	},
	{
		name: "muted",
		foreground: "muted-foreground",
		use: "Subdued surfaces; secondary and placeholder text",
	},
];

const ACTIONS: ColorRow[] = [
	{
		name: "primary",
		foreground: "primary-foreground",
		use: "The primary action and brand emphasis",
	},
	{
		name: "secondary",
		foreground: "secondary-foreground",
		use: "Secondary actions",
	},
	{
		name: "accent",
		foreground: "accent-foreground",
		use: "Hover and active emphasis on interactive elements",
	},
];

const FEEDBACK: ColorRow[] = [
	{ name: "destructive", use: "Errors and destructive actions" },
	{ name: "success", use: "Positive outcomes" },
	{ name: "warning", use: "Warnings" },
	{ name: "info", use: "Neutral information" },
];

const LINES: ColorRow[] = [
	{ name: "border", use: "Borders and dividers" },
	{ name: "input", use: "Form-control borders" },
	{ name: "ring", use: "Focus rings" },
];

const ROLE_RADIUS: RadiusRow[] = [
	{
		token: "radius-sm",
		utility: "rounded-sm",
		use: "Small controls and chips",
	},
	{ token: "radius-md", utility: "rounded-md", use: "Compact elements" },
	{
		token: "radius-lg",
		utility: "rounded-lg",
		use: "Default, for inputs and cards",
	},
	{ token: "radius-xl", utility: "rounded-xl", use: "Large containers" },
];

const COMPONENT_TOKENS: ComponentTokenRow[] = [
	{
		sample: (
			<span className="block h-10 w-14 rounded-md border bg-button-primary-hover" />
		),
		token: "lifi-button-primary-hover",
		utility: "hover:bg-button-primary-hover",
		use: "Primary button background on hover. Derives from --primary.",
	},
	{
		sample: (
			<span className="block h-10 w-14 rounded-md border bg-button-primary-active" />
		),
		token: "lifi-button-primary-active",
		utility: "active:bg-button-primary-active",
		use: "Primary button background while pressed. Derives from --primary.",
	},
	{
		sample: (
			<span className="block h-10 w-14 rounded-md border ring-2 ring-button-primary-focus" />
		),
		token: "lifi-button-primary-focus",
		utility: "focus-visible:ring-button-primary-focus",
		use: "Primary button focus ring. Derives from --ring.",
	},
];

const GUIDELINES: Guideline[] = [
	{
		point: "Style with token utilities, never literal values",
		why: "A literal color, radius, or size does not follow the active theme, so it is wrong in dark mode and under other brands.",
		do: '<div className="bg-card text-card-foreground" />',
		dont: '<div style={{ background: "#ffffff" }} />',
	},
	{
		point: "Pair every surface with its foreground",
		why: "Each foreground token is tuned for legible contrast on its surface across every theme and mode.",
		do: '<div className="bg-primary text-primary-foreground" />',
		dont: '<div className="bg-primary text-foreground" />',
	},
	{
		point: "Choose a color by its role, not its appearance",
		why: "A token's value changes per brand; a fixed palette color does not, so it stops matching the active theme.",
		do: '<p className="text-destructive">Payment failed</p>',
		dont: '<p className="text-red-600">Payment failed</p>',
	},
	{
		point: "Express size with the spacing scale, not tokens",
		why: "Size is component design, not something a brand configures; tokens cover only color, radius, and font.",
		do: '<input className="h-11.5 px-3.5" />',
		dont: "<input style={{ height: 46 }} />",
	},
];

const meta = {
	title: "Foundations/Design Tokens",
	tags: ["!dev"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
	parameters: { chromatic: themeSnapshot },
	render: () => (
		<div className="flex flex-col gap-10">
			<ColorTokenTable caption="Surfaces" rows={SURFACES} />
			<ColorTokenTable caption="Actions" rows={ACTIONS} />
			<ColorTokenTable caption="Feedback" rows={FEEDBACK} />
			<ColorTokenTable caption="Lines and focus" rows={LINES} />
		</div>
	),
};

export const Radius: Story = {
	render: () => <RoundedTokenTable caption="Radius scale" rows={ROLE_RADIUS} />,
};

export const ComponentTokens: Story = {
	render: () => <ComponentTokenTable rows={COMPONENT_TOKENS} />,
};

export const Typography: Story = {
	render: () => <TypographyTokens />,
};

export const Usage: Story = {
	render: () => <DoDont items={GUIDELINES} />,
};

const formatModes = (modes: readonly string[]) => {
	const joined = modes.join(", ");
	return joined.charAt(0).toUpperCase() + joined.slice(1);
};

export const Themes: Story = {
	// The rows derive from the registry manifests, so a new theme appears here on
	// its own.
	render: () => (
		<InfoTable
			headers={["Theme", "Registry item", "Modes"]}
			rows={themes.map((theme) => [
				theme.title,
				<code key={theme.id}>{theme.source}</code>,
				formatModes(theme.modes),
			])}
		/>
	),
};

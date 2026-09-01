import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Badge } from "./badge";

const meta = {
	component: Badge,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A small label for status, counts, and metadata. Install with `pnpm dlx shadcn@latest add @core/badge`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=136-1178",
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"muted",
				"success",
				"info",
				"warning",
				"destructive",
				"outline",
				"ghost",
				"link",
			],
		},
	},
	args: { children: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="muted">Muted</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="ghost">Ghost</Badge>
			<Badge variant="link">Link</Badge>
		</div>
	),
};

const TINT_SURFACES = [
	{ label: "Page background", className: "bg-background text-foreground" },
	{ label: "Card", className: "bg-card text-card-foreground" },
	{ label: "Popover", className: "bg-popover text-popover-foreground" },
	{ label: "Muted", className: "bg-muted text-muted-foreground" },
];

export const TintsOnSurfaces: Story = {
	parameters: {
		chromatic: snapshot,
		docs: {
			description: {
				story:
					"The success, info, warning, and destructive variants are tints: a feedback color at low opacity. A tint is translucent, so the surface behind it sets the rendered contrast of the label. Use a tinted variant on a surface token, which is what this story shows. A tint over an action token (`bg-primary`, `bg-secondary`, `bg-accent`) is unsupported, because an action token is a filled control that pairs with its own foreground token.",
			},
		},
	},
	render: () => (
		<div className="flex flex-col gap-2">
			{TINT_SURFACES.map((surface) => (
				<div
					className={`${surface.className} flex flex-wrap items-center gap-2 rounded-lg p-4 text-sm`}
					key={surface.label}
				>
					<span className="w-36">{surface.label}</span>
					<Badge variant="success">Success</Badge>
					<Badge variant="info">Info</Badge>
					<Badge variant="warning">Warning</Badge>
					<Badge variant="destructive">Destructive</Badge>
				</div>
			))}
		</div>
	),
};

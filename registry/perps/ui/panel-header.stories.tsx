import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Button } from "@/registry/core/ui/button";
import { PanelHeader } from "./panel-header";

const meta = {
	component: PanelHeader,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A card/panel header bar with leading, content and trailing slots and an optional divider. Install with `pnpm dlx shadcn@latest add @perps/panel-header`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105149-12345",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96 rounded-lg border bg-card text-card-foreground">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PanelHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		start: <span className="text-sm font-medium">Order book</span>,
		end: (
			<Button variant="outline" size="icon-sm" aria-label="Toggle view">
				⛶
			</Button>
		),
	},
};

export const CenterContent: Story = {
	args: {
		align: "center",
		children: <span className="text-sm font-medium">Markets</span>,
		end: (
			<Button variant="outline" size="icon-sm" aria-label="Close">
				✕
			</Button>
		),
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="rounded-lg border bg-card text-card-foreground">
				<PanelHeader
					start={<span className="text-sm font-medium">Order book</span>}
				/>
			</div>
			<div className="rounded-lg border bg-card text-card-foreground">
				<PanelHeader align="center" divider={false}>
					<span className="text-sm font-medium">Markets</span>
				</PanelHeader>
			</div>
		</div>
	),
};

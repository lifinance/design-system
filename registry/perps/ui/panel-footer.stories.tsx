import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { DepthRatioBar } from "@/registry/perps/ui/depth-ratio-bar";
import { PanelFooter } from "./panel-footer";

const meta = {
	component: PanelFooter,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A card/panel footer region with a top divider, e.g. for an order-book depth summary. Install with `pnpm dlx shadcn@latest add @perps/panel-footer`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105597-38219",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96 rounded-lg border bg-card text-card-foreground">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof PanelFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<PanelFooter {...args}>
			<DepthRatioBar bids={5004} asks={4996} />
		</PanelFooter>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<PanelFooter>
			<DepthRatioBar bids={8200} asks={1800} />
		</PanelFooter>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { MarketListItem, MarketListItemSkeleton } from "./market-list-item";

const meta = {
	component: MarketListItem,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A compact list item for mobile market and asset lists. Install with `pnpm dlx shadcn@latest add @perps/market-list-item`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105896-31305",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[390px] overflow-hidden rounded-xl border bg-card">
				<Story />
			</div>
		),
	],
	args: {
		label: "BTC/USDC",
		avatarFallback: "B",
		badges: [{ tone: "info", label: "40x" }],
		primaryValue: "$66,167.21",
		secondaryValue: "Vol. $1.1B · OI $2.1B",
		trailingValue: "+1.13%",
		trailingTone: "success",
	},
} satisfies Meta<typeof MarketListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Spot: Story = {
	args: {
		label: "HYPE/USDC",
		avatarFallback: "H",
		badges: [{ tone: "warning", label: "Spot" }],
		primaryValue: "$59.80",
		secondaryValue: "Vol. $208.3M · Market Cap $1.2B",
		trailingValue: "-1.34%",
		trailingTone: "destructive",
	},
};

export const WithProviderSubBadge: Story = {
	args: {
		avatarSubBadge: { fallback: "H" },
	},
};

export const Skeleton: Story = {
	render: () => <MarketListItemSkeleton />,
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105896-31503",
		},
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
};

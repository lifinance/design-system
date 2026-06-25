import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Avatar, AvatarBadge, AvatarFallback } from "@/registry/core/ui/avatar";
import { Badge } from "@/registry/core/ui/badge";
import { MarketPairCell } from "./market-pair-cell";

const meta = {
	component: MarketPairCell,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"Reusable perps market pair cell composed from core avatar and badge primitives. Install with `pnpm dlx shadcn@latest add @perps/market-pair-cell`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=6775-352",
		},
	},
	decorators: [
		(Story) => (
			<div className="flex w-[360px] flex-col gap-4 rounded-lg border bg-card p-4">
				<Story />
			</div>
		),
	],
	args: {
		baseSymbol: "BTC",
		quoteSymbol: "USDC",
		avatarFallback: "B",
		badges: [{ tone: "info", label: "40x" }],
	},
} satisfies Meta<typeof MarketPairCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProviderBadge: Story = {
	args: {
		baseSymbol: "AAVE",
		quoteSymbol: "USDC",
		avatarFallback: "A",
		avatarSubBadge: { fallback: "H" },
		badges: [
			{ tone: "info", label: "20x" },
			{ tone: "secondary", label: "xyz" },
		],
	},
};

export const Primitives: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar size="2xs" className="after:border-0">
				<AvatarFallback>A</AvatarFallback>
				<AvatarBadge className="-right-0.5 -bottom-0.5 size-3 border-0 ring-0">
					<span className="flex size-full items-center justify-center overflow-hidden rounded-full border-2 border-background bg-background text-[8px] leading-none font-medium text-foreground">
						H
					</span>
				</AvatarBadge>
			</Avatar>
			<Badge variant="info" className="h-5 px-2">
				40x
			</Badge>
			<Badge variant="warning" className="h-5 px-2">
				Spot
			</Badge>
			<Badge variant="secondary" className="h-5 px-2">
				xyz
			</Badge>
		</div>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
};

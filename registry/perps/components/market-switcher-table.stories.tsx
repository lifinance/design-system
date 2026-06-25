import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDownIcon } from "lucide-react";
import { fn } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "@/registry/core/ui/button";
import { MarketPairCell } from "@/registry/perps/components/market-pair-cell";
import {
	MarketSwitcherTable,
	type MarketSwitcherTableColumn,
	type MarketSwitcherTableRow,
} from "./market-switcher-table";

function SortAction() {
	return (
		<Button
			variant="ghost"
			size="icon-xs"
			className="-my-1 h-5 w-5 text-muted-foreground"
		>
			<ChevronsUpDownIcon />
		</Button>
	);
}

const columns: MarketSwitcherTableColumn[] = [
	{ key: "market", header: "Market pair" },
	{ key: "price", header: "Price", action: <SortAction /> },
	{ key: "change24h", header: "24h %", action: <SortAction /> },
	{ key: "volume24h", header: "24h Vol", action: <SortAction /> },
	{ key: "openInterest", header: "OI", align: "end", action: <SortAction /> },
];

const rows: MarketSwitcherTableRow[] = [
	{
		id: "btc",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="BTC"
					quoteSymbol="USDC"
					avatarFallback="B"
					badges={[{ tone: "info", label: "40x" }]}
				/>
			),
			price: "$66,167.2",
			change24h: <span className="text-success">+1.13%</span>,
			volume24h: "$1.1B",
			openInterest: "$2.1B",
		},
	},
	{
		id: "hype-perp",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="HYPE"
					quoteSymbol="USDC"
					avatarFallback="H"
					badges={[{ tone: "info", label: "10x" }]}
				/>
			),
			price: "$59.8",
			change24h: <span className="text-destructive">-1.34%</span>,
			volume24h: "$437.9M",
			openInterest: "$1.23B",
		},
	},
	{
		id: "eth",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="ETH"
					quoteSymbol="USDC"
					avatarFallback="E"
					badges={[{ tone: "info", label: "25x" }]}
				/>
			),
			price: "$1,676.8",
			change24h: <span className="text-success">+0.83%</span>,
			volume24h: "$245.1M",
			openInterest: "$1.26B",
		},
	},
	{
		id: "hype-spot",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="HYPE"
					quoteSymbol="USDC"
					avatarFallback="H"
					badges={[{ tone: "warning", label: "Spot" }]}
				/>
			),
			price: "$59.8",
			change24h: <span className="text-destructive">-1.34%</span>,
			volume24h: "$208.3M",
			openInterest: "-",
		},
	},
	{
		id: "wti",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="WTIOIL"
					quoteSymbol="USDC"
					avatarFallback="O"
					badges={[
						{ tone: "info", label: "20x" },
						{ tone: "secondary", label: "xyz" },
					]}
				/>
			),
			price: "$83,635",
			change24h: <span className="text-destructive">-2.35%</span>,
			volume24h: "$105.5M",
			openInterest: "$377.3M",
		},
	},
	{
		id: "sp500",
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="S&P500"
					quoteSymbol="USDC"
					avatarFallback="S"
					badges={[
						{ tone: "info", label: "50x" },
						{ tone: "secondary", label: "xyz" },
					]}
				/>
			),
			price: "$7,438.6",
			change24h: <span className="text-success">+0.16%</span>,
			volume24h: "$76.9M",
			openInterest: "$219.6M",
		},
	},
	{
		id: "palladium",
		disabled: true,
		cells: {
			market: (
				<MarketPairCell
					baseSymbol="PALLADIUM"
					quoteSymbol="USDC"
					avatarFallback="P"
					badges={[
						{ tone: "info", label: "40x" },
						{ tone: "secondary", label: "xyz" },
					]}
				/>
			),
			price: "$1,292.5",
			change24h: <span className="text-success">+0.77%</span>,
			volume24h: "$64.2K",
			openInterest: "$161.8K",
		},
	},
];

const meta = {
	component: MarketSwitcherTable,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A compact market picker table for pair selection, market stats, and sorting. Install with `pnpm dlx shadcn@latest add @perps/market-switcher-table`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105593-71142",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-[760px] rounded-lg border bg-card">
				<Story />
			</div>
		),
	],
	args: {
		columns,
		rows,
		selectedRowId: "btc",
		onRowSelect: fn(),
	},
} satisfies Meta<typeof MarketSwitcherTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Static: Story = {
	args: {
		onRowSelect: undefined,
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
};

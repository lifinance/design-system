import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Spread } from "@/registry/perps/ui/spread";
import { MarketTable, type MarketTableRow } from "./market-table";

const asks: MarketTableRow[] = [
	{
		id: "a3",
		tone: "down",
		cells: { price: "$63,545", size: "10.76", total: "$1,957,205" },
	},
	{
		id: "a2",
		tone: "down",
		cells: { price: "$63,544", size: "1.89", total: "$1,603,998" },
	},
	{
		id: "a1",
		tone: "down",
		cells: { price: "$63,543", size: "0.6628", total: "$488,152" },
	},
];

const bids: MarketTableRow[] = [
	{
		id: "b1",
		tone: "up",
		cells: { price: "$63,535", size: "0.6628", total: "$119,223" },
	},
	{
		id: "b2",
		tone: "up",
		cells: { price: "$63,534", size: "1.89", total: "$119,521" },
	},
	{
		id: "b3",
		tone: "up",
		cells: { price: "$63,533", size: "0.0325", total: "$133,402" },
	},
];

const meta = {
	component: MarketTable,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A compact financial table for order-book and trades data: end-aligned numeric columns, tone-colored leading column, optional header actions and a full-width divider row. Install with `pnpm dlx shadcn@latest add @perps/market-table`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105324-99062",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96 rounded-lg border bg-card">
				<Story />
			</div>
		),
	],
	args: {
		columns: [
			{ key: "price", header: "Price" },
			{ key: "size", header: "Size (BTC)", align: "start" },
			{ key: "total", header: "Total (USD)", align: "end" },
		],
		rows: [...asks, ...bids],
		dividerAfter: asks.length,
		divider: (
			<div className="flex items-center justify-between">
				<span className="text-xs font-medium text-muted-foreground">0.01</span>
				<Spread value={0.03} percent={0.01} />
			</div>
		),
	},
} satisfies Meta<typeof MarketTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrderBook: Story = {};

export const Trades: Story = {
	args: {
		columns: [
			{ key: "price", header: "Price" },
			{ key: "size", header: "Size (BTC)", align: "start" },
			{ key: "time", header: "Time", align: "end" },
		],
		rows: [
			{
				id: "t1",
				tone: "down",
				cells: { price: "$63,545", size: "10.76", time: "14:38:43" },
			},
			{
				id: "t2",
				tone: "up",
				cells: { price: "$63,535", size: "1.89", time: "14:38:43" },
			},
			{
				id: "t3",
				tone: "up",
				cells: { price: "$63,534", size: "0.6628", time: "14:38:42" },
			},
			{
				id: "t4",
				tone: "down",
				cells: { price: "$63,544", size: "1.33", time: "14:38:35" },
			},
		],
		dividerAfter: undefined,
		divider: undefined,
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
};

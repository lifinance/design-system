import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/core/ui/select";
import { Spread } from "./spread";

const meta = {
	component: Spread,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"The order-book spread divider: a three-cell row with a leading slot (e.g. a price-grouping select), a center slot, and the spread readout end-aligned. Install with `pnpm dlx shadcn@latest add @perps/spread`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105324-99062",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96 rounded-lg border bg-card p-2 text-card-foreground">
				<Story />
			</div>
		),
	],
	args: {
		value: 0.03,
		percent: 0.01,
	},
} satisfies Meta<typeof Spread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const GranularitySelect = () => (
	<Select defaultValue="0.01">
		<SelectTrigger variant="ghost" size="xs" aria-label="Price grouping">
			<SelectValue />
		</SelectTrigger>
		<SelectContent size="xs" aria-label="Price grouping">
			<SelectGroup>
				{["0.01", "0.1", "1"].map((option) => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectGroup>
		</SelectContent>
	</Select>
);

export const WithSelect: Story = {
	args: {
		start: <GranularitySelect />,
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-3">
			<Spread value={0.03} percent={0.01} start={<GranularitySelect />} />
			<Spread value={12.5} percent={0.42} />
		</div>
	),
};

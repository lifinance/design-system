import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "./item";

const meta = {
	component: Item,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A flexible row that pairs a title and description with optional media and actions. Install with `pnpm dlx shadcn@latest add @core/item`.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Item variant="outline">
			<ItemContent>
				<ItemTitle>Ethereum</ItemTitle>
				<ItemDescription>Mainnet</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="outline" size="sm">
					Select
				</Button>
			</ItemActions>
		</Item>
	),
};

export const Group: Story = {
	render: () => (
		<ItemGroup>
			<Item role="listitem">
				<ItemContent>
					<ItemTitle>Arbitrum</ItemTitle>
					<ItemDescription>Layer 2</ItemDescription>
				</ItemContent>
			</Item>
			<Item role="listitem">
				<ItemContent>
					<ItemTitle>Optimism</ItemTitle>
					<ItemDescription>Layer 2</ItemDescription>
				</ItemContent>
			</Item>
		</ItemGroup>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-3">
			<Item>
				<ItemContent>
					<ItemTitle>Ethereum</ItemTitle>
					<ItemDescription>Default variant</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button variant="outline" size="sm">
						Select
					</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Arbitrum</ItemTitle>
					<ItemDescription>Outline variant</ItemDescription>
				</ItemContent>
			</Item>
			<Item variant="muted">
				<ItemContent>
					<ItemTitle>Optimism</ItemTitle>
					<ItemDescription>Muted variant</ItemDescription>
				</ItemContent>
			</Item>
		</div>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	MinusIcon,
	PlusIcon,
	SearchIcon,
} from "lucide-react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from "./button-group";
import { Input } from "./input";
import { Label } from "./label";

const FIGMA = {
	group:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=28685-127189",
	input:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=28706-128353",
	separator:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101048-6378",
};

const meta = {
	component: ButtonGroup,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"Joins related buttons and inputs into one connected control. Install with `pnpm dlx shadcn@latest add @core/button-group`.",
			},
		},
		design: { type: "figma", url: FIGMA.group },
	},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<ButtonGroup aria-label="Time range">
			<Button variant="outline">Day</Button>
			<Button variant="outline">Week</Button>
			<Button variant="outline">Month</Button>
		</ButtonGroup>
	),
	play: async ({ canvas, userEvent }) => {
		await expect(
			canvas.getByRole("group", { name: /time range/i }),
		).toBeVisible();
		const week = canvas.getByRole("button", { name: /week/i });
		await userEvent.click(week);
		await expect(week).toHaveFocus();
	},
};

export const WithText: Story = {
	render: () => (
		<ButtonGroup className="w-80">
			<ButtonGroupText render={<Label htmlFor="transfer-amount" />}>
				Amount
			</ButtonGroupText>
			<Input id="transfer-amount" placeholder="0.00" />
		</ButtonGroup>
	),
};

export const WithInput: Story = {
	parameters: { design: { type: "figma", url: FIGMA.input } },
	render: () => (
		<ButtonGroup className="w-80">
			<Input aria-label="Search tokens" placeholder="Search tokens" />
			<Button variant="outline" size="icon" aria-label="Search">
				<SearchIcon />
			</Button>
		</ButtonGroup>
	),
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: /search tokens/i });
		await userEvent.type(input, "USDC");
		await expect(input).toHaveValue("USDC");
	},
};

export const SplitButton: Story = {
	parameters: { design: { type: "figma", url: FIGMA.separator } },
	render: () => (
		<ButtonGroup>
			<Button>Send</Button>
			<ButtonGroupSeparator />
			<Button size="icon" aria-label="More send options">
				<ChevronDownIcon />
			</Button>
		</ButtonGroup>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("separator")).toBeInTheDocument();
		await expect(
			canvas.getByRole("button", { name: /more send options/i }),
		).toBeVisible();
	},
};

export const Vertical: Story = {
	render: () => (
		<ButtonGroup orientation="vertical" aria-label="Zoom">
			<Button variant="outline" size="icon" aria-label="Zoom in">
				<PlusIcon />
			</Button>
			<Button variant="outline" size="icon" aria-label="Zoom out">
				<MinusIcon />
			</Button>
		</ButtonGroup>
	),
};

export const Nested: Story = {
	render: () => (
		<ButtonGroup aria-label="Pagination">
			<ButtonGroup>
				<Button variant="outline" size="sm">
					1
				</Button>
				<Button variant="outline" size="sm">
					2
				</Button>
				<Button variant="outline" size="sm">
					3
				</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button variant="outline" size="icon-sm" aria-label="Previous page">
					<ChevronLeftIcon />
				</Button>
				<Button variant="outline" size="icon-sm" aria-label="Next page">
					<ChevronRightIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col items-start gap-4">
			<ButtonGroup aria-label="Time range">
				<Button variant="outline">Day</Button>
				<Button variant="outline">Week</Button>
				<Button variant="outline">Month</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button>Send</Button>
				<ButtonGroupSeparator />
				<Button size="icon" aria-label="More send options">
					<ChevronDownIcon />
				</Button>
			</ButtonGroup>
			<ButtonGroup className="w-80">
				<ButtonGroupText render={<Label htmlFor="overview-amount" />}>
					Amount
				</ButtonGroupText>
				<Input id="overview-amount" placeholder="0.00" />
			</ButtonGroup>
			<ButtonGroup aria-label="Pagination">
				<ButtonGroup>
					<Button variant="outline" size="sm">
						1
					</Button>
					<Button variant="outline" size="sm">
						2
					</Button>
					<Button variant="outline" size="sm">
						3
					</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline" size="icon-sm" aria-label="Previous page">
						<ChevronLeftIcon />
					</Button>
					<Button variant="outline" size="icon-sm" aria-label="Next page">
						<ChevronRightIcon />
					</Button>
				</ButtonGroup>
			</ButtonGroup>
			<ButtonGroup orientation="vertical" aria-label="Zoom">
				<Button variant="outline" size="icon" aria-label="Zoom in">
					<PlusIcon />
				</Button>
				<Button variant="outline" size="icon" aria-label="Zoom out">
					<MinusIcon />
				</Button>
			</ButtonGroup>
		</div>
	),
};

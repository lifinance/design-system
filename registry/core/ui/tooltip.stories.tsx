import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoIcon, SaveIcon } from "lucide-react";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./tooltip";

const meta = {
	component: Tooltip,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A popup that shows a hint when its trigger is hovered or focused. Wrap your app in a `TooltipProvider`. Install with `pnpm dlx shadcn@latest add @core/tooltip`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6873-680",
		},
	},
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Add to library
			</TooltipTrigger>
			<TooltipContent>Saves this item to your library</TooltipContent>
		</Tooltip>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /add to library/i });
		await userEvent.hover(trigger);
		const tooltip = await screen.findByRole("tooltip");
		await waitFor(() => expect(tooltip).toBeVisible());
		await expect(tooltip).toHaveTextContent(/saves this item to your library/i);
		await userEvent.unhover(trigger);
		await waitFor(() =>
			expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
		);
	},
};

export const IconTrigger: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="ghost" size="icon" />}>
				<InfoIcon />
				<span className="sr-only">More information</span>
			</TooltipTrigger>
			<TooltipContent>This data refreshes every few minutes</TooltipContent>
		</Tooltip>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /more information/i });
		await userEvent.hover(trigger);
		await waitFor(() =>
			expect(screen.getByRole("tooltip")).toHaveTextContent(
				/refreshes every few minutes/i,
			),
		);
		await userEvent.unhover(trigger);
		await waitFor(() =>
			expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
		);
	},
};

export const Sides: Story = {
	render: () => (
		<div className="flex gap-2">
			{(["top", "right", "bottom", "left"] as const).map((side) => (
				<Tooltip key={side}>
					<TooltipTrigger
						render={<Button variant="outline" className="capitalize" />}
					>
						{side}
					</TooltipTrigger>
					<TooltipContent side={side}>Appears on the {side}</TooltipContent>
				</Tooltip>
			))}
		</div>
	),
};

export const LongContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Learn more
			</TooltipTrigger>
			<TooltipContent>
				Routes are compared across providers so you always see the best
				available price before you confirm a transfer.
			</TooltipContent>
		</Tooltip>
	),
};

export const FormattedContent: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Status
			</TooltipTrigger>
			<TooltipContent>
				<div className="flex flex-col gap-1">
					<p className="font-semibold">Active</p>
					<p className="opacity-80">Last updated a few minutes ago</p>
				</div>
			</TooltipContent>
		</Tooltip>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex items-center gap-12 p-12">
			<Tooltip defaultOpen>
				<TooltipTrigger render={<Button variant="outline" />}>
					Add to library
				</TooltipTrigger>
				<TooltipContent>Saves this item to your library</TooltipContent>
			</Tooltip>
			<Tooltip defaultOpen>
				<TooltipTrigger render={<Button variant="ghost" size="icon" />}>
					<SaveIcon />
					<span className="sr-only">Save changes</span>
				</TooltipTrigger>
				<TooltipContent side="bottom">Save changes</TooltipContent>
			</Tooltip>
		</div>
	),
};

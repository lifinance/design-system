import { RiInformationLine, RiSaveLine } from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, screen, waitFor } from "storybook/test";
import { pressUntil, waitForFocusWithin } from "@/.storybook/interactions";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Popover,
	PopoverContent,
	PopoverTitle,
	PopoverTrigger,
} from "./popover";
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
				<RiInformationLine />
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

/** The size the `h-10 w-60` trigger measures, so the anchor is unique. */
const TRIGGER_WIDTH = 240;
const TRIGGER_HEIGHT = 40;

/** Holds the node the trigger ref receives, so the play function can read it. */
const triggerRef = React.createRef<HTMLButtonElement>();

export const ComposedTrigger: Story = {
	render: () => (
		<Popover>
			<Tooltip>
				<PopoverTrigger
					render={
						<TooltipTrigger
							ref={triggerRef}
							render={<Button variant="outline" className="h-10 w-60" />}
						/>
					}
				>
					Execution
				</PopoverTrigger>
				<TooltipContent>Sets how this order closes</TooltipContent>
			</Tooltip>
			<PopoverContent align="start">
				<PopoverTitle className="sr-only">Execution</PopoverTitle>
				Market or limit
			</PopoverContent>
		</Popover>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /execution/i });
		const box = trigger.getBoundingClientRect();
		await expect(box.width).toBe(TRIGGER_WIDTH);
		await expect(box.height).toBe(TRIGGER_HEIGHT);
		await expect(triggerRef.current).toBe(trigger);

		await userEvent.hover(trigger);
		const tip = await screen.findByRole("tooltip");
		await waitFor(() => expect(tip).toBeVisible());
		await expect(tip).toHaveTextContent(/sets how this order closes/i);
		await expect(trigger).toHaveAttribute("aria-describedby", tip.id);
		await userEvent.unhover(trigger);

		await userEvent.click(trigger);
		const positioner = (await screen.findByRole("dialog")).parentElement;
		// The popover trigger clones this trigger and measures the anchor through
		// the ref it attaches. A dropped ref leaves the popup unmeasured at the
		// viewport origin, sized to the viewport and held at zero opacity.
		await waitFor(() => {
			const style = positioner?.getAttribute("style") ?? "";
			expect(style).toContain(`--anchor-width: ${TRIGGER_WIDTH}px`);
			expect(style).toContain(`--anchor-height: ${TRIGGER_HEIGHT}px`);
			expect(style).not.toContain("opacity: 0");
		});

		await waitForFocusWithin(screen.getByRole("dialog"));
		await pressUntil(userEvent, "{Escape}", () =>
			expect(screen.queryByText(/market or limit/i)).not.toBeInTheDocument(),
		);
	},
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
					<RiSaveLine />
					<span className="sr-only">Save changes</span>
				</TooltipTrigger>
				<TooltipContent side="bottom">Save changes</TooltipContent>
			</Tooltip>
		</div>
	),
};

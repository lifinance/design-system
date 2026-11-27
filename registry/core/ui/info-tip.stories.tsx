import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect, fireEvent, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	InfoTip,
	InfoTipContent,
	InfoTipProvider,
	InfoTipRoot,
	InfoTipTrigger,
} from "./info-tip";

const FUNDING = "Funding settles every hour.";
const VENUES = ["Hyperliquid", "Lighter", "Paradex"];
/** Long enough that an immediate reveal fails the assertion. */
const DELAY = 300;

const meta = {
	component: InfoTip,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An info icon that explains a nearby label. The explanation opens on hover or focus, and a touch tap toggles it. Wrap your app in an `InfoTipProvider` to set the open delay; without one, tips open at once. Install with `pnpm dlx shadcn@latest add @core/info-tip`.",
			},
		},
	},
	decorators: [
		(Story) => (
			<InfoTipProvider>
				<Story />
			</InfoTipProvider>
		),
	],
} satisfies Meta<typeof InfoTip>;

export default meta;
type Story = StoryObj<typeof meta>;

type UserEvent = Parameters<NonNullable<Story["play"]>>[0]["userEvent"];

function FundingLabel(props: React.ComponentProps<typeof InfoTip>) {
	return (
		<span className="inline-flex items-center gap-1 text-sm">
			Funding rate
			<InfoTip aria-label="About funding rate" {...props}>
				{FUNDING}
			</InfoTip>
		</span>
	);
}

export const Default: Story = {
	render: () => <FundingLabel />,
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /about funding rate/i });
		await expect(trigger).toHaveAccessibleDescription(FUNDING);

		await userEvent.hover(trigger);
		const tip = await screen.findByRole("tooltip");
		await waitFor(() => expect(tip).toBeVisible());
		await expect(tip).toHaveTextContent(FUNDING);
		await expect(trigger).toHaveAttribute("aria-describedby", tip.id);

		await userEvent.unhover(trigger);
		await waitFor(() =>
			expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
		);
	},
};

/** Asserts a tip that mounts only while open: the trigger keeps one resolved
 * description throughout, and the open popup is the element it references. */
async function expectMountedOnlyWhileOpen(
	trigger: HTMLElement,
	userEvent: UserEvent,
	description: string,
) {
	await expect(
		screen.queryByRole("tooltip", { hidden: true }),
	).not.toBeInTheDocument();
	await expect(trigger).toHaveAccessibleDescription(description);

	await userEvent.hover(trigger);
	const tip = await screen.findByRole("tooltip");
	await waitFor(() => expect(tip).toBeVisible());
	await expect(trigger).toHaveAttribute("aria-describedby", tip.id);
	await expect(document.querySelectorAll(`[id="${tip.id}"]`)).toHaveLength(1);

	await userEvent.unhover(trigger);
	await waitFor(() =>
		expect(
			screen.queryByRole("tooltip", { hidden: true }),
		).not.toBeInTheDocument(),
	);
	await expect(trigger).toHaveAccessibleDescription(description);
}

/** With `keepMounted={false}`, the popup leaves the DOM while closed. Use it
 * for tips rendered many times, such as one per table row. */
export const MountedWhileOpen: Story = {
	render: () => <FundingLabel keepMounted={false} />,
	play: async ({ canvas, userEvent }) => {
		await expectMountedOnlyWhileOpen(
			canvas.getByRole("button", { name: /about funding rate/i }),
			userEvent,
			FUNDING,
		);
	},
};

/** Formatted content that mounts only while open needs a plain-text
 * `description` for the trigger. */
export const FormattedMountedWhileOpen: Story = {
	render: () => (
		<InfoTipRoot>
			<InfoTipTrigger render={<Button variant="link" />}>
				3 venues
			</InfoTipTrigger>
			<InfoTipContent keepMounted={false} description={VENUES.join(", ")}>
				<ul className="flex flex-col gap-0.5">
					{VENUES.map((venue) => (
						<li key={venue}>{venue}</li>
					))}
				</ul>
			</InfoTipContent>
		</InfoTipRoot>
	),
	play: async ({ canvas, userEvent }) => {
		await expectMountedOnlyWhileOpen(
			canvas.getByRole("button", { name: /3 venues/i }),
			userEvent,
			VENUES.join(", "),
		);
	},
};

/** A touch tap toggles the explanation, since touch has no hover. */
export const TouchTap: Story = {
	render: () => <FundingLabel />,
	play: async ({ canvas }) => {
		const trigger = canvas.getByRole("button", { name: /about funding rate/i });
		const tap = () => {
			fireEvent.pointerDown(trigger, { pointerType: "touch" });
			fireEvent.click(trigger);
		};

		tap();
		await waitFor(() => expect(screen.getByRole("tooltip")).toBeVisible());
		tap();
		await waitFor(() =>
			expect(screen.queryByRole("tooltip")).not.toBeInTheDocument(),
		);
	},
};

/** The open delay comes from the nearest `InfoTipProvider`. */
export const ProviderDelay: Story = {
	render: () => (
		<InfoTipProvider delay={DELAY}>
			<FundingLabel />
		</InfoTipProvider>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /about funding rate/i });
		await userEvent.hover(trigger);
		await new Promise((resolve) => setTimeout(resolve, DELAY / 2));
		await expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
		await waitFor(() => expect(screen.getByRole("tooltip")).toBeVisible());
		await userEvent.unhover(trigger);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="p-12 pb-24">
			<FundingLabel />
		</div>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.hover(
			canvas.getByRole("button", { name: /about funding rate/i }),
		);
		await waitFor(() => expect(screen.getByRole("tooltip")).toBeVisible());
	},
};

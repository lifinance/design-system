/// <reference types="vite/client" />
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { brandSnapshot } from "@/.storybook/modes";
import { ActivityCard } from "./activity-card";
import heroSrc from "./activity-card-hero.jpg";

const TITLE = "Swap_oor";
const DESCRIPTION =
	"Complete your first bridge swap between an EVM chain and Solana.";
const HINT = "Swap 461 USD more for 18 XP";

const meta = {
	component: ActivityCard,
	globals: { theme: "jumper" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"An activity card showing artwork, a title, a date, a description, and a reward you earn. While available, it shows progress toward the reward with a hint on hover. Install with `pnpm dlx shadcn@latest add @jumper/activity-card`.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-64">
				<Story />
			</div>
		),
	],
	args: {
		title: TITLE,
		description: DESCRIPTION,
		imageUrl: heroSrc,
		date: "June 2025",
		reward: "10 XP",
		progress: 0.15,
		progressHint: HINT,
	},
} satisfies Meta<typeof ActivityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
	args: { status: "available" },
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /progress/i });
		await userEvent.hover(trigger);
		const tooltip = await screen.findByRole("tooltip");
		await waitFor(() => expect(tooltip).toBeVisible());
		await expect(tooltip).toHaveTextContent(/swap 461 usd more for 18 xp/i);
	},
};

export const Earned: Story = {
	args: { status: "earned" },
};

export const Failed: Story = {
	args: { status: "failed", reward: "0 XP" },
};

export const Overview: Story = {
	parameters: { chromatic: brandSnapshot("jumper") },
	render: () => (
		<div className="flex flex-col gap-4">
			<ActivityCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				date="June 2025"
				reward="10 XP"
				status="available"
				progress={0.15}
				progressHint={HINT}
			/>
			<ActivityCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				date="June 2025"
				reward="10 XP"
				status="earned"
			/>
			<ActivityCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				date="June 2025"
				reward="0 XP"
				status="failed"
			/>
		</div>
	),
};

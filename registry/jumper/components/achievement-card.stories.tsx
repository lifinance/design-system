import type { Meta, StoryObj } from "@storybook/react-vite";
import { brandSnapshot } from "@/.storybook/modes";
import { AchievementCard } from "./achievement-card";

const IMAGE =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23493d8a'/%3E%3Ccircle cx='48' cy='42' r='22' fill='%23b794f4'/%3E%3Crect x='20' y='66' width='56' height='10' rx='5' fill='%236b5bd2'/%3E%3C/svg%3E";

const meta = {
	component: AchievementCard,
	globals: { theme: "jumper" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"An achievement card showing artwork, a title, a description, and a badge. Install with `pnpm dlx shadcn@latest add @jumper/achievement-card`.",
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
	args: {
		title: "Power user",
		description: "March 2025",
		imageUrl: IMAGE,
		badge: "30 XP",
	},
} satisfies Meta<typeof AchievementCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeaderBadge: Story = {
	args: {
		title: "Early adopter",
		description: "February 2025",
		imageUrl: IMAGE,
		badge: "10 XP",
		headerBadge: "New",
	},
};

export const MissingImage: Story = {
	args: {
		title: "Early adopter",
		description: "February 2025",
		badge: "10 XP",
	},
};

export const LongText: Story = {
	args: {
		title: "Cross-chain swaps completed on every supported network",
		description: "Swapped on Ethereum, Arbitrum, Optimism, Base, and nine more",
		imageUrl: IMAGE,
		badge: "7 XP",
	},
};

export const Overview: Story = {
	parameters: { chromatic: brandSnapshot("jumper") },
	render: () => (
		<div className="flex flex-col gap-4">
			<AchievementCard
				title="Power user"
				description="March 2025"
				imageUrl={IMAGE}
				badge="30 XP"
				headerBadge="New"
			/>
			<AchievementCard
				title="Early adopter"
				description="February 2025"
				badge="10 XP"
			/>
			<AchievementCard
				title="Cross-chain swaps completed on every supported network"
				description="Swapped on Ethereum, Arbitrum, Optimism, Base, and nine more"
				imageUrl={IMAGE}
				badge="7 XP"
			/>
		</div>
	),
};

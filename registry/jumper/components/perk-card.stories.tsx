/// <reference types="vite/client" />
import type { Meta, StoryObj } from "@storybook/react-vite";
import { brandSnapshot } from "@/.storybook/modes";
import { PerkCard } from "./perk-card";
import heroSrc from "./perk-card-hero.png";

const TITLE = "Jumper Travel - Tier 1";
const DESCRIPTION =
	"Get access to big discounts and exclusive hotel deals, powered by Entravel";

const meta = {
	component: PerkCard,
	globals: { theme: "jumper" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A perk card showing artwork, a title, a description, a discount, and an unlock status. Install with `pnpm dlx shadcn@latest add @jumper/perk-card`.",
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
		discount: "30% off",
	},
} satisfies Meta<typeof PerkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Claimed: Story = {
	args: { status: "claimed" },
};

export const Unlocked: Story = {
	args: { status: "unlocked" },
};

export const Level: Story = {
	args: { status: "level", level: 10 },
};

export const MissingImage: Story = {
	args: { imageUrl: undefined },
};

export const Overview: Story = {
	parameters: { chromatic: brandSnapshot("jumper") },
	render: () => (
		<div className="flex flex-col gap-4">
			<PerkCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				discount="30% off"
				status="claimed"
			/>
			<PerkCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				discount="30% off"
				status="unlocked"
			/>
			<PerkCard
				title={TITLE}
				description={DESCRIPTION}
				imageUrl={heroSrc}
				discount="30% off"
				status="level"
				level={10}
			/>
		</div>
	),
};

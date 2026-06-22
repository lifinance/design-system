/// <reference types="vite/client" />
import type { Meta, StoryObj } from "@storybook/react-vite";
import { brandSnapshot } from "@/.storybook/modes";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/core/ui/avatar";
import { MissionCard } from "./mission-card";
import avatarSrc from "./mission-card-avatar.svg";
import heroSrc from "./mission-card-hero.png";

const TITLE = "Save Up to 65% on Hotels & Earn Jumper XP";

const jumperAvatar = (
	<Avatar>
		<AvatarImage src={avatarSrc} alt="Jumper" />
		<AvatarFallback>J</AvatarFallback>
	</Avatar>
);

const meta = {
	component: MissionCard,
	globals: { theme: "jumper" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A mission card showing artwork, a chain, a title, and the reward you earn. Set `status` to `available` or `earned`. Install with `pnpm dlx shadcn@latest add @jumper/mission-card`.",
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
		reward: "10 XP",
		imageUrl: heroSrc,
		avatar: jumperAvatar,
	},
} satisfies Meta<typeof MissionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
	args: { status: "available" },
};

export const Earned: Story = {
	args: { status: "earned" },
};

export const WithoutAvatar: Story = {
	args: { avatar: undefined },
};

export const MissingImage: Story = {
	args: { imageUrl: undefined },
};

export const Stretched: Story = {
	render: (args) => (
		<div className="grid h-72 gap-4">
			<MissionCard {...args} />
		</div>
	),
};

export const Overview: Story = {
	parameters: { chromatic: brandSnapshot("jumper") },
	render: () => (
		<div className="flex flex-col gap-4">
			<MissionCard
				title={TITLE}
				reward="10 XP"
				status="available"
				imageUrl={heroSrc}
				avatar={jumperAvatar}
			/>
			<MissionCard
				title={TITLE}
				reward="10 XP"
				status="earned"
				imageUrl={heroSrc}
				avatar={jumperAvatar}
			/>
		</div>
	),
};

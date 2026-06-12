import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";
import { snapshot } from "@/.storybook/modes";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
} from "./avatar";

const FIGMA = {
	avatar:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=8-297",
	badge:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101015-48165",
	group:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6775-352",
};

const ASSETS = [
	{
		name: "Ethereum",
		initials: "ET",
		logo: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg",
	},
	{
		name: "USD Coin",
		initials: "US",
		logo: "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602",
	},
	{
		name: "Solana",
		initials: "SO",
		logo: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/solana.svg",
	},
];

const NETWORKS = [
	{
		name: "Optimism",
		logo: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg",
	},
	{
		name: "Base",
		logo: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/base.svg",
	},
];

const meta = {
	component: Avatar,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A picture or initials that represents a user, a crypto asset, or any entity, with optional status badge and stacked groups. Install with `pnpm dlx shadcn@latest add @core/avatar`.",
			},
		},
		design: { type: "figma", url: FIGMA.avatar },
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Avatar>
			<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
			<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
		</Avatar>
	),
};

export const Fallback: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
		</Avatar>
	),
};

export const Icon: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>
				<PlusIcon className="size-4" />
			</AvatarFallback>
		</Avatar>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar size="sm">
				<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
				<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
				<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
			</Avatar>
			<Avatar size="lg">
				<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
				<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
			</Avatar>
		</div>
	),
};

export const Badge: Story = {
	parameters: { design: { type: "figma", url: FIGMA.badge } },
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar size="lg">
				<AvatarImage src={ASSETS[1].logo} alt={ASSETS[1].name} />
				<AvatarFallback>{ASSETS[1].initials}</AvatarFallback>
				<AvatarBadge className="size-4">
					<img
						src={NETWORKS[1].logo}
						alt={NETWORKS[1].name}
						className="size-full rounded-full"
					/>
				</AvatarBadge>
			</Avatar>
			<Avatar size="lg">
				<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
				<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
				<AvatarBadge className="size-4">
					<img
						src={NETWORKS[0].logo}
						alt={NETWORKS[0].name}
						className="size-full rounded-full"
					/>
				</AvatarBadge>
			</Avatar>
		</div>
	),
};

export const Group: Story = {
	parameters: { design: { type: "figma", url: FIGMA.group } },
	render: () => (
		<AvatarGroup>
			{ASSETS.map((asset) => (
				<Avatar key={asset.name}>
					<AvatarImage src={asset.logo} alt={asset.name} />
					<AvatarFallback>{asset.initials}</AvatarFallback>
				</Avatar>
			))}
		</AvatarGroup>
	),
};

export const GroupCount: Story = {
	parameters: { design: { type: "figma", url: FIGMA.group } },
	render: () => (
		<AvatarGroup>
			{ASSETS.map((asset) => (
				<Avatar key={asset.name}>
					<AvatarImage src={asset.logo} alt={asset.name} />
					<AvatarFallback>{asset.initials}</AvatarFallback>
				</Avatar>
			))}
			<AvatarGroupCount>+3</AvatarGroupCount>
		</AvatarGroup>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				{(["sm", "default", "lg"] as const).map((size) => (
					<Avatar key={size} size={size}>
						<AvatarImage src={ASSETS[0].logo} alt={ASSETS[0].name} />
						<AvatarFallback>{ASSETS[0].initials}</AvatarFallback>
					</Avatar>
				))}
				<Avatar>
					<AvatarFallback>{ASSETS[1].initials}</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarFallback>
						<PlusIcon className="size-4" />
					</AvatarFallback>
				</Avatar>
				<Avatar size="lg">
					<AvatarImage src={ASSETS[1].logo} alt={ASSETS[1].name} />
					<AvatarFallback>{ASSETS[1].initials}</AvatarFallback>
					<AvatarBadge className="size-4">
						<img
							src={NETWORKS[1].logo}
							alt={NETWORKS[1].name}
							className="size-full rounded-full"
						/>
					</AvatarBadge>
				</Avatar>
			</div>
			<AvatarGroup>
				{ASSETS.map((asset) => (
					<Avatar key={asset.name}>
						<AvatarImage src={asset.logo} alt={asset.name} />
						<AvatarFallback>{asset.initials}</AvatarFallback>
					</Avatar>
				))}
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
		</div>
	),
};

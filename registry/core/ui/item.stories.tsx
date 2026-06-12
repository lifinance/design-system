import type { Meta, StoryObj } from "@storybook/react-vite";
import { BadgeCheckIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { Fragment } from "react";
import { snapshot } from "@/.storybook/modes";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "./item";

const FIGMA = {
	item: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-3156",
	group:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-31422",
};

const LIFI_MARK =
	"https://raw.githubusercontent.com/lifinance/brand-assets/main/LI.FI/Logo/PNG/logo%20lifi%20mark%20(light%20theme)%404x.png";

const SIGNERS = [
	{
		name: "MetaMask",
		initials: "MM",
		image:
			"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/wallets/metamask.svg",
	},
	{
		name: "Safe",
		initials: "SA",
		image:
			"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/wallets/safe.svg",
	},
	{
		name: "Coinbase Wallet",
		initials: "CW",
		image:
			"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/wallets/coinbase.svg",
	},
];

const TOKENS = [
	{
		name: "Ethereum",
		ticker: "ET",
		symbol: "ETH",
		balance: "1.2401",
		mark: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg",
	},
	{
		name: "USD Coin",
		ticker: "US",
		symbol: "USDC",
		balance: "1,024.50",
		mark: "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602",
	},
	{
		name: "Solana",
		ticker: "SO",
		symbol: "SOL",
		balance: "540.02",
		mark: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/solana.svg",
	},
];

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
		design: { type: "figma", url: FIGMA.item },
	},
	decorators: [
		(Story) => (
			<div className="w-96">
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
				<ItemTitle>Basic item</ItemTitle>
				<ItemDescription>
					A simple item with title and description.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="outline" size="sm">
					Select
				</Button>
			</ItemActions>
		</Item>
	),
};

export const IconMedia: Story = {
	render: () => (
		<Item variant="outline">
			<ItemMedia variant="icon">
				<BadgeCheckIcon />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Wallet verified</ItemTitle>
				<ItemDescription>This address passed verification.</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="ghost" size="icon-sm" aria-label="Open">
					<ChevronRightIcon />
				</Button>
			</ItemActions>
		</Item>
	),
};

export const AvatarMedia: Story = {
	render: () => (
		<Item variant="outline">
			<ItemMedia>
				<Avatar>
					<AvatarImage src={TOKENS[0].mark} alt={TOKENS[0].name} />
					<AvatarFallback>{TOKENS[0].ticker}</AvatarFallback>
				</Avatar>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>{TOKENS[0].name}</ItemTitle>
				<ItemDescription>{TOKENS[0].symbol}</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="ghost" size="icon-sm" aria-label="Add token">
					<PlusIcon />
				</Button>
			</ItemActions>
		</Item>
	),
};

export const AvatarGroupMedia: Story = {
	render: () => (
		<Item variant="outline">
			<ItemMedia>
				<AvatarGroup>
					{SIGNERS.map((signer) => (
						<Avatar key={signer.name} size="sm">
							<AvatarImage src={signer.image} alt={signer.name} />
							<AvatarFallback>{signer.initials}</AvatarFallback>
						</Avatar>
					))}
				</AvatarGroup>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>No signers yet</ItemTitle>
				<ItemDescription>
					Invite signers to approve this transaction.
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="outline" size="sm">
					Invite
				</Button>
			</ItemActions>
		</Item>
	),
};

export const ImageMedia: Story = {
	render: () => (
		<Item variant="outline">
			<ItemMedia variant="image">
				<img src={LIFI_MARK} alt="LI.FI" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>LI.FI</ItemTitle>
				<ItemDescription>Cross-chain bridging and swapping</ItemDescription>
			</ItemContent>
			<ItemActions>
				<ChevronRightIcon className="size-4 text-muted-foreground" />
			</ItemActions>
		</Item>
	),
};

export const Link: Story = {
	render: () => (
		<Item
			variant="outline"
			// biome-ignore lint/a11y/useAnchorContent: useRender places the item content inside the anchor
			render={<a href="#explorer" />}
		>
			<ItemContent>
				<ItemTitle>View transaction</ItemTitle>
				<ItemDescription>Opens the block explorer.</ItemDescription>
			</ItemContent>
			<ItemActions>
				<ChevronRightIcon className="size-4 text-muted-foreground" />
			</ItemActions>
		</Item>
	),
};

export const Group: Story = {
	parameters: { design: { type: "figma", url: FIGMA.group } },
	render: () => (
		<ItemGroup className="rounded-md border">
			{TOKENS.map((token, index) => (
				<Fragment key={token.name}>
					{index > 0 && <ItemSeparator aria-hidden="true" />}
					<Item role="listitem">
						<ItemMedia>
							<Avatar>
								<AvatarImage src={token.mark} alt={token.name} />
								<AvatarFallback>{token.ticker}</AvatarFallback>
							</Avatar>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>{token.name}</ItemTitle>
							<ItemDescription>{token.symbol}</ItemDescription>
						</ItemContent>
						<ItemActions>
							<span className="text-sm text-muted-foreground">
								{token.balance}
							</span>
						</ItemActions>
					</Item>
				</Fragment>
			))}
		</ItemGroup>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-3">
			<Item variant="outline">
				<ItemContent>
					<ItemTitle>Basic item</ItemTitle>
					<ItemDescription>
						A simple item with title and description.
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button variant="outline" size="sm">
						Select
					</Button>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="icon">
					<BadgeCheckIcon />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Wallet verified</ItemTitle>
					<ItemDescription>This address passed verification.</ItemDescription>
				</ItemContent>
			</Item>
			<Item variant="muted">
				<ItemMedia>
					<Avatar>
						<AvatarImage src={TOKENS[0].mark} alt={TOKENS[0].name} />
						<AvatarFallback>{TOKENS[0].ticker}</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle>{TOKENS[0].name}</ItemTitle>
					<ItemDescription>{TOKENS[0].symbol}</ItemDescription>
				</ItemContent>
				<ItemActions>
					<span className="text-sm text-muted-foreground">
						{TOKENS[0].balance}
					</span>
				</ItemActions>
			</Item>
			<Item variant="outline">
				<ItemMedia variant="image">
					<img src={LIFI_MARK} alt="LI.FI" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>LI.FI</ItemTitle>
					<ItemDescription>Cross-chain bridging and swapping</ItemDescription>
				</ItemContent>
				<ItemActions>
					<ChevronRightIcon className="size-4 text-muted-foreground" />
				</ItemActions>
			</Item>
		</div>
	),
};

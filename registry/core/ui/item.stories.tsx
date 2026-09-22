import {
	RiAddLine,
	RiArrowRightSLine,
	RiVerifiedBadgeLine,
} from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, Fragment } from "react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import {
	Item,
	ItemActions,
	ItemBadges,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemLabel,
	ItemMedia,
	ItemRow,
	ItemSeparator,
	ItemTitle,
	ItemValue,
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

type Market = {
	symbol: string;
	name: string;
	ticker: string;
	mark: string;
	badges: string[];
	price: string;
	volume: string;
	change: string;
	tone: ComponentProps<typeof ItemValue>["tone"];
};

const MARKETS: Market[] = [
	{
		symbol: "ETH-PERP",
		name: "Ethereum",
		ticker: "ET",
		mark: TOKENS[0].mark,
		badges: ["10x"],
		price: "$3,412.80",
		volume: "Volume $1.2B",
		change: "+2.41%",
		tone: "success",
	},
	{
		symbol: "SOL-PERP",
		name: "Solana",
		ticker: "SO",
		mark: TOKENS[2].mark,
		badges: ["20x", "New"],
		price: "$184.02",
		volume: "Volume $412.6M",
		change: "-1.08%",
		tone: "destructive",
	},
	{
		symbol: "USDC-PERP settlement market",
		name: "USD Coin",
		ticker: "US",
		mark: TOKENS[1].mark,
		badges: ["5x"],
		price: "$1.0002",
		volume: "Volume $88.4M",
		change: "0.00%",
		tone: "default",
	},
];

const OverviewRow = ({ market }: { market: Market }) => (
	<Item variant="overview" role="listitem">
		<ItemMedia>
			<Avatar>
				<AvatarImage src={market.mark} alt={market.name} />
				<AvatarFallback>{market.ticker}</AvatarFallback>
			</Avatar>
		</ItemMedia>
		<ItemContent>
			<ItemRow>
				<ItemLabel>
					<ItemTitle>{market.symbol}</ItemTitle>
					<ItemBadges>
						{market.badges.map((badge) => (
							<Badge key={badge} variant="muted">
								{badge}
							</Badge>
						))}
					</ItemBadges>
				</ItemLabel>
				<ItemValue>{market.price}</ItemValue>
			</ItemRow>
			<ItemRow>
				<ItemDescription>{market.volume}</ItemDescription>
				<ItemValue tone={market.tone}>{market.change}</ItemValue>
			</ItemRow>
		</ItemContent>
	</Item>
);

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
				<RiVerifiedBadgeLine />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Wallet verified</ItemTitle>
				<ItemDescription>This address passed verification.</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button variant="ghost" size="icon-sm" aria-label="Open">
					<RiArrowRightSLine />
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
					<RiAddLine />
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
				<RiArrowRightSLine className="size-4 text-muted-foreground" />
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
				<RiArrowRightSLine className="size-4 text-muted-foreground" />
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

export const OverviewVariant: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"The `overview` variant renders a market row as two content rows: a title with badges beside a value, then a description beside a trailing value that takes a tone. Install with `pnpm dlx shadcn@latest add @core/item`.",
			},
		},
	},
	render: () => (
		<ItemGroup>
			{MARKETS.map((market) => (
				<OverviewRow key={market.symbol} market={market} />
			))}
		</ItemGroup>
	),
	play: async ({ canvas, canvasElement }) => {
		const rows =
			canvasElement.querySelectorAll<HTMLElement>('[data-slot="item"]');
		await expect(rows).toHaveLength(3);

		const row = rows[0];
		const rowStyle = getComputedStyle(row);
		// The overview padding and gap have to outrank the size class, which
		// `itemVariants` emits after the variant class.
		await expect(rowStyle.paddingTop).toBe("16px");
		await expect(rowStyle.paddingLeft).toBe("16px");
		await expect(rowStyle.columnGap).toBe("12px");
		await expect(row.clientHeight).toBe(72);

		const media = row.querySelector<HTMLElement>('[data-slot="item-media"]');
		const mediaStyle = getComputedStyle(media as HTMLElement);
		await expect(mediaStyle.alignSelf).toBe("center");
		await expect(mediaStyle.transform).toBe("none");

		const avatar = row.querySelector<HTMLElement>('[data-slot="avatar"]');
		const avatarStyle = getComputedStyle(avatar as HTMLElement);
		await expect(avatarStyle.height).toBe("40px");
		await expect(
			Number.parseFloat(avatarStyle.borderRadius),
		).toBeGreaterThanOrEqual(20);

		const contentRows = row.querySelectorAll<HTMLElement>(
			'[data-slot="item-row"]',
		);
		await expect(getComputedStyle(contentRows[0]).fontSize).toBe("14px");
		await expect(getComputedStyle(contentRows[0]).lineHeight).toBe("20px");
		await expect(getComputedStyle(contentRows[1]).fontSize).toBe("12px");
		await expect(getComputedStyle(contentRows[1]).lineHeight).toBe("16px");

		const gain = canvas.getByText("+2.41%");
		const loss = canvas.getByText("-1.08%");
		await expect(getComputedStyle(gain).color).not.toBe(
			getComputedStyle(loss).color,
		);

		const longTitle = canvas.getByText("USDC-PERP settlement market");
		await expect(longTitle.scrollWidth).toBeGreaterThan(longTitle.clientWidth);
	},
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
					<RiVerifiedBadgeLine />
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
					<RiArrowRightSLine className="size-4 text-muted-foreground" />
				</ItemActions>
			</Item>
			<ItemGroup>
				{MARKETS.slice(0, 2).map((market) => (
					<OverviewRow key={market.symbol} market={market} />
				))}
			</ItemGroup>
		</div>
	),
};

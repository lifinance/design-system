import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	ArrowDownIcon,
	ArrowDownLeftIcon,
	ArrowLeftRightIcon,
	ArrowUpRightIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	FuelIcon,
	SettingsIcon,
	TimerIcon,
	TrendingDownIcon,
	TrendingUpIcon,
} from "lucide-react";
import { Fragment } from "react";
import { expect, userEvent } from "storybook/test";
import { SearchInput } from "@/registry/core/components/search-input";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
} from "@/registry/core/ui/avatar";
import { Badge } from "@/registry/core/ui/badge";
import { Button } from "@/registry/core/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/core/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/registry/core/ui/input-group";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/registry/core/ui/item";
import { Separator } from "@/registry/core/ui/separator";

const ICONS =
	"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons";

const CHAINS = {
	ethereum: { name: "Ethereum", logo: `${ICONS}/chains/ethereum.svg` },
	base: { name: "Base", logo: `${ICONS}/chains/base.svg` },
	optimism: { name: "Optimism", logo: `${ICONS}/chains/optimism.svg` },
	solana: { name: "Solana", logo: `${ICONS}/chains/solana.svg` },
};

const BRIDGE = { name: "Stargate", logo: `${ICONS}/bridges/stargate.svg` };
const WALLET = { name: "MetaMask", logo: `${ICONS}/wallets/metamask.svg` };

const TOKENS = [
	{
		symbol: "ETH",
		name: "Ethereum",
		initials: "ET",
		logo: CHAINS.ethereum.logo,
		chain: CHAINS.ethereum,
		balance: "1.2401",
		value: "$3,127.10",
		change: "+2.1%",
		trend: "up",
	},
	{
		symbol: "USDC",
		name: "USD Coin",
		initials: "US",
		logo: "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png?1769615602",
		chain: CHAINS.base,
		balance: "1,024.50",
		value: "$1,024.50",
		change: "0.0%",
		trend: "flat",
	},
	{
		symbol: "SOL",
		name: "Solana",
		initials: "SO",
		logo: CHAINS.solana.logo,
		chain: CHAINS.solana,
		balance: "12.05",
		value: "$1,610.43",
		change: "-3.4%",
		trend: "down",
	},
	{
		symbol: "OP",
		name: "Optimism",
		initials: "OP",
		logo: CHAINS.optimism.logo,
		chain: CHAINS.optimism,
		balance: "540.02",
		value: "$788.43",
		change: "+1.2%",
		trend: "up",
	},
] as const;

const ACTIVITY = [
	{
		title: "Swap ETH to USDC",
		detail: "Ethereum to Base",
		icon: ArrowLeftRightIcon,
		status: "Pending",
		statusVariant: "secondary",
	},
	{
		title: "Send SOL",
		detail: "To 9xQe…3kf2",
		icon: ArrowUpRightIcon,
		status: "Completed",
		statusVariant: "outline",
	},
	{
		title: "Receive USDC",
		detail: "From 0x41c8…9A2e",
		icon: ArrowDownLeftIcon,
		status: "Completed",
		statusVariant: "outline",
	},
	{
		title: "Swap OP to ETH",
		detail: "Optimism to Ethereum",
		icon: ArrowLeftRightIcon,
		status: "Failed",
		statusVariant: "destructive",
	},
] as const;

function TokenChip({
	symbol,
	logo,
	initials,
	label,
}: {
	symbol: string;
	logo: string;
	initials: string;
	label: string;
}) {
	return (
		<InputGroupButton size="sm" variant="outline" aria-label={label}>
			<Avatar size="sm" className="size-5">
				<AvatarImage src={logo} alt="" />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			{symbol}
			<ChevronDownIcon data-icon="inline-end" />
		</InputGroupButton>
	);
}

function TrendBadge({
	trend,
	change,
}: {
	trend: "up" | "down" | "flat";
	change: string;
}) {
	if (trend === "up") {
		return (
			<Badge variant="secondary">
				<TrendingUpIcon />
				{change}
			</Badge>
		);
	}
	if (trend === "down") {
		return (
			<Badge variant="destructive">
				<TrendingDownIcon />
				{change}
			</Badge>
		);
	}
	return <Badge variant="outline">{change}</Badge>;
}

function SwapCard() {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Swap</CardTitle>
				<CardDescription>Ethereum to Base</CardDescription>
				<CardAction>
					<Button variant="ghost" size="icon-sm" aria-label="Swap settings">
						<SettingsIcon />
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex flex-col gap-1.5">
					<label htmlFor="swap-pay" className="text-sm text-muted-foreground">
						You pay
					</label>
					<InputGroup>
						<InputGroupInput
							id="swap-pay"
							inputMode="decimal"
							defaultValue="0.85"
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupButton>Max</InputGroupButton>
							<TokenChip
								symbol="ETH"
								logo={CHAINS.ethereum.logo}
								initials="ET"
								label="Change the token you pay"
							/>
						</InputGroupAddon>
					</InputGroup>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>$2,143.40</span>
						<span>Balance 1.2401 ETH</span>
					</div>
				</div>
				<div className="flex items-center gap-3">
					<Separator className="flex-1" />
					<Button
						variant="outline"
						size="icon-sm"
						className="rounded-full"
						aria-label="Reverse the swap direction"
					>
						<ArrowDownIcon />
					</Button>
					<Separator className="flex-1" />
				</div>
				<div className="flex flex-col gap-1.5">
					<label
						htmlFor="swap-receive"
						className="text-sm text-muted-foreground"
					>
						You receive
					</label>
					<InputGroup>
						<InputGroupInput
							id="swap-receive"
							inputMode="decimal"
							defaultValue="2,142.16"
						/>
						<InputGroupAddon align="inline-end">
							<TokenChip
								symbol="USDC"
								logo={TOKENS[1].logo}
								initials="US"
								label="Change the token you receive"
							/>
						</InputGroupAddon>
					</InputGroup>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>$2,142.16</span>
						<span>Balance 1,024.50 USDC</span>
					</div>
				</div>
				<Item variant="muted" size="sm">
					<ItemMedia>
						<AvatarGroup>
							<Avatar size="sm">
								<AvatarImage src={CHAINS.ethereum.logo} alt="" />
								<AvatarFallback>ET</AvatarFallback>
							</Avatar>
							<Avatar size="sm">
								<AvatarImage src={CHAINS.base.logo} alt="" />
								<AvatarFallback>BA</AvatarFallback>
							</Avatar>
						</AvatarGroup>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Fastest route</ItemTitle>
						<ItemDescription>Via {BRIDGE.name}</ItemDescription>
					</ItemContent>
					<Badge variant="secondary">
						<TimerIcon />2 min
					</Badge>
					<Badge variant="outline">
						<FuelIcon />
						$1.24
					</Badge>
				</Item>
			</CardContent>
			<CardFooter className="flex-col gap-3">
				<Button className="w-full">Review swap</Button>
				<div className="flex w-full justify-between text-xs text-muted-foreground">
					<span>1 ETH = 2,521.65 USDC</span>
					<span>Fees $1.24</span>
				</div>
			</CardFooter>
		</Card>
	);
}

function TokenSelectCard() {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Select a token</CardTitle>
				<CardDescription>Pay with any token on any chain</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<SearchInput
					aria-label="Search tokens"
					placeholder="Search name or paste address"
				/>
				<div className="flex flex-wrap gap-2">
					<Badge>All chains</Badge>
					{Object.values(CHAINS).map((chain) => (
						<Badge key={chain.name} variant="outline">
							<img src={chain.logo} alt="" className="size-3 rounded-full" />
							{chain.name}
						</Badge>
					))}
				</div>
				<ItemGroup>
					{TOKENS.map((token, index) => (
						<Fragment key={token.symbol}>
							{index > 0 && <ItemSeparator aria-hidden="true" />}
							<Item role="listitem" size="sm" className="px-2">
								<ItemMedia>
									<Avatar>
										<AvatarImage src={token.logo} alt="" />
										<AvatarFallback>{token.initials}</AvatarFallback>
										<AvatarBadge className="size-4">
											<img
												src={token.chain.logo}
												alt=""
												className="size-full rounded-full"
											/>
										</AvatarBadge>
									</Avatar>
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{token.name}</ItemTitle>
									<ItemDescription>
										{token.symbol} on {token.chain.name}
									</ItemDescription>
								</ItemContent>
								<ItemContent className="items-end">
									<ItemTitle>{token.balance}</ItemTitle>
									<ItemDescription>{token.value}</ItemDescription>
								</ItemContent>
							</Item>
						</Fragment>
					))}
				</ItemGroup>
			</CardContent>
		</Card>
	);
}

function PortfolioCard() {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardDescription>Total balance</CardDescription>
				<CardTitle className="flex flex-wrap items-center gap-2 text-2xl">
					$6,550.46
					<Badge variant="secondary">
						<TrendingUpIcon />
						+4.2%
					</Badge>
				</CardTitle>
				<CardAction>
					<Badge variant="outline" className="gap-1.5 py-1">
						<Avatar size="sm" className="size-4">
							<AvatarImage src={WALLET.logo} alt="" />
							<AvatarFallback>MM</AvatarFallback>
						</Avatar>
						0x7A2d…F3d9
					</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex gap-2">
					<Button variant="outline" className="flex-1">
						<ArrowUpRightIcon data-icon="inline-start" />
						Send
					</Button>
					<Button variant="outline" className="flex-1">
						<ArrowDownLeftIcon data-icon="inline-start" />
						Receive
					</Button>
					<Button className="flex-1">
						<ArrowLeftRightIcon data-icon="inline-start" />
						Swap
					</Button>
				</div>
				<Separator />
				<ItemGroup>
					{TOKENS.map((token, index) => (
						<Fragment key={token.symbol}>
							{index > 0 && <ItemSeparator aria-hidden="true" />}
							<Item role="listitem" size="sm" className="px-2">
								<ItemMedia>
									<Avatar>
										<AvatarImage src={token.logo} alt="" />
										<AvatarFallback>{token.initials}</AvatarFallback>
									</Avatar>
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{token.name}</ItemTitle>
									<ItemDescription>
										{token.balance} {token.symbol}
									</ItemDescription>
								</ItemContent>
								<ItemContent className="items-end">
									<ItemTitle>{token.value}</ItemTitle>
									<TrendBadge trend={token.trend} change={token.change} />
								</ItemContent>
							</Item>
						</Fragment>
					))}
				</ItemGroup>
			</CardContent>
			<CardFooter>
				<Button variant="ghost" className="w-full">
					View all assets
					<ChevronRightIcon data-icon="inline-end" />
				</Button>
			</CardFooter>
		</Card>
	);
}

function ActivityCard() {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Activity</CardTitle>
				<CardDescription>Swaps and transfers on this wallet</CardDescription>
			</CardHeader>
			<CardContent>
				<ItemGroup>
					{ACTIVITY.map((entry, index) => (
						<Fragment key={entry.title}>
							{index > 0 && <ItemSeparator aria-hidden="true" />}
							<Item role="listitem" size="sm" className="px-2">
								<ItemMedia variant="icon">
									<entry.icon />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{entry.title}</ItemTitle>
									<ItemDescription>{entry.detail}</ItemDescription>
								</ItemContent>
								<Badge variant={entry.statusVariant}>{entry.status}</Badge>
							</Item>
						</Fragment>
					))}
				</ItemGroup>
			</CardContent>
			<CardFooter>
				<Button variant="ghost" className="w-full">
					View all activity
					<ChevronRightIcon data-icon="inline-end" />
				</Button>
			</CardFooter>
		</Card>
	);
}

const meta = {
	title: "Widget/Swap app",
	tags: ["ai-generated"],
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A cross-chain swap product assembled from the registry components. Each story is one screen of the prototype and renders in every registry theme; switch brands and modes from the toolbar.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prototype: Story = {
	render: () => (
		<div className="grid items-start gap-6 md:grid-cols-2">
			<SwapCard />
			<TokenSelectCard />
			<PortfolioCard />
			<ActivityCard />
		</div>
	),
};

export const Swap: Story = {
	render: () => <SwapCard />,
	play: async ({ canvas }) => {
		const pay = canvas.getByLabelText("You pay");
		await userEvent.clear(pay);
		await userEvent.type(pay, "1.5");
		await expect(pay).toHaveValue("1.5");
		await expect(
			canvas.getByRole("button", { name: "Review swap" }),
		).toBeEnabled();
	},
};

export const SelectToken: Story = {
	render: () => <TokenSelectCard />,
	play: async ({ canvas }) => {
		const search = canvas.getByRole("textbox", { name: "Search tokens" });
		await userEvent.type(search, "USDC");
		await expect(search).toHaveValue("USDC");
	},
};

export const Portfolio: Story = {
	render: () => <PortfolioCard />,
	play: async ({ canvasElement }) => {
		const card = canvasElement.querySelector('[data-slot="card"]');
		const wallet = canvasElement.querySelector('[data-slot="card-action"]');
		if (!card || !wallet) {
			throw new Error("missing card or wallet chip");
		}
		await expect(wallet.getBoundingClientRect().right).toBeLessThanOrEqual(
			card.getBoundingClientRect().right,
		);
	},
};

export const Activity: Story = {
	render: () => <ActivityCard />,
};

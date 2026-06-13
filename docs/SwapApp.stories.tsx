import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	ArrowDownIcon,
	ArrowDownLeftIcon,
	ArrowLeftIcon,
	ArrowLeftRightIcon,
	ArrowUpRightIcon,
	CheckIcon,
	ChevronDownIcon,
	FuelIcon,
	GlobeIcon,
	SearchIcon,
	SettingsIcon,
	TimerIcon,
	TrendingDownIcon,
	TrendingUpIcon,
} from "lucide-react";
import { type MouseEvent, type ReactNode, useId, useState } from "react";
import { expect, screen, waitFor, within } from "storybook/test";
import { AmountInput } from "@/registry/core/components/amount-input";
import { SearchInput } from "@/registry/core/components/search-input";
import { cn } from "@/registry/core/lib/utils";
import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarImage,
} from "@/registry/core/ui/avatar";
import { Badge } from "@/registry/core/ui/badge";
import { Button } from "@/registry/core/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/core/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/core/ui/collapsible";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
	ComboboxValue,
} from "@/registry/core/ui/combobox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/core/ui/dialog";
import { Field, FieldLabel } from "@/registry/core/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/registry/core/ui/input-group";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/registry/core/ui/item";
import {
	NativeSelect,
	NativeSelectOption,
} from "@/registry/core/ui/native-select";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/core/ui/popover";
import { Separator } from "@/registry/core/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/registry/core/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/registry/core/ui/toggle-group";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/core/ui/tooltip";

const ICONS =
	"https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons";

const TOKEN_LOGOS: Record<string, string> = {
	USDC: "https://coin-images.coingecko.com/coins/images/6319/large/USDC.png",
	USDT: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
	WETH: "https://coin-images.coingecko.com/coins/images/2518/large/weth.png",
};

type Chain = {
	key: string;
	name: string;
	logo: string;
	native: { symbol: string; name: string };
};

// 52 networks, each with its native asset. Logos resolve from the LI.FI assets.
const CHAIN_LIST: Array<[string, string, string, string]> = [
	["ethereum", "Ethereum", "ETH", "Ethereum"],
	["arbitrum", "Arbitrum", "ETH", "Ethereum"],
	["base", "Base", "ETH", "Ethereum"],
	["optimism", "Optimism", "ETH", "Ethereum"],
	["polygon", "Polygon", "POL", "Polygon"],
	["bsc", "BNB Chain", "BNB", "BNB"],
	["avalanche", "Avalanche", "AVAX", "Avalanche"],
	["solana", "Solana", "SOL", "Solana"],
	["linea", "Linea", "ETH", "Ethereum"],
	["scroll", "Scroll", "ETH", "Ethereum"],
	["zksync", "zkSync Era", "ETH", "Ethereum"],
	["blast", "Blast", "ETH", "Ethereum"],
	["mantle", "Mantle", "MNT", "Mantle"],
	["mode", "Mode", "ETH", "Ethereum"],
	["metis", "Metis", "METIS", "Metis"],
	["gnosis", "Gnosis", "XDAI", "xDAI"],
	["celo", "Celo", "CELO", "Celo"],
	["fantom", "Fantom", "FTM", "Fantom"],
	["moonbeam", "Moonbeam", "GLMR", "Moonbeam"],
	["aurora", "Aurora", "ETH", "Ethereum"],
	["boba", "Boba", "ETH", "Ethereum"],
	["fuse", "Fuse", "FUSE", "Fuse"],
	["sei", "Sei", "SEI", "Sei"],
	["sui", "Sui", "SUI", "Sui"],
	["tron", "Tron", "TRX", "Tron"],
	["fraxtal", "Fraxtal", "frxETH", "Frax Ether"],
	["sonic", "Sonic", "S", "Sonic"],
	["taiko", "Taiko", "ETH", "Ethereum"],
	["zkevm", "Polygon zkEVM", "ETH", "Ethereum"],
	["bob", "BOB", "ETH", "Ethereum"],
	["kaia", "Kaia", "KAIA", "Kaia"],
	["cronos", "Cronos", "CRO", "Cronos"],
	["harmony", "Harmony", "ONE", "Harmony"],
	["bitcoin", "Bitcoin", "BTC", "Bitcoin"],
	["litecoin", "Litecoin", "LTC", "Litecoin"],
	["dogecoin", "Dogecoin", "DOGE", "Dogecoin"],
	["ink", "Ink", "ETH", "Ethereum"],
	["lisk", "Lisk", "ETH", "Ethereum"],
	["world", "World Chain", "ETH", "Ethereum"],
	["unichain", "Unichain", "ETH", "Ethereum"],
	["berachain", "Berachain", "BERA", "Berachain"],
	["abstract", "Abstract", "ETH", "Ethereum"],
	["apechain", "ApeChain", "APE", "ApeCoin"],
	["gravity", "Gravity", "G", "Gravity"],
	["hemi", "Hemi", "ETH", "Ethereum"],
	["morph", "Morph", "ETH", "Ethereum"],
	["plume", "Plume", "PLUME", "Plume"],
	["swell", "Swell", "ETH", "Ethereum"],
	["xdc", "XDC", "XDC", "XDC"],
	["rootstock", "Rootstock", "RBTC", "Rootstock BTC"],
	["ronin", "Ronin", "RON", "Ronin"],
	["vana", "Vana", "VANA", "Vana"],
];

const CHAINS: Chain[] = CHAIN_LIST.map(([key, name, symbol, nativeName]) => ({
	key,
	name,
	logo: `${ICONS}/chains/${key}.svg`,
	native: { symbol, name: nativeName },
}));

const CHAIN_BY_KEY: Record<string, Chain> = Object.fromEntries(
	CHAINS.map((chain) => [chain.key, chain]),
);

// Four quick-pick networks shown as icon tabs; the chain selector reaches the rest.
const POPULAR_CHAINS = ["ethereum", "base", "arbitrum", "optimism"];

const PRICES: Record<string, number> = {
	ETH: 2521.65,
	WETH: 2521.65,
	frxETH: 2521.65,
	RBTC: 60342,
	BTC: 60342,
	SOL: 133.6,
	BNB: 602.4,
	POL: 0.42,
	AVAX: 27.8,
	FTM: 0.71,
	MNT: 0.78,
	METIS: 21.5,
	CRO: 0.12,
	ONE: 0.013,
	SEI: 0.31,
	SUI: 1.42,
	TRX: 0.24,
	BERA: 6.1,
	APE: 0.93,
	S: 0.55,
	CELO: 0.62,
	LTC: 88.2,
	DOGE: 0.14,
	GLMR: 0.11,
	FUSE: 0.027,
	KAIA: 0.15,
	XDAI: 1,
	XDC: 0.06,
	RON: 1.34,
	PLUME: 0.09,
	VANA: 4.2,
	G: 0.012,
	USDC: 1,
	USDT: 1,
};

type Token = {
	id: string;
	symbol: string;
	name: string;
	initials: string;
	logo: string;
	chain: Chain;
	balance: number;
	price: number;
	change: number;
};

// The wallet holds a handful of these; everything else has a zero balance.
const HELD: Record<string, { balance: number; change: number }> = {
	"eth-ethereum": { balance: 1.2401, change: 2.1 },
	"usdc-base": { balance: 1024.5, change: 0 },
	"usdc-ethereum": { balance: 320.12, change: 0 },
	"sol-solana": { balance: 12.05, change: -3.4 },
	"pol-polygon": { balance: 540.02, change: 1.2 },
	"usdt-arbitrum": { balance: 88.4, change: 0 },
};

function makeToken(
	symbol: string,
	name: string,
	chain: Chain,
	logo: string,
): Token {
	const id = `${symbol.toLowerCase()}-${chain.key}`;
	const held = HELD[id];
	return {
		id,
		symbol,
		name,
		initials: symbol.slice(0, 2).toUpperCase(),
		logo,
		chain,
		balance: held?.balance ?? 0,
		price: PRICES[symbol] ?? 1,
		change: held?.change ?? 0,
	};
}

const USDC_CHAINS = [
	"ethereum",
	"arbitrum",
	"base",
	"optimism",
	"polygon",
	"bsc",
	"avalanche",
	"solana",
	"linea",
	"scroll",
	"zksync",
	"blast",
	"mantle",
	"gnosis",
	"celo",
	"sei",
	"sonic",
	"mode",
	"metis",
	"fantom",
	"aurora",
	"taiko",
	"unichain",
	"world",
	"cronos",
	"kaia",
	"fraxtal",
	"bob",
	"ink",
	"moonbeam",
];
const USDT_CHAINS = [
	"ethereum",
	"arbitrum",
	"optimism",
	"polygon",
	"bsc",
	"avalanche",
	"solana",
	"tron",
	"linea",
	"mantle",
	"metis",
	"kaia",
	"celo",
	"fantom",
	"sei",
	"cronos",
	"moonbeam",
	"harmony",
	"boba",
	"fuse",
];
const WETH_CHAINS = [
	"ethereum",
	"arbitrum",
	"base",
	"optimism",
	"polygon",
	"linea",
	"scroll",
	"zksync",
	"blast",
	"mode",
	"taiko",
	"bob",
];

const TOKENS: Token[] = [
	...CHAINS.map((chain) =>
		makeToken(chain.native.symbol, chain.native.name, chain, chain.logo),
	),
	...USDC_CHAINS.map((key) =>
		makeToken("USDC", "USD Coin", CHAIN_BY_KEY[key], TOKEN_LOGOS.USDC),
	),
	...USDT_CHAINS.map((key) =>
		makeToken("USDT", "Tether", CHAIN_BY_KEY[key], TOKEN_LOGOS.USDT),
	),
	...WETH_CHAINS.map((key) =>
		makeToken("WETH", "Wrapped Ether", CHAIN_BY_KEY[key], TOKEN_LOGOS.WETH),
	),
];

const TOKEN_BY_ID: Record<string, Token> = Object.fromEntries(
	TOKENS.map((token) => [token.id, token]),
);
const HOLDINGS = TOKENS.filter((token) => token.balance > 0);
const WALLET = {
	logo: `${ICONS}/wallets/metamask.svg`,
	address: "0x7A2d…F3d9",
};

const ACTIVITY = [
	{
		id: "a1",
		title: "Swapped ETH for USDC",
		route: "Ethereum to Base",
		icon: ArrowLeftRightIcon,
		amount: "+1,024 USDC",
		time: "2 min ago",
		status: "Pending",
		statusVariant: "secondary" as const,
	},
	{
		id: "a2",
		title: "Sent SOL",
		route: "To 9xQe…3kf2",
		icon: ArrowUpRightIcon,
		amount: "-4.0 SOL",
		time: "1 hr ago",
		status: "Completed",
		statusVariant: "outline" as const,
	},
	{
		id: "a3",
		title: "Received USDC",
		route: "From 0x41c8…9A2e",
		icon: ArrowDownLeftIcon,
		amount: "+250 USDC",
		time: "3 hr ago",
		status: "Completed",
		statusVariant: "outline" as const,
	},
	{
		id: "a4",
		title: "Swapped OP for ETH",
		route: "Optimism to Ethereum",
		icon: ArrowLeftRightIcon,
		amount: "-120 OP",
		time: "Yesterday",
		status: "Failed",
		statusVariant: "destructive" as const,
	},
];

type Mode = "swap" | "bridge" | "cross-chain swap";

function getMode(from: Token, to: Token): Mode {
	if (from.chain.key === to.chain.key) {
		return "swap";
	}
	return from.symbol === to.symbol ? "bridge" : "cross-chain swap";
}

const MODE_BADGE: Record<Mode, string> = {
	swap: "Swap",
	bridge: "Bridge",
	"cross-chain swap": "Cross-chain",
};

// The verb for a mode, for action labels and confirmations.
function modeVerb(mode: Mode) {
	return mode === "bridge" ? "bridge" : "swap";
}

// A mode's network fee and time. Crossing a chain costs more and takes longer.
function routeEstimate(mode: Mode) {
	return mode === "swap"
		? { time: "15 sec", networkCost: 1.24 }
		: { time: "2 min", networkCost: 2.4 };
}

const SLIPPAGE_PRESETS = ["0.1", "0.5", "1"];

function formatAmount(value: number) {
	if (!Number.isFinite(value) || value === 0) {
		return "0";
	}
	if (value >= 1e6) {
		return value.toLocaleString("en-US", {
			notation: "compact",
			maximumFractionDigits: 3,
		});
	}
	return value.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

// Exact grouped digits for amounts the user reads precisely (inputs, trade
// details). Balances use the compact formatAmount instead.
function formatNumber(value: number) {
	if (!Number.isFinite(value) || value === 0) {
		return "0";
	}
	return value.toLocaleString("en-US", { maximumFractionDigits: 6 });
}

function formatUsd(value: number) {
	if (value > 999e12) {
		return ">$999T";
	}
	return value.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		notation: value >= 1e6 ? "compact" : "standard",
		maximumFractionDigits: 2,
	});
}

function formatPercent(value: number) {
	return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

// A plain numeric string (no separators) so the computed side stays editable.
function quoteValue(value: number) {
	return value > 0 && Number.isFinite(value)
		? String(Number(value.toFixed(6)))
		: "";
}

// The spot price of one token denominated in another, before impact.
function spotRate(from: Token, to: Token) {
	return to.price ? from.price / to.price : 0;
}

// Simulated pool depth (USD). Price impact grows with trade size and the
// output saturates toward this depth, so a huge order can never drain it.
const LIQUIDITY = 8_000_000;

function applyImpact(inUsd: number) {
	return (inUsd * LIQUIDITY) / (inUsd + LIQUIDITY);
}

function reverseImpact(outUsd: number) {
	return outUsd >= LIQUIDITY
		? Number.POSITIVE_INFINITY
		: (outUsd * LIQUIDITY) / (LIQUIDITY - outUsd);
}

type Side = "sell" | "buy";

// The whole pricing model behind one interface: given the edited side and its
// value, resolve both legs and the impact. Prices are USD per token, so it
// works for any chain/token pair. reverseImpact is the exact inverse of
// applyImpact, so editing either side round-trips without drift.
function quote(from: Token, to: Token, side: Side, value: number) {
	let fromAmount: number;
	let toAmount: number;
	if (side === "sell") {
		fromAmount = value;
		toAmount = to.price ? applyImpact(value * from.price) / to.price : 0;
	} else {
		toAmount = value;
		fromAmount = from.price ? reverseImpact(value * to.price) / from.price : 0;
	}
	const inUsd = fromAmount * from.price;
	const priceImpact = inUsd > 0 ? inUsd / (inUsd + LIQUIDITY) : 0;
	return { fromAmount, toAmount, priceImpact };
}

function TokenAvatar({
	token,
	withChain = false,
	className,
	badgeClassName,
}: {
	token: Token;
	withChain?: boolean;
	className?: string;
	badgeClassName?: string;
}) {
	return (
		<Avatar className={cn("size-8", className)}>
			<AvatarImage src={token.logo} alt="" />
			<AvatarFallback>{token.initials}</AvatarFallback>
			{withChain ? (
				<AvatarBadge className={cn("size-4", badgeClassName)}>
					<img
						src={token.chain.logo}
						alt=""
						className="size-full rounded-full"
					/>
				</AvatarBadge>
			) : null}
		</Avatar>
	);
}

function ChangeBadge({ change }: { change: number }) {
	if (change > 0) {
		return (
			<Badge variant="success">
				<TrendingUpIcon />
				{formatPercent(change)}
			</Badge>
		);
	}
	if (change < 0) {
		return (
			<Badge variant="destructive">
				<TrendingDownIcon />
				{formatPercent(change)}
			</Badge>
		);
	}
	return <Badge variant="outline">{formatPercent(change)}</Badge>;
}

function TokenPicker({
	selected,
	onSelect,
	label,
}: {
	selected: Token;
	onSelect: (token: Token) => void;
	label: string;
}) {
	const [active, setActive] = useState<string>(selected.chain.key);
	const [networkQuery, setNetworkQuery] = useState("");
	const [networksOpen, setNetworksOpen] = useState(false);
	const items =
		active === "all"
			? TOKENS
			: TOKENS.filter((token) => token.chain.key === active);
	const networks = CHAINS.filter((chain) =>
		chain.name.toLowerCase().includes(networkQuery.trim().toLowerCase()),
	);
	const activeChain = active === "all" ? null : CHAIN_BY_KEY[active];
	const onRail = active === "all" || POPULAR_CHAINS.includes(active);

	function chooseNetwork(key: string) {
		setActive(key);
		setNetworkQuery("");
		setNetworksOpen(false);
	}

	return (
		<Combobox
			key={selected.id}
			items={items}
			value={selected}
			onValueChange={(token: Token | null) => token && onSelect(token)}
			itemToStringLabel={(token: Token) => `${token.name} ${token.symbol}`}
			itemToStringValue={(token: Token) => token.id}
		>
			<ComboboxTrigger
				aria-label={`${selected.symbol} on ${selected.chain.name}, change ${label}`}
				render={
					<Button
						variant="outline"
						size="sm"
						className="gap-1 rounded-full pr-1.5 pl-1"
					/>
				}
			>
				<ComboboxValue>
					{(token: Token) => (
						<span className="flex items-center gap-1.5 font-medium">
							<TokenAvatar
								token={token}
								withChain
								className="size-5"
								badgeClassName="size-2.5 ring-1"
							/>
							{token.symbol}
						</span>
					)}
				</ComboboxValue>
			</ComboboxTrigger>
			<ComboboxContent aria-label="Select a token" className="w-80">
				{networksOpen ? (
					<div className="flex items-center gap-1.5 p-2">
						<Button
							type="button"
							variant="ghost"
							size="icon-sm"
							aria-label="Back to tokens"
							onClick={() => setNetworksOpen(false)}
						>
							<ArrowLeftIcon />
						</Button>
						<SearchInput
							aria-label="Search networks"
							placeholder="Search networks"
							value={networkQuery}
							onChange={(event) => setNetworkQuery(event.currentTarget.value)}
							onClear={() => setNetworkQuery("")}
							className="flex-1"
						/>
					</div>
				) : null}
				<div className={cn("p-2", networksOpen && "hidden")}>
					<ComboboxInput
						showTrigger={false}
						showClear
						aria-label="Search tokens"
						placeholder="Search name or paste address"
					>
						<InputGroupAddon>
							<SearchIcon />
						</InputGroupAddon>
					</ComboboxInput>
				</div>
				<div
					className={cn(
						"flex items-center gap-1.5 border-b px-2 pb-2",
						networksOpen && "hidden",
					)}
				>
					<ToggleGroup
						aria-label="Network"
						variant="outline"
						size="sm"
						value={onRail ? [active] : []}
						onValueChange={(value) => value.length && chooseNetwork(value[0])}
						className="flex-1"
					>
						<ToggleGroupItem value="all" className="px-2.5 font-medium">
							All
						</ToggleGroupItem>
						{POPULAR_CHAINS.map((key) => (
							<ToggleGroupItem
								key={key}
								value={key}
								aria-label={CHAIN_BY_KEY[key].name}
							>
								<img
									src={CHAIN_BY_KEY[key].logo}
									alt=""
									className="size-4.5 rounded-full"
								/>
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<Button
						type="button"
						variant={activeChain && !onRail ? "outline" : "ghost"}
						size="sm"
						aria-label="More networks"
						aria-expanded={networksOpen}
						className="gap-1.5"
						onClick={() => setNetworksOpen(true)}
					>
						{activeChain && !onRail ? (
							<img
								src={activeChain.logo}
								alt=""
								className="size-4.5 rounded-full"
							/>
						) : (
							<span className="text-xs font-medium">More</span>
						)}
						<ChevronDownIcon className="size-4 text-muted-foreground" />
					</Button>
				</div>
				{networksOpen ? (
					<div className="no-scrollbar flex max-h-80 flex-col gap-0.5 overflow-y-auto p-1.5">
						{networkQuery.trim() === "" ? (
							<button
								type="button"
								onClick={() => chooseNetwork("all")}
								className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left hover:bg-accent hover:text-accent-foreground"
							>
								<span className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
									<GlobeIcon className="size-4" />
								</span>
								<span className="flex-1 font-medium">All networks</span>
								{active === "all" ? <CheckIcon className="size-4" /> : null}
							</button>
						) : null}
						{networks.map((chain) => (
							<button
								key={chain.key}
								type="button"
								onClick={() => chooseNetwork(chain.key)}
								className="flex w-full items-center gap-2.5 rounded-md p-1.5 text-left hover:bg-accent hover:text-accent-foreground"
							>
								<img src={chain.logo} alt="" className="size-7 rounded-full" />
								<span className="flex flex-1 flex-col">
									<span className="font-medium">{chain.name}</span>
									<span className="text-xs text-muted-foreground">
										{chain.native.symbol}
									</span>
								</span>
								{active === chain.key ? <CheckIcon className="size-4" /> : null}
							</button>
						))}
						{networks.length === 0 ? (
							<p className="py-6 text-center text-sm text-muted-foreground">
								No networks found.
							</p>
						) : null}
					</div>
				) : null}
				<div className={cn(networksOpen && "hidden")}>
					<ComboboxEmpty>No tokens found.</ComboboxEmpty>
					<ComboboxList aria-label="Tokens">
						{(token: Token) => (
							<ComboboxItem key={token.id} value={token} className="pl-1.5">
								<TokenAvatar token={token} withChain />
								<span className="flex flex-1 flex-col">
									<span className="font-medium">{token.name}</span>
									<span className="text-xs text-muted-foreground">
										{token.symbol} on {token.chain.name}
									</span>
								</span>
								{token.balance > 0 ? (
									<span className="flex flex-col items-end">
										<span className="text-sm tabular-nums">
											{formatAmount(token.balance)}
										</span>
										<span className="text-xs text-muted-foreground tabular-nums">
											{formatUsd(token.balance * token.price)}
										</span>
									</span>
								) : null}
							</ComboboxItem>
						)}
					</ComboboxList>
				</div>
			</ComboboxContent>
		</Combobox>
	);
}

function AmountPanel({
	label,
	tokenLabel,
	token,
	onTokenChange,
	amount,
	onAmountChange,
	onFocus,
	onBlur,
	active = false,
	fiat,
	showMax = false,
	readOnly = false,
}: {
	label: string;
	tokenLabel: string;
	token: Token;
	onTokenChange: (token: Token) => void;
	amount: string;
	onAmountChange?: (value: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	active?: boolean;
	fiat: string;
	showMax?: boolean;
	readOnly?: boolean;
}) {
	const amountId = useId();

	// Clicking anywhere on an editable card focuses the amount, except the token
	// pill and the Max button, which own their own clicks.
	function focusAmount(event: MouseEvent<HTMLElement>) {
		if ((event.target as HTMLElement).closest("button, [role=combobox]")) {
			return;
		}
		event.currentTarget.querySelector("input")?.focus();
	}

	return (
		<Field
			onClick={readOnly ? undefined : focusAmount}
			data-active={active}
			className={cn(
				"gap-2 rounded-xl border p-3 transition-[color,background-color,border-color,box-shadow]",
				readOnly
					? "border-transparent bg-muted/40"
					: active
						? "cursor-text border-ring bg-background ring-2 ring-ring/30"
						: "cursor-text border-transparent bg-muted/40 hover:border-input",
			)}
		>
			<FieldLabel
				htmlFor={amountId}
				className="font-normal text-muted-foreground"
			>
				{label}
			</FieldLabel>
			<div className="flex items-center gap-2">
				<AmountInput
					id={amountId}
					value={amount}
					readOnly={readOnly}
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={(event) => onAmountChange?.(event.currentTarget.value)}
				/>
				<TokenPicker
					selected={token}
					onSelect={onTokenChange}
					label={tokenLabel}
				/>
			</div>
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span className="tabular-nums">{fiat}</span>
				<span className="flex items-center gap-1.5 tabular-nums">
					Balance {formatAmount(token.balance)}
					{showMax && onAmountChange ? (
						<Button
							variant="link"
							size="sm"
							className="h-auto p-0 font-medium text-foreground"
							onClick={() => onAmountChange(String(token.balance))}
						>
							Max
						</Button>
					) : null}
				</span>
			</div>
		</Field>
	);
}

function SwapSettings({
	slippage,
	onSlippageChange,
}: {
	slippage: string;
	onSlippageChange: (value: string) => void;
}) {
	const customId = useId();
	const isPreset = SLIPPAGE_PRESETS.includes(slippage);
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						size="sm"
						aria-label={`Slippage ${slippage}%, edit settings`}
					/>
				}
			>
				<SettingsIcon data-icon="inline-start" />
				<span className="tabular-nums">{slippage}%</span>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-72">
				<PopoverHeader>
					<PopoverTitle>Settings</PopoverTitle>
					<PopoverDescription>
						The most the price can move before the trade reverts.
					</PopoverDescription>
				</PopoverHeader>
				<ToggleGroup
					aria-label="Maximum slippage"
					variant="outline"
					spacing={0}
					value={isPreset ? [slippage] : []}
					onValueChange={(value) => value.length && onSlippageChange(value[0])}
					className="w-full"
				>
					{SLIPPAGE_PRESETS.map((preset) => (
						<ToggleGroupItem key={preset} value={preset} className="flex-1">
							{preset}%
						</ToggleGroupItem>
					))}
				</ToggleGroup>
				<Field className="gap-1.5">
					<FieldLabel htmlFor={customId}>Custom</FieldLabel>
					<InputGroup>
						<InputGroupInput
							id={customId}
							inputMode="decimal"
							placeholder="0.0"
							value={isPreset ? "" : slippage}
							onChange={(event) => {
								const next = event.currentTarget.value;
								if (/^\d*\.?\d*$/.test(next)) {
									onSlippageChange(next);
								}
							}}
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupText>%</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
					{Number(slippage) > 5 ? (
						<p className="text-xs text-destructive">
							A high tolerance can lead to an unfavorable rate.
						</p>
					) : null}
				</Field>
			</PopoverContent>
		</Popover>
	);
}

type RouteStep = {
	id: string;
	title: string;
	detail: string;
	token?: Token;
	icon?: typeof ArrowLeftRightIcon;
};

// The ordered legs of a route: a swap is a single hop, a bridge sends then
// receives, a cross-chain swap swaps then bridges.
function routeSteps(
	mode: Mode,
	from: Token,
	to: Token,
	time: string,
): RouteStep[] {
	const receive: RouteStep = {
		id: "to",
		token: to,
		title: `Receive ${to.symbol}`,
		detail: `On ${to.chain.name}`,
	};
	if (mode === "bridge") {
		return [
			{
				id: "from",
				token: from,
				title: `Send ${from.symbol}`,
				detail: `On ${from.chain.name}`,
			},
			{
				id: "bridge",
				icon: ArrowLeftRightIcon,
				title: `Bridge to ${to.chain.name}`,
				detail: `About ${time}`,
			},
			receive,
		];
	}
	const swap: RouteStep = {
		id: "swap",
		icon: ArrowLeftRightIcon,
		title: `Swap ${from.symbol} for ${to.symbol}`,
		detail: `On ${from.chain.name}`,
	};
	if (mode === "cross-chain swap") {
		return [
			swap,
			{
				id: "bridge",
				icon: ArrowDownLeftIcon,
				title: `Bridge to ${to.chain.name}`,
				detail: `About ${time}`,
			},
			receive,
		];
	}
	return [swap, receive];
}

function RouteSummary({
	fromToken,
	toToken,
	mode,
	priceImpact,
}: {
	fromToken: Token;
	toToken: Token;
	mode: Mode;
	priceImpact: number;
}) {
	const highImpact = priceImpact >= 0.05;
	const crossChain = mode !== "swap";
	const rate = spotRate(fromToken, toToken);
	const { time, networkCost } = routeEstimate(mode);
	const steps = routeSteps(mode, fromToken, toToken, time);

	return (
		<Collapsible className="rounded-xl border">
			<div className="flex items-center gap-1.5 px-3 py-2.5 text-sm">
				<Badge
					variant={crossChain ? "secondary" : "outline"}
					className="shrink-0"
				>
					{MODE_BADGE[mode]}
				</Badge>
				{highImpact ? (
					<Badge variant="destructive" className="shrink-0 gap-0.5 px-1.5">
						<TrendingDownIcon />
						{(priceImpact * 100).toFixed(1)}%
					</Badge>
				) : null}
				<span className="ml-auto flex shrink-0 items-center gap-2 text-muted-foreground">
					<span className="flex items-center gap-1">
						<TimerIcon className="size-3.5" />
						{time}
					</span>
					<span className="flex items-center gap-1">
						<FuelIcon className="size-3.5" />
						<span className="tabular-nums">{formatUsd(networkCost)}</span>
					</span>
				</span>
				<CollapsibleTrigger
					render={
						<Button
							variant="ghost"
							size="icon-sm"
							className="-mr-1 size-7 shrink-0"
							aria-label="Show route details"
						/>
					}
				>
					<ArrowDownIcon />
				</CollapsibleTrigger>
			</div>
			<CollapsibleContent>
				<Separator />
				<ItemGroup className="p-1.5">
					{steps.map((step) => (
						<Item key={step.id} size="sm" role="listitem">
							{step.token ? (
								<ItemMedia>
									<TokenAvatar
										token={step.token}
										withChain
										className="size-7"
									/>
								</ItemMedia>
							) : step.icon ? (
								<ItemMedia variant="icon">
									<step.icon />
								</ItemMedia>
							) : null}
							<ItemContent>
								<ItemTitle>{step.title}</ItemTitle>
								<ItemDescription>{step.detail}</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</ItemGroup>
				<Separator />
				<dl className="flex flex-col gap-1.5 px-3 py-2 text-sm">
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Rate</dt>
						<dd className="tabular-nums">
							1 {fromToken.symbol} = {formatNumber(rate)} {toToken.symbol}
						</dd>
					</div>
					{priceImpact > 0 ? (
						<div className="flex items-center justify-between">
							<dt className="text-muted-foreground">Price impact</dt>
							<dd
								className={cn(
									"tabular-nums",
									highImpact ? "text-destructive" : "text-foreground",
								)}
							>
								-{(priceImpact * 100).toFixed(2)}%
							</dd>
						</div>
					) : null}
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Network fee</dt>
						<dd className="tabular-nums">{formatUsd(networkCost)}</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Estimated time</dt>
						<dd>{time}</dd>
					</div>
				</dl>
			</CollapsibleContent>
		</Collapsible>
	);
}

function SummaryRow({
	caption,
	token,
	amount,
}: {
	caption: string;
	token: Token;
	amount: number;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
			<div>
				<p className="text-xs text-muted-foreground">{caption}</p>
				<p className="text-lg font-medium tabular-nums">
					{formatNumber(amount)} {token.symbol}
				</p>
				<p className="text-xs text-muted-foreground">On {token.chain.name}</p>
			</div>
			<TokenAvatar token={token} withChain className="size-9" />
		</div>
	);
}

function ReviewDialog({
	fromToken,
	toToken,
	fromAmount,
	toAmount,
	slippage,
	mode,
	cta,
}: {
	fromToken: Token;
	toToken: Token;
	fromAmount: number;
	toAmount: number;
	slippage: string;
	mode: Mode;
	cta: { label: string; disabled: boolean };
}) {
	const action = modeVerb(mode);
	const { time } = routeEstimate(mode);
	const minimum = toAmount * (1 - Number(slippage) / 100);

	return (
		<Dialog>
			<DialogTrigger
				render={<Button className="w-full" disabled={cta.disabled} />}
			>
				{cta.label}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="capitalize">Review {action}</DialogTitle>
					<DialogDescription>
						Check the network and amount for each token before you confirm.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<SummaryRow caption="You pay" token={fromToken} amount={fromAmount} />
					<SummaryRow caption="You receive" token={toToken} amount={toAmount} />
				</div>
				<dl className="flex flex-col gap-2 text-sm">
					<div className="flex justify-between">
						<dt className="text-muted-foreground">Rate</dt>
						<dd className="tabular-nums">
							1 {fromToken.symbol} ={" "}
							{formatAmount(spotRate(fromToken, toToken))} {toToken.symbol}
						</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-muted-foreground">Maximum slippage</dt>
						<dd className="tabular-nums">{slippage}%</dd>
					</div>
					<div className="flex items-center justify-between">
						<dt className="text-muted-foreground">Estimated time</dt>
						<dd className="flex items-center gap-1.5">
							<TimerIcon className="size-3.5" />
							About {time}
						</dd>
					</div>
					<div className="flex justify-between">
						<dt className="text-muted-foreground">Minimum received</dt>
						<dd className="tabular-nums">
							{formatNumber(minimum)} {toToken.symbol}
						</dd>
					</div>
				</dl>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<DialogClose render={<Button className="capitalize" />}>
						Confirm {action}
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// All trade state and derived values behind one small interface. The widget
// stays a thin renderer; the swap and limit screens share this single source.
function useTrade({
	from = TOKEN_BY_ID["eth-ethereum"],
	to = TOKEN_BY_ID["usdc-ethereum"],
	amount = "0.85",
}: {
	from?: Token;
	to?: Token;
	amount?: string;
} = {}) {
	const [fromToken, setFromToken] = useState<Token>(from);
	const [toToken, setToToken] = useState<Token>(to);
	const [field, setField] = useState<{ side: Side; value: string }>({
		side: "sell",
		value: amount,
	});
	const [focused, setFocused] = useState<Side | null>(null);
	const [slippage, setSlippage] = useState("0.5");
	const [flipped, setFlipped] = useState(false);

	const { fromAmount, toAmount, priceImpact } = quote(
		fromToken,
		toToken,
		field.side,
		Number(field.value) || 0,
	);
	const sellAmount =
		field.side === "sell" ? field.value : quoteValue(fromAmount);
	const buyAmount = field.side === "buy" ? field.value : quoteValue(toAmount);
	const mode = getMode(fromToken, toToken);
	const cta =
		fromAmount <= 0
			? { label: "Enter an amount", disabled: true }
			: fromToken.id === toToken.id
				? { label: "Select a different token", disabled: true }
				: fromAmount > fromToken.balance
					? { label: `Insufficient ${fromToken.symbol}`, disabled: true }
					: {
							label: `Review ${modeVerb(mode)}`,
							disabled: false,
						};

	function editAmount(side: Side, value: string) {
		setField({ side, value });
	}
	function reverse() {
		setFromToken(toToken);
		setToToken(fromToken);
		setField({ side: "sell", value: buyAmount });
		setFocused(null);
		setFlipped((value) => !value);
	}

	return {
		fromToken,
		setFromToken,
		toToken,
		setToToken,
		sellAmount,
		buyAmount,
		fromAmount,
		toAmount,
		mode,
		priceImpact,
		cta,
		focused,
		setFocused,
		slippage,
		setSlippage,
		flipped,
		editAmount,
		reverse,
	};
}

type Trade = ReturnType<typeof useTrade>;

// The two amount cards with the direction button chipped into the seam.
function PanelStack({
	children,
	onReverse,
	flipped,
}: {
	children: ReactNode;
	onReverse: () => void;
	flipped: boolean;
}) {
	return (
		<div className="relative flex flex-col gap-1">
			{children}
			<div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								aria-label="Switch direction"
								onClick={onReverse}
								className="pointer-events-auto z-10 size-9 rounded-full border-4 border-card bg-muted hover:bg-accent"
							/>
						}
					>
						<ArrowDownIcon
							className={cn(
								"transition-transform duration-200",
								flipped && "rotate-180",
							)}
						/>
					</TooltipTrigger>
					<TooltipContent>Switch direction</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
}

function SellPanel({ trade }: { trade: Trade }) {
	return (
		<AmountPanel
			label="Sell"
			tokenLabel="sell token"
			token={trade.fromToken}
			onTokenChange={trade.setFromToken}
			amount={trade.sellAmount}
			onAmountChange={(value) => trade.editAmount("sell", value)}
			onFocus={() => trade.setFocused("sell")}
			onBlur={() => trade.setFocused(null)}
			active={trade.focused === "sell"}
			fiat={formatUsd(trade.fromAmount * trade.fromToken.price)}
			showMax
		/>
	);
}

function SwapBody({ trade }: { trade: Trade }) {
	return (
		<div className="flex flex-col gap-2">
			<PanelStack onReverse={trade.reverse} flipped={trade.flipped}>
				<SellPanel trade={trade} />
				<AmountPanel
					label="Buy"
					tokenLabel="buy token"
					token={trade.toToken}
					onTokenChange={trade.setToToken}
					amount={trade.buyAmount}
					onAmountChange={(value) => trade.editAmount("buy", value)}
					onFocus={() => trade.setFocused("buy")}
					onBlur={() => trade.setFocused(null)}
					active={trade.focused === "buy"}
					fiat={formatUsd(trade.toAmount * trade.toToken.price)}
				/>
			</PanelStack>
			<RouteSummary
				fromToken={trade.fromToken}
				toToken={trade.toToken}
				mode={trade.mode}
				priceImpact={trade.priceImpact}
			/>
			<ReviewDialog
				fromToken={trade.fromToken}
				toToken={trade.toToken}
				fromAmount={trade.fromAmount}
				toAmount={trade.toAmount}
				slippage={trade.slippage}
				mode={trade.mode}
				cta={trade.cta}
			/>
		</div>
	);
}

// Quick offsets from the market rate; the price field accepts any value too.
const LIMIT_PRESETS: Array<[string, number]> = [
	["Market", 0],
	["+1%", 0.01],
	["+5%", 0.05],
	["+10%", 0.1],
];
const EXPIRY_OPTIONS: Array<[string, string]> = [
	["1h", "1 hour"],
	["1d", "1 day"],
	["3d", "3 days"],
	["1w", "1 week"],
	["1m", "1 month"],
	["never", "Until cancelled"],
];

function LimitBody({ trade }: { trade: Trade }) {
	const priceId = useId();
	const expiryId = useId();
	// "" follows the market rate; any other value is the user's custom price.
	const [limitPrice, setLimitPrice] = useState("");
	const [expiry, setExpiry] = useState("1w");

	const marketRate = spotRate(trade.fromToken, trade.toToken);
	const rate = limitPrice === "" ? marketRate : Number(limitPrice) || 0;
	const premium = marketRate ? rate / marketRate - 1 : 0;
	const sellNum = Number(trade.sellAmount) || 0;
	const buyAtLimit = sellNum * rate;
	const activePreset = LIMIT_PRESETS.find(
		([, value]) => Math.abs(premium - value) < 1e-6,
	)?.[0];
	const place =
		sellNum <= 0
			? "Enter an amount"
			: trade.fromToken.id === trade.toToken.id
				? "Select a different token"
				: "Place limit order";

	return (
		<div className="flex flex-col gap-2">
			<PanelStack onReverse={trade.reverse} flipped={trade.flipped}>
				<SellPanel trade={trade} />
				<AmountPanel
					label="Receive at limit"
					tokenLabel="buy token"
					token={trade.toToken}
					onTokenChange={trade.setToToken}
					amount={quoteValue(buyAtLimit)}
					fiat={formatUsd(buyAtLimit * trade.toToken.price)}
					readOnly
				/>
			</PanelStack>
			<Field className="gap-2 rounded-xl bg-muted/40 p-3">
				<div className="flex items-center justify-between">
					<FieldLabel
						htmlFor={priceId}
						className="font-normal text-muted-foreground"
					>
						Limit price
					</FieldLabel>
					{premium === 0 ? (
						<Badge variant="outline">Market</Badge>
					) : (
						<ChangeBadge change={Number((premium * 100).toFixed(2))} />
					)}
				</div>
				<div className="flex items-center gap-2">
					<AmountInput
						id={priceId}
						className="text-xl"
						value={limitPrice === "" ? quoteValue(marketRate) : limitPrice}
						onChange={(event) => setLimitPrice(event.currentTarget.value)}
					/>
					<span className="whitespace-nowrap text-sm text-muted-foreground">
						{trade.toToken.symbol} / {trade.fromToken.symbol}
					</span>
				</div>
				<ToggleGroup
					aria-label="Limit price offset"
					variant="outline"
					size="sm"
					value={activePreset ? [activePreset] : []}
					onValueChange={(value) => {
						const preset = LIMIT_PRESETS.find(
							([itemLabel]) => itemLabel === value[0],
						);
						if (preset) {
							setLimitPrice(
								preset[1] === 0 ? "" : quoteValue(marketRate * (1 + preset[1])),
							);
						}
					}}
					className="w-full"
				>
					{LIMIT_PRESETS.map(([itemLabel]) => (
						<ToggleGroupItem
							key={itemLabel}
							value={itemLabel}
							className="flex-1"
						>
							{itemLabel}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</Field>
			<div className="flex items-center justify-between gap-2 px-1">
				<FieldLabel htmlFor={expiryId} className="font-normal">
					Expires
				</FieldLabel>
				<NativeSelect
					id={expiryId}
					value={expiry}
					onChange={(event) => setExpiry(event.currentTarget.value)}
					className="w-40"
				>
					{EXPIRY_OPTIONS.map(([value, itemLabel]) => (
						<NativeSelectOption key={value} value={value}>
							{itemLabel}
						</NativeSelectOption>
					))}
				</NativeSelect>
			</div>
			<Button className="w-full" disabled={place !== "Place limit order"}>
				{place}
			</Button>
		</div>
	);
}

function TradeCard({
	from,
	to,
	amount,
	defaultKind = "market",
	lockKind = false,
}: {
	from?: Token;
	to?: Token;
	amount?: string;
	defaultKind?: "market" | "limit";
	lockKind?: boolean;
} = {}) {
	const trade = useTrade({ from, to, amount });
	const [kind, setKind] = useState<string>(defaultKind);
	return (
		<TooltipProvider>
			<Card className="w-96 py-4">
				<CardContent className="px-4">
					<Tabs value={kind} onValueChange={setKind} className="gap-3">
						<div className="flex items-center justify-between">
							<TabsList aria-label="Trade type">
								<TabsTrigger
									value="market"
									disabled={lockKind && defaultKind !== "market"}
								>
									Swap
								</TabsTrigger>
								<TabsTrigger
									value="limit"
									disabled={lockKind && defaultKind !== "limit"}
								>
									Limit
								</TabsTrigger>
							</TabsList>
							<SwapSettings
								slippage={trade.slippage}
								onSlippageChange={trade.setSlippage}
							/>
						</div>
						<TabsContent value="market">
							<SwapBody trade={trade} />
						</TabsContent>
						<TabsContent value="limit">
							<LimitBody trade={trade} />
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</TooltipProvider>
	);
}

function WalletCard() {
	const total = HOLDINGS.reduce(
		(sum, token) => sum + token.balance * token.price,
		0,
	);
	const totalChange =
		HOLDINGS.reduce((sum, t) => sum + t.balance * t.price * t.change, 0) /
		(total || 1);

	return (
		<Card className="w-96 gap-3 py-4">
			<CardHeader>
				<CardDescription>Total balance</CardDescription>
				<CardTitle className="flex items-center gap-2 text-2xl tabular-nums">
					{formatUsd(total)}
					<ChangeBadge change={Number(totalChange.toFixed(1))} />
				</CardTitle>
				<CardAction>
					<Badge variant="outline" className="gap-1.5 py-1">
						<Avatar className="size-4">
							<AvatarImage src={WALLET.logo} alt="" />
							<AvatarFallback>MM</AvatarFallback>
						</Avatar>
						{WALLET.address}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="px-4">
				<Tabs defaultValue="tokens">
					<TabsList aria-label="Wallet views" className="w-full">
						<TabsTrigger value="tokens">Tokens</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
					</TabsList>
					<TabsContent value="tokens">
						<ItemGroup>
							{HOLDINGS.map((token) => (
								<Item key={token.id} size="sm" role="listitem" className="px-2">
									<ItemMedia>
										<TokenAvatar token={token} withChain />
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{token.name}</ItemTitle>
										<ItemDescription>
											{formatAmount(token.balance)} {token.symbol}
										</ItemDescription>
									</ItemContent>
									<ItemContent className="items-end">
										<ItemTitle className="tabular-nums">
											{formatUsd(token.balance * token.price)}
										</ItemTitle>
										<ChangeBadge change={token.change} />
									</ItemContent>
								</Item>
							))}
						</ItemGroup>
					</TabsContent>
					<TabsContent value="activity">
						<ItemGroup>
							{ACTIVITY.map((entry) => (
								<Item key={entry.id} size="sm" role="listitem" className="px-2">
									<ItemMedia variant="icon">
										<entry.icon />
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{entry.title}</ItemTitle>
										<ItemDescription>
											{entry.time}, {entry.route}
										</ItemDescription>
									</ItemContent>
									<ItemContent className="items-end">
										<ItemTitle className="tabular-nums">
											{entry.amount}
										</ItemTitle>
										<Badge variant={entry.statusVariant}>{entry.status}</Badge>
									</ItemContent>
								</Item>
							))}
						</ItemGroup>
					</TabsContent>
				</Tabs>
			</CardContent>
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
					"A cross-chain swap and bridge app built from the registry components. The mode follows the tokens and networks you choose: the same network is a swap, a different network is a bridge. Each story is one screen and renders in every theme; switch brand and mode from the toolbar.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prototype: Story = {
	render: () => (
		<div className="grid items-start gap-4 md:grid-cols-2">
			<TradeCard />
			<WalletCard />
		</div>
	),
};

export const Swap: Story = {
	render: () => (
		<TradeCard
			from={TOKEN_BY_ID["eth-ethereum"]}
			to={TOKEN_BY_ID["usdc-ethereum"]}
			lockKind
		/>
	),
};

export const Limit: Story = {
	render: () => <TradeCard defaultKind="limit" lockKind />,
};

export const Bridge: Story = {
	// The same asset across networks reads as a bridge. The mode is inferred from
	// the tokens, never toggled, and the route and action follow it.
	render: () => (
		<TradeCard
			from={TOKEN_BY_ID["usdc-ethereum"]}
			to={TOKEN_BY_ID["usdc-base"]}
			amount="250"
			lockKind
		/>
	),
};

export const PriceImpact: Story = {
	// A large order moves the pool price against the trader. The route surfaces
	// the impact as a warning before they commit.
	render: () => (
		<TradeCard
			from={{ ...TOKEN_BY_ID["eth-ethereum"], balance: 500 }}
			to={TOKEN_BY_ID["usdc-ethereum"]}
			amount="300"
			lockKind
		/>
	),
};

export const SelectToken: Story = {
	render: function Render() {
		const [token, setToken] = useState<Token>(TOKEN_BY_ID["eth-ethereum"]);
		return (
			<div className="flex w-72 flex-col items-center gap-3 rounded-xl bg-muted/40 p-6">
				<TokenPicker selected={token} onSelect={setToken} label="token" />
				<p className="text-sm text-muted-foreground">
					Selected: {token.symbol} on {token.chain.name}
				</p>
			</div>
		);
	},
};

export const Settings: Story = {
	render: function Render() {
		const [slippage, setSlippage] = useState("0.5");
		return (
			<div className="flex flex-col items-center gap-3">
				<SwapSettings slippage={slippage} onSlippageChange={setSlippage} />
				<p className="text-sm text-muted-foreground">Slippage: {slippage}%</p>
			</div>
		);
	},
};

export const Wallet: Story = {
	render: () => <WalletCard />,
};

// Interaction tests. These drive each flow for the Vitest run and stay out of
// the sidebar and docs, so every visible story renders its prepared state with
// no replayed typing or clicks.
const testOnly = ["!dev", "!autodocs"];

export const SwapFlow: Story = {
	...Swap,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		const sell = canvas.getByLabelText("Sell");
		// An empty amount disables the action with a prompt.
		await userEvent.clear(sell);
		await expect(
			canvas.getByRole("button", { name: /enter an amount/i }),
		).toBeDisabled();

		// A valid amount within balance enables the review.
		await userEvent.type(sell, "0.5");
		await expect(sell).toHaveValue("0.5");
		await expect(
			canvas.getByRole("combobox", { name: /eth on ethereum/i }),
		).toBeInTheDocument();

		// Review opens a confirmation dialog that names both networks.
		await userEvent.click(canvas.getByRole("button", { name: /review/i }));
		const dialog = await screen.findByRole("dialog");
		await expect(within(dialog).getByText(/you receive/i)).toBeVisible();
		await userEvent.click(
			within(dialog).getByRole("button", { name: /cancel/i }),
		);
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);

		// Reversing swaps the two tokens without moving the panels.
		await userEvent.click(
			canvas.getByRole("button", { name: "Switch direction" }),
		);
		await waitFor(() =>
			expect(
				canvas.getByRole("combobox", {
					name: /usdc on ethereum, change sell/i,
				}),
			).toBeInTheDocument(),
		);
		await expect(canvas.getByLabelText("Sell")).not.toHaveValue("");
	},
};

export const LimitFlow: Story = {
	...Limit,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		// The limit screen opens preselected; the swap tab is locked off.
		await expect(canvas.getByRole("tab", { name: "Swap" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);

		const sell = await canvas.findByLabelText("Sell");
		await userEvent.clear(sell);
		await userEvent.type(sell, "1");

		// A target above market raises the receive amount; the order can be placed.
		await userEvent.click(canvas.getByRole("button", { name: "+5%" }));
		await expect(
			canvas.getByRole("button", { name: /place limit order/i }),
		).toBeEnabled();
	},
};

export const BridgeRoute: Story = {
	...Bridge,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		// Moving USDC from Ethereum to Base is a bridge: the badge and action say so.
		await expect(canvas.getByText("Bridge")).toBeVisible();
		await expect(
			canvas.getByRole("button", { name: /review bridge/i }),
		).toBeEnabled();

		// The route names both networks.
		await userEvent.click(
			canvas.getByRole("button", { name: /show route details/i }),
		);
		await expect(canvas.getByText(/bridge to base/i)).toBeVisible();
	},
};

export const HighImpact: Story = {
	...PriceImpact,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		// A large order surfaces a high price impact, shown in the route summary
		// alongside the time and fee, with the full figure in the details.
		await expect(
			canvas.getByRole("button", { name: /review swap/i }),
		).toBeEnabled();
		await userEvent.click(
			canvas.getByRole("button", { name: /show route details/i }),
		);
		await expect(canvas.getByText(/price impact/i)).toBeVisible();
	},
};

export const TokenSearch: Story = {
	...SelectToken,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("combobox", { name: /eth on ethereum/i }),
		);
		const listbox = await screen.findByRole("listbox", { name: /tokens/i });
		await waitFor(() => expect(listbox).toBeVisible());

		// Filter to one network, then search and pick a token.
		await userEvent.click(screen.getByRole("button", { name: /^base$/i }));
		await userEvent.type(
			screen.getByRole("combobox", { name: /search tokens/i }),
			"usd",
		);
		await userEvent.click(
			await screen.findByRole("option", { name: /usdc on base/i }),
		);
		await waitFor(() =>
			expect(canvas.getByText(/selected: usdc on base/i)).toBeVisible(),
		);
	},
};

export const NetworkPicker: Story = {
	...SelectToken,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("combobox", { name: /eth on ethereum/i }),
		);
		await screen.findByRole("listbox", { name: /tokens/i });

		// The full network browser is nested: it opens without closing the token
		// picker, which stays mounted behind it.
		await userEvent.click(
			screen.getByRole("button", { name: /more networks/i }),
		);
		await userEvent.type(
			await screen.findByRole("textbox", { name: /search networks/i }),
			"linea",
		);
		await userEvent.click(
			await screen.findByRole("button", { name: /linea/i }),
		);

		// The token list rescopes to the network and the token search remains
		// (the picker never closed).
		await expect(
			screen.getByRole("combobox", { name: /search tokens/i }),
		).toBeVisible();
		const lineaTokens = await screen.findAllByRole("option", {
			name: /on linea/i,
		});
		expect(lineaTokens.length).toBeGreaterThan(0);
	},
};

export const SlippageEdit: Story = {
	...Settings,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /edit settings/i }),
		);
		await userEvent.click(await screen.findByRole("button", { name: "1%" }));
		await waitFor(() =>
			expect(canvas.getByText(/slippage: 1%/i)).toBeVisible(),
		);

		// A custom value overrides the presets.
		await userEvent.type(
			screen.getByRole("textbox", { name: "Custom" }),
			"2.5",
		);
		await waitFor(() =>
			expect(canvas.getByText(/slippage: 2\.5%/i)).toBeVisible(),
		);
	},
};

export const WalletActivity: Story = {
	...Wallet,
	tags: testOnly,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("tab", { name: "Activity" }));
		await waitFor(() => expect(canvas.getByText("Sent SOL")).toBeVisible());
	},
};

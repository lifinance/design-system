import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { MarketSwitcherButton } from "./market-switcher-button";

const ASSETS = {
	btc: {
		symbol: "BTC",
		name: "Bitcoin",
		logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
	},
	usdc: {
		symbol: "USDC",
		name: "USD Coin",
	},
};

const PROVIDER = {
	name: "Hyperliquid",
	logo: "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/hyperliquid.svg",
};

const meta = {
	component: MarketSwitcherButton,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A market switcher trigger that shows the selected pair and venue. Install with `pnpm dlx shadcn@latest add @perps/market-switcher-button`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105593-71142",
		},
	},
	args: {
		baseSymbol: ASSETS.btc.symbol,
		quoteSymbol: ASSETS.usdc.symbol,
		avatarSrc: ASSETS.btc.logo,
		avatarAlt: ASSETS.btc.name,
		avatarFallback: ASSETS.btc.symbol.slice(0, 1),
		avatarSubBadge: {
			src: PROVIDER.logo,
			alt: PROVIDER.name,
			fallback: PROVIDER.name.slice(0, 1),
		},
		onClick: fn(),
	},
} satisfies Meta<typeof MarketSwitcherButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placeholder: Story = {
	args: {
		baseSymbol: undefined,
		quoteSymbol: undefined,
		avatarSrc: undefined,
		avatarAlt: undefined,
		avatarFallback: undefined,
		avatarSubBadge: undefined,
		placeholder: "Select market",
	},
};

export const ProviderFallback: Story = {
	args: {
		avatarSubBadge: {
			fallback: PROVIDER.name.slice(0, 1),
		},
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
};

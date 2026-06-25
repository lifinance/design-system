import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/core/lib/utils";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarSubBadge,
} from "@/registry/core/ui/avatar";
import { Button } from "@/registry/core/ui/button";

export interface MarketSwitcherButtonAvatarSubBadge {
	src?: string;
	alt?: string;
	fallback?: string;
}

export interface MarketSwitcherButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "children"> {
	baseSymbol?: string;
	quoteSymbol?: string;
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
	avatarSubBadge?: MarketSwitcherButtonAvatarSubBadge;
	placeholder?: string;
}

function marketPairLabel(baseSymbol: string, quoteSymbol: string) {
	return baseSymbol.includes("/") ? baseSymbol : `${baseSymbol}/${quoteSymbol}`;
}

function MarketSwitcherButton({
	baseSymbol,
	quoteSymbol,
	avatarSrc,
	avatarAlt,
	avatarFallback,
	avatarSubBadge,
	placeholder = "Select market",
	className,
	variant = "ghost",
	size = "default",
	...props
}: MarketSwitcherButtonProps) {
	const label =
		baseSymbol && quoteSymbol
			? marketPairLabel(baseSymbol, quoteSymbol)
			: placeholder;
	const fallback =
		avatarFallback ?? baseSymbol?.slice(0, 1) ?? placeholder.slice(0, 1);

	return (
		<Button
			variant={variant}
			size={size}
			className={cn("cn-market-switcher-button", className)}
			{...props}
		>
			<span className="cn-market-switcher-button-content">
				<Avatar size="default" className="cn-market-switcher-button-avatar">
					{avatarSrc ? (
						<AvatarImage src={avatarSrc} alt={avatarAlt ?? ""} />
					) : null}
					<AvatarFallback>{fallback}</AvatarFallback>
					{avatarSubBadge ? (
						<AvatarSubBadge
							src={avatarSubBadge.src}
							alt={avatarSubBadge.alt}
							fallback={avatarSubBadge.fallback}
						/>
					) : null}
				</Avatar>
				<span className="cn-market-switcher-button-label-group">
					<span className="cn-market-switcher-button-label">{label}</span>
					<ChevronDownIcon className="cn-market-switcher-button-icon" />
				</span>
			</span>
		</Button>
	);
}

export { MarketSwitcherButton };

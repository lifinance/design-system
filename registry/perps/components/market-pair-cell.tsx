import type * as React from "react";
import { cn } from "@/registry/core/lib/utils";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarSubBadge,
} from "@/registry/core/ui/avatar";
import { Badge } from "@/registry/core/ui/badge";

export type MarketPairCellBadgeTone = "info" | "warning" | "secondary";

export interface MarketPairCellAvatarSubBadge {
	src?: string;
	alt?: string;
	fallback?: string;
}

export interface MarketPairCellBadge {
	tone: MarketPairCellBadgeTone;
	label: React.ReactNode;
}

export interface MarketPairCellProps extends React.ComponentProps<"span"> {
	baseSymbol: string;
	quoteSymbol: string;
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
	avatarSubBadge?: MarketPairCellAvatarSubBadge;
	badges?: MarketPairCellBadge[];
}

function marketPairLabel(baseSymbol: string, quoteSymbol: string) {
	return baseSymbol.includes("/") ? baseSymbol : `${baseSymbol}/${quoteSymbol}`;
}

function MarketPairCell({
	baseSymbol,
	quoteSymbol,
	avatarSrc,
	avatarAlt,
	avatarFallback,
	avatarSubBadge,
	badges = [],
	className,
	...props
}: MarketPairCellProps) {
	return (
		<span className={cn("cn-market-pair-cell", className)} {...props}>
			<Avatar size="2xs" className="size-5 after:border-0">
				{avatarSrc ? (
					<AvatarImage src={avatarSrc} alt={avatarAlt ?? ""} />
				) : null}
				<AvatarFallback>
					{avatarFallback ?? baseSymbol.slice(0, 1)}
				</AvatarFallback>
				{avatarSubBadge ? (
					<AvatarSubBadge
						src={avatarSubBadge.src}
						alt={avatarSubBadge.alt}
						fallback={avatarSubBadge.fallback}
					/>
				) : null}
			</Avatar>
			<span className="cn-market-pair-cell-symbol">
				{marketPairLabel(baseSymbol, quoteSymbol)}
			</span>
			{badges.length ? (
				<span className="cn-market-pair-cell-badges">
					{badges.map((badge) => (
						<Badge
							key={`${badge.tone}-${String(badge.label)}`}
							variant={badge.tone}
							className="h-5 px-2"
						>
							{badge.label}
						</Badge>
					))}
				</span>
			) : null}
		</span>
	);
}

export { MarketPairCell };

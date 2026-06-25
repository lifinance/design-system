import type * as React from "react";
import { cn } from "@/registry/core/lib/utils";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarSubBadge,
} from "@/registry/core/ui/avatar";
import { Badge } from "@/registry/core/ui/badge";
import { Skeleton } from "@/registry/core/ui/skeleton";

export type MarketListItemBadgeTone = "info" | "warning" | "secondary";
export type MarketListItemTone =
	| "default"
	| "success"
	| "destructive"
	| "muted";

export interface MarketListItemBadge {
	tone: MarketListItemBadgeTone;
	label: React.ReactNode;
}

export interface MarketListItemAvatarSubBadge {
	src?: string;
	alt?: string;
	fallback?: React.ReactNode;
}

export interface MarketListItemProps extends React.ComponentProps<"button"> {
	label: React.ReactNode;
	avatarSrc?: string;
	avatarAlt?: string;
	avatarFallback?: string;
	avatarSubBadge?: MarketListItemAvatarSubBadge;
	badges?: MarketListItemBadge[];
	primaryValue: React.ReactNode;
	secondaryValue: React.ReactNode;
	trailingValue: React.ReactNode;
	trailingTone?: MarketListItemTone;
}

const trailingToneClass: Record<MarketListItemTone, string> = {
	default: "text-card-foreground",
	success: "text-success",
	destructive: "text-destructive",
	muted: "text-muted-foreground",
};

function MarketListItem({
	label,
	avatarSrc,
	avatarAlt,
	avatarFallback,
	avatarSubBadge,
	badges = [],
	primaryValue,
	secondaryValue,
	trailingValue,
	trailingTone = "default",
	className,
	type = "button",
	...props
}: MarketListItemProps) {
	return (
		<button
			type={type}
			data-slot="market-list-item"
			className={cn("cn-market-list-item", className)}
			{...props}
		>
			<Avatar size="sm" className="cn-market-list-item-avatar">
				{avatarSrc ? (
					<AvatarImage src={avatarSrc} alt={avatarAlt ?? ""} />
				) : null}
				<AvatarFallback>{avatarFallback}</AvatarFallback>
				{avatarSubBadge ? (
					<AvatarSubBadge
						src={avatarSubBadge.src}
						alt={avatarSubBadge.alt}
						fallback={avatarSubBadge.fallback}
					/>
				) : null}
			</Avatar>
			<span className="cn-market-list-item-content">
				<span className="cn-market-list-item-row">
					<span className="cn-market-list-item-label-group">
						<span className="cn-market-list-item-label">{label}</span>
						{badges.length ? (
							<span className="cn-market-list-item-badges">
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
					<span className="cn-market-list-item-primary-value">
						{primaryValue}
					</span>
				</span>
				<span className="cn-market-list-item-row-secondary">
					<span className="cn-market-list-item-secondary-value">
						{secondaryValue}
					</span>
					<span
						className={cn(
							"cn-market-list-item-trailing-value",
							trailingToneClass[trailingTone],
						)}
					>
						{trailingValue}
					</span>
				</span>
			</span>
		</button>
	);
}

function MarketListItemSkeleton({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="market-list-item-skeleton"
			className={cn("cn-market-list-item-skeleton", className)}
			{...props}
		>
			<Skeleton className="cn-market-list-item-skeleton-avatar" />
			<div className="cn-market-list-item-skeleton-content">
				<div className="cn-market-list-item-skeleton-lines-start">
					<Skeleton className="cn-market-list-item-skeleton-line-01" />
					<Skeleton className="cn-market-list-item-skeleton-line-02" />
				</div>
				<div className="cn-market-list-item-skeleton-lines-end">
					<Skeleton className="cn-market-list-item-skeleton-line-03" />
					<Skeleton className="cn-market-list-item-skeleton-line-04" />
				</div>
			</div>
		</div>
	);
}

export { MarketListItem, MarketListItemSkeleton };

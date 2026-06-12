import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Badge } from "@/registry/core/ui/badge";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/core/ui/card";

type AchievementCardProps = React.ComponentProps<typeof Card> & {
	title: string;
	description: string;
	imageUrl?: string;
	badge?: React.ReactNode;
	headerBadge?: React.ReactNode;
};

function AchievementCard({
	title,
	description,
	imageUrl,
	badge,
	headerBadge,
	className,
	...props
}: AchievementCardProps) {
	return (
		<Card
			data-slot="achievement-card"
			className={cn(
				"relative gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md",
				className,
			)}
			{...props}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={title}
					className="aspect-square w-full bg-card object-cover"
				/>
			) : (
				<div className="aspect-square w-full bg-muted" />
			)}
			{headerBadge ? (
				<Badge className="absolute top-4 right-4">{headerBadge}</Badge>
			) : null}
			<CardHeader className="grid-cols-[minmax(0,1fr)_auto] items-center py-4">
				<CardTitle className="truncate text-base">{title}</CardTitle>
				<CardDescription className="truncate">{description}</CardDescription>
				{badge ? (
					<CardAction className="self-center">
						<Badge variant="secondary">{badge}</Badge>
					</CardAction>
				) : null}
			</CardHeader>
		</Card>
	);
}

export { AchievementCard };

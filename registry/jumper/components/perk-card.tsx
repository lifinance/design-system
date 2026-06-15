import { CheckIcon, LockIcon, LockOpenIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Badge } from "@/registry/core/ui/badge";
import { Card } from "@/registry/core/ui/card";

type PerkCardProps = React.ComponentProps<typeof Card> & {
	title: string;
	description: string;
	imageUrl?: string;
	discount?: string;
	status?: "claimed" | "unlocked" | "level";
	level?: number;
};

function PerkCard({
	title,
	description,
	imageUrl,
	discount,
	status = "unlocked",
	level,
	className,
	...props
}: PerkCardProps) {
	return (
		<Card
			data-slot="perk-card"
			className={cn("gap-6 rounded-lg p-4 shadow-sm", className)}
			{...props}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt=""
					className="aspect-[2/1] w-full rounded-xl object-cover"
				/>
			) : (
				<div className="aspect-[2/1] w-full rounded-xl bg-muted" />
			)}
			<div data-slot="perk-card-content" className="flex flex-col gap-4">
				<div data-slot="perk-card-header" className="flex flex-col gap-4">
					<p data-slot="perk-card-title" className="text-base font-bold">
						{title}
					</p>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center justify-between gap-2">
					{discount ? <Badge variant="muted">{discount}</Badge> : null}
					{status === "claimed" && (
						<Badge variant="success">
							<CheckIcon />
							Claimed
						</Badge>
					)}
					{status === "unlocked" && (
						<Badge variant="success">
							<LockOpenIcon />
							Unlocked
						</Badge>
					)}
					{status === "level" && (
						<Badge variant="muted">
							<LockIcon />
							{level != null ? `Level ${level}` : "Locked"}
						</Badge>
					)}
				</div>
			</div>
		</Card>
	);
}

export { PerkCard };

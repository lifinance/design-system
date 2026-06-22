import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Badge } from "@/registry/core/ui/badge";
import { Card } from "@/registry/core/ui/card";

type MissionCardProps = React.ComponentProps<typeof Card> & {
	title: string;
	imageUrl?: string;
	reward?: string;
	status?: "available" | "earned";
	avatar?: React.ReactNode;
};

function MissionCard({
	title,
	imageUrl,
	reward,
	status = "available",
	avatar,
	className,
	...props
}: MissionCardProps) {
	return (
		<Card
			data-slot="mission-card"
			className={cn("gap-6 rounded-lg p-4 shadow-sm", className)}
			{...props}
		>
			<div data-slot="mission-card-media" className="relative w-full">
				{imageUrl ? (
					<img
						src={imageUrl}
						alt=""
						className="aspect-[2/1] w-full rounded-xl object-cover"
					/>
				) : (
					<div className="aspect-[2/1] w-full rounded-xl bg-muted" />
				)}
				{avatar ? (
					<div className="absolute bottom-0 left-4 translate-y-1/2">
						{avatar}
					</div>
				) : null}
			</div>
			<div
				data-slot="mission-card-content"
				className="flex flex-1 flex-col justify-between gap-4"
			>
				<p
					data-slot="mission-card-title"
					className="line-clamp-2 text-base font-bold"
				>
					{title}
				</p>
				<Badge variant={status === "earned" ? "success" : "muted"}>
					{[reward, status].filter(Boolean).join(" ")}
				</Badge>
			</div>
		</Card>
	);
}

export { MissionCard };

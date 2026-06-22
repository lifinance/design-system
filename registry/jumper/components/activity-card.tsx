import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Badge } from "@/registry/core/ui/badge";
import { Card } from "@/registry/core/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/core/ui/tooltip";

type ActivityCardProps = React.ComponentProps<typeof Card> & {
	title: string;
	description: string;
	imageUrl?: string;
	date?: string;
	reward?: string;
	status?: "available" | "earned" | "failed";
	progress?: number;
	progressHint?: React.ReactNode;
};

function ActivityProgress({ value = 0 }: { value?: number }) {
	const radius = 9;
	const circumference = 2 * Math.PI * radius;
	return (
		<svg
			viewBox="0 0 24 24"
			className="size-6 -rotate-90"
			fill="none"
			aria-hidden="true"
		>
			<circle
				cx="12"
				cy="12"
				r={radius}
				strokeWidth="3"
				className="stroke-muted"
			/>
			<circle
				cx="12"
				cy="12"
				r={radius}
				strokeWidth="3"
				strokeLinecap="round"
				className="stroke-primary"
				strokeDasharray={circumference}
				strokeDashoffset={circumference * (1 - value)}
			/>
		</svg>
	);
}

function ActivityCard({
	title,
	description,
	imageUrl,
	date,
	reward,
	status = "available",
	progress = 0,
	progressHint,
	className,
	...props
}: ActivityCardProps) {
	const word = status === "available" ? "available" : "earned";
	return (
		<Card
			data-slot="activity-card"
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
			<div
				data-slot="activity-card-content"
				className="flex flex-1 flex-col justify-between gap-4"
			>
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between gap-2">
						<p
							data-slot="activity-card-title"
							className="min-w-0 flex-1 truncate text-base font-bold"
						>
							{title}
						</p>
						{date ? <Badge variant="muted">{date}</Badge> : null}
					</div>
					<p className="text-xs text-muted-foreground">{description}</p>
				</div>
				<div className="flex items-center justify-between gap-2">
					<Badge variant={status === "earned" ? "success" : "muted"}>
						{[reward, word].filter(Boolean).join(" ")}
					</Badge>
					{status === "available" && progressHint ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger
									render={
										<button
											type="button"
											className="inline-flex rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
										/>
									}
								>
									<ActivityProgress value={progress} />
									<span className="sr-only">Progress</span>
								</TooltipTrigger>
								<TooltipContent>{progressHint}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : status === "available" ? (
						<ActivityProgress value={progress} />
					) : null}
				</div>
			</div>
		</Card>
	);
}

export { ActivityCard };

import { cn } from "@/registry/core/lib/utils";

export interface DepthRatioBarProps extends React.ComponentProps<"div"> {
	/** Resting size on the bid side. */
	bids: number;
	/** Resting size on the ask side. */
	asks: number;
	bidLabel?: string;
	askLabel?: string;
	/** Tween the bars when the ratio changes. Always disabled under `prefers-reduced-motion`. */
	animated?: boolean;
}

function formatPct(value: number) {
	return `${value.toFixed(2)}%`;
}

function DepthRatioBar({
	bids,
	asks,
	bidLabel = "Bids",
	askLabel = "Asks",
	animated = false,
	className,
	...props
}: DepthRatioBarProps) {
	const total = bids + asks;
	const bidPct = total > 0 ? (bids / total) * 100 : 0;
	const askPct = total > 0 ? (asks / total) * 100 : 0;
	const barMotion =
		animated &&
		"transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none";

	return (
		<div
			data-slot="depth-ratio-bar"
			className={cn(
				"flex w-full flex-col gap-3 text-xs font-medium",
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-5 whitespace-nowrap">
				<div className="flex flex-1 items-center gap-1">
					<span className="text-card-foreground">{bidLabel}</span>
					<span className="text-success">{formatPct(bidPct)}</span>
				</div>
				<div className="flex flex-1 items-center justify-end gap-1">
					<span className="text-card-foreground">{askLabel}</span>
					<span className="text-destructive">{formatPct(askPct)}</span>
				</div>
			</div>
			<div className="flex w-full items-start gap-2">
				<div
					className={cn("h-1 min-w-px rounded-full bg-success", barMotion)}
					style={{ flexGrow: total > 0 ? bidPct : 1 }}
				/>
				<div
					className={cn("h-1 min-w-px rounded-full bg-destructive", barMotion)}
					style={{ flexGrow: total > 0 ? askPct : 1 }}
				/>
			</div>
		</div>
	);
}

export { DepthRatioBar };

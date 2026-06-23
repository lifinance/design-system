import { cn } from "@/registry/core/lib/utils";

export interface SpreadProps extends React.ComponentProps<"div"> {
	/** Absolute spread between best bid and best ask, in quote currency. */
	value: number;
	/** Spread as a percentage of price. */
	percent: number;
	label?: string;
	/** Quote-currency symbol prefixed to the absolute value. */
	currencySymbol?: string;
	/** Leading cell, e.g. an order-book price-grouping select. The consumer owns the control. */
	start?: React.ReactNode;
}

/**
 * The order-book spread divider: a three-cell row with a leading slot (e.g. a
 * price-grouping select), a center slot, and the spread readout end-aligned.
 */
function Spread({
	value,
	percent,
	label = "Spread",
	currencySymbol = "$",
	start,
	className,
	children,
	...props
}: SpreadProps) {
	return (
		<div
			data-slot="spread"
			className={cn("flex h-9 items-center", className)}
			{...props}
		>
			<div className="flex flex-1 items-center">{start}</div>
			<div className="flex flex-1 items-center justify-center">{children}</div>
			<div className="flex flex-1 items-center justify-end gap-1 text-xs font-medium text-muted-foreground tabular-nums">
				<span>{label}:</span>
				<span>
					{currencySymbol}
					{value.toLocaleString(undefined, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
				<span>({percent.toFixed(2)}%)</span>
			</div>
		</div>
	);
}

export { Spread };

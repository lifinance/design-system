import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/core/ui/table";

export type MarketTone = "up" | "down" | "neutral";
export type MarketAlign = "start" | "end";

export interface MarketTableColumn {
	/** Stable key matching the keys in {@link MarketTableRow.cells}. */
	key: string;
	header: React.ReactNode;
	/** Cell alignment. Numeric columns read better end-aligned. Defaults to `start`. */
	align?: MarketAlign;
	/** Trailing affordance in the header cell, e.g. a unit toggle. The consumer owns the interaction. */
	action?: React.ReactNode;
}

export interface MarketTableRow {
	id: string;
	cells: Record<string, React.ReactNode>;
	/** Colors the leading column, e.g. green bids / red asks. Defaults to `neutral`. */
	tone?: MarketTone;
	/** Cumulative-depth fill behind the row, 0–1. Tinted by {@link tone}, anchored to the trailing edge. */
	depth?: number;
}

export interface MarketTableProps extends React.ComponentProps<typeof Table> {
	columns: MarketTableColumn[];
	rows: MarketTableRow[];
	/** A full-width row inserted into the body, e.g. the order-book spread divider. The divider content owns its height. */
	divider?: React.ReactNode;
	/** Row index the divider is inserted before. Equal to the row count places it last. */
	dividerAfter?: number;
	/** Tween per-row depth bars when {@link MarketTableRow.depth} changes. Always disabled under `prefers-reduced-motion`. */
	animateDepth?: boolean;
}

const toneClass: Record<MarketTone, string> = {
	up: "text-success",
	down: "text-destructive",
	neutral: "text-foreground",
};

const toneTint: Record<MarketTone, string> = {
	up: "var(--success)",
	down: "var(--destructive)",
	neutral: "var(--muted-foreground)",
};

function depthStyle(row: MarketTableRow): React.CSSProperties | undefined {
	if (row.depth == null) {
		return undefined;
	}
	const pct = `${Math.min(Math.max(row.depth, 0), 1) * 100}%`;
	const tint = `color-mix(in oklch, ${toneTint[row.tone ?? "neutral"]} 14%, transparent)`;
	return {
		backgroundImage: `linear-gradient(${tint}, ${tint})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "right center",
		backgroundSize: `${pct} 100%`,
	};
}

const alignClass: Record<MarketAlign, string> = {
	start: "text-left",
	end: "text-right",
};

function MarketTable({
	columns,
	rows,
	divider,
	dividerAfter,
	animateDepth = false,
	className,
	...props
}: MarketTableProps) {
	const renderDivider = (key: string) => (
		<TableRow key={key} className="hover:bg-transparent">
			<TableCell
				colSpan={columns.length}
				className="cn-market-table-divider-cell"
			>
				{divider}
			</TableCell>
		</TableRow>
	);

	return (
		<Table
			data-slot="market-table"
			className={cn("cn-market-table", className)}
			{...props}
		>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					{columns.map((column) => (
						<TableHead
							key={column.key}
							className={cn(
								"cn-market-table-head",
								alignClass[column.align ?? "start"],
							)}
						>
							<span
								className={cn(
									"cn-market-table-head-label",
									column.align === "end" && "justify-end",
								)}
							>
								{column.header}
								{column.action}
							</span>
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.flatMap((row, index) => {
					const cells = (
						<TableRow
							key={row.id}
							className={cn(
								animateDepth &&
									"transition-[background-size] duration-500 ease-out motion-reduce:transition-none",
							)}
							style={depthStyle(row)}
						>
							{columns.map((column, columnIndex) => (
								<TableCell
									key={column.key}
									className={cn(
										"cn-market-table-cell",
										alignClass[column.align ?? "start"],
										columnIndex === 0 && toneClass[row.tone ?? "neutral"],
									)}
								>
									{row.cells[column.key]}
								</TableCell>
							))}
						</TableRow>
					);

					if (divider != null && index === dividerAfter) {
						return [renderDivider(`divider-before-${row.id}`), cells];
					}

					return [cells];
				})}
				{divider != null && dividerAfter === rows.length
					? renderDivider("divider-end")
					: null}
			</TableBody>
		</Table>
	);
}

export { MarketTable };

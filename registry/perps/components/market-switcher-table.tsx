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

export type MarketSwitcherTableAlign = "start" | "end";

export interface MarketSwitcherTableColumn {
	key: string;
	header: React.ReactNode;
	align?: MarketSwitcherTableAlign;
	action?: React.ReactNode;
	width?: string;
}

export interface MarketSwitcherTableRow {
	id: string;
	cells: Record<string, React.ReactNode>;
	disabled?: boolean;
}

export interface MarketSwitcherTableProps extends React.ComponentProps<"div"> {
	columns: MarketSwitcherTableColumn[];
	rows: MarketSwitcherTableRow[];
	selectedRowId?: string;
	onRowSelect?: (row: MarketSwitcherTableRow) => void;
}

const alignClass: Record<MarketSwitcherTableAlign, string> = {
	start: "text-left",
	end: "text-right",
};

function ColumnGroup({ columns }: { columns: MarketSwitcherTableColumn[] }) {
	const remainingWidth =
		columns.length > 1 ? `${64 / (columns.length - 1)}%` : "100%";

	return (
		<colgroup>
			{columns.map((column, index) => (
				<col
					key={column.key}
					style={{
						width: column.width ?? (index === 0 ? "36%" : remainingWidth),
					}}
				/>
			))}
		</colgroup>
	);
}

function MarketSwitcherTable({
	columns,
	rows,
	selectedRowId,
	onRowSelect,
	className,
	...props
}: MarketSwitcherTableProps) {
	return (
		<div
			data-slot="market-switcher-table"
			className={cn("cn-market-switcher-table", className)}
			{...props}
		>
			<Table className="cn-market-switcher-table-header-table">
				<ColumnGroup columns={columns} />
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						{columns.map((column) => (
							<TableHead
								key={column.key}
								className={cn(
									"cn-market-switcher-table-head",
									alignClass[column.align ?? "start"],
								)}
							>
								<span
									className={cn(
										"cn-market-switcher-table-head-label",
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
			</Table>
			<div className="cn-market-switcher-table-body">
				<Table className="cn-market-switcher-table-body-table">
					<ColumnGroup columns={columns} />
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.id}
								data-selected={row.id === selectedRowId}
								data-disabled={row.disabled ? "" : undefined}
								className="cn-market-switcher-table-row"
								onClick={() => {
									if (!row.disabled) {
										onRowSelect?.(row);
									}
								}}
							>
								{columns.map((column) => (
									<TableCell
										key={column.key}
										className={cn(
											"cn-market-switcher-table-cell",
											alignClass[column.align ?? "start"],
										)}
									>
										{row.cells[column.key]}
									</TableCell>
								))}
							</TableRow>
						))}
						<TableRow
							aria-hidden="true"
							className="cn-market-switcher-table-spacer-row"
						>
							<TableCell
								colSpan={columns.length}
								className="cn-market-switcher-table-spacer-cell"
							/>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export { MarketSwitcherTable };

import { cn } from "@/registry/core/lib/utils";

export interface PanelHeaderProps extends React.ComponentProps<"div"> {
	/** Leading slot, e.g. a tab list or back action. */
	start?: React.ReactNode;
	/** Trailing slot, e.g. an action button. */
	end?: React.ReactNode;
	/** Alignment of the content slot (children). Defaults to `start`. */
	align?: "start" | "center";
	/** Render a bottom divider. Defaults to `true`. */
	divider?: boolean;
}

function PanelHeader({
	start,
	end,
	align = "start",
	divider = true,
	className,
	children,
	...props
}: PanelHeaderProps) {
	return (
		<div
			data-slot="panel-header"
			className={cn(
				"flex w-full items-center gap-4 px-4 py-2.5",
				divider && "border-b",
				className,
			)}
			{...props}
		>
			{start}
			<div
				className={cn(
					"flex min-w-0 flex-1 items-center gap-2",
					align === "center" && "justify-center",
				)}
			>
				{children}
			</div>
			{end}
		</div>
	);
}

export { PanelHeader };

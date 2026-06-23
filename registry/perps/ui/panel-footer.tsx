import { cn } from "@/registry/core/lib/utils";

export type PanelFooterProps = React.ComponentProps<"div">;

function PanelFooter({ className, ...props }: PanelFooterProps) {
	return (
		<div
			data-slot="panel-footer"
			className={cn("flex w-full flex-col gap-3 border-t px-4 py-4", className)}
			{...props}
		/>
	);
}

export { PanelFooter };

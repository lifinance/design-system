import { cn } from "@/registry/core/lib/utils";

export type PanelFooterProps = React.ComponentProps<"div">;

function PanelFooter({ className, ...props }: PanelFooterProps) {
	return (
		<div
			data-slot="panel-footer"
			className={cn("cn-panel-footer", className)}
			{...props}
		/>
	);
}

export { PanelFooter };

"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";

import { useDevWarning } from "@/registry/core/hooks/use-dev-warning";
import { cn } from "@/registry/core/lib/utils";

const TooltipDescriptionContext = React.createContext<string | undefined>(
	undefined,
);

function TooltipProvider({
	delay = 0,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}

const TooltipOpenContext = React.createContext(false);

function Tooltip({
	open,
	defaultOpen = false,
	onOpenChange,
	...props
}: TooltipPrimitive.Root.Props) {
	const descriptionId = React.useId();
	const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
	return (
		<TooltipDescriptionContext.Provider value={descriptionId}>
			<TooltipOpenContext.Provider value={open ?? uncontrolledOpen}>
				<TooltipPrimitive.Root
					data-slot="tooltip"
					open={open}
					defaultOpen={defaultOpen}
					onOpenChange={(nextOpen, eventDetails) => {
						onOpenChange?.(nextOpen, eventDetails);
						if (!eventDetails.isCanceled) {
							setUncontrolledOpen(nextOpen);
						}
					}}
					{...props}
				/>
			</TooltipOpenContext.Provider>
		</TooltipDescriptionContext.Provider>
	);
}

const TooltipTrigger = React.forwardRef<
	HTMLButtonElement,
	TooltipPrimitive.Trigger.Props
>(function TooltipTrigger({ ...props }, ref) {
	const descriptionId = React.useContext(TooltipDescriptionContext);
	return (
		<TooltipPrimitive.Trigger
			ref={ref}
			data-slot="tooltip-trigger"
			aria-describedby={descriptionId}
			{...props}
		/>
	);
});

function TooltipContent({
	className,
	side = "top",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	keepMounted = true,
	description,
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<
		TooltipPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset"
	> & {
		/** Keeps the popup in the DOM while closed. */
		keepMounted?: boolean;
		/** Plain-text description of the trigger, used when `keepMounted` is
		 * false. Defaults to `children` when it is a string. */
		description?: string;
	}) {
	const descriptionId = React.useContext(TooltipDescriptionContext);
	const open = React.useContext(TooltipOpenContext);
	const popupDescribes = keepMounted || open;
	const descriptionText =
		description ?? (typeof children === "string" ? children : undefined);
	useDevWarning(
		!keepMounted && descriptionText === undefined,
		"TooltipContent: pass a plain-text `description` when `keepMounted` is false and `children` is not a string, or the trigger has no accessible description.",
	);
	// Exactly one element holds the description id, so the trigger's
	// aria-describedby always resolves and is read once: the popup while it is
	// mounted and open, as the tooltip role requires, or else a hidden element
	// with the plain-text description.
	return (
		<>
			{!popupDescribes && descriptionText !== undefined ? (
				<span id={descriptionId} hidden data-slot="tooltip-description">
					{descriptionText}
				</span>
			) : null}
			<TooltipPrimitive.Portal keepMounted={keepMounted}>
				<TooltipPrimitive.Positioner
					align={align}
					alignOffset={alignOffset}
					side={side}
					sideOffset={sideOffset}
					className="isolate z-50"
				>
					<TooltipPrimitive.Popup
						id={popupDescribes ? descriptionId : undefined}
						role="tooltip"
						data-slot="tooltip-content"
						className={cn(
							"cn-tooltip-content cn-tooltip-content-logical z-50 w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background",
							className,
						)}
						{...props}
					>
						{children}
						<TooltipPrimitive.Arrow
							data-slot="tooltip-arrow"
							className="cn-tooltip-arrow cn-tooltip-arrow-logical z-50 bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5"
						/>
					</TooltipPrimitive.Popup>
				</TooltipPrimitive.Positioner>
			</TooltipPrimitive.Portal>
		</>
	);
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

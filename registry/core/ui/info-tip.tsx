"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { RiInformationLine } from "@remixicon/react";
import * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/core/ui/tooltip";

/** Base UI waits 600ms to open without a provider. Info tips open at once by
 * default, and this carries a provider's delay to each trigger. */
const InfoTipDelayContext = React.createContext(0);

/** Sets the open delay for every info tip below it, and groups them so an
 * adjacent tip opens with no further wait. */
function InfoTipProvider({
	delay = 0,
	...props
}: React.ComponentProps<typeof TooltipProvider>) {
	return (
		<InfoTipDelayContext.Provider value={delay}>
			<TooltipProvider delay={delay} {...props} />
		</InfoTipDelayContext.Provider>
	);
}

const InfoTipSetOpenContext = React.createContext<
	React.Dispatch<React.SetStateAction<boolean>>
>(() => {});

/** Pairs a trigger with its explanation and owns the open state, so a touch
 * tap on the trigger can toggle it. */
function InfoTipRoot(
	props: Omit<
		React.ComponentProps<typeof Tooltip>,
		"open" | "defaultOpen" | "onOpenChange"
	>,
) {
	const [open, setOpen] = React.useState(false);
	return (
		<InfoTipSetOpenContext.Provider value={setOpen}>
			<Tooltip open={open} onOpenChange={setOpen} {...props} />
		</InfoTipSetOpenContext.Provider>
	);
}

/** Hover and focus trigger for the nearest `InfoTipRoot`. A touch tap toggles
 * the explanation unless `openOnTap` is false. */
const InfoTipTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof TooltipTrigger> & {
		/** Set to false when a tap on the trigger already has its own action. */
		openOnTap?: boolean;
	}
>(function InfoTipTrigger({ openOnTap = true, ...props }, ref) {
	const delay = React.useContext(InfoTipDelayContext);
	const setOpen = React.useContext(InfoTipSetOpenContext);
	const pressPointerTypeRef = React.useRef("");
	// Base UI tooltips ignore touch, and close on any press of the trigger, so
	// a touch press bypasses those handlers and the click toggles the popup.
	const tapHandlers = mergeProps<"button">(
		{
			onPointerDown(event) {
				pressPointerTypeRef.current = event.pointerType;
				if (event.pointerType === "touch") {
					event.preventBaseUIHandler();
				}
			},
			onClick(event) {
				if (pressPointerTypeRef.current === "touch") {
					event.preventBaseUIHandler();
					setOpen((wasOpen) => !wasOpen);
				}
				pressPointerTypeRef.current = "";
			},
		},
		{ onPointerDown: props.onPointerDown, onClick: props.onClick },
	);
	return (
		<TooltipTrigger
			ref={ref}
			data-slot="info-tip-trigger"
			delay={delay}
			{...props}
			{...(openOnTap ? tapHandlers : {})}
		/>
	);
});

/** Explanation popup for the nearest `InfoTipRoot`. */
function InfoTipContent({
	className,
	side = "bottom",
	align = "start",
	sideOffset = 8,
	...props
}: React.ComponentProps<typeof TooltipContent>) {
	return (
		<TooltipContent
			data-slot="info-tip-content"
			side={side}
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"cn-info-tip-content w-max max-w-56 bg-popover text-popover-foreground",
				className,
			)}
			{...props}
		/>
	);
}

/** Info icon that explains a nearby label. The explanation opens on hover or
 * focus, and a touch tap toggles it. */
function InfoTip({
	className,
	children,
	keepMounted,
	description,
	...props
}: Omit<React.ComponentProps<"button">, "ref"> &
	Pick<
		React.ComponentProps<typeof TooltipContent>,
		"keepMounted" | "description"
	>) {
	return (
		<InfoTipRoot>
			<InfoTipTrigger
				render={<button type="button" />}
				data-slot="info-tip"
				className={cn("cn-info-tip", className)}
				{...props}
			>
				<RiInformationLine aria-hidden />
			</InfoTipTrigger>
			<InfoTipContent keepMounted={keepMounted} description={description}>
				{children}
			</InfoTipContent>
		</InfoTipRoot>
	);
}

export {
	InfoTip,
	InfoTipContent,
	InfoTipProvider,
	InfoTipRoot,
	InfoTipTrigger,
};

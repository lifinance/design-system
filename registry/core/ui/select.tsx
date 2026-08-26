"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
	RiArrowDownSLine,
	RiArrowUpSLine,
	RiCheckLine,
} from "@remixicon/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";

const Select = SelectPrimitive.Root;

const selectTriggerVariants = cva("cn-select-trigger", {
	variants: {
		variant: {
			default: "cn-select-trigger-variant-default",
			ghost: "cn-select-trigger-variant-ghost",
		},
		size: {
			default: "cn-select-trigger-size-default",
			sm: "cn-select-trigger-size-sm",
			xs: "cn-select-trigger-size-xs",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={cn("cn-select-group", className)}
			{...props}
		/>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("cn-select-value", className)}
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	size = "default",
	variant = "default",
	children,
	...props
}: SelectPrimitive.Trigger.Props & VariantProps<typeof selectTriggerVariants>) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			data-variant={variant}
			className={cn(selectTriggerVariants({ variant, size, className }))}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<RiArrowDownSLine className="cn-select-trigger-icon pointer-events-none" />
				}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	side = "bottom",
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	alignItemWithTrigger = true,
	size = "default",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		"align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
	> & {
		size?: "xs" | "sm" | "default";
	}) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				alignItemWithTrigger={alignItemWithTrigger}
				className="isolate z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					data-size={size}
					data-align-trigger={alignItemWithTrigger}
					className={cn(
						"cn-select-content cn-select-content-logical relative isolate z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto data-[align-trigger=true]:animate-none",
						size === "xs" &&
							"min-w-(--anchor-width) **:data-[slot=select-group]:p-0.5 **:data-[slot=select-item]:gap-1 **:data-[slot=select-item]:py-0.5 **:data-[slot=select-item]:pr-6 **:data-[slot=select-item]:pl-2 **:data-[slot=select-item]:text-xs",
						className,
					)}
					{...props}
				>
					<SelectScrollUpButton />
					<SelectPrimitive.List
						aria-label={ariaLabel}
						aria-labelledby={ariaLabelledby}
					>
						{children}
					</SelectPrimitive.List>
					<SelectScrollDownButton />
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-label"
			className={cn("cn-select-label", className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"cn-select-item relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemText className="cn-select-item-text shrink-0 whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator
				render={
					<span
						data-slot="select-item-indicator"
						className="cn-select-item-indicator"
					/>
				}
			>
				<RiCheckLine className="pointer-events-none" />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn("cn-select-separator pointer-events-none", className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
	return (
		<SelectPrimitive.ScrollUpArrow
			data-slot="select-scroll-up-button"
			className={cn("cn-select-scroll-up-button top-0 w-full", className)}
			{...props}
		>
			<RiArrowUpSLine />
		</SelectPrimitive.ScrollUpArrow>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
	return (
		<SelectPrimitive.ScrollDownArrow
			data-slot="select-scroll-down-button"
			className={cn("cn-select-scroll-down-button bottom-0 w-full", className)}
			{...props}
		>
			<RiArrowDownSLine />
		</SelectPrimitive.ScrollDownArrow>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};

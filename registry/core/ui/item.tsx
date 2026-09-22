import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Separator } from "@/registry/core/ui/separator";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: an item group exposes the list role over arbitrary rows
		<div
			role="list"
			data-slot="item-group"
			className={cn(
				"cn-item-group group/item-group flex w-full flex-col",
				className,
			)}
			{...props}
		/>
	);
}

function ItemSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="item-separator"
			orientation="horizontal"
			className={cn("cn-item-separator", className)}
			{...props}
		/>
	);
}

const itemVariants = cva(
	"cn-item group/item flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors",
	{
		variants: {
			variant: {
				default: "cn-item-variant-default",
				outline: "cn-item-variant-outline",
				muted: "cn-item-variant-muted",
				overview: "cn-item-variant-overview",
			},
			size: {
				default: "cn-item-size-default",
				sm: "cn-item-size-sm",
				xs: "cn-item-size-xs",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Item({
	className,
	variant = "default",
	size = "default",
	render,
	...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps<"div">(
			{
				className: cn(itemVariants({ variant, size, className })),
			},
			props,
		),
		render,
		state: {
			slot: "item",
			variant,
			size,
		},
	});
}

const itemMediaVariants = cva(
	"cn-item-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "cn-item-media-variant-default",
				icon: "cn-item-media-variant-icon",
				image: "cn-item-media-variant-image",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function ItemMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
	return (
		<div
			data-slot="item-media"
			data-variant={variant}
			className={cn(itemMediaVariants({ variant, className }))}
			{...props}
		/>
	);
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-content"
			className={cn(
				"cn-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
				className,
			)}
			{...props}
		/>
	);
}

function ItemRow({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-row"
			className={cn("cn-item-row flex w-full items-center", className)}
			{...props}
		/>
	);
}

function ItemLabel({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-label"
			className={cn(
				"cn-item-label flex min-w-0 flex-1 items-center",
				className,
			)}
			{...props}
		/>
	);
}

function ItemBadges({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-badges"
			className={cn("cn-item-badges flex shrink-0 items-center", className)}
			{...props}
		/>
	);
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-title"
			className={cn(
				"cn-item-title line-clamp-1 flex w-fit items-center",
				className,
			)}
			{...props}
		/>
	);
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			data-slot="item-description"
			className={cn(
				"cn-item-description line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
				className,
			)}
			{...props}
		/>
	);
}

const itemValueVariants = cva("cn-item-value shrink-0", {
	variants: {
		tone: {
			default: "cn-item-value-tone-default",
			success: "cn-item-value-tone-success",
			destructive: "cn-item-value-tone-destructive",
		},
	},
	defaultVariants: {
		tone: "default",
	},
});

function ItemValue({
	className,
	tone = "default",
	...props
}: React.ComponentProps<"span"> & VariantProps<typeof itemValueVariants>) {
	return (
		<span
			data-slot="item-value"
			data-tone={tone}
			className={cn(itemValueVariants({ tone, className }))}
			{...props}
		/>
	);
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-actions"
			className={cn("cn-item-actions flex items-center", className)}
			{...props}
		/>
	);
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-header"
			className={cn(
				"cn-item-header flex basis-full items-center justify-between",
				className,
			)}
			{...props}
		/>
	);
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="item-footer"
			className={cn(
				"cn-item-footer flex basis-full items-center justify-between",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Item,
	ItemActions,
	ItemBadges,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemLabel,
	ItemMedia,
	ItemRow,
	ItemSeparator,
	ItemTitle,
	ItemValue,
};

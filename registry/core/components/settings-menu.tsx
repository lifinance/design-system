import {
	RiArrowLeftLine,
	RiArrowRightSLine,
	RiInformationLine,
} from "@remixicon/react";
import type * as React from "react";

import { cn } from "@/registry/core/lib/utils";
import { Button } from "@/registry/core/ui/button";
import { Label } from "@/registry/core/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/core/ui/popover";
import { RadioGroupItem } from "@/registry/core/ui/radio-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/core/ui/tooltip";

function SettingsMenu({ ...props }: React.ComponentProps<typeof Popover>) {
	return <Popover data-slot="settings-menu" {...props} />;
}

function SettingsMenuTrigger({
	...props
}: React.ComponentProps<typeof PopoverTrigger>) {
	return <PopoverTrigger data-slot="settings-menu-trigger" {...props} />;
}

function SettingsMenuContent({
	"aria-label": ariaLabel = "Settings",
	className,
	...props
}: React.ComponentProps<typeof PopoverContent>) {
	return (
		<PopoverContent
			data-slot="settings-menu-content"
			aria-label={ariaLabel}
			className={cn("cn-settings-menu-content", className)}
			{...props}
		/>
	);
}

/** Viewport for the sliding swap between the menu and a detail panel. */
function SettingsMenuPanels({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="settings-menu-panels"
			className={cn("cn-settings-menu-viewport", className)}
			{...props}
		/>
	);
}

function SettingsMenuPanel({
	active,
	slide,
	className,
	...props
}: React.ComponentProps<"div"> & {
	/** The inactive panel collapses out of flow and fades out. */
	active: boolean;
	/** Which edge the panel slides toward while inactive. */
	slide: "start" | "end";
}) {
	return (
		<div
			data-slot="settings-menu-panel"
			data-hidden={active ? undefined : ""}
			data-slide={slide}
			aria-hidden={active ? undefined : true}
			className={cn("cn-settings-menu-panel", className)}
			{...props}
		/>
	);
}

function SettingsMenuList({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="settings-menu-list"
			className={cn("cn-settings-menu-list", className)}
			{...props}
		/>
	);
}

/** Row that opens a setting's detail panel and shows its current value. A
 * tooltip attaches to the row itself, because a trigger cannot nest in a
 * button. */
function SettingsMenuItem({
	label,
	tooltip,
	value,
	className,
	...props
}: Omit<React.ComponentProps<"button">, "children" | "value" | "ref"> & {
	label: React.ReactNode;
	tooltip?: React.ReactNode;
	/** Current value readout ahead of the chevron. */
	value?: React.ReactNode;
}) {
	const children = (
		<>
			<span className="cn-settings-menu-item-label">
				<span>{label}</span>
				{tooltip ? <RiInformationLine aria-hidden className="size-4" /> : null}
			</span>
			<span className="cn-settings-menu-item-value">
				{value != null ? <span className="truncate">{value}</span> : null}
				<RiArrowRightSLine
					aria-hidden
					className="size-5 shrink-0 text-muted-foreground"
				/>
			</span>
		</>
	);
	const rowClassName = cn("cn-settings-menu-item", className);

	if (!tooltip) {
		return (
			<button
				type="button"
				data-slot="settings-menu-item"
				className={rowClassName}
				{...props}
			>
				{children}
			</button>
		);
	}

	return (
		<Tooltip>
			<TooltipTrigger
				render={<button type="button" />}
				data-slot="settings-menu-item"
				className={rowClassName}
				{...props}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
}

/** Detail-panel header: back button and a centered title. */
function SettingsMenuHeader({
	onBack,
	backLabel = "Back",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	onBack: () => void;
	backLabel?: string;
}) {
	return (
		<div
			data-slot="settings-menu-header"
			className={cn("cn-settings-menu-header", className)}
			{...props}
		>
			<Button
				type="button"
				variant="outline"
				size="icon"
				className="cn-settings-menu-back"
				aria-label={backLabel}
				onClick={onBack}
			>
				<RiArrowLeftLine />
			</Button>
			<p className="cn-settings-menu-title">{children}</p>
			<span />
		</div>
	);
}

/** One choice in a setting's detail panel. The label wraps the radio, so the
 * whole row selects it. */
function SettingsMenuOption({
	value,
	label,
	className,
	...props
}: Omit<React.ComponentProps<typeof Label>, "children"> & {
	value: string;
	label: React.ReactNode;
}) {
	return (
		<Label
			data-slot="settings-menu-option"
			className={cn("cn-settings-menu-option", className)}
			{...props}
		>
			<span className="cn-settings-menu-option-label">{label}</span>
			<RadioGroupItem value={value} />
		</Label>
	);
}

export {
	SettingsMenu,
	SettingsMenuContent,
	SettingsMenuHeader,
	SettingsMenuItem,
	SettingsMenuList,
	SettingsMenuOption,
	SettingsMenuPanel,
	SettingsMenuPanels,
	SettingsMenuTrigger,
};

import figma from "@figma/code-connect";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/registry/core/ui/navigation-menu";

const NAVIGATION_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-764";
const NAVIGATION_MENU_POPOVER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-714";
const NAVIGATION_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-551";
const NAVIGATION_MENU_LINK_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-566";

figma.connect(NavigationMenu, NAVIGATION_MENU_URL, {
	props: {
		items: figma.children("*"),
	},
	example: ({ items }) => (
		<NavigationMenu aria-label="Main">
			<NavigationMenuList>{items}</NavigationMenuList>
		</NavigationMenu>
	),
});

figma.connect(NavigationMenuContent, NAVIGATION_MENU_POPOVER_URL, {
	props: {
		column: figma.slot("Col"),
		columnOne: figma.slot("Col 1"),
		columnTwo: figma.slot("Col 2"),
		layout: figma.enum("Layout", {
			"One Column": "one-column",
			"Two column": "two-column",
		}),
	},
	example: ({ column, columnOne, columnTwo }) => (
		<NavigationMenuContent>
			<ul className="grid w-[420px] gap-2 md:grid-cols-2">
				{column}
				{columnOne}
				{columnTwo}
			</ul>
		</NavigationMenuContent>
	),
});

figma.connect(NavigationMenuTrigger, NAVIGATION_MENU_ITEM_URL, {
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		icon: figma.boolean("Icon", {
			true: figma.instance("↳ Icon"),
			false: undefined,
		}),
	},
	example: ({ label, disabled, icon }) => (
		<NavigationMenuItem>
			<NavigationMenuTrigger disabled={disabled}>
				{icon}
				{label}
			</NavigationMenuTrigger>
		</NavigationMenuItem>
	),
});

figma.connect(NavigationMenuLink, NAVIGATION_MENU_LINK_URL, {
	variant: { Type: "Simple" },
	props: {
		label: figma.string("↳ Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		icon: figma.boolean("Icon", {
			true: figma.instance("↳ Icon"),
			false: undefined,
		}),
	},
	example: ({ label, disabled, icon }) => (
		<NavigationMenuLink
			// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
			// biome-ignore lint/a11y/useValidAnchor: placeholder href for the Code Connect example
			render={<a href="#" />}
			aria-disabled={disabled}
		>
			{icon}
			{label}
		</NavigationMenuLink>
	),
});

figma.connect(NavigationMenuLink, NAVIGATION_MENU_LINK_URL, {
	variant: { Type: "Description" },
	props: {
		label: figma.string("↳ Label"),
		description: figma.string("Description"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		icon: figma.boolean("Icon", {
			true: figma.instance("↳ Icon"),
			false: undefined,
		}),
	},
	example: ({ label, description, disabled, icon }) => (
		<NavigationMenuLink
			// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
			// biome-ignore lint/a11y/useValidAnchor: placeholder href for the Code Connect example
			render={<a href="#" />}
			className="flex-col items-start gap-1"
			aria-disabled={disabled}
		>
			<div className="flex items-center gap-2 font-medium">
				{icon}
				{label}
			</div>
			<span className="line-clamp-2 text-muted-foreground">{description}</span>
		</NavigationMenuLink>
	),
});

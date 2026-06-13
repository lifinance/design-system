import figma from "@figma/code-connect";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/registry/core/ui/sidebar";

const SIDEBAR_MENU_BUTTON_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6870-3940";
const SIDEBAR_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6877-3211";
const SIDEBAR_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6885-3412";
const SIDEBAR_GROUP_LABEL_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6878-884";

figma.connect(SidebarMenuButton, SIDEBAR_MENU_BUTTON_URL, {
	props: {
		isActive: figma.enum("State", {
			Active: true,
		}),
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: figma.instance("↳ Left icon"),
			false: undefined,
		}),
		badge: figma.boolean("Badge", {
			true: <SidebarMenuBadge>3</SidebarMenuBadge>,
			false: undefined,
		}),
	},
	example: ({ isActive, label, leftIcon, badge }) => (
		<SidebarMenuItem>
			<SidebarMenuButton isActive={isActive}>
				{leftIcon}
				<span>{label}</span>
			</SidebarMenuButton>
			{badge}
		</SidebarMenuItem>
	),
});

figma.connect(SidebarMenuItem, SIDEBAR_MENU_ITEM_URL, {
	variant: { "Sub menu": "True" },
	props: {
		button: figma.children(".Sidebar Menu Button"),
	},
	example: ({ button }) => (
		<SidebarMenuItem>
			{button}
			<SidebarMenuSub>
				<SidebarMenuSubItem>
					<SidebarMenuSubButton href="#">Sub item</SidebarMenuSubButton>
				</SidebarMenuSubItem>
			</SidebarMenuSub>
		</SidebarMenuItem>
	),
});

figma.connect(SidebarMenuItem, SIDEBAR_MENU_ITEM_URL, {
	variant: { "Sub menu": "False" },
	props: {
		button: figma.children(".Sidebar Menu Button"),
	},
	example: ({ button }) => <SidebarMenuItem>{button}</SidebarMenuItem>,
});

figma.connect(SidebarGroup, SIDEBAR_GROUP_URL, {
	props: {
		label: figma.boolean("Group title", {
			true: <SidebarGroupLabel>Group label</SidebarGroupLabel>,
			false: undefined,
		}),
		menu: figma.slot("Slot"),
	},
	example: ({ label, menu }) => (
		<SidebarGroup>
			{label}
			<SidebarGroupContent>
				<SidebarMenu>{menu}</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	),
});

figma.connect(SidebarGroupLabel, SIDEBAR_GROUP_LABEL_URL, {
	props: {
		label: figma.string("Group label"),
		rightIcon: figma.boolean("Right icon", {
			true: figma.instance("↳ Right icon"),
			false: undefined,
		}),
	},
	example: ({ label, rightIcon }) => (
		<SidebarGroupLabel>
			{label}
			{rightIcon}
		</SidebarGroupLabel>
	),
});

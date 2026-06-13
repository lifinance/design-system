import figma from "@figma/code-connect";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/registry/core/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/registry/core/ui/dropdown-menu";

const DROPDOWN_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=4-6588";
const DROPDOWN_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6836-13139";
const DROPDOWN_MENU_TRIGGER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-34404";

figma.connect(DropdownMenu, DROPDOWN_MENU_URL, {
	props: {
		section1: figma.slot("Section 01"),
		section2: figma.slot("Section 02"),
		section3: figma.slot("Section 03"),
		section4: figma.slot("Section 04"),
		section5: figma.slot("Section 05"),
	},
	example: ({ section1, section2, section3, section4, section5 }) => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open menu
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{section1}
				{section2}
				{section3}
				{section4}
				{section5}
			</DropdownMenuContent>
		</DropdownMenu>
	),
});

figma.connect(DropdownMenuTrigger, DROPDOWN_MENU_TRIGGER_URL, {
	props: {
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: figma.instance("↳ Left icon"),
			false: undefined,
		}),
		rightIcon: figma.boolean("Right icon", {
			true: figma.instance("↳ Right Icon"),
			false: <ChevronDownIcon />,
		}),
	},
	example: ({ label, leftIcon, rightIcon }) => (
		<DropdownMenuTrigger render={<Button variant="outline" />}>
			{leftIcon}
			{label}
			{rightIcon}
		</DropdownMenuTrigger>
	),
});

figma.connect(DropdownMenuItem, DROPDOWN_MENU_ITEM_URL, {
	variant: { Variant: "Default", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		shortcut: figma.boolean("Shortcut", {
			true: (
				<DropdownMenuShortcut>
					{figma.string("↳ Shortcut")}
				</DropdownMenuShortcut>
			),
			false: undefined,
		}),
	},
	example: ({ label, disabled, shortcut }) => (
		<DropdownMenuItem disabled={disabled}>
			{label}
			{shortcut}
		</DropdownMenuItem>
	),
});

figma.connect(DropdownMenuItem, DROPDOWN_MENU_ITEM_URL, {
	variant: { Variant: "Icon", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<DropdownMenuItem disabled={disabled}>{label}</DropdownMenuItem>
	),
});

figma.connect(DropdownMenuCheckboxItem, DROPDOWN_MENU_ITEM_URL, {
	variant: { Variant: "Checked" },
	props: {
		label: figma.string("Label"),
		checked: figma.boolean("Selected"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, checked, disabled }) => (
		<DropdownMenuCheckboxItem checked={checked} disabled={disabled}>
			{label}
		</DropdownMenuCheckboxItem>
	),
});

figma.connect(DropdownMenuRadioItem, DROPDOWN_MENU_ITEM_URL, {
	variant: { Variant: "Radio" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<DropdownMenuRadioGroup value={label}>
			<DropdownMenuRadioItem value={label} disabled={disabled}>
				{label}
			</DropdownMenuRadioItem>
		</DropdownMenuRadioGroup>
	),
});

figma.connect(DropdownMenuSubTrigger, DROPDOWN_MENU_ITEM_URL, {
	variant: { SubTrigger: "True" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger disabled={disabled}>
				{label}
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				<DropdownMenuItem>Email</DropdownMenuItem>
				<DropdownMenuItem>Message</DropdownMenuItem>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	),
});

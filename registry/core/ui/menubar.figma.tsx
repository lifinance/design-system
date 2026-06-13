import figma from "@figma/code-connect";

import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarShortcut,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/registry/core/ui/menubar";

const MENUBAR_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=8-325";
const MENUBAR_TRIGGER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=8-314";
const MENUBAR_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6837-16041";
const MENUBAR_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6837-15688";
const MENUBAR_MENU_TITLE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6837-16055";

figma.connect(Menubar, MENUBAR_URL, {
	example: () => (
		<Menubar aria-label="Application">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>New tab</MenubarItem>
					<MenubarItem>New window</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Undo</MenubarItem>
					<MenubarItem>Redo</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	),
});

figma.connect(MenubarTrigger, MENUBAR_TRIGGER_URL, {
	props: {
		label: figma.string("Label"),
	},
	example: ({ label }) => <MenubarTrigger>{label}</MenubarTrigger>,
});

figma.connect(MenubarContent, MENUBAR_MENU_URL, {
	props: {
		section1: figma.slot("Section 01"),
		section2: figma.slot("Section 02"),
		section3: figma.slot("Section 03"),
		section4: figma.slot("Section 04"),
		section5: figma.slot("Section 05"),
	},
	example: ({ section1, section2, section3, section4, section5 }) => (
		<MenubarContent>
			{section1}
			{section2}
			{section3}
			{section4}
			{section5}
		</MenubarContent>
	),
});

figma.connect(MenubarItem, MENUBAR_MENU_ITEM_URL, {
	variant: { Variant: "Default", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		shortcut: figma.boolean("Shortcut", {
			true: <MenubarShortcut>{figma.string("↳ Shortcut")}</MenubarShortcut>,
			false: undefined,
		}),
	},
	example: ({ label, disabled, shortcut }) => (
		<MenubarItem disabled={disabled}>
			{label}
			{shortcut}
		</MenubarItem>
	),
});

figma.connect(MenubarCheckboxItem, MENUBAR_MENU_ITEM_URL, {
	variant: { Variant: "Checked" },
	props: {
		label: figma.string("Label"),
		checked: figma.boolean("Selected"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, checked, disabled }) => (
		<MenubarCheckboxItem checked={checked} disabled={disabled}>
			{label}
		</MenubarCheckboxItem>
	),
});

figma.connect(MenubarRadioItem, MENUBAR_MENU_ITEM_URL, {
	variant: { Variant: "Radio" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<MenubarRadioGroup value={label}>
			<MenubarRadioItem value={label} disabled={disabled}>
				{label}
			</MenubarRadioItem>
		</MenubarRadioGroup>
	),
});

figma.connect(MenubarSubTrigger, MENUBAR_MENU_ITEM_URL, {
	variant: { SubTrigger: "True" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<MenubarSubTrigger disabled={disabled}>{label}</MenubarSubTrigger>
	),
});

figma.connect(MenubarLabel, MENUBAR_MENU_TITLE_URL, {
	example: () => <MenubarLabel>Menu title</MenubarLabel>,
});

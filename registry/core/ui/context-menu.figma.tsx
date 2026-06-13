import figma from "@figma/code-connect";

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuShortcut,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/registry/core/ui/context-menu";

const CONTEXT_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2761-23066";
const CONTEXT_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6816-4130";
const CONTEXT_MENU_GROUP_LABEL_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6816-5679";

figma.connect(ContextMenu, CONTEXT_MENU_URL, {
	props: {
		section1: figma.slot("Section 01"),
		section2: figma.slot("Section 02"),
		section3: figma.slot("Section 03"),
		section4: figma.slot("Section 4"),
		section5: figma.slot("Section 5"),
	},
	example: ({ section1, section2, section3, section4, section5 }) => (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
				Right click here
			</ContextMenuTrigger>
			<ContextMenuContent>
				{section1}
				{section2}
				{section3}
				{section4}
				{section5}
			</ContextMenuContent>
		</ContextMenu>
	),
});

figma.connect(ContextMenuItem, CONTEXT_MENU_ITEM_URL, {
	variant: { Variant: "Default", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		shortcut: figma.boolean("Shortcut", {
			true: figma.string("↳ Shortcut"),
			false: undefined,
		}),
	},
	example: ({ label, disabled, shortcut }) => (
		<ContextMenuItem disabled={disabled}>
			{label}
			<ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
		</ContextMenuItem>
	),
});

figma.connect(ContextMenuSubTrigger, CONTEXT_MENU_ITEM_URL, {
	variant: { SubTrigger: "True" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<ContextMenuSubTrigger disabled={disabled}>{label}</ContextMenuSubTrigger>
	),
});

figma.connect(ContextMenuCheckboxItem, CONTEXT_MENU_ITEM_URL, {
	variant: { Variant: "Checked", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<ContextMenuCheckboxItem defaultChecked disabled={disabled}>
			{label}
		</ContextMenuCheckboxItem>
	),
});

figma.connect(ContextMenuRadioItem, CONTEXT_MENU_ITEM_URL, {
	variant: { Variant: "Radio", SubTrigger: "False" },
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<ContextMenuRadioGroup defaultValue="value">
			<ContextMenuRadioItem value="value" disabled={disabled}>
				{label}
			</ContextMenuRadioItem>
		</ContextMenuRadioGroup>
	),
});

figma.connect(ContextMenuLabel, CONTEXT_MENU_GROUP_LABEL_URL, {
	example: () => (
		<ContextMenuGroup>
			<ContextMenuLabel>Section</ContextMenuLabel>
		</ContextMenuGroup>
	),
});

import figma from "@figma/code-connect";
import { GlobeIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/core/ui/avatar";
import { Button } from "@/registry/core/ui/button";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxTrigger,
	ComboboxValue,
} from "@/registry/core/ui/combobox";

const COMBOBOX_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=153-2576";
const COMBOBOX_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6762-2723";
const COMBOBOX_MENU_LABEL_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6816-4911";
const COMBOBOX_SEARCH_FIELD_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6816-5694";

figma.connect(Combobox, COMBOBOX_MENU_URL, {
	props: {
		search: figma.boolean("Show search", {
			true: <ComboboxInput showTrigger={false} placeholder="Search" />,
			false: undefined,
		}),
		group1: figma.slot("List group 1"),
		group2: figma.slot("List group 2"),
		group3: figma.slot("List group 3"),
	},
	example: ({ search, group1, group2, group3 }) => (
		<Combobox>
			<ComboboxTrigger render={<Button variant="outline" />}>
				<ComboboxValue placeholder="Select an option" />
			</ComboboxTrigger>
			<ComboboxContent>
				{search}
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{group1}
					{group2}
					{group3}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	),
});

figma.connect(ComboboxItem, COMBOBOX_MENU_ITEM_URL, {
	variant: { Type: "Simple" },
	example: () => <ComboboxItem value="Option">Option</ComboboxItem>,
});

figma.connect(ComboboxItem, COMBOBOX_MENU_ITEM_URL, {
	variant: { Type: "Icon" },
	example: () => (
		<ComboboxItem value="Option">
			<GlobeIcon />
			Option
		</ComboboxItem>
	),
});

figma.connect(ComboboxItem, COMBOBOX_MENU_ITEM_URL, {
	variant: { Type: "Avatar" },
	example: () => (
		<ComboboxItem value="Option">
			<Avatar size="sm">
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			Option
		</ComboboxItem>
	),
});

figma.connect(ComboboxLabel, COMBOBOX_MENU_LABEL_URL, {
	example: () => <ComboboxLabel>Menu label</ComboboxLabel>,
});

figma.connect(ComboboxInput, COMBOBOX_SEARCH_FIELD_URL, {
	example: () => (
		<ComboboxInput showTrigger={false} placeholder="Search framework..." />
	),
});

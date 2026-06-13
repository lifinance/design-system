import figma from "@figma/code-connect";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/core/ui/select";

const SELECT_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2738-3406";
const SELECT_MENU_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=4-6163";
const SELECT_MENU_LABEL_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6732-5427";
const SELECT_MENU_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-2034";

figma.connect(Select, SELECT_URL, {
	props: {
		placeholder: figma.string("Placeholder"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ placeholder, disabled }) => (
		<Select disabled={disabled}>
			<SelectTrigger aria-label={placeholder}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent aria-label={placeholder}>
				<SelectGroup>
					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
});

figma.connect(SelectContent, SELECT_MENU_URL, {
	props: {
		section1: figma.slot("Section 01"),
		section2: figma.slot("Section 02"),
		section3: figma.slot("Section 03"),
	},
	example: ({ section1, section2, section3 }) => (
		<SelectContent aria-label="Options">
			{section1}
			{section2}
			{section3}
		</SelectContent>
	),
});

figma.connect(SelectItem, SELECT_MENU_ITEM_URL, {
	props: {
		label: figma.string("Label"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, disabled }) => (
		<SelectItem value={label} disabled={disabled}>
			{label}
		</SelectItem>
	),
});

figma.connect(SelectLabel, SELECT_MENU_LABEL_URL, {
	props: {
		label: figma.string("Label"),
	},
	example: ({ label }) => <SelectLabel>{label}</SelectLabel>,
});

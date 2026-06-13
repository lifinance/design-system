import figma from "@figma/code-connect";

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/registry/core/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/core/ui/radio-group";

const RADIO_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2780-51105";
const RADIO_GROUP_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2780-51001";

figma.connect(RadioGroup, RADIO_GROUP_URL, {
	props: {
		items: figma.slot("Slot"),
	},
	example: ({ items }) => <RadioGroup>{items}</RadioGroup>,
});

figma.connect(RadioGroupItem, RADIO_GROUP_ITEM_URL, {
	variant: { Type: "Default" },
	props: {
		disabled: figma.enum("Disabled", {
			True: true,
		}),
		invalid: figma.enum("Error", {
			True: true,
		}),
		label: figma.string("↳ Label"),
	},
	example: ({ disabled, invalid, label }) => (
		<Field orientation="horizontal">
			<RadioGroupItem
				value="radio"
				id="radio"
				disabled={disabled}
				aria-invalid={invalid}
			/>
			<FieldLabel htmlFor="radio" className="font-normal">
				{label}
			</FieldLabel>
		</Field>
	),
});

figma.connect(RadioGroupItem, RADIO_GROUP_ITEM_URL, {
	variant: { Type: "Card" },
	props: {
		disabled: figma.enum("Disabled", {
			True: true,
		}),
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ disabled, label, description }) => (
		<FieldLabel htmlFor="radio-card">
			<Field orientation="horizontal">
				<FieldContent>
					<FieldTitle>{label}</FieldTitle>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
				<RadioGroupItem value="radio" id="radio-card" disabled={disabled} />
			</Field>
		</FieldLabel>
	),
});

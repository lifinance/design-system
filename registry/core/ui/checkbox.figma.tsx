import figma from "@figma/code-connect";

import { Checkbox } from "@/registry/core/ui/checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "@/registry/core/ui/field";

const CHECKBOX_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=1-117";
const CHECKBOX_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2744-7656";

figma.connect(Checkbox, CHECKBOX_URL, {
	variant: { Type: "Default" },
	props: {
		checked: figma.enum("Checked", {
			True: true,
		}),
		disabled: figma.enum("Disabled", {
			True: true,
		}),
		invalid: figma.enum("Destructive", {
			True: true,
		}),
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ checked, disabled, invalid, label, description }) => (
		<Field orientation="horizontal">
			<Checkbox
				id="checkbox"
				defaultChecked={checked}
				disabled={disabled}
				aria-invalid={invalid}
			/>
			<FieldContent>
				<FieldLabel htmlFor="checkbox">{label}</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
		</Field>
	),
});

figma.connect(Checkbox, CHECKBOX_URL, {
	variant: { Type: "Card" },
	props: {
		checked: figma.enum("Checked", {
			True: true,
		}),
		disabled: figma.enum("Disabled", {
			True: true,
		}),
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ checked, disabled, label, description }) => (
		<FieldLabel htmlFor="checkbox-card">
			<Field orientation="horizontal">
				<Checkbox
					id="checkbox-card"
					defaultChecked={checked}
					disabled={disabled}
				/>
				<FieldContent>
					<FieldTitle>{label}</FieldTitle>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
			</Field>
		</FieldLabel>
	),
});

figma.connect(FieldSet, CHECKBOX_GROUP_URL, {
	props: {
		checkboxes: figma.slot("Slot"),
	},
	example: ({ checkboxes }) => (
		<FieldSet>
			<FieldLegend variant="label">Notifications</FieldLegend>
			<FieldGroup>{checkboxes}</FieldGroup>
		</FieldSet>
	),
});

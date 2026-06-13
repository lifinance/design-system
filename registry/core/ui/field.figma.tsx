import figma from "@figma/code-connect";

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/registry/core/ui/field";

const FIELD_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33541-69574";
const FIELD_LEGEND_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33541-69635";
const FIELDSET_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33541-69640";

figma.connect(Field, FIELD_URL, {
	variant: { Display: "Desc last" },
	props: {
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
		control: figma.instance("Input type"),
		invalid: figma.enum("Data invalid", {
			True: true,
		}),
	},
	example: ({ label, description, control, invalid }) => (
		<Field data-invalid={invalid}>
			<FieldLabel htmlFor="field">{label}</FieldLabel>
			{control}
			<FieldDescription>{description}</FieldDescription>
		</Field>
	),
});

figma.connect(Field, FIELD_URL, {
	variant: { Display: "Desc second" },
	props: {
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
		control: figma.instance("Input type"),
		invalid: figma.enum("Data invalid", {
			True: true,
		}),
	},
	example: ({ label, description, control, invalid }) => (
		<Field data-invalid={invalid}>
			<FieldLabel htmlFor="field">{label}</FieldLabel>
			<FieldDescription>{description}</FieldDescription>
			{control}
		</Field>
	),
});

figma.connect(Field, FIELD_URL, {
	variant: { Display: "Horizontal" },
	props: {
		label: figma.string("↳ Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
		control: figma.instance("Input type"),
		invalid: figma.enum("Data invalid", {
			True: true,
		}),
	},
	example: ({ label, description, control, invalid }) => (
		<Field orientation="horizontal" data-invalid={invalid}>
			{control}
			<FieldContent>
				<FieldLabel htmlFor="field">{label}</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
		</Field>
	),
});

figma.connect(FieldLegend, FIELD_LEGEND_URL, {
	props: {
		variant: figma.enum("Type", {
			Label: "label",
		}),
		legend: figma.string("Legend"),
	},
	example: ({ variant, legend }) => (
		<FieldLegend variant={variant}>{legend}</FieldLegend>
	),
});

figma.connect(FieldSet, FIELDSET_URL, {
	props: {
		fields: figma.slot("Slot"),
	},
	example: ({ fields }) => <FieldSet>{fields}</FieldSet>,
});

import figma from "@figma/code-connect";

import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@/registry/core/ui/field";
import { Switch } from "@/registry/core/ui/switch";

const SWITCH_TOGGLE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=9-338";
const SWITCH_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2769-29914";

figma.connect(Switch, SWITCH_TOGGLE_URL, {
	props: {
		checked: figma.enum("Toggled", {
			True: true,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ checked, disabled }) => (
		<Switch
			aria-label="Airplane mode"
			defaultChecked={checked}
			disabled={disabled}
		/>
	),
});

figma.connect(Switch, SWITCH_URL, {
	variant: { Type: "Default" },
	props: {
		checked: figma.enum("Toggled", {
			True: true,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		label: figma.string("Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ checked, disabled, label, description }) => (
		<Field orientation="horizontal">
			<FieldContent>
				<FieldLabel htmlFor="switch">{label}</FieldLabel>
				<FieldDescription>{description}</FieldDescription>
			</FieldContent>
			<Switch id="switch" defaultChecked={checked} disabled={disabled} />
		</Field>
	),
});

figma.connect(Switch, SWITCH_URL, {
	variant: { Type: "Card" },
	props: {
		checked: figma.enum("Toggled", {
			True: true,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		label: figma.string("Label"),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ checked, disabled, label, description }) => (
		<FieldLabel htmlFor="switch-card" className="w-80">
			<Field orientation="horizontal">
				<FieldContent>
					<FieldTitle>{label}</FieldTitle>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
				<Switch id="switch-card" defaultChecked={checked} disabled={disabled} />
			</Field>
		</FieldLabel>
	),
});

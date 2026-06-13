import figma from "@figma/code-connect";
import { BoldIcon } from "lucide-react";

import { Toggle } from "@/registry/core/ui/toggle";

const TOGGLE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2768-28168";

figma.connect(Toggle, TOGGLE_URL, {
	props: {
		variant: figma.enum("Outlined", {
			True: "outline",
			False: "default",
		}),
		size: figma.enum("Size", {
			Default: "default",
			Small: "sm",
			Large: "lg",
		}),
		pressed: figma.enum("Pressed", {
			True: true,
			False: false,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		icon: figma.boolean("Icon", {
			true: <BoldIcon />,
			false: undefined,
		}),
		label: figma.boolean("Label", {
			true: figma.string("↳ Label"),
			false: undefined,
		}),
	},
	example: ({ variant, size, pressed, disabled, icon, label }) => (
		<Toggle
			aria-label="Toggle bold"
			variant={variant}
			size={size}
			defaultPressed={pressed}
			disabled={disabled}
		>
			{icon}
			{label}
		</Toggle>
	),
});

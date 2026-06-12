import figma from "@figma/code-connect";

import { Input } from "@/registry/core/ui/input";

figma.connect(
	Input,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2732-15509",
	{
		props: {
			type: figma.enum("Type", {
				File: "file",
				Password: "password",
			}),
			placeholder: figma.string("Placeholder text"),
			disabled: figma.enum("State", {
				Disabled: true,
			}),
			invalid: figma.enum("Error", {
				True: true,
			}),
		},
		example: ({ type, placeholder, disabled, invalid }) => (
			<Input
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				aria-invalid={invalid}
			/>
		),
	},
);

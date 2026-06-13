import figma from "@figma/code-connect";

import { Textarea } from "@/registry/core/ui/textarea";

const TEXTAREA_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2807-10440";

figma.connect(Textarea, TEXTAREA_URL, {
	props: {
		content: figma.string("Content"),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
		invalid: figma.enum("State", {
			Error: true,
			"Error Focus": true,
		}),
	},
	example: ({ content, disabled, invalid }) => (
		<Textarea
			defaultValue={content}
			disabled={disabled}
			aria-invalid={invalid}
		/>
	),
});

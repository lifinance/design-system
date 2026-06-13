import figma from "@figma/code-connect";

import { Kbd, KbdGroup } from "@/registry/core/ui/kbd";

const KBD_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-42968";
const KBD_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-42982";

figma.connect(Kbd, KBD_URL, {
	variant: { Style: "Default" },
	props: {
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: figma.instance("↳ Left icon"),
			false: undefined,
		}),
		rightIcon: figma.boolean("Right icon", {
			true: figma.instance("↳ Right icon"),
			false: undefined,
		}),
	},
	example: ({ label, leftIcon, rightIcon }) => (
		<Kbd>
			{leftIcon}
			{label}
			{rightIcon}
		</Kbd>
	),
});

figma.connect(Kbd, KBD_URL, {
	variant: { Style: "Reversed" },
	props: {
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: figma.instance("↳ Left icon"),
			false: undefined,
		}),
		rightIcon: figma.boolean("Right icon", {
			true: figma.instance("↳ Right icon"),
			false: undefined,
		}),
	},
	example: ({ label, leftIcon, rightIcon }) => (
		<Kbd>
			{rightIcon}
			{label}
			{leftIcon}
		</Kbd>
	),
});

figma.connect(KbdGroup, KBD_GROUP_URL, {
	props: {
		keys: figma.children("*"),
	},
	example: ({ keys }) => <KbdGroup>{keys}</KbdGroup>,
});

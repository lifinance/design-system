import figma from "@figma/code-connect";
import { PlusIcon } from "lucide-react";

import { Button } from "@/registry/core/ui/button";

figma.connect(
	Button,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6716-46634",
	{
		props: {
			variant: figma.enum("Type", {
				Outline: "outline",
				Secondary: "secondary",
				Ghost: "ghost",
				Link: "link",
				Destructive: "destructive",
			}),
			size: figma.enum("Size", {
				"Extra Small": "xs",
				Small: "sm",
				Large: "lg",
				"Icon Extra Small": "icon-xs",
				"Icon Small": "icon-sm",
				Icon: "icon",
				"Icon Large": "icon-lg",
			}),
			disabled: figma.enum("State", {
				Disabled: true,
			}),
			label: figma.string("Label"),
			leftIcon: figma.boolean("Left icon", {
				true: <PlusIcon data-icon="inline-start" />,
				false: undefined,
			}),
			rightIcon: figma.boolean("Right icon", {
				true: <PlusIcon data-icon="inline-end" />,
				false: undefined,
			}),
		},
		example: ({ variant, size, disabled, label, leftIcon, rightIcon }) => (
			<Button variant={variant} size={size} disabled={disabled}>
				{leftIcon}
				{label}
				{rightIcon}
			</Button>
		),
	},
);

import figma from "@figma/code-connect";
import { BadgeCheckIcon } from "lucide-react";

import { Badge } from "@/registry/core/ui/badge";

const BADGE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=136-1178";

figma.connect(Badge, BADGE_URL, {
	variant: { Number: "False" },
	props: {
		variant: figma.enum("Type", {
			Secondary: "secondary",
			Outline: "outline",
			Destructive: "destructive",
		}),
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: <BadgeCheckIcon />,
			false: undefined,
		}),
	},
	example: ({ variant, label, leftIcon }) => (
		<Badge variant={variant}>
			{leftIcon}
			{label}
		</Badge>
	),
});

figma.connect(Badge, BADGE_URL, {
	variant: { Number: "True" },
	props: {
		variant: figma.enum("Type", {
			Secondary: "secondary",
			Outline: "outline",
			Destructive: "destructive",
		}),
		value: figma.string("Value"),
	},
	example: ({ variant, value }) => <Badge variant={variant}>{value}</Badge>,
});

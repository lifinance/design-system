import figma from "@figma/code-connect";
import { RiVerifiedBadgeLine } from "@remixicon/react";

import { Badge } from "@/registry/core/ui/badge";

const BADGE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=136-1178";

figma.connect(Badge, BADGE_URL, {
	variant: { Number: "False" },
	props: {
		variant: figma.enum("Type", {
			Default: "default",
			Secondary: "secondary",
			Muted: "muted",
			Success: "success",
			Info: "info",
			Warning: "warning",
			Destructive: "destructive",
			Outline: "outline",
			Ghost: "ghost",
			Link: "link",
		}),
		label: figma.string("Label"),
		leftIcon: figma.boolean("Left icon", {
			true: <RiVerifiedBadgeLine />,
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
			Default: "default",
			Secondary: "secondary",
			Muted: "muted",
			Success: "success",
			Info: "info",
			Warning: "warning",
			Destructive: "destructive",
			Outline: "outline",
			Ghost: "ghost",
			Link: "link",
		}),
		value: figma.string("Value"),
	},
	example: ({ variant, value }) => <Badge variant={variant}>{value}</Badge>,
});

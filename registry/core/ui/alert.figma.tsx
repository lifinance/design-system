import figma from "@figma/code-connect";

import { Alert, AlertDescription, AlertTitle } from "@/registry/core/ui/alert";

const ALERT_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=152-2375";

figma.connect(Alert, ALERT_URL, {
	props: {
		variant: figma.enum("Type", {
			Destructive: "destructive",
		}),
		icon: figma.instance("Icon"),
		title: figma.boolean("Title", {
			true: figma.string("↳ Title"),
			false: undefined,
		}),
		description: figma.boolean("Description", {
			true: figma.string("↳ Description"),
			false: undefined,
		}),
	},
	example: ({ variant, icon, title, description }) => (
		<Alert variant={variant}>
			{icon}
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	),
});

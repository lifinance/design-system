import figma from "@figma/code-connect";

import { ToggleGroup } from "@/registry/core/ui/toggle-group";

const TOGGLE_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2769-30628";

figma.connect(ToggleGroup, TOGGLE_GROUP_URL, {
	props: {
		variant: figma.enum("Outlined", {
			True: "outline",
			False: "default",
		}),
		items: figma.slot("Slot"),
	},
	example: ({ variant, items }) => (
		<ToggleGroup aria-label="Text formatting" variant={variant}>
			{items}
		</ToggleGroup>
	),
});

import figma from "@figma/code-connect";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/core/ui/collapsible";

const COLLAPSIBLE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101081-2418";

figma.connect(Collapsible, COLLAPSIBLE_URL, {
	props: {
		trigger: figma.slot("Trigger slot"),
		content: figma.slot("Content slot"),
	},
	example: ({ trigger, content }) => (
		<Collapsible>
			<CollapsibleTrigger>{trigger}</CollapsibleTrigger>
			<CollapsibleContent>{content}</CollapsibleContent>
		</Collapsible>
	),
});

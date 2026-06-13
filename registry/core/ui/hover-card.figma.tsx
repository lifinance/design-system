import figma from "@figma/code-connect";

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/core/ui/hover-card";

const HOVER_CARD_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=4-462";

figma.connect(HoverCard, HOVER_CARD_URL, {
	props: {
		content: figma.slot("Slot"),
	},
	example: ({ content }) => (
		<HoverCard>
			<HoverCardTrigger href="#">@shadcn</HoverCardTrigger>
			<HoverCardContent>{content}</HoverCardContent>
		</HoverCard>
	),
});

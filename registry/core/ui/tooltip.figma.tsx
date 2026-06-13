import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/core/ui/tooltip";

const TOOLTIP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6873-680";

figma.connect(Tooltip, TOOLTIP_URL, {
	props: {
		side: figma.enum("Caret position", {
			Top: "top",
			Bottom: "bottom",
			Right: "right",
			Left: "left",
		}),
		label: figma.string("Label"),
	},
	example: ({ side, label }) => (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Open
			</TooltipTrigger>
			<TooltipContent side={side}>{label}</TooltipContent>
		</Tooltip>
	),
});

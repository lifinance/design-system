import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "@/registry/core/ui/popover";

const POPOVER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-888";

figma.connect(Popover, POPOVER_URL, {
	props: {
		content: figma.slot("Slot"),
	},
	example: ({ content }) => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Open popover
			</PopoverTrigger>
			<PopoverContent align="start">
				<PopoverHeader>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>
						Set the dimensions for the layer.
					</PopoverDescription>
				</PopoverHeader>
				{content}
			</PopoverContent>
		</Popover>
	),
});

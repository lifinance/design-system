import figma from "@figma/code-connect";
import {
	RiAddLine,
	RiArrowDownSLine,
	RiSearchLine,
	RiSubtractLine,
} from "@remixicon/react";

import { Button } from "@/registry/core/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/registry/core/ui/button-group";

const BUTTON_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=28685-127189";
const BUTTON_GROUP_INPUT_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=28706-128353";
const BUTTON_GROUP_SEPARATOR_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101048-6378";

figma.connect(ButtonGroup, BUTTON_GROUP_URL, {
	props: {
		orientation: figma.enum("Orientation", {
			Vertical: "vertical",
		}),
		buttons: figma.slot("Slot"),
	},
	example: ({ orientation, buttons }) => (
		<ButtonGroup orientation={orientation}>{buttons}</ButtonGroup>
	),
});

figma.connect(ButtonGroup, BUTTON_GROUP_INPUT_URL, {
	variant: { "Property 1": "Right" },
	props: {
		input: figma.children("Input"),
	},
	example: ({ input }) => (
		<ButtonGroup>
			{input}
			<Button variant="outline" size="icon" aria-label="Search">
				<RiSearchLine />
			</Button>
		</ButtonGroup>
	),
});

figma.connect(ButtonGroup, BUTTON_GROUP_INPUT_URL, {
	variant: { "Property 1": "Left" },
	props: {
		input: figma.children("Input"),
	},
	example: ({ input }) => (
		<ButtonGroup>
			<Button variant="outline">
				USD
				<RiArrowDownSLine data-icon="inline-end" />
			</Button>
			{input}
		</ButtonGroup>
	),
});

figma.connect(ButtonGroup, BUTTON_GROUP_INPUT_URL, {
	variant: { "Property 1": "Left & right" },
	props: {
		input: figma.children("Input"),
	},
	example: ({ input }) => (
		<ButtonGroup>
			<Button variant="outline" size="icon" aria-label="Decrease">
				<RiSubtractLine />
			</Button>
			{input}
			<Button variant="outline" size="icon" aria-label="Increase">
				<RiAddLine />
			</Button>
		</ButtonGroup>
	),
});

figma.connect(ButtonGroupSeparator, BUTTON_GROUP_SEPARATOR_URL, {
	props: {
		orientation: figma.enum("Vertical", {
			False: "horizontal",
		}),
	},
	example: ({ orientation }) => (
		<ButtonGroupSeparator orientation={orientation} />
	),
});

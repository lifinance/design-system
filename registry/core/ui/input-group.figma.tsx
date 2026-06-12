import figma from "@figma/code-connect";

import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/core/ui/input-group";

figma.connect(
	InputGroup,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-41968",
	{
		props: {
			children: figma.slot("Slot"),
		},
		example: ({ children }) => <InputGroup>{children}</InputGroup>,
	},
);

figma.connect(
	InputGroupAddon,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-42317",
	{
		props: {
			children: figma.slot("Slot"),
		},
		example: ({ children }) => <InputGroupAddon>{children}</InputGroupAddon>,
	},
);

figma.connect(
	InputGroupInput,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101782-87936",
	{
		example: () => <InputGroupInput placeholder="Placeholder text" />,
	},
);

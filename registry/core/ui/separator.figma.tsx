import figma from "@figma/code-connect";

import { Separator } from "@/registry/core/ui/separator";

figma.connect(
	Separator,
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2753-10017",
	{
		props: {
			orientation: figma.enum("Horizontal", {
				False: "vertical",
			}),
		},
		example: ({ orientation }) => <Separator orientation={orientation} />,
	},
);

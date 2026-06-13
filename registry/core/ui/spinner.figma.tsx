import figma from "@figma/code-connect";

import { Spinner } from "@/registry/core/ui/spinner";

const SPINNER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=34338-4980";

figma.connect(Spinner, SPINNER_URL, {
	props: {
		className: figma.enum("Size", {
			"3": "size-3",
			"5": "size-5",
			"6": "size-6",
			"8": "size-8",
		}),
	},
	example: ({ className }) => <Spinner className={className} />,
});

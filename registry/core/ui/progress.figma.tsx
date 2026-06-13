import figma from "@figma/code-connect";

import { Progress } from "@/registry/core/ui/progress";

const PROGRESS_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2768-27760";

figma.connect(Progress, PROGRESS_URL, {
	props: {
		value: figma.enum("Progress", {
			"0%": 0,
			"10%": 10,
			"20%": 20,
			"30%": 30,
			"40%": 40,
			"50%": 50,
			"60%": 60,
			"70%": 70,
			"80%": 80,
			"90%": 90,
			"100%": 100,
		}),
	},
	example: ({ value }) => <Progress aria-label="Loading" value={value} />,
});

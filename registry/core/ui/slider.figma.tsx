import figma from "@figma/code-connect";

import { Slider } from "@/registry/core/ui/slider";

const SLIDER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2785-10703";

figma.connect(Slider, SLIDER_URL, {
	variant: { Range: "False" },
	example: () => <Slider defaultValue={50} thumbLabels={["Value"]} />,
});

figma.connect(Slider, SLIDER_URL, {
	variant: { Range: "True" },
	example: () => (
		<Slider
			defaultValue={[25, 75]}
			thumbLabels={["Range start", "Range end"]}
		/>
	),
});

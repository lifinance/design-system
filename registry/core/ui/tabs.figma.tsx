import figma from "@figma/code-connect";
import { BellIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/registry/core/ui/tabs";

const TABS_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101485-143347";
const TAB_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2761-24879";

figma.connect(Tabs, TABS_URL, {
	props: {
		orientation: figma.enum("Orientation", {
			Horizontal: "horizontal",
			Vertical: "vertical",
		}),
		variant: figma.enum("Variant", {
			Default: "default",
			Line: "line",
		}),
		tabs: figma.children("*"),
	},
	example: ({ orientation, variant, tabs }) => (
		<Tabs defaultValue="overview" orientation={orientation}>
			<TabsList variant={variant} aria-label="Views">
				{tabs}
			</TabsList>
		</Tabs>
	),
});

figma.connect(TabsTrigger, TAB_ITEM_URL, {
	props: {
		label: figma.string("Label"),
		icon: figma.boolean("Icon", {
			true: <BellIcon />,
			false: undefined,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, icon, disabled }) => (
		<TabsTrigger value="tab" disabled={disabled}>
			{icon}
			{label}
		</TabsTrigger>
	),
});

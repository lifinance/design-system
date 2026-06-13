import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/registry/core/ui/sheet";

const SHEET_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2785-10044";
const SHEET_CLOSE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6868-2238";
const SHEET_FOOTER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101112-37047";

figma.connect(Sheet, SHEET_URL, {
	props: {
		side: figma.enum("Orientation", {
			Right: "right",
			Left: "left",
			Top: "top",
			Bottom: "bottom",
		}),
		header: figma.boolean("Header", {
			true: (
				<SheetHeader>
					<SheetTitle>Sheet title</SheetTitle>
					<SheetDescription>Sheet description</SheetDescription>
				</SheetHeader>
			),
			false: undefined,
		}),
		footer: figma.boolean("Footer", {
			true: (
				<SheetFooter>
					<Button>Save changes</Button>
					<SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
				</SheetFooter>
			),
			false: undefined,
		}),
		content: figma.slot("Slot"),
	},
	example: ({ side, header, footer, content }) => (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>
				Open sheet
			</SheetTrigger>
			<SheetContent side={side}>
				{header}
				{content}
				{footer}
			</SheetContent>
		</Sheet>
	),
});

figma.connect(SheetClose, SHEET_CLOSE_URL, {
	example: () => (
		<SheetClose render={<Button variant="ghost" size="icon-sm" />}>
			Close
		</SheetClose>
	),
});

figma.connect(SheetFooter, SHEET_FOOTER_URL, {
	example: () => (
		<SheetFooter>
			<Button>Save changes</Button>
			<SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
		</SheetFooter>
	),
});

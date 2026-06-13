import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/core/ui/dialog";

const DIALOG_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2759-16962";

figma.connect(Dialog, DIALOG_URL, {
	props: {
		showCloseButton: figma.boolean("Close button"),
		header: figma.boolean("Header", {
			true: (
				<DialogHeader>
					<DialogTitle>Dialog title</DialogTitle>
					<DialogDescription>Dialog description</DialogDescription>
				</DialogHeader>
			),
			false: undefined,
		}),
		footer: figma.boolean("Footer", {
			true: (
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			),
			false: undefined,
		}),
		content: figma.slot("Slot"),
	},
	example: ({ showCloseButton, header, footer, content }) => (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Open dialog
			</DialogTrigger>
			<DialogContent showCloseButton={showCloseButton}>
				{header}
				{content}
				{footer}
			</DialogContent>
		</Dialog>
	),
});

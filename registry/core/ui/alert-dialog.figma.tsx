import figma from "@figma/code-connect";
import { BellIcon } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/registry/core/ui/alert-dialog";
import { Button } from "@/registry/core/ui/button";

const ALERT_DIALOG_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2759-16912";
const ALERT_DIALOG_FOOTER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101013-792";
const ALERT_DIALOG_HEADER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101014-5129";
const ALERT_DIALOG_MEDIA_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101014-5050";

figma.connect(AlertDialog, ALERT_DIALOG_URL, {
	props: {
		size: figma.enum("Type", {
			Small: "sm",
		}),
	},
	example: ({ size }) => (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Open alert dialog
			</AlertDialogTrigger>
			<AlertDialogContent size={size}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
});

figma.connect(AlertDialogHeader, ALERT_DIALOG_HEADER_URL, {
	props: {
		media: figma.boolean("Media", {
			true: (
				<AlertDialogMedia>
					<BellIcon />
				</AlertDialogMedia>
			),
			false: undefined,
		}),
	},
	example: ({ media }) => (
		<AlertDialogHeader>
			{media}
			<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
			<AlertDialogDescription>
				This action cannot be undone.
			</AlertDialogDescription>
		</AlertDialogHeader>
	),
});

figma.connect(AlertDialogFooter, ALERT_DIALOG_FOOTER_URL, {
	example: () => (
		<AlertDialogFooter>
			<AlertDialogCancel>Cancel</AlertDialogCancel>
			<AlertDialogAction>Continue</AlertDialogAction>
		</AlertDialogFooter>
	),
});

figma.connect(AlertDialogMedia, ALERT_DIALOG_MEDIA_URL, {
	example: () => (
		<AlertDialogMedia>
			<BellIcon />
		</AlertDialogMedia>
	),
});

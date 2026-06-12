import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/core/ui/card";

const CARD_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=149-2500";
const CARD_HEADER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2761-23510";
const CARD_FOOTER_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=149-2866";

figma.connect(Card, CARD_URL, {
	props: {
		header: figma.boolean("Header", {
			true: figma.children("Card Header"),
			false: undefined,
		}),
		footer: figma.boolean("Footer", {
			true: figma.children(".Card Footer"),
			false: undefined,
		}),
		contents: figma.slot("Contents"),
	},
	example: ({ header, footer, contents }) => (
		<Card>
			{header}
			<CardContent>{contents}</CardContent>
			{footer}
		</Card>
	),
});

figma.connect(CardHeader, CARD_HEADER_URL, {
	props: {
		title: figma.string("Title"),
		description: figma.string("↳ Description"),
		action: figma.boolean("Button", {
			true: (
				<CardAction>
					<Button variant="outline" size="sm">
						Action
					</Button>
				</CardAction>
			),
			false: undefined,
		}),
	},
	example: ({ title, description, action }) => (
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
			{action}
		</CardHeader>
	),
});

figma.connect(CardFooter, CARD_FOOTER_URL, {
	example: () => (
		<CardFooter>
			<Button variant="outline">Cancel</Button>
			<Button>Submit</Button>
		</CardFooter>
	),
});

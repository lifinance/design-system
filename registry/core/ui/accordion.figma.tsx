import figma from "@figma/code-connect";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/core/ui/accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/core/ui/card";

const ACCORDION_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=100996-10018";
const ACCORDION_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=1-55";

figma.connect(Accordion, ACCORDION_URL, {
	variant: { Style: "Basic" },
	props: {
		items: figma.slot("Accordion Items"),
	},
	example: ({ items }) => <Accordion>{items}</Accordion>,
});

figma.connect(Accordion, ACCORDION_URL, {
	variant: { Style: "Borders" },
	example: () => (
		<Accordion className="gap-2">
			<AccordionItem value="item-1" className="rounded-lg border">
				<AccordionTrigger className="px-2.5">Label</AccordionTrigger>
				<AccordionContent className="px-2.5 text-muted-foreground">
					This is the body of the accordion component
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
});

figma.connect(Accordion, ACCORDION_URL, {
	variant: { Style: "Card" },
	props: {
		items: figma.slot("Accordion Items"),
	},
	example: ({ items }) => (
		<Card className="gap-4">
			<CardHeader>
				<CardTitle>Card title</CardTitle>
				<CardDescription>Card description</CardDescription>
			</CardHeader>
			<CardContent>
				<Accordion>{items}</Accordion>
			</CardContent>
		</Card>
	),
});

figma.connect(AccordionItem, ACCORDION_ITEM_URL, {
	props: {
		label: figma.string("Label"),
		body: figma.boolean("Body text", {
			true: figma.string("Body"),
			false: undefined,
		}),
		disabled: figma.enum("State", {
			Disabled: true,
		}),
	},
	example: ({ label, body, disabled }) => (
		<AccordionItem value="item-1" disabled={disabled}>
			<AccordionTrigger>{label}</AccordionTrigger>
			<AccordionContent>{body}</AccordionContent>
		</AccordionItem>
	),
});

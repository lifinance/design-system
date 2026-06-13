import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./accordion";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./card";

const FIGMA = {
	accordion:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=100996-10018",
	item: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=1-55",
};

const FAQ = [
	{
		value: "transfer-time",
		question: "How long does a transfer take?",
		answer:
			"Most transfers complete in a few minutes. Settlement time depends on the source and destination networks.",
	},
	{
		value: "fees",
		question: "What fees apply?",
		answer:
			"Every quote shows the network cost and the provider fee before you confirm.",
	},
	{
		value: "tracking",
		question: "Can I track a transfer?",
		answer:
			"Each transfer has a status view with a link to the block explorer.",
	},
];

const meta = {
	component: Accordion,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A vertically stacked set of headers that expand to reveal their content. Install with `pnpm dlx shadcn@latest add @core/accordion`.",
			},
		},
		design: { type: "figma", url: FIGMA.accordion },
	},
	args: { onValueChange: fn() },
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Accordion {...args}>
			{FAQ.map((item) => (
				<AccordionItem key={item.value} value={item.value}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
	play: async ({ canvas, userEvent, args }) => {
		const first = canvas.getByRole("button", {
			name: /how long does a transfer take/i,
		});
		await userEvent.click(first);
		await waitFor(() => expect(first).toHaveAttribute("aria-expanded", "true"));
		await expect(args.onValueChange).toHaveBeenCalled();
		await waitFor(() =>
			expect(canvas.getByText(/most transfers complete/i)).toBeVisible(),
		);
		const second = canvas.getByRole("button", { name: /what fees apply/i });
		await userEvent.click(second);
		await waitFor(() =>
			expect(first).toHaveAttribute("aria-expanded", "false"),
		);
		await expect(second).toHaveAttribute("aria-expanded", "true");
	},
};

export const Multiple: Story = {
	args: { multiple: true, defaultValue: ["transfer-time"] },
	render: (args) => (
		<Accordion {...args}>
			{FAQ.map((item) => (
				<AccordionItem key={item.value} value={item.value}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
	play: async ({ canvas, userEvent }) => {
		const first = canvas.getByRole("button", {
			name: /how long does a transfer take/i,
		});
		const second = canvas.getByRole("button", { name: /what fees apply/i });
		await userEvent.click(second);
		await waitFor(() =>
			expect(second).toHaveAttribute("aria-expanded", "true"),
		);
		await expect(first).toHaveAttribute("aria-expanded", "true");
	},
};

export const Disabled: Story = {
	parameters: { design: { type: "figma", url: FIGMA.item } },
	render: (args) => (
		<Accordion {...args}>
			<AccordionItem value="tracking">
				<AccordionTrigger>Can I track a transfer?</AccordionTrigger>
				<AccordionContent>
					Each transfer has a status view with a link to the block explorer.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="routing" disabled>
				<AccordionTrigger>Routing preferences</AccordionTrigger>
				<AccordionContent>
					Routing preferences become available after your first completed
					transfer.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("button", { name: /routing preferences/i }),
		).toHaveAttribute("aria-disabled", "true");
	},
};

export const Bordered: Story = {
	args: { className: "gap-2", defaultValue: ["fees"] },
	render: (args) => (
		<Accordion {...args}>
			{FAQ.map((item) => (
				<AccordionItem
					key={item.value}
					value={item.value}
					className="rounded-lg border"
				>
					<AccordionTrigger className="px-2.5">
						{item.question}
					</AccordionTrigger>
					<AccordionContent className="px-2.5 text-muted-foreground">
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
};

export const InCard: Story = {
	args: { multiple: true, defaultValue: ["transfer-time"] },
	render: (args) => (
		<Card className="gap-4">
			<CardHeader>
				<CardTitle>Frequently asked questions</CardTitle>
				<CardDescription>
					Answers about transfers, fees, and tracking.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Accordion {...args}>
					{FAQ.map((item) => (
						<AccordionItem key={item.value} value={item.value}>
							<AccordionTrigger>{item.question}</AccordionTrigger>
							<AccordionContent>{item.answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
		</Card>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-8">
			<Accordion
				aria-label="Frequently asked questions"
				defaultValue={["transfer-time"]}
			>
				{FAQ.map((item) => (
					<AccordionItem key={item.value} value={item.value}>
						<AccordionTrigger>{item.question}</AccordionTrigger>
						<AccordionContent>{item.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			<Accordion
				aria-label="Bordered frequently asked questions"
				className="gap-2"
				defaultValue={["fees"]}
			>
				{FAQ.map((item) => (
					<AccordionItem
						key={item.value}
						value={item.value}
						className="rounded-lg border"
					>
						<AccordionTrigger className="px-2.5">
							{item.question}
						</AccordionTrigger>
						<AccordionContent className="px-2.5 text-muted-foreground">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	),
};

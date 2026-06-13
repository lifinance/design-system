import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";

const invoices = [
	{
		invoice: "INV001",
		status: "Paid",
		method: "Credit Card",
		amount: "$250.00",
	},
	{
		invoice: "INV002",
		status: "Pending",
		method: "PayPal",
		amount: "$150.00",
	},
	{
		invoice: "INV003",
		status: "Unpaid",
		method: "Bank Transfer",
		amount: "$350.00",
	},
	{
		invoice: "INV004",
		status: "Paid",
		method: "Credit Card",
		amount: "$450.00",
	},
];

const meta = {
	component: Table,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"Displays rows and columns of data, with an optional header, footer, and caption. Install with `pnpm dlx shadcn@latest add @core/table`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2807-10070",
		},
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead scope="col" className="w-[100px]">
						Invoice
					</TableHead>
					<TableHead scope="col">Status</TableHead>
					<TableHead scope="col">Method</TableHead>
					<TableHead scope="col" className="text-right">
						Amount
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$1,200.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("table", { name: "A list of your recent invoices." }),
		).toBeInTheDocument();

		const columnHeaders = canvas.getAllByRole("columnheader");
		await expect(columnHeaders).toHaveLength(4);
		await expect(columnHeaders[0]).toHaveAccessibleName("Invoice");

		// Header row, one row per invoice, and the footer total row.
		await expect(canvas.getAllByRole("row")).toHaveLength(invoices.length + 2);

		// Four body cells per invoice, plus two footer cells.
		await expect(canvas.getAllByRole("cell")).toHaveLength(
			invoices.length * 4 + 2,
		);

		await expect(canvas.getByText("Total")).toBeVisible();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<Table>
			<TableCaption>Recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead scope="col" className="w-[100px]">
						Invoice
					</TableHead>
					<TableHead scope="col">Status</TableHead>
					<TableHead scope="col">Method</TableHead>
					<TableHead scope="col" className="text-right">
						Amount
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.slice(0, 3).map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">{invoice.invoice}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.method}</TableCell>
						<TableCell className="text-right">{invoice.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$750.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

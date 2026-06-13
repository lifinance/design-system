import figma from "@figma/code-connect";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/core/ui/table";

const TABLE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2807-10070";

figma.connect(Table, TABLE_URL, {
	example: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead scope="col">Invoice</TableHead>
					<TableHead scope="col">Status</TableHead>
					<TableHead scope="col">Method</TableHead>
					<TableHead scope="col" className="text-right">
						Amount
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
});

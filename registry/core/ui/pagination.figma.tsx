import figma from "@figma/code-connect";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/registry/core/ui/pagination";

const PAGINATION_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=546-5848";
const PAGINATION_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=546-5807";

figma.connect(Pagination, PAGINATION_URL, {
	props: {
		items: figma.slot("Slot"),
	},
	example: ({ items }) => (
		<Pagination>
			<PaginationContent>{items}</PaginationContent>
		</Pagination>
	),
});

figma.connect(PaginationLink, PAGINATION_ITEM_URL, {
	variant: { Type: "Page" },
	props: {
		page: figma.string("Page"),
		isActive: figma.enum("Selected", {
			True: true,
		}),
	},
	example: ({ page, isActive }) => (
		<PaginationItem>
			<PaginationLink href="#" isActive={isActive}>
				{page}
			</PaginationLink>
		</PaginationItem>
	),
});

figma.connect(PaginationPrevious, PAGINATION_ITEM_URL, {
	variant: { Type: "Previous" },
	example: () => (
		<PaginationItem>
			<PaginationPrevious href="#" />
		</PaginationItem>
	),
});

figma.connect(PaginationNext, PAGINATION_ITEM_URL, {
	variant: { Type: "Next" },
	example: () => (
		<PaginationItem>
			<PaginationNext href="#" />
		</PaginationItem>
	),
});

figma.connect(PaginationEllipsis, PAGINATION_ITEM_URL, {
	variant: { Type: "Ellipsis" },
	example: () => (
		<PaginationItem>
			<PaginationEllipsis />
		</PaginationItem>
	),
});

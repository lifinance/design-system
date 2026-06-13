import figma from "@figma/code-connect";
import { ChevronDownIcon } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/core/ui/breadcrumb";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/core/ui/dropdown-menu";

const BREADCRUMB_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6727-5792";
const BREADCRUMB_ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2730-13718";
const BREADCRUMB_SEPARATOR_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101015-190014";

figma.connect(Breadcrumb, BREADCRUMB_URL, {
	props: {
		items: figma.slot("Slot"),
	},
	example: ({ items }) => (
		<Breadcrumb>
			<BreadcrumbList>{items}</BreadcrumbList>
		</Breadcrumb>
	),
});

figma.connect(BreadcrumbItem, BREADCRUMB_ITEM_URL, {
	variant: { Type: "Text" },
	props: {
		label: figma.string("Text"),
	},
	example: ({ label }) => (
		<BreadcrumbItem>
			<BreadcrumbLink href="#">{label}</BreadcrumbLink>
		</BreadcrumbItem>
	),
});

figma.connect(BreadcrumbItem, BREADCRUMB_ITEM_URL, {
	variant: { Type: "Text", State: "Current" },
	props: {
		label: figma.string("Text"),
	},
	example: ({ label }) => (
		<BreadcrumbItem>
			<BreadcrumbPage>{label}</BreadcrumbPage>
		</BreadcrumbItem>
	),
});

figma.connect(BreadcrumbItem, BREADCRUMB_ITEM_URL, {
	variant: { Type: "Icon" },
	example: () => (
		<BreadcrumbItem>
			<BreadcrumbEllipsis />
		</BreadcrumbItem>
	),
});

figma.connect(BreadcrumbItem, BREADCRUMB_ITEM_URL, {
	variant: { Type: "Dropdown" },
	props: {
		label: figma.string("Text"),
	},
	example: ({ label }) => (
		<BreadcrumbItem>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center gap-1">
					{label}
					<ChevronDownIcon />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start">
					<DropdownMenuItem>Documentation</DropdownMenuItem>
					<DropdownMenuItem>Themes</DropdownMenuItem>
					<DropdownMenuItem>GitHub</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</BreadcrumbItem>
	),
});

figma.connect(BreadcrumbSeparator, BREADCRUMB_SEPARATOR_URL, {
	example: () => <BreadcrumbSeparator />,
});

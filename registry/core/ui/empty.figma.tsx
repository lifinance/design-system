import figma from "@figma/code-connect";
import { FolderIcon } from "lucide-react";

import { Button } from "@/registry/core/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/core/ui/empty";

const EMPTY_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-51078";
const EMPTY_MEDIA_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-36569";
const EMPTY_CONTENT_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-36619";

figma.connect(Empty, EMPTY_URL, {
	props: {
		title: figma.string("Title"),
		description: figma.string("Description"),
		media: figma.boolean("Icon", {
			true: (
				<EmptyMedia variant="icon">
					<FolderIcon />
				</EmptyMedia>
			),
			false: undefined,
		}),
		content: figma.slot("Content"),
	},
	example: ({ title, description, media, content }) => (
		<Empty>
			<EmptyHeader>
				{media}
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>{content}</EmptyContent>
		</Empty>
	),
});

figma.connect(EmptyMedia, EMPTY_MEDIA_URL, {
	variant: { Type: "Icon" },
	props: {
		icon: figma.instance("Icon"),
	},
	example: ({ icon }) => <EmptyMedia variant="icon">{icon}</EmptyMedia>,
});

figma.connect(EmptyMedia, EMPTY_MEDIA_URL, {
	variant: { Type: "Avatar" },
	props: {
		avatar: figma.children("Avatar"),
	},
	example: ({ avatar }) => <EmptyMedia>{avatar}</EmptyMedia>,
});

figma.connect(EmptyMedia, EMPTY_MEDIA_URL, {
	variant: { Type: "Avatar Group" },
	props: {
		group: figma.children("Avatar Group"),
	},
	example: ({ group }) => <EmptyMedia>{group}</EmptyMedia>,
});

figma.connect(EmptyContent, EMPTY_CONTENT_URL, {
	variant: { Type: "Single Button" },
	example: () => (
		<EmptyContent>
			<Button>Get started</Button>
		</EmptyContent>
	),
});

figma.connect(EmptyContent, EMPTY_CONTENT_URL, {
	variant: { Type: "2 Buttons - Horiz" },
	example: () => (
		<EmptyContent>
			<div className="flex gap-2">
				<Button>Get started</Button>
				<Button variant="outline">Learn more</Button>
			</div>
		</EmptyContent>
	),
});

figma.connect(EmptyContent, EMPTY_CONTENT_URL, {
	variant: { Type: "2 Buttons - Vert" },
	example: () => (
		<EmptyContent>
			<Button>Get started</Button>
			<Button variant="outline">Learn more</Button>
		</EmptyContent>
	),
});

figma.connect(EmptyContent, EMPTY_CONTENT_URL, {
	variant: { Type: "3 Buttons" },
	example: () => (
		<EmptyContent>
			<Button>Get started</Button>
			<Button variant="outline">Learn more</Button>
			<Button variant="ghost">Dismiss</Button>
		</EmptyContent>
	),
});

figma.connect(EmptyContent, EMPTY_CONTENT_URL, {
	variant: { Type: "Input & Description" },
	example: () => (
		<EmptyContent>
			<EmptyDescription>Need help? Contact support.</EmptyDescription>
		</EmptyContent>
	),
});

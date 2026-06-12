import figma from "@figma/code-connect";

import { Button } from "@/registry/core/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/registry/core/ui/item";

const ITEM_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-3156";
const ITEM_MEDIA_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33455-88003";
const ITEM_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-31422";

figma.connect(Item, ITEM_URL, {
	props: {
		variant: figma.enum("Type", {
			Outline: "outline",
		}),
		size: figma.enum("Size", {
			Small: "sm",
		}),
		title: figma.string("↳ Title"),
		description: figma.string("↳ Description"),
		media: figma.boolean("Media", {
			true: figma.children(".Item Media"),
			false: undefined,
		}),
		actions: figma.boolean("Action items", {
			true: (
				<ItemActions>
					<Button variant="outline" size="sm">
						Action
					</Button>
				</ItemActions>
			),
			false: undefined,
		}),
	},
	example: ({ variant, size, title, description, media, actions }) => (
		<Item variant={variant} size={size}>
			{media}
			<ItemContent>
				<ItemTitle>{title}</ItemTitle>
				<ItemDescription>{description}</ItemDescription>
			</ItemContent>
			{actions}
		</Item>
	),
});

figma.connect(ItemMedia, ITEM_MEDIA_URL, {
	variant: { Type: "Icon" },
	props: {
		icon: figma.instance("Icon"),
	},
	example: ({ icon }) => <ItemMedia variant="icon">{icon}</ItemMedia>,
});

figma.connect(ItemMedia, ITEM_MEDIA_URL, {
	variant: { Type: "Avatar" },
	props: {
		avatar: figma.children("Avatar"),
	},
	example: ({ avatar }) => <ItemMedia>{avatar}</ItemMedia>,
});

figma.connect(ItemMedia, ITEM_MEDIA_URL, {
	variant: { Type: "Avatar Group" },
	props: {
		group: figma.children("Avatar Group"),
	},
	example: ({ group }) => <ItemMedia>{group}</ItemMedia>,
});

figma.connect(ItemMedia, ITEM_MEDIA_URL, {
	variant: { Type: "Image" },
	example: () => (
		<ItemMedia variant="image">
			<img src="https://github.com/shadcn.png" alt="" />
		</ItemMedia>
	),
});

figma.connect(ItemGroup, ITEM_GROUP_URL, {
	props: {
		items: figma.children("Item"),
	},
	example: ({ items }) => <ItemGroup>{items}</ItemGroup>,
});

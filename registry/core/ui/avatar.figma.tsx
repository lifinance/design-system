import figma from "@figma/code-connect";
import { PlusIcon, UserRoundIcon } from "lucide-react";

import {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
} from "@/registry/core/ui/avatar";

const AVATAR_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=8-297";
const AVATAR_BADGE_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101015-48165";
const AVATAR_GROUP_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6775-352";

figma.connect(Avatar, AVATAR_URL, {
	variant: { Type: "Image" },
	props: {
		size: figma.enum("Size", {
			"X Small": "sm",
			Medium: "lg",
		}),
		className: figma.enum("Size", {
			"2X Small": "size-5",
			Large: "size-12",
			"X-Large": "size-14",
			"2X-Large": "size-16",
			"3X-Large": "size-20",
			"4X-Large": "size-24",
			"5X-Large": "size-28",
			"6X-Large": "size-32",
		}),
		badge: figma.boolean("Badge", {
			true: <AvatarBadge className="bg-success" />,
			false: undefined,
		}),
	},
	example: ({ size, className, badge }) => (
		<Avatar size={size} className={className}>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
			{badge}
		</Avatar>
	),
});

figma.connect(Avatar, AVATAR_URL, {
	variant: { Type: "Fallback" },
	props: {
		size: figma.enum("Size", {
			"X Small": "sm",
			Medium: "lg",
		}),
		className: figma.enum("Size", {
			"2X Small": "size-5",
			Large: "size-12",
			"X-Large": "size-14",
			"2X-Large": "size-16",
			"3X-Large": "size-20",
			"4X-Large": "size-24",
			"5X-Large": "size-28",
			"6X-Large": "size-32",
		}),
		initials: figma.string("Initials"),
		badge: figma.boolean("Badge", {
			true: <AvatarBadge className="bg-success" />,
			false: undefined,
		}),
	},
	example: ({ size, className, initials, badge }) => (
		<Avatar size={size} className={className}>
			<AvatarFallback>{initials}</AvatarFallback>
			{badge}
		</Avatar>
	),
});

figma.connect(Avatar, AVATAR_URL, {
	variant: { Type: "Icon" },
	props: {
		size: figma.enum("Size", {
			"X Small": "sm",
			Medium: "lg",
		}),
		className: figma.enum("Size", {
			"2X Small": "size-5",
			Large: "size-12",
			"X-Large": "size-14",
			"2X-Large": "size-16",
			"3X-Large": "size-20",
			"4X-Large": "size-24",
			"5X-Large": "size-28",
			"6X-Large": "size-32",
		}),
		badge: figma.boolean("Badge", {
			true: <AvatarBadge className="bg-success" />,
			false: undefined,
		}),
	},
	example: ({ size, className, badge }) => (
		<Avatar size={size} className={className}>
			<AvatarFallback>
				<UserRoundIcon className="size-4" />
			</AvatarFallback>
			{badge}
		</Avatar>
	),
});

figma.connect(AvatarBadge, AVATAR_BADGE_URL, {
	variant: { Type: "Color" },
	example: () => <AvatarBadge className="bg-success" />,
});

figma.connect(AvatarBadge, AVATAR_BADGE_URL, {
	variant: { Type: "Icon" },
	example: () => (
		<AvatarBadge>
			<PlusIcon />
		</AvatarBadge>
	),
});

figma.connect(AvatarGroup, AVATAR_GROUP_URL, {
	props: {
		avatars: figma.slot("Slot"),
	},
	example: ({ avatars }) => <AvatarGroup>{avatars}</AvatarGroup>,
});

import figma from "@figma/code-connect";

import { Skeleton } from "@/registry/core/ui/skeleton";

const SKELETON_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=168-2123";

figma.connect(Skeleton, SKELETON_URL, {
	variant: { Type: "Line" },
	example: () => <Skeleton className="h-4 w-64" />,
});

figma.connect(Skeleton, SKELETON_URL, {
	variant: { Type: "Card" },
	example: () => (
		<div className="flex flex-col gap-3">
			<Skeleton className="h-32 w-full rounded-xl" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	),
});

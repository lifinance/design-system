import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Skeleton } from "./skeleton";

const meta = {
	component: Skeleton,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A pulsing placeholder that holds space while content loads. Install with `pnpm dlx shadcn@latest add @core/skeleton`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=168-2123",
		},
	},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { className: "h-4 w-64" },
};

export const Card: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-3">
			<Skeleton className="h-32 w-full rounded-xl" />
			<div className="flex flex-col gap-2">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		</div>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-80 flex-col gap-6">
			<Skeleton className="h-4 w-64" />
			<div className="flex items-center gap-3">
				<Skeleton className="size-10 shrink-0 rounded-full" />
				<div className="flex w-full flex-col gap-2">
					<Skeleton className="h-4 w-3/5" />
					<Skeleton className="h-4 w-2/5" />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Skeleton className="h-32 w-full rounded-xl" />
				<Skeleton className="h-4 w-3/4" />
			</div>
		</div>
	),
};

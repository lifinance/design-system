import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { AspectRatio } from "./aspect-ratio";

const IMAGE = "https://github.com/shadcn.png";

const meta = {
	component: AspectRatio,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A container that keeps its content at a chosen width-to-height ratio. Install with `pnpm dlx shadcn@latest add @core/aspect-ratio`.",
			},
		},
	},
	args: {
		ratio: 16 / 9,
	},
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="w-80">
			<AspectRatio {...args} className="rounded-lg bg-muted">
				<img
					src={IMAGE}
					alt="Portrait"
					className="size-full rounded-lg object-cover"
				/>
			</AspectRatio>
		</div>
	),
};

export const Square: Story = {
	args: { ratio: 1 },
	render: (args) => (
		<div className="w-48">
			<AspectRatio {...args} className="rounded-lg bg-muted">
				<img
					src={IMAGE}
					alt="Portrait"
					className="size-full rounded-lg object-cover"
				/>
			</AspectRatio>
		</div>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex items-start gap-4">
			<div className="w-64">
				<AspectRatio ratio={16 / 9} className="rounded-lg bg-muted">
					<img
						src={IMAGE}
						alt="Portrait at a wide ratio"
						className="size-full rounded-lg object-cover"
					/>
				</AspectRatio>
			</div>
			<div className="w-36">
				<AspectRatio ratio={1} className="rounded-lg bg-muted">
					<img
						src={IMAGE}
						alt="Portrait at a square ratio"
						className="size-full rounded-lg object-cover"
					/>
				</AspectRatio>
			</div>
			<div className="w-24">
				<AspectRatio ratio={9 / 16} className="rounded-lg bg-muted">
					<img
						src={IMAGE}
						alt="Portrait at a tall ratio"
						className="size-full rounded-lg object-cover"
					/>
				</AspectRatio>
			</div>
		</div>
	),
};

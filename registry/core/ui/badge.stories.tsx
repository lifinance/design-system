import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Badge } from "./badge";

const meta = {
	component: Badge,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A small label for status, counts, and metadata. Install with `pnpm dlx shadcn@latest add @core/badge`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=136-1178",
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"destructive",
				"outline",
				"ghost",
				"link",
			],
		},
	},
	args: { children: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Badge>Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
			<Badge variant="ghost">Ghost</Badge>
			<Badge variant="link">Link</Badge>
		</div>
	),
};

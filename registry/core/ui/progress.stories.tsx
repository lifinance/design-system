import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Progress, ProgressLabel, ProgressValue } from "./progress";

const meta = {
	component: Progress,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A bar that shows how far along a task is. Install with `pnpm dlx shadcn@latest add @core/progress`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2768-27760",
		},
	},
	args: {
		"aria-label": "Loading",
		value: 30,
		className: "w-80",
	},
	render: (args) => <Progress {...args} />,
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas }) => {
		const bar = canvas.getByRole("progressbar", { name: "Loading" });
		await waitFor(() => expect(bar).toHaveAttribute("aria-valuenow", "30"));
	},
};

export const HalfComplete: Story = {
	args: { value: 66 },
};

export const Complete: Story = {
	args: { value: 100 },
};

export const Indeterminate: Story = {
	args: { value: null },
	play: async ({ canvas }) => {
		const bar = canvas.getByRole("progressbar", { name: "Loading" });
		await expect(bar).not.toHaveAttribute("aria-valuenow");
	},
};

export const WithLabel: Story = {
	args: { "aria-label": undefined, value: 56 },
	render: (args) => (
		<Progress {...args}>
			<ProgressLabel>Uploading files</ProgressLabel>
			<ProgressValue />
		</Progress>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-80 flex-col gap-4">
			<Progress aria-label="No progress" value={0} />
			<Progress aria-label="Thirty percent" value={30} />
			<Progress aria-label="Sixty-six percent" value={66} />
			<Progress aria-label="Complete" value={100} />
			<Progress aria-label="Loading" value={null} />
			<Progress value={56}>
				<ProgressLabel>Uploading files</ProgressLabel>
				<ProgressValue />
			</Progress>
		</div>
	),
};

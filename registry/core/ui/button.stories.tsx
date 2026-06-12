import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";
import { expect, fn } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";

const meta = {
	component: Button,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A button with multiple variants and sizes. Install with `pnpm dlx shadcn@latest add @core/button`.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"outline",
				"ghost",
				"destructive",
				"link",
			],
		},
		size: {
			control: "select",
			options: [
				"default",
				"xs",
				"sm",
				"lg",
				"icon",
				"icon-xs",
				"icon-sm",
				"icon-lg",
			],
		},
	},
	args: {
		children: "Continue",
		onClick: fn(),
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent, args }) => {
		const button = canvas.getByRole("button", { name: /continue/i });
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const Secondary: Story = {
	args: { variant: "secondary" },
};

export const Outline: Story = {
	args: { variant: "outline" },
};

export const Ghost: Story = {
	args: { variant: "ghost" },
};

export const Destructive: Story = {
	args: { variant: "destructive" },
};

export const Disabled: Story = {
	args: { disabled: true },
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("button", { name: /continue/i }),
		).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center gap-2">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Destructive</Button>
				<Button variant="link">Link</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button size="xs">Extra small</Button>
				<Button size="sm">Small</Button>
				<Button>Default</Button>
				<Button size="lg">Large</Button>
			</div>
			<div className="flex flex-wrap items-center gap-2">
				<Button aria-label="Add">
					<PlusIcon />
				</Button>
				<Button>
					<PlusIcon />
					With icon
				</Button>
				<Button disabled>Disabled</Button>
			</div>
		</div>
	),
};

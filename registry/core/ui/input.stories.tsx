import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Input } from "./input";

const meta = {
	component: Input,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A single-line text input. Install with `pnpm dlx shadcn@latest add @core/input`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2732-15509",
		},
	},
	args: {
		"aria-label": "Email",
		placeholder: "Email",
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: /email/i });
		await userEvent.type(input, "vitalik@example.com");
		await expect(input).toHaveValue("vitalik@example.com");
	},
};

export const Filled: Story = {
	args: { defaultValue: "vitalik@example.com" },
};

export const Disabled: Story = {
	args: { disabled: true, defaultValue: "vitalik@example.com" },
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("textbox", { name: /email/i }),
		).toBeDisabled();
	},
};

export const ReadOnly: Story = {
	args: { readOnly: true, defaultValue: "vitalik@example.com" },
};

export const Invalid: Story = {
	args: { "aria-invalid": true, defaultValue: "not-an-email" },
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("textbox", { name: /email/i }),
		).toHaveAttribute("aria-invalid", "true");
	},
};

export const File: Story = {
	args: { type: "file", "aria-label": "Upload file", placeholder: undefined },
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-80 flex-col gap-3">
			<Input aria-label="Empty" placeholder="Email" />
			<Input aria-label="Filled" defaultValue="vitalik@example.com" />
			<Input
				aria-label="Disabled"
				disabled
				defaultValue="vitalik@example.com"
			/>
			<Input
				aria-label="Read only"
				readOnly
				defaultValue="vitalik@example.com"
			/>
			<Input aria-label="Invalid" aria-invalid defaultValue="not-an-email" />
			<Input aria-label="Upload file" type="file" />
		</div>
	),
};

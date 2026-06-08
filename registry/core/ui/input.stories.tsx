import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "./input";

const meta = {
	component: Input,
	tags: ["ai-generated"],
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

export const Dark: Story = {
	decorators: [
		(Story) => (
			<div className="dark bg-background text-foreground p-6">
				<Story />
			</div>
		),
	],
};

export const CssCheck: Story = {
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox", { name: /email/i });
		// h-9 resolves to 2.25rem (36px); fails if Tailwind/tokens did not load.
		await expect(getComputedStyle(input).height).toBe("36px");
	},
};

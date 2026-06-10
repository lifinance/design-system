import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Input } from "@/registry/core/ui/input";

// The @widget brand has no input component of its own — it reuses @core/input,
// re-themed entirely through @widget/tokens (--lifi-input-* + role tokens). These
// stories render that same component under the widget theme (.lifi-widget scope).
const meta = {
	component: Input,
	tags: ["ai-generated"],
	args: {
		"aria-label": "Email",
		placeholder: "Email",
	},
	decorators: [
		(Story, ctx) => (
			<div className={ctx.parameters.dark ? "dark" : undefined}>
				<div className="lifi-widget bg-background text-foreground p-6">
					<Story />
				</div>
			</div>
		),
	],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox", { name: /email/i });
		// Widget overrides --lifi-input-height to 2.875rem (46px); proves the theme applied.
		await expect(getComputedStyle(input).height).toBe("46px");
	},
};

export const Filled: Story = {
	args: { defaultValue: "vitalik@example.com" },
};

export const Disabled: Story = {
	args: { disabled: true, defaultValue: "vitalik@example.com" },
};

export const Invalid: Story = {
	args: { "aria-invalid": true, defaultValue: "not-an-email" },
};

export const Dark: Story = {
	parameters: { dark: true },
};

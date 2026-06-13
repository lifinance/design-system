import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Field, FieldError, FieldLabel } from "./field";
import { Textarea } from "./textarea";

const meta = {
	component: Textarea,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A multiline text input. Install with `pnpm dlx shadcn@latest add @core/textarea`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2807-10440",
		},
	},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Field className="w-80">
			<FieldLabel htmlFor="message">Message</FieldLabel>
			<Textarea id="message" placeholder="Type your message here." rows={6} />
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Message"));
		const textarea = canvas.getByRole("textbox", { name: /message/i });
		await expect(textarea).toHaveFocus();
		await userEvent.type(textarea, "Thanks for the update.");
		await expect(textarea).toHaveValue("Thanks for the update.");
	},
};

export const Invalid: Story = {
	render: () => (
		<Field data-invalid className="w-80">
			<FieldLabel htmlFor="invalid-message">Message</FieldLabel>
			<Textarea id="invalid-message" defaultValue="Hi" aria-invalid rows={6} />
			<FieldError>Enter at least 20 characters.</FieldError>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("textbox", { name: /message/i }),
		).toHaveAttribute("aria-invalid", "true");
		await expect(canvas.getByRole("alert")).toHaveTextContent(
			"Enter at least 20 characters.",
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<Field data-disabled className="w-80">
			<FieldLabel htmlFor="disabled-message">Message</FieldLabel>
			<Textarea
				id="disabled-message"
				defaultValue="Support replies within one business day."
				disabled
				rows={6}
			/>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("textbox", { name: /message/i }),
		).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-80 flex-col gap-4">
			<Textarea aria-label="Empty" placeholder="Type your message here." />
			<Textarea
				aria-label="Filled"
				defaultValue="Thanks for the update. I will review it today."
			/>
			<Textarea aria-label="Invalid" defaultValue="Hi" aria-invalid />
			<Textarea
				aria-label="Disabled"
				defaultValue="Support replies within one business day."
				disabled
			/>
		</div>
	),
};

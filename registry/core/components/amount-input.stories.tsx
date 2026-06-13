import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, useState } from "react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { AmountInput } from "./amount-input";

function AmountInputDemo({
	value: initialValue,
	...props
}: ComponentProps<typeof AmountInput>) {
	const [value, setValue] = useState(
		typeof initialValue === "string" ? initialValue : "",
	);
	return (
		<div className="flex w-72 items-center justify-between rounded-xl bg-muted/40 p-4">
			<AmountInput
				{...props}
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
			/>
			<span className="text-sm font-medium text-muted-foreground">ETH</span>
		</div>
	);
}

const meta = {
	component: AmountInput,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An input for entering a token amount. It accepts only digits and a single decimal point. Install with `pnpm dlx shadcn@latest add @core/amount-input`.",
			},
			source: {
				type: "code",
				code: `const [value, setValue] = useState("");

<AmountInput
  aria-label="Amount to swap"
  value={value}
  onChange={(event) => setValue(event.currentTarget.value)}
/>`,
			},
		},
	},
	args: {
		"aria-label": "Amount to swap",
	},
	render: (args) => <AmountInputDemo {...args} />,
} satisfies Meta<typeof AmountInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: /amount/i });

		await userEvent.type(input, "12.5");
		await expect(input).toHaveValue("12.5");

		await userEvent.type(input, "abc");
		await expect(input).toHaveValue("12.5");

		await userEvent.type(input, ".");
		await expect(input).toHaveValue("12.5");
	},
};

export const Filled: Story = {
	args: { value: "1.2401" },
};

export const ReadOnly: Story = {
	args: { value: "2142.16", readOnly: true },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("textbox", { name: /amount/i })).toHaveValue(
			"2142.16",
		);
	},
};

export const Disabled: Story = {
	args: { value: "0.85", disabled: true },
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("textbox", { name: /amount/i }),
		).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-72 flex-col gap-3">
			<AmountInputDemo aria-label="Empty" />
			<AmountInputDemo aria-label="With value" value="1.2401" />
			<AmountInputDemo aria-label="Read only" value="2142.16" readOnly />
			<AmountInputDemo aria-label="Disabled" value="0.85" disabled />
		</div>
	),
};

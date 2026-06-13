import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Field, FieldDescription, FieldLabel } from "./field";
import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "./native-select";

const meta = {
	component: NativeSelect,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A styled native select for choosing one option from a list. Install with `pnpm dlx shadcn@latest add @core/native-select`.",
			},
		},
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Field>
			<FieldLabel htmlFor="country">Country</FieldLabel>
			<NativeSelect id="country" {...args}>
				<NativeSelectOption value="">Select a country</NativeSelectOption>
				<NativeSelectOption value="us">United States</NativeSelectOption>
				<NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
				<NativeSelectOption value="ca">Canada</NativeSelectOption>
				<NativeSelectOption value="au">Australia</NativeSelectOption>
			</NativeSelect>
			<FieldDescription>Select your country of residence.</FieldDescription>
		</Field>
	),
	play: async ({ canvas, userEvent, args }) => {
		const select = canvas.getByLabelText("Country");
		await userEvent.selectOptions(select, "ca");
		await expect(select).toHaveValue("ca");
		await expect(args.onChange).toHaveBeenCalled();

		await userEvent.click(canvas.getByText("Country"));
		await waitFor(() => expect(select).toHaveFocus());
	},
};

export const WithGroups: Story = {
	render: (args) => (
		<Field>
			<FieldLabel htmlFor="food">Food</FieldLabel>
			<NativeSelect id="food" {...args}>
				<NativeSelectOption value="">Select a food</NativeSelectOption>
				<NativeSelectOptGroup label="Fruits">
					<NativeSelectOption value="apple">Apple</NativeSelectOption>
					<NativeSelectOption value="banana">Banana</NativeSelectOption>
					<NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
				</NativeSelectOptGroup>
				<NativeSelectOptGroup label="Vegetables">
					<NativeSelectOption value="carrot">Carrot</NativeSelectOption>
					<NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
					<NativeSelectOption value="spinach">Spinach</NativeSelectOption>
				</NativeSelectOptGroup>
			</NativeSelect>
		</Field>
	),
};

export const Small: Story = {
	render: (args) => (
		<Field>
			<FieldLabel htmlFor="fruit-sm">Fruit</FieldLabel>
			<NativeSelect id="fruit-sm" size="sm" {...args}>
				<NativeSelectOption value="">Select a fruit</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
				<NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
			</NativeSelect>
		</Field>
	),
};

export const Invalid: Story = {
	render: (args) => (
		<Field data-invalid>
			<FieldLabel htmlFor="region">Region</FieldLabel>
			<NativeSelect id="region" aria-invalid {...args}>
				<NativeSelectOption value="">Select a region</NativeSelectOption>
				<NativeSelectOption value="emea">EMEA</NativeSelectOption>
				<NativeSelectOption value="apac">APAC</NativeSelectOption>
				<NativeSelectOption value="amer">Americas</NativeSelectOption>
			</NativeSelect>
			<FieldDescription>Choose the region for your account.</FieldDescription>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByLabelText("Region")).toHaveAttribute(
			"aria-invalid",
			"true",
		);
	},
};

export const Disabled: Story = {
	render: (args) => (
		<Field data-disabled>
			<FieldLabel htmlFor="plan">Plan</FieldLabel>
			<NativeSelect id="plan" disabled {...args}>
				<NativeSelectOption value="">Select a plan</NativeSelectOption>
				<NativeSelectOption value="free">Free</NativeSelectOption>
				<NativeSelectOption value="pro">Pro</NativeSelectOption>
			</NativeSelect>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByLabelText("Plan")).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<NativeSelect aria-label="Default">
				<NativeSelectOption value="">Select a fruit</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
			</NativeSelect>
			<NativeSelect size="sm" aria-label="Small">
				<NativeSelectOption value="">Select a fruit</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
			</NativeSelect>
			<NativeSelect aria-invalid aria-label="Invalid">
				<NativeSelectOption value="">Select a fruit</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
			</NativeSelect>
			<NativeSelect disabled aria-label="Disabled">
				<NativeSelectOption value="">Select a fruit</NativeSelectOption>
				<NativeSelectOption value="apple">Apple</NativeSelectOption>
				<NativeSelectOption value="banana">Banana</NativeSelectOption>
			</NativeSelect>
		</div>
	),
};

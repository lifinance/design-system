import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Field, FieldLabel } from "./field";
import { Slider } from "./slider";

const meta = {
	component: Slider,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A control for choosing a value, or a range of values, from a given interval. Install with `pnpm dlx shadcn@latest add @core/slider`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2785-10703",
		},
	},
	args: {
		onValueChange: fn(),
		onValueCommitted: fn(),
	},
	decorators: [
		(Story) => (
			<div className="w-72">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: 50,
		thumbLabels: ["Volume"],
	},
	play: async ({ canvas, userEvent, args }) => {
		const slider = canvas.getByRole("slider", { name: "Volume" });
		await expect(slider).toHaveAttribute("aria-valuenow", "50");

		slider.focus();
		await expect(slider).toHaveFocus();

		await userEvent.keyboard("{ArrowRight}");
		await expect(slider).toHaveAttribute("aria-valuenow", "51");
		await expect(args.onValueChange).toHaveBeenCalled();

		await userEvent.keyboard("{ArrowLeft}");
		await expect(slider).toHaveAttribute("aria-valuenow", "50");

		await userEvent.keyboard("{Home}");
		await expect(slider).toHaveAttribute("aria-valuenow", "0");

		await userEvent.keyboard("{End}");
		await expect(slider).toHaveAttribute("aria-valuenow", "100");

		await waitFor(() => expect(args.onValueCommitted).toHaveBeenCalled());
	},
};

export const WithLabel: Story = {
	render: (args) => (
		<Field>
			<FieldLabel id="slider-temperature-label" htmlFor="slider-temperature">
				Temperature
			</FieldLabel>
			<Slider
				id="slider-temperature"
				aria-labelledby="slider-temperature-label"
				defaultValue={40}
				{...args}
			/>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("slider", { name: "Temperature" }),
		).toHaveAttribute("aria-valuenow", "40");
	},
};

export const Range: Story = {
	args: {
		defaultValue: [25, 75],
		thumbLabels: ["Minimum price", "Maximum price"],
	},
	play: async ({ canvas, userEvent }) => {
		const min = canvas.getByRole("slider", { name: "Minimum price" });
		const max = canvas.getByRole("slider", { name: "Maximum price" });
		await expect(min).toHaveAttribute("aria-valuenow", "25");
		await expect(max).toHaveAttribute("aria-valuenow", "75");

		max.focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect(max).toHaveAttribute("aria-valuenow", "76");
	},
};

export const Steps: Story = {
	args: {
		defaultValue: 40,
		step: 10,
		thumbLabels: ["Brightness"],
	},
	play: async ({ canvas, userEvent }) => {
		const slider = canvas.getByRole("slider", { name: "Brightness" });
		slider.focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect(slider).toHaveAttribute("aria-valuenow", "50");
	},
};

export const Disabled: Story = {
	args: {
		defaultValue: 50,
		disabled: true,
		thumbLabels: ["Volume"],
	},
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("slider", { name: "Volume" })).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: (args) => (
		<div className="flex w-72 flex-col gap-8">
			<Slider defaultValue={50} thumbLabels={["Default"]} {...args} />
			<Slider
				defaultValue={[25, 75]}
				thumbLabels={["Range start", "Range end"]}
				{...args}
			/>
			<Slider defaultValue={40} step={10} thumbLabels={["Stepped"]} {...args} />
			<Slider defaultValue={50} disabled thumbLabels={["Disabled"]} {...args} />
		</div>
	),
};

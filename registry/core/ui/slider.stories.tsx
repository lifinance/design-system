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
	render: (args) => (
		<Field>
			<FieldLabel id="slider-volume-label" htmlFor="slider-volume">
				Volume
			</FieldLabel>
			<Slider
				id="slider-volume"
				aria-labelledby="slider-volume-label"
				defaultValue={50}
				{...args}
			/>
		</Field>
	),
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

export const Range: Story = {
	render: (args) => (
		<Field>
			<FieldLabel>Price range</FieldLabel>
			<Slider
				defaultValue={[25, 75]}
				thumbLabels={["Minimum price", "Maximum price"]}
				{...args}
			/>
		</Field>
	),
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
	render: (args) => (
		<Field>
			<FieldLabel id="slider-brightness-label" htmlFor="slider-brightness">
				Brightness
			</FieldLabel>
			<Slider
				id="slider-brightness"
				aria-labelledby="slider-brightness-label"
				defaultValue={40}
				step={10}
				{...args}
			/>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		const slider = canvas.getByRole("slider", { name: "Brightness" });
		slider.focus();
		await userEvent.keyboard("{ArrowRight}");
		await expect(slider).toHaveAttribute("aria-valuenow", "50");
	},
};

export const Disabled: Story = {
	render: (args) => (
		<Field>
			<FieldLabel id="slider-disabled-label" htmlFor="slider-disabled">
				Volume
			</FieldLabel>
			<Slider
				id="slider-disabled"
				aria-labelledby="slider-disabled-label"
				defaultValue={50}
				disabled
				{...args}
			/>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("slider", { name: "Volume" })).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: (args) => (
		<div className="flex w-72 flex-col gap-8">
			<Field>
				<FieldLabel id="slider-ov-default-label" htmlFor="slider-ov-default">
					Default
				</FieldLabel>
				<Slider
					id="slider-ov-default"
					aria-labelledby="slider-ov-default-label"
					defaultValue={50}
					{...args}
				/>
			</Field>
			<Field>
				<FieldLabel>Range</FieldLabel>
				<Slider
					defaultValue={[25, 75]}
					thumbLabels={["Range start", "Range end"]}
					{...args}
				/>
			</Field>
			<Field>
				<FieldLabel id="slider-ov-stepped-label" htmlFor="slider-ov-stepped">
					Stepped
				</FieldLabel>
				<Slider
					id="slider-ov-stepped"
					aria-labelledby="slider-ov-stepped-label"
					defaultValue={40}
					step={10}
					{...args}
				/>
			</Field>
			<Field>
				<FieldLabel id="slider-ov-disabled-label" htmlFor="slider-ov-disabled">
					Disabled
				</FieldLabel>
				<Slider
					id="slider-ov-disabled"
					aria-labelledby="slider-ov-disabled-label"
					defaultValue={50}
					disabled
					{...args}
				/>
			</Field>
		</div>
	),
};

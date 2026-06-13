import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./popover";

const meta = {
	component: Popover,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A floating panel anchored to a trigger, for secondary content and quick edits. Install with `pnpm dlx shadcn@latest add @core/popover`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-888",
		},
	},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Open popover
			</PopoverTrigger>
			<PopoverContent align="start">
				<PopoverHeader>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>
						Set the dimensions for the layer.
					</PopoverDescription>
				</PopoverHeader>
			</PopoverContent>
		</Popover>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /open popover/i }),
		);
		const popup = await screen.findByText("Dimensions");
		await waitFor(() => expect(popup).toBeVisible());
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByText("Dimensions")).not.toBeInTheDocument(),
		);
	},
};

export const WithForm: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Edit dimensions
			</PopoverTrigger>
			<PopoverContent className="w-64" align="start">
				<PopoverHeader>
					<PopoverTitle>Dimensions</PopoverTitle>
					<PopoverDescription>
						Set the dimensions for the layer.
					</PopoverDescription>
				</PopoverHeader>
				<FieldGroup className="gap-4">
					<Field orientation="horizontal">
						<FieldLabel htmlFor="width" className="w-1/2">
							Width
						</FieldLabel>
						<Input id="width" defaultValue="100%" />
					</Field>
					<Field orientation="horizontal">
						<FieldLabel htmlFor="height" className="w-1/2">
							Height
						</FieldLabel>
						<Input id="height" defaultValue="25px" />
					</Field>
				</FieldGroup>
			</PopoverContent>
		</Popover>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /edit dimensions/i }),
		);
		const width = await screen.findByLabelText(/width/i);
		await waitFor(() => expect(width).toBeVisible());
		await expect(width).toHaveValue("100%");
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByLabelText(/width/i)).not.toBeInTheDocument(),
		);
	},
};

export const Positioning: Story = {
	render: () => (
		<div className="flex gap-2">
			<Popover>
				<PopoverTrigger render={<Button variant="outline" size="sm" />}>
					Top
				</PopoverTrigger>
				<PopoverContent side="top" className="w-40">
					<PopoverTitle className="sr-only">Top</PopoverTitle>
					Anchored above the trigger.
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger render={<Button variant="outline" size="sm" />}>
					End
				</PopoverTrigger>
				<PopoverContent align="end" className="w-40">
					<PopoverTitle className="sr-only">End</PopoverTitle>
					Aligned to the trigger end.
				</PopoverContent>
			</Popover>
		</div>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /^top$/i }));
		const popup = await screen.findByText(/anchored above the trigger/i);
		await waitFor(() => expect(popup).toBeVisible());
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(
				screen.queryByText(/anchored above the trigger/i),
			).not.toBeInTheDocument(),
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col items-start gap-4">
			<Popover open>
				<PopoverTrigger render={<Button variant="outline" />}>
					Open popover
				</PopoverTrigger>
				<PopoverContent align="start">
					<PopoverHeader>
						<PopoverTitle>Dimensions</PopoverTitle>
						<PopoverDescription>
							Set the dimensions for the layer.
						</PopoverDescription>
					</PopoverHeader>
					<FieldGroup className="gap-4">
						<Field orientation="horizontal">
							<FieldLabel htmlFor="overview-width" className="w-1/2">
								Width
							</FieldLabel>
							<Input id="overview-width" defaultValue="100%" />
						</Field>
						<Field orientation="horizontal">
							<FieldLabel htmlFor="overview-height" className="w-1/2">
								Height
							</FieldLabel>
							<Input id="overview-height" defaultValue="25px" />
						</Field>
					</FieldGroup>
				</PopoverContent>
			</Popover>
		</div>
	),
};

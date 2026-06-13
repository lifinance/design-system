import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Checkbox } from "./checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "./field";

const meta = {
	component: Checkbox,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A control that toggles between checked and unchecked. Install with `pnpm dlx shadcn@latest add @core/checkbox`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=1-117",
		},
	},
	args: {
		"aria-label": "Accept terms and conditions",
		onCheckedChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent, args }) => {
		const checkbox = canvas.getByRole("checkbox", {
			name: /accept terms/i,
		});
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();
		await expect(args.onCheckedChange).toHaveBeenCalled();
	},
};

export const WithLabel: Story = {
	render: () => (
		<Field orientation="horizontal">
			<Checkbox id="terms" />
			<FieldLabel htmlFor="terms">Accept terms and conditions</FieldLabel>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Accept terms and conditions"));
		await expect(canvas.getByRole("checkbox")).toBeChecked();
	},
};

export const WithDescription: Story = {
	render: () => (
		<Field orientation="horizontal" className="w-80">
			<Checkbox id="newsletter" defaultChecked />
			<FieldContent>
				<FieldLabel htmlFor="newsletter">Email notifications</FieldLabel>
				<FieldDescription>
					Receive a summary of account activity every week.
				</FieldDescription>
			</FieldContent>
		</Field>
	),
};

export const Card: Story = {
	render: () => (
		<FieldLabel htmlFor="backups" className="w-80">
			<Field orientation="horizontal">
				<Checkbox id="backups" defaultChecked />
				<FieldContent>
					<FieldTitle>Automatic backups</FieldTitle>
					<FieldDescription>
						Back up your data once a day. Restore a backup from settings.
					</FieldDescription>
				</FieldContent>
			</Field>
		</FieldLabel>
	),
};

export const Disabled: Story = {
	args: { disabled: true },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("checkbox")).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	},
};

export const Invalid: Story = {
	args: { "aria-invalid": true },
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Checkbox aria-label="Unchecked" />
				<Checkbox aria-label="Checked" defaultChecked />
				<Checkbox aria-label="Invalid" aria-invalid />
				<Checkbox aria-label="Disabled" disabled />
				<Checkbox aria-label="Disabled checked" disabled defaultChecked />
			</div>
			<Field orientation="horizontal">
				<Checkbox id="overview-terms" />
				<FieldLabel htmlFor="overview-terms">
					Accept terms and conditions
				</FieldLabel>
			</Field>
			<FieldLabel htmlFor="overview-backups" className="w-80">
				<Field orientation="horizontal">
					<Checkbox id="overview-backups" defaultChecked />
					<FieldContent>
						<FieldTitle>Automatic backups</FieldTitle>
						<FieldDescription>Back up your data once a day.</FieldDescription>
					</FieldContent>
				</Field>
			</FieldLabel>
		</div>
	),
};

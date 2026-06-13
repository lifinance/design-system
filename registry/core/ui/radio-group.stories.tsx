import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "./field";
import { RadioGroup, RadioGroupItem } from "./radio-group";

const meta = {
	component: RadioGroup,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A set of radio buttons where selecting one clears the rest. Install with `pnpm dlx shadcn@latest add @core/radio-group`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2780-51105",
		},
	},
	args: {
		onValueChange: fn(),
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<FieldSet>
			<FieldLegend id="density-legend">Density</FieldLegend>
			<RadioGroup
				defaultValue="comfortable"
				aria-labelledby="density-legend"
				{...args}
			>
				<Field orientation="horizontal">
					<RadioGroupItem value="default" id="density-default" />
					<FieldLabel htmlFor="density-default" className="font-normal">
						Default
					</FieldLabel>
				</Field>
				<Field orientation="horizontal">
					<RadioGroupItem value="comfortable" id="density-comfortable" />
					<FieldLabel htmlFor="density-comfortable" className="font-normal">
						Comfortable
					</FieldLabel>
				</Field>
				<Field orientation="horizontal">
					<RadioGroupItem value="compact" id="density-compact" />
					<FieldLabel htmlFor="density-compact" className="font-normal">
						Compact
					</FieldLabel>
				</Field>
			</RadioGroup>
		</FieldSet>
	),
	play: async ({ canvas, userEvent, args }) => {
		const group = canvas.getByRole("radiogroup", { name: "Density" });
		await expect(group).toBeInTheDocument();

		const comfortable = canvas.getByRole("radio", { name: "Comfortable" });
		const compact = canvas.getByRole("radio", { name: "Compact" });
		await expect(comfortable).toHaveAttribute("aria-checked", "true");

		comfortable.focus();
		await waitFor(() => expect(comfortable).toHaveFocus());

		await userEvent.keyboard("{ArrowDown}");
		await expect(compact).toHaveFocus();
		await expect(compact).toHaveAttribute("aria-checked", "true");
		await expect(comfortable).toHaveAttribute("aria-checked", "false");
		await expect(args.onValueChange).toHaveBeenCalledWith(
			"compact",
			expect.anything(),
		);

		await userEvent.keyboard("{ArrowUp}");
		await expect(comfortable).toHaveFocus();
		await expect(comfortable).toHaveAttribute("aria-checked", "true");
	},
};

export const WithDescriptions: Story = {
	render: (args) => (
		<RadioGroup defaultValue="pro" aria-label="Subscription plan" {...args}>
			<FieldLabel htmlFor="plan-plus">
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Plus</FieldTitle>
						<FieldDescription>
							For individuals and small teams.
						</FieldDescription>
					</FieldContent>
					<RadioGroupItem value="plus" id="plan-plus" />
				</Field>
			</FieldLabel>
			<FieldLabel htmlFor="plan-pro">
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Pro</FieldTitle>
						<FieldDescription>For growing businesses.</FieldDescription>
					</FieldContent>
					<RadioGroupItem value="pro" id="plan-pro" />
				</Field>
			</FieldLabel>
			<FieldLabel htmlFor="plan-enterprise">
				<Field orientation="horizontal">
					<FieldContent>
						<FieldTitle>Enterprise</FieldTitle>
						<FieldDescription>
							For large teams and organizations.
						</FieldDescription>
					</FieldContent>
					<RadioGroupItem value="enterprise" id="plan-enterprise" />
				</Field>
			</FieldLabel>
		</RadioGroup>
	),
};

export const Disabled: Story = {
	render: (args) => (
		<FieldSet>
			<FieldLegend id="battery-legend">Battery level</FieldLegend>
			<RadioGroup
				defaultValue="medium"
				disabled
				aria-labelledby="battery-legend"
				{...args}
			>
				<Field orientation="horizontal">
					<RadioGroupItem value="high" id="battery-high" />
					<FieldLabel htmlFor="battery-high" className="font-normal">
						High
					</FieldLabel>
				</Field>
				<Field orientation="horizontal">
					<RadioGroupItem value="medium" id="battery-medium" />
					<FieldLabel htmlFor="battery-medium" className="font-normal">
						Medium
					</FieldLabel>
				</Field>
			</RadioGroup>
		</FieldSet>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("radio", { name: "Medium" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	},
};

export const Invalid: Story = {
	render: (args) => (
		<FieldSet>
			<FieldLegend id="notify-legend">Notification preference</FieldLegend>
			<FieldDescription>Choose how you receive notifications.</FieldDescription>
			<RadioGroup
				defaultValue="email"
				aria-labelledby="notify-legend"
				{...args}
			>
				<Field orientation="horizontal" data-invalid>
					<RadioGroupItem value="email" id="notify-email" aria-invalid />
					<FieldLabel htmlFor="notify-email" className="font-normal">
						Email only
					</FieldLabel>
				</Field>
				<Field orientation="horizontal" data-invalid>
					<RadioGroupItem value="sms" id="notify-sms" aria-invalid />
					<FieldLabel htmlFor="notify-sms" className="font-normal">
						SMS only
					</FieldLabel>
				</Field>
			</RadioGroup>
		</FieldSet>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-6">
			<FieldSet>
				<FieldLegend id="overview-density-legend">Density</FieldLegend>
				<RadioGroup
					defaultValue="comfortable"
					aria-labelledby="overview-density-legend"
				>
					<Field orientation="horizontal">
						<RadioGroupItem value="default" id="overview-default" />
						<FieldLabel htmlFor="overview-default" className="font-normal">
							Default
						</FieldLabel>
					</Field>
					<Field orientation="horizontal">
						<RadioGroupItem value="comfortable" id="overview-comfortable" />
						<FieldLabel htmlFor="overview-comfortable" className="font-normal">
							Comfortable
						</FieldLabel>
					</Field>
				</RadioGroup>
			</FieldSet>
			<FieldSet>
				<FieldLegend>States</FieldLegend>
				<div className="flex items-center gap-4">
					<RadioGroup
						defaultValue="checked"
						aria-label="Editable states"
						className="flex gap-4"
					>
						<RadioGroupItem value="unchecked" aria-label="Unchecked" />
						<RadioGroupItem value="checked" aria-label="Checked" />
						<RadioGroupItem value="invalid" aria-label="Invalid" aria-invalid />
					</RadioGroup>
					<RadioGroup
						defaultValue="on"
						disabled
						aria-label="Disabled states"
						className="flex gap-4"
					>
						<RadioGroupItem value="off" aria-label="Disabled" />
						<RadioGroupItem value="on" aria-label="Disabled checked" />
					</RadioGroup>
				</div>
			</FieldSet>
		</div>
	),
};

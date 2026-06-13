import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "./field";
import { Input } from "./input";

const meta = {
	component: Field,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A form field that pairs a control with its label, description, and error message. Install with `pnpm dlx shadcn@latest add @core/field`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33541-69574",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Field>
			<FieldLabel htmlFor="email">Email address</FieldLabel>
			<Input id="email" type="email" placeholder="name@example.com" />
			<FieldDescription>
				Account notifications go to this address.
			</FieldDescription>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Email address"));
		await expect(canvas.getByPlaceholderText("name@example.com")).toHaveFocus();
	},
};

export const Invalid: Story = {
	render: () => (
		<Field data-invalid>
			<FieldLabel htmlFor="invalid-email">Email address</FieldLabel>
			<Input
				id="invalid-email"
				type="email"
				defaultValue="name@example"
				aria-invalid
			/>
			<FieldError>Enter a valid email address.</FieldError>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("alert")).toHaveTextContent(
			"Enter a valid email address.",
		);
	},
};

export const Horizontal: Story = {
	render: () => (
		<Field orientation="horizontal">
			<Checkbox id="marketing" />
			<FieldContent>
				<FieldLabel htmlFor="marketing">Marketing emails</FieldLabel>
				<FieldDescription>
					Product updates and feature announcements.
				</FieldDescription>
			</FieldContent>
		</Field>
	),
};

export const Fieldset: Story = {
	render: () => (
		<FieldSet>
			<FieldLegend>Notifications</FieldLegend>
			<FieldDescription>
				Choose how you want to hear about account activity.
			</FieldDescription>
			<FieldGroup>
				<Field orientation="horizontal">
					<Checkbox id="notify-email" defaultChecked />
					<FieldLabel htmlFor="notify-email">Email</FieldLabel>
				</Field>
				<Field orientation="horizontal">
					<Checkbox id="notify-sms" />
					<FieldLabel htmlFor="notify-sms">Text message</FieldLabel>
				</Field>
			</FieldGroup>
		</FieldSet>
	),
};

export const WithSeparator: Story = {
	render: () => (
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor="separator-email">Email address</FieldLabel>
				<Input
					id="separator-email"
					type="email"
					placeholder="name@example.com"
				/>
			</Field>
			<Field>
				<Button>Continue</Button>
			</Field>
			<FieldSeparator>Or</FieldSeparator>
			<Field>
				<Button variant="outline">Continue with SSO</Button>
			</Field>
		</FieldGroup>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("separator")).toHaveStyle({
			height: "1px",
		});
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<FieldGroup>
			<Field>
				<FieldLabel htmlFor="overview-email">Email address</FieldLabel>
				<Input
					id="overview-email"
					type="email"
					placeholder="name@example.com"
				/>
				<FieldDescription>
					Account notifications go to this address.
				</FieldDescription>
			</Field>
			<Field data-invalid>
				<FieldLabel htmlFor="overview-username">Username</FieldLabel>
				<Input id="overview-username" defaultValue="sarah chen" aria-invalid />
				<FieldError>Usernames cannot contain spaces.</FieldError>
			</Field>
			<FieldSeparator>Preferences</FieldSeparator>
			<Field orientation="horizontal">
				<Checkbox id="overview-marketing" defaultChecked />
				<FieldContent>
					<FieldLabel htmlFor="overview-marketing">Marketing emails</FieldLabel>
					<FieldDescription>
						Product updates and feature announcements.
					</FieldDescription>
				</FieldContent>
			</Field>
		</FieldGroup>
	),
};

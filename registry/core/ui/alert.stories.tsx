import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleAlertIcon } from "lucide-react";
import { snapshot } from "@/.storybook/modes";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";

const meta = {
	component: Alert,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A callout that highlights a status, warning, or error. Install with `pnpm dlx shadcn@latest add @core/alert`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=152-2375",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-lg">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Your changes have been saved.</AlertTitle>
		</Alert>
	),
};

export const WithDescription: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Your changes have been saved.</AlertTitle>
			<AlertDescription>
				The updated settings sync to all of your devices.
			</AlertDescription>
		</Alert>
	),
};

export const DescriptionOnly: Story = {
	render: () => (
		<Alert>
			<AlertDescription>
				Verification can take up to two business days.
			</AlertDescription>
		</Alert>
	),
};

export const WithIcon: Story = {
	render: () => (
		<Alert>
			<CircleAlertIcon />
			<AlertTitle>Your payment method expires soon.</AlertTitle>
			<AlertDescription>
				<a href="#billing">Update your card details</a> to avoid an interruption
				in service.
			</AlertDescription>
		</Alert>
	),
};

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive">
			<CircleAlertIcon />
			<AlertTitle>Unable to process your payment.</AlertTitle>
			<AlertDescription>
				<p>
					Verify your <a href="#billing">billing information</a> and try again.
				</p>
				<ul className="list-inside list-disc">
					<li>Check your card details</li>
					<li>Ensure sufficient funds</li>
					<li>Verify billing address</li>
				</ul>
			</AlertDescription>
		</Alert>
	),
};

export const WithAction: Story = {
	render: () => (
		<Alert>
			<CircleAlertIcon />
			<AlertTitle>The selected messages have been archived.</AlertTitle>
			<AlertAction>
				<Button size="xs">Undo</Button>
			</AlertAction>
		</Alert>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<Alert>
				<AlertTitle>Your changes have been saved.</AlertTitle>
			</Alert>
			<Alert>
				<AlertDescription>
					Verification can take up to two business days.
				</AlertDescription>
			</Alert>
			<Alert>
				<CircleAlertIcon />
				<AlertTitle>Your payment method expires soon.</AlertTitle>
				<AlertDescription>
					Update your card details to avoid an interruption in service.
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<AlertTitle>Unable to process your payment.</AlertTitle>
			</Alert>
			<Alert variant="destructive">
				<CircleAlertIcon />
				<AlertTitle>Unable to process your payment.</AlertTitle>
				<AlertDescription>
					Verify your billing information and try again.
				</AlertDescription>
			</Alert>
			<Alert>
				<CircleAlertIcon />
				<AlertTitle>The selected messages have been archived.</AlertTitle>
				<AlertAction>
					<Button size="xs">Undo</Button>
				</AlertAction>
			</Alert>
		</div>
	),
};

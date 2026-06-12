import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./card";

const meta = {
	component: Card,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A surface that groups related content, with optional header, content, and footer regions. Install with `pnpm dlx shadcn@latest add @core/card`.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Transaction settings</CardTitle>
				<CardDescription>Set slippage and gas preferences.</CardDescription>
			</CardHeader>
			<CardContent className="text-sm text-muted-foreground">
				Changes apply to every route in this session.
			</CardContent>
			<CardFooter>
				<Button>Save</Button>
			</CardFooter>
		</Card>
	),
};

export const WithAction: Story = {
	render: () => (
		<Card>
			<CardHeader>
				<CardTitle>Connected wallet</CardTitle>
				<CardDescription>0x1a2b...9f3c</CardDescription>
				<CardAction>
					<Button variant="outline" size="sm">
						Disconnect
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<Card>
				<CardHeader>
					<CardTitle>Transaction settings</CardTitle>
					<CardDescription>Set slippage and gas preferences.</CardDescription>
				</CardHeader>
				<CardContent className="text-sm text-muted-foreground">
					Changes apply to every route in this session.
				</CardContent>
				<CardFooter>
					<Button>Save</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Connected wallet</CardTitle>
					<CardDescription>0x1a2b...9f3c</CardDescription>
					<CardAction>
						<Button variant="outline" size="sm">
							Disconnect
						</Button>
					</CardAction>
				</CardHeader>
			</Card>
		</div>
	),
};

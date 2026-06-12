import type { Meta, StoryObj } from "@storybook/react-vite";
import { snapshot } from "@/.storybook/modes";
import { Separator } from "./separator";

const meta = {
	component: Separator,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A thin rule that divides content along a horizontal or vertical axis. Install with `pnpm dlx shadcn@latest add @core/separator`.",
			},
		},
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="w-64">
			<div className="flex flex-col gap-1">
				<h4 className="text-sm font-medium leading-none">Settings</h4>
				<p className="text-sm text-muted-foreground">
					Manage your account preferences.
				</p>
			</div>
			<Separator className="my-4" />
			<div className="flex h-5 items-center gap-4 text-sm">
				<span>Profile</span>
				<Separator orientation="vertical" />
				<span>Account</span>
				<Separator orientation="vertical" />
				<span>Billing</span>
			</div>
		</div>
	),
};

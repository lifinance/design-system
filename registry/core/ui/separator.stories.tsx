import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2753-10017",
		},
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

// Measures a style class against the live cascade, on a probe inside a flex row
// that has no height of its own.
function ruleHeight(className: string, within: HTMLElement) {
	const row = document.createElement("div");
	row.className = "flex";
	row.textContent = "Profile";
	const probe = document.createElement("div");
	probe.className = className;
	row.append(probe);
	within.append(row);
	const { height } = getComputedStyle(probe);
	row.remove();
	return Number.parseFloat(height);
}

export const Vertical: Story = {
	render: () => (
		<div className="flex gap-4 text-sm">
			<span>Profile</span>
			<Separator orientation="vertical" />
			<span>Account</span>
		</div>
	),
	play: async ({ canvas, canvasElement }) => {
		const separator = canvas.getByRole("separator");
		const { height } = getComputedStyle(separator);
		await expect(Number.parseFloat(height)).toBeGreaterThan(0);
		await expect(
			ruleHeight("cn-separator-vertical", canvasElement),
		).toBeGreaterThan(0);
	},
};

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

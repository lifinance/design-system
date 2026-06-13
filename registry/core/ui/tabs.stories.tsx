import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
	component: Tabs,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A set of layered panels where one shows at a time, switched by a row of tabs. Install with `pnpm dlx shadcn@latest add @core/tabs`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101485-143347",
		},
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const PANEL_CLASS = "rounded-lg border p-4";

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="account" className="w-96">
			<TabsList aria-label="Account settings">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="notifications">Notifications</TabsTrigger>
			</TabsList>
			<div className={PANEL_CLASS}>
				<TabsContent value="account">
					Manage your account preferences and profile information.
				</TabsContent>
				<TabsContent value="password">
					Update your password to keep your account secure.
				</TabsContent>
				<TabsContent value="notifications">
					Configure how you receive notifications and alerts.
				</TabsContent>
			</div>
		</Tabs>
	),
	play: async ({ canvas, userEvent }) => {
		const tabs = canvas.getAllByRole("tab");
		await expect(tabs).toHaveLength(3);

		// The selected tab points at the visible panel; the panel points back.
		const account = canvas.getByRole("tab", { name: "Account" });
		await expect(account).toHaveAttribute("aria-selected", "true");
		const accountPanel = canvas.getByRole("tabpanel");
		await expect(account).toHaveAttribute("aria-controls", accountPanel.id);
		await expect(accountPanel).toHaveAttribute("aria-labelledby", account.id);

		// Clicking a tab flips selection and swaps the visible panel.
		const password = canvas.getByRole("tab", { name: "Password" });
		await userEvent.click(password);
		await expect(password).toHaveAttribute("aria-selected", "true");
		await expect(account).toHaveAttribute("aria-selected", "false");
		await waitFor(() =>
			expect(canvas.getByRole("tabpanel")).toHaveAccessibleName("Password"),
		);

		// Keyboard: arrows move roving focus, Enter activates (manual model).
		password.focus();
		await userEvent.keyboard("{ArrowRight}");
		const notifications = canvas.getByRole("tab", { name: "Notifications" });
		await expect(notifications).toHaveFocus();
		await userEvent.keyboard("{Enter}");
		await expect(notifications).toHaveAttribute("aria-selected", "true");

		// Home and End jump to the first and last tab.
		await userEvent.keyboard("{Home}");
		await expect(account).toHaveFocus();
		await userEvent.keyboard("{End}");
		await expect(notifications).toHaveFocus();
	},
};

export const Line: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-96">
			<TabsList variant="line" aria-label="Project views">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="reports">Reports</TabsTrigger>
			</TabsList>
			<div className={PANEL_CLASS}>
				<TabsContent value="overview">
					View your dashboard metrics and key performance indicators.
				</TabsContent>
				<TabsContent value="analytics">
					Detailed analytics and insights about your data.
				</TabsContent>
				<TabsContent value="reports">
					Generate and view custom reports.
				</TabsContent>
			</div>
		</Tabs>
	),
};

export const Disabled: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-96">
			<TabsList aria-label="Project views">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="reports" disabled>
					Reports
				</TabsTrigger>
			</TabsList>
		</Tabs>
	),
	play: async ({ canvas }) => {
		const reports = canvas.getByRole("tab", { name: "Reports" });
		await expect(reports).toHaveAttribute("aria-disabled", "true");
	},
};

export const Vertical: Story = {
	render: () => (
		<Tabs defaultValue="account" orientation="vertical" className="w-[28rem]">
			<TabsList aria-label="Account settings">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="notifications">Notifications</TabsTrigger>
			</TabsList>
			<div className={PANEL_CLASS}>
				<TabsContent value="account">
					Manage your account preferences and profile information.
				</TabsContent>
				<TabsContent value="password">
					Update your password to keep your account secure.
				</TabsContent>
				<TabsContent value="notifications">
					Configure how you receive notifications and alerts.
				</TabsContent>
			</div>
		</Tabs>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-6">
			<Tabs defaultValue="account" className="w-96">
				<TabsList aria-label="Default tabs">
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
					<TabsTrigger value="notifications" disabled>
						Notifications
					</TabsTrigger>
				</TabsList>
			</Tabs>
			<Tabs defaultValue="overview" className="w-96">
				<TabsList variant="line" aria-label="Line tabs">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	),
};

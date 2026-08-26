import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { hover } from "@/.storybook/interactions";
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

// A token resolves to a different color in each theme and mode, so read the
// expected color from the live cascade instead of a literal.
function tokenColor(
	utility: string,
	property: "backgroundColor" | "color",
	within: HTMLElement,
): string {
	const probe = document.createElement("span");
	probe.className = utility;
	within.append(probe);
	const value = getComputedStyle(probe)[property];
	probe.remove();
	return value;
}

// Reads the box shadow a utility renders, by probing it directly rather
// than depending on a real focus-visible state.
function boxShadowOf(utility: string, within: HTMLElement) {
	const probe = document.createElement("span");
	probe.className = utility;
	within.append(probe);
	const { boxShadow } = getComputedStyle(probe);
	probe.remove();
	return boxShadow;
}

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
	play: async ({ canvas, canvasElement, userEvent }) => {
		const tabs = canvas.getAllByRole("tab");
		await expect(tabs).toHaveLength(3);

		const tabList = canvas.getByRole("tablist");
		await expect(getComputedStyle(tabList).paddingTop).toBe("3px");
		await expect(boxShadowOf("ring-3", canvasElement)).toContain(
			"0px 0px 0px 3px",
		);

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
	play: async ({ canvas, canvasElement }) => {
		const active = canvas.getByRole("tab", { name: "Overview" });
		const inactive = canvas.getByRole("tab", { name: "Analytics" });
		const foreground = tokenColor("text-foreground", "color", canvasElement);
		const muted = tokenColor("text-muted-foreground", "color", canvasElement);

		// The variant-scoped utilities carry the color, so pin them by name.
		await expect(inactive).toHaveClass(
			"group-data-[variant=line]/tabs-list:text-muted-foreground",
		);
		await expect(active).toHaveClass(
			"group-data-[variant=line]/tabs-list:data-active:text-foreground",
		);

		await expect(getComputedStyle(inactive).color).toBe(muted);
		await expect(getComputedStyle(active).color).toBe(foreground);
	},
};

// The tags keep this test-only story out of the sidebar and the docs page.
export const HoverPaintsAnInactiveLineTrigger: Story = {
	tags: ["!autodocs", "!dev"],
	render: () => (
		<Tabs defaultValue="overview" className="w-96">
			<TabsList variant="line" aria-label="Project views">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
			</TabsList>
		</Tabs>
	),
	play: async ({ canvas, canvasElement }) => {
		const inactive = canvas.getByRole("tab", { name: "Analytics" });
		const foreground = tokenColor("text-foreground", "color", canvasElement);
		await expect(getComputedStyle(inactive).color).not.toBe(foreground);

		await hover(inactive);
		await waitFor(() =>
			expect(getComputedStyle(inactive).color).toBe(foreground),
		);
	},
};

export const Pill: Story = {
	render: () => (
		<Tabs defaultValue="overview" className="w-96">
			<TabsList variant="pill" aria-label="Project views">
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
	play: async ({ canvas, canvasElement }) => {
		const active = canvas.getByRole("tab", { name: "Overview" });
		const inactive = canvas.getByRole("tab", { name: "Analytics" });
		const foreground = tokenColor("text-foreground", "color", canvasElement);
		const muted = tokenColor("text-muted-foreground", "color", canvasElement);
		const activeBackground = tokenColor(
			"bg-foreground/10",
			"backgroundColor",
			canvasElement,
		);
		const inactiveBackground = tokenColor(
			"bg-input/30",
			"backgroundColor",
			canvasElement,
		);

		// The variant-scoped utilities carry the color, so pin them by name.
		await expect(inactive).toHaveClass(
			"group-data-[variant=pill]/tabs-list:text-muted-foreground",
		);
		await expect(active).toHaveClass(
			"group-data-[variant=pill]/tabs-list:data-active:text-foreground",
		);

		await expect(getComputedStyle(inactive).color).toBe(muted);
		await expect(getComputedStyle(active).color).toBe(foreground);
		await expect(getComputedStyle(inactive).backgroundColor).toBe(
			inactiveBackground,
		);
		await expect(getComputedStyle(active).backgroundColor).toBe(
			activeBackground,
		);
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			{(["xs", "default", "sm"] as const).map((size) => (
				<Tabs key={size} defaultValue="overview" className="w-96">
					<TabsList variant="pill" size={size} aria-label={`${size} tabs`}>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="analytics">Analytics</TabsTrigger>
						<TabsTrigger value="reports">Reports</TabsTrigger>
					</TabsList>
				</Tabs>
			))}
		</div>
	),
	play: async ({ canvas }) => {
		const heights = canvas
			.getAllByRole("tablist")
			.map((list) => getComputedStyle(list).height);
		await expect(heights).toEqual(["24px", "32px", "36px"]);
	},
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
			<Tabs defaultValue="overview" className="w-96">
				<TabsList variant="pill" aria-label="Pill tabs">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>
			</Tabs>
		</div>
	),
};

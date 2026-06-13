import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	BookOpenIcon,
	CalendarIcon,
	HomeIcon,
	InboxIcon,
	SearchIcon,
	SettingsIcon,
} from "lucide-react";
import type * as React from "react";
import { expect, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from "./sidebar";

const meta = {
	component: Sidebar,
	tags: ["ai-generated"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A collapsible navigation panel for the side of an application, with menus, groups, and a content area. Install with `pnpm dlx shadcn@latest add @core/sidebar`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=6870-3930",
		},
	},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
	{ title: "Home", icon: HomeIcon, isActive: true },
	{ title: "Inbox", icon: InboxIcon, badge: "12" },
	{ title: "Calendar", icon: CalendarIcon },
	{ title: "Search", icon: SearchIcon },
];

const docsItems = ["Installation", "Project structure", "Routing", "Styling"];

function AppSidebar(
	props: Omit<React.ComponentProps<typeof Sidebar>, "children">,
) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<BookOpenIcon />
							<span>Documentation</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarInput placeholder="Search the docs" aria-label="Search" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										isActive={item.isActive}
										tooltip={item.title}
									>
										<item.icon />
										<span>{item.title}</span>
									</SidebarMenuButton>
									{item.badge ? (
										<SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
									) : null}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarSeparator />
				<SidebarGroup>
					<SidebarGroupLabel>Getting started</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton tooltip="Guides">
									<BookOpenIcon />
									<span>Guides</span>
								</SidebarMenuButton>
								<SidebarMenuSub>
									{docsItems.map((title) => (
										<SidebarMenuSubItem key={title}>
											<SidebarMenuSubButton href="#guides">
												{title}
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Settings">
							<SettingsIcon />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

export const Default: Story = {
	render: () => (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-12 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<span className="text-sm font-medium">Documentation</span>
				</header>
				<div className="p-4 text-sm text-muted-foreground">
					Select an item from the sidebar to get started.
				</div>
			</SidebarInset>
		</SidebarProvider>
	),
};

export const Collapsible: Story = {
	render: () => (
		<SidebarProvider>
			<AppSidebar collapsible="icon" />
			<SidebarInset>
				<header className="flex h-12 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<span className="text-sm font-medium">Documentation</span>
				</header>
			</SidebarInset>
		</SidebarProvider>
	),
	play: async ({ canvas, canvasElement, userEvent }) => {
		const trigger = canvasElement.querySelector<HTMLButtonElement>(
			'[data-slot="sidebar-trigger"]',
		);
		await expect(trigger).not.toBeNull();
		const sidebar = canvas.getByText("Platform").closest("[data-state]");
		await expect(sidebar).toHaveAttribute("data-state", "expanded");
		if (!trigger) return;
		await userEvent.click(trigger);
		await waitFor(() =>
			expect(sidebar).toHaveAttribute("data-state", "collapsed"),
		);
		await userEvent.click(trigger);
		await waitFor(() =>
			expect(sidebar).toHaveAttribute("data-state", "expanded"),
		);
	},
};

export const Floating: Story = {
	render: () => (
		<SidebarProvider>
			<AppSidebar variant="floating" />
			<SidebarInset>
				<header className="flex h-12 items-center gap-2 px-4">
					<SidebarTrigger />
					<span className="text-sm font-medium">Documentation</span>
				</header>
			</SidebarInset>
		</SidebarProvider>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-12 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					<span className="text-sm font-medium">Documentation</span>
				</header>
				<div className="p-4 text-sm text-muted-foreground">
					Select an item from the sidebar to get started.
				</div>
			</SidebarInset>
		</SidebarProvider>
	),
};

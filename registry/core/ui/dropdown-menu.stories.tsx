import {
	RiBankCardLine,
	RiLogoutBoxLine,
	RiNotification3Line,
	RiSettings3Line,
	RiUserLine,
} from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, screen, waitFor } from "storybook/test";
import {
	pressUntil,
	waitForFocusWithin,
	withDelayedKeyboardHandover,
} from "@/.storybook/interactions";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./dropdown-menu";

const meta = {
	component: DropdownMenu,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A menu of actions and options that opens from a button. Install with `pnpm dlx shadcn@latest add @core/dropdown-menu`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=4-6588",
		},
	},
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { onOpenChange: fn() },
	render: (args) => (
		<DropdownMenu {...args}>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open menu
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>My account</DropdownMenuLabel>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	play: async ({ canvas, userEvent, args }) => {
		const trigger = canvas.getByRole("button", { name: /open menu/i });
		await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
		await expect(trigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.click(trigger);
		const menu = await screen.findByRole("menu");
		await waitFor(() => expect(menu).toBeVisible());
		await waitForFocusWithin(menu);
		await expect(trigger).toHaveAttribute("aria-expanded", "true");
		await expect(args.onOpenChange).toHaveBeenCalled();

		await expect(screen.getByRole("menuitem", { name: "API" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);

		await pressUntil(userEvent, "{Escape}", () =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
	},
};

export const DefaultWithDelayedHandover: Story = {
	...Default,
	tags: ["!autodocs"],
	play: withDelayedKeyboardHandover(Default.play),
};

export const WithIcons: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Account
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<RiUserLine />
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem>
					<RiBankCardLine />
					Billing
				</DropdownMenuItem>
				<DropdownMenuItem>
					<RiSettings3Line />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<RiLogoutBoxLine />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const WithShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuLabel>My account</DropdownMenuLabel>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const Checkboxes: Story = {
	render: function CheckboxesStory() {
		const [showStatusBar, setShowStatusBar] = React.useState(true);
		const [showActivityBar, setShowActivityBar] = React.useState(false);

		return (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Appearance
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-44">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Panels</DropdownMenuLabel>
						<DropdownMenuCheckboxItem
							checked={showStatusBar}
							onCheckedChange={setShowStatusBar}
						>
							Status bar
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={showActivityBar}
							onCheckedChange={setShowActivityBar}
							disabled
						>
							Activity bar
						</DropdownMenuCheckboxItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /appearance/i });
		await userEvent.click(trigger);
		await waitFor(() => expect(screen.getByRole("menu")).toBeVisible());

		const statusBar = screen.getByRole("menuitemcheckbox", {
			name: "Status bar",
		});
		await expect(statusBar).toHaveAttribute("aria-checked", "true");
		await expect(
			screen.getByRole("menuitemcheckbox", { name: "Activity bar" }),
		).toHaveAttribute("aria-disabled", "true");

		await userEvent.click(statusBar);
		await waitFor(() =>
			expect(
				screen.getByRole("menuitemcheckbox", { name: "Status bar" }),
			).toHaveAttribute("aria-checked", "false"),
		);
	},
};

export const RadioGroup: Story = {
	render: function RadioGroupStory() {
		const [position, setPosition] = React.useState("bottom");

		return (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Panel position
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-44">
					<DropdownMenuGroup>
						<DropdownMenuLabel>Position</DropdownMenuLabel>
						<DropdownMenuRadioGroup
							value={position}
							onValueChange={setPosition}
						>
							<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="bottom">
								Bottom
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /panel position/i });
		await userEvent.click(trigger);
		await waitFor(() => expect(screen.getByRole("menu")).toBeVisible());

		await expect(
			screen.getByRole("menuitemradio", { name: "Bottom" }),
		).toHaveAttribute("aria-checked", "true");

		await userEvent.click(screen.getByRole("menuitemradio", { name: "Top" }));
		await waitFor(() =>
			expect(
				screen.getByRole("menuitemradio", { name: "Top" }),
			).toHaveAttribute("aria-checked", "true"),
		);
		await expect(
			screen.getByRole("menuitemradio", { name: "Bottom" }),
		).toHaveAttribute("aria-checked", "false");
	},
};

export const Submenu: Story = {
	render: function SubmenuStory() {
		const [notify, setNotify] = React.useState(true);

		return (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Team
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-44">
					<DropdownMenuGroup>
						<DropdownMenuItem>Members</DropdownMenuItem>
						<DropdownMenuCheckboxItem
							checked={notify}
							onCheckedChange={setNotify}
						>
							Notifications
						</DropdownMenuCheckboxItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Email</DropdownMenuItem>
									<DropdownMenuItem>Message</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	},
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /^team$/i });
		trigger.focus();

		await userEvent.keyboard("{Enter}");
		const menu = await screen.findByRole("menu");
		await waitFor(() => expect(menu).toBeVisible());
		await waitForFocusWithin(menu);

		const checkbox = screen.getByRole("menuitemcheckbox", {
			name: "Notifications",
		});
		await expect(checkbox).toHaveAttribute("aria-checked", "true");

		const subTrigger = screen.getByRole("menuitem", { name: /invite users/i });
		await expect(subTrigger).toHaveAttribute("aria-haspopup", "menu");
		await expect(subTrigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.hover(subTrigger);
		await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(2));
		await expect(subTrigger).toHaveAttribute("aria-expanded", "true");
		await expect(screen.getByRole("menuitem", { name: "Email" })).toBeVisible();

		await userEvent.click(checkbox);
		await waitFor(() =>
			expect(
				screen.getByRole("menuitemcheckbox", { name: "Notifications" }),
			).toHaveAttribute("aria-checked", "false"),
		);

		await pressUntil(userEvent, "{Escape}", () =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
	},
};

export const SubmenuWithDelayedHandover: Story = {
	...Submenu,
	tags: ["!autodocs"],
	play: withDelayedKeyboardHandover(Submenu.play),
};

export const WithAvatar: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Sarah Chen
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-56">
				<DropdownMenuLabel>sarah@example.com</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<RiUserLine />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem>
						<RiNotification3Line />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<RiLogoutBoxLine />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<DropdownMenu defaultOpen>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Menu
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>My account</DropdownMenuLabel>
					<DropdownMenuItem>
						<RiUserLine />
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<RiSettings3Line />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel>View</DropdownMenuLabel>
					<DropdownMenuCheckboxItem checked>Sidebar</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Status bar</DropdownMenuCheckboxItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled>Archived</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">
					<RiLogoutBoxLine />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
};

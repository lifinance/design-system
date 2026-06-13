import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "./context-menu";

const meta = {
	component: ContextMenu,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A menu of actions that opens at the pointer on right click. Install with `pnpm dlx shadcn@latest add @core/context-menu`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2761-23066",
		},
	},
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Trigger = () => (
	<ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
		Right click here
	</ContextMenuTrigger>
);

export const Default: Story = {
	render: () => (
		<ContextMenu>
			<Trigger />
			<ContextMenuContent aria-label="Page actions">
				<ContextMenuGroup>
					<ContextMenuItem>
						Back
						<ContextMenuShortcut>[</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem disabled>Forward</ContextMenuItem>
					<ContextMenuItem>Reload</ContextMenuItem>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.pointer({
			target: canvas.getByText("Right click here"),
			keys: "[MouseRight]",
		});
		const menu = await screen.findByRole("menu", { name: /page actions/i });
		await waitFor(() => expect(menu).toBeVisible());

		const back = screen.getByRole("menuitem", { name: /back/i });
		const forward = screen.getByRole("menuitem", { name: /forward/i });
		await expect(forward).toHaveAttribute("aria-disabled", "true");

		await userEvent.keyboard("{ArrowDown}");
		await waitFor(() => expect(back).toHaveAttribute("data-highlighted"));

		await userEvent.click(back);
		await waitFor(() =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
	},
};

export const WithCheckboxItems: Story = {
	render: () => (
		<ContextMenu>
			<Trigger />
			<ContextMenuContent aria-label="View options">
				<ContextMenuGroup>
					<ContextMenuLabel>Appearance</ContextMenuLabel>
					<ContextMenuCheckboxItem defaultChecked>
						Show bookmarks
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Show full URLs</ContextMenuCheckboxItem>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.pointer({
			target: canvas.getByText("Right click here"),
			keys: "[MouseRight]",
		});
		await screen.findByRole("menu", { name: /view options/i });
		const bookmarks = screen.getByRole("menuitemcheckbox", {
			name: /show bookmarks/i,
		});
		await expect(bookmarks).toHaveAttribute("aria-checked", "true");

		const urls = screen.getByRole("menuitemcheckbox", {
			name: /show full urls/i,
		});
		await expect(urls).toHaveAttribute("aria-checked", "false");
		await userEvent.click(urls);
		await waitFor(() =>
			expect(
				screen.getByRole("menuitemcheckbox", { name: /show full urls/i }),
			).toHaveAttribute("aria-checked", "true"),
		);
	},
};

export const WithRadioGroup: Story = {
	render: () => (
		<ContextMenu>
			<Trigger />
			<ContextMenuContent aria-label="Theme">
				<ContextMenuGroup>
					<ContextMenuLabel>Theme</ContextMenuLabel>
					<ContextMenuRadioGroup defaultValue="system">
						<ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
						<ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
						<ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.pointer({
			target: canvas.getByText("Right click here"),
			keys: "[MouseRight]",
		});
		await screen.findByRole("menu", { name: /theme/i });
		const system = screen.getByRole("menuitemradio", { name: /system/i });
		await expect(system).toHaveAttribute("aria-checked", "true");

		const dark = screen.getByRole("menuitemradio", { name: /dark/i });
		await userEvent.click(dark);
		await waitFor(() =>
			expect(
				screen.getByRole("menuitemradio", { name: /dark/i }),
			).toHaveAttribute("aria-checked", "true"),
		);
	},
};

export const WithSubmenu: Story = {
	render: () => (
		<ContextMenu>
			<Trigger />
			<ContextMenuContent aria-label="Edit actions">
				<ContextMenuGroup>
					<ContextMenuItem>
						Copy
						<ContextMenuShortcut>C</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						Cut
						<ContextMenuShortcut>X</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
					<ContextMenuSubContent aria-label="More tools">
						<ContextMenuGroup>
							<ContextMenuItem>Save page</ContextMenuItem>
							<ContextMenuItem>Create shortcut</ContextMenuItem>
						</ContextMenuGroup>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuContent>
		</ContextMenu>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.pointer({
			target: canvas.getByText("Right click here"),
			keys: "[MouseRight]",
		});
		await screen.findByRole("menu", { name: /edit actions/i });
		const subTrigger = screen.getByRole("menuitem", { name: /more tools/i });
		await expect(subTrigger).toHaveAttribute("aria-haspopup", "menu");
		await expect(subTrigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.click(subTrigger);
		const submenu = await screen.findByRole("menu", { name: /more tools/i });
		await waitFor(() => expect(submenu).toBeVisible());
		await expect(subTrigger).toHaveAttribute("aria-expanded", "true");
		await expect(
			screen.getByRole("menuitem", { name: /save page/i }),
		).toBeVisible();

		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(
				screen.queryByRole("menu", { name: /more tools/i }),
			).not.toBeInTheDocument(),
		);
		await expect(
			screen.getByRole("menu", { name: /edit actions/i }),
		).toBeVisible();

		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
	},
};

export const WithDestructiveItem: Story = {
	render: () => (
		<ContextMenu>
			<Trigger />
			<ContextMenuContent aria-label="File actions">
				<ContextMenuGroup>
					<ContextMenuItem>Edit</ContextMenuItem>
					<ContextMenuItem>Share</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuItem variant="destructive">
						Delete
						<ContextMenuShortcut>Del</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
				Right click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-52" aria-label="All actions">
				<ContextMenuGroup>
					<ContextMenuLabel>File</ContextMenuLabel>
					<ContextMenuItem>
						New file
						<ContextMenuShortcut>N</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>Open file</ContextMenuItem>
					<ContextMenuItem disabled>Save</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuLabel>Appearance</ContextMenuLabel>
					<ContextMenuCheckboxItem defaultChecked>
						Show bookmarks
					</ContextMenuCheckboxItem>
					<ContextMenuRadioGroup defaultValue="light">
						<ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
						<ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuSub>
					<ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
					<ContextMenuSubContent aria-label="More tools">
						<ContextMenuItem>Developer tools</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
};

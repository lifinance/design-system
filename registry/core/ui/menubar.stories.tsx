import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "./menubar";

const meta = {
	component: Menubar,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A horizontal bar of menus for application-level commands, like the menu bar in a desktop app. Install with `pnpm dlx shadcn@latest add @core/menubar`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=8-325",
		},
	},
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Menubar aria-label="Application">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New tab <MenubarShortcut>⌘T</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						New window <MenubarShortcut>⌘N</MenubarShortcut>
					</MenubarItem>
					<MenubarItem disabled>New incognito window</MenubarItem>
					<MenubarSeparator />
					<MenubarSub>
						<MenubarSubTrigger>Share</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem>Email link</MenubarItem>
							<MenubarItem>Messages</MenubarItem>
							<MenubarItem>Notes</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
					<MenubarSeparator />
					<MenubarItem>
						Print <MenubarShortcut>⌘P</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Undo <MenubarShortcut>⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem>Cut</MenubarItem>
					<MenubarItem>Copy</MenubarItem>
					<MenubarItem>Paste</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarCheckboxItem>Show bookmarks bar</MenubarCheckboxItem>
					<MenubarCheckboxItem checked>Show full URLs</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarRadioGroup value="comfortable">
						<MenubarRadioItem value="compact">Compact</MenubarRadioItem>
						<MenubarRadioItem value="comfortable">Comfortable</MenubarRadioItem>
					</MenubarRadioGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	),
	play: async ({ canvas, userEvent }) => {
		await expect(canvas.getByRole("menubar")).toHaveAccessibleName(
			"Application",
		);

		const fileTrigger = canvas.getByRole("menuitem", { name: "File" });
		await expect(fileTrigger).toHaveAttribute("aria-haspopup", "menu");
		await userEvent.click(fileTrigger);

		const menu = await screen.findByRole("menu");
		await waitFor(() => expect(menu).toBeVisible());
		await waitFor(() =>
			expect(
				canvas
					.getByRole("menuitem", { name: "File" })
					.getAttribute("aria-expanded"),
			).toBe("true"),
		);
		await expect(
			screen.getByRole("menuitem", { name: /new incognito window/i }),
		).toHaveAttribute("data-disabled");

		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
		await waitFor(() =>
			expect(canvas.getByRole("menuitem", { name: "File" })).toHaveFocus(),
		);

		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() =>
			expect(canvas.getByRole("menuitem", { name: "Edit" })).toHaveFocus(),
		);

		await userEvent.keyboard("{ArrowDown}");
		await waitFor(() => expect(screen.getByRole("menu")).toBeVisible());
		await waitFor(() =>
			expect(
				canvas
					.getByRole("menuitem", { name: "Edit" })
					.getAttribute("aria-expanded"),
			).toBe("true"),
		);

		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<Menubar aria-label="Document">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						New file <MenubarShortcut>⌘N</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>Open folder</MenubarItem>
					<MenubarSeparator />
					<MenubarItem variant="destructive">
						Delete file <MenubarShortcut>⌘⌫</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
			</MenubarMenu>
		</Menubar>
	),
};

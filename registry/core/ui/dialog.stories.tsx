import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";
import { Field, FieldLabel } from "./field";
import { Input } from "./input";

const meta = {
	component: Dialog,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A modal window over the page content, with optional header, footer, and close button. Install with `pnpm dlx shadcn@latest add @core/dialog`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2759-16962",
		},
	},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Edit profile
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Update your display name and username, then save your changes.
					</DialogDescription>
				</DialogHeader>
				<Field>
					<FieldLabel htmlFor="display-name">Display name</FieldLabel>
					<Input id="display-name" defaultValue="Sarah Chen" />
				</Field>
				<Field>
					<FieldLabel htmlFor="username">Username</FieldLabel>
					<Input id="username" defaultValue="@sarahchen" />
				</Field>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /edit profile/i }),
		);
		const dialog = await screen.findByRole("dialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			screen.getByRole("heading", { name: /edit profile/i }),
		).toBeVisible();
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);
	},
};

export const WithoutCloseButton: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Sign out
			</DialogTrigger>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Sign out</DialogTitle>
					<DialogDescription>
						You can sign back in at any time.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button>Sign out</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /sign out/i }));
		await screen.findByRole("dialog");
		await expect(
			screen.queryByRole("button", { name: /^close$/i }),
		).not.toBeInTheDocument();
	},
};

export const Destructive: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger render={<Button variant="outline" />}>
				Delete account
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete account</DialogTitle>
					<DialogDescription>
						This permanently removes your account and all of its data.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button variant="destructive">Delete account</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /delete account/i }),
		);
		const dialog = await screen.findByRole("dialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			within(dialog).getByRole("button", { name: /delete account/i }),
		).toBeVisible();
	},
};

export const Open: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<Dialog defaultOpen>
			<DialogTrigger render={<Button variant="outline" />}>
				Edit profile
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Update your display name and username, then save your changes.
					</DialogDescription>
				</DialogHeader>
				<Field>
					<FieldLabel htmlFor="open-display-name">Display name</FieldLabel>
					<Input id="open-display-name" defaultValue="Sarah Chen" />
				</Field>
				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						Cancel
					</DialogClose>
					<Button>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};

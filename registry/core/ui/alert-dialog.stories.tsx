import type { Meta, StoryObj } from "@storybook/react-vite";
import { Trash2Icon, WalletIcon } from "lucide-react";
import { expect, screen, waitFor, within } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

const FIGMA = {
	alertDialog:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2759-16912",
	media:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101014-5050",
};

const meta = {
	component: AlertDialog,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A modal dialog that interrupts the user to confirm an action before it runs. Install with `pnpm dlx shadcn@latest add @core/alert-dialog`.",
			},
		},
		design: { type: "figma", url: FIGMA.alertDialog },
	},
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Sign out
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
					<AlertDialogDescription>
						This ends every active session. Sign back in on each device to keep
						using your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Sign out</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /sign out/i }));
		const dialog = await screen.findByRole("alertdialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			screen.getByRole("heading", { name: /sign out of all devices/i }),
		).toBeVisible();
		await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
		await waitFor(() =>
			expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument(),
		);
	},
};

export const Small: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Enable notifications
			</AlertDialogTrigger>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogTitle>Allow notifications?</AlertDialogTitle>
					<AlertDialogDescription>
						You can change this in settings at any time.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Don't allow</AlertDialogCancel>
					<AlertDialogAction>Allow</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /enable notifications/i }),
		);
		const dialog = await screen.findByRole("alertdialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			screen.getByRole("button", { name: /^allow$/i }),
		).toBeVisible();
	},
};

export const WithMedia: Story = {
	parameters: { design: { type: "figma", url: FIGMA.media } },
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Connect wallet
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogMedia>
						<WalletIcon />
					</AlertDialogMedia>
					<AlertDialogTitle>Connect wallet?</AlertDialogTitle>
					<AlertDialogDescription>
						The site can view your address and balances. It cannot move funds
						without your approval.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Connect</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /connect wallet/i }),
		);
		const dialog = await screen.findByRole("alertdialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			screen.getByRole("button", { name: /^connect$/i }),
		).toBeVisible();
	},
};

export const Destructive: Story = {
	render: () => (
		<AlertDialog>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Delete API key
			</AlertDialogTrigger>
			<AlertDialogContent size="sm">
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>Delete API key?</AlertDialogTitle>
					<AlertDialogDescription>
						Applications that use this key lose access immediately. This action
						cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
					<AlertDialogAction variant="destructive">Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /delete api key/i }),
		);
		const dialog = await screen.findByRole("alertdialog");
		await waitFor(() => expect(dialog).toBeVisible());
		await expect(
			within(dialog).getByRole("button", { name: /^delete$/i }),
		).toBeVisible();
	},
};

export const Open: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<AlertDialog defaultOpen>
			<AlertDialogTrigger render={<Button variant="outline" />}>
				Sign out
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Sign out of all devices?</AlertDialogTitle>
					<AlertDialogDescription>
						This ends every active session. Sign back in on each device to keep
						using your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Sign out</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
};

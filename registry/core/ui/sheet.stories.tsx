import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import { Field, FieldLabel } from "./field";
import { Input } from "./input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

const meta = {
	component: Sheet,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A panel that slides in from any edge of the screen, anchored with the `side` prop. Install with `pnpm dlx shadcn@latest add @core/sheet`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2785-10044",
		},
	},
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIDES = ["top", "right", "bottom", "left"] as const;

export const Default: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>
				Edit profile
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Update your display name and username, then save your changes.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 px-4">
					<Field>
						<FieldLabel htmlFor="display-name">Display name</FieldLabel>
						<Input id="display-name" defaultValue="Sarah Chen" />
					</Field>
					<Field>
						<FieldLabel htmlFor="username">Username</FieldLabel>
						<Input id="username" defaultValue="@sarahchen" />
					</Field>
				</div>
				<SheetFooter>
					<Button>Save changes</Button>
					<SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /edit profile/i }),
		);
		const sheet = await screen.findByRole("dialog");
		await waitFor(() => expect(sheet).toBeVisible());
		await expect(
			screen.getByRole("heading", { name: /edit profile/i }),
		).toBeVisible();
		await userEvent.keyboard("{Escape}");
		// The panel unmounts only after its close transition ends, so allow more
		// than the default poll window.
		await waitFor(
			() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
			{ timeout: 5000 },
		);
	},
};

export const Sides: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			{SIDES.map((side) => (
				<Sheet key={side}>
					<SheetTrigger
						render={<Button variant="outline" className="capitalize" />}
					>
						{side}
					</SheetTrigger>
					<SheetContent
						side={side}
						className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
					>
						<SheetHeader>
							<SheetTitle className="capitalize">{side} sheet</SheetTitle>
							<SheetDescription>
								This panel is anchored to the {side} edge of the screen.
							</SheetDescription>
						</SheetHeader>
						<SheetFooter>
							<SheetClose render={<Button variant="outline" />}>
								Close
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			))}
		</div>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /^left$/i }));
		const sheet = await screen.findByRole("dialog");
		await waitFor(() => expect(sheet).toBeVisible());
		await expect(sheet).toHaveAttribute("data-side", "left");
		await userEvent.keyboard("{Escape}");
		// The panel unmounts only after its close transition ends, so allow more
		// than the default poll window.
		await waitFor(
			() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
			{ timeout: 5000 },
		);
	},
};

export const WithoutCloseButton: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger render={<Button variant="outline" />}>
				View details
			</SheetTrigger>
			<SheetContent showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Order details</SheetTitle>
					<SheetDescription>
						Close this panel using the button below.
					</SheetDescription>
				</SheetHeader>
				<SheetFooter>
					<SheetClose render={<Button variant="outline" />}>Close</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("button", { name: /view details/i }),
		);
		const sheet = await screen.findByRole("dialog");
		await waitFor(() => expect(sheet).toBeVisible());
		await expect(
			screen.getAllByRole("button", { name: /^close$/i }),
		).toHaveLength(1);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<Sheet defaultOpen>
			<SheetTrigger render={<Button variant="outline" />}>
				Edit profile
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Update your display name and username, then save your changes.
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col gap-4 px-4">
					<Field>
						<FieldLabel htmlFor="overview-display-name">
							Display name
						</FieldLabel>
						<Input id="overview-display-name" defaultValue="Sarah Chen" />
					</Field>
				</div>
				<SheetFooter>
					<Button>Save changes</Button>
					<SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
};

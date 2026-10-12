import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor } from "storybook/test";
import {
	pressUntil,
	waitForFocusWithin,
	withDelayedKeyboardHandover,
} from "@/.storybook/interactions";
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

// Base UI dismisses a down swipe past half the sheet height, or at 0.5 px/ms.
const SHORT_DRAG_PX = 24;
const LONG_DRAG_FRACTION = 0.75;
const DRAG_STEPS = 6;
const SLOW_STEP_MS = 40;
const SCROLL_OFFSET_PX = 120;
const ORDER_ROWS = Array.from(
	{ length: 20 },
	(_, row) => `Order row ${row + 1}`,
);

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function touchAt(target: Element, x: number, y: number) {
	return new Touch({ identifier: 1, target, clientX: x, clientY: y });
}

function getSheetHandle(sheet: HTMLElement) {
	const handle = sheet.querySelector('[data-slot="sheet-handle"]');
	if (!handle) throw new Error("The bottom sheet renders no handle.");
	return handle;
}

async function touchDrag(target: Element, distance: number) {
	const box = target.getBoundingClientRect();
	const x = box.left + box.width / 2;
	const y = box.top + box.height / 2;
	const start = touchAt(target, x, y);
	target.dispatchEvent(
		new TouchEvent("touchstart", {
			bubbles: true,
			cancelable: true,
			touches: [start],
			targetTouches: [start],
			changedTouches: [start],
		}),
	);
	let last = start;
	for (let step = 1; step <= DRAG_STEPS; step++) {
		await pause(SLOW_STEP_MS);
		last = touchAt(target, x, y + (distance * step) / DRAG_STEPS);
		target.dispatchEvent(
			new TouchEvent("touchmove", {
				bubbles: true,
				cancelable: true,
				touches: [last],
				targetTouches: [last],
				changedTouches: [last],
			}),
		);
	}
	await pause(SLOW_STEP_MS);
	target.dispatchEvent(
		new TouchEvent("touchend", {
			bubbles: true,
			cancelable: true,
			changedTouches: [last],
		}),
	);
}

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
		await waitForFocusWithin(sheet);
		await expect(
			screen.getByRole("heading", { name: /edit profile/i }),
		).toBeVisible();
		await pressUntil(userEvent, "{Escape}", () =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);
	},
};

export const DefaultWithDelayedHandover: Story = {
	...Default,
	tags: ["!autodocs"],
	play: withDelayedKeyboardHandover(Default.play),
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
		await waitForFocusWithin(sheet);
		await expect(sheet).toHaveAttribute("data-side", "left");
		await pressUntil(userEvent, "{Escape}", () =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);
	},
};

export const SidesWithDelayedHandover: Story = {
	...Sides,
	tags: ["!autodocs"],
	play: withDelayedKeyboardHandover(Sides.play),
};

export const BottomSwipeToDismiss: Story = {
	tags: ["!autodocs"],
	args: { onOpenChange: fn() },
	render: (args) => (
		<Sheet onOpenChange={args.onOpenChange}>
			<SheetTrigger render={<Button variant="outline" />}>
				Open order
			</SheetTrigger>
			<SheetContent side="bottom" showCloseButton={false}>
				<SheetHeader>
					<SheetTitle>Order form</SheetTitle>
					<SheetDescription>Swipe down to close this panel.</SheetDescription>
				</SheetHeader>
				<div
					data-testid="sheet-scroll-body"
					className="flex max-h-24 flex-col gap-2 overflow-y-auto px-4"
				>
					{ORDER_ROWS.map((row) => (
						<p key={row}>{row}</p>
					))}
				</div>
				<SheetFooter>
					<SheetClose render={<Button variant="outline" />}>Close</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	),
	play: async ({ args, canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /open order/i }));
		const sheet = await screen.findByRole("dialog");
		await waitFor(() => expect(sheet).toBeVisible());
		await waitFor(() =>
			expect(sheet).not.toHaveAttribute("data-starting-style"),
		);

		const handle = getSheetHandle(sheet);
		await expect(handle).toBeVisible();

		await touchDrag(handle, SHORT_DRAG_PX);
		await pause(SLOW_STEP_MS);
		await expect(args.onOpenChange).not.toHaveBeenCalledWith(
			false,
			expect.anything(),
		);
		await expect(sheet).toBeVisible();

		const body = screen.getByTestId("sheet-scroll-body");
		body.scrollTop = SCROLL_OFFSET_PX;
		await touchDrag(body, sheet.offsetHeight * LONG_DRAG_FRACTION);
		await pause(SLOW_STEP_MS);
		await expect(args.onOpenChange).not.toHaveBeenCalledWith(
			false,
			expect.anything(),
		);
		await expect(sheet).toBeVisible();

		await touchDrag(handle, sheet.offsetHeight * LONG_DRAG_FRACTION);
		await waitFor(() =>
			expect(args.onOpenChange).toHaveBeenCalledWith(false, expect.anything()),
		);
		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
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

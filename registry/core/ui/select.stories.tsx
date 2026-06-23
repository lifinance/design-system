import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Field, FieldError, FieldLabel } from "./field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./select";

const FRUITS = ["Apple", "Banana", "Blueberry", "Grape", "Pineapple"];

const meta = {
	component: Select,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A control that opens a list of options and lets the user choose one. Install with `pnpm dlx shadcn@latest add @core/select`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2738-3406",
		},
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { onValueChange: fn() },
	render: (args) => (
		<Field className="w-56">
			<FieldLabel htmlFor="fruit">Favorite fruit</FieldLabel>
			<Select {...args}>
				<SelectTrigger id="fruit">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Favorite fruit">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
	play: async ({ canvas, userEvent, args }) => {
		const trigger = canvas.getByRole("combobox", { name: /favorite fruit/i });
		await expect(trigger).toHaveAttribute("aria-expanded", "false");
		await userEvent.click(trigger);

		const listbox = await screen.findByRole("listbox", {
			name: /favorite fruit/i,
		});
		await waitFor(() => expect(listbox).toBeVisible());
		await expect(trigger).toHaveAttribute("aria-expanded", "true");

		await userEvent.click(screen.getByRole("option", { name: "Banana" }));
		await waitFor(() => expect(trigger).toHaveTextContent("Banana"));
		await expect(args.onValueChange).toHaveBeenCalledWith(
			"Banana",
			expect.anything(),
		);
	},
};

export const KeyboardNavigation: Story = {
	render: () => (
		<Field className="w-56">
			<FieldLabel htmlFor="fruit-keyboard">Favorite fruit</FieldLabel>
			<Select>
				<SelectTrigger id="fruit-keyboard">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Favorite fruit">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("combobox", { name: /favorite fruit/i });
		trigger.focus();

		await userEvent.keyboard("{ArrowDown}");
		const listbox = await screen.findByRole("listbox", {
			name: /favorite fruit/i,
		});
		await waitFor(() => expect(listbox).toBeVisible());

		await userEvent.keyboard("{End}");
		await waitFor(() =>
			expect(screen.getByRole("option", { name: "Pineapple" })).toHaveAttribute(
				"data-highlighted",
			),
		);

		await userEvent.keyboard("{Enter}");
		await waitFor(() => expect(trigger).toHaveTextContent("Pineapple"));
		await expect(trigger).toHaveAttribute("aria-expanded", "false");
	},
};

export const Grouped: Story = {
	render: () => (
		<Field className="w-56">
			<FieldLabel htmlFor="produce">Produce</FieldLabel>
			<Select>
				<SelectTrigger id="produce">
					<SelectValue placeholder="Select an item" />
				</SelectTrigger>
				<SelectContent aria-label="Produce">
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
					</SelectGroup>
					<SelectSeparator />
					<SelectGroup>
						<SelectLabel>Vegetables</SelectLabel>
						<SelectItem value="carrot">Carrot</SelectItem>
						<SelectItem value="broccoli">Broccoli</SelectItem>
						<SelectItem value="spinach">Spinach</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("combobox", { name: /produce/i }));
		const listbox = await screen.findByRole("listbox", { name: /produce/i });
		await waitFor(() => expect(listbox).toBeVisible());
		await expect(screen.getByText("Vegetables")).toBeVisible();
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
	},
};

export const DisabledItem: Story = {
	render: () => (
		<Field className="w-56">
			<FieldLabel htmlFor="fruit-disabled-item">Favorite fruit</FieldLabel>
			<Select>
				<SelectTrigger id="fruit-disabled-item">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Favorite fruit">
					<SelectGroup>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="grape" disabled>
							Grape
						</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("combobox", { name: /favorite fruit/i }),
		);
		const listbox = await screen.findByRole("listbox", {
			name: /favorite fruit/i,
		});
		await waitFor(() => expect(listbox).toBeVisible());
		await expect(screen.getByRole("option", { name: "Grape" })).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<Field className="w-56">
			<FieldLabel htmlFor="fruit-disabled">Favorite fruit</FieldLabel>
			<Select disabled>
				<SelectTrigger id="fruit-disabled">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Favorite fruit">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("combobox", { name: /favorite fruit/i }),
		).toBeDisabled();
	},
};

export const Invalid: Story = {
	render: () => (
		<Field data-invalid className="w-56">
			<FieldLabel htmlFor="fruit-invalid">Favorite fruit</FieldLabel>
			<Select>
				<SelectTrigger id="fruit-invalid" aria-invalid>
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Favorite fruit">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<FieldError errors={[{ message: "Select a fruit to continue." }]} />
		</Field>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-56 flex-col gap-4">
			<Select>
				<SelectTrigger aria-label="Default">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Default">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select defaultValue="Banana">
				<SelectTrigger aria-label="Filled">
					<SelectValue />
				</SelectTrigger>
				<SelectContent aria-label="Filled">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select>
				<SelectTrigger size="sm" aria-label="Small">
					<SelectValue placeholder="Small" />
				</SelectTrigger>
				<SelectContent aria-label="Small">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select defaultValue="Banana">
				<SelectTrigger variant="ghost" size="sm" aria-label="Ghost">
					<SelectValue />
				</SelectTrigger>
				<SelectContent aria-label="Ghost">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select defaultValue="Banana">
				<SelectTrigger variant="ghost" size="xs" aria-label="Extra small">
					<SelectValue />
				</SelectTrigger>
				<SelectContent size="xs" aria-label="Extra small">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select>
				<SelectTrigger aria-label="Invalid" aria-invalid>
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Invalid">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select disabled>
				<SelectTrigger aria-label="Disabled">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent aria-label="Disabled">
					<SelectGroup>
						{FRUITS.map((fruit) => (
							<SelectItem key={fruit} value={fruit}>
								{fruit}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	),
};

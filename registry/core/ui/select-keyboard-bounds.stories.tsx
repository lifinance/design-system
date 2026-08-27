import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
import {
	waitForFocusWithin,
	withDelayedFocus,
} from "@/.storybook/interactions";
import { Field, FieldLabel } from "./field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";

const PLANETS = [
	"Mercury",
	"Venus",
	"Earth",
	"Mars",
	"Jupiter",
	"Saturn",
	"Uranus",
	"Neptune",
];

const FIRST = PLANETS[0];
const LAST = PLANETS[PLANETS.length - 1];

// A test-only story: the tags keep it out of the sidebar and the docs page.
const meta = {
	component: Select,
	tags: ["!autodocs", "!dev"],
	render: () => (
		<Field className="w-56">
			<FieldLabel htmlFor="planet">Planet</FieldLabel>
			<Select>
				<SelectTrigger id="planet">
					<SelectValue placeholder="Select a planet" />
				</SelectTrigger>
				<SelectContent aria-label="Planet">
					<SelectGroup>
						{PLANETS.map((planet) => (
							<SelectItem key={planet} value={planet}>
								{planet}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Field>
	),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EndAndHomeReachTheListEnds: Story = {
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("combobox", { name: /planet/i });
		trigger.focus();

		await userEvent.keyboard("{ArrowDown}");
		const listbox = await screen.findByRole("listbox", { name: /planet/i });
		await waitFor(() => expect(listbox).toBeVisible());
		await waitForFocusWithin(listbox);

		const options = within(listbox);
		await expect(options.getAllByRole("option")).toHaveLength(PLANETS.length);
		await waitFor(() =>
			expect(options.getByRole("option", { name: FIRST })).toHaveAttribute(
				"data-highlighted",
			),
		);

		await userEvent.keyboard("{End}");
		await waitFor(() => {
			expect(options.getByRole("option", { name: LAST })).toHaveAttribute(
				"data-highlighted",
			);
			expect(options.getByRole("option", { name: FIRST })).not.toHaveAttribute(
				"data-highlighted",
			);
		});

		await userEvent.keyboard("{Home}");
		await waitFor(() => {
			expect(options.getByRole("option", { name: FIRST })).toHaveAttribute(
				"data-highlighted",
			);
			expect(options.getByRole("option", { name: LAST })).not.toHaveAttribute(
				"data-highlighted",
			);
		});
	},
};

export const KeyboardWithDelayedFocus: Story = {
	...EndAndHomeReachTheListEnds,
	play: withDelayedFocus(EndAndHomeReachTheListEnds.play),
};

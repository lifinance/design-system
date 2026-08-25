import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
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

		await expect(screen.getAllByRole("option")).toHaveLength(PLANETS.length);
		const first = screen.getByRole("option", { name: FIRST });
		const last = screen.getByRole("option", { name: LAST });
		await waitFor(() => expect(first).toHaveAttribute("data-highlighted"));

		await userEvent.keyboard("{End}");
		await waitFor(() => expect(last).toHaveAttribute("data-highlighted"));
		await expect(first).not.toHaveAttribute("data-highlighted");

		await userEvent.keyboard("{Home}");
		await waitFor(() => expect(first).toHaveAttribute("data-highlighted"));
		await expect(last).not.toHaveAttribute("data-highlighted");
	},
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor, within } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxCollection,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	ComboboxValue,
	useComboboxAnchor,
} from "./combobox";
import { Field, FieldLabel } from "./field";

const CURRENCIES = [
	"Euro",
	"Japanese yen",
	"Pound sterling",
	"Swiss franc",
	"US dollar",
];

const REGIONS = [
	"Cape Town",
	"Frankfurt",
	"Mumbai",
	"São Paulo",
	"Singapore",
	"Sydney",
];

const TIME_ZONES = [
	{ value: "Americas", items: ["Chicago", "New York", "Vancouver"] },
	{ value: "Europe", items: ["Berlin", "London", "Madrid"] },
	{ value: "Asia Pacific", items: ["Singapore", "Sydney", "Tokyo"] },
];

const LANGUAGES = ["English", "French", "German", "Japanese", "Spanish"];

const meta = {
	component: Combobox,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An input that filters a list of options as the user types and selects one or more of them. Install with `pnpm dlx shadcn@latest add @core/combobox`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=153-2576",
		},
	},
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Field className="w-72">
			<FieldLabel htmlFor="currency">Currency</FieldLabel>
			<Combobox items={CURRENCIES}>
				<ComboboxInput id="currency" placeholder="Select a currency" />
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("combobox", { name: /currency/i });
		await userEvent.type(input, "swi");
		const listbox = await screen.findByRole("listbox");
		await waitFor(() => expect(listbox).toBeVisible());
		await expect(
			screen.queryByRole("option", { name: /euro/i }),
		).not.toBeInTheDocument();
		await userEvent.click(screen.getByRole("option", { name: /swiss franc/i }));
		await waitFor(() => expect(input).toHaveValue("Swiss franc"));
	},
};

export const WithTrigger: Story = {
	render: () => (
		<Combobox items={REGIONS} defaultValue="Frankfurt">
			<ComboboxTrigger
				aria-label="Region"
				render={
					<Button
						variant="outline"
						className="w-64 justify-between font-normal"
					/>
				}
			>
				<ComboboxValue />
			</ComboboxTrigger>
			<ComboboxContent aria-label="Region">
				<ComboboxInput
					aria-label="Search regions"
					placeholder="Search regions"
					showTrigger={false}
				/>
				<ComboboxEmpty>No regions found.</ComboboxEmpty>
				<ComboboxList aria-label="Region">
					{(region) => (
						<ComboboxItem key={region} value={region}>
							{region}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("combobox", { name: /region/i });
		await userEvent.click(trigger);
		const popup = await screen.findByRole("dialog");
		await waitFor(() => expect(popup).toBeVisible());
		await userEvent.type(
			within(popup).getByRole("combobox", { name: /search regions/i }),
			"syd",
		);
		await userEvent.click(screen.getByRole("option", { name: /sydney/i }));
		await waitFor(() => expect(trigger).toHaveTextContent("Sydney"));
	},
};

export const Disabled: Story = {
	render: () => (
		<Field className="w-72">
			<FieldLabel htmlFor="currency-disabled">Currency</FieldLabel>
			<Combobox items={CURRENCIES}>
				<ComboboxInput
					id="currency-disabled"
					placeholder="Select a currency"
					disabled
				/>
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("combobox", { name: /currency/i }),
		).toBeDisabled();
	},
};

export const WithGroups: Story = {
	render: () => (
		<Field className="w-72">
			<FieldLabel htmlFor="time-zone">Time zone</FieldLabel>
			<Combobox items={TIME_ZONES}>
				<ComboboxInput id="time-zone" placeholder="Select a time zone" />
				<ComboboxContent>
					<ComboboxEmpty>No time zones found.</ComboboxEmpty>
					<ComboboxList aria-label="Time zone">
						{(group) => (
							<ComboboxGroup key={group.value} items={group.items}>
								<ComboboxLabel>{group.value}</ComboboxLabel>
								<ComboboxCollection>
									{(city) => (
										<ComboboxItem key={city} value={city}>
											{city}
										</ComboboxItem>
									)}
								</ComboboxCollection>
								<ComboboxSeparator />
							</ComboboxGroup>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: /open popup/i }));
		const listbox = await screen.findByRole("listbox");
		await waitFor(() => expect(listbox).toBeVisible());
		await expect(within(listbox).getByText("Europe")).toBeVisible();
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
	},
};

function MultipleLanguages() {
	const anchor = useComboboxAnchor();
	return (
		<Field className="w-72">
			<FieldLabel htmlFor="languages">Languages</FieldLabel>
			<Combobox multiple items={LANGUAGES} defaultValue={["English"]}>
				<ComboboxChips ref={anchor}>
					<ComboboxValue>
						{(values: string[]) => (
							<>
								{values.map((language) => (
									<ComboboxChip key={language}>{language}</ComboboxChip>
								))}
								<ComboboxChipsInput id="languages" />
							</>
						)}
					</ComboboxValue>
				</ComboboxChips>
				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>No languages found.</ComboboxEmpty>
					<ComboboxList aria-label="Languages">
						{(language) => (
							<ComboboxItem key={language} value={language}>
								{language}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</Field>
	);
}

export const Multiple: Story = {
	render: () => <MultipleLanguages />,
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("combobox", { name: /languages/i }));
		const listbox = await screen.findByRole("listbox");
		await waitFor(() => expect(listbox).toBeVisible());
		await userEvent.click(screen.getByRole("option", { name: /german/i }));
		await waitFor(() => expect(canvas.getByText("German")).toBeVisible());
		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(screen.queryByRole("listbox")).not.toBeInTheDocument(),
		);
	},
};

function OverviewChips() {
	const anchor = useComboboxAnchor();
	return (
		<Combobox multiple items={LANGUAGES} defaultValue={["English", "Spanish"]}>
			<ComboboxChips ref={anchor}>
				<ComboboxValue>
					{(values: string[]) => (
						<>
							{values.map((language) => (
								<ComboboxChip key={language}>{language}</ComboboxChip>
							))}
							<ComboboxChipsInput aria-label="Languages" />
						</>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor}>
				<ComboboxEmpty>No languages found.</ComboboxEmpty>
				<ComboboxList aria-label="Languages">
					{(language) => (
						<ComboboxItem key={language} value={language}>
							{language}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-72 flex-col gap-4">
			<Combobox items={CURRENCIES}>
				<ComboboxInput aria-label="Currency" placeholder="Select a currency" />
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<Combobox items={CURRENCIES} defaultValue="Euro">
				<ComboboxInput aria-label="Currency" showClear />
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<Combobox items={CURRENCIES}>
				<ComboboxInput
					aria-label="Currency"
					placeholder="Select a currency"
					aria-invalid
				/>
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<Combobox items={CURRENCIES}>
				<ComboboxInput
					aria-label="Currency"
					placeholder="Select a currency"
					disabled
				/>
				<ComboboxContent>
					<ComboboxEmpty>No currencies found.</ComboboxEmpty>
					<ComboboxList aria-label="Currency">
						{(currency) => (
							<ComboboxItem key={currency} value={currency}>
								{currency}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
			<OverviewChips />
		</div>
	),
};

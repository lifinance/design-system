import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, waitFor } from "storybook/test";
import { cn } from "@/registry/core/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/core/ui/select";

// A group utility on the same element and the same property. It scores one
// class plus one attribute, the score every built-in Tailwind data variant
// carries, so a state variant that scores less loses to it.
const COMPETING = "group-data-[probe=on]/probe:text-muted-foreground";

const FRUITS = ["Apple", "Banana", "Blueberry"];

const PROBES = [
	{
		id: "data-active",
		state: { "data-state": "active" },
		className: "data-active:text-foreground",
	},
	{
		id: "data-active-bare",
		state: { "data-active": "" },
		className: "data-active:text-foreground",
	},
	{
		id: "data-checked",
		state: { "data-checked": "" },
		className: "data-checked:text-foreground",
	},
	{
		id: "data-closed",
		state: { "data-closed": "" },
		className: "data-closed:text-foreground",
	},
	{
		id: "data-disabled",
		state: { "data-disabled": "true" },
		className: "data-disabled:text-foreground",
	},
	{
		id: "data-disabled-value",
		state: { "data-disabled": "1" },
		className: "data-disabled:text-foreground",
	},
	{
		id: "data-horizontal",
		state: { "data-orientation": "horizontal" },
		className: "data-horizontal:text-foreground",
	},
	{
		id: "data-open",
		state: { "data-open": "" },
		className: "data-open:text-foreground",
	},
	{
		id: "data-selected",
		state: { "data-selected": "" },
		className: "data-selected:text-foreground",
	},
	{
		id: "data-unchecked",
		state: { "data-unchecked": "" },
		className: "data-unchecked:text-foreground",
	},
	{
		id: "data-vertical",
		state: { "data-orientation": "vertical" },
		className: "data-vertical:text-foreground",
	},
] as const;

function tokenColor(utility: string, within: HTMLElement) {
	const probe = document.createElement("span");
	probe.className = utility;
	within.append(probe);
	const { color } = getComputedStyle(probe);
	probe.remove();
	return color;
}

const meta = {
	title: "Foundations/State Variants",
	parameters: {
		docs: {
			description: {
				component:
					"The state variants a Base UI component styles with: `data-active`, `data-checked`, `data-closed`, `data-disabled`, `data-horizontal`, `data-open`, `data-selected`, `data-unchecked`, and `data-vertical`. The probes cover every supported attribute form. Each variant carries the same weight as a built-in Tailwind data variant.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Precedence: Story = {
	render: () => (
		<div className="group/probe flex flex-col gap-3" data-probe="on">
			{PROBES.map((probe) => (
				<span
					key={probe.id}
					{...probe.state}
					data-testid={probe.id}
					className={cn(COMPETING, probe.className)}
				>
					{probe.id}
				</span>
			))}
		</div>
	),
	play: async ({ canvas, canvasElement }) => {
		const foreground = tokenColor("text-foreground", canvasElement);
		await expect(foreground).not.toBe(
			tokenColor("text-muted-foreground", canvasElement),
		);

		const colors = Object.fromEntries(
			PROBES.map((probe) => [
				probe.id,
				getComputedStyle(canvas.getByTestId(probe.id)).color,
			]),
		);
		await expect(colors).toEqual(
			Object.fromEntries(PROBES.map((probe) => [probe.id, foreground])),
		);
	},
};

export const NotSelected: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"The `data-selected` variant matches the presence of the attribute, and an explicit `false` value does not apply the utility.",
			},
		},
	},
	render: () => (
		<div className="group/probe" data-probe="on">
			<span
				data-selected="false"
				className={cn(COMPETING, "data-selected:text-foreground")}
			>
				data-selected="false"
			</span>
		</div>
	),
	play: async ({ canvas, canvasElement }) => {
		const muted = tokenColor("text-muted-foreground", canvasElement);
		await expect(muted).not.toBe(tokenColor("text-foreground", canvasElement));

		const target = canvas.getByText('data-selected="false"');
		await expect(getComputedStyle(target).color).toBe(muted);
	},
};

export const SelectedItem: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"A selected item carries `data-selected` with an empty value. The `data-selected` variant matches that form.",
			},
		},
	},
	render: () => (
		<Select defaultValue="Banana">
			<SelectTrigger className="w-56" aria-label="Favorite fruit">
				<SelectValue />
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
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(
			canvas.getByRole("combobox", { name: /favorite fruit/i }),
		);
		const listbox = await screen.findByRole("listbox", {
			name: /favorite fruit/i,
		});
		await waitFor(() => expect(listbox).toBeVisible());

		const selected = screen.getByRole("option", { name: "Banana" });
		await expect(selected).toHaveAttribute("data-selected", "");
		await expect(selected).toHaveAttribute("aria-selected", "true");
	},
};

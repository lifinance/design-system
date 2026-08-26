import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { cn } from "@/registry/core/lib/utils";

// A group utility on the same element and the same property. It scores one
// class plus one attribute, the score every built-in Tailwind data variant
// carries, so a state variant that scores less loses to it.
const COMPETING = "group-data-[probe=on]/probe:text-muted-foreground";

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
					"The state variants a Base UI component styles with: `data-active`, `data-disabled`, `data-horizontal`, and `data-vertical`. The probes cover every supported attribute form. Each variant carries the same weight as a built-in Tailwind data variant.",
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

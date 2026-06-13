import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "./field";
import { Switch } from "./switch";

const SWITCH_LABELED_URL =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2769-29914";

const meta = {
	component: Switch,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A control that toggles between on and off. Install with `pnpm dlx shadcn@latest add @core/switch`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=9-338",
		},
	},
	args: {
		"aria-label": "Airplane mode",
		onCheckedChange: fn(),
	},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent, args }) => {
		const control = canvas.getByRole("switch", { name: /airplane mode/i });
		await expect(control).toHaveAttribute("aria-checked", "false");
		await userEvent.click(control);
		await expect(control).toHaveAttribute("aria-checked", "true");
		await expect(args.onCheckedChange).toHaveBeenCalled();
	},
};

export const WithLabel: Story = {
	parameters: { design: { type: "figma", url: SWITCH_LABELED_URL } },
	render: () => (
		<Field orientation="horizontal">
			<Switch id="airplane" />
			<FieldLabel htmlFor="airplane">Airplane mode</FieldLabel>
		</Field>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Airplane mode"));
		await expect(canvas.getByRole("switch")).toHaveAttribute(
			"aria-checked",
			"true",
		);
	},
};

export const WithDescription: Story = {
	parameters: { design: { type: "figma", url: SWITCH_LABELED_URL } },
	render: () => (
		<FieldLabel htmlFor="sharing" className="w-80">
			<Field orientation="horizontal">
				<FieldContent>
					<FieldTitle>Share across devices</FieldTitle>
					<FieldDescription>
						Settings sync across devices and turn off when you sign out.
					</FieldDescription>
				</FieldContent>
				<Switch id="sharing" defaultChecked />
			</Field>
		</FieldLabel>
	),
};

export const Disabled: Story = {
	args: { disabled: true },
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("switch")).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Switch size="sm" aria-label="Small" defaultChecked />
			<Switch size="default" aria-label="Default" defaultChecked />
		</div>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-4">
				<Switch aria-label="Off" />
				<Switch aria-label="On" defaultChecked />
				<Switch aria-label="Disabled" disabled />
				<Switch aria-label="Disabled on" disabled defaultChecked />
				<Switch aria-label="Invalid" aria-invalid />
			</div>
			<div className="flex items-center gap-4">
				<Switch size="sm" aria-label="Small off" />
				<Switch size="sm" aria-label="Small on" defaultChecked />
			</div>
			<Field orientation="horizontal" className="w-80">
				<FieldContent>
					<FieldLabel htmlFor="overview-airplane">Airplane mode</FieldLabel>
					<FieldDescription>Turn off wireless connections.</FieldDescription>
				</FieldContent>
				<Switch id="overview-airplane" />
			</Field>
		</div>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftIcon, ArrowRightIcon, CommandIcon } from "lucide-react";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import { Kbd, KbdGroup } from "./kbd";

const FIGMA = {
	kbd: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-42968",
	group:
		"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-42982",
};

const meta = {
	component: Kbd,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"Displays a keyboard key or shortcut. Install with `pnpm dlx shadcn@latest add @core/kbd`.",
			},
		},
		design: { type: "figma", url: FIGMA.kbd },
	},
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { children: "Esc" },
};

export const ModifierKey: Story = {
	render: () => (
		<Kbd>
			<CommandIcon />
		</Kbd>
	),
};

export const ArrowKeys: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Kbd>↑</Kbd>
			<Kbd>↓</Kbd>
			<Kbd>←</Kbd>
			<Kbd>→</Kbd>
		</div>
	),
};

export const Combination: Story = {
	parameters: { design: { type: "figma", url: FIGMA.group } },
	render: () => (
		<KbdGroup>
			<Kbd>Ctrl</Kbd>
			<Kbd>K</Kbd>
		</KbdGroup>
	),
};

export const WithIconAndText: Story = {
	render: () => (
		<KbdGroup>
			<Kbd>
				<ArrowLeftIcon />
				Back
			</Kbd>
			<Kbd>
				Forward
				<ArrowRightIcon />
			</Kbd>
		</KbdGroup>
	),
};

export const InButton: Story = {
	render: () => (
		<Button variant="outline">
			Search
			<Kbd>⌘K</Kbd>
		</Button>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col items-start gap-4">
			<div className="flex items-center gap-2">
				<Kbd>Esc</Kbd>
				<Kbd>Tab</Kbd>
				<Kbd>
					<CommandIcon />
				</Kbd>
				<Kbd>↑</Kbd>
			</div>
			<KbdGroup>
				<Kbd>Ctrl</Kbd>
				<Kbd>Shift</Kbd>
				<Kbd>P</Kbd>
			</KbdGroup>
			<Button variant="outline">
				Search
				<Kbd>⌘K</Kbd>
			</Button>
		</div>
	),
};

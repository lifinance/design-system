import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	BoldIcon,
	BookmarkIcon,
	ItalicIcon,
	UnderlineIcon,
} from "lucide-react";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Toggle } from "./toggle";

const meta = {
	component: Toggle,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A button that switches between an on and off state. Install with `pnpm dlx shadcn@latest add @core/toggle`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2768-28168",
		},
	},
	args: {
		"aria-label": "Toggle bold",
		onPressedChange: fn(),
		children: <BoldIcon />,
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent, args }) => {
		const toggle = canvas.getByRole("button", { name: /toggle bold/i });
		await expect(toggle).toHaveAttribute("aria-pressed", "false");

		await userEvent.click(toggle);
		await waitFor(() => expect(toggle).toHaveAttribute("aria-pressed", "true"));
		await expect(args.onPressedChange).toHaveBeenLastCalledWith(
			true,
			expect.anything(),
		);

		await userEvent.click(toggle);
		await waitFor(() =>
			expect(toggle).toHaveAttribute("aria-pressed", "false"),
		);

		toggle.focus();
		await userEvent.keyboard(" ");
		await waitFor(() => expect(toggle).toHaveAttribute("aria-pressed", "true"));

		await userEvent.keyboard("{Enter}");
		await waitFor(() =>
			expect(toggle).toHaveAttribute("aria-pressed", "false"),
		);
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		"aria-label": "Toggle italic",
		children: (
			<>
				<ItalicIcon />
				Italic
			</>
		),
	},
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex items-center gap-2">
			<Toggle {...args} size="sm">
				Small
			</Toggle>
			<Toggle {...args} size="default">
				Default
			</Toggle>
			<Toggle {...args} size="lg">
				Large
			</Toggle>
		</div>
	),
	args: {
		variant: "outline",
		"aria-label": undefined,
		children: undefined,
	},
};

export const Pressed: Story = {
	args: {
		defaultPressed: true,
		"aria-label": "Toggle bookmark",
		children: <BookmarkIcon />,
	},
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("button", { name: /toggle bookmark/i }),
		).toHaveAttribute("aria-pressed", "true");
	},
};

export const Disabled: Story = {
	args: { disabled: true, "aria-label": "Toggle disabled" },
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("button", { name: /toggle disabled/i }),
		).toBeDisabled();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	args: { "aria-label": undefined, children: undefined },
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Toggle aria-label="Bold">
					<BoldIcon />
				</Toggle>
				<Toggle aria-label="Italic" defaultPressed>
					<ItalicIcon />
				</Toggle>
				<Toggle aria-label="Underline" disabled>
					<UnderlineIcon />
				</Toggle>
			</div>
			<div className="flex items-center gap-2">
				<Toggle variant="outline" size="sm">
					<BoldIcon />
					Small
				</Toggle>
				<Toggle variant="outline" size="default" defaultPressed>
					<ItalicIcon />
					Default
				</Toggle>
				<Toggle variant="outline" size="lg">
					<UnderlineIcon />
					Large
				</Toggle>
			</div>
		</div>
	),
};

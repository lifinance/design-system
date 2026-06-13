import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	UnderlineIcon,
} from "lucide-react";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
	component: ToggleGroup,
	subcomponents: { ToggleGroupItem },
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A set of toggle buttons that share a single or multiple selection. Install with `pnpm dlx shadcn@latest add @core/toggle-group`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=2769-30628",
		},
	},
	args: {
		onValueChange: fn(),
	},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelection: Story = {
	args: { "aria-label": "Text alignment", defaultValue: ["left"] },
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="left" aria-label="Align left">
				<AlignLeftIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="center" aria-label="Align center">
				<AlignCenterIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="right" aria-label="Align right">
				<AlignRightIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="justify" aria-label="Justify">
				<AlignJustifyIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
	play: async ({ canvas, userEvent, args }) => {
		const group = canvas.getByRole("group", { name: /text alignment/i });
		await expect(group).toBeInTheDocument();

		const left = canvas.getByRole("button", { name: /align left/i });
		const center = canvas.getByRole("button", { name: /align center/i });
		await expect(left).toHaveAttribute("aria-pressed", "true");
		await expect(center).toHaveAttribute("aria-pressed", "false");

		await userEvent.click(center);
		await waitFor(() => expect(center).toHaveAttribute("aria-pressed", "true"));
		await expect(left).toHaveAttribute("aria-pressed", "false");
		await expect(args.onValueChange).toHaveBeenLastCalledWith(
			["center"],
			expect.anything(),
		);

		left.focus();
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() => expect(center).toHaveFocus());
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() =>
			expect(
				canvas.getByRole("button", { name: /align right/i }),
			).toHaveFocus(),
		);
	},
};

export const MultipleSelection: Story = {
	args: {
		"aria-label": "Text formatting",
		multiple: true,
		defaultValue: ["bold"],
	},
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="bold" aria-label="Bold">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Italic">
				<ItalicIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline" aria-label="Underline">
				<UnderlineIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
	play: async ({ canvas, userEvent, args }) => {
		const bold = canvas.getByRole("button", { name: /bold/i });
		const italic = canvas.getByRole("button", { name: /italic/i });
		await expect(bold).toHaveAttribute("aria-pressed", "true");

		await userEvent.click(italic);
		await waitFor(() => expect(italic).toHaveAttribute("aria-pressed", "true"));
		await expect(bold).toHaveAttribute("aria-pressed", "true");
		await expect(args.onValueChange).toHaveBeenLastCalledWith(
			["bold", "italic"],
			expect.anything(),
		);

		await userEvent.click(bold);
		await waitFor(() => expect(bold).toHaveAttribute("aria-pressed", "false"));
	},
};

export const Outline: Story = {
	args: {
		"aria-label": "View density",
		variant: "outline",
		defaultValue: ["comfortable"],
	},
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="compact" aria-label="Compact">
				Compact
			</ToggleGroupItem>
			<ToggleGroupItem value="comfortable" aria-label="Comfortable">
				Comfortable
			</ToggleGroupItem>
			<ToggleGroupItem value="spacious" aria-label="Spacious">
				Spacious
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Sizes: Story = {
	args: { "aria-label": undefined },
	render: () => (
		<div className="flex flex-col items-start gap-4">
			<ToggleGroup
				aria-label="Alignment, small"
				variant="outline"
				size="sm"
				defaultValue={["left"]}
			>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup
				aria-label="Alignment, default"
				variant="outline"
				defaultValue={["left"]}
			>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup
				aria-label="Alignment, large"
				variant="outline"
				size="lg"
				defaultValue={["left"]}
			>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		"aria-label": "Text formatting",
		multiple: true,
		disabled: true,
		defaultValue: ["bold"],
	},
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="bold" aria-label="Bold">
				<BoldIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Italic">
				<ItalicIcon />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline" aria-label="Underline">
				<UnderlineIcon />
			</ToggleGroupItem>
		</ToggleGroup>
	),
	play: async ({ canvas }) => {
		await expect(canvas.getByRole("button", { name: /bold/i })).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	args: { "aria-label": undefined },
	render: () => (
		<div className="flex flex-col gap-6">
			<ToggleGroup
				aria-label="Text formatting"
				multiple
				defaultValue={["bold"]}
			>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup
				aria-label="Text alignment"
				variant="outline"
				defaultValue={["left"]}
			>
				<ToggleGroupItem value="left" aria-label="Align left">
					<AlignLeftIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="center" aria-label="Align center">
					<AlignCenterIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="right" aria-label="Align right">
					<AlignRightIcon />
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup
				aria-label="View density"
				variant="outline"
				size="sm"
				spacing={0}
				defaultValue={["comfortable"]}
			>
				<ToggleGroupItem value="compact" aria-label="Compact">
					Compact
				</ToggleGroupItem>
				<ToggleGroupItem value="comfortable" aria-label="Comfortable">
					Comfortable
				</ToggleGroupItem>
				<ToggleGroupItem value="spacious" aria-label="Spacious">
					Spacious
				</ToggleGroupItem>
			</ToggleGroup>
			<ToggleGroup
				aria-label="Text formatting, vertical"
				variant="outline"
				orientation="vertical"
				multiple
				spacing={0}
				defaultValue={["bold"]}
			>
				<ToggleGroupItem value="bold" aria-label="Bold">
					<BoldIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="italic" aria-label="Italic">
					<ItalicIcon />
				</ToggleGroupItem>
				<ToggleGroupItem value="underline" aria-label="Underline">
					<UnderlineIcon />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	),
};

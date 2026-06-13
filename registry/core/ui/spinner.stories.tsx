import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import { Spinner } from "./spinner";

const meta = {
	component: Spinner,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An animated indicator that shows a loading or busy state. Install with `pnpm dlx shadcn@latest add @core/spinner`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=34338-4980",
		},
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas }) => {
		const spinner = canvas.getByRole("status", { name: "Loading" });
		await waitFor(() => expect(spinner).toBeVisible());
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-6">
			<Spinner className="size-3" />
			<Spinner />
			<Spinner className="size-5" />
			<Spinner className="size-6" />
			<Spinner className="size-8" />
		</div>
	),
};

export const InButton: Story = {
	render: () => (
		<Button disabled>
			<Spinner data-icon="inline-start" aria-hidden />
			Saving
		</Button>
	),
	play: async ({ canvas }) => {
		const button = canvas.getByRole("button", { name: "Saving" });
		await expect(button).toBeDisabled();
		await expect(canvas.queryByRole("status")).not.toBeInTheDocument();
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-6">
				<Spinner className="size-3" />
				<Spinner />
				<Spinner className="size-5" />
				<Spinner className="size-6" />
				<Spinner className="size-8" />
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<Button disabled>
					<Spinner data-icon="inline-start" aria-hidden />
					Saving
				</Button>
				<Button variant="outline" disabled>
					<Spinner data-icon="inline-start" aria-hidden />
					Loading
				</Button>
				<Button variant="outline" size="icon" disabled aria-label="Loading">
					<Spinner aria-hidden />
				</Button>
			</div>
		</div>
	),
};

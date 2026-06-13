import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./breadcrumb";
import { DirectionProvider } from "./direction";

const meta = {
	component: DirectionProvider,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"Sets the reading direction for descendant components so they adapt to right-to-left layouts. Pair it with `dir` on a wrapping element, since the provider drives behavior only and does not change HTML or CSS. Install with `pnpm dlx shadcn@latest add @core/direction`.",
			},
		},
	},
} satisfies Meta<typeof DirectionProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function Trail({ label }: { label: string }) {
	return (
		<Breadcrumb aria-label={label}>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="#">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="#">Settings</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Notifications</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

export const LeftToRight: Story = {
	render: () => (
		<DirectionProvider direction="ltr">
			<Trail label="Left to right" />
		</DirectionProvider>
	),
	play: async ({ canvas }) => {
		const nav = canvas.getByRole("navigation", { name: "Left to right" });
		await expect(nav).toBeVisible();
		await expect(canvas.getByRole("link", { name: "Home" })).toBeVisible();
		await expect(canvas.getByText("Notifications")).toHaveAttribute(
			"aria-current",
			"page",
		);
	},
};

export const RightToLeft: Story = {
	render: () => (
		<div dir="rtl">
			<DirectionProvider direction="rtl">
				<Trail label="Right to left" />
			</DirectionProvider>
		</div>
	),
	play: async ({ canvas }) => {
		const nav = canvas.getByRole("navigation", { name: "Right to left" });
		await expect(nav).toBeVisible();
		await expect(canvas.getByRole("link", { name: "Settings" })).toBeVisible();
		await expect(canvas.getByText("Notifications")).toHaveAttribute(
			"aria-current",
			"page",
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-6">
			<DirectionProvider direction="ltr">
				<Trail label="Left to right" />
			</DirectionProvider>
			<div dir="rtl">
				<DirectionProvider direction="rtl">
					<Trail label="Right to left" />
				</DirectionProvider>
			</div>
		</div>
	),
};

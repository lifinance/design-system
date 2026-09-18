import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { ScrollFade } from "./scroll-fade";

const ITEMS = Array.from({ length: 12 }, (_, index) => `Activity ${index + 1}`);

const meta = {
	component: ScrollFade,
	parameters: {
		docs: {
			description: {
				component:
					"A scrollable container with fades that indicate content beyond its visible edges. Install with `pnpm dlx shadcn@latest add @core/scroll-fade`.",
			},
		},
	},
} satisfies Meta<typeof ScrollFade>;

export default meta;
type Story = StoryObj<typeof meta>;

function Content({ count }: { count: number }) {
	return (
		<div className="flex flex-col gap-3 p-4">
			{ITEMS.slice(0, count).map((item) => (
				<div
					key={item}
					className="rounded-lg bg-muted px-3 py-4 text-sm text-muted-foreground"
				>
					{item}
				</div>
			))}
		</div>
	);
}

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-wrap items-start gap-6">
			<div className="flex flex-col gap-2">
				<span className="text-sm font-medium">Content fits</span>
				<ScrollFade
					className="h-80 w-72 rounded-xl border bg-card"
					viewportProps={{ "aria-label": "Content that fits" }}
				>
					<Content count={3} />
				</ScrollFade>
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-sm font-medium">Overflow</span>
				<ScrollFade
					className="h-80 w-72 rounded-xl border bg-card"
					viewportProps={{ "aria-label": "Overflowing content" }}
				>
					<Content count={12} />
				</ScrollFade>
			</div>
		</div>
	),
	play: async ({ canvasElement }) => {
		const viewports = canvasElement.querySelectorAll<HTMLElement>(
			'[data-slot="scroll-fade-viewport"]',
		);
		const fittingViewport = viewports[0];
		const overflowingViewport = viewports[1];

		await expect(viewports).toHaveLength(2);
		await expect(fittingViewport.scrollHeight).toBe(
			fittingViewport.clientHeight,
		);
		await expect(overflowingViewport.scrollHeight).toBeGreaterThan(
			overflowingViewport.clientHeight,
		);
		await expect(overflowingViewport).toHaveAttribute("tabindex", "0");

		overflowingViewport.scrollTo({ top: 120 });
		await expect(overflowingViewport.scrollTop).toBe(120);
	},
};

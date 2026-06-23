import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { snapshot } from "@/.storybook/modes";
import { DepthRatioBar } from "./depth-ratio-bar";

const meta = {
	component: DepthRatioBar,
	tags: ["ai-generated"],
	globals: { theme: "perps" },
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"An order-book depth ratio bar showing the share of resting size on the bid and ask sides. Install with `pnpm dlx shadcn@latest add @perps/depth-ratio-bar`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/d9C15jeDHQdDe9sufwkIum/Shadcn-perps?node-id=105324-99217",
		},
	},
	decorators: [
		(Story) => (
			<div className="w-72">
				<Story />
			</div>
		),
	],
	args: {
		bids: 5004,
		asks: 4996,
	},
} satisfies Meta<typeof DepthRatioBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BidHeavy: Story = {
	args: { bids: 8200, asks: 1800 },
};

export const AskHeavy: Story = {
	args: { bids: 1500, asks: 8500 },
};

export const Empty: Story = {
	args: { bids: 0, asks: 0 },
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-72 flex-col gap-6">
			<DepthRatioBar bids={5004} asks={4996} />
			<DepthRatioBar bids={8200} asks={1800} />
			<DepthRatioBar bids={1500} asks={8500} />
			<DepthRatioBar bids={0} asks={0} />
		</div>
	),
};

function AnimatedDepthRatioBar() {
	const [sides, setSides] = useState({ bids: 5000, asks: 5000 });
	useEffect(() => {
		const id = setInterval(() => {
			setSides({
				bids: 1000 + Math.random() * 9000,
				asks: 1000 + Math.random() * 9000,
			});
		}, 1000);
		return () => clearInterval(id);
	}, []);
	return <DepthRatioBar animated bids={sides.bids} asks={sides.asks} />;
}

/** The bars tween between ratios each second; honors `prefers-reduced-motion`. */
export const Animated: Story = {
	parameters: { chromatic: { disableSnapshot: true } },
	render: () => <AnimatedDepthRatioBar />,
};

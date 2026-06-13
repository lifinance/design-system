import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarIcon } from "lucide-react";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

const meta = {
	component: HoverCard,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A card of supplementary content that opens when its trigger is hovered or focused. Install with `pnpm dlx shadcn@latest add @core/hover-card`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=4-462",
		},
	},
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function UserProfile() {
	return (
		<div className="flex gap-3">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
				<AvatarFallback>SC</AvatarFallback>
			</Avatar>
			<div className="flex flex-col gap-1">
				<h4 className="font-medium">@shadcn</h4>
				<p className="text-muted-foreground">
					Designer and engineer building open-source interface tools.
				</p>
				<div className="flex items-center gap-1.5 text-muted-foreground">
					<CalendarIcon className="size-3.5" />
					<span className="text-xs">Joined March 2021</span>
				</div>
			</div>
		</div>
	);
}

export const Default: Story = {
	render: () => (
		<HoverCard>
			<HoverCardTrigger
				href="https://github.com/shadcn"
				className="font-medium underline underline-offset-4"
			>
				@shadcn
			</HoverCardTrigger>
			<HoverCardContent>
				<UserProfile />
			</HoverCardContent>
		</HoverCard>
	),
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("link", { name: "@shadcn" });
		await userEvent.hover(trigger);
		const content = await screen.findByText(/building open-source/i);
		await waitFor(() => expect(content).toBeVisible());
		await userEvent.unhover(trigger);
		await waitFor(() =>
			expect(
				screen.queryByText(/building open-source/i),
			).not.toBeInTheDocument(),
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex justify-center p-12">
			<HoverCard defaultOpen>
				<HoverCardTrigger
					href="https://github.com/shadcn"
					className="font-medium underline underline-offset-4"
				>
					@shadcn
				</HoverCardTrigger>
				<HoverCardContent>
					<UserProfile />
				</HoverCardContent>
			</HoverCard>
		</div>
	),
};

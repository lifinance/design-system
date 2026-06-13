import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpRightIcon, InboxIcon, WalletIcon } from "lucide-react";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "./empty";

const FIGMA =
	"https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=33462-51078";

const meta = {
	component: Empty,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A placeholder that explains why a region has no content and points to a next step. Install with `pnpm dlx shadcn@latest add @core/empty`.",
			},
		},
		design: { type: "figma", url: FIGMA },
	},
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
	render: () => (
		<Empty className="border">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<InboxIcon />
				</EmptyMedia>
				<EmptyTitle>No transactions yet</EmptyTitle>
				<EmptyDescription>
					Transactions you send or receive appear here once they settle.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button>Start a transfer</Button>
			</EmptyContent>
		</Empty>
	),
};

export const Basic: Story = {
	render: () => (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No projects yet</EmptyTitle>
				<EmptyDescription>
					Create a project to organize your work and invite collaborators.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<div className="flex gap-2">
					<Button>Create project</Button>
					<Button variant="outline">Import project</Button>
				</div>
				<Button
					variant="link"
					className="text-muted-foreground"
					// biome-ignore lint/a11y/useAnchorContent: the button places its label inside the anchor at runtime
					render={<a href="#docs" />}
					nativeButton={false}
				>
					Learn more
					<ArrowUpRightIcon data-icon="inline-end" />
				</Button>
			</EmptyContent>
		</Empty>
	),
};

export const WithBackground: Story = {
	render: () => (
		<Empty className="bg-muted">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<WalletIcon />
				</EmptyMedia>
				<EmptyTitle>No wallet connected</EmptyTitle>
				<EmptyDescription>
					Connect a wallet to view balances and sign transactions.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button>Connect wallet</Button>
			</EmptyContent>
		</Empty>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-6">
			<Empty className="border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<InboxIcon />
					</EmptyMedia>
					<EmptyTitle>No transactions yet</EmptyTitle>
					<EmptyDescription>
						Transactions you send or receive appear here once they settle.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>Start a transfer</Button>
				</EmptyContent>
			</Empty>
			<Empty>
				<EmptyHeader>
					<EmptyTitle>No projects yet</EmptyTitle>
					<EmptyDescription>
						Create a project to organize your work and invite collaborators.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>Create project</Button>
				</EmptyContent>
			</Empty>
			<Empty className="bg-muted">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<WalletIcon />
					</EmptyMedia>
					<EmptyTitle>No wallet connected</EmptyTitle>
					<EmptyDescription>
						Connect a wallet to view balances and sign transactions.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button>Connect wallet</Button>
				</EmptyContent>
			</Empty>
		</div>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClipboardIcon, SearchIcon } from "lucide-react";
import { snapshot } from "@/.storybook/modes";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "./input-group";

const meta = {
	component: InputGroup,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An input with leading or trailing icons, text, and buttons. Install with `pnpm dlx shadcn@latest add @core/input-group`.",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="w-80">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<InputGroup>
			<InputGroupAddon>
				<SearchIcon className="size-5" />
			</InputGroupAddon>
			<InputGroupInput aria-label="Search" placeholder="Search" />
		</InputGroup>
	),
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-3">
			<InputGroup>
				<InputGroupAddon>
					<SearchIcon className="size-5" />
				</InputGroupAddon>
				<InputGroupInput aria-label="Search" placeholder="Search" />
			</InputGroup>
			<InputGroup>
				<InputGroupInput aria-label="Amount" placeholder="0.00" />
				<InputGroupAddon align="inline-end">
					<InputGroupText>USD</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput aria-label="Recipient" placeholder="Wallet address" />
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="icon-xs" aria-label="Paste">
						<ClipboardIcon />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
};

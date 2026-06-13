import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	ChevronRightIcon,
	ChevronsUpDownIcon,
	FileIcon,
	FolderIcon,
} from "lucide-react";
import { expect, fn, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Button } from "./button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./collapsible";

const meta = {
	component: Collapsible,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"An expandable section that shows or hides content below a trigger. Install with `pnpm dlx shadcn@latest add @core/collapsible`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=101081-2418",
		},
	},
	args: {
		onOpenChange: fn(),
	},
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<Collapsible {...args} className="flex w-80 flex-col gap-2">
			<div className="flex items-center justify-between gap-4 px-4">
				<h4 className="text-sm font-semibold">3 connected networks</h4>
				<CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
					<ChevronsUpDownIcon />
					<span className="sr-only">Toggle networks</span>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border px-4 py-2 text-sm">Ethereum</div>
			<CollapsibleContent className="flex flex-col gap-2">
				<div className="rounded-md border px-4 py-2 text-sm">Arbitrum</div>
				<div className="rounded-md border px-4 py-2 text-sm">Optimism</div>
			</CollapsibleContent>
		</Collapsible>
	),
	play: async ({ canvas, userEvent, args }) => {
		await expect(canvas.queryByText("Arbitrum")).not.toBeInTheDocument();
		const trigger = canvas.getByRole("button", { name: /toggle networks/i });
		await userEvent.click(trigger);
		await waitFor(() => expect(canvas.getByText("Arbitrum")).toBeVisible());
		await expect(trigger).toHaveAttribute("aria-expanded", "true");
		await expect(args.onOpenChange).toHaveBeenCalled();
	},
};

export const FileTree: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-1">
			<Collapsible defaultOpen>
				<CollapsibleTrigger
					render={
						<Button
							variant="ghost"
							size="sm"
							className="group w-full justify-start"
						/>
					}
				>
					<ChevronRightIcon className="transition-transform group-data-[panel-open]:rotate-90" />
					<FolderIcon />
					components
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-1 ml-5">
					<div className="flex flex-col gap-1">
						<Collapsible>
							<CollapsibleTrigger
								render={
									<Button
										variant="ghost"
										size="sm"
										className="group w-full justify-start"
									/>
								}
							>
								<ChevronRightIcon className="transition-transform group-data-[panel-open]:rotate-90" />
								<FolderIcon />
								ui
							</CollapsibleTrigger>
							<CollapsibleContent className="mt-1 ml-5">
								<div className="flex flex-col gap-1">
									{["button.tsx", "card.tsx", "dialog.tsx"].map((file) => (
										<Button
											key={file}
											variant="ghost"
											size="sm"
											className="w-full justify-start"
										>
											<FileIcon />
											{file}
										</Button>
									))}
								</div>
							</CollapsibleContent>
						</Collapsible>
						<Button variant="ghost" size="sm" className="w-full justify-start">
							<FileIcon />
							login-form.tsx
						</Button>
					</div>
				</CollapsibleContent>
			</Collapsible>
			<Button variant="ghost" size="sm" className="w-full justify-start">
				<FileIcon />
				package.json
			</Button>
		</div>
	),
	play: async ({ canvas, userEvent }) => {
		await expect(canvas.queryByText("button.tsx")).not.toBeInTheDocument();
		await userEvent.click(canvas.getByRole("button", { name: /ui/i }));
		await waitFor(() => expect(canvas.getByText("button.tsx")).toBeVisible());
	},
};

export const Disabled: Story = {
	render: (args) => (
		<Collapsible {...args} disabled className="flex w-80 flex-col gap-2">
			<div className="flex items-center justify-between gap-4 px-4">
				<h4 className="text-sm font-semibold">Archived networks</h4>
				<CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}>
					<ChevronsUpDownIcon />
					<span className="sr-only">Toggle networks</span>
				</CollapsibleTrigger>
			</div>
			<div className="rounded-md border px-4 py-2 text-sm">Ethereum</div>
		</Collapsible>
	),
	play: async ({ canvas }) => {
		await expect(
			canvas.getByRole("button", { name: /toggle networks/i }),
		).toHaveAttribute("aria-disabled", "true");
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-8">
			<Collapsible className="flex w-80 flex-col gap-2">
				<div className="flex items-center justify-between gap-4 px-4">
					<h4 className="text-sm font-semibold">3 connected networks</h4>
					<CollapsibleTrigger
						render={<Button variant="ghost" size="icon-sm" />}
					>
						<ChevronsUpDownIcon />
						<span className="sr-only">Toggle networks</span>
					</CollapsibleTrigger>
				</div>
				<div className="rounded-md border px-4 py-2 text-sm">Ethereum</div>
			</Collapsible>
			<Collapsible defaultOpen className="flex w-80 flex-col gap-2">
				<div className="flex items-center justify-between gap-4 px-4">
					<h4 className="text-sm font-semibold">3 connected wallets</h4>
					<CollapsibleTrigger
						render={<Button variant="ghost" size="icon-sm" />}
					>
						<ChevronsUpDownIcon />
						<span className="sr-only">Toggle wallets</span>
					</CollapsibleTrigger>
				</div>
				<div className="rounded-md border px-4 py-2 text-sm">MetaMask</div>
				<CollapsibleContent className="flex flex-col gap-2">
					<div className="rounded-md border px-4 py-2 text-sm">Safe</div>
					<div className="rounded-md border px-4 py-2 text-sm">
						Coinbase Wallet
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	),
};

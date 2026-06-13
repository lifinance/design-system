import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Separator } from "./separator";

const meta = {
	component: ScrollArea,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A scrollable container with custom scrollbars in place of the browser's. Install with `pnpm dlx shadcn@latest add @core/scroll-area`.",
			},
		},
	},
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const versions = Array.from({ length: 40 }, (_, i) => `v1.2.0-beta.${40 - i}`);

const collections = [
	"Annual report",
	"Brand guidelines",
	"Product roadmap",
	"Release notes",
	"Onboarding guide",
	"Style reference",
	"Meeting summary",
	"Design archive",
];

export const Vertical: Story = {
	render: () => (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm leading-none font-medium">Versions</h4>
				{versions.map((version) => (
					<React.Fragment key={version}>
						<div className="text-sm">{version}</div>
						<Separator className="my-2" />
					</React.Fragment>
				))}
			</div>
		</ScrollArea>
	),
	play: async ({ canvasElement }) => {
		const viewport = canvasElement.querySelector<HTMLElement>(
			'[data-slot="scroll-area-viewport"]',
		);
		await expect(viewport).not.toBeNull();
		await expect(viewport).toHaveAttribute("tabindex", "0");

		viewport?.focus();
		await expect(viewport).toHaveFocus();
		viewport?.scrollTo({ top: 80 });
		await expect(viewport?.scrollTop).toBe(80);
	},
};

export const Horizontal: Story = {
	render: () => (
		<ScrollArea className="w-96 rounded-md border whitespace-nowrap">
			<div className="flex w-max gap-4 p-4">
				{collections.map((collection) => (
					<figure
						key={collection}
						className="flex size-32 shrink-0 items-center justify-center rounded-md bg-muted p-4 text-center text-sm text-muted-foreground"
					>
						{collection}
					</figure>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	),
	play: async ({ canvasElement }) => {
		const viewport = canvasElement.querySelector<HTMLElement>(
			'[data-slot="scroll-area-viewport"]',
		);
		await expect(viewport).not.toBeNull();
		await expect(viewport).toHaveAttribute("tabindex", "0");

		viewport?.scrollTo({ left: 120 });
		await expect(viewport?.scrollLeft).toBe(120);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-wrap items-start gap-6">
			<ScrollArea className="h-48 w-48 rounded-md border">
				<div className="p-4">
					<h4 className="mb-4 text-sm leading-none font-medium">Versions</h4>
					{versions.map((version) => (
						<React.Fragment key={version}>
							<div className="text-sm">{version}</div>
							<Separator className="my-2" />
						</React.Fragment>
					))}
				</div>
			</ScrollArea>
			<ScrollArea className="w-72 rounded-md border whitespace-nowrap">
				<div className="flex w-max gap-4 p-4">
					{collections.map((collection) => (
						<figure
							key={collection}
							className="flex size-24 shrink-0 items-center justify-center rounded-md bg-muted p-4 text-center text-sm text-muted-foreground"
						>
							{collection}
						</figure>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	),
};

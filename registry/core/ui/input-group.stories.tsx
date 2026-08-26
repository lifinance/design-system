import { RiClipboardLine, RiSearchLine } from "@remixicon/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
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
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=29794-41968",
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
				<RiSearchLine className="size-5" />
			</InputGroupAddon>
			<InputGroupInput aria-label="Search" placeholder="Search" />
		</InputGroup>
	),
};

const controlRef = React.createRef<HTMLElement>();
const buttonRef = React.createRef<HTMLElement>();

export const RefForwarding: Story = {
	render: () => (
		<InputGroup>
			<InputGroupInput
				ref={controlRef}
				aria-label="Recipient"
				placeholder="Wallet address"
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton ref={buttonRef} size="icon-xs" aria-label="Paste">
					<RiClipboardLine />
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	),
	play: async ({ canvas }) => {
		await expect(controlRef.current).toBe(
			canvas.getByRole("textbox", { name: /recipient/i }),
		);
		await expect(buttonRef.current).toBe(
			canvas.getByRole("button", { name: /paste/i }),
		);
		// React 18 hands a Base UI render element its ref outside props, so a consumer
		// on 18 only reaches the node when the component forwards the ref.
		await expect(InputGroupInput.$$typeof).toBe(
			Symbol.for("react.forward_ref"),
		);
		await expect(InputGroupButton.$$typeof).toBe(
			Symbol.for("react.forward_ref"),
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex flex-col gap-3">
			<InputGroup>
				<InputGroupAddon>
					<RiSearchLine className="size-5" />
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
						<RiClipboardLine />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	),
};

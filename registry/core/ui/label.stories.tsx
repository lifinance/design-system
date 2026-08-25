import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
	component: Label,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A caption for a form control. Install with `pnpm dlx shadcn@latest add @core/label`.",
			},
		},
	},
	args: { children: "Email address" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
	render: (args) => (
		<div className="flex w-72 flex-col gap-2">
			<Label {...args} htmlFor="email" />
			<Input id="email" type="email" placeholder="name@example.com" />
		</div>
	),
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByText("Email address"));
		await expect(canvas.getByPlaceholderText("name@example.com")).toHaveFocus();
	},
};

export const Disabled: Story = {
	render: (args) => (
		<div className="group flex w-72 flex-col gap-2" data-disabled="true">
			<Label {...args} htmlFor="disabled-email" />
			<Input
				id="disabled-email"
				type="email"
				placeholder="name@example.com"
				disabled
			/>
		</div>
	),
};

const labelRef = React.createRef<HTMLLabelElement>();

export const RefForwarding: Story = {
	render: (args) => <Label {...args} ref={labelRef} />,
	play: async ({ canvas }) => {
		await expect(labelRef.current).toBe(canvas.getByText("Email address"));
		// React 18 hands a Base UI render element its ref outside props, so a consumer
		// on 18 only reaches the node when the component forwards the ref.
		await expect(Label.$$typeof).toBe(Symbol.for("react.forward_ref"));
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-72 flex-col gap-6">
			<Label>Email address</Label>
			<div className="flex flex-col gap-2">
				<Label htmlFor="overview-email">Email address</Label>
				<Input
					id="overview-email"
					type="email"
					placeholder="name@example.com"
				/>
			</div>
		</div>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ComponentProps, useState } from "react";
import { expect } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import { SearchInput } from "./search-input";

function SearchInputDemo({
	value: initialValue,
	...props
}: ComponentProps<typeof SearchInput>) {
	const [value, setValue] = useState(
		typeof initialValue === "string" ? initialValue : "",
	);
	return (
		<SearchInput
			{...props}
			value={value}
			onChange={(event) => setValue(event.currentTarget.value)}
			onClear={() => setValue("")}
		/>
	);
}

const meta = {
	component: SearchInput,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A search field with a leading icon and a clear button. Install with `pnpm dlx shadcn@latest add @core/search-input`.",
			},
			// The story renders a stateful demo wrapper; show the real controlled usage.
			source: {
				type: "code",
				code: `const [value, setValue] = useState("ethereum");

<SearchInput
  value={value}
  onChange={(event) => setValue(event.currentTarget.value)}
  onClear={() => setValue("")}
  placeholder="Search by token or address"
  aria-label="Search"
/>`,
			},
		},
	},
	args: {
		placeholder: "Search by token or address",
		"aria-label": "Search",
	},
	render: (args) => <SearchInputDemo {...args} />,
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: /search/i });
		await expect(canvas.queryByRole("button", { name: /clear/i })).toBeNull();
		await userEvent.type(input, "ethereum");
		await expect(input).toHaveValue("ethereum");
		await expect(canvas.getByRole("button", { name: /clear/i })).toBeVisible();
		await userEvent.tab();
		await expect(canvas.getByRole("button", { name: /clear/i })).toHaveFocus();
	},
};

export const WithClear: Story = {
	args: { value: "ethereum" },
	play: async ({ canvas, userEvent }) => {
		const input = canvas.getByRole("textbox", { name: /search/i });
		await expect(input).toHaveValue("ethereum");
		await userEvent.click(canvas.getByRole("button", { name: /clear/i }));
		await expect(input).toHaveValue("");
		await expect(canvas.queryByRole("button", { name: /clear/i })).toBeNull();
	},
};

export const Invalid: Story = {
	args: { value: "not-found", "aria-invalid": true },
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => (
		<div className="flex w-80 flex-col gap-3">
			<SearchInputDemo
				aria-label="Empty"
				placeholder="Search by token or address"
			/>
			<SearchInputDemo aria-label="With value" value="ethereum" />
			<SearchInputDemo aria-label="Invalid" value="not-found" aria-invalid />
		</div>
	),
};

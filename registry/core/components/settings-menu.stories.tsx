import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, screen, waitFor } from "storybook/test";
import { hover } from "@/.storybook/interactions";
import { snapshot } from "@/.storybook/modes";
import { Button } from "@/registry/core/ui/button";
import { RadioGroup } from "@/registry/core/ui/radio-group";
import { TooltipProvider } from "@/registry/core/ui/tooltip";
import {
	SettingsMenu,
	SettingsMenuContent,
	SettingsMenuHeader,
	SettingsMenuItem,
	SettingsMenuList,
	SettingsMenuOption,
	SettingsMenuPanel,
	SettingsMenuPanels,
	SettingsMenuTrigger,
} from "./settings-menu";

const APPEARANCES = [
	{ value: "system", label: "Match system" },
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
];

function SettingsMenuDemo({
	open,
	panel: initialPanel = "menu",
}: {
	open?: boolean;
	panel?: "menu" | "appearance";
}) {
	const [panel, setPanel] = useState(initialPanel);
	const [appearance, setAppearance] = useState("system");
	const selected = APPEARANCES.find((option) => option.value === appearance);

	return (
		<SettingsMenu
			open={open}
			onOpenChange={(next) => {
				if (!next) {
					setPanel("menu");
				}
			}}
		>
			<SettingsMenuTrigger render={<Button variant="outline" />}>
				Settings
			</SettingsMenuTrigger>
			<SettingsMenuContent align="start">
				<SettingsMenuPanels>
					<SettingsMenuPanel active={panel === "menu"} slide="start">
						<SettingsMenuList>
							<SettingsMenuItem
								label="Appearance"
								tooltip="Applies to this browser only."
								value={selected?.label}
								onClick={() => setPanel("appearance")}
							/>
							<SettingsMenuItem label="Language" value="English" />
							<SettingsMenuItem label="Time zone" value="UTC" />
						</SettingsMenuList>
					</SettingsMenuPanel>
					<SettingsMenuPanel active={panel === "appearance"} slide="end">
						<SettingsMenuHeader onBack={() => setPanel("menu")}>
							Appearance
						</SettingsMenuHeader>
						<RadioGroup
							aria-label="Appearance"
							className="p-4 pt-0"
							value={appearance}
							onValueChange={(next) => setAppearance(String(next))}
						>
							{APPEARANCES.map((option) => (
								<SettingsMenuOption
									key={option.value}
									value={option.value}
									label={option.label}
								/>
							))}
						</RadioGroup>
					</SettingsMenuPanel>
				</SettingsMenuPanels>
			</SettingsMenuContent>
		</SettingsMenu>
	);
}

const meta = {
	component: SettingsMenuDemo,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A popover of settings rows that slide to a detail panel for changing one value. Install with `pnpm dlx shadcn@latest add @core/settings-menu`.",
			},
			// The story renders a stateful demo wrapper; show the real usage.
			source: {
				type: "code",
				code: `const [panel, setPanel] = useState("menu");
const [appearance, setAppearance] = useState("system");

<SettingsMenu>
  <SettingsMenuTrigger render={<Button variant="outline" />}>
    Settings
  </SettingsMenuTrigger>
  <SettingsMenuContent align="start">
    <SettingsMenuPanels>
      <SettingsMenuPanel active={panel === "menu"} slide="start">
        <SettingsMenuList>
          <SettingsMenuItem
            label="Appearance"
            tooltip="Applies to this browser only."
            value={appearance}
            onClick={() => setPanel("appearance")}
          />
        </SettingsMenuList>
      </SettingsMenuPanel>
      <SettingsMenuPanel active={panel === "appearance"} slide="end">
        <SettingsMenuHeader onBack={() => setPanel("menu")}>
          Appearance
        </SettingsMenuHeader>
        <RadioGroup
          aria-label="Appearance"
          value={appearance}
          onValueChange={(next) => setAppearance(String(next))}
        >
          <SettingsMenuOption value="light" label="Light" />
          <SettingsMenuOption value="dark" label="Dark" />
        </RadioGroup>
      </SettingsMenuPanel>
    </SettingsMenuPanels>
  </SettingsMenuContent>
</SettingsMenu>`,
			},
		},
	},
	decorators: [
		(Story) => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
} satisfies Meta<typeof SettingsMenuDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
		const menu = await screen.findByRole("dialog", { name: "Settings" });
		await waitFor(() => expect(menu).toBeVisible());

		const appearance = screen.getByRole("button", { name: /appearance/i });
		await expect(appearance).toHaveTextContent("Match system");
		await expect(
			screen.getByRole("button", { name: /language/i }),
		).toHaveTextContent("English");

		// Only the visible panel stays in the accessibility tree and in flow.
		const panels = menu.querySelectorAll("[data-slot=settings-menu-panel]");
		await expect(panels[0]).not.toHaveAttribute("data-hidden");
		await expect(panels[1]).toHaveAttribute("data-hidden");
		await expect(getComputedStyle(panels[1]).position).toBe("absolute");
	},
};

export const RowTooltip: Story = {
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
		const row = await screen.findByRole("button", { name: /appearance/i });

		await hover(row);
		await waitFor(() =>
			expect(screen.getByRole("tooltip")).toHaveTextContent(
				/applies to this browser only/i,
			),
		);

		// A row without a tooltip carries no dangling description reference.
		await expect(
			screen.getByRole("button", { name: /time zone/i }),
		).not.toHaveAttribute("aria-describedby");
	},
};

export const DetailPanel: Story = {
	play: async ({ canvas, userEvent }) => {
		await userEvent.click(canvas.getByRole("button", { name: "Settings" }));
		await userEvent.click(
			await screen.findByRole("button", { name: /appearance/i }),
		);

		const options = await screen.findByRole("radiogroup", {
			name: "Appearance",
		});
		await waitFor(() => expect(options).toBeVisible());
		await expect(screen.getAllByRole("radio")).toHaveLength(APPEARANCES.length);
		await expect(
			screen.getByRole("radio", { name: "Match system" }),
		).toBeChecked();

		await userEvent.click(screen.getByRole("radio", { name: "Dark" }));
		await expect(screen.getByRole("radio", { name: "Dark" })).toBeChecked();

		await userEvent.click(screen.getByRole("button", { name: "Back" }));
		await waitFor(() =>
			expect(
				screen.getByRole("button", { name: /appearance/i }),
			).toHaveTextContent("Dark"),
		);
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	args: { open: true },
};

export const OverviewDetailPanel: Story = {
	parameters: { chromatic: snapshot },
	args: { open: true, panel: "appearance" },
};

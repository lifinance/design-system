import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleHelpIcon, GaugeIcon, LayersIcon } from "lucide-react";
import { expect, screen, waitFor } from "storybook/test";
import { snapshot } from "@/.storybook/modes";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./navigation-menu";

const meta = {
	component: NavigationMenu,
	tags: ["ai-generated"],
	parameters: {
		docs: {
			description: {
				component:
					"A site navigation bar whose triggers reveal panels of links. Install with `pnpm dlx shadcn@latest add @core/navigation-menu`.",
			},
		},
		design: {
			type: "figma",
			url: "https://www.figma.com/design/RxWVNX8BNpsaE0Qn51vpwx/Shadcn-Craft---Library-?node-id=13-764",
		},
	},
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const products = [
	{
		title: "Analytics",
		href: "#analytics",
		description: "Track usage and conversion across every workspace.",
		icon: GaugeIcon,
	},
	{
		title: "Integrations",
		href: "#integrations",
		description: "Connect the tools your team already relies on.",
		icon: LayersIcon,
	},
	{
		title: "Support",
		href: "#support",
		description: "Reach the help center, status page, and live chat.",
		icon: CircleHelpIcon,
	},
];

function ProductMenu() {
	return (
		<NavigationMenu aria-label="Main">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Products</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[420px] gap-2 md:grid-cols-2">
							{products.map((product) => (
								<li key={product.title}>
									<NavigationMenuLink
										// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
										render={<a href={product.href} />}
										className="flex-col items-start gap-1"
									>
										<div className="flex items-center gap-2 font-medium">
											<product.icon />
											{product.title}
										</div>
										<span className="line-clamp-2 text-muted-foreground">
											{product.description}
										</span>
									</NavigationMenuLink>
								</li>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Resources</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[260px]">
							<li>
								<NavigationMenuLink
									// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
									render={<a href="#docs" />}
								>
									Documentation
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink
									// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
									render={<a href="#guides" />}
								>
									Guides
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink
									// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
									render={<a href="#changelog" />}
								>
									Changelog
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
						render={<a href="#pricing" />}
						className={navigationMenuTriggerStyle()}
					>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export const Default: Story = {
	render: () => <ProductMenu />,
	play: async ({ canvas, userEvent }) => {
		const trigger = canvas.getByRole("button", { name: /products/i });
		await expect(trigger).toHaveAttribute("aria-expanded", "false");

		await userEvent.click(trigger);
		await waitFor(() =>
			expect(trigger).toHaveAttribute("aria-expanded", "true"),
		);
		const analytics = await screen.findByRole("link", { name: /analytics/i });
		await waitFor(() => expect(analytics).toBeVisible());

		await userEvent.keyboard("{Escape}");
		await waitFor(() =>
			expect(trigger).toHaveAttribute("aria-expanded", "false"),
		);
		await waitFor(() =>
			expect(
				screen.queryByRole("navigation", { name: /submenu/i }),
			).not.toBeInTheDocument(),
		);
	},
};

export const PlainLink: Story = {
	render: () => (
		<NavigationMenu aria-label="Footer">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						// biome-ignore lint/a11y/useAnchorContent: the link places its content inside the anchor at runtime
						render={<a href="#pricing" />}
						className={navigationMenuTriggerStyle()}
					>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	),
	play: async ({ canvas }) => {
		const link = canvas.getByRole("link", { name: /pricing/i });
		await expect(link).toBeVisible();
		await expect(link).toHaveAttribute("href", "#pricing");
	},
};

export const Overview: Story = {
	parameters: { chromatic: snapshot },
	render: () => <ProductMenu />,
};

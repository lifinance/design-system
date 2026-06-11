---
name: migration
description: How to migrate a UI component from a source product repo (for example jumper-exchange) into a registry in this repo. Use whenever porting, migrating, or adapting an external component into @core, @widget, or a brand registry like @jumper, or converting an MUI component to our stack. It covers capturing the visual contract and tokens, finding the shadcn baseline, mapping tokens to our naming, choosing the registry, and installing the component with stories. Always apply when a task mentions migrating, porting, or bringing a component over from another repo.
user-invocable: false
---

# Component migration

Migrating a component means rebuilding what it does in our conventions: shadcn on Base UI, Tailwind v4, and our tokens. The source is usually MUI. Keep the behavior and the look. Do not reuse the source's code. Read the `design-tokens`, `writing`, and `shadcn` skills first; this skill sequences them for a migration.

Rebuild what the component does, not its original markup. The source's structure was written for a framework we no longer use, so it usually needs reworking. Write down what the component does (a card with artwork, a title, a description, and a badge), then build that from shadcn primitives. Do not copy the source's DOM, class names, or fixed measurements.

## Process

1. **Read the source and its story.** Find the component in the source repo and the story that surfaces it (the story shows the variants and states the team actually ships). Read the component, its style file, and any constants. When the source has no story, derive the contract from its usage sites.
2. **Capture the visual contract.** Write down structure, sizes, variants, states, and interactions. This is the contract the migration must preserve.
3. **List the tokens it uses.** Every color, radius, shadow, and font the source reads from its theme. These map to our tokens in step 5.
4. **Find the shadcn baseline.** For a primitive, read shadcn's Base UI version and compare conventions. For a domain composite with no shadcn match, build it from shadcn primitives rather than hand-rolling layout: a surface is a `Card`, a title-description-action row is an `Item`. List the primitives it compounds, and if a primitive is missing from core, add it to `@core` first (see below), then compose it.
5. **Choose the registry** (see below).
6. **Map tokens to our naming** (see below).
7. **Reimplement in our conventions** (see below).
8. **Install** the component: the source file, a manifest item, and one story whose docs description names the component and its `shadcn add` command. Adding a whole new brand also needs a `registry.<brand>.json` and a build script. The preview shows rendered JSX in the docs (the global `docs.source.type` is `dynamic`), so a compositional story reads cleanly; only a story that renders through a stateful demo wrapper needs an explicit `parameters.docs.source.code` with the real usage, so the docs show the component and not the wrapper.
9. **Verify in both light and dark** (see below).

## Choosing the registry

Pick the home by who the component belongs to, not by where it came from.

- **@core** for a primitive used across products (button, input, badge, card, avatar). If the widget would also have it, it is core.
- **@widget** for the LI.FI widget brand: its theme and any widget-only components.
- **@jumper / a brand registry** for components unique to one brand and irrelevant to core and widget (jumper's achievement, mission, and perks cards). A brand registry also owns that brand's theme as a `registry:theme` item.

Dependency direction is one way: a brand builds on core (`@jumper/tokens` depends on `@core/tokens`), and may build on the widget if it composes widget components. The widget never depends on a brand. Components stay brand-agnostic by reading role utilities, so any theme restyles them.

Each component is defined once in `@core` and is reused by brands through registry dependencies: each brand's `registry:style` extends `@core/base`, so it includes the whole core set without copying. A brand difference is either visual (values in `@<brand>/tokens`) or functional (a brand item with the **same name** as core's, listed after `@core/base` in the style, which replaces it last-wins). Use a functional override only when tokens cannot express the difference.

Within a registry, the item type and folder follow what the thing is. A primitive is `registry:ui` and lives in `ui/` (button, input, card, item). A composed component built from those primitives is `registry:component` and lives in `components/` (the achievement card). Match the item `type` in the manifest to the folder.

## Mapping tokens to our naming

Translate the source's theme tokens to ours per the `design-tokens` skill. Common MUI to ours:

| Source (MUI) | Ours |
| --- | --- |
| `palette.surface1` / a raised surface | `card` (`bg-card` / `text-card-foreground`) |
| `palette.text.secondary` | `muted-foreground` |
| `palette.on-primary` / `on-secondary` | `primary-foreground` / `secondary-foreground` |
| `palette.outline` / a surface border | `border` |
| status `success/error/warning` bg+fg | the `success` / `destructive` / `warning` role tokens |
| `shape.cardBorderRadius` / `buttonBorderRadius` | the radius scale (`rounded-xl`, `rounded-button`) |
| `shadows[n]` | `shadow-sm` / `shadow-md` |

Use a role token when one fits. Mint a component token (`--lifi-<component>-<property>`) only when the brand must vary a property no role covers. Size, weight, and spacing are not tokens; use the Tailwind scale.

## Reimplementing in our conventions

- Compose shadcn primitives. Build the structure from `Card`, `Item`, and the other primitives instead of nesting bare `div`s with hand-written layout classes. If the composite needs a primitive core lacks, add that primitive to `@core` from shadcn first, then compose it.
- Remove MUI. No `styled`, `sx`, `Box`, `Stack`, or `Typography`. Use the primitives above, or plain elements with Tailwind classes and `cn` where no primitive fits.
- Where the source used Radix `Slot` / `asChild`, use Base UI's `useRender` / `render`.
- Keep it framework-agnostic: a registry component is source, not app code. Use `<img>`, not `next/image`; take data through props, not the source's hooks or SDK.
- Drop the source's fixed measurements (`h-[420px]`, `w-[323px]`); use a scale step or a proportional rule such as `aspect-square` with a fluid `w-full`.
- Normalize the API to our idiom: prefer children and slots over `startIcon` / `endIcon` / `label` prop bags.

Authoring conventions, token use, sizing, naming, and prose follow `CLAUDE.md` and the `design-tokens` and `writing` skills; they are not repeated here.

## Verify in both light and dark

Always confirm both modes. The toolbar owns light and dark: a core component story previews every theme automatically, and a brand-specific story narrows to its theme with the `themes` parameter. Never hardcode a mode on a story (no `globals: { mode: "dark" }`) or add a "Dark" story; that duplicates the toolbar. The automated a11y test runs each story at its default mode, so switch to the other mode in Storybook to check it. Fix a contrast gap a brand surfaces with a minimal token nudge in that brand's manifest; the preview derives its themes from the manifests, so there is one place to change.

Run `pnpm biome check .`, `pnpm exec tsc -b`, the registry build (`pnpm registry:build:<brand>`), and the story tests (`pnpm exec vitest run --project=storybook`).

# Getting started

The LI.FI design system is a set of [shadcn registries](https://ui.shadcn.com/docs/registry) built on [Base UI](https://base-ui.com) and [Tailwind v4](https://tailwindcss.com/docs), distributed as source. Teams install components with the shadcn CLI and own the copied code; there is no runtime package. One core registry holds the shared components and base tokens, and each brand adds a theme and, where it needs one, a component of its own.

## The model

- **Each component is defined once, in `@core`.** A brand restyles it with design tokens, and adds its own component only when the behavior differs, not the color.
- **Storybook is the shared reference.** Designers, developers, and AI agents all use it to preview every component across every theme and mode.

The rest of this page is the workflow: design in Figma, build in the registry, preview and prototype in Storybook. For the registry model in depth, see [REGISTRY.md](./REGISTRY.md).

## Use a component in your app

1. Add the registries you need to your project's `components.json` ([namespaced registries](https://ui.shadcn.com/docs/registry/namespace)):

   ```json
   {
     "registries": {
       "@core": "https://lifinance.github.io/design-system/r/{name}.json",
       "@widget": "https://lifinance.github.io/design-system/r/widget/{name}.json",
       "@jumper": "https://lifinance.github.io/design-system/r/jumper/{name}.json"
     }
   }
   ```

2. Add one component, or a whole brand at once:

   ```bash
   pnpm dlx shadcn@latest add @core/button     # one component
   pnpm dlx shadcn@latest add @jumper/style    # the jumper set, themed
   ```

The code lands in your project as source you own. Each component's Storybook docs page names its `add` command.

## Build a component

```bash
pnpm install
pnpm storybook                              # preview at http://localhost:6006
pnpm test:storybook                         # story and accessibility tests in every theme and mode
pnpm typecheck                              # types
pnpm check                                  # lint and format
pnpm registry:build                         # build every registry into public/r
```

Pick the item type (below), add the source file, a manifest entry, and one story, then preview and test it. Match shadcn's components in their **base** variant, for example [Button](https://ui.shadcn.com/docs/components/base/button), not Radix. Four skills guide the work: [shadcn](.claude/skills/shadcn/SKILL.md) for the CLI and registry conventions, [migration](.claude/skills/migration/SKILL.md) for porting from another app, [design-tokens](.claude/skills/design-tokens/SKILL.md) for tokens and theming, and [writing](.claude/skills/writing/SKILL.md) for any text.

### Which item type

Pick the first that fits, reading top to bottom.

| Build this | shadcn's definition | Type | Folder |
| --- | --- | --- | --- |
| UI primitive | UI components and single-file primitives | `registry:ui` | `registry/<brand>/ui/` |
| Component | simple components | `registry:component` | `registry/<brand>/components/` |
| Block | complex components with multiple files | `registry:block` | `registry/<brand>/blocks/` |

A single-file primitive is `ui` (a button). A single component built from primitives is `component` (a mission card). Anything spanning multiple files is a `block`. A brand theme is none of these; it ships as a `registry:theme` item of token values.

## Design in Figma

Structure the Figma library to mirror the registry, so design and code stay aligned:

- Hold every theme as a [mode](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) in one **Variables** file. The modes carry the same values as the code tokens, so switching mode restyles every component. Keep the variable names matching the token names.
- Keep the shared components in one **Core** file, bound to those variables.
- Give a brand its own file only for the components it owns. A component that only changes color is the core component under the brand's mode, not a new component.

Link a Figma component to its story with the [Storybook Connect plugin](https://storybook.js.org/docs/sharing/design-integrations), so a designer opens the live story from Figma.

## Prototype with AI and the Storybook MCP

Storybook runs a [Model Context Protocol server](https://storybook.js.org/docs/ai) that lets an AI agent, such as [Claude](https://docs.claude.com/en/docs/claude-code), read the catalog directly. Through it the agent can:

- list every component and its stories,
- read prop types and real usage snippets,
- read each component's docs, which name its `add` command.

The agent finds the right component, sees how it is used, learns how to install it, and builds a prototype from real components. Point your agent at a running Storybook (`pnpm storybook`) and its MCP.

## From design to install

1. A designer names and draws the component in Figma, themed by mode.
2. A developer, or an AI agent following the skills, builds it in the registry.
3. Storybook previews it across every theme, and tests and accessibility checks run on it.
4. The Figma component links to the story, and a consumer installs it with shadcn.

Express a visual difference with a token. Express a behavioral difference with a brand component of the same name, which replaces the core one on install. Brands never copy components between each other.

## Reference

| Topic | Link |
| --- | --- |
| Registry model in this repo | [REGISTRY.md](./REGISTRY.md) |
| shadcn registries, CLI, namespaces | [ui.shadcn.com/docs/registry](https://ui.shadcn.com/docs/registry) |
| Base UI | [base-ui.com](https://base-ui.com) |
| Tailwind v4 | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Storybook, with AI | [storybook.js.org/docs](https://storybook.js.org/docs), [/ai](https://storybook.js.org/docs/ai) |
| Figma and Storybook (Storybook Connect) | [design integrations](https://storybook.js.org/docs/sharing/design-integrations) |
| Figma variables and modes | [help.figma.com](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) |
| Claude Code | [docs.claude.com](https://docs.claude.com/en/docs/claude-code) |

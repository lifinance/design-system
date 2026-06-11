# Registry model

This repo hosts the LI.FI design system as one or more [shadcn registries](https://ui.shadcn.com/docs/registry), distributed as source, not as a runtime package. Teams install components with the shadcn CLI and own the copied code.

**One repo, multiple brands.** shadcn namespaces are [decentralized](https://ui.shadcn.com/docs/registry/namespace), so `core` and each product registry are separate namespaced registries that live side by side in this repo. Each is its own manifest built to its own output path. There is no repo per product and no global prefix. Product registries build on `core` through cross-registry dependencies (see [Composition](#composition)).

## Namespaces

Each registry is a manifest, built to a distinct output path, and aliased in each consumer's `components.json`.

| Namespace | Manifest | Build output |
| --- | --- | --- |
| `@core` | `registry.json` | `public/r` |
| `@widget` | `registry.widget.json` | `public/r/widget` |
| `@jumper` | `registry.jumper.json` | `public/r/jumper` |
| `@perps` | `registry.perps.json` | `public/r/perps` |

Each further product adds a `registry.<product>.json` manifest the same way. A consumer wires the namespaces it needs; because everything is served from one host, they differ only by path:

```json title="components.json (consumer)"
{
  "registries": {
    "@core": "https://<host>/r/{name}.json",
    "@widget": "https://<host>/r/widget/{name}.json"
  }
}
```

The producer manifests declare no `registries` block of their own. That wiring lives in the consumer's `components.json`.

## Tokens

`lifi` appears in one place only: CSS token names, where the global CSS cascade and third-party embedding require unique names. Role tokens stay unprefixed (the shadcn base). Component tokens take a per-layer prefix: `--lifi-` for core, `--lifi-widget-` for widget, `--lifi-<product>-` for others. Use shadcn base tokens as-is, and never prefix them.

The token name grammar:

```
--[namespace]-[component]-[property]-[modifier]-[state]
```

Check for an existing shadcn token before adding one. New tokens are proposed through the [new token request](.github/ISSUE_TEMPLATE/new-token-request.md) template.

**One theme per namespace.** Each namespace ships its tokens as a `registry:theme` item whose `cssVars` (`light`, `dark`, `theme`) the CLI merges into the consumer's stylesheet on `add` (`light` into `:root`, `dark` into `.dark`, `theme` into the Tailwind `@theme` namespace). `@core/tokens` carries the base; a brand's tokens declare `registryDependencies: ["@core/tokens"]` and carry only their overrides. On install the CLI deep-merges `cssVars` across registries (last wins, see [dependency resolution](https://ui.shadcn.com/docs/registry/namespace#dependency-resolution)), so a brand's tokens layer over core. The merge is global to the consumer's `:root` and `.dark`; shadcn has no per-subtree theme scoping. The Storybook preview derives its themes from these manifests (see [Storybook conventions](#storybook-conventions)) and keeps no second copy of the values.

## Item types

Every manifest entry declares a `type`. The descriptions are shadcn's own (from the [registry-item schema](https://ui.shadcn.com/docs/registry/registry-item-json)); the last two columns show how each maps here.

| Type | shadcn description | Installs to | Authored under |
| --- | --- | --- | --- |
| `registry:ui` | UI components and single-file primitives | `aliases.ui` | `registry/<brand>/ui/` |
| `registry:component` | simple components | `aliases.components` | `registry/<brand>/components/` |
| `registry:block` | complex components with multiple files | `aliases.components` | `registry/<brand>/blocks/` |
| `registry:lib` | lib and utils | `aliases.lib` | `registry/<brand>/lib/` |
| `registry:hook` | hooks | `aliases.hooks` | `registry/<brand>/hooks/` |
| `registry:theme` | themes | `cssVars` merged into the stylesheet | manifest `cssVars` |
| `registry:base` | a design-system base | resolves its dependencies | manifest only |
| `registry:style` | a design-system style | resolves its dependencies and sets config | manifest only |

## Repo structure

```
registry.json              # @core manifest and @core/tokens theme
registry.widget.json       # @widget manifest and @widget/tokens theme
registry.jumper.json       # @jumper manifest and @jumper/tokens theme
registry.perps.json        # @perps manifest and @perps/tokens theme
components.json            # shadcn config
registry/
  core/                    # @core sources
    ui/                    #   registry:ui, single-file primitives
    components/            #   registry:component
    lib/                   #   registry:lib (cn)
  jumper/                  # @jumper sources
.storybook/                # Storybook preview, not distributed
```

Component sources nest under `registry/<brand>/<type>/`. The `<brand>` segment is required: it separates each registry's sources and is the segment the CLI keys the import rewrite off. Adding a brand is additive: a `registry.<brand>.json` manifest, a `registry:build:<brand>` script, and a `registry/<brand>/` directory once the brand ships its own files; a theme-only brand needs just the manifest. Storybook reads every `registry*.json` in the repo root, so a new manifest needs no Storybook wiring.

### Imports and the install-time rewrite

Inside the registry, an item imports siblings through the `@/registry/<brand>/<type>/...` path (resolved by the `@/registry/*` alias in `tsconfig` and `vite.config`), not from `@/components/...`. On `shadcn add` the CLI rewrites those to the consumer's aliases, so the `registry` segment never reaches installed code. The `<type>` segment picks the consumer alias (`ui` to `aliases.ui`, `lib` to `aliases.lib`, `hooks` to `aliases.hooks`, anything else to `aliases.components`), so place a file in the directory that matches the alias you want it installed under. List cross-registry deps in `registryDependencies` and npm deps in `dependencies`.

## Composition

A product item builds on `core` through cross-registry `registryDependencies`. The CLI installs the `@core/*` dependency first, then applies the product item. Nothing is forked, and there is no shared runtime package.

## Reuse and overrides

Each component is defined once, in `@core`. A brand does not copy them. It reuses them through registry dependencies, and adds its own theme and, where needed, its own component files. Two native shadcn primitives make this automatic:

- `@core/base` (`registry:base`) lists the base tokens and every core `ui` and `component` item in `registryDependencies`. It is the one place the core catalog is enumerated. Blocks are not part of it; they install individually.
- `@<brand>/style` (`registry:style`, `extends: "none"`) depends on `@core/base` plus the brand theme and any brand items. Installing it installs the entire core set with the brand theme applied, in one step. Add a component to `@core/base` and every brand inherits it on the next install.

```json title="@jumper/style"
{
  "name": "style",
  "type": "registry:style",
  "extends": "none",
  "registryDependencies": ["@core/base", "@jumper/tokens", "@jumper/achievement-card"]
}
```

Both kinds of brand difference are first-class:

- **Visual**: values only. Put the deltas in the brand's `registry:theme` (`@<brand>/tokens`). The shared component re-skins, with no new file.
- **Functional**: structure or behavior. Ship a brand item with the same name as the core one (for example `@widget/button` with its own file) and list it after `@core/base` in the brand style. shadcn resolves duplicate install paths last-one-wins (see [dependency resolution](https://ui.shadcn.com/docs/registry/namespace#dependency-resolution)), so the brand file replaces core's for that brand's consumers while the rest of the core set still installs.

A consumer installs a whole brand with its style, or cherry-picks from `@core`:

```bash
pnpm dlx shadcn@latest add @jumper/style     # the jumper design system
pnpm dlx shadcn@latest add @core/button      # one shared component
```

## Storybook conventions

The Storybook preview matches the registry: one story node per source file. The toolbar has two controls, theme and mode. Theme sets a `data-theme` attribute on `<body>`; mode toggles the `dark` class. A theme is never a separate copy of the story tree. A core component has a single story previewed across every theme; a brand-specific component pins the `theme` global in its meta, which locks the toolbar to that theme for its stories. A brand gets its own story only when it adds a real override file or a brand-specific component.

Autodocs is on for every component. Each story's docs description names the component and its shadcn install command, so the docs page and the Storybook MCP both show how to add it (the MCP reads the description and the story snippets, not arbitrary parameters).

The preview derives its themes from the manifests, which are the single source of token values. Each `registry:theme` item is one theme: `tokens` is the brand's default, and `tokens-<name>` is a named theme of the same brand, so `@widget/tokens-azure` appears as "Widget / Azure". A theme supports dark mode when its item carries a `dark` block. The base goes on `:root`; every other theme is a delta scoped under `[data-theme]`.

Tailwind needs the `@theme` registrations at build time, so the Storybook stylesheet declares them, the same registrations a consumer's stylesheet gets from `cssVars.theme` on install. Minting a token therefore touches two files: `registry.json` and `.storybook/index.css`.

### Visual regression

Chromatic bills per snapshot, so by default no story is snapshotted: `chromatic.disableSnapshot` is `true` in `.storybook/preview.tsx`. Documentation and test stories cost nothing, and a new story adds no snapshot unless someone opts it in.

Each component gets one `Overview` story that composes its variants, sizes, and states in a single frame and sets `chromatic: { disableSnapshot: false }`. That one story, in light and dark, regresses the whole component. The Controls table covers every option in the docs without a snapshot. The Design Tokens swatches are the one story snapshotted across every theme, so a changed token value is caught there. A theme with no overrides renders identically to core, so it gets no snapshot mode.

A full build stays at a handful of snapshots: one per component, plus the token swatches per theme. Run Chromatic only for changes under `registry/` or `.storybook/`.

## Building and hosting

```bash
pnpm registry:build          # build every registry into public/r
pnpm registry:build:core     # or one registry at a time
```

CI runs `pnpm registry:build` and deploys `public/` to GitHub Pages on every push to `main`. The build output is generated in CI, not committed. The published origin is `https://lifinance.github.io/design-system/r/{name}.json`. Consumers own the copied source and pull updates with `shadcn diff` on their own cadence.

## References

- shadcn registry, getting started: https://ui.shadcn.com/docs/registry/getting-started
- shadcn registry, namespaces: https://ui.shadcn.com/docs/registry/namespace
- registry.json schema: https://ui.shadcn.com/docs/registry/registry-json
- registry-item schema: https://ui.shadcn.com/docs/registry/registry-item-json

# Registry model

This repo hosts the LI.FI design system as [shadcn registries](https://ui.shadcn.com/docs/registry), distributed as source. Teams install components with the shadcn CLI and own the copied code. There is no runtime package.

The model has four levels: **namespace, style, theme, mode**. A namespace is one brand's registry. Each namespace ships one or more styles (structure) and one or more themes (color), and a theme carries a light and a dark mode. Every component is defined once in `@core`; each namespace builds the full set from that shared source with its own style and theme applied.

## Namespaces

A namespace is a registry: one manifest, built to its own output path, aliased in each consumer's `components.json`. shadcn namespaces are [decentralized](https://ui.shadcn.com/docs/registry/namespace), so `@core` and each brand sit side by side in this repo, with no per-product repo and no global prefix.

| Namespace | Manifest | Build output |
| --- | --- | --- |
| `@core` | `registry.json` | `public/r/core` |
| `@widget` | `registry.widget.json` | `public/r/widget` |
| `@jumper` | `registry.jumper.json` | `public/r/jumper` |
| `@perps` | `registry.perps.json` | `public/r/perps` |

Adding a brand is additive: a `registry.<brand>.json` manifest, a `registry:build:<brand>` script, and a `registry/<brand>/` source directory. A brand that only recolors needs just the manifest and a theme.

A consumer wires the namespaces it needs. The `{style}` placeholder resolves to the `style` field:

```json title="components.json (consumer)"
{
  "style": "default",
  "registries": {
    "@core": "https://lifinance.github.io/design-system/r/core/{style}/{name}.json",
    "@jumper": "https://lifinance.github.io/design-system/r/jumper/{style}/{name}.json"
  }
}
```

## Styles

A component is authored once with shadcn's `cn-*` style classes (`cn-button`, `cn-button-size-*`, `cn-button-variant-*`) and carries no geometry of its own. A **style** maps each `cn-*` class to Tailwind utilities and owns structure: padding, radius, sizing, and type scale.

`@core` defines the styles in `registry/core/styles/style-<name>.css`. A namespace overrides only the classes it changes in `registry/<brand>/styles/style-<name>.css`, so the core button is `rounded-lg` and jumper's is `rounded-full`, both from one `--radius`. The build layers a brand's delta over the core base for each style.

A namespace ships more styles by adding more `style-<name>.css` files, each built to `r/<ns>/<style>/`.

## Themes and modes

A **theme** is the color, font, and `--radius` values, shipped as a `registry:theme` item whose `cssVars` the CLI merges into the consumer's stylesheet on `add`: `light` into `:root`, `dark` into `.dark`, and `theme` into the Tailwind `@theme` namespace. `@core/tokens` carries the base palette; a brand theme declares `registryDependencies: ["@core/tokens"]` and carries only its overrides, which deep-merge over core (last wins, see [dependency resolution](https://ui.shadcn.com/docs/registry/namespace#dependency-resolution)). The merge is global to `:root` and `.dark`; shadcn has no per-subtree theme scoping.

A theme's **modes** are `light` and `dark`. A theme supports dark mode when its item carries a `dark` block, which the consumer toggles with the `dark` class. Add a theme as a `registry:theme` item: name it `tokens` for the brand default, or `tokens-<name>` for a named variant of the same brand.

A theme sets the native shadcn theme tokens: `--primary`, `--primary-foreground`, `--background`, `--radius`, and the rest of the shadcn base. A brand recolors by overriding these tokens, never by adding its own. Structure is not a token; it lives in the style.

## Distribution forms

The build emits two forms of every style, so a consumer chooses how styling arrives.

| Path | Form | Component source | Style ships as |
| --- | --- | --- | --- |
| `r/<ns>/<style>/<name>.json` | default | styled classes resolved to utilities | nothing; baked into the source |
| `r/<ns>/<style>/customize/<name>.json` | customize | styled classes kept as `lifi-*` | the item's `css` field, under `@layer components` |

The default form is shadcn's, with styling baked in. The customize form keeps each styled class as a `lifi-*` rule in the item's `css`, so a consumer restyles in plain CSS with no Tailwind build.

## Item types

Every manifest entry declares a `type`. The first three are the component types; pick the first that fits, reading top to bottom.

| Type | shadcn definition | Installs to | Authored under |
| --- | --- | --- | --- |
| `registry:ui` | UI components and single-file primitives | `aliases.ui` | `registry/<ns>/ui/` |
| `registry:component` | simple components | `aliases.components` | `registry/<ns>/components/` |
| `registry:block` | complex components with multiple files | `aliases.components` | `registry/<ns>/blocks/` |
| `registry:lib` | lib and utils | `aliases.lib` | `registry/<ns>/lib/` |
| `registry:hook` | hooks | `aliases.hooks` | `registry/<ns>/hooks/` |
| `registry:theme` | themes | `cssVars` merged into the stylesheet | manifest `cssVars` |
| `registry:base` | a design-system catalog | resolves its dependencies | manifest only |
| `registry:style` | a design-system style | resolves its dependencies and sets config | manifest only |

The three component types differ by shape and install target:

- **`registry:ui`** is a single-file primitive, for example a button or an input. It installs to `aliases.ui`.
- **`registry:component`** is one simple component, typically composing ui primitives, for example a mission card. It installs to `aliases.components`.
- **`registry:block`** is a complex component spanning multiple files. It installs to `aliases.components`.

The CLI keys the install alias off the file `type`: `registry:ui` to `aliases.ui`, `registry:lib` to `aliases.lib`, `registry:hook` to `aliases.hooks`, and everything else (including `registry:component` and `registry:block`) to `aliases.components`. Place a file under the directory that matches the alias you want.

## Composition and overrides

Each component is defined once, in `@core`; a brand reuses it through registry dependencies and never copies it. Two native shadcn items install a whole set in one step:

- `@core/base` (`registry:base`) lists the base tokens and every core ui and component item. It is the one place the core catalog is enumerated. Blocks install individually.
- `@<brand>/style` (`registry:style`, `extends: "none"`) depends on the base, the brand theme, and any brand components. Installing it installs the entire set with the brand theme and style applied.

```json title="@jumper/style"
{
  "name": "style",
  "type": "registry:style",
  "extends": "none",
  "registryDependencies": ["@core/base", "@jumper/tokens", "@jumper/mission-card"]
}
```

The build makes each namespace self-contained: it rescopes `@core/*` dependencies to `@<brand>/*` and includes the catalog in each brand, so `@jumper/style` resolves `@jumper/base` and `@jumper/button`. A brand theme keeps its `@core/tokens` dependency, because it extends the core palette.

A brand expresses three kinds of difference without forking:

- **Visual** (color, font, the `--radius` value): put it in the brand theme, with no new file.
- **Structural** (padding, radius step, sizing): put it in the brand's `style-<name>.css`, with no new file.
- **Functional** (behavior or markup): ship a brand item with the same name as the core one. shadcn resolves duplicate install paths last-one-wins, so the brand file replaces core's for that brand's consumers while the rest of the set still installs. Use it only when neither theme nor style can express the difference.

A consumer installs a whole brand, or cherry-picks from `@core`:

```bash
pnpm dlx shadcn@latest add @jumper/style     # the jumper design system
pnpm dlx shadcn@latest add @core/button      # one shared component
```

## Repo structure

```
registry.json              # @core manifest: catalog, base tokens, base
registry.widget.json       # @widget manifest: theme and style
registry.jumper.json       # @jumper manifest: theme, style, brand components
registry.perps.json        # @perps manifest
components.json            # shadcn config
registry/
  core/                    # @core sources
    ui/                    #   registry:ui, single-file primitives
    components/            #   registry:component
    lib/                   #   registry:lib (cn)
    styles/
      style-default.css    #   the default style: cn-* mapped to utilities
  jumper/                  # @jumper sources
    components/            #   jumper-only components
    styles/
      style-default.css    #   jumper's structural deltas
scripts/
  build-registry.mjs       # builds one namespace into the default and customize forms
.storybook/                # preview, not distributed
```

The `<ns>` segment separates each registry's sources and is the segment the CLI keys the import rewrite off.

### Imports and the install-time rewrite

Inside the registry, an item imports siblings through `@/registry/<ns>/<type>/...` (resolved by the `@/registry/*` alias in `tsconfig` and `vite.config`), not `@/components/...`. On `shadcn add`, the CLI rewrites those to the consumer's aliases, so the `registry` segment never reaches installed code. List cross-registry dependencies in `registryDependencies` and npm dependencies in `dependencies`.

## Storybook preview

Storybook previews every component across every theme and mode from source, with no build step. The toolbar has two controls: theme (sets `data-theme` and the brand's `data-style` on `<body>`) and mode (toggles the `dark` class). A core component has one story shown across every theme; a brand component pins its theme in meta. `.storybook/style-registry.css` imports each namespace's `styles/style-<name>.css`: the core style is the global base, and a brand's deltas are scoped under `[data-style]`, the attribute the decorator sets to the active brand.

The preview derives its themes from the manifests, the single source of token values. Each `registry:theme` item is one theme: `tokens` is the brand default, and `tokens-<name>` is a named theme of the same brand, so `@widget/tokens-azure` appears as "Widget / Azure". Tailwind needs the `@theme` registrations at build time, so `.storybook/index.css` declares them, the same registrations a consumer gets from `cssVars.theme` on install. Adding a theme value touches `registry.json` and `.storybook/index.css`.

Autodocs is on for every component, and each story's docs description names the component and its `add` command, so the docs page and the Storybook MCP both show how to install it.

### Visual regression

Chromatic runs in CI on every push and bills per snapshot, so snapshots are off by default (`chromatic.disableSnapshot` in `.storybook/preview.tsx`). Each component gets one `Overview` story that composes its variants, sizes, and states in one frame and opts in with the `snapshot` parameter; in light and dark, that regresses the whole component. The Design Tokens swatches opt in with `themeSnapshot`, the one story captured across every theme, so a changed token value is caught there.

## Figma

[Code Connect](https://developers.figma.com/docs/code-connect/) publishes code snippets into Figma Dev Mode and the Figma MCP server. Every ui primitive has a colocated `<name>.figma.tsx` next to `<name>.tsx` using the [React API](https://developers.figma.com/docs/code-connect/react/): `figma.connect(Component, url, { props, example })` maps a component set's properties to props, and `example` is the snippet Dev Mode shows. `figma.config.json` scopes parsing to `registry/**/*.tsx` and mirrors the tsconfig aliases. Point the connect URL at the component set node, not a single variant. Connect files are source, not registry items, so consumers never install them.

Publishing needs a Figma [personal access token](https://developers.figma.com/docs/code-connect/quickstart-guide/) with Code Connect set to Write and File content set to Read. Validate, then publish:

```bash
FIGMA_ACCESS_TOKEN=... pnpm exec figma connect publish --dry-run
FIGMA_ACCESS_TOKEN=... pnpm exec figma connect publish
```

The [designs addon](https://storybook.js.org/addons/@storybook/addon-designs) embeds the Figma frame next to a story: a component whose Figma counterpart exists sets `parameters.design` to the component set URL.

## Build and host

```bash
pnpm registry:build          # build every namespace into public/r
pnpm registry:build:core     # or one namespace
```

`build-registry.mjs <manifest> <namespace> <output>` builds, for each style, the default and customize forms from the shared `@core` source. CI runs `pnpm registry:build` and deploys `public/` to GitHub Pages on every push to `main`; the output is generated in CI, not committed. The published origin is `https://lifinance.github.io/design-system/r/<ns>/<style>/{name}.json`, with the customize form under `.../customize/`. Consumers own the copied source and pull updates with `shadcn diff` on their own cadence.

## References

- shadcn registry, getting started: https://ui.shadcn.com/docs/registry/getting-started
- shadcn registry, namespaces: https://ui.shadcn.com/docs/registry/namespace
- registry.json schema: https://ui.shadcn.com/docs/registry/registry-json
- registry-item schema: https://ui.shadcn.com/docs/registry/registry-item-json
- Code Connect React API: https://developers.figma.com/docs/code-connect/react/

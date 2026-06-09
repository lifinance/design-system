# LI.FI Design System — registry model

This repo hosts the LI.FI design system as one or more
[shadcn registries](https://ui.shadcn.com/docs/registry), distributed as source
**not** as a runtime package: teams install components with the shadcn CLI and
own the copied code.

**One repo, multiple brands.** shadcn namespaces are
[decentralized](https://ui.shadcn.com/docs/registry/namespace), so `core` and
each product registry (widget, perps, …) are **separate namespaced registries
that live side by side in this single repo** — each is its own manifest built to
its own output path. There is no need for a repo per product
and no global prefix. Product registries build on `core` via cross-registry
dependencies (see [Composition](#composition)).

## Namespaces

Each registry is a manifest in this repo, built to a distinct output path, and
**aliased locally** in each consumer's `components.json`.

| Namespace | Manifest               | Build output      |
| --------- | ---------------------- | ----------------- |
| `@core`   | `registry.json`        | `public/r`        |
| `@widget` | `registry.widget.json` | `public/r/widget` |
| `@perps`  | `registry.perps.json`  | `public/r/perps`  |

Each further product adds a `registry.<product>.json` manifest built to
`public/r/<product>` the same way.

A consumer wires the namespaces it needs. Because everything is served from one
host, the namespaces differ only by path:

```json title="components.json (consumer)"
{
  "registries": {
    "@core": "https://<host>/r/{name}.json",
    "@widget": "https://<host>/r/widget/{name}.json"
  }
}
```

Then installs by namespace:

```bash
npx shadcn@latest add @core/tokens
npx shadcn@latest add @widget/tokens
```

> Each registry only consumes the implicit `@shadcn` registry plus any LI.FI
> namespaces it composes with, so the producer manifests declare no `registries`
> block of their own — that wiring lives in the consumer's `components.json`.

## Tokens

### CSS-token prefix is the *only* place `lifi` appears

`lifi` is reserved for **CSS tokens**, where the global cascade and third-party
embedding make uniqueness real:

| Prefix             | Layer                |
| ------------------ | -------------------- |
| `--lifi-`          | core                 |
| `--lifi-widget-`   | widget               |
| `--lifi-<product>-`| other products       |

**shadcn base tokens are used as-is and never prefixed.**

### Naming convention

```
--[namespace]-[component]-[property]-[modifier]-[state]
```

Always check for an existing shadcn token before adding a new one. New tokens
are proposed via the [new token request](.github/ISSUE_TEMPLATE/new-token-request.md)
template.

### One theme per namespace

Each namespace ships its tokens as a **`registry:theme`** item whose **`cssVars`**
(`light` / `dark` / `theme`) the shadcn CLI merges into the consumer's stylesheet
on `add`. This is the canonical Tailwind v4 carrier — the older `tailwind` field
is [deprecated in favour of `cssVars`](https://ui.shadcn.com/docs/registry/registry-item-json)
(`light` → `:root`, `dark` → `.dark`, `theme` → the Tailwind `@theme` namespace).

- `@core/tokens` (in `registry.json`) carries the base layer.
- `@widget/tokens` (in `registry.widget.json`) declares
  `registryDependencies: ["@core/tokens"]` and carries only its `--lifi-widget-`
  overrides. Each further product adds its own item the same way.

A consumer installs the namespaces it needs; on install the CLI **deep-merges**
`cssVars` across registries (last wins —
[namespace dependency resolution](https://ui.shadcn.com/docs/registry/namespace#dependency-resolution)),
so a product's tokens layer on top of core. They coexist because the tokens are
**namespaced** (`--lifi-`, `--lifi-widget-`); shadcn base tokens are shared. Note
the merge is **global** to the consumer's `:root`/`.dark` — shadcn has no
per-subtree theme scoping (that would be a consumer-side Tailwind `@custom-variant`
+ data-attribute concern, outside the registry).

`src/index.css` is the **preview app's** harness — the base layer plus
`@theme inline` and `@custom-variant dark` that a consumer gets from their own
`shadcn init`. It is not distributed.

## Item types

Every manifest entry declares a `type`. The descriptions below are shadcn's own
(quoted verbatim from the [registry-item schema](https://ui.shadcn.com/docs/registry/registry-item-json));
the last two columns are how each maps in this repo.

| Type | shadcn description | Installs to | Authored under |
| ---- | ------------------ | ----------- | -------------- |
| `registry:ui` | Use for UI components and single-file primitives. | `aliases.ui` (`@/components/ui`) | `registry/<brand>/ui/` |
| `registry:component` | Use for simple components. | `aliases.components` (`@/components`) | `registry/<brand>/components/` |
| `registry:block` | Use for complex components with multiple files. | `aliases.components` | `registry/<brand>/blocks/` |
| `registry:lib` | Use for lib and utils. | `aliases.lib` (`@/lib`) | `registry/<brand>/lib/` |
| `registry:hook` | Use for hooks. | `aliases.hooks` (`@/hooks`) | `registry/<brand>/hooks/` |
| `registry:page` | Use for page or file-based routes. | per the file's `target` | — |
| `registry:file` | Use for miscellaneous files. | per the file's `target` | — |
| `registry:theme` | Use for themes. | merged as `cssVars` into the consumer's stylesheet | manifest `cssVars`, not files |
| `registry:style` | Use for registry styles. eg. `new-york`. | — | — |

In this repo today: `@core/input` is a `registry:ui`; `@core/tokens` and
`@widget/tokens` are `registry:theme`.

## Repo structure & conventions

```
registry.json              # @core manifest + @core/tokens theme (cssVars)
registry.widget.json       # @widget manifest + @widget/tokens theme (cssVars)
registry.perps.json        # @perps manifest + @perps/tokens theme (cssVars)
components.json            # shadcn config (Tailwind v4, new-york, neutral)
registry/
├── core/                 # @core sources
│   ├── ui/               #   registry:ui — single-file primitives
│   ├── components/       #   registry:component — simple components
│   └── blocks/           #   registry:block — complex, multi-file
├── widget/               # @widget sources
│   ├── components/
│   └── blocks/
└── perps/                # @perps sources
    ├── components/
    └── blocks/
src/index.css              # preview-app theme harness (base layer + @theme)
```

Themes live as `cssVars` in the manifests, not as files under `registry/`.
Component and block sources nest under `registry/<brand>/<type>/`; the `<brand>`
segment is **required** — it separates each registry's sources and gives the CLI
the segment it keys the import rewrite off (below). Adding another brand is
additive: a `registry.<brand>.json` manifest, a `registry/<brand>/` dir, and a
`registry:build:<brand>` script.

### Imports & the install-time rewrite

Inside the registry, an item imports siblings via the
**`@/registry/<brand>/<type>/...`** path (resolved by the `@/registry/*` alias in
`tsconfig`/`vite.config`) — not from `@/components/...` directly. On `shadcn add`
the CLI rewrites those to the **consumer's** aliases, so the `registry` segment
never reaches installed code:

| Author writes               | Consumer gets (rewritten)              |
| --------------------------- | -------------------------------------- |
| `@/registry/core/components/button` | `aliases.components` → `@/components/button` |
| `@/registry/core/blocks/foo`        | `aliases.components` → `@/components/foo`     |

The `<type>` segment selects the consumer alias (`ui`→`aliases.ui`,
`lib`→`aliases.lib`, `hooks`→`aliases.hooks`; anything else → `aliases.components`),
so place a file in the dir that matches the alias you want it installed under.

List cross-registry deps in `registryDependencies` (e.g. `@core/input`) and npm
deps in `dependencies`.

## Composition

A product item — theme or component — builds on `core` through cross-registry
`registryDependencies`. The CLI installs the `@core/*` dependency first, then
applies the product item. No forking, no shared runtime package, no separate repo.

```json title="a @widget block"
{
  "name": "swap-form",
  "type": "registry:block",
  "registryDependencies": ["@core/input", "@core/button"],
  "cssVars": { "light": { "lifi-widget-radius": "1rem" } }
}
```

Use shadcn's `include` only if a single combined build is ever needed; otherwise
prefer separate namespaced registries.

## Building the registries

```bash
pnpm registry:build          # builds every registry (core + widget + perps)
pnpm registry:build:core     # -> public/r/*.json
pnpm registry:build:widget   # -> public/r/widget/*.json
pnpm registry:build:perps    # -> public/r/perps/*.json
pnpm dev                     # serve locally
```

Served locally, the catalogs resolve to:

- `@core`   → `http://localhost:5173/r/registry.json`, items at `/r/<name>.json`
- `@widget` → `http://localhost:5173/r/widget/registry.json`, items at `/r/widget/<name>.json`
- `@perps`  → `http://localhost:5173/r/perps/registry.json`, items at `/r/perps/<name>.json`

## Hosting & install

CI (`.github/workflows/deploy-registry.yml`) runs `pnpm registry:build` and
deploys `public/` to **GitHub Pages** on every push to `main`. Build output
(`public/r`) is generated in CI, not committed. The published origin is:

```
https://lifinance.github.io/design-system/r/{name}.json
```

Consumers wire the namespaces they need in their own `components.json`:

```json title="components.json (consumer)"
{
  "registries": {
    "@core": "https://lifinance.github.io/design-system/r/{name}.json",
    "@widget": "https://lifinance.github.io/design-system/r/widget/{name}.json",
    "@perps": "https://lifinance.github.io/design-system/r/perps/{name}.json"
  }
}
```

Then install by namespace — cross-registry deps (`@core/tokens`) resolve through
the consumer's mapping:

```bash
pnpm dlx shadcn@latest add @core/input
```

Versioning: `main` publishes `latest`; tag releases for provenance. Consumers own
the copied source and pull updates with `shadcn diff` on their own cadence.

## References

- shadcn registry — getting started: https://ui.shadcn.com/docs/registry/getting-started
- shadcn registry — namespaces: https://ui.shadcn.com/docs/registry/namespace
- registry.json schema: https://ui.shadcn.com/docs/registry/registry-json
- registry-item schema: https://ui.shadcn.com/docs/registry/registry-item-json

# LI.FI Design System — `core`

The shared LI.FI design system, distributed as [shadcn registries](https://ui.shadcn.com/docs/registry).
This single repo hosts the **`core`** registry plus a namespaced registry per
product (widget, perps, …) that builds on `core` — see [`REGISTRY.md`](REGISTRY.md).
Components are distributed as source and installed with the shadcn CLI —
**teams own the copied code** (no runtime package).

Stack: Vite + React + TypeScript, Tailwind CSS v4, shadcn (new-york style,
neutral base).

## Getting started

```bash
pnpm install
pnpm dev               # run the registry app locally
pnpm build             # type-check + build the app
pnpm registry:build    # build every registry (core + widget) into public/r/
```

## Consuming the registries

Add the namespaces you need to your project's `components.json` (both are served
from one host, distinguished by path):

```json
{
  "registries": {
    "@core": "https://<host>/r/{name}.json",
    "@widget": "https://<host>/r/widget/{name}.json"
  }
}
```

Then install items by namespace — including each namespace's theme:

```bash
npx shadcn@latest add @core/tokens     # core theme (cssVars)
npx shadcn@latest add @widget/tokens   # widget theme, builds on @core/tokens
```

## Layout

```
registry.json              # @core manifest + @core/tokens theme (cssVars)
registry.widget.json       # @widget manifest + @widget/tokens theme (cssVars)
registry/core/             # @core component / block sources
registry/widget/           # @widget component / block sources
src/index.css              # preview-app theme harness
```

See [`REGISTRY.md`](REGISTRY.md) for the full model: namespaces, the token
convention, per-namespace theming, composition, and the install-time import
rewrite.

## Contributing

New tokens and components are proposed via the GitHub issue templates:

- [New token request](.github/ISSUE_TEMPLATE/new-token-request.md)
- [New component request](.github/ISSUE_TEMPLATE/new-component-request.md)

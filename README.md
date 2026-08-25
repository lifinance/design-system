# LI.FI design system

The shared LI.FI design system, distributed as [shadcn registries](https://ui.shadcn.com/docs/registry) and installed with the shadcn CLI. Teams own the copied source; there is no runtime package. The repo hosts the `core` registry plus a namespaced registry per product that builds on it.

Stack: React, TypeScript, Tailwind CSS v4, shadcn on Base UI.

## Getting started

```bash
pnpm install
pnpm storybook         # preview components at http://localhost:6006
pnpm registry:build    # build every registry into public/r
```

- [GETTING_STARTED.md](GETTING_STARTED.md): the dev, design, prototyping, Figma, and AI workflows.
- [REGISTRY.md](REGISTRY.md): the registry model (namespaces, styles, themes, modes, composition).

## Contributing

Propose new components through the [new component request](.github/ISSUE_TEMPLATE/new-component-request.md) GitHub issue template.

# Installation

This design system is distributed as [shadcn registries](https://ui.shadcn.com/docs/registry). Set up shadcn in a Tailwind v4 project, point at the registries, then add components with the CLI.

## Set up shadcn

Follow shadcn's [manual installation](https://ui.shadcn.com/docs/installation/manual). `shadcn init` requires a supported framework and stops with `could not detect a supported framework` in a library, so manual installation is the path that works everywhere.

Complete every step it lists; none is optional here:

- The dependencies it lists.
- The Tailwind entry CSS, which imports `shadcn/tailwind.css`.
- The `cn` helper in `lib/utils.ts`.
- The `@/*` path alias in `tsconfig.json`. The CLI reads this alias to resolve where components install, so the commands below fail without it. With `moduleResolution: "bundler"`, the alias needs no `baseUrl`.

If your project also uses a CSS framework such as MUI, import Tailwind without its preflight reset so the reset does not override that framework's styles. Replace `@import "tailwindcss";` with:

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

## Point at the registries

Add the registries to the `components.json` from the previous step, and set its `style` field. The `{style}` segment of each URL takes that value:

```json
{
  "style": "default",
  "registries": {
    "@core": "https://lifinance.github.io/design-system/r/core/{style}/{name}.json",
    "@widget": "https://lifinance.github.io/design-system/r/widget/{style}/{name}.json"
  }
}
```

## Add components

```bash
pnpm dlx shadcn@latest add @core/button
pnpm dlx shadcn@latest add @widget/style
```

`@core/button` adds one component. `@widget/style` adds a brand's full set and writes its theme tokens. To install the customize form, which you restyle in plain CSS through `lifi-*` classes, add `customize` to the path: `.../{style}/customize/{name}.json`. See [the registry model](./REGISTRY.md) for both forms.

## References

- [shadcn manual installation](https://ui.shadcn.com/docs/installation/manual)
- [shadcn registry namespaces](https://ui.shadcn.com/docs/registry/namespace)

---
name: design-tokens
description: The design-token strategy for this repo. Use whenever adding, naming, overriding, reading, or theming design tokens or CSS variables: role tokens, variant-state color tokens, brand themes, the cssVars in registry manifests (the single source the Storybook preview derives from), or any --lifi-* variable. Defines the naming convention, the shadcn base plus --lifi-* layer, how utilities are generated, and where values live. Always apply when touching tokens or theme values.
---

# Design tokens

Tokens are the color, font, and radius values of the system, written as CSS variables and consumed through Tailwind utilities. They are the shadcn base (role tokens) plus a small `--lifi-*` layer for interactive colors the base does not cover. Structure (padding, radius step, sizing) is not a token: it lives in a component's style. Reference: Linear EMB-401.

## Principles

1. **Reach for a role token first.** Add a `--lifi-*` token only for an interactive color no role token covers that a brand must set on its own.
2. **Register every utility in `@theme`.** Tailwind generates a utility only for a variable in a `@theme` namespace.
3. **Put values where they belong.** `@core/tokens` holds the base; a theme defines only its overrides.
4. **Tokenize color, font, and the `--radius` value, nothing else.** How much radius, padding, and size a component takes is its style, written with the Tailwind scale.
5. **Never hard-code a value, and never couple unrelated roles.** An input background is not a card.

## Critical rules

These are always enforced. Each links to a file with Incorrect/Correct pairs.

### [Naming and token kinds](./rules/naming.md)

- Role tokens are unprefixed (the shadcn base, plus `--success`, `--warning`, `--info`).
- Variant-state color tokens are `--lifi-<component>-<variant>-<state>`, for example `--lifi-button-primary-hover`. Each derives from a role token by default; a brand overrides it.
- Mint a token only for an interactive color a brand must set itself; read role utilities directly otherwise.

### [Theming and where values live](./rules/theming.md)

- A new color or radius needs a `@theme` mapping in `@core/tokens`, or no utility is generated.
- The registry manifests are the single source of token values; a theme's `cssVars` carries overrides only, and the Storybook preview derives its themes from them.
- A value that differs by mode must appear in both the `light` and `dark` blocks.
- Mode (light or dark) is the `.dark` class; theme (which token set) is `data-theme`. They are independent.

### [Writing token utilities](./rules/usage.md)

- Style with token utilities (`bg-card`, `border-input`, `rounded-lg`), never raw values.
- Pair a surface with its foreground (`bg-primary` with `text-primary-foreground`).
- Size and space with the Tailwind scale (`h-11.5`, `px-3.5`), not tokens or arbitrary values.

## Detailed references

- [rules/naming.md](./rules/naming.md): naming grammar, role tokens, variant-state color tokens, namespaces.
- [rules/theming.md](./rules/theming.md): `@theme` registration, where values live, manifests vs Storybook, mode vs theme.
- [rules/usage.md](./rules/usage.md): token utilities, surface and foreground pairing, sizing.

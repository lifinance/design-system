---
name: design-tokens
description: The design-token strategy for this repo. Use whenever adding, naming, overriding, reading, or theming design tokens or CSS variables: role tokens, component tokens, brand themes, the cssVars in registry manifests (the single source the Storybook preview derives from), or any --lifi-* variable. Defines the naming convention, the shadcn base plus --lifi-* layers, how utilities are generated, and where values live. Always apply when touching tokens or styling values.
user-invocable: false
---

# Design tokens

Tokens are the only configurable surface of the system: color, radius, and typography, written as CSS variables and consumed through Tailwind utilities. They are the shadcn base (role tokens) plus a small `--lifi-*` layer for needs the base does not cover. Reference: Linear EMB-401.

## Principles

1. **Reach for a role token first.** Add a component token only when no role token covers the need and a brand must be able to set it on its own.
2. **Register every utility in `@theme`.** Tailwind generates a utility only for a variable in a `@theme` namespace.
3. **Put values where they belong.** `@core/tokens` holds the base. A theme defines only its overrides.
4. **Tokenize the configurable surface, nothing else.** Color, radius, and font are tokens. Component sizing is written in the component with the Tailwind scale.
5. **Never hard-code a value, and never couple unrelated roles.** An input background is not a card.

## Critical rules

These are always enforced. Each links to a file with Incorrect/Correct pairs.

### [Naming and token kinds](./rules/naming.md)

- Role tokens are unprefixed (the shadcn base, plus `--success`, `--warning`, `--info`). Component tokens are `--lifi-<component>-<property>`.
- A component token derives from a role token by default; a brand overrides it.
- Interactive colors are `--lifi-<component>-<variant>-<state>`, for example `--lifi-button-primary-hover`.
- Mint a token only for the configurable surface; derive the rest in component code.

### [Theming and where values live](./rules/theming.md)

- A new color or radius needs a `@theme` mapping in `@core/tokens`, or no utility is generated.
- The registry manifests are the single source of token values; a theme's `cssVars` carries overrides only, and the Storybook preview derives its themes from them.
- A value that differs by mode must appear in both the `light` and `dark` blocks.
- Mode (light or dark) is the `.dark` class; theme (which token set) is `data-theme`. They are independent.

### [Consuming tokens in a component](./rules/usage.md)

- Style with token utilities (`bg-card`, `border-input`, `rounded-lg`), never raw values.
- Pair a surface with its foreground (`bg-primary` with `text-primary-foreground`).
- Size with the Tailwind scale (`h-11.5`, `px-3.5`), not tokens or arbitrary values.

## Detailed references

- [rules/naming.md](./rules/naming.md): naming grammar, role vs component tokens, variant and state tokens, namespaces.
- [rules/theming.md](./rules/theming.md): `@theme` registration, where values live, manifests vs Storybook, mode vs theme.
- [rules/usage.md](./rules/usage.md): consuming tokens in components, surface and foreground pairing, sizing.

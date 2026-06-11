# Theming and where values live

## Contents

- Register utilities in @theme
- The manifests are the single source
- Mode-specific values
- Mode vs theme

---

## Register utilities in @theme

Tailwind v4 generates a utility only for a variable in a `@theme` namespace ([why @theme, not :root](https://tailwindcss.com/docs/theme#why-theme-instead-of-root)). A color that never reaches `@theme` produces no `bg-*`, `text-*`, or `border-*`.

**Incorrect** (value only, so no utility is generated):

```css
:root { --success: oklch(0.64 0.16 154); }
```

**Correct** (value plus the `@theme` mapping, shipped in `@core/tokens` cssVars.theme):

```css
@theme inline { --color-success: var(--success); }   /* bg-success and text-success now exist */
:root { --success: oklch(0.64 0.16 154); }
```

Tailwind needs the `@theme` mapping at build time, so the Storybook preview cannot inject it at runtime. A new mapping goes in two places: `cssVars.theme` in `registry.json` (consumers get it on install) and the `@theme inline` block in `.storybook/index.css` (the preview gets it at build).

---

## The manifests are the single source

The registry manifests hold every token value. `@core/tokens` defines the base; a theme's `cssVars` defines only its overrides. A consumer installs `@core/tokens` for the base, then a theme layers its overrides through `registryDependencies`. The Storybook preview keeps no copy of the values: `.storybook/modes.ts` derives the theme list from the manifests, and `.storybook/themes.ts` builds the preview CSS from the same list (`@core/tokens` on `:root`, every other theme scoped under `[data-theme]`). The `@theme` block in `.storybook/index.css` is the one hand-declared piece.

**Incorrect** (a theme repeating values that equal `@core/tokens`):

```json
{ "light": { "background": "oklch(1 0 0)", "primary": "oklch(0.58 0.22 274)" } }
```

**Correct** (only the override; `background` comes from `@core/tokens`):

```json
{ "light": { "primary": "oklch(0.58 0.22 274)" } }
```

---

## Mode-specific values

A value that differs between light and dark must appear in both the `light` and `dark` blocks, or it freezes at its light value.

---

## Mode vs theme

Two independent axes. Mode is light or dark, the `.dark` class. Theme is which token set is active, the `data-theme` attribute. A widget theme is its own token set, not a mode of core.

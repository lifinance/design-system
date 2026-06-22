# Naming and token kinds

## Contents

- Naming grammar
- Role tokens
- Variant-state color tokens
- Namespaces

---

## Naming grammar

Names are lowercase and hyphen-separated:

```
--[namespace]-[component]-[variant]-[state]
```

Everything after the namespace is optional. Each segment maps to a path in the [W3C Design Tokens format](https://www.designtokens.org/tr/2025.10/format/), so `--lifi-button-primary-hover` is `lifi.button.primary.hover`.

The values in the examples below illustrate the shape. The live values are in `registry.json` and the brand manifests; read them there, never from this file.

---

## Role tokens

Semantic and unprefixed: the shadcn base (`--background`, `--primary`, `--radius`, `--ring`), plus roles a brand needs that shadcn omits (`--success`, `--warning`, `--info`). They live in `@core/tokens`. Reach for a role token first.

Typography is the `--font-sans` base token. A brand sets it in its theme (`"font-sans": "Inter, sans-serif"` in its `cssVars`); there are no component font tokens.

---

## Variant-state color tokens

Prefixed `--lifi-`, for an interactive color that no role token covers and that a brand must be able to set on its own: `--lifi-<component>-<variant>-<state>`. The property (a background, a ring) is implied by the utility you apply it with. Each derives from a role token by default; a brand overrides it.

```css
/* @theme inline in @core/tokens: one mapping per state color */
--color-button-primary-hover:  var(--lifi-button-primary-hover);   /* hover:bg-button-primary-hover */
--color-button-primary-active: var(--lifi-button-primary-active);  /* active:bg-button-primary-active */
--color-button-primary-focus:  var(--lifi-button-primary-focus);   /* focus-visible:ring-button-primary-focus */

/* per theme: each derives from a role token */
--lifi-button-primary-hover:  color-mix(in oklch, var(--primary), var(--primary-foreground) 12%);
```

Mint a token only when a brand must set that variant and state on its own. When a state already matches a role token, apply that utility in the style and add no token.

**Incorrect** (a token for a state the style can read from a role token):

```css
--lifi-button-outline-hover: var(--muted);
```

**Correct** (the outline variant reads the role utility directly):

```css
.cn-button-variant-outline { @apply hover:bg-muted; }
```

---

## Namespaces

| Prefix | Layer |
| --- | --- |
| *(none)* | shadcn base and role tokens |
| `--lifi-` | additions that shadcn lacks |
| `--lifi-widget-` | widget-specific tokens |
| `--lifi-<product>-` | another LI.FI product (for example perps) |

# Naming and token kinds

## Contents

- Naming grammar
- Role tokens
- Component tokens
- Variant and state tokens
- Namespaces

---

## Naming grammar

Names are lowercase and hyphen-separated:

```
--[namespace]-[component]-[property]-[modifier]-[state]
```

Everything after the namespace is optional. Each segment maps to a path in the [W3C Design Tokens format](https://www.designtokens.org/tr/2025.10/format/), so `--lifi-button-radius` is `lifi.button.radius`.

The values in the examples below illustrate the shape. The live values are in `registry.json` and the brand manifests; read them there, never from this file.

---

## Role tokens

Semantic and unprefixed: the shadcn base (`--background`, `--primary`, `--radius`, `--ring`), plus roles a brand needs that shadcn omits (`--success`, `--warning`, `--info`). They live in `@core/tokens`. Reach for a role token first.

Typography is the `--font-sans` base token. A brand sets it in its theme (`"font-sans": "Inter, sans-serif"` in its `cssVars`); there are no component font tokens.

---

## Component tokens

Prefixed `--lifi-`, for one component property that no role token covers and that a brand must be able to set on its own. A component token derives from a role token by default; a brand overrides it.

**Incorrect** (a generic name, and a value the role layer already expresses):

```css
--lifi-radius-secondary: 0.75rem;
```

**Correct** (named for the component, derived from a role token, overridable per theme):

```css
/* @theme inline in @core/tokens: maps the token to a utility */
--radius-button: var(--lifi-button-radius);   /* utility: rounded-button */

/* per theme: the default aliases a role token, a brand overrides */
[data-theme="core"]   { --lifi-button-radius: var(--radius); }
[data-theme="jumper"] { --lifi-button-radius: calc(infinity * 1px); }
```

---

## Variant and state tokens

Interactive colors are `--lifi-<component>-<variant>-<state>`. The property (a background, a ring) is implied by the utility you apply it with.

```css
/* @theme inline in @core/tokens: one mapping per state color */
--color-button-primary-hover:  var(--lifi-button-primary-hover);   /* hover:bg-button-primary-hover */
--color-button-primary-active: var(--lifi-button-primary-active);  /* active:bg-button-primary-active */
--color-button-primary-focus:  var(--lifi-button-primary-focus);   /* focus-visible:ring-button-primary-focus */

/* per theme: each derives from a role token */
--lifi-button-primary-hover:  color-mix(in oklch, var(--primary), var(--primary-foreground) 12%);
```

Mint a token only when a brand must set that variant and state on its own. When a state already matches a role token, write that utility in the component and add no token.

**Incorrect** (a token for a state the component can derive from a role token):

```css
--lifi-button-outline-hover: var(--muted);
```

**Correct** (the outline variant reads the role utility directly):

```tsx
<button className="hover:bg-muted" />
```

---

## Namespaces

| Prefix | Layer |
| --- | --- |
| *(none)* | shadcn base and role tokens |
| `--lifi-` | additions that shadcn lacks |
| `--lifi-widget-` | widget-specific tokens |
| `--lifi-<product>-` | another LI.FI product (for example perps) |

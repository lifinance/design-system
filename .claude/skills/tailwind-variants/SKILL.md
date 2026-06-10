---
name: tailwind-variants
description: Styling layer for the LI.FI design system. Use whenever authoring or editing component styling, variants, slots, or class composition in this repo. We style with tailwind-variants (`tv()`), which has tailwind-merge built in — this supersedes raw `cn()` from the shadcn skill for components we author. Triggers on tv, tailwind-variants, variants, slots, styling a component, class merging.
user-invocable: false
---

# tailwind-variants (tv) — this repo's styling layer

This design system styles components with **[tailwind-variants](https://www.tailwind-variants.org/docs/introduction)** (`tv()`), not raw `cn()`. `tv()` bundles `tailwind-merge`, so it resolves conflicting Tailwind classes **and** merges a passed `className` automatically.

> Coherence note: the `shadcn` skill's `styling.md` shows `cn()`. **This repo does not use `cn()` at all — there is no `cn` util.** Author all component styling with `tv()`; it replaces `cn()` for class composition and merging (tailwind-merge is built in). This supersedes the shadcn skill's `cn()` guidance everywhere in this repo.

## Rules

- **Use `tv()` for authored components.** Define styling in a `tv({ base, variants, ... })` and call it: `input({ size: "sm", className })`.
- **Do not wrap `tv()` output in `cn()`.** `tv()` already runs tailwind-merge; double-merging is redundant and can fight itself. Pass the consumer `className` *into* the call (`input({ className })`), don't merge it outside.
- **Token-driven, never hard-coded.** Read design tokens — role tokens (`--input`, `--muted-foreground`, `--ring`, `--destructive`) and `--lifi-*` component tokens (e.g. `--lifi-input-height`) — via semantic utilities or `var()`/arbitrary values. Never raw colors (`bg-blue-500`) or magic px when a token exists. Brand theming happens by overriding tokens, not by forking the component.
- **Keep `data-slot="<name>"`** on the rendered element (shadcn convention, styling/test hook).
- **Base UI primitives**: alias the imported primitive as `<Name>Primitive` (e.g. `import { Input as InputPrimitive } from "@base-ui/react/input"`).

## API (from tailwind-variants.org)

```tsx
import { tv, type VariantProps } from "tailwind-variants"

const input = tv({
  base: "flex w-full min-w-0 outline-none …",      // applied to all instances
  variants: {                                       // named style axes
    size: { sm: "h-8 text-sm", md: "h-9", lg: "h-10 text-base" },
    invalid: { true: "border-destructive" },
  },
  compoundVariants: [                               // styles for combinations
    { size: "lg", invalid: true, class: "ring-2" },
  ],
  defaultVariants: { size: "md" },                  // used when a variant is unset
})

type InputVariants = VariantProps<typeof input>     // extract prop types
```

- **`slots`** — style multi-part components in one definition: `tv({ slots: { root: "…", label: "…" } })`; call returns a function per slot.
- Calling `input({ size, className })` returns the merged class string (tailwind-merge applied, `className` merged last).

## Component pattern (this repo)

```tsx
import { Input as InputPrimitive } from "@base-ui/react/input"
import type * as React from "react"
import { tv } from "tailwind-variants"

const input = tv({
  base: [
    "flex w-full min-w-0 px-3 py-1 outline-none …",
    "[height:var(--lifi-input-height,2.25rem)] [border-radius:var(--lifi-input-radius,var(--radius-md))]",
    "border border-input placeholder:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:border-destructive",
  ],
})

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <InputPrimitive type={type} data-slot="input" className={input({ className })} {...props} />
}

export { Input }
```

## Setup

`tailwind-variants` is the styling dependency for authored components. When you add the first `tv()` component to the registry, install it (`pnpm add tailwind-variants`) and list it in the registry item's npm `dependencies`. Peer `tailwind-merge` (`>=3`) is already present.

## Reference

- Introduction & full API: https://www.tailwind-variants.org/docs/introduction

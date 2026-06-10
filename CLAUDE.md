# design-system

A shadcn registry built on **Base UI** (`@base-ui/react`) + Tailwind v4, distributed as source. See `REGISTRY.md` for the full model.

## shadcn component reference — ALWAYS use the Base UI variant

This registry is Base UI, not Radix. When consulting shadcn for a component (docs, source, conventions), use the **base** variant:

- Docs: `https://ui.shadcn.com/docs/components/base/<name>` (the Radix variant lives at `/docs/components/radix/<name>` — do not use it).
- Source of truth: `shadcn-ui/ui` → `apps/v4/registry/bases/base/ui/<name>.tsx` (fetch via `gh api repos/shadcn-ui/ui/contents/...`).

Match shadcn's Base UI authoring conventions:

- Alias the primitive import as `<Name>Primitive` — e.g. `import { Input as InputPrimitive } from "@base-ui/react/input"` (not `BaseInput`).
- `import * as React from "react"`, `data-slot="<name>"`, `cn(...)` for class merge, `export { <Name> }`.

Note: the shadcn MCP only exposes the default (Radix) `@shadcn` registry, so for Base UI parity rely on the base docs/source URLs above, not the MCP's `@shadcn/<name>` item.

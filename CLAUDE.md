# design-system

A shadcn registry built on **Base UI** (`@base-ui/react`) + Tailwind v4, distributed as source. See `REGISTRY.md` for the full model.

## Skills — always apply in this repo

Always use the **`shadcn`** skill (`.claude/skills/shadcn`) when working in this repo — registry, components, CLI, docs, composition, and styling. Follow it as-is; style components the shadcn-base way with **`cn()`** (class merge) and **`cva`** / `class-variance-authority` (variants).

## shadcn component reference — ALWAYS use the Base UI variant

This registry is Base UI, not Radix. When consulting shadcn for a component (docs, source, conventions), use the **base** variant:

- Docs: `https://ui.shadcn.com/docs/components/base/<name>` (the Radix variant lives at `/docs/components/radix/<name>` — do not use it).
- Source of truth: `shadcn-ui/ui` → `apps/v4/registry/bases/base/ui/<name>.tsx` (fetch via `gh api repos/shadcn-ui/ui/contents/...`).

Match shadcn's Base UI authoring conventions:

- Alias the primitive import as `<Name>Primitive` — e.g. `import { Input as InputPrimitive } from "@base-ui/react/input"` (not `BaseInput`).
- `import * as React from "react"` (our Biome converts type-only to `import type`), `data-slot="<name>"`, `cn(...)` for class merge, `cva` for variants, `export { <Name> }`.

## components.json — base configuration

`components.json` uses **`"style": "base-nova"`**, so `shadcn info` reports `base: base` and the CLI resolves the Base UI docs/source. There is **no separate `base` field** — the primitive library is encoded in `style` (`base-*` = Base UI, `radix-*`/`new-york` = Radix). It is set via `pnpm dlx shadcn@latest init --base base` (which requires a base preset); `base-nova` is the chosen preset. We theme on top with our own tokens (`--lifi-*` + the `@core/tokens` set); the preset is the Base UI marker, not a constraint on our tokens.

Note: the shadcn MCP only exposes the default Radix `@shadcn` registry, so for Base UI parity rely on the base docs/source URLs above, not the MCP's `@shadcn/<name>` item.

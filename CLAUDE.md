# design-system

A shadcn registry built on **Base UI** (`@base-ui/react`) + Tailwind v4, distributed as source. See `REGISTRY.md` for the full model.

## Skills

Always use these project skills when working in this repo:

- **`shadcn`** (`.claude/skills/shadcn`): registry, components, CLI, docs, composition, styling. Style the shadcn-base way with **`cn()`** (class merge) and **`cva`** / `class-variance-authority` (variants).
- **`design-tokens`** (`.claude/skills/design-tokens`): the token strategy. Apply whenever adding, naming, overriding, or reading design tokens. Source: Linear EMB-401.
- **`migration`** (`.claude/skills/migration`): the process for porting a component from a product repo into a registry here.
- **`writing`** (`.claude/skills/writing`): the writing voice for all prose. Apply before writing or editing any text.

The harness enforces this. A `PreToolUse` hook (`.claude/hooks/require-skills.sh`) maps each edited file to the skills that govern it and blocks the edit until those skills are invoked in the session: `registry/**` needs `shadcn` and `design-tokens`, a `*.stories.tsx` adds `writing`, the manifests (`registry*.json`, `components.json`) need all three, and any prose (`*.md`) needs `writing`. Invoke the named skill, then retry.

### MCP servers

The project MCP servers in `.mcp.json` are auto-enabled (`enableAllProjectMcpServers`) and expected for contribution:

- **`storybook`** drives stories and tests: call `get-storybook-story-instructions` before writing a story, `run-story-tests` after, and report `preview-stories` URLs. It serves from the local Storybook on `http://localhost:6006`; a `SessionStart` hook (`.claude/hooks/launch-storybook.sh`) starts it if it is not already running.
- **`shadcn`** is the component reference for the Base UI variant.
- **`aria`** verifies roles, accessible names, and attributes against the ARIA spec. A clean axe run is necessary but not sufficient; check the spec.

### Where the shadcn skill and this repo disagree

The `shadcn` skill is vendored (tracked in `skills-lock.json`); never edit its files. Where it conflicts with this repo, the repo wins:

- Token values live in the registry manifests, not in the Tailwind CSS file (the `design-tokens` skill overrides the skill's `customization.md`). The `@theme` block in `.storybook/index.css` is hand-authored; a new mapping goes there and in `cssVars.theme`.
- Base UI source is fetched with `gh api` (see below). This overrides the skill's "never fetch raw files from GitHub", which assumes the CLI can serve the needed variant; for Base UI source it cannot.
- Registry choice for a new item follows the `migration` skill's ownership rules, not "ask which registry".

## shadcn component reference (Base UI variant only)

This registry is Base UI, not Radix. When consulting shadcn for a component (docs, source, conventions), use the **base** variant:

- Docs: `https://ui.shadcn.com/docs/components/base/<name>` (the Radix variant lives at `/docs/components/radix/<name>`; do not use it).
- Source of truth: `shadcn-ui/ui` → `apps/v4/registry/bases/base/ui/<name>.tsx` (fetch via `gh api repos/shadcn-ui/ui/contents/...`).

Upstream has moved its base components to `cn-*` preset classes defined in CSS. This repo keeps the inline Tailwind utility convention. When matching upstream, mirror the structure, props, and `data-slot` contract, and translate `cn-*` classes back to inline utilities. Translation applies the repo's value rules, which win over a verbatim copy: convert an arbitrary pixel value to the scale step that equals it (`ring-3` not `ring-[3px]`, `min-w-24` not `min-w-[96px]`), keeping the arbitrary form only when no scale step matches. See the `design-tokens` skill.

Match shadcn's Base UI authoring conventions:

- Alias the primitive import as `<Name>Primitive`, for example `import { Input as InputPrimitive } from "@base-ui/react/input"` (not `BaseInput`).
- `import * as React from "react"` (our Biome converts type-only to `import type`), `data-slot="<name>"`, `cn(...)` for class merge, `cva` for variants, `export { <Name> }`.

## components.json

`components.json` uses **`"style": "base-nova"`**. The primitive library is encoded in `style` (`base-*` = Base UI, `radix-*`/`new-york` = Radix); there is no separate `base` field. We theme on top with our own tokens; the preset is the Base UI marker, not a constraint on our tokens.

Note: the shadcn MCP only exposes the default Radix `@shadcn` registry, so for Base UI parity rely on the base docs/source URLs above, not the MCP's `@shadcn/<name>` item.

## Quality bar

- Apply the whole of each governing skill, not just its `SKILL.md`: the `shadcn` skill's `rules/` and `evals/`, and the `design-tokens` rules. Where a repo rule conflicts with a verbatim upstream copy, the repo rule wins (for example the arbitrary-value rule above).
- Solve the root cause, not the symptom. A `biome-ignore` is allowed only when it suppresses a rule that is wrong for genuinely correct code, with a short factual reason; it must never hide a fixable problem (key a list by a stable field, do not silence the index-key rule).
- Verify accessibility against the official WAI-ARIA specification and Authoring Practices (and the `aria` MCP), not against axe alone. A clean axe run is necessary but not sufficient; confirm required roles, names, states, and relationships against the spec.
- When a fix turns on runtime behavior (does a primitive emit an attribute, does a utility compile), confirm it by running the code, not by reading source.

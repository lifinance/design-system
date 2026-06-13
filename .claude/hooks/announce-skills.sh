#!/bin/bash
# SessionStart hook. Announces the project's required skills and MCP servers so
# every contributor session applies them from the first turn (see CLAUDE.md).
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"Contribution rules for this repo (see CLAUDE.md). Always use these project skills, invoking the relevant one before editing the files it governs: shadcn (registry, components, styling with cn and cva), design-tokens (token naming and theming), migration (porting a component into a registry), writing (all prose). A PreToolUse hook also flags each governed file on edit. Always use the project MCP servers: storybook (call get-storybook-story-instructions before writing or editing a story, run-story-tests after, and report preview-stories URLs), shadcn (Base UI component reference), and aria (verify roles, accessible names, and attributes against the ARIA spec; a clean axe run is necessary but not sufficient). The Storybook MCP needs the local Storybook running on http://localhost:6006."}}
JSON

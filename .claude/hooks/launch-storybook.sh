#!/bin/bash
# SessionStart hook. The Storybook MCP serves from the local Storybook dev
# server, so this starts it on http://localhost:6006 if it is not already up,
# making the MCP work without manual setup. Non-blocking; skipped in CI.

[ -n "${CI:-}" ] && exit 0

# Already listening? Nothing to do.
if curl -s -o /dev/null --max-time 2 "http://localhost:6006"; then
	exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$PWD}" || exit 0
command -v pnpm >/dev/null 2>&1 || exit 0

nohup pnpm storybook >/tmp/claude-storybook.log 2>&1 &
disown 2>/dev/null || true

printf '%s' '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"Starting the local Storybook dev server on http://localhost:6006 for the Storybook MCP. It takes a few seconds to be ready; if a Storybook MCP tool fails immediately, retry once it has booted."}}'

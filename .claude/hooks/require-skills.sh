#!/bin/bash
# PreToolUse hook for Write|Edit. Maps the target file to the project skills
# that govern it (see CLAUDE.md) and injects the requirement to load them.
# Vendored skill files (skills-lock.json) are rejected outright.

command -v jq >/dev/null || exit 0
file=$(jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0
rel=${file#"${CLAUDE_PROJECT_DIR:-$PWD}"/}

case "$rel" in
	.claude/skills/shadcn/*)
		printf '%s' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"The shadcn skill is vendored (skills-lock.json); its files are never edited in this repo."}}'
		exit 0
		;;
esac

skills=""
add() { case " $skills " in *" $1 "*) ;; *) skills="$skills $1" ;; esac; }

case "$rel" in *.md | *.mdx) add writing ;; esac
case "$rel" in *.stories.tsx) add shadcn && add writing ;; esac
case "$rel" in
	registry.json | registry.*.json | components.json)
		add shadcn && add design-tokens && add writing
		;;
	registry/*) add shadcn && add design-tokens ;;
	docs/*) add shadcn ;;
	.storybook/*) add design-tokens ;;
esac

skills=${skills# }
[ -z "$skills" ] && exit 0

printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":"Project rule: this file is governed by the following skill(s): %s (.claude/skills/<name>/SKILL.md). Invoke each one that is not loaded in this session before this edit, and apply its rules."}}' "$skills"

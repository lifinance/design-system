#!/bin/bash
# PreToolUse hook for Write|Edit. Maps the target file to the project skills that
# govern it (see CLAUDE.md) and blocks the edit until each governing skill has
# been invoked in this session. Vendored skill files (skills-lock.json) are
# rejected outright. If the transcript cannot be read, it degrades to a
# non-blocking reminder rather than deadlocking.

command -v jq >/dev/null || exit 0
input=$(cat)
file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty')
[ -z "$file" ] && exit 0
transcript=$(printf '%s' "$input" | jq -r '.transcript_path // empty')
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

# Without a readable transcript we cannot tell which skills are loaded; fall back
# to a non-blocking requirement reminder rather than risk a deadlock.
if [ -z "$transcript" ] || [ ! -f "$transcript" ]; then
	printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":"Project rule: this file is governed by the skill(s): %s (.claude/skills/<name>/SKILL.md). Invoke each one and apply its rules before editing."}}' "$skills"
	exit 0
fi

missing=""
for s in $skills; do
	grep -q "\"name\":\"Skill\",\"input\":{\"skill\":\"$s\"" "$transcript" 2>/dev/null || missing="$missing $s"
done
missing=${missing# }

[ -z "$missing" ] && exit 0

printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"This file is governed by the project skill(s): %s. Invoke the Skill tool for each that is not loaded yet (%s), apply its rules, then retry the edit."}}' "$skills" "$missing"

#!/bin/bash
# UserPromptSubmit hook. When a prompt asks to migrate or port a component,
# injects the requirement to use the migration skill (see CLAUDE.md).

command -v jq >/dev/null || exit 0
prompt=$(jq -r '.prompt // empty')
printf '%s' "$prompt" | grep -qiE '\b(migrate|migrating|migration|port|porting|bring (it |this )?over)\b' || exit 0
printf '%s' "Project rule: migrating or porting a component follows .claude/skills/migration/SKILL.md. Invoke the migration skill before starting, and apply its process."

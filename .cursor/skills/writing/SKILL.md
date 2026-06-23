---
name: writing
description: How to write every piece of prose in this repository: documentation, Storybook docs and MDX, component and token descriptions in registry manifests, READMEs, skill files, code comments, story sample data, and any other developer- or user-facing text. Use whenever creating or editing text, writing or revising docs, naming or describing a component or token, choosing example or sample data, or wording a comment. Always apply so the voice stays consistent: Google developer documentation style, timeless, with no AI tells, no em dashes, and no implementation details that go stale or leak source-app internals.
---

# Writing in this repository

Follow the [Google developer documentation style guide](https://developers.google.com/style). The [highlights](https://developers.google.com/style/highlights) are the baseline for tone, grammar, and formatting. This file adds the rules specific to this repository; where the two disagree, this file wins.

Vendored files (anything tracked in `skills-lock.json`) are exempt; never edit them.

## The Google baseline

The rules from the guide that this repository leans on hardest:

- Use second person and active voice. Make clear who performs the action.
- Use present tense and sentence case headings.
- Use standard American spelling and serial commas.
- Put conditions before instructions. Use descriptive link text.
- Use numbered lists for sequences and bulleted lists for everything else. Put code in code font and UI elements in bold.
- Write [timeless documentation](https://developers.google.com/style/timeless-documentation). Never anchor text to a point in time: no "currently", "now", "soon", "new", "existing", "not yet", "planned". Document the present state of the product, not its history or roadmap.
- [Don't document future features](https://developers.google.com/style/future) or pre-announce. If something does not exist, write nothing about it; if a process applies whenever it runs, write it as an instruction.

## Repository rules

These extend or override the Google baseline.

### No em dashes

Never use an em dash, anywhere. Rewrite with a period, colon, comma, or parentheses. The Google guide permits em dashes; this repository bans them because they are the most common machine-written tell. Check for them every time.

### Remove the machine-written tells

These patterns read as AI-generated and erode trust in the docs. Cut them.

- **Figurative compression.** Do not personify code or pack a fact into a metaphor. Don't: "Components live once." Do: "Each component is defined once, in `@core`."
- **Filler.** Drop "simply", "just", "note that", "in order to", "of course".
- **Marketing words.** No "powerful", "seamless", "robust", "unlock", "effortless".
- **Rhetorical scaffolding.** No "it is not just X, it is Y", no padded openers, no colon used as a tic to splice clauses.
- **Decorative glyphs in text.** No check marks, crosses, middots, or arrows typed into prose. When a UI needs an icon, use a real icon component (lucide).
- **Smart punctuation.** Use straight quotes and apostrophes.

### Do not leak implementation details

Describe what a thing is and does, never how it is built or what it happens to contain. Build details and current values go stale and mislead. This holds in descriptions, comments, story sample data, fixtures, variable names, and example values.

- Drop build details: "built on Base UI", "styled via cva", "composed from InputGroup". A description says what the component is, not which primitives it composes.
- Drop transient state: "success is widget-only", "this theme is light-only". Describe the capability and let the data carry the current value.
- Write from the consumer's side. A description answers "what is this and when do I use it".
- Name a code identifier for its role, not for the content it holds: a sample image is `IMAGE` or `image`, not `chainoorImage`. The content itself (a URL, a label) lives in the data layer and is fine.

**Example**
Don't: "Button built on Base UI, styled from tokens. Variants and sizes via cva."
Do: "A button with multiple variants and sizes."

### Code comments

Keep comments minimal or absent. Add one only when the code cannot be understood without it, and keep it short and factual. Never write the reason a change was made, a decision's history, or conversation context into a comment. Functional directives a tool reads (for example a JSX runtime pragma) are not comments in this sense; keep those.

### Brands are separate

The widget is LI.FI's product. Other brands, for example jumper.exchange, are separate entities that theme the widget. Never prefix a separate brand with "LI.FI" or imply LI.FI owns it. Name a brand's theme by the brand ("Jumper tokens"), not "LI.FI Jumper tokens".

### Do not invent precision

When no single value or answer is universally correct, state the rule rather than a fake specific. For the text on a feedback color, write "set the text color explicitly", not "use white text", because the right value depends on the color and the theme.

## Reader-test documentation

Test documentation with a fresh reader that has no prior context. A subagent works well; it catches blind spots the author cannot see.

1. Ask the reader the real questions a developer or an AI would ask, answered using only the doc. Note anything ambiguous, missing, or guessed.
2. Have it copy-edit against this skill and the Google baseline.
3. Fix what it surfaces.

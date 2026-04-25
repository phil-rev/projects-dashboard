# Project Memory

Manual knowledge base for this project. Store team context, decisions, and conventions that you want Claude to always know about.

## What Goes Here

- **Architecture decisions** — Why certain choices were made
- **Team conventions** — How your team works on this project
- **Known issues** — Bugs, workarounds, gotchas
- **Important context** — Background that helps Claude understand the project
- **Contacts** — Key people, their roles, how to reach them

## File Structure

Create small, focused files:
- `architecture.md` — System design decisions
- `conventions.md` — Team standards and patterns
- `known-issues.md` — Bugs and workarounds
- `team.md` — Who does what, key contacts
- `context.md` — Important background

## Tips

- Keep files small and focused (< 5KB each)
- Update when things change
- Be specific: "why" not just "what"
- Link to relevant documentation
- These are shared team knowledge, not personal notes

## Example

`architecture.md`:
```
# RevGravy OS Architecture

## Factory Framework
The core is the Factory Framework (5 categories of factories).
See CLAUDE.md for details.

## Tech Stack
- Node.js for tools
- YAML for config
- GitHub for version control
```

Auto-memory (separate from this folder) captures session learnings automatically.

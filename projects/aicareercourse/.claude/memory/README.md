# Project Memory

Manual knowledge base for this project. Store team context, decisions, and conventions that you want Claude to always know about.

## What Goes Here

- **Architecture decisions** — Why certain choices were made
- **Team conventions** — How your team works on this project
- **Known issues** — Bugs, workarounds, gotchas
- **Important context** — Background that helps Claude understand the project
- **API details** — Keys, endpoints, rate limits (if safe to store)

## File Structure

Create small, focused files:
- `architecture.md` — Agent design, Gamma integration approach
- `conventions.md` — Coding standards, testing patterns
- `known-issues.md` — Gamma API quirks, timeouts, edge cases
- `team.md` — Who's building this, how to coordinate
- `gamma-api.md` — Gamma API reference, limits, best practices

## Tips

- Keep files small and focused (< 5KB each)
- Update when things change
- Be specific: "why" not just "what"
- Link to relevant documentation
- These are shared team knowledge, not personal notes

## Example

`architecture.md`:
```
# AIcareerCourse Agent Architecture

## Design
Input → Agent Logic → Gamma API → Proposal Output

## Key Decisions
- Synchronous API calls (simpler than async)
- Rate limiting at agent level (not individual calls)
- Proposal links stored in deal notes

## Future: Consider async for batched proposals
```

Auto-memory (separate from this folder) captures session learnings automatically.

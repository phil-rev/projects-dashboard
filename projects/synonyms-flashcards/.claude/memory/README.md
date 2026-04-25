# Project Memory

Manual knowledge base for this project. Store team context, decisions, and conventions that you want Claude to always know about.

## What Goes Here

- **Architecture decisions** — Why certain choices were made
- **Team conventions** — How your team works on this project
- **Known issues** — Bugs, workarounds, gotchas
- **Important context** — Background that helps Claude understand the project
- **DSRP details** — Methodology, learning approach

## File Structure

Create small, focused files:
- `architecture.md` — App design, spaced repetition algorithm
- `dsrp-methodology.md` — What DSRP is, how it works
- `team.md` — Who's building this, how to coordinate
- `user-base.md` — Who uses this, their needs
- `known-issues.md` — Bugs, platform quirks

## Tips

- Keep files small and focused (< 5KB each)
- Update when things change
- Be specific: "why" not just "what"
- Link to relevant documentation
- These are shared team knowledge, not personal notes

## Example

`dsrp-methodology.md`:
```
# DSRP Methodology

## What is DSRP?
Differentiated Semantic Relationship Pattern
- Focus on relationships between similar words
- Learn nuances, not just definitions
- Active learning through practice

## How Flashcards Use It
- Card pair: synonym + context
- Difficulty levels based on semantic distance
- Spaced repetition optimized for vocabulary retention
```

Auto-memory (separate from this folder) captures session learnings automatically.

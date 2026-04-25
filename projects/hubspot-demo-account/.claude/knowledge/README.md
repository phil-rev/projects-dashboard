# Project Memory

Manual knowledge base for this project. Store team context, decisions, and conventions that you want Claude to always know about.

## What Goes Here

- **Architecture decisions** — Why certain choices were made
- **Team conventions** — How your team works on this project
- **Known issues** — Bugs, workarounds, gotchas
- **Important context** — Background that helps Claude understand the project
- **HubSpot setup** — Portal ID, test data, special configs

## File Structure

Create small, focused files:
- `architecture.md` — Demo environment design
- `test-scenarios.md` — Preset test cases and workflows
- `hubspot-setup.md` — Portal config, custom properties, API keys
- `factory-templates.md` — Pre-built factory examples
- `team.md` — Who uses this for testing

## Tips

- Keep files small and focused (< 5KB each)
- Update when things change
- Be specific: "why" not just "what"
- Link to relevant documentation
- These are shared team knowledge, not personal notes

## Example

`test-scenarios.md`:
```
# Test Scenarios

## Leads → Opportunities Factory
- Test contact: "Demo Lead" (contact ID: 12345)
- Associated company: "Acme Corp" (company ID: 67890)
- Trigger: Form submission
- Expected: Creates deal in "qualification" stage

## Known Gotchas
- Custom properties need to be created first
- Test data resets weekly
```

Auto-memory (separate from this folder) captures session learnings automatically.

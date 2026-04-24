# Example Project

This is an example project to show how the dashboard system works.

## Goal
Demonstrate the projects dashboard with a concrete example.

## Current Status
- [x] Created project structure
- [x] Set up metadata files
- [ ] Add more projects
- [ ] Test dashboard generation

## Progress
- **2026-04-24**: Initialized example project with template structure

## Blockers / Open Questions
None yet!

## Next Steps
1. Create your first real project
2. Test the dashboard generation
3. Configure Slack integration
4. Push to GitHub

## How This Works

1. **Claude detects new project** → Asks "New/Resume/Chat?"
2. **You say "New"** → Creates folder with `.project.yml`, `README.md`, `CLAUDE.md`
3. **You work** → Claude loads context from CLAUDE.md
4. **Session ends** → Claude asks what you did, updates metadata
5. **Dashboard regenerates** → Posts to Slack with fresh link
6. **You see projects** → Beautiful web dashboard on GitHub Pages

## Tips
- Keep `.project.yml` updated with `last_action` and `last_edited`
- Use `README.md` for detailed notes and progress
- Put coding standards and approach in `CLAUDE.md`
- Projects can be symlinks to external repos

# Project Template

Use this as a template when creating a new project. Claude will auto-generate this when you start a new project.

## .project.yml

```yaml
name: "Project Name"
goal: "Clear, specific goal: what are we building or solving?"
status: "active"
last_edited: "2026-04-24"
last_action: "Initialized project"
github_url: "https://github.com/user/repo"
local_path: "/Users/work/projects-dashboard/projects/project-name"
tags: ["feature", "bug-fix", "research", "documentation"]
```

## README.md

```markdown
# Project Name

## Goal
What we're building and why.

## Current Status
- [ ] Phase 1
- [ ] Phase 2
- [ ] Phase 3

## Progress
- **2026-04-24**: Initialized project

## Blockers / Open Questions
- None yet

## Next Steps
1. First action
2. Second action

## Links
- [GitHub Repo](https://github.com/user/repo)
- [Design Doc](link)
- [Tracking Issue](link)
```

## CLAUDE.md

```markdown
# Project Name - Claude Instructions

## About This Project
Brief overview of what we're building.

## How to Approach This
- Tech stack / languages used
- Key files / architecture
- Coding standards
- Testing approach

## Context
- Who this impacts
- Related projects
- Constraints or deadlines

## How I Should Help
- What kind of tasks you'll typically ask for
- Preferred depth of explanation
- Any project-specific guidelines

## Before Each Session
Claude will check this file and load project context.
```

## .claude/settings.json

```json
{
  "hooks": [],
  "permissions": []
}
```

---

When you create a new project, Claude will:
1. Create `project-name/` folder in `projects/`
2. Generate these three files with your input
3. Initialize git (if needed)
4. Add to `.project.yml` registry
5. Regenerate dashboard

# RevGravy Projects Dashboard

This is the central hub for all RevGravy projects. Everything lives here or links here.

## System Overview

**Purpose**: One-stop command center for all projects—coding, docs, research, whatever.

**Key Files**:
- `projects/` — All projects with metadata
- `scripts/generate-dashboard.js` — Generates the dashboard from project metadata
- `scripts/post-to-slack.js` — Posts dashboard link to Slack
- `dashboard.html` — Published to GitHub Pages

## How Claude Should Behave

### At Session Start
When the user opens Claude Code in any directory:
1. Check if they're in a projects-dashboard subfolder (e.g., `/projects-dashboard/projects/project-a`)
2. If yes, load that project's `CLAUDE.md` and `.project.yml`
3. If no, ask: *"Are you starting a new project, resuming an existing one, or just having a miscellaneous chat?"*
   - **New project**: Create a new folder in `projects/`, initialize `.project.yml` + `README.md` + `CLAUDE.md`
   - **Resume**: Load the project's metadata and context
   - **Misc**: Skip tracking (no metadata updates)

### At Session End (if tracking a project)
Ask the user:
1. *"What did you accomplish in this session?"* (updates `last_action` in `.project.yml`)
2. *"Any blockers or next steps?"* (goes in project `README.md`)
3. Auto-update `last_edited` timestamp

Then regenerate the dashboard and post to Slack.

## Project Structure

Each project folder has:
```
project-name/
├── .project.yml          # Metadata: name, goal, status, links
├── README.md             # Project notes, blockers, next steps
├── CLAUDE.md             # How Claude should work on this project
├── .claude/
│   └── settings.json     # Project-specific hooks/permissions
└── [actual project files]
```

## .project.yml Format

```yaml
name: "Project Name"
goal: "What we're building or solving"
status: "active|paused|completed"
last_edited: "2026-04-24"
last_action: "What was accomplished last"
github_url: "https://github.com/user/repo"
local_path: "/Users/work/projects-dashboard/projects/project-name"
tags: ["feature", "bug-fix", "documentation"]
```

## Slack Integration

- After each session, the dashboard regenerates and a fresh link is posted to Slack
- Slack webhook stored in `.claude/settings.json` (configured via `/update-config`)
- Dashboard shows: project name, goal, last edited, last action, status, links

## Adding a New Project

1. Ask the user if they want to create a new project directory or link an existing one
2. Create folder in `projects/` or use symlink/submodule for external repos
3. Generate `.project.yml` + `README.md` + `CLAUDE.md` + `.claude/settings.json`
4. Commit and push
5. Dashboard auto-regenerates

## Dashboard Generation

Run `scripts/generate-dashboard.js` to:
1. Scan all `.project.yml` files in `projects/`
2. Build an HTML dashboard with project cards
3. Generate a link suitable for Slack
4. Optionally post to Slack (requires webhook)

Hosted on GitHub Pages at: `https://phil.github.io/projects-dashboard/` (once configured)

## The /close-project Command

**When to use**: At the end of a work session on a tracked project, run:
```
/close-project
```

**What happens**:
1. I review our conversation transcript
2. Extract what was accomplished (features, fixes, docs, etc.)
3. Identify any blockers or next steps
4. **Automatically update**:
   - `.project.yml` → `last_action` + `last_edited`
   - `README.md` → Add progress entry
   - Regenerate `dashboard.html`
   - Post updated dashboard to Slack

**No repetition needed** — I pull everything from our actual conversation, so you don't have to tell me what you did.

**Example**:
```
You: /close-project

Claude: Reviewing session... found:
- Built proposal generator agent
- Fixed Gamma API timeout handling
- Added 3 unit tests
- Next: integration tests with production Gamma

✓ Updated .project.yml
✓ Updated README.md  
✓ Regenerated dashboard
✓ Posted to Slack
```

---

## Notes

- Projects can be local directories, Git submodules, or symlinks to external repos
- All metadata is YAML for easy parsing and human-readability
- Dashboard is static HTML (fast, portable, GitHub Pages friendly)
- Slack integration is optional but highly recommended
- Use `/close-project` at the end of every session to keep metadata fresh

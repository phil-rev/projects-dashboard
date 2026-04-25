# Projects Dashboard

Central hub for organizing all RevGravy work. Tracks projects, generates a daily web dashboard, posts to Slack, and provides Claude Code session hooks.

## Current Status

**Active** — System is operational and tracking 6 projects (including itself).

## What This System Does

1. **Metadata Tracking** — Each project has a `.project.yml` file with name, goal, status, last edited, last action
2. **Dashboard Generation** — Scans all projects and generates static HTML dashboard
3. **Slack Integration** — Posts fresh dashboard link daily and after each session close
4. **Claude Hooks** — Detects which project you're working on and loads context automatically
5. **Session Tracking** — `/close-project` command captures accomplishments and updates metadata

## Project Structure

```
projects-dashboard/
├── projects/
│   ├── projects-dashboard/          # This system (meta)
│   ├── rg-os/                       # RevGravy methodology & playbooks
│   ├── aicareercourse/              # Proposal generator agent
│   ├── hubspot-demo-account/        # Sandbox for testing
│   ├── synonyms-flashcards/         # Educational app
│   └── example-project/             # Template
├── scripts/
│   ├── generate-dashboard.js        # Dashboard generator
│   ├── post-to-slack.js             # Slack integration
│   └── close-project.sh             # Session close script
├── dashboard.html                   # Published dashboard
├── CLAUDE.md                        # System instructions
├── .github/
│   └── workflows/
│       └── generate-dashboard.yml   # Daily regeneration
└── .claude/
    ├── settings.json                # Slack webhook (webhooks.local.json for secrets)
    ├── skills/
    ├── actions/
    └── knowledge/
```

## Key Scripts

### `scripts/generate-dashboard.js`
Scans all `.project.yml` files and generates `dashboard.html`.
- Reads metadata from each project
- Creates cards with: name, goal, status, last edited, last action
- Generates clickable links to GitHub and local paths
- Hosts on GitHub Pages

### `scripts/post-to-slack.js`
Posts the fresh dashboard link to Slack DM.
- Webhook URL in `.claude/settings.local.json`
- Runs daily via GitHub Actions
- Also triggered by `/close-project` command

### `scripts/close-project.sh`
Session wrap-up script (called by `/close-project` command).
- Updates `.project.yml` with last_action and last_edited
- Regenerates dashboard
- Posts to Slack
- Commits and pushes

## GitHub Workflow

`.github/workflows/generate-dashboard.yml`:
- Runs daily at 9am UTC
- Triggers on commits to `.project.yml` files
- Regenerates dashboard and posts to Slack

## How It Integrates with Claude Code

### SessionStart Hook
When you open Claude in any project folder:
1. Detects which project you're in
2. Loads that project's `CLAUDE.md` and `.project.yml`
3. Provides context automatically

### /close-project Command
At the end of a work session:
```
/close-project
```

Claude will:
- Review what was accomplished in conversation
- Extract features, fixes, docs, blockers, next steps
- Update `.project.yml` (last_action, last_edited)
- Update `README.md` with progress
- Regenerate dashboard
- Post to Slack

No manual copy-paste needed—everything comes from the transcript.

## Recent Activity

**2026-04-24**: Created projects-dashboard as a tracked project
- Organized all 5 existing projects
- Set up GitHub repo
- Configured daily generation + Slack posting
- Added `/close-project` command for session tracking

## Next Steps

1. Test `/close-project` command end-to-end
2. Fine-tune GitHub workflow timing
3. Add more metadata fields as needed (priority, owner, etc.)
4. Archive completed projects
5. Create project templates for future work

## Blockers

None currently. System is live and functional.

## Useful Links

- **Dashboard**: https://phil-rev.github.io/projects-dashboard/dashboard.html
- **GitHub Repo**: https://github.com/phil-rev/projects-dashboard
- **Local Scripts**: `/Users/work/projects-dashboard/scripts/`

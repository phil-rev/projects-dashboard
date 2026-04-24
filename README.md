# RevGravy Projects Dashboard

Your centralized command center for all projects—coding, documentation, research, everything.

## Quick Start

### 1. Add a New Project

When you start working on something new, Claude will ask if it's a new project, resume, or misc chat. If new:

```bash
cd projects-dashboard
# Claude creates: projects/my-new-project/ with:
# - .project.yml (metadata)
# - README.md (notes)
# - CLAUDE.md (how Claude works on this)
```

### 2. Work on Your Project

Make changes as usual. At the end of your session, Claude asks:
- "What did you accomplish?"
- "Any blockers or next steps?"

Claude auto-updates `.project.yml` with timestamps and actions.

### 3. Dashboard Updates

The dashboard auto-regenerates and posts to Slack:
- Shows all projects sorted by last edited
- Displays: goal, status, last action, links
- Beautiful, fast, hosted on GitHub Pages

## Setup

### Prerequisites
- Node.js 14+
- GitHub account
- Slack workspace (optional but recommended)

### Installation

```bash
# Clone or set up the repo
cd projects-dashboard
npm install

# Generate dashboard (manual)
npm run generate

# Post to Slack (requires webhook)
npm run post-slack
```

### Configure Slack Integration

1. Create a Slack Incoming Webhook:
   - Go to https://api.slack.com/apps
   - Create New App → From scratch
   - Name: "Projects Dashboard"
   - Add "Incoming Webhooks" feature
   - Create New Webhook to Workspace → select channel

2. Store the webhook in `.claude/settings.json`:
   ```json
   {
     "env_vars": {
       "SLACK_WEBHOOK_URL": "https://hooks.slack.com/services/..."
     }
   }
   ```

3. Or run: `/update-config` and set `SLACK_WEBHOOK_URL`

### Configure GitHub Pages

1. Push this repo to GitHub
2. Go to Settings → Pages
3. Source: Deploy from branch
4. Branch: main (or your default)
5. Folder: root
6. Save

Dashboard will be at: `https://your-username.github.io/projects-dashboard/`

## Project Structure

Each project in `projects/` contains:

```
project-name/
├── .project.yml          # Metadata (auto-updated)
├── README.md             # Notes and progress
├── CLAUDE.md             # Claude-specific instructions
├── .claude/
│   └── settings.json     # Project hooks/permissions
└── [actual project files]
```

### .project.yml Format

```yaml
name: "Project Name"
goal: "What you're building"
status: "active|paused|completed"
last_edited: "2026-04-24"
last_action: "What was accomplished last"
github_url: "https://github.com/user/repo"
local_path: "/Users/work/projects-dashboard/projects/project-name"
tags: ["feature", "bug-fix", "docs"]
```

## How Claude Works With This System

### At Session Start
- **In a project folder?** Claude loads that project's CLAUDE.md and context
- **Elsewhere?** Claude asks: "New project, resume existing, or just chatting?"

### At Session End (if tracking)
Claude asks what you accomplished, updates metadata, regenerates dashboard, posts to Slack.

### In Claude's Memory
- Remembers your preferences and workflow
- Tracks cross-project patterns
- Learns which projects need attention

## Commands

```bash
# Generate dashboard locally
npm run generate

# Post latest dashboard to Slack
npm run post-slack

# Do both
npm run dashboard
```

## GitHub Actions (Optional)

Auto-regenerate and post dashboard on every commit:

Create `.github/workflows/dashboard.yml` (included in this repo).

## Tips

- **Small projects** live directly in `projects/project-name/`
- **Large projects** can be symlinks or Git submodules linking to external repos
- **External GitHub repos** can be added with submodules and still tracked here
- **Organize by tags**: use `tags` in `.project.yml` to categorize projects
- **Dashboard updates** happen automatically if you use Claude Code's hooks

## Structure Overview

```
projects-dashboard/
├── projects/                 # All your projects
│   ├── project-a/
│   ├── project-b/
│   └── ...
├── scripts/
│   ├── generate-dashboard.js # Creates HTML dashboard
│   └── post-to-slack.js      # Posts to Slack
├── skills/                   # Reusable Claude patterns
├── .claude/                  # Claude Code config & memory
├── .github/workflows/        # GitHub Actions
├── dashboard.html            # Generated (published to Pages)
├── CLAUDE.md                 # How Claude works here
└── README.md                 # This file
```

## Features

- ✅ Auto-updates dashboard from `.project.yml` metadata
- ✅ GitHub Pages hosting (fast, free, no server needed)
- ✅ Slack integration (beautiful formatted updates)
- ✅ Claude Code hooks (auto-detect projects, update metadata at session end)
- ✅ Flexible project structure (local, symlinked, submodules)
- ✅ Offline-friendly (all metadata is local)
- ✅ Privacy-respecting (no external APIs except Slack)

## Troubleshooting

**Dashboard won't generate?**
- Make sure `projects/` exists and contains folders with `.project.yml`
- Run: `npm install` to get js-yaml dependency

**Slack posting fails?**
- Check `SLACK_WEBHOOK_URL` is set correctly
- Test with: `curl -X POST -H 'Content-type: application/json' --data '{"text":"test"}' $SLACK_WEBHOOK_URL`

**GitHub Pages not updating?**
- Make sure `dashboard.html` is committed and pushed
- Check Settings → Pages is enabled
- Wait 30 seconds for GitHub to rebuild

## License

MIT

# Setup Guide

## Initial Setup

### 1. Clone or Initialize

```bash
# If creating from scratch (this is already initialized)
cd /Users/work/projects-dashboard
git remote add origin https://github.com/YOUR_USERNAME/projects-dashboard.git
git branch -M main
git push -u origin main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Slack (Optional but Recommended)

#### Get Slack Webhook

1. Go to https://api.slack.com/apps
2. Click "Create New App" → "From scratch"
3. App name: "Projects Dashboard"
4. Pick your workspace
5. In left menu: "Incoming Webhooks"
6. Toggle "Activate Incoming Webhooks" → ON
7. Click "Add New Webhook to Workspace"
8. Select the channel (e.g., #projects)
9. Copy the webhook URL

#### Store Webhook in Claude Code

Option A: Use CLI
```bash
/update-config
# Add SLACK_WEBHOOK_URL to env vars
```

Option B: Manual
Edit `.claude/settings.json`:
```json
{
  "env_vars": {
    "SLACK_WEBHOOK_URL": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  }
}
```

Or edit `.claude/settings.local.json` (for private/local only):
```json
{
  "env_vars": {
    "SLACK_WEBHOOK_URL": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  }
}
```

### 4. Configure GitHub Pages

1. Push repo to GitHub (if not already)
2. Go to your repo → Settings
3. Left sidebar: Pages
4. Source: Deploy from a branch
5. Branch: main, folder: / (root)
6. Save
7. Wait ~1 minute, then visit: `https://YOUR_USERNAME.github.io/projects-dashboard/`

### 5. Configure GitHub Actions (Optional)

The workflow `.github/workflows/generate-dashboard.yml` will:
- Auto-generate dashboard when you push `.project.yml` changes
- Post to Slack automatically

To enable:
1. Go to GitHub → Settings → Secrets and variables → Actions
2. Add `SLACK_WEBHOOK_URL` secret (paste your webhook URL)
3. Workflows will now auto-run on push

## Daily Workflow

### Starting a Project

You're working in a new directory. Claude asks:

> "Are you starting a new project, resuming an existing one, or just chatting?"

Choose **New Project** → Claude creates:
- `projects/my-project/.project.yml`
- `projects/my-project/README.md`
- `projects/my-project/CLAUDE.md`

### During the Session

Work normally. Claude has context from CLAUDE.md and README.md.

### Ending the Session

Claude asks:
1. "What did you accomplish?"
2. "Any blockers or next steps?"

Claude updates:
- `.project.yml` (last_action, last_edited)
- `README.md` (progress notes)

Then:
- Regenerates `dashboard.html`
- Posts link to Slack

### Resuming a Project

Next time you open Claude in that project:

> "Found project: My Project. Loading context..."

Claude loads `.project.yml` and `CLAUDE.md`, and you pick up where you left off.

## Commands

```bash
# Manually generate dashboard
npm run generate

# Manually post to Slack
npm run post-slack

# Do both
npm run dashboard
```

## Troubleshooting

### Dashboard won't generate

```bash
npm install
npm run generate
```

### Files not updating

Check that `.project.yml` exists in the project folder:
```bash
ls -la projects/my-project/.project.yml
```

### Slack posting fails

Test the webhook:
```bash
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"test"}' \
  YOUR_SLACK_WEBHOOK_URL
```

### GitHub Pages not showing

- Commit `dashboard.html` to main branch
- Wait 1 minute
- Check Settings → Pages shows green checkmark
- Visit URL in browser (may take 30s to see updates)

## Next Steps

1. ✅ Set up this repo
2. ✅ Configure Slack webhook
3. ✅ Enable GitHub Pages
4. ✅ Create first project with Claude Code
5. Start using it!

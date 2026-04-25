# Projects Dashboard - Claude Instructions

## About This Project

This is the organizational system that makes all other projects visible and tracked. It's meta in that it's both a project AND the hub for all projects.

## Core Purpose

Create a repeatable, automated way to:
- Track all RevGravy projects in one place
- Generate a web dashboard (daily + on-demand)
- Post fresh dashboard links to Slack
- Auto-capture project accomplishments when sessions end

## Key Files

- `scripts/generate-dashboard.js` — Scans `.project.yml` files and generates HTML
- `scripts/post-to-slack.js` — Posts dashboard link to Slack
- `scripts/close-project.sh` — Called by `/close-project` command
- `.github/workflows/generate-dashboard.yml` — GitHub Actions for daily regen
- `CLAUDE.md` (root) — System-wide instructions for Claude behavior

## How I Should Help

When working on the projects-dashboard system:

1. **Adding Projects**: Create new folder in `projects/`, initialize `.project.yml` + `README.md` + `CLAUDE.md`
2. **Metadata Updates**: Ensure all projects have accurate, current `.project.yml` files
3. **Dashboard Generation**: Run `scripts/generate-dashboard.js` and verify output
4. **Slack Integration**: Test webhook, verify messages post correctly
5. **GitHub Automation**: Maintain workflow, debug scheduling issues
6. **Documentation**: Keep system docs up to date as features evolve

## Project Structure Standards

Every project folder should have:
```
project-name/
├── .project.yml              # Metadata (auto-updated)
├── README.md                 # Project overview, status, notes
├── CLAUDE.md                 # How Claude should work on this project
└── .claude/
    ├── settings.json         # Project-specific config
    ├── skills/
    │   └── README.md         # Reusable tools/instructions
    ├── actions/
    │   └── README.md         # Multi-step workflows
    └── knowledge/
        └── README.md         # Team documentation
```

## .project.yml Format

Always include:
- `name`: Project name
- `goal`: What we're building/solving
- `status`: "active", "paused", or "completed"
- `last_edited`: Date in YYYY-MM-DD format
- `last_action`: What was accomplished last
- `github_url`: Link to repo (or internal path)
- `local_path`: Where it lives locally
- `tags`: Categorization (e.g., "core-system", "documentation", "feature")

## Testing Checklist

When making changes to the dashboard system:

1. **Dashboard Generation**:
   - Run `node scripts/generate-dashboard.js`
   - Verify all projects appear in `dashboard.html`
   - Check that links are correct and clickable
   - Test on GitHub Pages (if configured)

2. **Slack Integration**:
   - Verify webhook URL in `.claude/settings.local.json`
   - Test `node scripts/post-to-slack.js`
   - Check that message appears in Slack DM

3. **GitHub Workflow**:
   - Verify `.github/workflows/generate-dashboard.yml` syntax
   - Check that workflow runs on schedule and on `.project.yml` changes
   - Inspect workflow logs for errors

4. **Project Metadata**:
   - Ensure all `.project.yml` files are valid YAML
   - Verify all required fields are present
   - Check that `last_edited` is recent (when working on projects)

## Integration Points

### With Claude Code SessionStart Hook
- Detects when user opens Claude in a project subfolder
- Loads that project's `CLAUDE.md` for context
- Prompts about new/resume/misc if not in a tracked project

### With /close-project Command
- Triggered by user at session end
- Extracts accomplishments from conversation
- Updates `.project.yml` and `README.md`
- Regenerates dashboard
- Posts to Slack

## Security Notes

- Slack webhook URL stored in `.claude/settings.local.json` (never committed)
- GitHub Actions use the webhook to post—verify it's safe
- All scripts are read-only for projects (only update `.project.yml`)

## Development Notes

- Dashboard is static HTML (fast, portable, GitHub Pages compatible)
- No database needed—all metadata in YAML files
- Scripts are JavaScript/Bash—minimal dependencies
- GitHub Actions handles scheduling (reliable, free)

## Future Enhancements

- Add more metadata fields: priority, owner, estimated completion
- Create project templates for faster setup
- Add filtering/sorting to dashboard (status, tags, date)
- Build REST API to query project metadata
- Create archived projects section
- Add team members field for collaboration tracking

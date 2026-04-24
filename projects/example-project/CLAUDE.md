# Example Project - Claude Instructions

## About This Project
This is an example project showing how to structure projects for the dashboard system.

## How to Approach This
- This is a template/example
- You can delete this once you create real projects
- Use this as a reference for structuring your own CLAUDE.md files

## Key Files
- `.project.yml` - Project metadata (auto-updated by Claude at session end)
- `README.md` - Progress notes and project status
- `CLAUDE.md` - Instructions for Claude (this file)

## What Goes in Each File

### .project.yml
```yaml
name: String - Project name
goal: String - What you're building
status: "active|paused|completed"
last_edited: Date string
last_action: What was done last
github_url: Link to repo (optional)
tags: List of categories
```

### README.md
- Overview and goal
- Current status (checklist)
- Progress log (with dates)
- Blockers
- Next steps
- Useful links

### CLAUDE.md
- Project overview
- Tech stack and approach
- How Claude should help
- Any special instructions

## How Claude Works on This Project

1. **On session start**: Load this CLAUDE.md and .project.yml for context
2. **During session**: Use context to inform responses
3. **On session end**: Ask what was accomplished, update metadata

## Before You Start

Make sure to:
- Update `.project.yml` with your actual project info
- Write a real `README.md` with your project goals
- Customize this CLAUDE.md with your approach
- Set `status: "active"` when you start real work

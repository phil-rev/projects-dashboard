# Project Dashboard Skills

Add reusable tools and instructions here. Skills are individual, focused capabilities that can be combined into actions.

## Structure

```markdown
# Skill Name

One-line description of what this skill does.

## When to Use
Situations where this skill applies.

## How to Use
Instructions or command to invoke this skill.

## Parameters
Any inputs or configuration needed.
```

## Naming Convention
- Use kebab-case: `generate-dashboard.md`, `post-to-slack.md`
- Name describes the action/capability

## Example Skills for This Project

### generate-dashboard
Runs the dashboard generator and verifies output

### post-to-slack
Sends a message to Slack via webhook

### validate-metadata
Checks all `.project.yml` files for required fields

### update-project-metadata
Updates a project's last_edited and last_action fields

## Tips
- Keep skills focused on one capability
- Include error handling guidance
- Reference required tools/scripts
- Document any dependencies

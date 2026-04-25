# Project Dashboard Actions

Add multi-step workflows here. Actions are sequences that combine skills to accomplish complete objectives.

## Structure

```markdown
# Action Name

Description of what this action accomplishes.

## Steps
1. [Use skill or run command]
2. [Next step]
3. [Continue sequence]

## Purpose
When to use this action.
```

## Naming Convention
- Use kebab-case: `regenerate-dashboard-and-post.md`, `add-new-project.md`
- Describe the end-to-end objective

## Example Actions for This Project

### regenerate-dashboard-and-post
1. Run dashboard generator
2. Verify output
3. Post to Slack
4. Commit if changed

### add-new-project
1. Create project folder structure
2. Initialize `.project.yml`
3. Create `README.md` and `CLAUDE.md`
4. Set up `.claude/` folders
5. Commit and regenerate dashboard

### validate-all-projects
1. Check all `.project.yml` files
2. Verify required fields
3. Test dashboard generation
4. Report any issues

## Tips
- Chain multiple skills together
- Include all steps in order
- Reference relevant skills in `.claude/skills/`
- Test the full sequence before documenting

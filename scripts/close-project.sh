#!/bin/bash
# Close out a project: update metadata, regenerate dashboard, post to Slack
# Usage: ./scripts/close-project.sh <project-name> "<last-action>"

PROJECT_NAME="${1:-.}"
LAST_ACTION="${2:-Session completed}"
PROJECT_PATH="projects/${PROJECT_NAME}"

if [[ ! -f "$PROJECT_PATH/.project.yml" ]]; then
  echo "Error: Project not found at $PROJECT_PATH"
  exit 1
fi

echo "Closing out project: $PROJECT_NAME"

# Update last_edited and last_action
DATE=$(date +"%Y-%m-%d")
sed -i '' "s/last_edited: .*/last_edited: \"$DATE\"/" "$PROJECT_PATH/.project.yml"
ESCAPED_ACTION=$(printf '%s\n' "$LAST_ACTION" | sed 's:[\/&]:\\&:g')
sed -i '' "s/last_action: .*/last_action: \"$ESCAPED_ACTION\"/" "$PROJECT_PATH/.project.yml"

echo "✓ Updated $PROJECT_NAME metadata"
echo "  Last action: $LAST_ACTION"
echo "  Last edited: $DATE"

# Regenerate dashboard
npm run generate

# Post to Slack
SLACK_WEBHOOK_URL=$(cat .claude/settings.local.json 2>/dev/null | jq -r '.env_vars.SLACK_WEBHOOK_URL // empty')
if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
  SLACK_WEBHOOK_URL="$SLACK_WEBHOOK_URL" npm run post-slack
  echo "✓ Posted to Slack"
fi

# Commit changes
git add "$PROJECT_PATH/.project.yml" dashboard.html
git commit -m "chore: close out $PROJECT_NAME - $LAST_ACTION"
git push origin main

echo "✓ Project closed out and pushed to GitHub"

#!/bin/bash
# Update project metadata at session end
# Usage: update-project-metadata.sh <project-path> <last-action>

PROJECT_PATH="${1:-.}"
LAST_ACTION="${2:-Session completed}"

if [[ ! -f "$PROJECT_PATH/.project.yml" ]]; then
  echo "Error: .project.yml not found in $PROJECT_PATH"
  exit 1
fi

# Get the project name
PROJECT_NAME=$(basename "$PROJECT_PATH")

# Update last_edited and last_action using sed
DATE=$(date +"%Y-%m-%d")

# Update last_edited
sed -i '' "s/last_edited: .*/last_edited: \"$DATE\"/" "$PROJECT_PATH/.project.yml"

# Update last_action (escape special characters)
ESCAPED_ACTION=$(printf '%s\n' "$LAST_ACTION" | sed 's:[\/&]:\\&:g')
sed -i '' "s/last_action: .*/last_action: \"$ESCAPED_ACTION\"/" "$PROJECT_PATH/.project.yml"

echo "✓ Updated $PROJECT_NAME metadata"
echo "  Last action: $LAST_ACTION"
echo "  Last edited: $DATE"

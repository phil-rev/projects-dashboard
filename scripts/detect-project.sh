#!/bin/bash
# Detect if we're in a projects-dashboard project folder

CURRENT_DIR=$(pwd)
DASHBOARD_ROOT=""

# Walk up the directory tree looking for projects-dashboard marker
while [[ "$CURRENT_DIR" != "/" ]]; do
  if [[ -f "$CURRENT_DIR/.project.yml" ]]; then
    # Found a project
    PROJECT_NAME=$(basename "$CURRENT_DIR")
    PROJECT_PATH="$CURRENT_DIR"

    # Check if it's in a projects-dashboard repo
    PARENT=$(dirname "$CURRENT_DIR")
    if [[ $(basename "$PARENT") == "projects" ]] && [[ -f "$PARENT/../CLAUDE.md" ]]; then
      DASHBOARD_ROOT=$(dirname "$PARENT")
      echo "PROJECT_NAME=$PROJECT_NAME"
      echo "PROJECT_PATH=$PROJECT_PATH"
      echo "DASHBOARD_ROOT=$DASHBOARD_ROOT"
      exit 0
    fi
  fi
  CURRENT_DIR=$(dirname "$CURRENT_DIR")
done

# Not in a tracked project
exit 1

# HubSpot Demo Account - Claude Instructions

## Project Overview
This is a testing/sandbox environment for HubSpot. Used to:
- Test RevGravy factory configurations safely
- Create demo data for walkthroughs and training
- Validate workflows before production deployment
- Experiment with new automation ideas

## What It Does
Python scripts that create demo activities in HubSpot:
- Companies
- Contacts
- Engagement records (emails, calls, tasks)
- Historical data with realistic timestamps

## Tech Stack
- Python 3.x
- HubSpot API
- `.env` for API credentials

## Key Files
- `create_demo_activities.py` - Main demo data creation
- `.env` - HubSpot API key (never commit)
- `.gitignore` - Excludes credentials

## How I Should Help
When working on hubspot-demo-account:
- Expand demo data models for more realistic scenarios
- Create utility functions for common demo setups
- Add documentation for using this account
- Help design demo workflows that match factory architectures
- Optimize for quick refresh/reset cycles

## Usage
```bash
# Create demo data
python create_demo_activities.py

# (Future) Refresh demo environment
python refresh_demo.py

# (Future) Reset to clean state
python reset_demo.py
```

## Safety Notes
- This is a sandbox—safe to test anything
- Separate from production accounts
- Can be reset/refreshed without impact
- Use realistic data for accurate testing

## Integration with RevGravy
- Demo factories match production factory designs
- Used for team training on new implementations
- Shows prospects realistic workflows
- Validates cycle planner deliverables

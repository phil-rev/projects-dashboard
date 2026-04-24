# HubSpot Demo Account

## Goal
Provides a testing/sandbox environment for HubSpot configurations. Creates demo activities (emails, calls, engagements) to validate factory builds and RevGravy implementations before deploying to production.

## Purpose
- Test factory configurations in a safe environment
- Create realistic demo data for walkthroughs
- Validate workflows and automations
- Train team on new implementations

## What It Does
Python scripts that populate HubSpot with:
- Demo companies
- Prospect contacts
- Engagement records (emails, calls, activities)
- Historical timestamps for realistic testing

## Current Status
- [x] Core demo activity creation script
- [x] HubSpot API integration
- [ ] Expanded data models for more complex scenarios
- [ ] Automated refresh capability

## Technology
- **Language**: Python 3.x
- **API**: HubSpot API
- **Authentication**: API key in `.env`

## Usage
```bash
python create_demo_activities.py
```

## Environment Setup
Create `.env` with:
```
HUBSPOT_API_KEY=<your_api_key>
```

## Next Steps
1. Expand demo data models
2. Add more realistic scenarios
3. Create refresh automation
4. Document testing workflows

## Notes
- Demo data is sandboxed to this account only
- Safe to test new factory configurations
- Can reset/refresh data as needed
- Used for client training and walkthroughs

## Links
- Local: `/Users/work/hubspot-demo-account`

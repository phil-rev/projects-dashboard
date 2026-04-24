# AIcareerCourse

## Goal
Automate proposal generation for prospects via the Gamma.app API. Eliminate manual proposal workflows and enable rapid, personalized proposal generation.

## Problem Statement
Manual proposal creation for prospects is:
- Time-consuming
- Inconsistent
- Prone to delays

This Agent solves it by accepting prospect/course information and generating customized proposals in seconds.

## Architecture
Simple pipeline:
```
Input (prospect data) → Agent Logic → Gamma.app API → Output (proposal artifact)
```

## Key Components
- **Agent**: Core orchestration logic for processing requests
- **Gamma Integration**: Wrapper around Gamma.app API
- **API Endpoint**: Entry point for prospect data and triggering proposals

## Current Status
- [x] Architecture designed
- [ ] Agent orchestration logic (aicareercourse/agent.py)
- [ ] Gamma API wrapper (aicareercourse/gamma_client.py)
- [ ] REST endpoint (aicareercourse/api.py)
- [ ] Unit and integration tests
- [ ] Production deployment

## Technology
- **Language**: Python 3.10+
- **API**: Gamma.app
- **Testing**: pytest

## Environment Variables
```
GAMMA_API_KEY=<your_key>
GAMMA_API_BASE=<endpoint>
```

## Next Steps
1. Build agent orchestration logic
2. Implement Gamma API wrapper
3. Create REST endpoint
4. Write comprehensive tests
5. Deploy and validate

## Links
- Local: `/Users/work/AIcareerCourse`

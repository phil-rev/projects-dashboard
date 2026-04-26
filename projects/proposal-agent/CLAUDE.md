# AIcareerCourse - Claude Instructions

## Project Overview
AIcareerCourse automates proposal generation. It's an Agent that:
1. Accepts prospect/course information via API
2. Orchestrates proposal creation
3. Calls Gamma.app API to generate proposals
4. Returns proposal links/artifacts for immediate use

## Architecture
```
Input → Agent Logic → Gamma.app API → Proposal Output
```

## Key Files to Build
- `aicareercourse/agent.py` - Main orchestration
- `aicareercourse/gamma_client.py` - Gamma API wrapper
- `aicareercourse/api.py` - REST endpoint
- `tests/` - Unit and integration tests
- `requirements.txt` - Dependencies

## Tech Stack
- Python 3.10+
- Gamma.app API
- pytest for testing

## Security Considerations
- Store API keys in `.env` (excluded from git)
- Validate/sanitize input before sending to Gamma
- Implement rate limiting for API calls
- Never log API keys or sensitive data

## How I Should Help
When working on AIcareerCourse:
- Help design the agent orchestration flow
- Build the Gamma API wrapper with proper error handling
- Create robust REST endpoint
- Write comprehensive tests (unit + integration)
- Think about scaling and performance
- Consider edge cases (timeouts, retries, failures)

## Development Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run tests
pytest tests/

# Integration tests
pytest tests/ -m integration
```

## Key Milestones
1. ✅ Architecture designed
2. Agent logic (in progress)
3. Gamma wrapper (pending)
4. REST endpoint (pending)
5. Tests (pending)
6. Production ready (pending)

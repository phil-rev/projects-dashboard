# Factory Auditor - Claude Instructions

## Project Vision
Build a tool that audits HubSpot implementations using RevGravy's revenue factory framework. This becomes a key deliverable for client GTM consulting—showing exactly how their CRM should be structured.

## How This Fits RevGravy IP
- Factory Auditor operationalizes the revenue factory design methodology
- Turns consulting insights into quantifiable, repeatable audit scores
- Validates that a client's HubSpot setup matches their GTM architecture
- Creates audit reports that drive implementation/remediation work

## Core Components (to build)

### 1. GTM Motion Classifier
- Inputs: Client profile (industry, company size, ACV, sales model, etc.)
- Output: Predicted factory blueprint (which factories, what objects, what properties)
- Examples: 
  - Enterprise SaaS (sales-led) → Complex factory with multiple deal stages, weighted forecasting
  - PLG SaaS → Product factory + land-expand factory
  - Services → Time-based factory + outcomes factory

### 2. HubSpot Audit Engine
- Connects to client's HubSpot instance
- Scans actual setup: objects, properties, workflows, deal pipelines, etc.
- Compares against predicted blueprint from GTM classifier
- Identifies gaps, misconfigurations, anti-patterns

### 3. Scoring System
- Grades each factory against design standards
- Score dimensions: completeness, correctness, complexity, maturity
- Final audit score: 0-100
- Breakdown by factory type

### 4. Report Generator
- Audit summary (overall score, GTM analysis)
- Per-factory breakdown (predicted vs. actual)
- Gap analysis (what's missing, what's wrong)
- Remediation roadmap (prioritized fixes)

## Tech Stack (TBD based on implementation)
- Python or Node.js for audit logic
- HubSpot API for instance inspection
- Claude API for GTM classification (optional LLM enhancement)
- Report generation (PDF, HTML, Markdown)

## How Claude Should Help
When working on Factory Auditor:
- Build core audit logic (gap detection, scoring)
- Design GTM classifier patterns
- Create report templates and generation
- Validate audit results against real HubSpot instances
- Optimize for multiple factory types
- Add documentation for extending audit rules

## Key Success Metrics
- Can run a full audit on a HubSpot instance in <5 minutes
- Audit score aligns with RevGravy's manual assessment
- Report clearly shows gap between predicted and actual setup
- Customers understand what to fix and why

## Safety & Ethics
- Never modify client HubSpot data (read-only)
- Audit reports are confidential consulting outputs
- API credentials handled securely (env vars, never logged)
- Clearly mark audit as "beta" / "preview" until validated on production clients

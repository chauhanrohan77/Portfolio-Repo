---
title: "Job-Hunt Co-Pilot"
oneliner: "The agent I built for my own job search — and the scaffolding that every other build in this portfolio reuses."
status: built
order: 3
tags: ["Python", "LangChain", "Google Sheets", "Gmail API", "Agent loop"]
links:
  github: "https://github.com/chauhanrohan77/Job-Hunt-Co-Pilot"
architectureSteps:
  - "Role ingestion"
  - "Explainable scoring"
  - "Approval gate"
  - "Outreach drafting"
  - "Drafts-only queue"
metrics:
  - label: "Scoring agreement with manual labels"
    value: "[x]%"
  - label: "Hours saved per week"
    value: "[x]h"
  - label: "Auto-send policy"
    value: "Never"
---

## Origin story

Before applying agent patterns to regulated workflows, I tested them on a problem I owned end-to-end: my own job search. This had useful properties as a test environment — I controlled the success criterion, the feedback loop was fast, and the stakes were real enough to take the design seriously.

The result was a working agent that ingests job postings, scores them against a rubric, waits for my approval, and drafts outreach. It runs daily. It has never sent an email autonomously. That last constraint — **drafts everything, sends nothing** — turned out to be the most important product decision, and it became the approval gate pattern that the Governance Copilot and AML Triage Agent both inherit.

## The core product decision

**The explainable scoring rubric is the product.** A job posting scored 8/10 is only useful if I know which dimensions drove it. A black-box score I can't interrogate is just noise with a confidence veneer.

The rubric has five weighted dimensions, each with a 1–5 scale and a rationale string:

| Dimension | Weight | What it measures |
|---|---|---|
| Domain match | 30% | Posting domain vs. target domains (fintech, AI, regulated industries) |
| Seniority fit | 25% | Required years/level vs. profile; hard disqualifier if gap is large |
| Skill overlap | 25% | Named skills/tools in the posting present in my profile |
| Location/format | 10% | Onsite/remote and emirate vs. constraints |
| Growth signal | 10% | Whether the role stretches in a desired direction |

The agent's scoring output is the rubric table, not a single number. I can disagree with a dimension, adjust the weight, and see how the aggregate score changes. This is the pattern I replicated in the AML triage confidence scores: not "this alert is high risk" but "this alert is high risk because [anchoring factors]."

The key trade-off in rubric design is precision vs. recall. A strict rubric surfaces only near-perfect fits (high precision) but misses stretch roles worth pursuing (lower recall). The threshold is a tunable lever — raising it filters aggressively, lowering it widens the shortlist. That framing transfers directly to the recall-floor design in the regulated builds.

The approval gate was the second key decision. The agent identifies, scores, and drafts. I decide whether to send. This isn't timidity — it's the correct autonomy boundary for a high-stakes, personalized action. The same logic applies to a compliance officer reviewing an AI-drafted STR or a legal team reviewing a governance document.

## How it works

The agent runs on a daily schedule. It ingests new job postings from a watched list (LinkedIn, company career pages via RSS), deduplicates against previously seen roles (tracked in a Google Sheet), and scores each new posting against the rubric using an LLM call.

Roles above a threshold score are staged for approval in the Sheet, with the full rubric breakdown visible. On approval, the agent drafts an outreach message — tailored to the role and company, grounded in the specific rubric dimensions that made the match strong. The draft lands in Gmail as a draft. I review, edit, and send.

The Google Sheets integration serves two purposes: it's the approval interface and it's the evaluation dataset. Every scoring decision (approved, rejected, or ignored) becomes a labelled example for calibrating the rubric weights.

## Scaffolding reuse

The three components that became the shared foundation for the regulated builds:

1. **The agent loop**: the daily-schedule pattern, the deduplication logic, and the state management in a Google Sheet translate directly to the alert ingestion loop in the AML triage agent.

2. **The approval gate**: the "draft and stage for human approval" pattern is the human review queue in both the Governance Copilot and the AML triage agent. The implementation differs (Sheets vs. a case management stub) but the contract is identical.

3. **The evaluation harness**: the labelled decision log in the Sheet is the prototype for the evaluation sets in the other two builds. Recording ground-truth labels at the point of decision is a habit the regulated builds needed and this project established.

## Results

*[Replace with your real numbers.]*

- Scoring agreement with manual retrospective labels: [x]%
- Time spent on job search per week before vs. after: [x]h → [x]h
- Draft acceptance rate (sent with minor edits): [x]%
- Roles surfaced by the agent that I would have missed manually: [x]

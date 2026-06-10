---
title: "AI Governance & Model-Documentation Co-Pilot"
oneliner: "Classifies AI systems by regulatory risk tier across the EU AI Act, CBUAE/DIFC, and SDAIA — then drafts the governance file each regime demands. The LLM never decides the tier."
status: built
order: 1
tags: ["EU AI Act", "CBUAE", "SDAIA", "Python", "LangChain", "Bilingual EN/AR"]
links:
  github: "https://github.com/rohanchauhan/governance-copilot"
  demo: ""
architectureSteps:
  - "Intake record"
  - "Deterministic tier classification"
  - "LLM documentation drafting"
  - "Gap analysis"
  - "Confidence × risk routing"
  - "Human review queue"
metrics:
  - label: "High-risk recall floor"
    value: "≥0.95"
  - label: "Jurisdictions covered"
    value: "3"
  - label: "Output languages"
    value: "EN / AR"
---

## The problem

Three regulatory regimes — the EU AI Act, CBUAE/DIFC, and SDAIA — are asking deployers of AI the same governance questions on overlapping timelines. Most firms, especially deployers of third-party AI, can't answer without a scramble. They carry near-identical documentation duties to developers but have less institutional readiness.

The failure mode isn't ignorance of the regulation — it's an inability to translate a live AI deployment into the specific documentation each regime demands, quickly and consistently across jurisdictions.

## The core product decision

**The LLM never computes the risk tier.** A deterministic rule-tree, loaded from a versioned regime-config pack, computes the tier. The model only drafts prose over the already-computed tier and its anchor clauses.

This was the most defensible call in the build. Auditability is the product. If a regulator questions why a system was classified high-risk under Annex III of the EU AI Act, the answer must be traceable to a deterministic rule, not a probabilistic output. Putting the tier decision in a model would make that traceability impossible to guarantee.

The second key decision was the recall floor. Missing a high-risk system is a regulatory breach. Over-classifying wastes assurance effort. The system is tuned to a defensible recall floor (≥0.95) and reports precision honestly within it.

## How it works

An AI system profile is submitted as a structured intake record — sector, intended use, deployment context, data types, and decision scope. The deterministic classification engine evaluates it against the regime-config pack for the selected jurisdiction. The config pack is versioned and swappable, so regulatory updates (new Annex III categories, updated CBUAE guidance) are config changes, not code changes.

Once a tier is assigned, the LLM drafts the governance documentation required by that tier in that regime: risk management plan, conformity assessment outline, human oversight specification, or equivalent. For UAE and KSA profiles, output is bilingual. For a system that spans jurisdictions, the cross-regime matrix defaults to the most restrictive applicable tier.

High-confidence, low-risk classifications route to a documentation queue. High-risk or low-confidence cases route to a human review queue with a full audit trail of the classification reasoning and the anchor clauses that triggered it.

## Evaluation & results

*[Replace with your real evaluation results — confusion matrix, achieved recall/precision, cross-regime consistency test results, draft acceptance rate. Never present PRD targets as achieved results.]*

The evaluation set covers [N] synthetic AI system profiles across all three jurisdictions, with labels derived from the published regulatory texts and a manual review pass.

Key results:
- High-risk recall: [achieved value] against the ≥0.95 floor
- Precision at the chosen threshold: [achieved value]
- Sanctions-adjacent and rights-impacting systems: 100% routed to human review
- Cross-jurisdiction consistency: [N]% agreement on equivalent profiles across regimes

## Trade-offs & what I'd do next

The primary production gap is regime-pack staleness. The EU AI Act delegated acts, CBUAE circulars, and SDAIA implementing regulations all update on rolling timelines. In a pilot deployment, regime-pack versioning would need a governance workflow — a named owner, a change-log, and a re-validation process on each update.

The bilingual output has been validated for technical correctness but not for formal regulatory Arabic. A production pilot would need native-speaker legal review before using Arabic drafts in a submission.

What I'd prioritise next: a regime-pack validation test suite (analogous to a unit test for the classification rules), and a structured feedback loop where human reviewers' corrections are captured as labelled training signal for future threshold calibration.

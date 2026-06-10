---
title: "AML Alert Triage Agent"
oneliner: "Scores transaction-monitoring alerts under a CBUAE/FATF-aligned rules layer, drafts investigator-ready disposition rationales, and auto-clears nothing that is sanctions-adjacent, high-value, or low-confidence."
status: built
order: 2
tags: ["CBUAE", "FATF", "AML", "Python", "LangChain", "Alert triage"]
links:
  github: "https://github.com/chauhanrohan77/Transaction-Monitoring-Alert-Triage-Agent"
  demo: ""
architectureSteps:
  - "Alert ingestion"
  - "Deterministic screening layer"
  - "LLM severity scoring"
  - "Confidence × risk routing"
  - "Disposition drafting"
  - "Human queue + audit trail"
metrics:
  - label: "True positive recall floor"
    value: "≥0.95"
  - label: "Sanctions routing"
    value: "100%"
  - label: "Automation rate"
    value: "[x]%"
---

## The problem

Under CBUAE rules and the FATF framework, UAE fintechs must run continuous transaction monitoring, screen against sanctions lists, apply the Travel Rule to qualifying transfers, and file Suspicious Activity Reports through the UAE Financial Intelligence Unit's goAML system. Rules-based monitoring engines generate a high volume of alerts — the vast majority are false positives, but each must still be reviewed by a compliance analyst. A missed true positive is a regulatory breach.

The economics are brutal: compliance teams spend most of their time on noise, which means they have less capacity to investigate signals that matter. Alert fatigue compounds over time — fatigued reviewers miss things.

The correct product response is not "automate more" but "triage correctly": ensure every high-risk, sanctions-adjacent, or ambiguous alert reaches a human, while giving that human a well-structured disposition rationale so their review time is spent on judgment, not synthesis.

## The core product decision

**Asymmetric cost threshold design.** A false negative (missed true positive) has a categorically different cost than a false positive (unnecessary escalation). The system is designed around this asymmetry:

- Recall ≥0.95 is a hard floor — non-negotiable, not tuned for precision
- The always-escalate rule for sanctions-adjacent cases lives in deterministic code, not the model
- Automation only applies to cases where the model is high-confidence AND the deterministic layer has cleared the alert AND it is not high-value

This means the system sacrifices automation rate in exchange for a recall guarantee. That's the correct trade-off under CBUAE/FATF obligations, and it's the argument to make to a compliance officer when presenting the system.

## How it works

Incoming alerts from the transaction monitoring system are ingested with their full context: transaction value, counterparty jurisdiction, account history flags, and the rule that triggered the alert. A deterministic screening layer runs first — it applies the always-escalate logic for sanctions exposure, high-value thresholds, and cross-border combinations that CBUAE guidance treats as elevated risk. This layer cannot be overridden by the model.

Alerts that pass the deterministic screen are scored by the LLM, which assigns a severity level and confidence score. Low-confidence outputs, regardless of severity, route to the human queue. High-confidence, low-severity, non-sanctions-adjacent alerts below the value threshold are candidates for automation.

For every alert — whether auto-cleared or escalated — the agent drafts a disposition rationale: what triggered the alert, what the scoring logic applied, what the anchoring factors were. This rationale is the audit trail entry for the case management system.

## Evaluation & results

*[Replace with your real evaluation results — confusion matrix, achieved recall/precision, sanctions routing test results, implied automation rate at your threshold. Never present PRD targets as achieved results.]*

The evaluation set covers [N] synthetic transaction monitoring alerts, labelled by risk level using CBUAE/FATF typologies as the classification framework.

Key results:
- True positive recall: [achieved value] against the ≥0.95 floor
- Precision at chosen threshold: [achieved value]
- Sanctions-adjacent routing: 100% (deterministic rule, verified exhaustively)
- Automation rate at threshold: [x]% of alerts
- Average disposition rationale quality: [manual review score or acceptance rate]

## Trade-offs & what I'd do next

This demo operates on synthetic data. The gap between this build and a CBUAE-regulated pilot is substantial and worth naming plainly:

- **Live sanctions lists**: the demo uses a static snapshot; production requires a real-time OFAC/UN/EU sanctions feed with a defined latency SLA
- **goAML integration**: disposition rationales would need to map to the FIU's goAML reporting schema for STR submissions
- **PII handling**: real alerts contain genuine customer PII; the demo uses synthetic identifiers throughout
- **Model auditability**: a production deployment would need model versioning locked to the evaluation period for regulatory audit purposes

What I'd prioritise next: a formal evaluation against a set of known-typology cases drawn from published FATF guidance, and a sanctions-routing stress test against edge cases (near-name matches, secondary sanctions exposure, complex counterparty chains).

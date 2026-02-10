---
name: skill-registry
type: Infra
maturity: core
version: 1.0.0
description: Central registry for all skills with fitness tracking and promotion/demotion rules.
---

# Skill Registry & Fitness Tracker

## Purpose
This is the **single source of truth** for all skills in the AI Army.
It tracks what skills exist, how well they perform, and manages their lifecycle (promotion, demotion, archival).

> "从第一天就开始记。表现好的升，表现差的降。定期复盘。"

---

## 1. Registry Format

### Master Skill Index

| Skill Name | Layer | Maturity | Version | Fitness | Invocations | Last Used | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| meta-commander | L0 | core | 1.0.0 | — | 0 | — | Active |
| evaluation-commander | L0 | core | 1.0.0 | — | 0 | — | Active |
| learning-commander | L0 | core | 1.0.0 | — | 0 | — | Active |
| code-orchestrator | L1 | core | 1.0.0 | — | 0 | — | Active |
| evaluation-orchestrator | L1 | core | 1.0.0 | — | 0 | — | Active |
| learning-orchestrator | L1 | core | 1.0.0 | — | 0 | — | Active |
| code-gen-core | L2 | core | 1.0.0 | — | 0 | — | Active |
| code-review-core | L2 | core | 1.0.0 | — | 0 | — | Active |
| test-gen-core | L2 | core | 1.0.0 | — | 0 | — | Active |

> **Note**: Fitness scores start as "—" (unrated) and are populated after sufficient invocations.

---

## 2. Fitness Scoring

### Metrics (per Skill)
Track after every invocation:

| Metric | How to Measure |
| :--- | :--- |
| **Success Rate** | Did the skill produce a usable output? (Yes=1, No=0) |
| **Revision Count** | How many times did the output need to be revised? (0 is ideal) |
| **User Satisfaction** | Did the user accept the output without complaint? (Inferred) |
| **Downstream Success** | Did the next skill in the pipeline succeed? (e.g., code-review passes after code-gen) |

### Fitness Formula
```
Fitness = (Success Rate × 0.4) + (1 - Revision Rate × 0.3) + (User Satisfaction × 0.2) + (Downstream Success × 0.1)
```
- Score range: **0.0 to 1.0**
- Minimum 10 invocations before a score is considered valid.

---

## 3. Maturity Tiers

| Tier | Fitness Requirement | Invocation Requirement | Contract Strictness |
| :--- | :--- | :--- | :--- |
| **experimental** | < 0.7 (or unrated) | < 20 | Loose — allowed to fail |
| **extended** | ≥ 0.7 | ≥ 20 | Standard — should be reliable |
| **core** | ≥ 0.9 | ≥ 50 | Strict — must be reliable |

---

## 4. Promotion Rules

### Promotion: experimental → extended
- Fitness ≥ 0.7 over the last 20 invocations.
- No unresolved Blocker-level issues from code-review-core.
- Action: Move file from `experimental/` to `extended/`. Update maturity in frontmatter.

### Promotion: extended → core
- Fitness ≥ 0.9 over the last 50 invocations.
- Has been stable for at least 2 review cycles.
- Fully conforms to `skill-contract.md`.
- **Requires human approval** (user must confirm).
- Action: Move file from `extended/` to `core/`. Update maturity in frontmatter.

### Demotion: core → extended
- Fitness drops below 0.85 over the last 30 invocations.
- OR 3 consecutive failures.
- Action: Move file back to `extended/`. Flag for investigation.

### Demotion: extended → experimental
- Fitness drops below 0.6 over the last 20 invocations.
- Action: Move file back to `experimental/`. Flag for rewrite.

### Archival
- Skill has not been invoked in 90+ days.
- OR fitness is below 0.3 after 20+ invocations.
- Action: Move to `L2_Execution/archived/`. Remove from active routing.

---

## 5. Tracking Protocol

### After Every Skill Invocation
The orchestrator (L1) should mentally note:
1.  Which skill was called?
2.  Did it succeed on first attempt?
3.  How many revisions were needed?
4.  Did the user accept the output?

### Weekly Review (Recommended)
When the user triggers a review (or every ~20 invocations):
1.  Update the Master Skill Index above.
2.  Check for skills eligible for promotion or demotion.
3.  Identify underperforming skills — suggest improvements or replacements.
4.  Identify gaps — tasks that had no suitable skill (candidates for `prime-mover` creation).

---

## 6. Registry Commands
Users or Commanders can trigger these actions:

| Command | Action |
| :--- | :--- |
| "Show skill registry" | Display the Master Skill Index table |
| "Review skill fitness" | Run the weekly review protocol |
| "Promote [skill]" | Check promotion eligibility and execute |
| "Demote [skill]" | Check demotion criteria and execute |
| "Archive [skill]" | Move to archived, remove from routing |
| "What skills do I have?" | List all active skills by layer |

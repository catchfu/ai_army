# AI Army: Skill Orchestration System

> "一个人，调用一支 AI 军队。"

## Project Overview
This project implements a **Hierarchical Skill Orchestration System** for AI Agents. It transforms isolated prompts into a structured, self-improving "Army" of skills.

## Core Structure
The system is organized into three layers (L0-L2) to separate Decision, Coordination, and Execution.

- **L0 Decision (Commanders)**: Strategic routing and high-level decisions.
  - `meta-commander` — Routes code/implementation requests.
  - `evaluation-commander` — Routes comparison, audit, and review requests.
  - `learning-commander` — Routes learning and knowledge requests.
- **L1 Coordination (Orchestrators)**: Workflow management, dividing tasks into steps.
  - `code-orchestrator` — Manages the code dev lifecycle (gen → test → review).
  - `evaluation-orchestrator` — Manages multi-round adversarial evaluations.
  - `learning-orchestrator` — Manages the 4-phase learning journey.
- **L2 Execution (Skills)**: Concrete atomic tasks.
  - `code-gen-core` — Generates production-ready code.
  - `code-review-core` — Reviews code for bugs, security, and style.
  - `test-gen-core` — Generates unit/integration tests (supports TDD).

## Usage Guide
1. **Start a Task**: User provides a high-level intent.
2. **Consult L0**: The Agent reads the appropriate Commander in `L0_Decision/` to classify and route.
3. **Execute L1**: The Agent reads the assigned Orchestrator in `L1_Coordination/` to plan steps.
4. **Run L2**: The Agent executes specific skills from `L2_Execution/` as directed.

### Routing Quick Reference

| User Says | L0 Commander | L1 Orchestrator |
| :--- | :--- | :--- |
| "Write...", "Fix...", "Refactor..." | `meta-commander` | `code-orchestrator` |
| "Explain...", "How to...", "Teach me..." | `learning-commander` | `learning-orchestrator` |
| "Compare...", "Which is better...", "Audit..." | `evaluation-commander` | `evaluation-orchestrator` |

## Directory Map
- `.claude/skills/_architecture/`
  - `L0_Decision/`: meta-commander, evaluation-commander, learning-commander.
  - `L1_Coordination/`: code-orchestrator, evaluation-orchestrator, learning-orchestrator.
  - `L2_Execution/`:
    - `core/`: High-fitness, reliable skills (code-gen, code-review, test-gen).
    - `extended/`: Specialized skills (future).
    - `experimental/`: New, testing skills (future).
  - `infra/`: Contract definitions (`skill-contract.md`) and Skill Registry (`skill-registry.md`).

## Skill Lifecycle
Skills have a fitness score and can be promoted or demoted:
- **experimental** (fitness < 0.7) → **extended** (≥ 0.7, 20+ uses) → **core** (≥ 0.9, 50+ uses)
- See `infra/skill-registry.md` for full tracking and promotion/demotion rules.

## Quick Start (Demo)
See `DEMO_USER_MANUAL.md` for step-by-step walkthroughs of:
- **Demo 1**: Generating a login form (Code workflow)
- **Demo 2**: Comparing React vs Vue (Evaluation workflow)
- **Demo 3**: Learning message queues (Learning workflow)

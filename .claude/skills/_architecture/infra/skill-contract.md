# Skill Contract Definition (v1.0)

Every Skill in the AI Army must adhere to this contract to ensure composability and quality.

## 1. Frontmatter Metadata (YAML)
Each `.md` skill file must start with:

```yaml
---
name: [Skill Name, e.g., "code-gen-core"]
type: [L0-Decision | L1-Coordination | L2-Execution]
maturity: [core | extended | experimental]
version: 1.0.0
owner: [Role, e.g., "Code Orchestrator"]
description: [One-line summary of what this skill does]
---
```

## 2. Input/Output Contract
Explicitly define what the skill expects and what it provides.

### Input Schema
*   **Context**: What prior information is needed? (e.g., "User Requirement", "Existing File Content")
*   **Parameters**: specific flags or modes (e.g., "Language: Python", "Style: Functional").

### Output Schema
*   **Format**: (e.g., Markdown code block, JSON, Plain text list)
*   **Artifacts**: (e.g., "Must generate a file named X", "Must return a diff")

## 3. Execution Protocol
*   **Step-by-Step Instructions**: Clear, numbered atomic steps.
*   **Constraint Checklist**: NEGATIVE constraints (e.g., "Do NOT use sudo", "Do NOT use placeholders").

## 4. Quality Gates (Self-Correction)
*   **Validation**: How does the Agent verify its own output before returning?
    *   *Example*: "Check if all imports are used."
    *   *Example*: "Ensure JSON is valid."

## 5. Error Handling
*   **Fallbacks**: What to do if the request involves unknown libraries?
*   **Escalation**: When to stop and ask the Orchestrator/User?

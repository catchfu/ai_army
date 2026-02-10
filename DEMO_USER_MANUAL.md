# AI Army Demo: User Manual

This manual walks through **three demos** showing how the AI Army Skill System handles different types of requests.

## Prerequisites
Ensure the `.claude/skills/_architecture` structure is populated with all skill files.

---

## Demo 1: Build a Login Form (Code Workflow)

### Step 1: User Request
**User**: "I need a modern, dark-themed login form with HTML, CSS, and minimal JS validation."

### Step 2: L0 Decision (Meta-Commander)
*Agent loads `.claude/skills/_architecture/L0_Decision/meta-commander.md`*

**Agent Thought**:
- Intent: Create code.
- Complexity: S (Simple).
- Routing: `code-orchestrator`.

```markdown
**COMMAND DECISION**
- Classification: Code
- Complexity: S
- Assigned L1: code-orchestrator
- Strategy: Direct implementation with basic validation.
```

### Step 3: L1 Coordination (Code-Orchestrator)
*Agent loads `.claude/skills/_architecture/L1_Coordination/code-orchestrator.md`*

**Agent Thought**:
- Plan:
    1. `code-gen-core` to write the files (`index.html`, `style.css`, `script.js`).
    2. `code-review-core` to check safety and style.

```markdown
**ORCHESTRATION PLAN**
1. code-gen-core: Generate HTML/CSS/JS for dark-themed login.
2. code-review-core: Specific check for XSS vulnerabilities in inputs.
```

### Step 4: L2 Execution (Code-Gen)
*Agent loads `.claude/skills/_architecture/L2_Execution/core/code-gen-core.md`*

**Agent**:
- Writes `index.html` (Semantic HTML).
- Writes `style.css` (Dark mode, flexbox/grid).
- Writes `script.js` (Event listeners, validation).

### Step 5: L2 Execution (Code-Review)
*Agent loads `.claude/skills/_architecture/L2_Execution/core/code-review-core.md`*

**Agent**:
- Checks for `innerHTML` usage (XSS risk).
- Checks for form accessibility (ARIA labels).
- Output: "LGTM" or "Fix `innerHTML` usage on line 12".

---

## Demo 2: React vs Vue for a Startup (Evaluation Workflow)

### Step 1: User Request
**User**: "Which is better for my startup MVP — React or Vue?"

### Step 2: L0 Decision (Evaluation-Commander)
*Agent loads `.claude/skills/_architecture/L0_Decision/evaluation-commander.md`*

**Agent Thought**:
- Intent: Comparison / Decision.
- Scope: Binary (two options).
- Depth: Rigorous (mentions "startup" = long-term impact).

```markdown
**EVALUATION DECISION**
- Scope: Binary
- Depth: Rigorous
- Candidates: React, Vue
- Assigned L1: evaluation-orchestrator
- Criteria Hint: Learning curve, Ecosystem, Hiring, Performance, DX
```

### Step 3: L1 Orchestrator (Evaluation-Orchestrator)
*Agent loads `.claude/skills/_architecture/L1_Coordination/evaluation-orchestrator.md`*

**Agent executes 4 rounds**:

**Round 1 — Initial Screening**: Score both frameworks across 7 criteria (1-10). Neither eliminated (binary comparison).

**Round 2 — Deep Analysis**: Top 3 weaknesses for each. React: JSX learning curve, decision fatigue (too many choices). Vue: smaller talent pool, fewer enterprise case studies.

**Round 3 — Devil's Advocate**: Attack the #1 pick. "If you pick React, will your small team drown in boilerplate and config choices?"

**Round 4 — Consensus**:
```markdown
**EVALUATION RESULT**
- Winner: Vue (Confidence: 65%)
- Runner-up: React — better if you plan to hire senior devs or scale to 50+ engineers.
- Key Risk: Smaller hiring pool for Vue developers.
- Mitigation: Vue's learning curve is gentle — junior devs ramp up fast.
```

---

## Demo 3: Learn Message Queues (Learning Workflow)

### Step 1: User Request
**User**: "I want to learn message queues."

### Step 2: L0 Decision (Learning-Commander)
*Agent loads `.claude/skills/_architecture/L0_Decision/learning-commander.md`*

**Agent Thought**:
- Intent: Learning.
- Topic: Message Queues.
- Depth: `Mastery` (user said "learn", implies deep understanding).
- Prior Level: Novice (no prior context given).

```markdown
**LEARNING DECISION**
- Topic: Message Queues
- Depth: Mastery
- Prior Level: Novice
- Assigned L1: learning-orchestrator
- Strategy: Start with postal analogy, build to hands-on RabbitMQ exercise.
```

### Step 3: L1 Orchestrator (Learning-Orchestrator)
*Agent loads `.claude/skills/_architecture/L1_Coordination/learning-orchestrator.md`*

**Agent executes 4 phases**:

**Phase 1 — Digest**: "A message queue is like a post office. Service A drops off a letter (message). The post office (queue) holds it. Service B picks it up when ready. Neither needs to be available at the same time."

**Phase 2 — Structure**: ASCII diagram of Producer → Queue → Consumer. Comparison table: Message Queue vs Direct API Call vs Shared Database.

**Phase 3 — Internalize**: Socratic questions — "What happens if the consumer crashes?" "What if messages arrive faster than they're processed?" User answers, agent corrects.

**Phase 4 — Apply**: Build a simple Node.js app with a task queue. `test-gen-core` writes tests. `code-gen-core` writes the implementation. User runs it and sees messages flowing.

---

## How to Run Any of These

Simply tell your Agent one of:
> "System: Activate Meta-Commander. Request: Build a Login Form demo."

> "System: Activate Evaluation-Commander. Request: Compare React vs Vue for my startup."

> "System: Activate Learning-Commander. Request: Teach me message queues."

The system will automatically load the right Commander → Orchestrator → Skills.

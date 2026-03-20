---
name: "prompt-composition"
description: "Composes multiple prompts into coherent workflows. Invoke when a task requires multiple steps or combining different prompt types."
---

# Prompt Composition Skill

Composes multiple prompts into coherent workflows for complex tasks.

## When to Use

- Complex tasks requiring multiple steps
- Need to determine prompt execution order
- Need to pass parameters between prompts
— Need to establish prompt execution闭环

## Composition Process

### 1. Analyze Task Goal
Break down the task to understand:
- What needs to be accomplished
- Logical execution order
- Dependencies between steps

### 2. Select Prompts
Choose appropriate prompts for each step:
- Match prompt capabilities to task requirements
- Consider prompt input/output interfaces
- Ensure compatibility between prompts

### 3. Define Execution Flow
Design the workflow:
- Sequential execution when steps depend on each other
- Parallel execution when steps are independent
- Define data flow between steps

### 4. Establish Feedback Loop
Create闭环 mechanism：
- Verify completion of each step
- Handle errors and retries
- Confirm final goal achievement

## Related Prompts

- `prompt-routing-compose` - Compose multiple prompts
- `prompt-routing-select-relevant` - Select relevant prompts

## Workflow Example

```
Task: Implement feature and verify
1. Use repo-analysis to understand structure
2. Use coding prompts to implement
3. Use debugging prompts to verify
4. Use output prompts to report results
```
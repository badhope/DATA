---
name: "routing"
description: "Routes user requests to appropriate skills and prompts. Invoke when user intent is unclear or when selecting the right approach for a task."
---

# Routing Skill

Routes and identifies task types, guiding AI to select appropriate prompts and workflows.

## When to Use

- User intent is unclear
- Need to determine task type from user request
- Selecting appropriate skills/prompts from multiple candidates
- Composing multiple prompts for complex tasks

## Routing Process

### 1. Identify Task Type

Analyze user request to identify:
- Primary task category (coding, debugging, planning, etc.)
- Required capabilities
- Complexity level

### 2. Match to Resources

Based on task type, match to:
- Relevant skills
- Appropriate prompts
- Applicable workflows

### 3. Provide Recommendations

Present recommended approach with:
- Selected prompts/skills
- Reasoning for selection
- Any alternative options

## Related Prompts

- `prompt-routing-scan-repository` - Scan repo structure
- `prompt-routing-identify-task-type` - Identify task type
- `prompt-routing-select-relevant` - Select relevant prompts
- `prompt-routing-compose` - Compose multiple prompts

## Usage Example

```
User： "帮我看看这个项目"
→ Use routing skill to identify: repo-analysis task
→ Recommend: skill-repo-analysis + prompts for structure analysis
```
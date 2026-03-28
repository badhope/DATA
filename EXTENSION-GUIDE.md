# Extension Guide

This guide explains how to extend the repository by adding new skills to the HCSA architecture.

---

## Adding a New Skill

### 1. Choose the Right Layer

| Layer | When to Add Here | Example |
|-------|-----------------|---------|
| **Meta** | Strategic planning, task decomposition | task-planner, orchestrator |
| **Workflow** | Multi-step process coordination | coding-workflow, debugging-workflow |
| **Action** | Specific operations, tool usage | code-generator, test-generator |
| **Domain** | Domain-specific expertise | python, react, docker |

### 2. Create Directory Structure

```
.trae/skills/{layer}/{skill-name}/
├── SKILL.md          # Required: Skill definition
└── examples/         # Optional: Example files
    └── example-1.md
```

### 3. Write SKILL.md

Every skill must have standardized frontmatter:

```yaml
---
name: skill-name
description: "Clear description of what this skill does"
layer: meta | workflow | action | domain
role: planner | coordinator | executor | expert
version: 1.0.0
invokes: []        # Skills this skill calls
invoked_by: []     # Skills that call this skill
capabilities: []   # What this skill can do
triggers:
  keywords: []     # Keywords that trigger this skill
metrics:
  avg_execution_time: 2s
  success_rate: 0.95
  token_efficiency: 0.88
---
```

### 4. Skill Body Structure

```markdown
## Purpose
What this skill does and when to use it.

## Capabilities
- Capability 1
- Capability 2

## Usage
When and how to invoke this skill.

## Examples
### Example 1: Title
Input: ...
Output: ...

## Best Practices
- Practice 1
- Practice 2

## Error Handling
How to handle common errors.

## Related Skills
- related-skill-1
- related-skill-2
```

---

## Layer-Specific Guidelines

### Meta Layer

Meta skills handle strategic decisions:

```yaml
layer: meta
role: planner
capabilities:
  - intent_analysis
  - task_decomposition
  - complexity_assessment
  - execution_planning
invokes:
  - workflow-skills
```

### Workflow Layer

Workflow skills coordinate processes:

```yaml
layer: workflow
role: coordinator
capabilities:
  - process_coordination
  - state_management
  - result_aggregation
invokes:
  - action-skills
invoked_by:
  - meta-skills
```

### Action Layer

Action skills execute operations:

```yaml
layer: action
role: executor
capabilities:
  - specific_operation
  - tool_usage
  - data_processing
invoked_by:
  - workflow-skills
```

### Domain Layer

Domain skills provide expertise:

```yaml
layer: domain
role: expert
capabilities:
  - domain_knowledge
  - best_practices
  - patterns
invoked_by:
  - action-skills
  - workflow-skills
```

---

## Updating Routing

After adding a new skill, update `config/routing.yaml`:

```yaml
routing_rules:
  - name: "new_skill_route"
    condition:
      keywords: ["keyword1", "keyword2"]
    route:
      layer: action
      skill: new-skill-name
```

---

## Testing New Skills

1. Verify frontmatter is valid YAML
2. Check all invoked skills exist
3. Test keyword triggers
4. Validate routing rules

---

## Best Practices

1. **Single Responsibility**: Each skill should do one thing well
2. **Clear Naming**: Use descriptive, action-oriented names
3. **Complete Metadata**: Fill all required frontmatter fields
4. **Document Examples**: Provide clear usage examples
5. **Update Index**: Add skill to SKILLS-INDEX.md

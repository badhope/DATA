---
name: "self-memory-manager"
description: "Manages self-contained memory by extracting keywords and key instructions from context, storing them in a project-specific location. Invoke when needing persistent memory across sessions without relying on system memory."
---

# Self Memory Manager Skill

A skill for managing self-contained, persistent memory independent of system-provided memory.

## When to Use

- Long-running tasks spanning multiple sessions
- Need to remember context across conversations
- Storing user preferences and decisions
- Tracking task progress and history
- Maintaining project-specific knowledge

## Memory Architecture

### Storage Location

Default: `.trae/memory/` in project root
User-specified: Any path user provides

```
.trae/
└── memory/
    ├── keywords.json      # Extracted keywords
    ├── instructions.json  # Key instructions
    ├── decisions.json     # Decision history
    ├── progress.json      # Task progress
    ├── preferences.json   # User preferences
    └── context.json       # Session context
```

### Memory Files Structure

#### keywords.json

```json
{
  "project": "project-name",
  "lastUpdated": "2026-03-25T10:00:00Z",
  "keywords": [
    {
      "term": "authentication",
      "context": "JWT-based auth system",
      "relevance": 0.95,
      "files": ["src/auth/jwt.ts", "src/middleware/auth.ts"],
      "lastReferenced": "2026-03-25T09:30:00Z"
    }
  ],
  "categories": {
    "technical": ["api", "database", "auth"],
    "business": ["user", "order", "payment"],
    "constraints": ["performance", "security"]
  }
}
```

#### instructions.json

```json
{
  "project": "project-name",
  "instructions": [
    {
      "id": "inst-001",
      "type": "constraint",
      "content": "Always use TypeScript strict mode",
      "source": "user",
      "created": "2026-03-25T10:00:00Z",
      "priority": "high",
      "scope": "global"
    },
    {
      "id": "inst-002",
      "type": "preference",
      "content": "Prefer functional components over class components",
      "source": "inferred",
      "created": "2026-03-25T10:05:00Z",
      "priority": "medium",
      "scope": "frontend"
    }
  ]
}
```

#### decisions.json

```json
{
  "project": "project-name",
  "decisions": [
    {
      "id": "dec-001",
      "decision": "Use PostgreSQL for primary database",
      "rationale": "Better JSON support and performance for read-heavy workload",
      "alternatives": ["MongoDB", "MySQL"],
      "made": "2026-03-25T10:00:00Z",
      "impact": ["src/db/", "src/models/"]
    }
  ]
}
```

#### progress.json

```json
{
  "project": "project-name",
  "currentTask": {
    "id": "task-001",
    "description": "Implement user authentication",
    "status": "in_progress",
    "started": "2026-03-25T09:00:00Z",
    "completedSteps": ["setup-jwt", "create-middleware"],
    "pendingSteps": ["add-refresh-token", "write-tests"]
  },
  "history": [
    {
      "taskId": "task-000",
      "description": "Setup project structure",
      "status": "completed",
      "completed": "2026-03-25T08:00:00Z"
    }
  ]
}
```

#### preferences.json

```json
{
  "project": "project-name",
  "userPreferences": {
    "codeStyle": {
      "indentation": "2 spaces",
      "quotes": "single",
      "semicolons": false
    },
    "workflow": {
      "autoSave": true,
      "confirmBeforeApply": true,
      "verboseOutput": false
    },
    "timeout": {
      "defaultMultiplier": 1.5,
      "autoSkip": false
    }
  }
}
```

## Workflow

### 1. Initialize Memory

```markdown
On first use or new project:
1. Check for existing memory directory
2. If not exists, create structure
3. Initialize empty memory files
4. Set project metadata
```

### 2. Extract Keywords

```markdown
From current context:
1. Identify technical terms
2. Extract business concepts
3. Find constraint keywords
4. Calculate relevance scores
5. Link to related files

Algorithm:
- TF-IDF for importance
- Co-occurrence for relationships
- Recency weighting
```

### 3. Store Instructions

```markdown
When new instruction detected:
1. Classify instruction type
2. Extract core requirement
3. Determine scope and priority
4. Store with metadata
5. Link to related keywords
```

### 4. Track Progress

```markdown
During task execution:
1. Record task start
2. Update completed steps
3. Note any blockers
4. Save checkpoints
5. Record completion
```

### 5. Recall Memory

```markdown
Before each operation:
1. Read relevant memory files
2. Match context to stored keywords
3. Retrieve applicable instructions
4. Check decision history
5. Apply preferences
```

## Memory Operations

### Store

```markdown
## store_keyword(term, context, files)
Add or update keyword in memory

## store_instruction(content, type, priority)
Add new instruction

## store_decision(decision, rationale, alternatives)
Record a decision made

## store_progress(taskId, step, status)
Update task progress
```

### Recall

```markdown
## recall_keywords(query)
Find relevant keywords matching query

## recall_instructions(scope)
Get instructions for a scope

## recall_decisions(topic)
Find decisions about a topic

## recall_progress()
Get current task status
```

### Update

```markdown
## update_preference(key, value)
Update user preference

## update_relevance(term, newContext)
Adjust keyword relevance

## mark_instruction_applied(instructionId)
Mark instruction as applied
```

## Integration Points

### Before Task Execution

```markdown
1. recall_keywords(task_context)
2. recall_instructions(task_scope)
3. recall_decisions(related_topics)
4. Apply preferences to execution
```

### During Task Execution

```markdown
1. store_progress updates
2. Extract new keywords
3. Store new instructions if any
```

### After Task Completion

```markdown
1. store_progress completion
2. Update keyword relevance
3. Store any decisions made
4. Clean up temporary data
```

## Memory Maintenance

### Cleanup Rules

```markdown
1. Remove keywords not referenced in 30 days
2. Archive completed tasks older than 7 days
3. Merge duplicate instructions
4. Validate file integrity periodically
```

### Conflict Resolution

```markdown
When conflicting instructions:
1. Check priority levels
2. Check recency
3. Check scope specificity
4. Ask user if unresolved
```

## User Configuration

Users can specify custom memory location:

```markdown
## In .trae/config.json
{
  "memory": {
    "location": "/custom/path/to/memory",
    "maxKeywords": 1000,
    "retentionDays": 30,
    "autoCleanup": true
  }
}
```

## Related Skills

- `context-compressor` - Compress context before storing
- `instruction-refinement` - Refine instructions before storing
- `execution-timeout-handler` - Use memory for timeout preferences

---
name: "execution-timeout-handler"
description: "Detects and handles execution timeouts dynamically based on task type. Invoke when operations take too long or when setting up timeout-aware execution strategies."
---

# Execution Timeout Handler Skill

A skill for managing execution timeouts dynamically based on task complexity and type.

## When to Use

- Long-running operations need timeout protection
- User wants to skip stuck operations
- Setting up resilient execution pipelines
- Detecting and recovering from hung processes

## Timeout Strategy

### Dynamic Timeout Calculation

Timeout is determined by task type, not fixed values:

| Task Type | Base Timeout | Max Timeout | Detection Method |
|-----------|-------------|-------------|------------------|
| File Read | 5s | 30s | File size based |
| File Write | 10s | 60s | File size based |
| Code Search | 15s | 60s | Repository size |
| Build/Compile | 60s | 300s | Project complexity |
| Test Run | 30s | 180s | Test count |
| API Call | 10s | 30s | Endpoint type |
| Git Operation | 15s | 60s | Operation type |
| Package Install | 60s | 300s | Package count |
| Code Generation | 30s | 120s | Complexity estimate |
| Refactoring | 60s | 300s | File count |

### Timeout Detection Signals

Monitor for:
1. **No Progress**: No output/changes for threshold period
2. **Memory Spike**: Sudden memory increase without progress
3. **CPU Pattern**: Sustained 100% or 0% CPU
4. **Error Loop**: Repeated same error
5. **User Signal**: User indicates impatience

## Workflow

### 1. Pre-Execution Setup

```markdown
Before starting:
1. Identify task type
2. Calculate dynamic timeout
3. Set up monitoring
4. Prepare fallback strategy
```

### 2. Execution Monitoring

```markdown
During execution:
1. Track progress indicators
2. Monitor resource usage
3. Check for timeout signals
4. Log progress periodically
```

### 3. Timeout Handling

When timeout detected:

```markdown
## Immediate Actions
1. Stop current operation gracefully
2. Save partial progress if possible
3. Log timeout reason and context

## User Communication
Report:
- What was being attempted
- How long it ran
- What was completed
- Why it timed out

## Recovery Options
Offer user:
1. [Skip] Skip this step, continue with next
2. [Retry] Try again with adjusted parameters
3. [Alternative] Use different approach
4. [Abort] Stop entire operation
```

### 4. Progress Preservation

On timeout, preserve:
- Completed steps
- Partial outputs
- Error context
- Recovery checkpoint

## Timeout Response Templates

### For File Operations

```
⏱️ File operation timed out after {duration}s

File: {file_path}
Operation: {read/write/search}
Size: {file_size}

Completed: {what_was_done}
Pending: {what_was_not_done}

Options:
1. Skip this file and continue
2. Try with smaller chunk size
3. Use alternative method
```

### For Build/Compile

```
⏱️ Build process timed out after {duration}s

Project: {project_name}
Stage: {build_stage}
Progress: {percentage}%

Last output:
{last_few_lines}

Options:
1. Skip and use cached build
2. Retry with verbose output
3. Try incremental build
```

### For Code Generation

```
⏱️ Code generation timed out after {duration}s

Task: {generation_task}
Complexity: {estimated_complexity}

Generated so far:
{partial_output}

Options:
1. Use partial output and continue manually
2. Retry with simpler requirements
3. Break into smaller tasks
```

## Smart Skip Logic

### When to Auto-Skip

Automatically skip (with notification) when:
- Non-critical optional step
- Alternative path available
- User previously chose skip for similar

### When to Always Ask

Never auto-skip, always ask user:
- Core task component
- Data loss risk
- Irreversible operation

### Skip Chain Prevention

When multiple timeouts occur:
1. After 3 consecutive skips, pause
2. Ask user if they want to continue
3. Offer to adjust timeout thresholds
4. Suggest breaking task into smaller pieces

## Configuration

### User Preferences

Store in `.trae/timeout-config.json`:

```json
{
  "defaultMultiplier": 1.0,
  "taskOverrides": {
    "build": 2.0,
    "test": 1.5
  },
  "autoSkipThreshold": 3,
  "enableSmartSkip": true
}
```

### Environment Factors

Adjust timeout based on:
- System resources available
- Network conditions
- Repository size
- Historical performance

## Related Skills

- `error-recovery` - Recover from timeout errors
- `incremental-changer` - Break large tasks into smaller ones
- `self-memory-manager` - Remember timeout preferences

---
name: "context-compressor"
description: "Compresses long context while preserving critical information. Invoke when context is too long, needing to summarize conversations, or extracting key points."
---

# Context Compressor Skill

A skill for compressing long context while preserving essential information.

## When to Use

- Context approaching token limits
- Long conversation history
- Need to summarize progress
- Extracting key decisions
- Creating memory snapshots

## Compression Strategies

### Information Priority

| Priority | Type | Retention |
|----------|------|-----------|
| Critical | Errors, decisions, constraints | 100% |
| High | Current task, recent changes | 90% |
| Medium | Context, dependencies | 50% |
| Low | Examples, exploration | 10% |

### Compression Methods

```markdown
1. **Summarization**: Condense paragraphs to sentences
2. **Extraction**: Pull out key facts and decisions
3. **Abstraction**: Replace details with patterns
4. **Filtering**: Remove redundant information
5. **Structuring**: Organize into compact format
```

## Workflow

### 1. Analyze Context

```markdown
Identify:
1. Total length
2. Information types
3. Key elements
4. Redundancy
5. Structure
```

### 2. Extract Key Information

```markdown
Extract:
1. Current task state
2. Decisions made
3. Constraints identified
4. Errors encountered
5. Pending actions
```

### 3. Apply Compression

```markdown
Compress:
1. Summarize each section
2. Remove duplicates
3. Abstract patterns
4. Structure output
```

### 4. Validate Output

```markdown
Verify:
1. Critical info preserved
2. Context still coherent
3. Can resume work
4. No information loss
```

## Compression Templates

### Conversation Summary

```markdown
## Session Summary

### Task
[One-line task description]

### Progress
- Completed: [list of completed items]
- Current: [current step]
- Pending: [remaining steps]

### Key Decisions
1. [Decision 1]: [Rationale]
2. [Decision 2]: [Rationale]

### Constraints
- [Constraint 1]
- [Constraint 2]

### Errors Resolved
- [Error]: [Solution]

### Files Modified
- [file]: [change summary]

### Next Steps
1. [Next action]
2. [Following action]
```

### Code Context Compression

```markdown
## Code Context

### Project
- Type: [web/api/cli]
- Stack: [technologies]
- Structure: [key directories]

### Current Focus
- File: [current file]
- Function: [current function]
- Task: [what's being done]

### Dependencies
- [dep1]: [purpose]
- [dep2]: [purpose]

### Patterns Used
- [pattern]: [where]

### Pending Changes
- [change description]
```

### Error Context Compression

```markdown
## Error Context

### Error
- Type: [error type]
- Message: [error message]
- Location: [file:line]

### Investigation
- Root cause: [cause]
- Contributing factors: [factors]

### Solution
- Fix: [what was done]
- Prevention: [how to prevent]

### Related Code
- [function]: [role in error]
```

## Compression Algorithms

### Sliding Window Summary

```typescript
interface ContextWindow {
  recent: string[];      // Last N messages - full
  summary: string;       // Older messages - summarized
  keyFacts: string[];    // Extracted facts
}

function compressWithWindow(
  messages: Message[],
  windowSize: number
): ContextWindow {
  const recent = messages.slice(-windowSize);
  const older = messages.slice(0, -windowSize);

  return {
    recent: recent.map(m => m.content),
    summary: summarizeMessages(older),
    keyFacts: extractKeyFacts(messages)
  };
}
```

### Hierarchical Compression

```typescript
interface CompressedLevel {
  level: number;
  content: string;
  children?: CompressedLevel[];
}

function hierarchicalCompress(
  content: string,
  maxLevels: number
): CompressedLevel {
  const sections = splitIntoSections(content);

  return {
    level: 0,
    content: generateOverview(sections),
    children: sections.map(section => ({
      level: 1,
      content: summarizeSection(section)
    }))
  };
}
```

### Key Information Extraction

```typescript
interface KeyInfo {
  decisions: Decision[];
  constraints: Constraint[];
  errors: Error[];
  pendingActions: Action[];
  modifiedFiles: FileChange[];
}

function extractKeyInfo(context: string): KeyInfo {
  return {
    decisions: extractDecisions(context),
    constraints: extractConstraints(context),
    errors: extractErrors(context),
    pendingActions: extractPendingActions(context),
    modifiedFiles: extractFileChanges(context)
  };
}

function extractDecisions(text: string): Decision[] {
  const patterns = [
    /decided to (.+)/gi,
    /chose (.+) because/gi,
    /will use (.+) for/gi
  ];

  return patterns
    .flatMap(p => [...text.matchAll(p)])
    .map(match => ({
      decision: match[1],
      context: getSurroundingContext(text, match.index!)
    }));
}
```

## Compression Examples

### Before Compression (2000 tokens)

```markdown
User: I want to add authentication to my app. It's a React app with Node backend.

Assistant: I'll help you add authentication. Let me ask some questions:
1. What auth method do you prefer? (JWT, Session, OAuth)
2. Do you need social login?

User: I want JWT with email/password. No social login for now.

Assistant: Great choice. Here's the plan:
1. Setup JWT library
2. Create auth middleware
3. Build login/register endpoints
4. Add frontend forms

[... many messages about implementation details ...]

User: I'm getting an error: "jwt malformed"

Assistant: This error occurs when the token format is invalid. Let me check your code...
[... debugging session ...]

User: Fixed! Now I need to add password reset.

Assistant: For password reset, we need:
1. Reset token generation
2. Email service integration
3. Reset endpoint
[... more implementation ...]
```

### After Compression (300 tokens)

```markdown
## Session Summary

### Task
Add JWT authentication to React/Node app

### Completed
- JWT setup with email/password
- Auth middleware
- Login/register endpoints
- Frontend forms
- Fixed "jwt malformed" error (was sending undefined token)

### Current
- Adding password reset feature

### Key Decisions
- JWT over Session: Simpler for SPA
- No social login: MVP scope

### Constraints
- React frontend, Node backend
- Email/password only

### Next Steps
1. Implement reset token generation
2. Integrate email service
3. Create reset endpoint
```

## Compression Quality Metrics

```markdown
## Metrics to Track

1. **Compression Ratio**
   - Original tokens / Compressed tokens
   - Target: 5:1 or better

2. **Information Retention**
   - Critical info preserved: 100%
   - High priority info: 90%+
   - Overall: 80%+

3. **Recovery Score**
   - Can resume work: Yes/No
   - Context gaps: None/Minor/Major

4. **Coherence**
   - Logical flow: 1-5
   - Readability: 1-5
```

## Related Skills

- `self-memory-manager` - Store compressed context
- `instruction-refinement` - Refine before compressing
- `workflow-vague-request-to-action` - Handle unclear context

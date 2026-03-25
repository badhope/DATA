---
name: "instruction-refinement"
description: "Polishes and enhances user instructions by adding missing context, constraints, and expected output formats. Invoke when user input is vague, incomplete, or needs clarification before execution."
---

# Instruction Refinement Skill

A skill for polishing and enhancing user instructions into complete, precise, and rich directives.

## When to Use

- User input is vague or ambiguous
- Missing critical context or constraints
- No clear expected output format specified
- Before executing complex tasks that need clarification
- When user says something like "帮我做个xxx" without details

## Refinement Workflow

### 1. Analyze Original Instruction

Extract from user input:
- Core intent (what user really wants)
- Explicit requirements (clearly stated)
- Implicit requirements (inferred from context)
- Missing elements (what's absent but needed)

### 2. Identify Missing Elements

Check for missing:
- **Context**: Project type, technology stack, environment
- **Constraints**: Time limits, resource limits, compatibility requirements
- **Output Format**: File type, structure, naming conventions
- **Quality Standards**: Code style, testing requirements, documentation
- **Scope**: What to include/exclude, boundaries
- **Priority**: What's must-have vs nice-to-have

### 3. Generate Refined Instruction

Structure the refined instruction:

```markdown
## Core Task
[Clear statement of what needs to be done]

## Context & Environment
- Project type: [web/api/cli/library/etc]
- Technology stack: [languages, frameworks]
- Environment: [development/staging/production]

## Constraints
- Must: [non-negotiable requirements]
- Should: [important but flexible]
- Could: [nice to have if possible]

## Input
- Provided: [what user gave]
- Assumed: [reasonable assumptions made]

## Expected Output
- Format: [file type, structure]
- Location: [where to put results]
- Naming: [file/function naming conventions]

## Quality Requirements
- [ ] Code style compliance
- [ ] Error handling
- [ ] Documentation
- [ ] Testing

## Success Criteria
[How to verify the task is complete]
```

### 4. Confirm with User

Before execution:
1. Present refined instruction
2. Ask user to confirm or adjust
3. Iterate until user approves

## Refinement Examples

### Example 1: Vague Request

**Original**: "帮我写个登录功能"

**Refined**:
```markdown
## Core Task
Implement user login functionality

## Context & Environment
- Project type: Web application (assumed)
- Technology stack: [Need confirmation]
- Environment: Development

## Constraints
- Must: Secure authentication, password hashing
- Should: Session management, remember me option
- Could: OAuth integration, 2FA

## Expected Output
- Format: Backend API + Frontend form
- Location: As per project structure
- Quality: Input validation, error handling

## Questions for User
1. What's the technology stack? (React/Vue? Node/Python?)
2. What authentication method? (JWT/Session/OAuth?)
3. Any specific security requirements?
```

### Example 2: Incomplete Request

**Original**: "优化这段代码"

**Refined**:
```markdown
## Core Task
Optimize provided code snippet

## Optimization Dimensions
- Performance: Speed, memory usage
- Readability: Code clarity, maintainability
- Security: Vulnerability fixes
- Best Practices: Language idioms

## Constraints
- Must: Preserve existing functionality
- Should: Add comments explaining changes
- Could: Refactor for better structure

## Expected Output
- Optimized code with:
  - Before/after comparison
  - Explanation of changes
  - Performance metrics (if applicable)
```

## Dynamic Refinement Rules

### Task Type Detection

| Task Type | Key Questions to Ask |
|-----------|---------------------|
| Code Generation | Language? Framework? Patterns? |
| Bug Fix | Error message? Reproduction steps? |
| Refactoring | Goals? Constraints? Scope? |
| Documentation | Audience? Format? Detail level? |
| Testing | Coverage? Framework? Types? |
| Deployment | Environment? CI/CD? Rollback? |

### Complexity Assessment

- **Simple**: Direct execution, minimal refinement
- **Medium**: Ask 1-2 clarifying questions
- **Complex**: Full refinement workflow with confirmation

## Output Requirements

Always provide:
1. **Refined Instruction**: Complete, structured directive
2. **Assumptions Made**: What was inferred
3. **Questions**: What still needs clarification
4. **Confidence Level**: How certain the refinement is

## Related Skills

- `workflow-vague-request-to-action` - Converting vague requests to actions
- `planning` - Task planning after refinement
- `self-memory-manager` - Remember user preferences for future refinement

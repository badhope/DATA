---
name: "code-search-navigator"
description: "Expertly navigates and searches codebases to locate code, symbols, and references with precision. Invoke when needing to find specific code locations, understand code structure, or trace dependencies."
---

# Code Search Navigator Skill

A skill for precise code navigation and search across codebases.

## When to Use

- Finding specific functions, classes, or variables
- Tracing code dependencies
- Understanding code structure
- Locating implementation details
- Finding usage examples

## Search Capabilities

### Search Types

| Type | Description | Use Case |
|------|-------------|----------|
| Symbol | Find function/class/variable definitions | "Where is UserService defined?" |
| Reference | Find usages of a symbol | "Where is getUser called?" |
| Text | Literal text search | "Find all TODO comments" |
| Pattern | Regex pattern search | "Find all email patterns" |
| File | Find files by name | "Find all test files" |
| Structure | Find code structure | "Find all async functions" |

### Search Scopes

```markdown
## Scope Levels
1. File - Single file
2. Module - Related files
3. Package - npm/pip package
4. Project - Entire codebase
5. Workspace - Multiple projects
```

## Workflow

### 1. Understand Search Intent

```markdown
Parse user query:
1. What are they looking for?
2. What type of search needed?
3. What scope is appropriate?
4. Any constraints or filters?
```

### 2. Choose Search Strategy

```markdown
Based on intent:
- Definition search → Symbol lookup
- Usage search → Reference search
- Pattern search → Regex search
- File search → Glob patterns
```

### 3. Execute Search

```markdown
Use appropriate tools:
1. SearchCodebase - Semantic search
2. Grep - Pattern matching
3. Glob - File patterns
4. LS - Directory listing
```

### 4. Present Results

```markdown
Format results clearly:
1. File paths with line numbers
2. Context snippets
3. Relevance ranking
4. Quick navigation links
```

## Search Patterns

### Find Definitions

```markdown
## Function Definition
Pattern: "function {name}" or "def {name}" or "fn {name}"
Example: Find where "authenticate" is defined

## Class Definition
Pattern: "class {Name}" or "type {Name}" or "struct {Name}"
Example: Find UserService class definition

## Variable Definition
Pattern: "const {name}" or "let {name}" or "{name} ="
Example: Find API_BASE_URL definition
```

### Find References

```markdown
## Function Calls
Pattern: "{name}(" or "{name}("
Example: Find all calls to "getUser"

## Class Usage
Pattern: "new {Name}" or "{Name}." or "extends {Name}"
Example: Find all UserService instantiations

## Import/Require
Pattern: "import.*{name}" or "require.*{name}"
Example: Find all files importing "auth"
```

### Find Patterns

```markdown
## Async Code
Pattern: "async\s+(function|\()" or "await\s+"

## Error Handling
Pattern: "try\s*{" or "catch\s*\(" or "\.catch\("

## API Endpoints
Pattern: "(get|post|put|delete|patch)\s*\(['\"]"

## Database Queries
Pattern: "(SELECT|INSERT|UPDATE|DELETE|find|findOne|aggregate)"
```

## Navigation Helpers

### Go to Definition

```markdown
When user asks "go to definition":
1. Identify symbol under cursor
2. Search for definition
3. Present file:line location
4. Offer to open file
```

### Find All References

```markdown
When user asks "find all references":
1. Get symbol name
2. Search across project
3. Group by file
4. Show context for each
```

### Call Hierarchy

```markdown
When user asks "who calls this":
1. Find function definition
2. Search for all calls
3. Build call tree
4. Show hierarchy
```

## Search Result Format

### Single Result

```markdown
## Found: authenticate
File: src/auth/service.ts:45-67

```typescript
export async function authenticate(
  credentials: Credentials
): Promise<AuthResult> {
  // Implementation
}
```

Context: Core authentication function
```

### Multiple Results

```markdown
## Found 5 results for "getUser"

### 1. Definition
[src/services/user.ts:12-25](file:///path/to/file#L12-L25)
```typescript
export function getUser(id: string): User {
```

### 2. Usage in API
[src/api/routes.ts:45](file:///path/to/file#L45)
```typescript
const user = getUser(req.params.id);
```

### 3. Usage in Tests
[tests/user.test.ts:23](file:///path/to/file#L23)
```typescript
const mockUser = getUser('test-id');
```
```

## Advanced Search

### Semantic Search

```markdown
Use SearchCodebase for:
- Concept-based search
- "Find authentication logic"
- "Find database connection code"
- "Find error handling patterns"
```

### Cross-File Search

```markdown
Track across files:
1. Start from entry point
2. Follow imports
3. Build dependency graph
4. Show connections
```

### Filtered Search

```markdown
Apply filters:
- By file type: *.ts, *.py
- By directory: src/, tests/
- By time: recently modified
- By author: git blame
```

## Search Optimization

### Indexing Strategy

```markdown
For large codebases:
1. Build symbol index
2. Cache file structure
3. Track recent searches
4. Preload common patterns
```

### Result Ranking

```markdown
Rank by:
1. Exact match
2. Definition vs reference
3. File relevance
4. Recency
5. Usage frequency
```

## Related Skills

- `repo-analysis` - Understand repository structure
- `dependency-analyzer` - Trace dependencies
- `multi-language-file-handler` - Handle different languages

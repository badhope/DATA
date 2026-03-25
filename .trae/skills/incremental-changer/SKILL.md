---
name: "incremental-changer"
description: "Makes minimal, targeted changes to code while preserving existing behavior. Invoke when making small modifications, fixing bugs, or updating specific features."
---

# Incremental Changer Skill

A skill for making minimal, targeted changes to codebases.

## When to Use

- Fixing specific bugs
- Making small feature updates
- Modifying existing code
- Updating configurations
- Refactoring small sections

## Change Principles

### Minimal Impact

```markdown
1. Change only what's necessary
2. Preserve existing behavior
3. Maintain code style
4. Keep tests passing
5. Document changes
```

### Safety First

```markdown
1. Understand before changing
2. Make atomic changes
3. Test after each change
4. Have rollback plan
5. Review impact scope
```

## Workflow

### 1. Understand Context

```markdown
Before changing:
1. Read the target code
2. Understand dependencies
3. Identify affected areas
4. Check existing tests
5. Note current behavior
```

### 2. Plan Change

```markdown
Plan the change:
1. Define exact modification
2. Identify files to change
3. Estimate impact scope
4. Plan test updates
5. Prepare rollback
```

### 3. Execute Change

```markdown
Make the change:
1. Modify code precisely
2. Update related tests
3. Verify behavior
4. Check for side effects
5. Document changes
```

### 4. Validate

```markdown
After change:
1. Run tests
2. Check type errors
3. Verify functionality
4. Review code style
5. Confirm no regressions
```

## Change Types

### Bug Fix

```markdown
## Bug Fix Process

1. **Reproduce**: Confirm the bug exists
2. **Isolate**: Find the exact location
3. **Understand**: Know why it happens
4. **Fix**: Make minimal correction
5. **Verify**: Confirm bug is fixed

## Example

Bug: Function returns undefined for empty array

Before:
function getFirst(items) {
  return items[0].name;
}

After:
function getFirst(items) {
  if (items.length === 0) return null;
  return items[0].name;
}
```

### Feature Update

```markdown
## Feature Update Process

1. **Identify**: What needs to change
2. **Scope**: Minimize affected code
3. **Implement**: Add/update functionality
4. **Test**: Add/update tests
5. **Document**: Update docs

## Example

Update: Add optional timeout parameter

Before:
async function fetchData(url) {
  return fetch(url);
}

After:
async function fetchData(url, options = {}) {
  const { timeout = 30000 } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}
```

### Configuration Update

```markdown
## Config Update Process

1. **Backup**: Save current config
2. **Validate**: Check new values
3. **Update**: Apply changes
4. **Test**: Verify behavior
5. **Document**: Note changes

## Example

Update: Add new environment variable

Before:
{
  "DATABASE_URL": "postgres://localhost/db"
}

After:
{
  "DATABASE_URL": "postgres://localhost/db",
  "REDIS_URL": "redis://localhost:6379"
}
```

## Change Patterns

### Add Parameter

```typescript
// Before
function process(data: Data): Result {
  return transform(data);
}

// After - minimal change
function process(data: Data, options?: ProcessOptions): Result {
  const { validate = true } = options ?? {};
  if (validate) validateData(data);
  return transform(data);
}
```

### Add Functionality

```typescript
// Before
class UserService {
  async getUser(id: string) {
    return this.db.users.find(id);
  }
}

// After - minimal addition
class UserService {
  async getUser(id: string) {
    return this.db.users.find(id);
  }

  async getUserByEmail(email: string) {
    return this.db.users.findByEmail(email);
  }
}
```

### Fix Logic

```typescript
// Before - bug: off by one
function paginate(items: any[], page: number, size: number) {
  const start = page * size;
  const end = start + size;
  return items.slice(start, end);
}

// After - fix: correct calculation
function paginate(items: any[], page: number, size: number) {
  const start = (page - 1) * size;  // Fixed: page is 1-indexed
  const end = start + size;
  return items.slice(start, end);
}
```

### Update Type

```typescript
// Before
interface User {
  id: string;
  name: string;
}

// After - add optional field
interface User {
  id: string;
  name: string;
  email?: string;  // Added optional email
}
```

## Impact Analysis

### Dependency Check

```markdown
Before changing:
1. Find all usages of target
2. Check type compatibility
3. Identify breaking changes
4. Plan migration if needed
```

### Test Coverage

```markdown
Verify tests:
1. Existing tests still pass
2. Add tests for new behavior
3. Update tests for changed behavior
4. Add regression tests
```

## Change Report Format

```markdown
## Change Report

### Summary
- Type: Bug fix
- Scope: Single function
- Files changed: 1
- Lines changed: +3, -1

### Changes Made

#### src/utils/pagination.ts
```diff
 function paginate(items: any[], page: number, size: number) {
-  const start = page * size;
+  const start = (page - 1) * size;
   const end = start + size;
+  if (start >= items.length) return [];
   return items.slice(start, end);
 }
```

### Reason
Page parameter is 1-indexed (user-facing), but calculation was treating it as 0-indexed.

### Impact
- Breaking: No (internal utility)
- Tests: Updated 2 tests
- Dependencies: None

### Verification
- [x] Unit tests pass
- [x] Manual testing done
- [x] No type errors
- [x] Code style compliant
```

## Change Checklist

```markdown
Before:
- [ ] Read and understand target code
- [ ] Identify all affected files
- [ ] Check existing tests
- [ ] Plan minimal change

During:
- [ ] Make atomic changes
- [ ] Update tests immediately
- [ ] Run tests after each change
- [ ] Document inline if complex

After:
- [ ] All tests pass
- [ ] No type errors
- [ ] No lint errors
- [ ] Code reviewed
- [ ] Documentation updated
```

## Related Skills

- `cross-file-refactor` - Larger refactoring
- `coding-bug-fixing` - Bug-specific fixes
- `test-generator` - Generate tests for changes

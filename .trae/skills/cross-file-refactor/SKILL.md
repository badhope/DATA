---
name: "cross-file-refactor"
description: "Safely refactors code across multiple files while maintaining consistency and behavior. Invoke when renaming, moving code, or making structural changes."
---

# Cross-File Refactor Skill

A skill for safely refactoring code across multiple files.

## When to Use

- Renaming functions/classes/variables
- Moving code between files
- Extracting modules
- Updating import paths
- Changing type definitions

## Refactor Types

### Renaming

| Scope | Files Affected | Risk |
|-------|---------------|------|
| Local variable | 1 | Low |
| Function | Multiple | Medium |
| Class | Multiple | Medium |
| Module | Many | High |
| Type/Interface | Many | High |

### Moving

| Action | Complexity | Risk |
|--------|------------|------|
| Move function | Medium | Medium |
| Move class | High | High |
| Move file | High | High |
| Move directory | Very High | High |

### Restructuring

| Action | Impact | Risk |
|--------|--------|------|
| Extract module | High | Medium |
| Merge modules | High | High |
| Split module | Medium | Medium |
| Change architecture | Very High | High |

## Workflow

### 1. Analyze Scope

```markdown
Identify:
1. All files using target
2. All files defining target
3. Import/export relationships
4. Type dependencies
5. Test coverage
```

### 2. Plan Refactor

```markdown
Create plan:
1. Order of changes
2. Temporary steps needed
3. Rollback points
4. Test checkpoints
5. Verification steps
```

### 3. Execute Refactor

```markdown
Make changes:
1. Update definitions
2. Update imports
3. Update usages
4. Update tests
5. Update documentation
```

### 4. Verify

```markdown
Validate:
1. All imports resolve
2. Types are correct
3. Tests pass
4. No runtime errors
5. Behavior unchanged
```

## Refactor Patterns

### Rename Symbol

```markdown
## Rename Function

Before:
// utils.ts
export function getData() { ... }

// api.ts
import { getData } from './utils';
const data = getData();

After:
// utils.ts
export function fetchData() { ... }

// api.ts
import { fetchData } from './utils';
const data = fetchData();

## Steps
1. Find all references
2. Update definition
3. Update all imports
4. Update all usages
5. Run tests
```

### Move Code

```markdown
## Move Function to New Module

Before:
// user.ts
export class User { ... }
export function validateUser() { ... }

After:
// user.ts
export class User { ... }

// user/validation.ts
export function validateUser() { ... }

// user/index.ts
export { User } from './user';
export { validateUser } from './validation';

## Steps
1. Create new file
2. Move function
3. Update exports
4. Update imports in all files
5. Remove from original
6. Run tests
```

### Extract Module

```markdown
## Extract Utilities

Before:
// services/user.ts
export class UserService {
  private validateEmail(email: string) { ... }
  private hashPassword(password: string) { ... }
  async createUser(...) { ... }
}

After:
// utils/validation.ts
export function validateEmail(email: string) { ... }

// utils/crypto.ts
export function hashPassword(password: string) { ... }

// services/user.ts
import { validateEmail } from '../utils/validation';
import { hashPassword } from '../utils/crypto';

export class UserService {
  async createUser(...) { ... }
}

## Steps
1. Identify extractable code
2. Create new modules
3. Move functions
4. Update imports
5. Update class
6. Run tests
```

### Update Import Paths

```markdown
## Change Directory Structure

Before:
src/
  components/
    Button.tsx
    Input.tsx
  index.ts

After:
src/
  components/
    ui/
      Button.tsx
      Input.tsx
    index.ts

## Import Changes
// Before
import { Button } from './components/Button';

// After
import { Button } from './components/ui/Button';

## Steps
1. Create new directory
2. Move files
3. Update all imports
4. Update exports
5. Run tests
```

## Safety Checks

### Pre-Refactor

```markdown
Check:
- [ ] All tests passing
- [ ] No type errors
- [ ] Git status clean
- [ ] Backup/branch created
- [ ] Scope documented
```

### During Refactor

```markdown
Monitor:
- [ ] Imports resolving
- [ ] No circular dependencies
- [ ] Types matching
- [ ] Tests passing at checkpoints
```

### Post-Refactor

```markdown
Verify:
- [ ] All tests pass
- [ ] No type errors
- [ ] No lint errors
- [ ] Build succeeds
- [ ] Manual testing done
```

## Refactor Tools

### Find All References

```bash
# Using grep
grep -r "functionName" --include="*.ts" .

# Using ripgrep
rg "functionName" -t ts

# Using TypeScript
tsc --findAllReferences
```

### Check Imports

```bash
# TypeScript
tsc --noEmit

# ESLint
eslint . --rule import/no-unresolved

# Import checker
npx import-sort --check
```

### Verify Types

```bash
# TypeScript strict
tsc --strict

# Type coverage
npx type-coverage
```

## Refactor Report

```markdown
## Refactor Report

### Summary
- Type: Rename
- Scope: Cross-file
- Files changed: 12
- Risk: Medium

### Changes

#### Renamed: `getData` → `fetchData`

Files affected:
1. src/utils/data.ts (definition)
2. src/api/users.ts (usage)
3. src/api/posts.ts (usage)
4. src/services/cache.ts (usage)
5. tests/api.test.ts (test)

#### Import Updates
```diff
// src/api/users.ts
- import { getData } from '../utils/data';
+ import { fetchData } from '../utils/data';

- const result = getData(url);
+ const result = fetchData(url);
```

### Verification
- [x] All 45 tests pass
- [x] No type errors
- [x] No lint errors
- [x] Build successful

### Rollback
git revert <commit-hash>
```

## Common Pitfalls

### Circular Dependencies

```markdown
Problem: A imports B, B imports A

Solution:
1. Extract shared code to C
2. Both A and B import C
3. Remove circular reference
```

### Missing Exports

```markdown
Problem: Moved code but forgot to export

Solution:
1. Check all imports after move
2. Add exports to new location
3. Update barrel exports
```

### Type Mismatches

```markdown
Problem: Types don't match after refactor

Solution:
1. Update type definitions
2. Check generic constraints
3. Verify type exports
```

## Related Skills

- `incremental-changer` - Small changes
- `code-search-navigator` - Find references
- `test-generator` - Update tests

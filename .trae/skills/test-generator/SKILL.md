---
name: "test-generator"
description: "Generates comprehensive test cases and test suites for existing code. Invoke when needing to create unit tests, integration tests, or improve test coverage."
---

# Test Generator Skill

A skill for generating comprehensive test cases for code.

## When to Use

- Creating tests for existing code
- Improving test coverage
- Writing tests for new features
- Generating test data
- Creating regression tests

## Supported Test Frameworks

### JavaScript/TypeScript

| Framework | Use Case | File Pattern |
|-----------|----------|--------------|
| Jest | Unit, Integration | *.test.ts, *.spec.ts |
| Vitest | Unit, Vite projects | *.test.ts, *.spec.ts |
| Mocha | Unit, Flexible | *.test.js |
| Cypress | E2E | *.cy.ts |
| Playwright | E2E | *.spec.ts |

### Python

| Framework | Use Case | File Pattern |
|-----------|----------|--------------|
| pytest | Unit, Integration | test_*.py, *_test.py |
| unittest | Unit, Standard | test_*.py |
| nose2 | Unit, Discovery | test_*.py |

### Other Languages

| Language | Framework | File Pattern |
|----------|-----------|--------------|
| Java | JUnit 5 | *Test.java |
| Go | testing | *_test.go |
| Rust | built-in | tests/*.rs |
| C# | xUnit, NUnit | *Tests.cs |

## Workflow

### 1. Analyze Code

```markdown
Extract from source:
1. Function signatures
2. Input/output types
3. Dependencies
4. Edge cases
5. Error conditions
```

### 2. Generate Test Cases

```markdown
For each function:
1. Happy path tests
2. Edge case tests
3. Error handling tests
4. Boundary tests
5. Integration tests
```

### 3. Create Test File

```markdown
Structure:
1. Imports and setup
2. Test suite describe block
3. Individual test cases
4. Cleanup/teardown
```

### 4. Add Assertions

```markdown
Types:
1. Equality assertions
2. Type assertions
3. Exception assertions
4. Async assertions
5. Snapshot assertions
```

## Test Case Generation

### Happy Path Tests

```markdown
## Pattern
Given: Valid input
When: Function is called
Then: Expected output is returned

## Example (TypeScript/Jest)
describe('getUser', () => {
  it('should return user for valid id', async () => {
    const user = await getUser('user-123');
    expect(user).toBeDefined();
    expect(user.id).toBe('user-123');
    expect(user.name).toBeDefined();
  });
});
```

### Edge Case Tests

```markdown
## Edge Cases to Consider
- Empty input
- Null/undefined input
- Maximum values
- Minimum values
- Boundary values
- Special characters
- Unicode characters

## Example
describe('validateEmail', () => {
  it('should return false for empty string', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('should handle unicode in email', () => {
    expect(validateEmail('用户@例え.com')).toBe(true);
  });

  it('should reject email without domain', () => {
    expect(validateEmail('user@')).toBe(false);
  });
});
```

### Error Handling Tests

```markdown
## Error Scenarios
- Invalid input type
- Missing required fields
- Permission denied
- Resource not found
- Network errors
- Timeout errors

## Example
describe('fetchUser', () => {
  it('should throw NotFoundError for non-existent user', async () => {
    await expect(fetchUser('non-existent'))
      .rejects
      .toThrow(NotFoundError);
  });

  it('should throw ValidationError for invalid id', async () => {
    await expect(fetchUser(''))
      .rejects
      .toThrow(ValidationError);
  });
});
```

### Boundary Tests

```markdown
## Boundary Types
- Numeric limits
- String length limits
- Array size limits
- Date ranges
- Rate limits

## Example
describe('calculateDiscount', () => {
  it('should handle minimum purchase amount', () => {
    expect(calculateDiscount(100, 10)).toBe(10);
  });

  it('should cap discount at maximum', () => {
    expect(calculateDiscount(10000, 50)).toBe(500); // max 500
  });

  it('should return 0 for zero purchase', () => {
    expect(calculateDiscount(0, 10)).toBe(0);
  });
});
```

## Test Structure Templates

### Jest/TypeScript

```typescript
import { functionToTest } from '../module';

describe('functionToTest', () => {
  describe('happy path', () => {
    it('should return expected result for valid input', () => {
      const result = functionToTest('input');
      expect(result).toBe('expected');
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      expect(functionToTest('')).toBe('');
    });
  });

  describe('error handling', () => {
    it('should throw for invalid input', () => {
      expect(() => functionToTest(null)).toThrow();
    });
  });
});
```

### pytest/Python

```python
import pytest
from module import function_to_test

class TestFunctionToTest:
    def test_happy_path(self):
        result = function_to_test('input')
        assert result == 'expected'

    def test_empty_input(self):
        assert function_to_test('') == ''

    def test_invalid_input_raises(self):
        with pytest.raises(ValueError):
            function_to_test(None)
```

### Go

```go
package module_test

import (
    "testing"
    "github.com/stretchr/testify/assert"
)

func TestFunctionToTest(t *testing.T) {
    t.Run("happy path", func(t *testing.T) {
        result := FunctionToTest("input")
        assert.Equal(t, "expected", result)
    })

    t.Run("empty input", func(t *testing.T) {
        result := FunctionToTest("")
        assert.Equal(t, "", result)
    })
}
```

## Test Data Generation

### Fixtures

```markdown
## User Fixture
export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date('2024-01-01'),
};

## Multiple Users
export const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i}`,
  email: `user${i}@example.com`,
  name: `User ${i}`,
}));
```

### Mocks and Stubs

```markdown
## Service Mock
export const mockUserService = {
  getById: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  delete: jest.fn().mockResolvedValue(true),
};

## API Mock
export const mockApiResponse = (data: any) => ({
  ok: true,
  json: () => Promise.resolve(data),
});
```

## Coverage Analysis

### Coverage Types

| Type | Description | Target |
|------|-------------|--------|
| Line | Lines executed | 80%+ |
| Branch | Branches taken | 70%+ |
| Function | Functions called | 90%+ |
| Statement | Statements run | 80%+ |

### Coverage Report

```markdown
## Generate Coverage
npm test -- --coverage

## Report Format
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
All files      |   85.2  |   72.4   |   90.1  |   84.8
 auth.ts       |   92.3  |   88.9   |   100   |   91.7
 user.ts       |   78.1  |   55.6   |   83.3  |   77.9
 utils.ts      |   85.2  |   72.7   |   87.0  |   84.5
```

## Related Skills

- `coding` - Code implementation
- `debugging` - Debug failing tests
- `security-auditor` - Security test cases

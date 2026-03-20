---
id: prompt-task-testing-generate-test-cases-for-code-v1
name: Generate Test Cases for Code
summary: 为代码生成测试用例，包括正常路径、边界条件、异常处理
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: testing
tags:
  - testing
  - test-cases
  - boundary
  - edge-case
keywords:
  - 测试用例
  - 边界条件
  - 异常测试
  - 测试覆盖
intent: |
  指导 AI 为代码生成系统化的测试用例。
  强调测试用例必须覆盖正常路径、边界条件和异常情况。
  核心原则：好的测试用例能有效验证代码正确性。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - code_content: string 代码内容
  - test_framework: string 测试框架
output_requirements:
  - test_suite_design: object 测试套件设计
  - test_cases: array 测试用例
  - coverage_analysis: object 覆盖率分析
  - implementation_guide: object 实现指南
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析代码)
preconditions:
  - 有代码需要生成测试用例
anti_patterns:
  - 只测试 happy path
  - 忽略边界条件
  - 测试用例之间有依赖
failure_modes:
  - 覆盖不完整：系统化分析代码
  - 测试脆弱：避免硬编码值
  - 测试不可重复：确保测试独立性
self_check: |
  生成前自检：
  □ 是否理解了代码的功能？
  □ 是否覆盖了正常路径？
  □ 是否考虑了边界条件？
  □ 是否覆盖了异常情况？
related_skills:
  - skill-coding
  - skill-debugging
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-testing-write-tests-for-existing-code
  - prompt-task-testing-design-edge-case-tests
---

# Context

测试是保证代码质量的关键活动。高质量的测试用例能有效验证代码正确性、防止回归、文档化预期行为。本 prompt 的核心目标是：**指导 AI 为代码生成系统化、全面的测试用例**。

# Prompt Body

## 阶段 1：代码分析

### 1.1 功能理解

```markdown
## 代码功能分析

### 基本信息
| 项目 | 内容 |
|------|------|
| 文件路径 | [路径] |
| 代码行数 | [数量] |
| 函数/方法数 | [数量] |
| 类数 | [数量] |

### 核心功能
```markdown
**功能 1**: [描述]
**输入**: [输入]
**输出**: [输出]
**副作用**: [副作用]

**功能 2**: [描述]
**输入**: [输入]
**输出**: [输出]
**副作用**: [副作用]
```
```

### 1.2 数据流分析

```markdown
## 数据流分析

### 输入分析
| # | 输入 | 类型 | 来源 | 验证 |
|---|------|------|------|------|
| 1 | [输入] | [类型] | [来源] | [验证] |

### 输出分析
| # | 输出 | 类型 | 目的地 | 预期 |
|---|------|------|--------|------|
| 1 | [输出] | [类型] | [目的地] | [预期] |

### 状态变化
| # | 状态 | 变化点 | 影响 |
|---|------|--------|------|
| 1 | [状态] | [变化点] | [影响] |
```

## 阶段 2：测试策略设计

### 2.1 测试类型规划

```markdown
## 测试类型规划

### 单元测试
| # | 测试目标 | 覆盖率目标 | 重点 |
|---|----------|------------|------|
| 1 | [目标] | [目标] | [重点] |

### 集成测试
| # | 测试目标 | 覆盖率目标 | 重点 |
|---|----------|------------|------|
| 1 | [目标] | [目标] | [重点] |

### 边界测试
| # | 测试目标 | 覆盖率目标 | 重点 |
|---|----------|------------|------|
| 1 | [目标] | [目标] | [重点] |
```

### 2.2 测试用例设计原则

```markdown
## 测试用例设计原则

### AAA 模式
| 阶段 | 说明 | 内容 |
|------|------|------|
| Arrange | 准备 | 设置输入、依赖 |
| Act | 执行 | 调用被测函数 |
| Assert | 验证 | 验证输出、状态 |

### 测试命名
| 模式 | 示例 |
|------|------|
| [功能]_[场景]_[预期] | should_return_user_when_valid_id_provided |
```

## 阶段 3：测试用例生成

### 3.1 正常路径测试

```markdown
## 正常路径测试用例

### 测试用例 1: [功能]_[场景]
```[框架]
describe('[功能]', () => {
  it('should [预期行为] when [条件]', () => {
    // Arrange
    const input = [输入值];
    const expected = [预期值];

    // Act
    const result = [调用];

    // Assert
    expect(result).to[匹配方式](expected);
  });
});
```

**覆盖分支**: [覆盖的分支]
**测试数据**:
| 数据 | 值 | 说明 |
|------|-----|------|
| input | [值] | [说明] |
```

### 3.2 边界条件测试

```markdown
## 边界条件测试用例

### 数值边界
```[框架]
it('should handle [边界] correctly', () => {
  // Arrange
  const input = [边界值];

  // Act
  const result = [调用];

  // Assert
  expect(result).to[预期];
});
```

### 字符串边界
```[框架]
it('should handle [边界] string', () => {
  // Arrange
  const input = [边界字符串];

  // Act
  const result = [调用];

  // Assert
  expect(result).to[预期];
});
```

### 集合边界
```[框架]
it('should handle [边界] collection', () => {
  // Arrange
  const input = [边界集合];

  // Act
  const result = [调用];

  // Assert
  expect(result).to[预期];
});
```
```

### 3.3 异常处理测试

```markdown
## 异常处理测试用例

### 参数验证异常
```[框架]
it('should throw [异常类型] when [条件]', () => {
  // Arrange
  const input = [无效输入];

  // Act & Assert
  expect(() => [调用]).toThrow([异常类型]);
});
```

### 业务逻辑异常
```[框架]
it('should throw [异常] when [条件]', () => {
  // Arrange
  const mock[依赖] = jest.fn().mockReturnValue([值]);
  
  // Act & Assert
  expect(() => [调用]).toThrow([异常]);
});
```

### 异步异常
```[框架]
it('should reject with [错误] when [条件]', async () => {
  // Arrange
  const input = [无效输入];

  // Act & Assert
  await expect([调用]).rejects.toThrow([错误]);
});
```
```

## 阶段 4：测试用例清单

### 4.1 用例汇总表

```markdown
## 测试用例汇总

| # | 用例名称 | 类型 | 优先级 | 预期结果 |
|---|----------|------|--------|----------|
| 1 | [名称] | [类型] | P0 | [结果] |
| 2 | [名称] | [类型] | P0 | [结果] |
| 3 | [名称] | [类型] | P1 | [结果] |

### 优先级说明
| 优先级 | 说明 | 覆盖率要求 |
|--------|------|------------|
| P0 | 核心功能必须覆盖 | 100% |
| P1 | 重要功能应覆盖 | 80% |
| P2 | 一般功能建议覆盖 | 60% |
```

### 4.2 覆盖率目标

```markdown
## 覆盖率目标

### 语句覆盖
| 目标 | 当前 | 差距 |
|------|------|------|
| [目标] | [当前] | [差距] |

### 分支覆盖
| 目标 | 当前 | 差距 |
|------|------|------|
| [目标] | [当前] | [差距] |

### 路径覆盖
| 目标 | 当前 | 差距 |
|------|------|------|
| [目标] | [当前] | [差距] |
```

## 阶段 5：测试实现指南

### 5.1 测试设置模板

```markdown
## 测试设置模板

### beforeEach 模板
```[框架]
beforeEach(() => {
  // 清理
  jest.clearAllMocks();
  
  // 设置默认 Mock
  mock[依赖] = jest.fn();
  
  // 创建被测对象
  service = new [Service](mock[依赖]);
});
```

### Mock 策略
| 依赖 | Mock 方式 | 理由 |
|------|-----------|------|
| [依赖] | [方式] | [理由] |
```

### 5.2 测试数据管理

```markdown
## 测试数据管理

### 测试数据工厂
```[框架]
const createTestUser = (overrides = {}) => ({
  id: 'test-id',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});
```

### 测试数据变体
| 变体 | 数据 | 用途 |
|------|------|------|
| valid | [数据] | 正常路径测试 |
| empty | [数据] | 空值测试 |
| large | [数据] | 大数据测试 |
```

## 阶段 6：测试执行计划

### 6.1 执行顺序

```markdown
## 测试执行计划

### 阶段 1: 核心功能测试
1. [测试1]
2. [测试2]
3. [测试3]

### 阶段 2: 边界条件测试
1. [测试1]
2. [测试2]

### 阶段 3: 异常处理测试
1. [测试1]
2. [测试2]
```

### 6.2 回归测试策略

```markdown
## 回归测试策略

### 每次提交触发
| 测试组 | 覆盖 | 执行时间 |
|--------|------|----------|
| [组] | [覆盖] | [时间] |

### 每日全量测试
| 测试组 | 覆盖 | 执行时间 |
|--------|------|----------|
| [组] | [覆盖] | [时间] |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/utils/validation.helper.ts` |
| `code_content` | 代码内容 | (代码内容) |
| `test_framework` | 测试框架 | `jest` |

# Usage Notes

1. **全面覆盖**：覆盖正常路径、边界、异常
2. **测试独立**：每个测试用例独立可运行
3. **命名清晰**：测试名称描述性强
4. **AAA 模式**：遵循 Arrange-Act-Assert
5. **可维护**：使用测试数据工厂，便于维护

# Example Input

```yaml
code_path: "src/utils/validation.helper.ts"
code_content: |
  function validateEmail(email: string): boolean {
    if (!email) return false;
    return email.includes('@');
  }
test_framework: "jest"
```

# Example Output

```yaml
test_suite_design:
  unit_tests:
    - name: "validateEmail"
      cases: 5
  coverage_target: "80%"

test_cases:
  - name: "should_return_true_for_valid_email"
    type: "happy_path"
    priority: P0
    input: "user@example.com"
    expected: true
  - name: "should_return_false_for_empty_string"
    type: "boundary"
    priority: P0
    input: ""
    expected: false
  - name: "should_return_false_for_email_without_at"
    type: "boundary"
    priority: P0
    input: "invalid"
    expected: false
  - name: "should_return_false_for_null"
    type: "exception"
    priority: P1
    input: "null"
    expected: false

coverage_analysis:
  statements: "100%"
  branches: "100%"
  functions: "100%"
```

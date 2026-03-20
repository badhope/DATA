---
id: prompt-task-testing-write-tests-for-existing-code-v1
name: Write Tests for Existing Code
summary: 为现有代码编写测试用例，强调理解代码行为并编写有效测试
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: testing
tags:
  - testing
  - existing-code
  - unit-test
  - integration-test
keywords:
  - 现有代码测试
  - 单元测试
  - 集成测试
  - 测试编写
intent: |
  指导 AI 为现有代码编写有效的测试。
  强调理解代码实际行为并编写能验证该行为的测试。
  核心原则：测试应该验证代码的实际行为，而非期望行为。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - existing_tests: array 现有测试
  - test_framework: string 测试框架
output_requirements:
  - test_implementation: array 测试实现
  - missing_tests: array 缺失的测试
  - test_improvements: array 测试改进建议
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析代码)
preconditions:
  - 有现有代码需要补充测试
anti_patterns:
  - 测试与实现耦合
  - 测试过于宽松
  - 测试覆盖重复
failure_modes:
  - 误解代码行为：先理解再测试
  - 测试过于具体：测试行为而非实现
  - 测试过于宽松：使用有意义的断言
self_check: |
  编写前自检：
  □ 是否理解了代码的实际行为？
  □ 是否识别了测试覆盖缺口？
  □ 测试是否独立可运行？
  □ 断言是否有意义？
related_skills:
  - skill-coding
  - skill-debugging
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-testing-generate-test-cases-for-code
  - prompt-task-testing-identify-untested-risk-areas
---

# Context

为现有代码编写测试需要先理解代码的实际行为。这与为新代码写测试不同——需要验证的是代码的实际行为，而非期望行为。本 prompt 的核心目标是：**指导 AI 为现有代码编写有效、可靠的测试**。

# Prompt Body

## 阶段 1：代码分析

### 1.1 理解代码行为

```markdown
## 代码行为分析

### 函数签名
```[语言]
[函数签名]
```

### 实际行为观察
| # | 输入 | 当前行为 | 预期行为 | 一致性 |
|---|------|----------|----------|--------|
| 1 | [输入] | [行为] | [预期] | [是/否] |

### 边界情况处理
| # | 情况 | 代码处理 | 测试覆盖 |
|---|------|----------|----------|
| 1 | [情况] | [处理] | [覆盖/未覆盖] |
```

### 1.2 现有测试分析

```markdown
## 现有测试分析

### 测试文件位置
| 文件 | 路径 |
|------|------|
| 测试文件 | [路径] |

### 现有测试覆盖
| # | 测试 | 覆盖内容 | 质量评估 |
|---|------|----------|----------|
| 1 | [测试] | [覆盖] | [评估] |

### 缺失的测试覆盖
| # | 场景 | 缺失原因 | 建议 |
|---|------|----------|------|
| 1 | [场景] | [原因] | [建议] |
```

## 阶段 2：测试覆盖分析

### 2.1 功能覆盖

```markdown
## 功能覆盖分析

### 已覆盖功能
| # | 功能 | 测试数 | 覆盖质量 |
|---|------|--------|----------|
| 1 | [功能] | [数] | [质量] |

### 未覆盖功能
| # | 功能 | 风险 | 建议 |
|---|------|------|------|
| 1 | [功能] | [风险] | [建议] |
```

### 2.2 分支覆盖

```markdown
## 分支覆盖分析

### 分支覆盖矩阵
| # | 分支 | 代码位置 | 覆盖状态 |
|---|------|----------|----------|
| 1 | if (x > 0) | [位置] | [覆盖/未覆盖] |
| 2 | else | [位置] | [覆盖/未覆盖] |

### 未覆盖分支
| # | 分支 | 触发条件 | 建议测试 |
|---|------|----------|----------|
| 1 | [分支] | [条件] | [测试] |
```

## 阶段 3：测试编写

### 3.1 单元测试编写

```markdown
## 单元测试编写

### 测试 1: [功能]_[场景]
```[框架]
describe('[被测单元]', () => {
  describe('[功能场景]', () => {
    it('should [预期行为] when [条件]', async () => {
      // Arrange
      const mock[依赖] = jest.fn().mockResolvedValue([值]);
      const service = new [Service](mock[依赖]);
      
      // Act
      const result = await service.[方法]([参数]);
      
      // Assert
      expect(result).toEqual([预期]);
      expect(mock[依赖]).toHaveBeenCalledWith([参数]);
    });
  });
});
```

**覆盖分支**: [覆盖的分支]
**验证点**: [验证点]
```

### 3.2 集成测试编写

```markdown
## 集成测试编写

### 测试: [功能]_[场景]
```[框架]
describe('[集成场景]', () => {
  it('should [预期行为] when [条件]', async () => {
    // Arrange
    const input = [测试数据];
    
    // Act
    const result = await [调用];
    
    // Assert
    expect(result).toMatchObject([预期]);
    
    // Verify side effects
    const [实体] = await [数据库查询];
    expect([实体]).to[验证];
  });
});
```

**测试范围**: [范围]
**依赖**: [依赖]
```

### 3.3 场景测试编写

```markdown
## 场景测试编写

### 场景: [用户故事]
```[框架]
describe('[场景描述]', () => {
  it('should [完成目标] when [前置条件]', async () => {
    // Arrange - 设置初始状态
    await [准备数据];
    
    // Act - 执行操作
    await [用户操作];
    
    // Assert - 验证结果
    const [结果] = await [验证查询];
    expect([结果]).to[预期];
  });
});
```
```

## 阶段 4：测试质量改进

### 4.1 当前测试问题

```markdown
## 当前测试问题

### 测试质量问题
| # | 问题 | 位置 | 影响 | 建议 |
|---|------|------|------|------|
| 1 | [问题] | [位置] | [影响] | [建议] |

### 建议的改进
```markdown
**改进 1**: [描述]
**当前问题**: [问题]
**改进方案**: [方案]
**收益**: [收益]
```
```

### 4.2 断言改进

```markdown
## 断言改进建议

### 具体断言
| 当前 | 改进 | 理由 |
|------|------|------|
| `toBeTruthy()` | `toEqual(预期值)` | 更精确验证 |
| `toContain()` | `toMatchObject()` | 结构化验证 |

### 避免的断言
| 断言 | 问题 | 替代 |
|------|------|------|
| `toBeTruthy()` | 过于宽松 | 具体值验证 |
| `not.toThrow()` | 吞掉错误 | 验证具体错误类型 |
```

## 阶段 5：测试实现计划

### 5.1 实现优先级

```markdown
## 测试实现计划

### 高优先级 (P0)
| # | 测试 | 理由 | 工作量 |
|---|------|------|--------|
| 1 | [测试] | [理由] | [工作量] |

### 中优先级 (P1)
| # | 测试 | 理由 | 工作量 |
|---|------|------|--------|
| 1 | [测试] | [理由] | [工作量] |
```

### 5.2 实现清单

```markdown
## 测试实现清单

- [ ] 测试 1: [描述]
- [ ] 测试 2: [描述]
- [ ] 测试 3: [描述]

### 验收标准
- [ ] 覆盖率提升 [N]%
- [ ] 所有 P0 测试通过
- [ ] 无测试警告
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/services/user.service.ts` |
| `existing_tests` | 现有测试路径 | `["tests/user.test.ts"]` |
| `test_framework` | 测试框架 | `jest` |

# Usage Notes

1. **理解优先**：先理解代码行为再编写测试
2. **行为测试**：测试实际行为而非实现细节
3. **有意义断言**：使用具体、有意义的断言
4. **测试独立**：确保测试可以独立运行
5. **覆盖缺口**：识别并补充缺失的测试

# Example Input

```yaml
code_path: "src/services/user.service.ts"
existing_tests:
  - "tests/user.service.test.ts"
test_framework: "jest"
```

# Example Output

```yaml
test_implementation:
  - name: "should_create_user_with_valid_data"
    framework: "jest"
    lines: 15
    coverage: ["createUser"]
  - name: "should_throw_when_email_exists"
    framework: "jest"
    lines: 12
    coverage: ["createUser"]

missing_tests:
  - scenario: "password_validation"
    priority: P1
    reason: "未测试密码验证逻辑"
  - scenario: "concurrent_registration"
    priority: P0
    reason: "高并发场景未测试"

test_improvements:
  - issue: "断言过于宽松"
    current: "expect(result).toBeTruthy()"
    suggested: "expect(result).toEqual({id: '123', name: 'John'})"
```

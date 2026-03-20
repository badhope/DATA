---
id: prompt-task-testing-design-edge-case-tests-v1
name: Design Edge Case Tests
summary: 设计边界情况测试，包括空值、极值、格式错误、状态转换
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: testing
tags:
  - testing
  - edge-case
  - boundary
  - boundary-testing
keywords:
  - 边界测试
  - 极端情况
  - 空值测试
  - 状态转换
intent: |
  指导 AI 设计全面的边界情况测试。
  强调边界测试是发现隐藏 bug 的关键。
  核心原则：大多数 bug 出现在边界条件上。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - code_content: string 代码内容
  - test_framework: string 测试框架
output_requirements:
  - edge_cases: array 边界情况清单
  - test_designs: array 测试设计
  - risk_assessment: object 风险评估
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析代码)
preconditions:
  - 有代码需要设计边界测试
anti_patterns:
  - 只测试正常路径
  - 忽略极端值
  - 假设用户输入总是有效
failure_modes:
  - 边界遗漏：系统化分析边界
  - 极端值忽略：测试极端情况
  - 状态遗漏：分析状态转换
self_check: |
  设计前自检：
  □ 是否识别了所有输入边界？
  □ 是否考虑了极端值？
  □ 是否覆盖了状态转换？
  □ 是否测试了错误格式？
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

边界情况测试是发现隐藏 bug 的关键。大多数软件错误出现在边界条件上：空值、极端值、格式错误、并发边界等。本 prompt 的核心目标是：**指导 AI 系统化地设计边界情况测试**。

# Prompt Body

## 阶段 1：输入边界识别

### 1.1 数据类型边界

```markdown
## 数据类型边界

### 数值边界
| # | 边界类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 最小值 | [值] | [行为] |
| 2 | 最大值 | [值] | [行为] |
| 3 | 零 | 0 | [行为] |
| 4 | 负数 | -1 | [行为] |
| 5 | 极小值 | [值] | [行为] |
| 6 | 极大值 | [值] | [行为] |

### 字符串边界
| # | 边界类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 空字符串 | "" | [行为] |
| 2 | 空格 | " " | [行为] |
| 3 | 单字符 | "a" | [行为] |
| 4 | 很长字符串 | [长] | [行为] |
| 5 | Unicode | [值] | [行为] |
| 6 | 特殊字符 | [值] | [行为] |

### 集合边界
| # | 边界类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 空集合 | [] | [行为] |
| 2 | 单元素 | [1] | [行为] |
| 3 | 很大集合 | [N个] | [行为] |
| 4 | 重复元素 | [值] | [行为] |
```

### 1.2 业务逻辑边界

```markdown
## 业务逻辑边界

### 数量限制
| # | 限制类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 最小数量 | 0 | [行为] |
| 2 | 最大数量 | 1000 | [行为] |
| 3 | 临界值 | 1 | [行为] |

### 时间边界
| # | 边界类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 零等待 | 0ms | [行为] |
| 2 | 超长等待 | [值] | [行为] |
| 3 | 时区边界 | [值] | [行为] |

### 格式边界
| # | 格式类型 | 测试值 | 预期行为 |
|---|----------|--------|----------|
| 1 | 正确格式 | [格式] | [行为] |
| 2 | 错误格式 | [格式] | [行为] |
| 3 | 缺省部分 | [格式] | [行为] |
```

## 阶段 2：边界情况分类

### 2.1 空值边界

```markdown
## 空值边界测试设计

### null 测试
```[框架]
describe('null boundary', () => {
  it('should handle null input gracefully', () => {
    // Arrange
    const input = null;
    
    // Act & Assert
    expect(() => process(input)).not.toThrow();
  });
  
  it('should return [预期] for null input', () => {
    // Arrange
    const input = null;
    
    // Act
    const result = process(input);
    
    // Assert
    expect(result).to[预期];
  });
});
```

### undefined 测试
```[框架]
it('should handle undefined input', () => {
  // Arrange
  const input = undefined;
  
  // Act & Assert
  expect(() => process(input)).not.toThrow();
});
```

### 空集合测试
```[框架]
it('should handle empty array', () => {
  // Arrange
  const input = [];
  
  // Act
  const result = process(input);
  
  // Assert
  expect(result).toEqual([预期]);
});
```
```

### 2.2 极端值边界

```markdown
## 极端值测试设计

### 数值极端
```[框架]
describe('numeric extremes', () => {
  it('should handle MAX_SAFE_INTEGER', () => {
    // Arrange
    const input = Number.MAX_SAFE_INTEGER;
    
    // Act
    const result = process(input);
    
    // Assert
    expect(result).to[预期];
  });
  
  it('should handle MIN_SAFE_INTEGER', () => {
    // Arrange
    const input = Number.MIN_SAFE_INTEGER;
    
    // Act
    const result = process(input);
    
    // Assert
    expect(result).to[预期];
  });
  
  it('should handle Infinity', () => {
    // Arrange
    const input = Infinity;
    
    // Act & Assert
    expect(() => process(input)).toThrow();
  });
});
```

### 字符串极端
```[框架]
describe('string extremes', () => {
  it('should handle very long string', () => {
    // Arrange
    const input = 'a'.repeat(100000);
    
    // Act
    const result = process(input);
    
    // Assert
    expect(result).to[预期];
  });
  
  it('should handle emoji string', () => {
    // Arrange
    const input = '👨‍👩‍👧‍👦👋🏽';
    
    // Act
    const result = process(input);
    
    // Assert
    expect(result).to[预期];
  });
});
```
```

### 2.3 格式错误边界

```markdown
## 格式错误边界测试设计

### 日期格式
```[框架]
describe('date format errors', () => {
  it('should handle invalid date string', () => {
    // Arrange
    const input = 'not-a-date';
    
    // Act & Assert
    expect(() => parseDate(input)).toThrow();
  });
  
  it('should handle leap year edge case', () => {
    // Arrange
    const input = '2024-02-29'; // 2024 is leap year
    
    // Act
    const result = parseDate(input);
    
    // Assert
    expect(result).toBeValidDate();
  });
});
```

### 数字格式
```[框架]
describe('number format errors', () => {
  it('should handle NaN', () => {
    // Arrange
    const input = NaN;
    
    // Act & Assert
    expect(isNaN(process(input))).toBe(true);
  });
  
  it('should handle scientific notation', () => {
    // Arrange
    const input = '1e10';
    
    // Act
    const result = parseNumber(input);
    
    // Assert
    expect(result).toBe(10000000000);
  });
});
```
```

## 阶段 3：状态转换边界

### 3.1 状态机边界

```markdown
## 状态转换边界测试设计

### 有效转换
```[框架]
describe('valid state transitions', () => {
  it('should transition from pending to active', () => {
    // Arrange
    const entity = createEntity({ state: 'pending' });
    
    // Act
    entity.transitionTo('active');
    
    // Assert
    expect(entity.state).toBe('active');
  });
});
```

### 无效转换
```[框架]
describe('invalid state transitions', () => {
  it('should throw on invalid transition', () => {
    // Arrange
    const entity = createEntity({ state: 'pending' });
    
    // Act & Assert
    expect(() => entity.transitionTo('deleted')).toThrow();
  });
});
```

### 边界状态
```[框架]
it('should handle initial state correctly', () => {
  // Arrange & Act
  const entity = createEntity();
  
  // Assert
  expect(entity.state).toBe('initial');
});
```
```

### 3.2 并发边界

```markdown
## 并发边界测试设计

### 竞态条件
```[框架]
describe('concurrency boundaries', () => {
  it('should handle concurrent updates correctly', async () => {
    // Arrange
    const resource = createResource();
    
    // Act - concurrent modifications
    await Promise.all([
      resource.update({ value: 1 }),
      resource.update({ value: 2 }),
      resource.update({ value: 3 }),
    ]);
    
    // Assert
    const final = await resource.get();
    expect(final.value).toBeDefined();
  });
});
```

### 死锁避免
```[框架]
it('should not deadlock with nested locks', async () => {
  // Arrange
  const lock1 = createLock();
  const lock2 = createLock();
  
  // Act & Assert
  await expect(
    Promise.all([
      acquireLocks([lock1, lock2]),
      acquireLocks([lock1, lock2]),
    ])
  ).resolves.not.toThrow();
});
```
```

## 阶段 4：边界测试汇总

### 4.1 边界情况清单

```markdown
## 边界情况清单

### 边界类型分布
| 类型 | 数量 | 高风险 | 中风险 | 低风险 |
|------|------|--------|--------|--------|
| 空值边界 | [N] | [N] | [N] | [N] |
| 极端值边界 | [N] | [N] | [N] | [N] |
| 格式边界 | [N] | [N] | [N] | [N] |
| 状态转换 | [N] | [N] | [N] | [N] |
| 并发边界 | [N] | [N] | [N] | [N] |

### 优先级排序
| # | 边界情况 | 类型 | 风险 | 测试状态 |
|---|----------|------|------|----------|
| 1 | [情况] | [类型] | [风险] | [待测试] |
```

### 4.2 风险评估

```markdown
## 边界测试风险评估

### 高风险边界
| # | 边界 | 潜在问题 | 历史 bug | 测试覆盖 |
|---|------|----------|----------|----------|
| 1 | [边界] | [问题] | [bug] | [覆盖] |

### 中风险边界
| # | 边界 | 潜在问题 | 建议测试 |
|---|------|----------|----------|
| 1 | [边界] | [问题] | [测试] |
```

## 阶段 5：边界测试实现指南

### 5.1 测试模板

```markdown
## 边界测试模板

### 数值边界测试
```[框架]
describe('Numeric Boundaries', () => {
  const testCases = [
    { input: 0, expected: 'zero' },
    { input: -1, expected: 'negative' },
    { input: Number.MAX_VALUE, expected: 'max' },
  ];
  
  testCases.forEach(({ input, expected }) => {
    it(`should handle ${expected}`, () => {
      expect(process(input)).toBeDefined();
    });
  });
});
```

### 参数化边界测试
```[框架]
describe('Boundary Tests', () => {
  test.each([
    [null, 'null handling'],
    [undefined, 'undefined handling'],
    ['', 'empty string'],
    [Number.MAX_SAFE_INTEGER, 'max safe integer'],
  ])('should handle %s correctly', (input, description) => {
    expect(() => process(input)).not.toThrow();
  });
});
```
```

### 5.2 覆盖率目标

```markdown
## 边界测试覆盖率目标

### 类型覆盖率
| 边界类型 | 目标覆盖率 | 当前覆盖率 | 差距 |
|----------|------------|------------|------|
| 空值边界 | 100% | [当前] | [差距] |
| 极端值边界 | 90% | [当前] | [差距] |
| 格式边界 | 85% | [当前] | [差距] |
| 状态转换 | 100% | [当前] | [差距] |
| 并发边界 | 70% | [当前] | [差距] |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/utils/parser.ts` |
| `code_content` | 代码内容 | (代码内容) |
| `test_framework` | 测试框架 | `jest` |

# Usage Notes

1. **系统化识别**：从数据类型、业务逻辑、时间等多维度识别边界
2. **极端情况**：不要只测试"正常"情况，要测试极端
3. **格式错误**：测试各种错误格式的处理
4. **状态转换**：覆盖所有合法和非法状态转换
5. **并发边界**：测试并发场景下的边界情况

# Example Input

```yaml
code_path: "src/utils/date.helper.ts"
code_content: |
  function parseDate(input: string): Date {
    return new Date(input);
  }
test_framework: "jest"
```

# Example Output

```yaml
edge_cases:
  - type: "null_boundary"
    values: ["null", "undefined", "''"]
    risk: high
  - type: "format_boundary"
    values: ["invalid-date", "2024-02-30", "01/01/2024"]
    risk: high
  - type: "extreme_value"
    values: ["year-100000", "year+100000"]
    risk: medium

test_designs:
  - name: "should_throw_on_invalid_format"
    input: "not-a-date"
    expected: "throw"
  - name: "should_handle_leap_year"
    input: "2024-02-29"
    expected: "valid date"
  - name: "should_handle_empty_string"
    input: ""
    expected: "throw or handle gracefully"

risk_assessment:
  high_risk_count: 5
  medium_risk_count: 3
  low_risk_count: 2
```

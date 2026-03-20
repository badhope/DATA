---
id: prompt-task-testing-align-tests-with-change-scope-v1
name: Align Tests with Change Scope
summary: 确保测试覆盖与代码变更范围相匹配
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: testing
tags:
  - testing
  - change-scope
  - test-alignment
  - coverage
keywords:
  - 测试匹配
  - 变更范围
  - 覆盖对齐
  - 变更测试
intent: |
  指导 AI 确保测试覆盖与代码变更范围相匹配。
  强调测试应该聚焦于变更影响的区域。
  核心原则：测试覆盖必须与变更范围相匹配，既不遗漏也不浪费。
applicable_models:
  - "*"
input_requirements:
  - change_summary: string 变更摘要
  - changed_files: array 变更的文件
  - existing_tests: array 现有测试
output_requirements:
  - alignment_analysis: object 对齐分析
  - coverage_gaps: array 覆盖缺口
  - additional_tests_needed: array 需要的额外测试
  - test_scope_recommendation: object 测试范围建议
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析依赖)
preconditions:
  - 有代码变更需要评估测试覆盖
anti_patterns:
  - 测试覆盖与变更不匹配
  - 遗漏变更影响区域
  - 过度测试不相关区域
failure_modes:
  - 覆盖不足：分析变更影响
  - 覆盖过度：聚焦变更范围
  - 优先级不清：设置合理优先级
self_check: |
  评估前自检：
  □ 是否理解了变更范围？
  □ 是否分析了变更影响？
  □ 是否识别了覆盖缺口？
  □ 是否提供了具体建议？
related_skills:
  - skill-testing
  - skill-debugging
related_workflows:
  - workflow-change-verify-report
related_prompts:
  - prompt-task-testing-create-regression-test-plan
  - prompt-task-testing-identify-untested-risk-areas
---

# Context

代码变更时，测试覆盖必须与变更范围相匹配。测试不足会导致回归 bug，测试过度则浪费资源。本 prompt 的核心目标是：**指导 AI 分析和确保测试覆盖与变更范围相匹配**。

# Prompt Body

## 阶段 1：变更范围分析

### 1.1 变更内容理解

```markdown
## 变更内容理解

### 变更摘要
```markdown
**变更类型**: [类型]
**变更描述**:
[描述]

**变更原因**: [原因]
```

### 变更文件清单
| # | 文件 | 变更类型 | 变更行数 | 影响程度 |
|---|------|----------|----------|----------|
| 1 | [文件] | [类型] | [行数] | [程度] |
```

### 1.2 变更影响分析

```markdown
## 变更影响分析

### 直接影响
| # | 被影响项 | 文件/模块 | 影响描述 | 影响类型 |
|---|----------|-----------|----------|----------|
| 1 | [项] | [位置] | [描述] | [类型] |

### 间接影响
| # | 被影响项 | 文件/模块 | 影响路径 | 影响类型 |
|---|----------|-----------|----------|----------|
| 1 | [项] | [位置] | [路径] | [类型] |

### API 变更影响
| # | API | 变更类型 | 影响方 | 影响描述 |
|---|-----|----------|--------|----------|
| 1 | [API] | [类型] | [影响方] | [描述] |
```

## 阶段 2：测试覆盖分析

### 2.1 现有测试覆盖

```markdown
## 现有测试覆盖

### 测试文件对应
| # | 代码文件 | 测试文件 | 覆盖状态 |
|---|----------|----------|----------|
| 1 | [文件] | [测试文件] | [状态] |

### 变更文件测试覆盖
| # | 变更文件 | 测试覆盖 | 覆盖类型 | 覆盖质量 |
|---|----------|----------|----------|----------|
| 1 | [文件] | [覆盖] | [类型] | [质量] |

### 覆盖缺失
| # | 文件 | 覆盖缺失 | 风险 |
|---|------|----------|------|
| 1 | [文件] | [缺失] | [风险] |
```

### 2.2 影响区域测试覆盖

```markdown
## 影响区域测试覆盖

### 直接影响区域
| # | 区域 | 测试覆盖 | 充分性 |
|---|------|----------|--------|
| 1 | [区域] | [覆盖] | [充分/不足] |

### 间接影响区域
| # | 区域 | 测试覆盖 | 充分性 |
|---|------|----------|--------|
| 1 | [区域] | [覆盖] | [充分/不足] |

### API 变更区域
| # | API | 测试覆盖 | 充分性 |
|---|-----|----------|--------|
| 1 | [API] | [覆盖] | [充分/不足] |
```

## 阶段 3：覆盖缺口识别

### 3.1 覆盖缺口分类

```markdown
## 覆盖缺口分类

### 缺失测试
| # | 区域 | 缺口描述 | 风险 | 建议 |
|---|------|----------|------|------|
| 1 | [区域] | [描述] | [风险] | [建议] |

### 覆盖不足
| # | 区域 | 现有覆盖 | 建议覆盖 | 补充建议 |
|---|------|----------|----------|----------|
| 1 | [区域] | [覆盖] | [覆盖] | [建议] |

### 测试过期
| # | 测试 | 过期原因 | 建议 |
|---|------|----------|------|
| 1 | [测试] | [原因] | [建议] |
```

### 3.2 关键缺口

```markdown
## 关键覆盖缺口

### 必须补充 (P0)
| # | 缺口 | 位置 | 风险 | 建议测试 |
|---|------|------|------|----------|
| 1 | [缺口] | [位置] | [风险] | [测试] |

### 建议补充 (P1)
| # | 缺口 | 位置 | 风险 | 建议测试 |
|---|------|------|------|----------|
| 1 | [缺口] | [位置] | [风险] | [测试] |
```

## 阶段 4：测试范围建议

### 4.1 测试范围

```markdown
## 测试范围建议

### 必须测试范围
| # | 范围 | 理由 | 优先级 |
|---|------|------|--------|
| 1 | [范围] | [理由] | P0 |

### 建议测试范围
| # | 范围 | 理由 | 优先级 |
|---|------|------|--------|
| 1 | [范围] | [理由] | P1 |

### 可选测试范围
| # | 范围 | 理由 | 优先级 |
|---|------|------|--------|
| 1 | [范围] | [理由] | P2 |
```

### 4.2 覆盖目标

```markdown
## 覆盖目标

### 变更覆盖率目标
| # | 类型 | 当前覆盖 | 目标覆盖 | 差距 |
|---|------|----------|----------|------|
| 1 | [类型] | [覆盖] | [覆盖] | [差距] |

### 影响区域覆盖率目标
| # | 区域 | 当前覆盖 | 目标覆盖 | 差距 |
|---|------|----------|----------|------|
| 1 | [区域] | [覆盖] | [覆盖] | [差距] |
```

## 阶段 5：补充测试计划

### 5.1 补充测试清单

```markdown
## 补充测试清单

### 高优先级补充
| # | 测试 | 目标 | 覆盖类型 | 工作量 |
|---|------|------|----------|--------|
| 1 | [测试] | [目标] | [类型] | [工作量] |

### 中优先级补充
| # | 测试 | 目标 | 覆盖类型 | 工作量 |
|---|------|------|----------|--------|
| 1 | [测试] | [目标] | [类型] | [工作量] |
```

### 5.2 测试实现指南

```markdown
## 测试实现指南

### 补充测试模板
```[框架]
describe('[变更场景]', () => {
  it('should [预期行为] after [变更]', () => {
    // Arrange
    const [数据] = [准备数据];
    
    // Act
    const result = [执行变更];
    
    // Assert
    expect(result).to[预期];
  });
});
```

### 回归测试清单
- [ ] 测试 1: [描述]
- [ ] 测试 2: [描述]
- [ ] 测试 3: [描述]
```

## 阶段 6：对齐评估报告

### 6.1 对齐评估

```markdown
## 对齐评估报告

### 变更-测试对齐度
| 指标 | 值 | 评估 |
|------|-----|------|
| 覆盖率匹配度 | [值]% | [评估] |
| 影响区域覆盖 | [值]% | [评估] |
| 优先级匹配度 | [值]% | [评估] |

### 总体评估
- **对齐状态**: [良好/一般/不足]
- **建议**: [建议]
```

### 6.2 行动建议

```markdown
## 行动建议

### 立即行动 (当前变更)
- [ ] 补充 [测试描述]
- [ ] 验证 [验证描述]

### 后续行动 (未来改进)
- [ ] 建立 [改进项]
- [ ] 优化 [优化项]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `change_summary` | 变更摘要 | `"重构用户认证模块"` |
| `changed_files` | 变更的文件 | `["src/auth/user.service.ts", "src/auth/login.ts"]` |
| `existing_tests` | 现有测试 | `["tests/auth/user.service.test.ts"]` |

# Usage Notes

1. **精准匹配**：测试覆盖要与变更范围精准匹配
2. **影响分析**：分析变更的直接和间接影响
3. **优先级分明**：高风险优先测试
4. **不过度**：不要为不相关的区域编写测试
5. **可验证**：确保测试可以验证变更效果

# Example Input

```yaml
change_summary: "重构用户认证模块，拆分登录和注册逻辑"
changed_files:
  - "src/auth/user.service.ts"
  - "src/auth/login.ts"
  - "src/auth/register.ts"
existing_tests:
  - "tests/auth/user.service.test.ts"
  - "tests/auth/login.test.ts"
```

# Example Output

```yaml
alignment_analysis:
  coverage_match: "75%"
  impact_coverage: "80%"
  priority_match: "90%"
  overall_assessment: "需要补充测试"

coverage_gaps:
  - area: "register.ts"
    gap: "缺少注册测试"
    risk: high
    tests_needed: 3
  - area: "login.ts"
    gap: "缺少边界条件测试"
    risk: medium
    tests_needed: 2

additional_tests_needed:
  - test: "should_register_new_user"
    target: "register.ts"
    priority: P0
    effort: "30分钟"
  - test: "should_handle_duplicate_email"
    target: "register.ts"
    priority: P0
    effort: "20分钟"
  - test: "should_validate_password_strength"
    target: "register.ts"
    priority: P1
    effort: "20分钟"

test_scope_recommendation:
  must_test:
    - "register.ts 新逻辑"
    - "login.ts 拆分后的逻辑"
  should_test:
    - "user.service.ts 集成"
  optional_test:
    - "异常处理分支"
```

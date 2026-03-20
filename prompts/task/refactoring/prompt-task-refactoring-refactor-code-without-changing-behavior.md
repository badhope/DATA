---
id: prompt-task-refactoring-refactor-code-without-changing-behavior-v1
name: Refactor Code Without Changing Behavior
summary: 在保持代码外部行为不变的前提下进行重构，强调回归测试和渐进式变更
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - behavior-preservation
  - regression
keywords:
  - 重构
  - 行为不变
  - 回归测试
  - 渐进式变更
intent: |
  指导 AI 在重构代码时始终保持行为不变。
  强调重构不是重写，而是有纪律的代码改善。
  核心原则：行为不变是重构的铁律，任何重构都必须有验证手段。
applicable_models:
  - "*"
input_requirements:
  - target_code: string 要重构的代码
  - test_suite: string (可选) 现有测试套件
  - refactoring_goal: string 重构目标
output_requirements:
  - behavior_preservation_plan: object 行为保持计划
  - test_verification_steps: array 验证步骤
  - risk_assessment: object 风险评估
  - refactored_code: string 重构后的代码
tool_requirements:
  - Read tool (读取原始代码和测试)
  - Grep tool (查找相关调用点)
  - RunCommand tool (运行测试)
preconditions:
  - 有明确的代码需要重构
anti_patterns:
  - 同时修改功能和结构
  - 没有测试覆盖就重构
  - 重构范围无限扩大
  - 不验证行为是否保持
failure_modes:
  - 行为意外改变：通过测试验证发现
  - 重构过度：明确重构边界
  - 测试缺失：先补充测试再重构
self_check: |
  重构前自检：
  □ 是否明确了重构边界？
  □ 是否有测试覆盖要重构的代码？
  □ 是否准备了回滚方案？
  □ 是否理解被重构代码的所有调用点？
related_skills:
  - skill-testing
  - skill-code-review
related_workflows:
  - workflow-feature-implementation
  - workflow-change-verify-report
related_prompts:
  - prompt-task-refactoring-propose-refactoring-plan
  - prompt-task-testing-generate-test-cases-for-code
  - prompt-task-testing-write-tests-for-existing-code
---

# Context

重构是软件开发中的关键活动，但不当的重构可能引入 bug 甚至破坏系统稳定性。本 prompt 的核心目标是：**指导 AI 进行安全、有效的重构，确保代码行为始终保持不变**。

当需要进行以下工作时，必须遵循此 prompt：
- 提取函数或方法
- 重命名变量或标识符
- 重组代码结构
- 简化复杂的条件逻辑
- 消除重复代码

# Prompt Body

## 阶段 1：重构准备

### 1.1 理解重构边界

```markdown
## 重构边界定义

### 目标代码范围
| 项目 | 内容 |
|------|------|
| 文件/模块 | [路径] |
| 函数/类 | [名称] |
| 代码行数 | [数量] |

### 调用点分析
| # | 调用位置 | 调用方式 | 影响范围 |
|---|----------|----------|----------|
| 1 | [位置] | [直接/间接] | [高/中/低] |
| 2 | [位置] | [直接/间接] | [高/中/低] |

### 重构约束
- **不允许修改**：外部 API、函数签名、返回值格式
- **必须保持**：行为逻辑、副作用、异常抛出
- **可以改变**：内部实现、变量名、代码结构
```

### 1.2 测试覆盖检查

```markdown
## 测试覆盖检查

### 现有测试
| 测试类型 | 数量 | 覆盖状态 |
|----------|------|----------|
| 单元测试 | [数量] | [覆盖/未覆盖] |
| 集成测试 | [数量] | [覆盖/未覆盖] |
| 端到端测试 | [数量] | [覆盖/未覆盖] |

### 覆盖差距
```markdown
## 覆盖缺口

### 未覆盖的场景
| 场景 | 风险 | 建议 |
|------|------|------|
| [场景1] | [风险] | [补充测试] |

### 建议行动
- [ ] 如果测试覆盖不足，先补充测试
- [ ] 确保测试能验证核心行为
```
```

## 阶段 2：行为保持计划

### 2.1 行为分析

```markdown
## 行为分析

### 输入输出分析
| 参数 | 类型 | 说明 | 边界条件 |
|------|------|------|----------|
| [参数1] | [类型] | [说明] | [条件] |

### 副作用识别
| 副作用 | 位置 | 影响 | 是否必须保持 |
|--------|------|------|--------------|
| [副作用1] | [位置] | [影响] | [是/否] |

### 异常行为
| 异常情况 | 当前行为 | 必须保持 |
|----------|----------|----------|
| [异常1] | [行为] | [是/否] |
```

### 2.2 重构策略

```markdown
## 重构策略

### 策略选择
| 策略 | 适用场景 | 风险 |
|------|----------|------|
| 逐步替换 | 有调用链的函数 | 低 |
| 平行编写 | 复杂逻辑 | 中 |
| 一次性重构 | 简单函数 | 低 |

### 具体步骤
1. **备份**：记录原始代码（引用位置）
2. **编写测试**：确保行为可验证
3. **小步重构**：每次只改一处
4. **频繁验证**：每步都运行测试
5. **最终确认**：全部测试通过
```

## 阶段 3：渐进式重构

### 3.1 分步执行

```markdown
## 分步重构计划

### 步骤 1: [小步骤]
**目标**: [目标描述]
**改变**: [具体改变]
**验证**: [验证方式]

### 步骤 2: [小步骤]
**目标**: [目标描述]
**改变**: [具体改变]
**验证**: [验证方式]

### 步骤 3: [小步骤]
**目标**: [目标描述]
**改变**: [具体改变]
**验证**: [验证方式]
```

### 3.2 每步验证

```markdown
## 每步验证清单

### 步骤 1 验证
- [ ] 测试通过
- [ ] 行为未改变
- [ ] 没有引入新警告

### 步骤 2 验证
- [ ] 测试通过
- [ ] 行为未改变
- [ ] 没有引入新警告

### 步骤 3 验证
- [ ] 测试通过
- [ ] 行为未改变
- [ ] 没有引入新警告
```

## 阶段 4：验证和确认

### 4.1 测试验证

```markdown
## 测试验证

### 必须通过的测试
```bash
# 单元测试
npm test -- --testPathPattern="[相关测试文件]"

# 集成测试
npm test -- --testPathPattern="[集成测试]"

# 全部测试
npm test
```

### 验证结果
| 测试类型 | 数量 | 通过 | 失败 | 跳过 |
|----------|------|------|------|------|
| 单元测试 | [N] | [N] | [N] | [N] |
| 集成测试 | [N] | [N] | [N] | [N] |
```

### 4.2 行为对比

```markdown
## 行为对比

### 功能对比
| 功能点 | 重构前 | 重构后 | 是否一致 |
|--------|--------|--------|----------|
| [功能1] | [行为] | [行为] | [✓/✗] |

### 性能对比
| 指标 | 重构前 | 重构后 | 变化 |
|------|--------|--------|------|
| 执行时间 | [时间] | [时间] | [变化] |

### 对比结论
**结论**: [行为是否完全一致]
```

## 阶段 5：重构完成

### 5.1 变更总结

```markdown
## 重构变更总结

### 代码改变
```yaml
changes:
  files_modified:
    - path: "[文件路径]"
      lines_added: [数量]
      lines_removed: [数量]
  refactoring_types:
    - type: "[类型]"
      location: "[位置]"
```

### 质量改善
```yaml
improvements:
  complexity_reduction: "[降低百分比]"
  duplication_eliminated: "[消除重复]"
  readability_improved: "[改进描述]"
```

### 验证状态
- [ ] 所有测试通过
- [ ] 行为保持一致
- [ ] 没有引入新警告
- [ ] 文档已更新（如需要）
```

### 5.2 回滚方案

```markdown
## 回滚方案

### 触发条件
- 测试失败率超过 [阈值]
- 行为与预期不符
- 引入严重问题

### 回滚步骤
1. 恢复备份的原始代码
2. 运行测试确认恢复正常
3. 分析失败原因
4. 重新制定重构计划

### 备份位置
[原始代码备份位置或引用]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `target_code` | 要重构的代码路径 | `src/utils/helper.ts` |
| `test_suite` | 相关测试文件路径 | `tests/utils/helper.test.ts` |
| `refactoring_goal` | 重构目标 | `提取重复的格式化逻辑` |

# Usage Notes

1. **行为优先**：重构的首要原则是保持行为不变
2. **测试先行**：优先确保有测试覆盖
3. **小步快跑**：分步骤进行，每步验证
4. **验证充分**：用测试确保重构正确
5. **可回滚**：始终准备回滚方案

# Example Input

```yaml
target_code: "src/services/payment.service.ts"
test_suite: "tests/services/payment.service.test.ts"
refactoring_goal: "将支付处理逻辑中的输入验证与业务逻辑分离"
```

# Example Output

```yaml
behavior_preservation_plan:
  constraints:
    - "保持 processPayment 函数签名不变"
    - "保持所有异常类型和消息"
    - "保持返回值格式"
  verification:
    - "11 个单元测试全部通过"
    - "2 个集成测试通过"

test_verification_steps:
  - step: "运行单元测试"
    command: "npm test -- --testPathPattern=payment.service"
    expected: "全部通过"
  - step: "运行集成测试"
    command: "npm run test:integration"
    expected: "全部通过"

risk_assessment:
  level: "medium"
  reasons:
    - "有完整测试覆盖"
    - "重构范围明确"
    - "采用渐进式策略"

refactored_code:
  validation_logic: "移至 src/validators/payment.validator.ts"
  business_logic: "保留在 payment.service.ts"
  boundary: "清晰分离输入验证和业务逻辑"
```

---
id: prompt-task-engineering-planning-prepare-pr-or-change-plan-v1
name: Prepare PR or Change Plan
summary: 准备 Pull Request 或变更计划文档
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: engineering-planning
tags:
  - planning
  - PR
  - change
  - code-review
keywords:
  - PR 计划
  - 变更计划
  - 提交计划
  - 代码审查
intent: |
  指导 AI 准备 Pull Request 或变更计划文档。
  强调变更计划必须清晰、完整、有利于审查。
  核心原则：好的变更计划让审查者快速理解变更内容。
applicable_models:
  - "*"
input_requirements:
  - change_description: string 变更描述
  - changes: array 变更内容
  - testing_done: array 测试验证
output_requirements:
  - pr_description: string PR 描述
  - change_summary: string 变更摘要
  - testing_report: object 测试报告
  - review_checklist: array 审查检查清单
tool_requirements:
  - Read tool (读取代码)
  - RunCommand tool (获取 diff)
preconditions:
  - 有代码变更需要提交 PR
anti_patterns:
  - PR 描述不清晰
  - 变更范围不明确
  - 测试验证不完整
failure_modes:
  - PR 难以审查：清晰的变更描述
  - 遗漏重要变更：完整的变更清单
  - 测试不充分：完整的测试报告
self_check: |
  准备前自检：
  □ 是否清晰描述了变更内容？
  □ 是否说明了变更原因？
  □ 是否提供了完整的测试报告？
  □ 是否准备了审查检查清单？
related_skills:
  - skill-engineering-planning
  - skill-code-review
  - skill-testing
related_workflows:
  - workflow-change-verify-report
related_prompts:
  - prompt-task-documentation-for-code-summarize-code-changes-for-humans
  - prompt-task-code-review-review-code-for-quality
---

# Context

Pull Request 是代码协作的核心，良好的 PR 描述和变更计划能让审查者快速理解变更内容，提高审查效率，降低引入缺陷的风险。本 prompt 的核心目标是：**指导 AI 准备清晰、完整的 PR 或变更计划文档**。

# Prompt Body

## 阶段 1：变更理解

### 1.1 变更概览

```markdown
## 变更概览

### 基本信息
| 项目 | 内容 |
|------|------|
| PR 标题 | [标题] |
| 变更类型 | [类型] |
| 影响范围 | [范围] |
| 破坏性变更 | [是/否] |

### 一句话描述
[用一句话描述这次变更的核心内容]
```

### 1.2 变更动机

```markdown
## 变更动机

### 为什么需要这个变更
```markdown
**问题/背景**:
[描述当前问题或背景]

**目标和收益**:
1. [收益1]
2. [收益2]

**影响**:
- [影响1]
- [影响2]
```
```

### 1.3 变更范围

```markdown
## 变更范围

### 修改的文件
| # | 文件 | 变更类型 | 说明 |
|---|------|----------|------|
| 1 | [文件] | [类型] | [说明] |

### 新增的文件
| # | 文件 | 说明 |
|---|------|------|
| 1 | [文件] | [说明] |

### 删除的文件
| # | 文件 | 说明 |
|---|------|------|
| 1 | [文件] | [说明] |
```

## 阶段 2：变更详情

### 2.1 变更类型

```markdown
## 变更详情

### 新功能
| # | 功能 | 文件 | 说明 |
|---|------|------|------|
| 1 | [功能] | [文件] | [说明] |

### Bug 修复
| # | Bug | 文件 | 修复方式 |
|---|-----|------|----------|
| 1 | [Bug] | [文件] | [方式] |

### 重构
| # | 重构 | 文件 | 重构原因 |
|---|------|------|----------|
| 1 | [重构] | [文件] | [原因] |

### 配置变更
| # | 配置 | 文件 | 变更内容 |
|---|------|------|----------|
| 1 | [配置] | [文件] | [内容] |
```
```

### 2.2 详细变更

```markdown
## 详细变更

### 变更 1: [变更标题]
```markdown
**文件**: [文件]
**变更类型**: [类型]

**变更前**:
```[语言]
[变更前的代码]
```

**变更后**:
```[语言]
[变更后的代码]
```

**变更原因**:
[原因]
```
```

### 变更 2: [变更标题]
```markdown
[同上结构]
```
```

## 阶段 3：测试验证

### 3.1 测试覆盖

```markdown
## 测试验证

### 测试类型
| # | 测试类型 | 用例数 | 通过率 | 覆盖文件 |
|---|----------|--------|--------|----------|
| 1 | 单元测试 | [N] | 100% | [文件] |
| 2 | 集成测试 | [N] | 100% | [文件] |
| 3 | E2E 测试 | [N] | 100% | [文件] |

### 测试结果
```markdown
**单元测试**: ✅ 通过 (20/20)
**集成测试**: ✅ 通过 (10/10)
**E2E 测试**: ✅ 通过 (5/5)
```
```

### 3.2 手动测试

```markdown
## 手动测试

### 测试场景
| # | 场景 | 步骤 | 结果 |
|---|------|------|------|
| 1 | [场景] | [步骤] | ✅ 通过 |

### 测试报告
```markdown
**测试环境**: [环境]
**测试时间**: [时间]
**测试人员**: [人员]
**测试结论**: [结论]
```
```

## 阶段 4：影响分析

### 4.1 功能影响

```markdown
## 影响分析

### 功能影响
| # | 影响功能 | 影响类型 | 影响程度 | 说明 |
|---|----------|----------|----------|------|
| 1 | [功能] | [类型] | [程度] | [说明] |

### 数据影响
| # | 数据 | 影响类型 | 说明 |
|---|------|----------|------|
| 1 | [数据] | [类型] | [说明] |
```

### 4.2 风险评估

```markdown
## 风险评估

### 风险清单
| # | 风险 | 影响 | 概率 | 缓解措施 |
|---|------|------|------|----------|
| 1 | [风险] | [影响] | [概率] | [措施] |

### 向后兼容性
```markdown
**API 兼容性**: [兼容/不兼容]
**配置兼容性**: [兼容/不兼容]
**数据迁移**: [需要/不需要]
```
```

## 阶段 5：审查清单

### 5.1 开发者自查

```markdown
## 开发者自查清单

### 代码质量
- [ ] 代码符合编码规范
- [ ] 没有明显的性能问题
- [ ] 没有安全漏洞
- [ ] 错误处理完善

### 测试覆盖
- [ ] 新增代码有测试
- [ ] 边界条件有测试
- [ ] 异常路径有测试
- [ ] 原有测试通过

### 文档更新
- [ ] API 文档已更新
- [ ] 代码注释已更新
- [ ] README 已更新（如需要）
```

### 5.2 审查者检查

```markdown
## 审查者检查清单

### 功能审查
- [ ] 变更符合需求
- [ ] 边界条件处理正确
- [ ] 错误处理合理
- [ ] 日志记录适当

### 代码审查
- [ ] 代码可读性好
- [ ] 没有重复代码
- [ ] 命名规范
- [ ] 函数长度合理

### 安全审查
- [ ] 没有 SQL 注入风险
- [ ] 没有 XSS 风险
- [ ] 敏感信息未泄露
- [ ] 权限控制正确

### 性能审查
- [ ] 没有明显的性能问题
- [ ] 数据库查询合理
- [ ] 资源使用合理
```

## 阶段 6：PR 文档模板

### 6.1 PR 描述模板

```markdown
## PR 描述模板

### 标题格式
```
[类型]: [简短描述]

示例:
feat: 添加用户头像上传功能
fix: 修复订单状态同步问题
refactor: 重构用户认证模块
```

### 完整模板
```markdown
## Summary
[一句话描述变更内容]

## Motivation
### Problem
[描述要解决的问题]

### Solution
[描述解决方案]

## Changes
### Added
- [新增内容]

### Changed
- [变更内容]

### Fixed
- [修复内容]

### Deprecated
- [弃用内容]

### Removed
- [移除内容]

## Breaking Changes
- [破坏性变更]

## Migration Guide
[迁移指南（如有）]

## Testing Done
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] E2E 测试通过（如适用）
- [ ] 手动测试通过（如适用）

## Screenshots
[截图（如有 UI 变更）]

## Checklist
- [ ] 自查完成
- [ ] 文档已更新
- [ ] 测试已添加
- [ ] CI 检查通过
```
```

### 6.2 变更日志条目

```markdown
## 变更日志条目

### 格式
```markdown
## [版本号] - [日期]

### Breaking Changes
- [破坏性变更]

### Added
- [新增功能]

### Changed
- [变更内容]

### Fixed
- [修复内容]

### Security
- [安全相关变更]
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `change_description` | 变更描述 | `"添加用户头像上传功能"` |
| `changes` | 变更内容 | `[{file: "xxx", type: "added", content: "..."}]` |
| `testing_done` | 测试验证 | `[{type: "unit", passed: true, coverage: "90%"}]` |

# Usage Notes

1. **清晰的标题**：使用约定的标题格式
2. **完整的描述**：说明为什么、是什么、怎么做
3. **充分的测试**：提供完整的测试报告
4. **明确的范围**：让审查者知道变更边界
5. **审查清单**：帮助审查者系统化审查

# Example Input

```yaml
change_description: "重构订单支付模块"
changes:
  - file: "src/services/payment.ts"
    type: "modified"
  - file: "src/types/payment.ts"
    type: "modified"
  - file: "tests/payment.test.ts"
    type: "modified"
testing_done:
  - type: "unit"
    passed: true
    coverage: "95%"
  - type: "integration"
    passed: true
```

# Example Output

```yaml
pr_description: |
  ## Summary
  重构订单支付模块，提高代码可维护性和扩展性

  ## Motivation
  解决支付模块耦合度高、难以测试的问题

  ## Changes
  - 重构 PaymentService 类
  - 提取支付策略接口
  - 新增单元测试

  ## Testing Done
  - ✅ 单元测试 100% 通过
  - ✅ 集成测试通过

change_summary: |
  1 个文件重构
  2 个文件修改
  新增测试覆盖率 95%

testing_report:
  unit_tests: "20 passed"
  integration_tests: "5 passed"
  coverage: "95%"

review_checklist:
  - item: "重构是否保持了原有行为"
    status: "需要审查"
  - item: "新接口是否合理"
    status: "需要审查"
```

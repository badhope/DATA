---
id: prompt-task-documentation-for-code-summarize-code-changes-for-humans-v1
name: Summarize Code Changes for Humans
summary: 为代码变更生成人类可读的摘要，用于 PR 描述或变更日志
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: documentation-for-code
tags:
  - documentation
  - changelog
  - PR
  - changes
  - commit
keywords:
  - 变更摘要
  - 变更日志
  - PR描述
  - 提交信息
intent: |
  指导 AI 为代码变更生成人类可读的摘要。
  强调变更摘要必须清晰、简洁、有意义。
  核心原则：好的变更摘要是团队协作和知识共享的重要工具。
applicable_models:
  - "*"
input_requirements:
  - diff_content: string 变更内容
  - change_type: string 变更类型
  - context: string 上下文
output_requirements:
  - change_summary: string 变更摘要
  - detailed_changes: array 详细变更
  - breaking_changes: array 破坏性变更
  - migration_guide: array 迁移指南
tool_requirements:
  - Read tool (读取代码)
  - RunCommand tool (获取 diff)
preconditions:
  - 有代码变更需要生成摘要
anti_patterns:
  - 变更描述过于技术
  - 遗漏重要变更
  - 没有说明影响
failure_modes:
  - 描述不清晰：简洁准确地描述变更
  - 遗漏重要信息：系统化分析变更
  - 没有迁移指南：提供清晰的迁移步骤
self_check: |
  生成前自检：
  □ 是否理解了变更的目的？
  □ 是否识别了所有重要的变更？
  □ 是否说明了变更的影响？
  □ 是否提供了迁移指南？
related_skills:
  - skill-documentation-for-code
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-change-verify-report
related_prompts:
  - prompt-task-documentation-for-code-generate-readme-for-code-module
  - prompt-task-documentation-for-code-write-developer-handoff-note
---

# Context

代码变更摘要对于团队协作非常重要。它帮助团队成员快速了解变更内容、评估影响、准备测试和部署。高质量的变更摘要是代码审查、维护和知识共享的重要工具。本 prompt 的核心目标是：**指导 AI 为代码变更生成清晰、完整、有意义的摘要**。

# Prompt Body

## 阶段 1：变更分析

### 1.1 变更范围

```markdown
## 变更范围

### 变更统计
| 项目 | 内容 |
|------|------|
| 变更类型 | [类型] |
| 修改文件数 | [数量] |
| 新增行数 | [数量] |
| 删除行数 | [数量] |
| 重构行数 | [数量] |

### 变更文件清单
| # | 文件 | 变更类型 | 变更行数 |
|---|------|----------|----------|
| 1 | [文件] | [类型] | [行数] |
```

### 1.2 变更分类

```markdown
## 变更分类

### 按类型分类
| # | 类型 | 文件数 | 说明 |
|---|------|--------|------|
| 1 | 新功能 | [N] | [说明] |
| 2 | Bug 修复 | [N] | [说明] |
| 3 | 重构 | [N] | [说明] |
| 4 | 性能优化 | [N] | [说明] |
| 5 | 文档更新 | [N] | [说明] |
| 6 | 测试更新 | [N] | [说明] |

### 按模块分类
| # | 模块 | 文件数 | 主要变更 |
|---|------|--------|----------|
| 1 | [模块] | [N] | [变更] |
```

### 1.3 变更影响分析

```markdown
## 变更影响分析

### 直接影响
| # | 影响项 | 影响类型 | 说明 |
|---|--------|----------|------|
| 1 | [项] | [类型] | [说明] |

### 间接影响
| # | 影响项 | 影响路径 | 说明 |
|---|--------|----------|------|
| 1 | [项] | [路径] | [说明] |

### 风险评估
| # | 风险 | 影响 | 缓解措施 |
|---|------|------|----------|
| 1 | [风险] | [影响] | [措施] |
```

## 阶段 2：变更摘要编写

### 2.1 摘要结构

```markdown
## 变更摘要

### 一句话摘要
[用一句话描述本次变更的核心目的]

### 详细摘要
```markdown
**变更目的**: [目的]

**主要变更**:
1. [变更1]
2. [变更2]
3. [变更3]

**变更原因**:
[解释为什么需要这些变更]
```
```

### 2.2 变更详情

```markdown
## 详细变更

### 新功能
| # | 功能 | 位置 | 说明 |
|---|------|------|------|
| 1 | [功能] | [位置] | [说明] |

### Bug 修复
| # | Bug | 位置 | 修复方式 |
|---|-----|------|----------|
| 1 | [Bug] | [位置] | [方式] |

### 重构
| # | 重构内容 | 位置 | 重构原因 |
|---|----------|------|----------|
| 1 | [内容] | [位置] | [原因] |

### 性能优化
| # | 优化项 | 位置 | 预期收益 |
|---|--------|------|----------|
| 1 | [项] | [位置] | [收益] |
```

## 阶段 3：破坏性变更

### 3.1 破坏性变更识别

```markdown
## 破坏性变更

### API 变更
| # | API | 变更类型 | 影响 | 迁移建议 |
|---|-----|----------|------|----------|
| 1 | [API] | [类型] | [影响] | [建议] |

### 配置变更
| # | 配置项 | 旧值 | 新值 | 影响 |
|---|--------|------|------|------|
| 1 | [项] | [值] | [值] | [影响] |

### 数据迁移
| # | 数据 | 迁移内容 | 影响 |
|---|------|----------|------|
| 1 | [数据] | [内容] | [影响] |
```

### 3.2 迁移指南

```markdown
## 迁移指南

### 从旧版本迁移
```markdown
**迁移步骤**:
1. [步骤1]
2. [步骤2]
3. [步骤3]

**迁移示例**:
```[语言]
// 旧代码
[旧代码]

// 新代码
[新代码]
```
```

### 注意事项
| # | 注意事项 | 影响 | 建议 |
|---|----------|------|------|
| 1 | [注意] | [影响] | [建议] |

### 回滚计划
| 条件 | 回滚方式 | 验证方式 |
|------|----------|----------|
| [条件] | [方式] | [方式] |
```

## 阶段 4：测试和验证

### 4.1 测试覆盖

```markdown
## 测试覆盖

### 新增测试
| # | 测试 | 覆盖内容 | 位置 |
|---|------|----------|------|
| 1 | [测试] | [内容] | [位置] |

### 修改测试
| # | 测试 | 修改内容 | 位置 |
|---|------|----------|------|
| 1 | [测试] | [内容] | [位置] |

### 手动测试计划
| # | 测试项 | 验证方式 | 负责人 |
|---|--------|----------|--------|
| 1 | [项] | [方式] | [人] |
```

### 4.2 验证清单

```markdown
## 验证清单

### 功能验证
- [ ] [验证项1]
- [ ] [验证项2]

### 回归验证
- [ ] [验证项1]
- [ ] [验证项2]

### 性能验证
- [ ] [验证项1]
- [ ] [验证项2]
```

## 阶段 5：PR/变更日志格式

### 5.1 PR 描述模板

```markdown
## PR 描述模板

### 标题
```
[类型]: [简短描述]
```

### 模板内容
```markdown
## Summary
[变更的一句话摘要]

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
[迁移指南]

## Testing Done
- [测试内容]
- [测试内容]

## Screenshots (if applicable)
[截图]
```
```

### 5.2 变更日志模板

```markdown
## 变更日志模板

### 版本号 (日期)
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

### Deprecated
- [弃用内容]

### Removed
- [移除内容]

### Security
- [安全相关变更]
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `diff_content` | 变更内容 | (git diff 输出) |
| `change_type` | 变更类型 | `"feature"` |
| `context` | 上下文 | `"修复登录 bug"` |

# Usage Notes

1. **简洁清晰**：用简洁的语言描述变更
2. **结构化**：使用标题和列表组织内容
3. **影响说明**：明确说明变更的影响
4. **迁移指南**：为破坏性变更加入迁移指南
5. **示例代码**：提供新旧代码对比示例

# Example Input

```yaml
diff_content: "(git diff 输出)"
change_type: "feature"
context: "新增用户头像上传功能"
```

# Example Output

```yaml
change_summary: |
  新增用户头像上传功能，支持裁剪和压缩

detailed_changes:
  - type: "added"
    feature: "头像上传 API"
    location: "src/api/upload.controller.ts"
  - type: "added"
    feature: "头像裁剪服务"
    location: "src/services/image.service.ts"

breaking_changes: []

migration_guide:
  - step: "配置存储"
    description: "需要配置头像存储路径"
    example: "STORAGE_PATH=/uploads/avatars"
```

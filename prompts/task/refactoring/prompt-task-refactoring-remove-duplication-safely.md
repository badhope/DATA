---
id: prompt-task-refactoring-remove-duplication-safely-v1
name: Remove Duplication Safely
summary: 安全地识别和消除代码重复，强调验证和行为保持
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - duplication
  - dry
  - code-quality
keywords:
  - 消除重复
  - DRY原则
  - 代码复用
  - 重复代码
intent: |
  指导 AI 识别和消除代码重复，同时确保行为安全和可验证。
  强调消除重复不是为了减少行数，而是提高一致性和可维护性。
  核心原则：消除重复必须确保所有调用点行为一致。
applicable_models:
  - "*"
input_requirements:
  - target_files: array 目标文件列表
  - duplication_pattern: string 重复模式
output_requirements:
  - duplication_analysis: object 重复分析
  - removal_plan: array 消除计划
  - risk_assessment: object 风险评估
  - unified_implementation: string 统一实现
tool_requirements:
  - Read tool (读取重复代码)
  - Grep tool (查找所有重复位置)
  - Diff tool (对比差异)
preconditions:
  - 有重复代码需要消除
anti_patterns:
  - 强制消除所有重复
  - 不考虑上下文差异
  - 消除后行为不一致
  - 过早抽象
failure_modes:
  - 差异遗漏：仔细对比所有重复代码
  - 上下文丢失：保持必要的上下文
  - 抽象过度：确保抽象是合理的
self_check: |
  消除前自检：
  □ 是否对比了所有重复代码的差异？
  □ 是否理解了重复代码的上下文？
  □ 统一实现是否能覆盖所有场景？
  □ 是否验证了消除后行为一致？
related_skills:
  - skill-testing
  - skill-code-review
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-refactor-code-without-changing-behavior
  - prompt-task-refactoring-extract-reusable-module
---

# Context

DRY (Don't Repeat Yourself) 是软件工程的基本原则。重复代码会导致维护困难、不一致性问题。但不当的消除重复也可能引入 bug。本 prompt 的核心目标是：**指导 AI 安全地识别和消除代码重复**。

# Prompt Body

## 阶段 1：重复识别

### 1.1 重复发现

```markdown
## 重复发现

### 重复代码位置
| # | 文件 | 行号 | 代码片段 | 长度 |
|---|------|------|----------|------|
| 1 | [文件] | [行号] | [片段] | [N] 行 |
| 2 | [文件] | [行号] | [片段] | [N] 行 |
| 3 | [文件] | [行号] | [片段] | [N] 行 |

### 重复类型
| 类型 | 描述 | 适用消除 |
|------|------|----------|
| 完全相同 | 代码完全一致 | 直接提取 |
| 结构相同 | 结构相同，变量不同 | 参数化 |
| 语义相同 | 功能相同，实现不同 | 统一实现 |

### 重复统计
- 重复片段数: [N]
- 重复代码总行数: [N]
- 代码占比: [百分比]
```

### 1.2 重复对比

```markdown
## 重复代码对比

### 代码片段对比
```markdown
**位置 1**: [文件1:行号]
```[语言]
[代码1]
```

**位置 2**: [文件2:行号]
```[语言]
[代码2]
```

**差异分析**:
| 位置 | 差异点 | 是否本质差异 |
|------|--------|--------------|
| 1 vs 2 | [差异] | [是/否] |
```

### 差异分类
| 差异类型 | 是否需要保留 | 处理方式 |
|----------|--------------|----------|
| 变量名不同 | 否 | 参数化 |
| 上下文相关 | 是 | 保持分离 |
| 业务逻辑差异 | 是 | 保持分离 |
| 纯实现差异 | 否 | 统一 |
```

## 阶段 2：可消除性分析

### 2.1 消除条件

```markdown
## 可消除性分析

### 可以消除的情况
| 条件 | 状态 | 说明 |
|------|------|------|
| 代码完全相同 | ✓ | 可直接提取 |
| 差异仅在变量名 | ✓ | 可参数化 |
| 无上下文依赖 | ✓ | 可提取 |

### 不应消除的情况
| 情况 | 原因 | 建议 |
|------|------|------|
| 上下文本质不同 | 消除会损失语义 | 保持分离 |
| 独立演化可能 | 未来可能分化 | 保持分离 |
| 性能关键代码 | 消除可能影响性能 | 谨慎 |
```

### 2.2 抽象设计

```markdown
## 抽象设计

### 方案 1: 直接提取
**适用条件**: 代码完全相同
**实现**:
```[语言]
[提取后的代码]
```

### 方案 2: 参数化提取
**适用条件**: 结构相同，变量不同
**实现**:
```[语言]
[参数化后的代码]
```

### 方案 3: 策略模式
**适用条件**: 有本质差异但有共同接口
**实现**:
```[语言]
[策略模式实现]
```
```

## 阶段 3：消除计划

### 3.1 风险评估

```markdown
## 风险评估

### 高风险项
| 重复位置 | 风险 | 影响 | 缓解措施 |
|----------|------|------|----------|
| [位置] | [风险] | [影响] | [措施] |

### 中风险项
| 重复位置 | 风险 | 影响 | 缓解措施 |
|----------|------|------|----------|
| [位置] | [风险] | [影响] | [措施] |
```

### 3.2 执行步骤

```markdown
## 执行步骤

### 步骤 1: 提取统一实现
**任务**: 创建统一函数/模块
**产出**: [文件路径]
**验证**: 基本功能可用

### 步骤 2: 更新调用点 1
**任务**: 更新 [位置1]
**变更**: [变更描述]
**验证**: 功能正常

### 步骤 3: 更新调用点 2
**任务**: 更新 [位置2]
**变更**: [变更描述]
**验证**: 功能正常

### 步骤 N: 验证全部
**任务**: 运行全部测试
**验证**: 全部通过
```

## 阶段 4：实施

### 4.1 统一实现

```markdown
## 统一实现

### 代码
```[语言]
[统一后的代码]
```

### 接口设计
| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| [参数] | [类型] | [说明] | [默认值] |

### 返回值
| 类型 | 说明 |
|------|------|
| [类型] | [说明] |
```

### 4.2 调用点更新

```markdown
## 调用点更新

### 更新 1: [位置]
**变更前**:
```[语言]
[变更前代码]
```

**变更后**:
```[语言]
[变更后代码]
```

### 更新 2: [位置]
**变更前**:
```[语言]
[变更前代码]
```

**变更后**:
```[语言]
[变更后代码]
```
```

## 阶段 5：验证

### 5.1 功能验证

```markdown
## 功能验证

### 各调用点验证
| 位置 | 重构前行为 | 重构后行为 | 是否一致 |
|------|------------|------------|----------|
| [位置1] | [行为] | [行为] | [✓/✗] |
| [位置2] | [行为] | [行为] | [✓/✗] |

### 测试验证
- [ ] 所有单元测试通过
- [ ] 所有集成测试通过
- [ ] 手动验证完成
```

### 5.2 结果总结

```markdown
## 消除结果

### 统计
- 消除重复代码行数: [N]
- 减少重复位置: [N] → 1
- 代码行数减少: [百分比]

### 收益
- **一致性**: 所有调用现在使用同一实现
- **可维护性**: 修改只需一处
- **可读性**: 减少代码行数

### 风险
- [已识别风险] → [已缓解]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `target_files` | 目标文件列表 | `["src/utils/format1.ts", "src/utils/format2.ts"]` |
| `duplication_pattern` | 重复模式 | `"日期格式化逻辑"` |

# Usage Notes

1. **差异分析**：先分析重复代码的差异
2. **谨慎抽象**：不是所有重复都需要消除
3. **保持一致**：确保统一实现行为一致
4. **充分验证**：每个调用点都要验证
5. **渐进实施**：逐步替换，降低风险

# Example Input

```yaml
target_files:
  - "src/pages/order/list.tsx"
  - "src/pages/order/detail.tsx"
  - "src/pages/report/index.tsx"
duplication_pattern: "表格列格式化逻辑"
```

# Example Output

```yaml
duplication_analysis:
  duplication_count: 3
  total_lines: 45
  type: "structure_same"
  differences:
    - field_name: "amount"
      format_type: "currency"
    - field_name: "date"
      format_type: "datetime"

removal_plan:
  - step: "提取统一函数"
    target: "src/utils/format.ts"
    function: "formatTableCell"
  - step: "更新调用点"
    locations: 3

risk_assessment:
  level: "low"
  reasons:
    - "格式逻辑完全相同"
    - "无上下文依赖"
    - "有完整测试覆盖"

unified_implementation:
  function: "formatTableCell(value, formatType)"
  location: "src/utils/format.ts"
  coverage: "100% 的重复场景"
```

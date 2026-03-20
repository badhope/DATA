---
id: prompt-tool-use-search-before-concluding-v1
name: Search Before Concluding
summary: 在下结论前进行充分搜索验证，确保结论基于充分的信息而非第一印象
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: search
tags:
  - tool-use
  - search
  - verification
  - evidence
  - conclusion
keywords:
  - 搜索验证
  - 先搜索后结论
  - 信息验证
intent: |
  确保在下结论前进行充分的信息搜索和验证。
  强调多角度验证信息，避免基于片面信息做出判断。
  核心原则：搜索范围要充分，验证角度要多样，结论要有据可依。
applicable_models:
  - "*"
input_requirements:
  - initial_hypothesis: string 初始假设或第一印象
  - search_scope: string 搜索范围 (narrow/broad/exhaustive)
  - verification_angles: array 需要验证的角度
output_requirements:
  - conclusion: string 基于充分验证的结论
  - supporting_evidence: array 支持结论的证据
  - contradicting_evidence: array 与结论矛盾的证据（如有）
  - confidence: string 结论置信度
  - remaining_uncertainties: array 仍存在的不确定因素
tool_requirements:
  - Search tool (全文搜索)
  - Grep tool (代码搜索)
  - Read tool (文件内容读取)
preconditions:
  - 有明确的问题或假设需要验证
anti_patterns:
  - 基于第一印象快速下结论
  - 只搜索一个来源就认为信息充分
  - 忽略与假设矛盾的证据
  - 搜索深度不足就停止
failure_modes:
  - 搜索结果过多：聚焦关键证据，标注其他可能性
  - 证据矛盾：分析矛盾原因，给出平衡解读
  - 信息不足：明确说明需要补充的信息
self_check: |
  下结论前自检：
  □ 是否从多个角度进行了搜索验证？
  □ 是否找到了支持和反对的证据？
  □ 是否搜索了不同的文件类型？
  □ 是否考虑了其他可能的解释？
  □ 结论是否与所有证据一致？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-combine-multiple-results
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
  - workflow-research-to-summary
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-task-repo-analysis-find-key-config-files
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**在形成结论前，先确保信息搜索的充分性和多角度性**。

当需要做出以下判断时，必须先进行充分搜索：
- 技术判断（最佳实践、方案选择）
- 问题根因判断
- 代码逻辑推断
- 架构设计评价

# Prompt Body

## 阶段 1：明确假设和验证目标

### 1.1 假设分析

```markdown
## 初始假设

**假设内容**: [复述你的初始假设]

**假设类型**:
- [ ] 技术判断（如：应该使用 X 方案）
- [ ] 原因判断（如：问题是 X 导致的）
- [ ] 行为判断（如：代码执行 X 路径）
- [ ] 质量判断（如：代码存在 X 问题）

**需要验证的关键点**:
1. [关键点1]
2. [关键点2]
3. [关键点3]
```

### 1.2 验证角度规划

```markdown
## 验证角度

| 角度 | 搜索内容 | 优先级 |
|------|----------|--------|
| 官方文档 | 官方对 X 的定义和建议 | P0 |
| 代码实现 | 项目中 X 的实际实现 | P0 |
| 配置方式 | X 的配置方法和影响 | P1 |
| 错误案例 | X 相关的 bug 和问题 | P1 |
| 替代方案 | 其他可能的方案 | P2 |
```

## 阶段 2：多角度搜索

### 2.1 搜索策略

```markdown
## 搜索策略

### 角度 1：官方文档
```bash
# 搜索官方文档
grep -rn "X" --include="*.md" docs/
find . -name "README*" -exec grep -l "X" {}
```

### 角度 2：代码实现
```bash
# 搜索 X 在代码中的实现
grep -rn "X" --include="*.ts" src/
grep -rn "X" --include="*.js" src/
```

### 角度 3：配置方式
```bash
# 搜索 X 的配置
grep -rn "X" --include="*.json" --include="*.yaml" --include="*.env*"
```

### 角度 4：测试用例
```bash
# 搜索 X 相关的测试
grep -rn "X" --include="*.test.ts" --include="*.spec.ts"
```
```

### 2.2 证据收集

```markdown
## 证据收集

### 支持假设的证据
| # | 证据 | 来源 | 强度 |
|---|------|------|------|
| 1 | [证据1] | [文件/文档] | 强/中/弱 |
| 2 | [证据2] | [文件/文档] | 强/中/弱 |

### 反对假设的证据
| # | 证据 | 来源 | 强度 |
|---|------|------|------|
| 1 | [证据1] | [文件/文档] | 强/中/弱 |
| 2 | [证据2] | [文件/文档] | 强/中/弱 |

### 中性/复杂证据
| # | 证据 | 来源 | 说明 |
|---|------|------|------|
| 1 | [证据1] | [文件/文档] | [说明] |
```

## 阶段 3：证据分析和矛盾处理

### 3.1 证据权重评估

```markdown
## 证据权重分析

### 权重标准
- **强证据**: 官方文档、代码实现、测试用例
- **中证据**: 代码评论、历史提交、配置说明
- **弱证据**: 文件名推断、变量命名、个人理解

### 综合评估
| 证据类型 | 数量 | 总体倾向 |
|----------|------|----------|
| 支持证据 | 5 | 强支持 |
| 反对证据 | 1 | 弱反对 |
| 中性证据 | 2 | 需进一步分析 |
```

### 3.2 矛盾证据分析

```markdown
## 矛盾分析

### 矛盾点 1: [描述矛盾]
- 支持证据: [证据内容]
- 反对证据: [证据内容]
- 分析: [解释为什么存在矛盾]
- 可能的解释:
  1. [解释1]
  2. [解释2]

### 矛盾点 2: ...
```

## 阶段 4：形成结论

### 4.1 结论形成

```markdown
## 结论

### 主要结论
[基于证据的明确结论]

### 结论依据
```markdown
**最强支持证据**:
1. [证据1] - 来自 [来源]
2. [证据2] - 来自 [来源]

**最关键的限制因素**:
- [限制因素1]
- [限制因素2]
```

### 置信度评估
| 维度 | 评分 | 说明 |
|------|------|------|
| 证据充分性 | [1-5] | [说明] |
| 证据一致性 | [1-5] | [说明] |
| 可验证性 | [1-5] | [说明] |
| **综合置信度** | **高/中/低** | |
```

### 4.2 仍存在的不确定因素

```markdown
## 不确定因素

| 因素 | 影响程度 | 建议的验证方式 |
|------|----------|----------------|
| [因素1] | 高/中/低 | [验证方式] |
| [因素2] | 高/中/低 | [验证方式] |
```

### 4.3 替代结论可能性

```markdown
## 替代结论可能性

### 替代方案 1: [描述]
- 支持证据: [证据]
- 成立可能性: [高/中/低]
- 需要验证: [缺失的证据]

### 替代方案 2: ...
```

## 阶段 5：最终验证

```markdown
## 自检清单

- [ ] 是否从多个角度进行了搜索？
- [ ] 支持和反对的证据是否都收集了？
- [ ] 矛盾是否被识别和分析？
- [ ] 结论是否与所有证据一致？
- [ ] 不确定因素是否被明确标注？

## 交付物
1. [x] 多角度搜索结果
2. [x] 证据分析
3. [x] 最终结论及置信度
4. [x] 不确定因素说明
5. [x] 替代结论可能性（如有）
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `initial_hypothesis` | 初始假设 | `"应该使用 Redis 缓存来提升性能"` |
| `search_scope` | 搜索范围 | `broad` |
| `verification_angles` | 验证角度 | `["官方文档", "代码实现", "性能测试"]` |

# Usage Notes

1. **多角度验证**：至少从 3 个不同角度验证
2. **正反证据都要**：不仅找支持的证据，也要找反对的证据
3. **分析矛盾**：有矛盾时要分析原因，不能简单忽略
4. **标注不确定性**：不能确定的部分要明确说明
5. **考虑替代结论**：在给出结论时考虑替代可能性

# Example Input

```yaml
initial_hypothesis: "这个性能问题应该通过增加缓存来解决"
search_scope: "broad"
verification_angles:
  - "当前缓存使用情况"
  - "性能瓶颈实际位置"
  - "其他团队的解决方案"
```

# Example Output

```yaml
conclusion: |
  性能问题的主要瓶颈不在缓存层，而在数据库查询。
  增加缓存层无法有效解决问题，需要优化数据库查询或增加索引。

supporting_evidence:
  - evidence: "APM 显示 80% 的响应时间花在数据库查询"
    source: "监控仪表板"
    strength: "强"
  - evidence: "缓存命中率已达 95%，已接近饱和"
    source: "Redis 监控"
    strength: "强"

contradicting_evidence:
  - evidence: "内存使用率较低，表面有空间增加缓存"
    source: "系统监控"
    strength: "弱"

confidence: "medium"

remaining_uncertainties:
  - uncertainty: "是否有未发现的缓存穿透问题"
    impact: "medium"
    verification: "分析缓存键设计和查询模式"
  - uncertainty: "数据库慢查询是否可以优化"
    impact: "high"
    verification: "审查查询执行计划"
```

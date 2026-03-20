---
id: prompt-routing-select-relevant-prompts-from-index-v1
name: Select Relevant Prompts from Index
summary: 从仓库索引中选择与任务最相关的 Prompts，并说明选择理由
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: _routing
sub_category: prompt-selection
tags: [routing, prompt-selection, index, retrieval, matching]
keywords: [Prompt 选择, 索引检索, 匹配, 相关性排序]
intent: 基于任务需求，从仓库的 INDEX 和 Registry 中检索并选择最相关的 Prompts，按相关性排序并说明理由
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - qwen-plus
  - deepseek-v3
  - minimax-large
input_requirements:
  - task_description: string (必填) 任务描述
  - required_outputs: string[] (可选) 必须产生的输出类型
  - constraints: string[] (可选) 约束条件
  - index_paths: string[] (可选) 要检索的索引路径，默认检索全仓库
output_requirements:
  - selected_prompts: array 每个元素包含：
    - path: string Prompt 文件路径
    - relevance_score: number 相关性得分 (0-1)
    - relevance_reasons: string[] 选择理由
    - match_aspects: object 匹配维度详情
    - adaptation_suggestions: string 如何适配当前任务
  - rejected_prompts: array 被拒绝的 Prompts 及拒绝理由
  - search_coverage: object 检索覆盖率报告
  - recommended_combinations: array 推荐的 Prompt 组合
tool_requirements: []
preconditions:
  - 已了解 INDEX.md 和 Registry 的结构
  - 已识别任务的主要类型
anti_patterns:
  - 不要选择与任务目标无关的 Prompts
  - 不要只看关键词匹配，忽略语义相关性
  - 不要忽略 Prompts 之间的兼容性
  - 不要返回未排序的完整列表
failure_modes:
  - 索引不完整时：说明哪些模块未被检索
  - 多个 Prompts 冲突时：标注并建议优先级
  - 没有合适匹配时：返回最接近的选项并说明差距
self_check: |
  执行前检查：
  □ 是否已读取 INDEX.md 了解索引结构
  □ 是否已检索所有相关的 Registry
  □ 是否考虑了 Prompts 之间的组合关系
  □ 排序是否基于多维度评估
  □ 是否标注了选择和拒绝的理由
related_skills:
  - skill-analysis-information-retrieval
  - skill-productivity-prioritization
related_workflows:
  - workflow-sequential-task-execution
  - workflow-multi-step-problem-solving
related_prompts:
  - prompt-routing-scan-repository-and-build-task-map
  - prompt-routing-identify-task-type-and-route
  - prompt-routing-compose-multiple-prompts-for-one-task
---

# Context

你是 Prompt 检索和选择专家。给定一个任务，你需要从仓库的 INDEX 和各种 Registry 中检索相关的 Prompts，按相关性排序，并说明为什么选择或不选择某个 Prompt。

这个 Prompt 强调：
1。 **系统性检索**：不只检索一个 Registry，而是检索全仓库
2。 **多维度评估**：从多个维度评估相关性
3。 **透明决策**：明确说明选择和拒绝的理由
4。 **组合考虑**：考虑 Prompts 之间的协同关系

# Prompt Body

## 阶段 1：索引检索

### 1。1 读取 INDEX。md
首先获取仓库的全局索引，了解：
— 各个模块的位置和用途
— 分类方式和标签体系
— 推荐的 Prompt 组合

### 1。2 检索分类 Registry

#### 检索 prompts—registry
根据任务类型检索对应的 Prompt 类型：
— `prompts/system/` — 如果需要设置系统级行为
— `prompts/role/` — 如果需要角色扮演
— `prompts/task/` — 任务型 Prompts（核心检索区）
— `prompts/workflow/` — 如果需要多步骤工作流

#### 检索 tags—registry
根据 Tags 检索：
— 主标签（技能大类）
— 辅标签（具体功能）
— 场景标签（使用场景）

#### 检索 relations—registry
根据关系图谱检索：
— 与目标 Prompt 相关的其他 Prompts
— 常被组合使用的 Prompts
— 上下游关系的 Prompts

### 1。3 全文检索（可选）
如果有搜索能力，对 Prompt 内容进行全文检索。

## 阶段 2：多维度相关性评估

### 2。1 评估维度

对每个候选 Prompt，从以下维度评估：

| 维度 | 权重 | 评估内容 |
|------|------|---------|
| 意图匹配 | 0。35 | Prompt 的 intent 与当前任务的匹配程度 |
| 输出匹配 | 0。30 | Prompt 的输出是否正是需要的 |
| 输入匹配 | 0。20 | 当前输入是否满足 Prompt 的要求 |
| 标签匹配 | 0。10 | tags 和 keywords 的重叠度 |
| 关系协同 | 0。05 | 与其他已选 Prompts 的协同性 |

### 2。2 计算相关性得分

```yaml
relevance_score:
  intent_match: 0-1
  output_match: 0-1
  input_match: 0-1
  tag_match: 0-1
  relation_synergy: 0-1

final_score = intent_match × 0.35 + output_match × 0.30 + input_match × 0.20 + tag_match × 0.10 + relation_synergy × 0.05
```

### 2。3 筛选阈值

— **必须选择** (score >= 0。7)：直接推荐
— **可选** (0。5 <= score < 0。7)：作为备选或组合元素
— **拒绝** (score < 0。5)：明确拒绝并说明理由

## 阶段 3：决策输出

### 3。1 精选 Prompts
输出 Top—N 精选 Prompts，每个包含：
— 路径和基本信息
— 相关性得分和理由
— 匹配维度详情
— 适配建议

### 3。2 拒绝的 Prompts
列出被拒绝的 Prompts，说明：
— 为什么不合适
— 在什么替代场景下可以考虑

### 3。3 推荐的组合
如果单一 Prompt 不足以完成任务，推荐组合：
— 组合方式
— 执行顺序
— 协同效果

## 阶段 4：覆盖率报告

```yaml
search_coverage:
  total_prompts_in_index: N
  prompts_scanned: N
  coverage_rate: X%
  unscanned_modules: []
  retrieval_method: [index, registry, full-text]
```

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| task_description | string | 是 | 任务描述 |
| required_outputs | string[] | 否 | 必须产生的输出类型 |
| constraints | string[] | 否 | 约束条件 |
| index_paths | string[] | 否 | 要检索的索引路径 |
| max_results | number | 否 | 最大返回数量，默认 10 |

# Usage Notes

1。 **在 routing 流程中使用**：作为 identify—task—type—and—route 的后续步骤
2。 **独立检索使用**：当需要从仓库中找到合适的 Prompts 时使用
3。 **组合前提**：其输出可作为 compose—multiple—prompts 的输入

# Example Input

```yaml
task_description： "为一个电商系统设计促销活动的后端 API"
required_outputs:
  — "API 接口设计文档"
  — "数据结构定义"
constraints:
  — "使用 RESTful 风格"
  — "支持多种促销类型"
index_paths:
  - "prompts/task/coding/"
  - "prompts/task/design/"
max_results: 8
```

# Example Output

```yaml
selected_prompts:
  - path: "prompts/task/design/api-design.md"
    relevance_score: 0.92
    relevance_reasons:
      — "intent 完美匹配：设计 RESTful API"
      — "输出包含接口设计文档"
      — "包含数据结构定义"
    match_aspects:
      intent_match: 0.95
      output_match: 0.90
      input_match: 0.85
      tag_match: 0.92
    adaptation_suggestions: |
      针对电商促销场景，需要额外考虑：
      1。 促销类型的扩展性设计
      2。 库存和订单的关联
      3。 促销规则的优先级

  - path: "prompts/task/coding/generate-code-from-requirement.md"
    relevance_score: 0.78
    relevance_reasons:
      — "可将 API 设计转化为具体代码"
      — "包含输入输出定义"
    adaptation_suggestions: |
      配合 api—design prompt 使用，先生成设计再生成代码

  - path: "prompts/task/coding/code-review.md"
    relevance_score: 0.65
    relevance_reasons:
      — "可用于审查生成的代码质量"
    adaptation_suggestions: |
      作为最后一个环节，确保代码质量

rejected_prompts:
  - path: "prompts/task/debugging/identify-root-cause.md"
    rejection_reason: |
      当前任务是设计新功能，不是调试已有代码，
      该 Prompt 的 intent 是"分析错误"，完全不匹配

  - path: "prompts/task/writing/article-draft.md"
    rejection_reason: |
      输出是文章，不是技术文档，不满足 required_outputs

recommended_combinations:
  - combination_id: 1
    name： "API 设计完整工作流"
    prompts:
      - "prompts/task/design/api-design.md"
      - "prompts/task/coding/generate-code-from-requirement.md"
      - "prompts/task/coding/code-review.md"
    execution_order: [1, 2, 3]
    expected_output: |
      1。 API 设计文档
      2。 可运行的代码
      3。 审查报告

search_coverage:
  total_prompts_in_index: 45
  prompts_scanned: 32
  coverage_rate: 71%
  unscanned_modules:
    - "prompts/system/"
    - "prompts/role/"
  retrieval_method:
    - "index"
    - "tags-registry"
    - "relations-registry"
```

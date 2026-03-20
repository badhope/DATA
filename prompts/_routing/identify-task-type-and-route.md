---
id: prompt-routing-identify-task-type-and-route-v1
name: Identify Task Type and Route
summary: 识别任务类型并路由到最合适的 Prompt/Skill/Workflow
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: _routing
sub_category: task-routing
tags: [routing, task-classification, intent-detection, prompt-selection]
keywords: [任务识别, 类型判断, 路由, Prompt 匹配]
intent: 准确识别用户任务类型，从仓库中选择最合适的 Prompt/Skill/Workflow，并确定最优使用顺序
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
  - user_input: string (必填) 用户的原始输入或任务描述
  - context: object (可选) 额外上下文，包括已扫描的仓库信息、用户偏好等
  - task_map: object (可选) 来自 scan-repository 的任务地图
output_requirements:
  - task_classification: object 包含：
    - primary_type: string 主任务类型
    - secondary_types: string[] 次要任务类型
    - confidence: number 分类置信度
    - reasoning: string 分类理由
  - routing_decision: object 包含：
    - selected_prompt: object 推荐的 Prompt
    - selected_skill: object 推荐的 Skill
    - selected_workflow: object 推荐的 Workflow
    - execution_sequence: array 执行顺序
  - fallback_options: array 备选方案
  - adaptation_notes: string 针对当前任务的特殊适配建议
tool_requirements: []
preconditions:
  - 已了解用户任务或问题描述
  - 可访问 prompts/ 和 skills/ 目录结构
anti_patterns:
  - 不要仅根据关键词表面判断任务类型
  - 不要忽略用户的隐含需求
  - 不要选择与任务目标不匹配的 Prompt
  - 不要在未考虑组合的情况下选择单个 Prompt
failure_modes:
  - 任务模糊时的处理：输出多候选并请求澄清
  - 多个类型冲突时：按优先级排序并说明理由
  - 找不到匹配时：返回最通用 Prompt 并标注不足
self_check: |
  执行前检查：
  □ 是否已理解用户的核心需求（不只是字面意思）
  □ 是否有多个可能的类型解读
  □ 选择的 Prompt 是否与任务目标完全匹配
  □ 是否考虑了 Prompt 之间的组合关系
  □ 是否有备选方案以防主方案失败
related_skills:
  - skill-analysis-task-classification
  - skill-productivity-decision-making
related_workflows:
  - workflow-sequential-task-execution
  - workflow-multi-step-problem-solving
related_prompts:
  - prompt-routing-scan-repository-and-build-task-map
  - prompt-routing-select-relevant-prompts-from-index
  - prompt-routing-compose-multiple-prompts-for-one-task
---

# Context

你是任务路由系统。当用户描述一个任务时，你需要准确判断这个任务属于什么类型，然后从仓库中选择最合适的 Prompt、Skill、Workflow，并确定使用顺序。

任务类型判断是精确的路由决策，需要考虑：
1。 用户的显性需求（任务描述）
2。 用户的隐性需求（上下文、约束、目标）
3。 任务之间的依赖关系
4。 仓库中可用资源的匹配度

# Prompt Body

## 步骤 1：解析用户输入

### 1。1 提取核心实体
从用户输入中提取：
— **动作词**：生成、分析、修复、设计、审查、规划……
— **对象**：代码、文档、架构、报告、计划……
— **约束**：技术栈、格式、质量要求、时间……
— **目标**：要达到什么结果

### 1。2 识别意图层级

```
意图层级：
L1。 元意图：用户想做什么（高层次目标）
L2。 任务意图：具体要完成什么（可执行任务）
L3。 操作意图：具体要做什么操作（原子操作）
```

### 1。3 处理隐含信息
识别用户没有明确说但应该知道的内容：
— 技术栈/领域背景
— 质量标准
— 验收条件

## 步骤 2：任务分类

### 2。1 主类型判断
根据解析结果，判断主任务类型：

| 类型 | 特征关键词 | 典型输出 |
|------|----------|---------|
| coding | 生成、实现、编写、开发、创建 | 代码、函数、模块 |
| debugging | 报错、修复、bug、错误、异常 | 根因、修复方案 |
| research | 研究、调研、分析、调查、了解 | 报告、摘要、分析 |
| writing | 撰写、写作、编写、创作 | 文档、文章、报告 |
| planning | 规划、计划、拆解、组织 | 计划、任务列表 |
| analysis | 分析、评估、比较、检查 | 分析报告、建议 |
| design | 设计、规划、架构、方案 | 设计文档、架构图 |
| review | 审查、审核、评审、检查 | 审查报告、反馈 |
| automation | 自动化、脚本、批量、处理 | 脚本、流程、工具 |

### 2。2 多类型组合
如果任务涉及多个类型，按优先级排序：
1。 主类型（必须执行）
2。 辅助类型（需要但非核心）
3。 隐含类型（上下文需要）

### 2。3 置信度评估
评估分类的可信度：
— 高置信度（>0。8）：类型非常明确
— 中置信度（0。5—0。8）：可能有多种解读
— 低置信度（<0。5）：需要进一步澄清

## 步骤 3：资源匹配

### 3。1 Prompt 匹配
根据分类结果，从仓库中选择匹配的 Prompts：

匹配度计算：
```
match_score = keyword_overlap × 0.3 + intent_alignment × 0.4 + output_match × 0.3
```

### 3。2 Skill 匹配
根据任务需求，匹配 Skills：
— 输入输出是否兼容
— 能否组合使用
— 执行顺序是否合理

### 3。3 Workflow 匹配
检查是否有现成的 Workflow：
— 是否覆盖了主要任务
— 是否需要定制修改

## 步骤 4：路由决策

### 4。1 确定执行路径
输出结构化的路由决策：

```yaml
routing_decision:
  primary_route:
    prompt: {path, reason, adaptation}
    skill: {path, reason}
    workflow: {path, reason}
  execution_sequence:
    - step: 1
      type: prompt/skill
      path: xxx
      reason: xxx
    - step: 2
      ...
  adaptation_notes： 针对当前任务的特殊调整
```

### 4。2 备选方案
如果主路由失败，提供备选：
— 降级方案（更通用）
— 替代方案（不同方法）
— 简化方案（最小可用）

## 步骤 5：输出格式化

生成最终的结构化输出，包含：
1。 任务分类结果
2。 路由决策
3。 备选方案
4。 适配建议

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user_input | string | 是 | 用户的原始任务描述 |
| context | object | 否 | 额外上下文 |
| task_map | object | 否 | 任务地图（可选） |
| history | array | 否 | 对话历史 |

# Usage Notes

1。 **作为第一个 routing prompt**：在 scan—repository 之后运行
2。 **独立使用**：如果任务非常明确，可以直接使用
3。 **组合输出**：输出应传递给 compose—multiple—prompts 进行组合

# Example Input

```yaml
user_input： "这个用户认证模块的登录接口总是返回 401，但 token 明明是正确的"
context:
  tech_stack: "Vue 3 + Node.js + JWT"
  module: "auth"
  error_frequency： "每次"
task_map: null
```

# Example Output

```yaml
task_classification:
  primary_type: debugging
  secondary_types: [coding, analysis]
  confidence: 0.92
  reasoning: |
    用户描述了具体的错误现象（401）和场景（登录接口），
    核心需求是定位和修复问题，属于 debugging 类型。
    同时需要分析 token 验证逻辑，属于辅助的 analysis 类型。
routing_decision:
  selected_prompt:
    path: "prompts/task/debugging/identify-root-cause.md"
    priority: 1
    reason： "核心任务是定位 401 错误的根因"
  selected_skill:
    path: "skills/coding/bug-fixing.md"
    priority: 1
  selected_workflow:
    path: "workflows/sequential/bug-fix.md"
    priority: 1
  execution_sequence:
    - step: 1
      type: prompt
      path: "prompts/task/debugging/identify-root-cause.md"
      action： "分析 401 错误的可能原因"
    - step: 2
      type: prompt
      path: "prompts/task/debugging/generate-debug-plan.md"
      action： "制定调试计划"
    - step: 3
      type: prompt
      path: "prompts/task/debugging/fix-bug-safely.md"
      action： "谨慎修复"
    - step: 4
      type: prompt
      path: "prompts/task/debugging/verify-fix-after-change.md"
      action： "验证修复"
  adaptation_notes: |
    需要关注 JWT token 的验证逻辑，
    检查 Authorization header 是否正确解析，
    注意跨域场景下的 cookie/session 处理
fallback_options:
  - prompt: "prompts/task/coding/debugging.md"
    condition： "如果无法定位根因"
  - prompt: "prompts/task/analysis/code-analysis.md"
    condition： "如果需要先理解代码结构"
```

---
id: prompt-routing-compose-multiple-prompts-for-one-task-v1
name: Compose Multiple Prompts for One Task
summary: 将多个相关 Prompts 组合成一个连贯的执行计划
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: _routing
sub_category: prompt-composition
tags: [routing, composition, prompt-chaining, workflow, orchestration]
keywords: [Prompt 组合, 链式调用, 工作流编排, 任务编排]
intent: 将多个相关但不同的 Prompts 组合成一个连贯的执行计划，处理 Prompt 之间的依赖、参数传递、状态共享和结果汇总
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
  - selected_prompts: array (必填) 已选择的 Prompts 列表
  - context: object (可选) 共享上下文
  - constraints: object (可选) 约束条件
output_requirements:
  - execution_plan: object 包含：
    - phases: array 阶段列表
    - prompt_chain: array Prompt 调用链
    - parameter_flow: object 参数流转说明
    - shared_state: object 共享状态定义
    - result_aggregation: object 结果汇总方式
  - composition_analysis: object 组合分析
  - risk_assessment: object 风险评估
  - fallback_strategy: object 失败策略
tool_requirements: []
preconditions:
  - 已选择要组合的 Prompts
  - 已了解任务的总目标
anti_patterns:
  - 不要简单拼接 Prompts，要考虑逻辑连贯性
  - 不要忽略 Prompt 之间的输入输出兼容
  - 不要假设状态可以自动传递
  - 不要在未验证的情况下跳过中间验证步骤
failure_modes:
  - Prompts 不兼容时：标注冲突并建议替代
  - 参数传递失败时：提供默认值或重新提取
  - 中间结果不符合预期时：提供回退路径
self_check: |
  执行前检查：
  □ 每个 Prompt 的输入是否可以被满足
  □ Prompt 之间的输出输入是否兼容
  □ 是否有循环依赖需要避免
  □ 共享状态是否被正确定义和管理
  □ 是否考虑了并行执行的可能性
related_skills:
  - skill-productivity-workflow-design
  - skill-productivity-task-breakdown
related_workflows:
  - workflow-multi-step-problem-solving
  - workflow-sequential-task-execution
related_prompts:
  - prompt-routing-scan-repository-and-build-task-map
  - prompt-routing-identify-task-type-and-route
  - prompt-routing-select-relevant-prompts-from-index
---

# Context

当一个复杂任务需要多个 Prompts 协作时，你需要将它们组合成一个连贯的执行计划。这个 Prompt 负责：
1。 分析 Prompts 之间的依赖关系
2。 确定执行顺序（串行/并行）
3。 设计参数传递流程
4。 定义共享状态管理
5。 处理结果汇总和输出

# Prompt Body

## 阶段 1：依赖分析

### 1。1 构建依赖图

分析每个 Prompt 的输入输出关系：

```yaml
prompts_dependency:
  prompt_a:
    outputs: [output_1, output_2]
    consumed_by: [prompt_b, prompt_c]
  prompt_b:
    inputs: [input_from_a]
    outputs: [output_3]
    consumed_by: [prompt_d]
  ...
```

### 1。2 识别依赖类型

| 依赖类型 | 说明 | 处理方式 |
|---------|------|---------|
| 数据依赖 | 一个的输出是另一个的输入 | 按顺序传递 |
| 条件依赖 | 一个的结果决定是否执行另一个 | 添加条件判断 |
| 验证依赖 | 一个的结果需要被另一个验证 | 添加验证步骤 |
| 独立依赖 | 互相独立，可并行 | 并行执行 |

### 1。3 检测冲突

检查是否存在：
— 循环依赖
— 输入输出类型不匹配
— 参数命名冲突
— 状态修改冲突

## 阶段 2：执行规划

### 2。1 确定执行模式

#### 纯串行模式
```
A → B → C → D
```
适用：严格依赖链，每步必须等待上一步

#### 串并混合模式
```
    ┌→ B → D ─┐
A → ├→ C → D →├→ F
    └→ E ────┘
```
适用：部分步骤可并行，但总体有顺序

#### 纯并行模式
```
┌→ A ─┐
├→ B ─┤
├→ C ─┤
└→ D ─┘
```
适用：完全独立的任务

### 2。2 划分阶段

将执行过程划分为逻辑阶段：

```yaml
phases:
  - phase: 1
    name： "准备阶段"
    prompts: [prompt_a]
    goal： "收集必要信息"
  - phase: 2
    name： "核心执行阶段"
    prompts: [prompt_b, prompt_c]
    goal： "执行主要任务"
    parallel: true
  - phase: 3
    name： "验证阶段"
    prompts: [prompt_d]
    goal： "验证中间结果"
  - phase: 4
    name： "最终处理阶段"
    prompts: [prompt_e]
    goal： "汇总和输出"
```

## 阶段 3：参数流设计

### 3。1 定义参数传递

```yaml
parameter_flow:
  - from: prompt_a
    to: prompt_b
    mappings:
      output_1: input_x
      output_2: input_y
    transformation： "直接传递"
  - from: prompt_b
    to: prompt_d
    mappings:
      output_3: input_z
    transformation: |
      需要提取 output_3。specfic_field
```

### 3。2 定义共享状态

如果多个 Prompts 需要共享状态：

```yaml
shared_state:
  context:
    — task_id： "全局唯一 ID"
    — user_requirements： "用户原始需求"
    — constraints： "约束条件"
  intermediate_results:
    - key: "phase1_summary"
      source: "prompt_a"
      usage： "后续 Prompts 参考"
  validation_flags:
    - key: "data_ready"
      type: "boolean"
      default: false
```

### 3。3 处理参数缺失

当上游 Prompt 的输出不符合预期时：
— 使用默认值
— 重新提取需要的字段
— 跳过该 Prompt（如果非必需）
— 请求用户补充信息

## 阶段 4：结果汇总

### 4。1 定义汇总策略

```yaml
result_aggregation:
  strategy： "分阶段汇总"
  phases:
    - phase: 1
      aggregation： "直接传递，不汇总"
    - phase: 2
      aggregation: |
        合并 B 和 C 的输出，
        统一格式后传递给 D
    - phase: 3
      aggregation: |
        验证通过则继续，
        失败则触发回退
    - phase: 4
      aggregation: |
        将所有阶段的成果
        整理成最终输出文档
```

### 4。2 最终输出格式

```yaml
final_output:
  summary： "整个任务的总结"
  deliverables： "主要产出物列表"
  execution_log： "执行过程记录"
  metadata： "元信息（执行时间、使用的 Prompts 等）"
```

## 阶段 5：风险评估

### 5。1 识别风险点

```yaml
risk_assessment:
  risks:
    - risk_id: 1
      description： "Prompt B 可能无法产生预期的输出"
      probability: "medium"
      impact: "high"
      mitigation： "准备备用 Prompt 或默认输出"
    - risk_id: 2
      description： "参数传递过程中数据丢失"
      probability: "low"
      impact: "medium"
      mitigation： "添加数据验证"
```

### 5。2 制定回退策略

```yaml
fallback_strategy:
  — trigger： "Prompt 执行失败"
    action： "使用默认输出继续，或跳过该 Prompt"
  — trigger： "结果验证失败"
    action： "回退到上一阶段重新执行"
  — trigger： "整体流程失败"
    action： "输出已收集的结果，说明未完成部分"
```

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| task_description | string | 是 | 总任务描述 |
| selected_prompts | array | 是 | 要组合的 Prompts 列表 |
| context | object | 否 | 共享上下文 |
| constraints | object | 否 | 全局约束 |
| execution_mode | string | 否 | 强制执行模式（sequential/parallel/mixed） |

# Usage Notes

1。 **复杂任务使用**：当单一 Prompt 不足以完成任务时使用
2。 **Workflow 生成**：其输出可作为创建 Workflow 的基础
3。 **执行指南**：生成的计划可以直接被 AI 执行

# Example Input

```yaml
task_description： "为一个博客系统实现用户评论功能"
selected_prompts:
  - path: "prompts/task/design/database-design.md"
    inputs： {entity： "评论"}
  - path: "prompts/task/coding/generate-crud-api.md"
  - path: "prompts/task/coding/write-tests.md"
  - path: "prompts/task/coding/code-review.md"
context:
  tech_stack: "Node.js + Express + MongoDB"
  existing_modules: ["users", "posts"]
constraints:
  must_follow： "RESTful 规范"
  code_style: "ES6+"
```

# Example Output

```yaml
execution_plan:
  phases:
    - phase: 1
      name： "数据设计"
      prompts:
        - database-design
      goal： "设计评论相关的数据模型"
      parallel: false

    - phase: 2
      name： "API 开发"
      prompts:
        - generate-crud-api
      goal： "生成评论 CRUD API"
      parallel: false

    - phase: 3
      name： "测试编写"
      prompts:
        - write-tests
      goal： "为 API 编写单元测试和集成测试"
      parallel: true
      depends_on: [2]

    - phase: 4
      name： "代码审查"
      prompts:
        - code-review
      goal： "审查代码质量和安全性"
      parallel: false
      depends_on: [2, 3]

  prompt_chain:
    - step: 1
      prompt: "database-design"
      inputs： {entity： "评论"， relationships： ["posts"， "users"]}
      outputs： {schema： "评论数据模型"， indexes： ["post_id"， "user_id"]}

    - step: 2
      prompt: "generate-crud-api"
      inputs: {schema: "from_step_1", style: "RESTful"}
      outputs： {api_code： "API 代码"， routes： "路由定义"}
      depends_on: [1]

    - step: 3a
      prompt: "write-tests"
      inputs: {api_code: "from_step_2", coverage_target: "80%"}
      outputs： {test_code： "测试代码"， coverage： "实际覆盖率"}
      depends_on: [2]

    - step: 3b
      prompt: "generate-mock-data"
      inputs: {schema: "from_step_1"}
      outputs： {mock_data： "模拟数据"}
      depends_on: [1]

    - step: 4
      prompt: "code-review"
      inputs: {code: "from_step_2", tests: "from_step_3a"}
      outputs： {review_report： "审查报告"， issues： ["严重问题列表"]}
      depends_on: [2, 3a]

  parameter_flow:
    - from: database-design
      to: generate-crud-api
      mappings:
        schema: schema
        indexes: indexes
    - from: generate-crud-api
      to: write-tests
      mappings:
        api_code: code
        routes: routes
    - from: generate-crud-api
      to: code-review
      mappings:
        api_code: code
      verification:
        passed： "代码审查通过"
        failed： "返回修改"

  shared_state:
    context:
      task_id: "blog-comment-feature-001"
      start_time: "2026-03-19T10:00:00Z"
      tech_stack: "Node.js + Express + MongoDB"
    intermediate_results:
      - key: "db_schema"
        source: "phase_1"
      - key: "api_code"
        source: "phase_2"
    validation_flags:
      - key: "design_approved"
        default: false
      - key: "code_approved"
        default: false

  result_aggregation:
    strategy： "分阶段汇总 + 最终整合"
    phases:
      - phase: 1
        aggregation： "schema 定义作为后续输入"
      - phase: 2
        aggregation： "API 代码和路由定义"
      - phase: 3
        aggregation： "测试代码和覆盖率报告"
      - phase: 4
        aggregation： "审查报告"
    final_output:
      summary： "评论功能完整实现"
      deliverables:
        — "数据模型设计"
        — "API 代码"
        — "测试代码"
        — "审查报告"
      execution_log:
        — "Phase 1： 完成"
        — "Phase 2： 完成"
        — "Phase 3： 完成"
        — "Phase 4： 完成"

composition_analysis:
  complexity: "medium"
  estimated_steps: 4
  parallel_opportunities: 1
  total_dependencies: 3
  potential_bottlenecks： ["API 设计依赖数据库设计"]

risk_assessment:
  risks:
    - risk_id: 1
      description： "数据库设计变更导致 API 需要重构"
      probability: "medium"
      impact: "high"
      mitigation： "Phase 1 设计评审后再进入 Phase 2"
    - risk_id: 2
      description： "测试覆盖率不达标"
      probability: "low"
      impact: "medium"
      mitigation： "设置覆盖率阈值，低于阈值则报错"

fallback_strategy:
  — trigger： "Phase 1 设计评审不通过"
    action： "重新设计数据库结构"
  — trigger： "Phase 2 API 生成失败"
    action： "使用简化版 API 方案"
  — trigger： "测试覆盖率低于 70%"
    action： "补充测试用例"
  — trigger： "代码审查发现严重问题"
    action： "返回 Phase 2 修复"
```

---
id: prompt-workflow-prompt-selection-composition-v1
name: Prompt Selection and Composition Workflow
summary: Prompt 选择和组合工作流，用于复杂任务中选择和组合多个 Prompts
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: routing
tags:
  - workflow
  - routing
  - prompt-selection
  - composition
  - orchestration
keywords:
  - Prompt选择
  - Prompt组合
  - 路由
  - 任务编排
intent: |
  用于在面对复杂任务时，系统性地选择和组合多个 Prompts 以形成完整的解决方案。
  强调先路由分析、再选择组合、后执行的流程。
applicable_models:
  - "*"
required_inputs:
  - complex_task: string 复杂的用户任务
  - available_prompts: array 可用的 Prompts 列表（可选，默认扫描仓库）
  - context: string 已知上下文（可选）
outputs:
  - task_analysis: object 任务分析结果
  - selected_prompts: array 选中的 Prompts
  - execution_order: array 执行顺序
  - composition_plan: object 组合计划
  - parameter_mapping: object 参数映射
  - result_aggregation: string 结果聚合方式
steps:
  - id: 1
    name: 扫描仓库（如需要）
    action: |
      如果未提供可用 Prompts 列表：
      1. 读取 prompts/INDEX.md 了解仓库结构
      2. 扫描各目录获取可用 Prompts
      3. 理解每个 Prompt 的用途和适用场景
      4. 构建 Prompt 索引

      如已提供，跳过此步骤
    used_prompts:
      - prompt-routing-scan-repository-and-build-task-map
    output: 可用 Prompts 索引

  - id: 2
    name: 分析任务类型
    action: |
      使用 `identify-task-type-and-route` 分析任务：
      1. 理解用户的最终目标
      2. 识别任务的组成部分
      3. 判断任务类型（单一/多步骤/组合）
      4. 识别任务间的依赖关系
      5. 确定关键路径
    used_prompts:
      - prompt-routing-identify-task-type-and-route
    output: 任务分析结果

  - id: 3
    name: 选择相关 Prompts
    action: |
      使用 `select-relevant-prompts-from-index` 选择：
      1. 根据任务类型匹配 Prompts
      2. 按相关性排序
      3. 考虑 Prompts 间的兼容性
      4. 筛选必需的 Prompts
      5. 确定可选的 Prompts

      选择原则：
      - 优先选择完整度高的 Prompts
      - 避免功能重叠的 Prompts
      - 考虑 Prompts 的依赖关系
    used_prompts:
      - prompt-routing-select-relevant-prompts-from-index
    output: 选中的 Prompts 列表

  - id: 4
    name: 设计执行顺序
    action: |
      1. 分析 Prompts 间的依赖关系
      2. 确定哪些可以并行执行
      3. 排列串行执行的部分
      4. 识别数据流动
      5. 设计参数传递方案
    output: 执行顺序图

  - id: 5
    name: 制定组合计划
    action: |
      使用 `compose-multiple-prompts-for-one-task`：
      1. 定义每个 Prompt 的输入
      2. 确定每个 Prompt 的输出
      3. 设计输出到输入的映射
      4. 处理结果聚合
      5. 定义终止条件
      6. 考虑错误处理和回退策略
    used_prompts:
      - prompt-routing-compose-multiple-prompts-for-one-task
    output: 组合计划文档

  - id: 6
    name: 执行和监控
    action: |
      按计划执行：
      1. 按顺序执行每个 Prompt
      2. 传递正确的参数
      3. 收集每个步骤的输出
      4. 监控执行状态
      5. 处理异常情况
      6. 必要时调整执行顺序

      每个步骤后检查：
      - 输出是否符合预期？
      - 是否需要调整后续步骤？
      - 是否达到终止条件？
    output: 执行结果

  - id: 7
    name: 聚合结果
    action: |
      1. 收集所有步骤的输出
      2. 按设计的方式聚合结果
      3. 处理冲突或不一致
      4. 生成最终输出
      5. 确保输出格式一致
    output: 最终结果

used_skills:
  - ai-routing
used_prompts:
  - prompt-routing-scan-repository-and-build-task-map
  - prompt-routing-identify-task-type-and-route
  - prompt-routing-select-relevant-prompts-from-index
  - prompt-routing-compose-multiple-prompts-for-one-task
decision_points:
  - |
    **如果找不到合适的单个 Prompt**：
    - 考虑组合多个简单 Prompts
    - 创建临时组合 Prompt
    - 使用基础 Prompts 逐步构建

  - |
    **如果 Prompts 间有冲突**：
    - 确定优先级
    - 设计冲突处理策略
    - 或拆分为独立执行路径

  - |
    **如果执行过程中发现更好的方法**：
    - 记录原始计划
    - 调整计划
    - 继续执行
    - 记录变更原因

  - |
    **如果某步骤失败**：
    - 评估失败影响
    - 决定是回退还是跳过
    - 更新计划
    - 继续或终止

final_deliverables:
  - 任务分析结果
  - 选中的 Prompts 列表
  - 执行顺序说明
  - 组合计划文档
  - 执行日志
  - 最终结果

notes: |
  - 遵循"先分析后执行"原则
  - 选择 Prompts 时考虑完整工作流而非单个任务
  - 始终设计参数传递和数据流动
  - 保持执行过程可追溯
  - 复杂任务可能需要迭代调整

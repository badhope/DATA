---
id: prompt-workflow-vague-request-to-action-v1
name: Vague Request to Action Workflow
summary: 模糊需求到明确行动工作流，用于将不清晰的需求转化为可执行的任务计划
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: planning
tags:
  - workflow
  - planning
  - requirements
  - clarification
  - task-breakdown
keywords:
  - 需求分析
  - 任务拆解
  - 模糊需求
  - 行动计划
intent: |
  用于将模糊、不完整或模糊的需求转化为清晰、可执行的任务计划。
  通过系统性的提问、分析和验证，确保最终计划符合用户期望。
applicable_models:
  - "*"
required_inputs:
  - vague_request: string 用户表达的模糊需求
  - context: string 已知上下文（可选）
  - constraints: string 约束条件（可选）
outputs:
  - clarified_requirements: object 澄清后的需求
  - questions: array 需要澄清的问题
  - assumptions: array 做出的假设
  - proposed_plan: object 建议的执行计划
  - acceptance_criteria: array 验收标准
  - risk_areas: array 风险区域
steps:
  - id: 1
    name: 理解表面需求
    action: |
      1. 记录用户的原始需求描述
      2. 提取已知的信息
      3. 识别明确的部分
      4. 列出缺失的关键信息
      5. 判断需求的紧急程度和重要性
    output: 初步需求分析

  - id: 2
    name: 识别缺失信息
    action: |
      分析需求中缺失的关键要素：
      1. **目标**：用户想达成什么结果？
      2. **范围**：具体包括什么？
      3. **约束**：有什么限制条件？
      4. **质量**：如何判断成功？
      5. **优先级**：什么是必须有的？
      6. **时间**：什么时候需要？
      7. **资源**：有什么可用资源？

      标记缺失信息的严重程度
    output: 缺失信息清单

  - id: 3
    name: 提出澄清问题
    action: |
      针对缺失信息，向用户提出具体问题：
      1. 使用封闭式问题确认具体细节
      2. 使用开放式问题探索更多可能性
      3. 提供选项帮助用户选择
      4. 标注每个问题的优先级

      示例问题模式：
      - "你希望 XXX 还是 YYY？"
      - "对于 XXX，你的优先级是...？"
      - "如果遇到 XXX 情况，你希望怎么处理？"
    output: 澄清问题清单

  - id: 4
    name: 补充假设
    action: |
      基于常见模式和专业判断，在用户确认前：
      1. 列出合理的假设
      2. 说明假设的依据
      3. 标注假设的风险
      4. 准备验证假设的方法
      5. 如果假设错误，准备替代方案
    output: 假设清单

  - id: 5
    name: 制定初步计划
    action: |
      在获得足够信息后（或基于合理假设）：
      1. 使用 `create-execution-plan` 制定计划
      2. 使用 `break-down-task-into-subtasks` 拆解任务
      3. 定义里程碑和验收标准
      4. 识别关键路径和风险点
      5. 估算资源和时间
    used_prompts:
      - prompt-task-planning-create-execution-plan
      - prompt-task-planning-break-down-task-into-subtasks
    output: 初步执行计划

  - id: 6
    name: 验证计划
    action: |
      与用户验证计划：
      1. 展示完整的计划概览
      2. 列出已确认和假设的内容
      3. 请求用户确认
      4. 根据反馈调整计划
      5. 最终确认验收标准
    output: 验证后的计划

used_skills:
  - planning
used_prompts:
  - prompt-task-planning-create-execution-plan
  - prompt-task-planning-break-down-task-into-subtasks
decision_points:
  - |
    **如果用户无法澄清关键问题**：
    - 基于合理假设继续
    - 提供多个方案选项
    - 建议先做探索性工作

  - |
    **如果需求相互矛盾**：
    - 指出矛盾之处
    - 帮助用户理清优先级
    - 建议分步实施

  - |
    **如果超出能力范围**：
    - 明确说明
    - 建议可以协助的部分
    - 指出需要外部资源的地方

  - |
    **如果时间/资源有限**：
    - 确定最小可行版本
    - 建议分阶段交付
    - 记录未完成的部分

final_deliverables:
  - 澄清后的需求文档
  - 需要澄清的问题清单
  - 假设清单（含风险标注）
  - 初步执行计划
  - 验收标准
  - 风险区域说明

notes: |
  - 不要假设用户知道他们想要什么
  - 通过提问引导用户思考
  - 始终区分事实和假设
  - 记录所有决策过程便于追溯
  - 最终确保双方对交付物有一致理解

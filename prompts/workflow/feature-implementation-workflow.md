---
id: prompt-workflow-feature-implementation-v1
name: Feature Implementation Workflow
summary: 功能实现工作流，从需求到完整功能交付的标准化流程
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: development
tags:
  - workflow
  - feature
  - implementation
  - development
  - coding
keywords:
  - 功能开发
  - 需求实现
  - 编码
  - 开发流程
intent: |
  用于从需求或规格说明开始，通过标准化的开发流程实现完整功能。
  包括需求分析、技术方案设计、分步实现、测试编写和文档更新的完整流程。
applicable_models:
  - "*"
required_inputs:
  - feature_requirement: string 功能需求描述
  - acceptance_criteria: string 验收标准（可选）
  - existing_context: string 现有代码上下文（可选）
  - constraints: string 约束条件（可选）
outputs:
  - technical_spec: object 技术规格说明
  - implementation_plan: array 分步实施计划
  - code_deliverables: array 交付的代码文件
  - test_cases: array 测试用例
  - documentation_updates: array 文档更新清单
  - verification_results: object 验证结果
steps:
  - id: 1
    name: 理解需求
    action: |
      1. 详细阅读功能需求
      2. 识别用户故事和使用场景
      3. 明确输入输出要求
      4. 识别与现有系统的交互点
      5. 列出验收标准
    output: 需求理解摘要

  - id: 2
    name: 分析现有代码
    action: |
      如果是修改现有功能：
      1. 找到相关的现有实现
      2. 理解现有的代码结构和模式
      3. 识别需要扩展或修改的点
      4. 理解现有的测试覆盖
    used_prompts:
      - prompt-task-repo-analysis-analyze-repository-structure
    output: 现有代码分析

  - id: 3
    name: 制定技术方案
    action: |
      1. 设计数据结构
      2. 定义函数接口
      3. 确定使用的设计模式
      4. 识别潜在的技术风险
      5. 考虑向后兼容性和扩展性
    output: 技术规格文档

  - id: 4
    name: 拆分任务
    action: |
      使用 `break-down-task-into-subtasks` 拆分为可执行的小任务：
      1. 按依赖关系排序
      2. 识别可以并行开发的部分
      3. 估算每个子任务的复杂度
      4. 确定测试编写时机
    used_prompts:
      - prompt-task-planning-break-down-task-into-subtasks
    output: 任务分解清单

  - id: 5
    name: 实现核心逻辑
    action: |
      按计划逐步实现：
      1. 创建必要的文件结构
      2. 实现核心数据和类型定义
      3. 实现主要业务逻辑
      4. 确保代码符合项目规范
    used_prompts:
      - prompt-task-coding-implement-feature-from-spec
    output: 核心代码

  - id: 6
    name: 编写测试
    action: |
      1. 编写单元测试覆盖核心逻辑
      2. 编写集成测试覆盖关键路径
      3. 测试边界条件和异常情况
      4. 确保测试可重复执行
    output: 测试代码

  - id: 7
    name: 更新文档
    action: |
      1. 更新 README（如果需要）
      2. 添加必要的代码注释
      3. 更新 API 文档（如果涉及）
      4. 记录重大决策和原因
    output: 更新的文档

  - id: 8
    name: 验证和 Review
    action: |
      1. 运行所有测试确保通过
      2. 验证功能符合验收标准
      3. 检查代码质量和风格
      4. 审查潜在的安全问题
      5. 确认无性能问题
    used_prompts:
      - prompt-task-coding-review-code-for-quality
    output: 验证报告

used_skills:
  - coding
  - planning
  - debugging
used_prompts:
  - prompt-task-coding-implement-feature-from-spec
  - prompt-task-coding-review-code-for-quality
  - prompt-task-planning-break-down-task-into-subtasks
  - prompt-task-planning-create-execution-plan
decision_points:
  - |
    **如果需求不明确**：
    - 请求补充需求细节
    - 提供多个可能的设计方案供选择
    - 先实现最小可行版本

  - |
    **如果与现有代码冲突**：
    - 评估兼容性影响
    - 设计适配层
    - 考虑渐进式迁移方案

  - |
    **如果测试难以编写**：
    - 评估是否需要重构以提高可测试性
    - 考虑使用 mock 对象
    - 至少保证关键路径可测试

  - |
    **如果时间有限**：
    - 优先实现核心功能
    - 标记技术债务
    - 计划后续迭代

final_deliverables:
  - 技术规格文档
  - 完整实现代码
  - 测试用例
  - 更新的文档
  - 验证报告

notes: |
  - 功能实现应遵循项目的代码规范
  - 始终编写测试，不跳过测试步骤
  - 保持代码简洁，避免过度工程
  - 记录重大设计决策
  - 确保最终验证满足验收标准

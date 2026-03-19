---
id: prompt-workflow-repo-reading-to-change-plan-v1
name: Repo Reading to Change Plan Workflow
summary: 仓库阅读到变更计划工作流，用于理解代码后制定修改方案
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: planning
tags:
  - workflow
  - planning
  - code-understanding
  - change-plan
  - refactoring
keywords:
  - 代码理解
  - 变更计划
  - 重构
  - 修改方案
intent: |
  用于在充分理解代码仓库后，制定针对性的修改方案。
  区别于纯分析工作流，此工作流侧重于"理解后如何修改"的规划能力。
applicable_models:
  - "*"
required_inputs:
  - repo_path: string 仓库路径
  - change_objective: string 修改目标（功能新增/重构/优化/Bug修复）
  - change_scope: string 修改范围（全局/模块/文件级）
  - constraints: string 约束条件（可选）
outputs:
  - code_analysis: object 代码分析结果
  - change_plan: array 变更计划
  - risk_assessment: array 风险评估
  - implementation_order: array 实施顺序
  - verification_plan: array 验证计划
  - rollback_considerations: string 回滚考虑
steps:
  - id: 1
    name: 分析仓库结构
    action: |
      1. 理解整体项目结构
      2. 定位需要修改的代码区域
      3. 理解相关模块的职责
      4. 识别与其他模块的依赖关系
    used_prompts:
      - prompt-task-repo-analysis-analyze-repository-structure
    output: 仓库分析报告

  - id: 2
    name: 深入分析目标代码
    action: |
      针对需要修改的代码区域：
      1. 读取相关源文件
      2. 理解代码逻辑和数据流
      3. 识别关键的函数和类
      4. 理解现有设计模式
      5. 标记需要修改的具体位置
    used_prompts:
      - prompt-task-repo-analysis-summarize-project-architecture
    output: 目标代码分析

  - id: 3
    name: 制定变更方案
    action: |
      1. 明确变更的具体内容
      2. 设计修改方案（最小变更原则）
      3. 考虑不同的实现路径
      4. 评估每个方案的优缺点
      5. 确定最终方案
    output: 变更方案文档

  - id: 4
    name: 拆分实施步骤
    action: |
      将变更拆分为可执行的步骤：
      1. 按依赖关系排序
      2. 确定每步的输入输出
      3. 估算每步的工作量
      4. 识别需要同时修改的相关文件
    used_prompts:
      - prompt-task-planning-break-down-task-into-subtasks
    output: 实施步骤清单

  - id: 5
    name: 风险评估
    action: |
      1. 识别每步的潜在风险
      2. 评估影响范围（功能/性能/安全）
      3. 制定风险缓解措施
      4. 确定需要特别注意的步骤
      5. 准备回滚方案
    output: 风险评估报告

  - id: 6
    name: 制定验证计划
    action: |
      1. 确定每步完成后的验证点
      2. 定义最终验收标准
      3. 计划如何验证无回归
      4. 准备必要的测试用例
    output: 验证计划

used_skills:
  - repo-analysis
  - planning
used_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-summarize-project-architecture
  - prompt-task-planning-break-down-task-into-subtasks
  - prompt-task-planning-create-execution-plan
decision_points:
  - |
    **如果变更影响范围超出预期**：
    - 重新评估范围
    - 考虑分阶段实施
    - 与相关方确认变更必要性

  - |
    **如果存在高风险变更**：
    - 考虑替代方案
    - 确保有回滚能力
    - 可能需要额外 review

  - |
    **如果依赖关系复杂**：
    - 绘制依赖图
    - 确定正确的修改顺序
    - 标记需要同时修改的文件组

  - |
    **如果测试覆盖不足**：
    - 先补充测试
    - 或在修改时同步补充测试
    - 标记为技术债务

final_deliverables:
  - 代码分析报告
  - 变更计划文档
  - 风险评估报告
  - 实施顺序说明
  - 验证计划

notes: |
  - 此工作流强调"理解后再规划"，不急于动手
  - 变更计划应具体到文件和函数级别
  - 始终评估风险并准备回滚方案
  - 验证计划应覆盖功能验证和回归测试
  - 保持文档化便于后续 review

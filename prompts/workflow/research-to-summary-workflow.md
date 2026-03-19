---
id: prompt-workflow-research-to-summary-v1
name: Research to Summary Workflow
summary: 研究到摘要工作流，用于系统性地进行主题研究并生成结构化报告
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: research
tags:
  - workflow
  - research
  - investigation
  - summary
  - analysis
keywords:
  - 研究
  - 调研
  - 报告
  - 分析
  - 摘要
intent: |
  用于系统性地进行主题研究，从收集信息到分析整理再到生成结构化摘要的完整流程。
  适用于技术选型、方案评估、问题调研等需要深度研究的任务。
applicable_models:
  - "*"
required_inputs:
  - research_topic: string 研究主题
  - research_questions: array 具体的研究问题（可选）
  - scope: string 研究范围（可选）
  - depth: string 研究深度（概述/详细/全面）
outputs:
  - research_brief: object 研究简报
  - information_gathered: object 收集的信息
  - analysis: object 分析结果
  - comparison: object 比较分析（如果适用）
  - recommendations: array 建议
  - summary: string 执行摘要
  - uncertainties: array 不确定性问题
steps:
  - id: 1
    name: 准备研究简报
    action: |
      使用 `prepare-research-brief` 制定研究计划：
      1. 明确研究背景和目的
      2. 列出具体的研究问题
      3. 确定研究范围和深度
      4. 规划信息收集方法
      5. 定义交付物和格式
    used_prompts:
      - prompt-task-research-prepare-research-brief
    output: 研究简报

  - id: 2
    name: 收集信息
    action: |
      按简报计划收集信息：
      1. 官方文档和规格
      2. 技术博客和教程
      3. GitHub 仓库和代码示例
      4. 学术论文和研究
      5. 专家观点和经验分享
      6. 社区讨论和常见问题

      对每类信息源：
      - 记录来源和可信度
      - 提取关键信息
      - 标记矛盾或不一致之处
    output: 信息收集清单

  - id: 3
    name: 整理和分类
    action: |
      1. 去除重复和无关信息
      2. 按主题分类整理
      3. 识别信息之间的关联
      4. 创建信息结构图
      5. 标记信息完整度
    output: 整理后的信息

  - id: 4
    name: 分析和比较
    action: |
      如果是技术选型或方案比较：
      1. 建立比较维度
      2. 评估每个选项
      3. 制作对比表
      4. 识别各选项的优缺点
      5. 确定评估权重

      如果是问题研究：
      1. 分析根本原因
      2. 识别影响因素
      3. 评估可能的解决方案
    output: 分析报告

  - id: 5
    name: 生成建议
    action: |
      基于分析结果：
      1. 提出具体建议
      2. 说明建议的依据
      3. 指出潜在风险
      4. 提供替代方案
      5. 考虑实施可行性
    output: 建议清单

  - id: 6
    name: 撰写报告
    action: |
      生成结构化报告：
      1. 执行摘要（1-2段）
      2. 研究背景
      3. 主要发现
      4. 详细分析
      5. 建议
      6. 风险和限制
      7. 后续行动建议

      确保：
      - 语言清晰简洁
      - 结构逻辑清晰
      - 区分事实和观点
      - 标注不确定性
    output: 最终研究报告

used_skills:
  - research
  - planning
used_prompts:
  - prompt-task-research-prepare-research-brief
  - prompt-task-planning-create-execution-plan
decision_points:
  - |
    **如果信息不足**：
    - 标记信息缺口
    - 调整研究范围
    - 标注不确定性程度
    - 建议进一步研究的方向

  - |
    **如果发现矛盾信息**：
    - 分析矛盾的可能原因
    - 标注争议点
    - 尝试通过权威来源验证

  - |
    **如果研究范围需要调整**：
    - 与发起人确认
    - 调整简报
    - 记录调整原因

  - |
    **如果发现重大风险**：
    - 单独列出风险分析
    - 提供缓解建议
    - 确保建议有充分依据

final_deliverables:
  - 研究简报
  - 信息收集清单
  - 分析报告
  - 结构化建议
  - 最终研究报告
  - 执行摘要

notes: |
  - 研究过程应保持客观，区分事实和观点
  - 始终标注信息的可信度和来源
  - 不确定性问题应明确指出，不要掩盖
  - 报告应适合决策者使用
  - 保留研究过程记录便于追溯

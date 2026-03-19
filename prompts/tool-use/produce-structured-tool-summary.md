---
id: prompt-tool-use-produce-structured-tool-summary-v1
name: Produce Structured Tool Summary
summary: 生成结构化工具摘要，强调在复杂任务后整理和归纳工具使用结果
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: summary
tags:
  - tool-use
  - summary
  - structured
  - documentation
  - organize
keywords:
  - 结构化摘要
  - 工具总结
  - 结果整理
  - 文档化
intent: |
  用于在完成复杂的多步骤工具使用任务后，
  系统性地整理和归纳工具使用的过程和结果，生成结构化的摘要。
applicable_models:
  - "*"
required_inputs:
  - task_objective: string 任务目标
  - tool_usages: array 工具使用记录
  - results: array 各工具的结果
  - final_outcome: string 最终结果
outputs:
  - summary_structure: object 结构化摘要
  - key_findings: array 关键发现
  - data_collected: array 收集的数据
  - issues_encountered: array 遇到的问题
  - recommendations: array 建议
steps:
  - id: 1
    name: 整理工具使用记录
    action: |
      1. 收集所有工具使用的记录
      2. 按执行顺序排列
      3. 记录每个工具的输入输出

      记录格式：
      ```markdown
      步骤 [N]: [工具名称]
      - 输入: [使用的输入]
      - 输出: [输出摘要]
      - 结果: [成功/失败/部分成功]
      ```
    output: 工具使用时间线

  - id: 2
    name: 提取关键发现
    action: |
      从各工具结果中提取关键发现：
      1. 逐个回顾工具输出
      2. 识别关键信息点
      3. 排除噪音和不相关信息
      4. 按重要性排序

      发现分类：
      - **直接答案**：直接回答问题的信息
      - **证据**：支持结论的数据
      - **新信息**：扩展认知的信息
      - **问题**：发现的新问题

      对每个发现：
      - 描述发现内容
      - 标注来源（哪个工具）
      - 评估可信度
    output: 关键发现列表

  - id: 3
    name: 整理收集的数据
    action: |
      1. 收集所有结构化数据
      2. 去除重复
      3. 按类型分类
      4. 整理成表格或列表

      数据分类：
      - **配置数据**：设置和参数
      - **状态数据**：当前状态
      - **统计信息**：数量、数值
      - **关系数据**：文件、模块关系

      格式选择：
      - 适合表格的用表格
      - 适合列表的用列表
      - 适合树的用树形结构
    output: 整理后的数据

  - id: 4
    name: 总结遇到的问题
    action: |
      1. 回顾工具使用过程中遇到的问题
      2. 分析问题的原因
      3. 记录解决方案（如有）

      问题分类：
      - **执行问题**：工具无法执行
      - **输出问题**：输出不符合预期
      - **理解问题**：对输出理解有误
      - **技术问题**：环境或权限问题

      对每个问题：
      - 描述问题
      - 分析原因
      - 解决方案
      - 预防建议
    output: 问题总结

  - id: 5
    name: 生成结构化摘要
    action: |
      整合以上内容，生成结构化摘要：

      ```markdown
      # 工具使用摘要

      ## 任务目标
      [简要描述]

      ## 执行概览
      - 使用的工具数量：[N]
      - 总执行时间：[如适用]
      - 成功率：[X/Y]

      ## 关键发现
      1. [发现1]
      2. [发现2]
      ...

      ## 数据汇总
      [整理后的关键数据]

      ## 遇到的问题
      [问题及解决方案]

      ## 结论
      [最终结论]

      ## 建议
      [如有时]
      ```
    output: 结构化摘要

  - id: 6
    name: 审核和完善
    action: |
      1. 检查摘要的完整性
      2. 确保关键信息不遗漏
      3. 检查逻辑连贯性
      4. 优化表达

      检查项：
      - [ ] 任务目标明确？
      - [ ] 关键发现完整？
      - [ ] 数据整理清晰？
      - [ ] 问题总结准确？
      - [ ] 结论有依据？
    output: 最终摘要

used_skills: []
used_prompts: []
decision_points:
  - |
    **如果工具有失败**：
    - 明确标注失败及原因
    - 说明是否影响最终结论
    - 是否需要重试

  - |
    **如果数据不一致**：
    - 指出不一致之处
    - 分析可能的原因
    - 提供可能的解释

  - |
    **如果发现新问题**：
    - 记录发现过程
    - 评估是否与原任务相关
    - 建议后续处理

final_deliverables:
  - 结构化摘要
  - 关键发现列表
  - 收集的数据
  - 遇到的问题
  - 建议（如有）

notes: |
  - 核心原则：整理比堆砌更重要
  - 关键信息突出，噪音去除
  - 结构清晰，便于阅读
  - 问题诚实记录，不掩盖
  - 结论基于证据

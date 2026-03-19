---
id: prompt-workflow-change-verify-and-report-v1
name: Change Verify and Report Workflow
summary: 变更验证和报告工作流，用于代码变更后的系统性验证和报告生成
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: verification
tags:
  - workflow
  - verification
  - testing
  - reporting
  - change-review
keywords:
  - 变更验证
  - 测试
  - 报告
  - 代码审查
  - 回归测试
intent: |
  用于在代码变更后进行系统性的验证，确保变更正确且未引入回归，
  并生成结构化的变更报告。
applicable_models:
  - "*"
required_inputs:
  - change_summary: string 变更摘要
  - changed_files: array 变更的文件列表
  - change_purpose: string 变更目的
  - related_tests: array 相关测试文件
outputs:
  - change_analysis: object 变更分析
  - test_results: object 测试结果
  - regression_analysis: array 回归分析
  - verification_report: object 验证报告
  - risk_assessment: object 风险评估
  - final_report: string 最终报告
steps:
  - id: 1
    name: 分析变更内容
    action: |
      1. 列出所有变更的文件
      2. 理解每个文件的变更内容
      3. 识别变更的直接和间接影响
      4. 分析变更的逻辑
      5. 确定变更的边界

      对于每个变更文件：
      - 记录变更的类型（新增/修改/删除）
      - 记录变更的行数
      - 理解变更的意图
    output: 变更分析报告

  - id: 2
    name: 读取变更详情
    action: |
      使用 `read-files-before-answering` 读取变更文件：
      1. 读取修改后的完整文件
      2. 理解新的逻辑
      3. 识别潜在的问题点
      4. 检查代码质量

      检查项：
      - 语法正确性
      - 代码风格一致性
      - 错误处理
      - 边界条件
    used_prompts:
      - prompt-tool-use-read-files-before-answering
    output: 变更详情分析

  - id: 3
    name: 运行相关测试
    action: |
      1. 运行与变更相关的单元测试
      2. 运行集成测试（如有）
      3. 运行端到端测试（如适用）
      4. 记录测试结果

      对每个测试：
      - 记录通过/失败状态
      - 记录执行时间
      - 记录失败信息（如有）
    output: 测试结果

  - id: 4
    name: 执行回归分析
    action: |
      1. 识别可能受影响的模块
      2. 分析变更对其他模块的影响
      3. 设计针对性的回归测试
      4. 执行回归测试
      5. 评估回归风险等级

      风险等级：
      - 高：影响核心功能
      - 中：影响次要功能
      - 低：影响轻微或无影响
    output: 回归分析报告

  - id: 5
    name: 代码审查
    action: |
      使用 `review-code-for-quality` 审查变更：
      1. 审查代码质量
      2. 审查设计合理性
      3. 审查潜在问题
      4. 审查测试覆盖

      关注点：
      - 正确性
      - 健壮性
      - 可读性
      - 性能
      - 安全性
    used_prompts:
      - prompt-task-coding-review-code-for-quality
    output: 代码审查报告

  - id: 6
    name: 生成验证报告
    action: |
      综合以上步骤的结果：
      1. 汇总测试结果
      2. 汇总回归分析
      3. 汇总代码审查
      4. 评估整体质量

      报告结构：
      ## 变更摘要
      ## 测试结果
      ## 回归分析
      ## 代码质量
      ## 风险评估
      ## 建议
      ## 结论
    output: 验证报告

used_skills:
  - coding-code-review
  - debugging
used_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-task-coding-review-code-for-quality
  - prompt-task-debugging-verify-fix-after-change
decision_points:
  - |
    **如果测试失败**：
    - 分析失败原因
    - 判断是否与变更相关
    - 修复或标记待处理

  - |
    **如果发现回归风险**：
    - 评估风险严重程度
    - 建议额外的缓解措施
    - 可能需要更多测试

  - |
    **如果代码质量有问题**：
    - 列出具体问题
    - 建议改进方案
    - 判断是否阻塞合并

  - |
    **如果风险过高**：
    - 建议回滚变更
    - 或分步骤引入
    - 提供详细的风险说明

final_deliverables:
  - 变更分析报告
  - 测试结果汇总
  - 回归分析报告
  - 代码审查报告
  - 综合验证报告
  - 风险评估

notes: |
  - 始终运行相关测试，不跳过
  - 关注变更的间接影响
  - 报告应客观准确
  - 风险评估应有依据
  - 保持所有验证步骤可追溯

---
id: prompt-workflow-bug-investigation-v1
name: Bug Investigation Workflow
summary: 系统性 Bug 调查工作流，从问题报告到根因定位的完整流程
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: debugging
tags:
  - workflow
  - debugging
  - bug-fixing
  - investigation
  - root-cause
keywords:
  - Bug调查
  - 调试
  - 问题定位
  - 根因分析
  - troubleshooting
intent: |
  用于系统性地调查和定位 Bug 的完整工作流。从用户报告的错误出发，
  通过信息收集、根因分析、计划生成、安全修复和验证的完整流程，
  确保 Bug 被正确修复且不会引入回归。
applicable_models:
  - "*"
required_inputs:
  - error_description: string 用户描述的错误现象
  - error_message: string 错误信息或异常堆栈（如果有）
  - reproduction_steps: string 复现步骤（如果有）
  - relevant_code: string 相关代码片段（可选）
  - file_path: string 相关文件路径（可选）
outputs:
  - root_cause_analysis: object 根因分析结果
  - debug_plan: array 调试计划步骤
  - fix_strategy: object 修复策略
  - verification_plan: array 验证计划
  - rollback_plan: string 回滚方案
  - confidence_level: string high/medium/low
steps:
  - id: 1
    name: 收集错误信息
    action: |
      1. 整理用户报告的错误现象
      2. 记录错误信息或异常堆栈
      3. 记录复现步骤
      4. 识别错误类型（运行时异常/逻辑错误/性能问题/崩溃）
    used_prompts:
      - prompt-debugging-identify-root-cause
    output: 错误信息摘要

  - id: 2
    name: 定位相关文件
    action: |
      如果尚未提供相关代码，使用 `locate-bug-related-files`：
      1. 从错误堆栈提取文件路径
      2. 搜索包含错误关键词的文件
      3. 缩小可能的故障范围
      4. 列出需要检查的文件清单
    used_prompts:
      - prompt-task-repo-analysis-locate-bug-related-files
    output: 相关文件列表

  - id: 3
    name: 分析根因
    action: |
      使用 `identify-root-cause` 进行系统性分析：
      1. 读取相关代码文件
      2. 追踪错误堆栈中的调用链
      3. 识别数据流和状态变化
      4. 列出可能的根因假设
      5. 设计验证实验
      6. 确定最可能的根因
    used_prompts:
      - prompt-debugging-identify-root-cause
    output: 根因分析报告

  - id: 4
    name: 生成调试计划
    action: |
      使用 `generate-debug-plan` 制定修复计划：
      1. 确定修复策略（最小变更 vs 重构）
      2. 列出具体修复步骤
      3. 识别风险点和缓解措施
      4. 定义验证标准
      5. 准备回滚方案
    used_prompts:
      - prompt-debugging-generate-debug-plan
    output: 调试计划

  - id: 5
    name: 执行修复
    action: |
      使用 `fix-bug-safely` 执行修复：
      1. 备份当前代码
      2. 按照计划逐步实施修复
      3. 添加或更新测试用例
      4. 确保语法正确
      5. 验证修复不引入新问题
    used_prompts:
      - prompt-debugging-fix-bug-safely
    output: 修复后的代码

  - id: 6
    name: 验证修复
    action: |
      使用 `verify-fix-after-change` 验证：
      1. 使用原始复现步骤验证 Bug 已修复
      2. 运行相关测试确保无回归
      3. 检查边界条件
      4. 评估性能影响
      5. 确认所有验证点通过
    used_prompts:
      - prompt-debugging-verify-fix-after-change
    output: 验证报告

used_skills:
  - debugging
  - repo-analysis
used_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-generate-debug-plan
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-verify-fix-after-change
  - prompt-task-repo-analysis-locate-bug-related-files
decision_points:
  - |
    **如果无法复现 Bug**：
    - 请求用户提供了更多信息
    - 检查不同环境/版本
    - 标记为"无法复现"并记录可能的假设

  - |
    **如果存在多个可能的根因**：
    - 按可能性排序
    - 逐个验证排除
    - 选择最高可能性的根因进行修复

  - |
    **如果修复风险较高**：
    - 考虑添加防御性代码
    - 确保有完整的回滚方案
    - 请求额外 review

  - |
    **如果修复需要较大改动**：
    - 评估是否值得
    - 考虑分步骤修复
    - 记录技术债务

final_deliverables:
  - 根因分析报告（包含 confidence level）
  - 调试计划（含风险评估）
  - 修复后的代码
  - 验证报告
  - 测试用例更新

notes: |
  - 遵循"先分析后修复"原则，不跳步骤
  - 如果根因不确定，先验证再修复
  - 始终准备回滚方案
  - 确保修复后运行相关测试
  - 保持所有分析过程文档化

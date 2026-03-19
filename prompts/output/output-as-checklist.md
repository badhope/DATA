---
id: prompt-output-checklist-v1
name: Output as Checklist
summary: 标准化检查清单格式输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: checklist
tags:
  - output
  - checklist
  - todo
  - verification
  - checklist
keywords:
  - 检查清单
  - 待办事项
  - 验证清单
  - 任务列表
intent: |
  用于输出结构化的检查清单，适用于任务分解、验证步骤、质量检查等场景。
  强调每个条目清晰可执行、状态明确、便于追踪。
applicable_models:
  - "*"
required_inputs:
  - items: array 检查项列表
  - checklist_title: string 清单标题
  - checklist_type: string 清单类型（待办/验证/质量检查/复盘）
outputs:
  - checklist_output: string 格式化后的检查清单
structure:
  - title
  - description
  - items
  - notes
  - footer
output_format: |
  # [清单标题]

  > **描述**：简要说明这个清单的目的

  ---

  ## 检查项

  - [ ] 检查项 1
  - [ ] 检查项 2
  - [ ] 检查项 3

  ## 备注
  [补充说明]

  ---
  *最后更新：YYYY-MM-DD*

usage: |
  当需要将任务、步骤或检查点以清单形式输出时使用。
  适用于任务分解后的待办列表、代码审查检查点、上线前验证清单、项目复盘等场景。

example_input: |
  代码审查检查点：
  1. 检查变量命名
  2. 检查错误处理
  3. 检查测试覆盖
  4. 检查文档更新

example_output: |
  # 代码审查检查清单

  > **描述**：代码合并前必须完成的审查项目

  ---

  ## 审查项

  - [ ] 变量和函数命名清晰且一致
  - [ ] 所有函数都有错误处理
  - [ ] 关键逻辑有对应的测试用例
  - [ ] 公共 API 已有文档注释
  - [ ] 没有 TODO 或 FIXME 注释
  - [ ] 性能影响已评估

  ## 备注
  - 如果任何项未通过，需要在合并前修复
  - 如有特殊情况，请在备注中说明

  ---
  *最后更新：2026-03-19*

anti_patterns: |
  - 不要用模糊的描述，如"检查代码"要具体说明检查什么
  - 不要遗漏关键检查项，，宁可多写不可少写
  - 不要把不相关的项目混在一个清单里
  - 不要忘记标注每项的优先级或重要性
  - 不要写无法验证的检查项（无法判断是否完成的项）

failure_modes: |
  - **检查项不具体**：无法判断是否完成 → 改写为可验证的描述
  - **项目遗漏**：关键检查点缺失 → 回顾是否有遗漏的重要步骤
  - **分类混乱**：不同类型的项目混在一起 → 按类型或阶段分组

self_check: |
  - [ ] 每个检查项是否具体可验证？
  - [ ] 是否涵盖了主要的风险点？
  - [ ] 清单长度是否合适（太长会让人放弃）？
  - [ ] 是否有分组便于阅读？
  - [ ] 是否有优先级标注？
  - [ ] 备注里是否有特殊情况说明？

related_prompts:
  - prompt-output-step-by-step-plan
  - prompt-output-markdown-report
  - prompt-workflow-change-verify-and-report
---

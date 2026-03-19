---
id: prompt-output-comparison-table-v1
name: Output as Comparison Table
summary: 标准化对比表格格式输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: table
tags:
  - output
  - comparison
  - table
  - matrix
  - compare
keywords:
  - 对比表格
  - 比较表
  - 选项对比
  - 方案比较
intent: |
  用于输出标准化的对比表格，适用于方案选型、特性比较、产品对比等场景。
  强调列定义清晰、行数据对齐、便于决策。
applicable_models:
  - "*"
required_inputs:
  - items: array 要对比的选项
  - criteria: array 对比维度/标准
  - purpose: string 对比目的
outputs:
  - table_output: string 格式化后的对比表格
structure:
  - title
  - comparison_criteria
  - comparison_table
  - recommendation
  - notes
output_format: |
  # [对比标题]

  > **目的**：简要说明为什么需要这个对比

  ---

  ## 对比维度

  | 维度 | 说明 | 权重 |
  |------|------|------|
  | 维度1 | 解释 | 高 |
  | 维度2 | 解释 | 中 |

  ## 对比结果

  | 选项 | 维度1 | 维度2 | 维度3 | 总分 |
  |------|-------|-------|-------|------|
  | 选项A | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 高 |
  | 选项B | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ | 中 |

  ## 推荐
  [基于对比的推荐]

  ## 备注
  [补充说明]

usage: |
  当需要对比多个选项时使用此格式。
  适用于技术选型、方案评估、产品特性对比、替代方案分析等场景。

example_input: |
  对比三种数据库：MySQL、PostgreSQL、MongoDB
  维度：性能、易用性、成本、社区支持

example_output: |
  # 数据库选型对比

  > **目的**：为新项目选择最合适的数据库

  ---

  ## 对比维度

  | 维度 | 说明 | 权重 |
  |------|------|------|
  | 性能 | 查询速度和并发处理能力 | 高 |
  | 易用性 | 学习曲线和开发体验 | 中 |
  | 成本 | 许可费用和运维成本 | 中 |
  | 社区 | 社区活跃度和文档完善度 | 低 |

  ## 对比结果

  | 方案 | 性能 | 易用性 | 成本 | 社区 | 推荐度 |
  |------|------|--------|------|------|--------|
  | MySQL | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
  | PostgreSQL | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
  | MongoDB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

  ## 推荐
  - 如果注重性能和稳定性：**PostgreSQL**
  - 如果注重开发效率：**MongoDB**
  - 如果注重生态成熟：**MySQL**

  ## 备注
  最终选择还需考虑团队技术栈和现有系统兼容性。

anti_patterns: |
  - 不要对比太多选项（超过 5 个表格会难以阅读），超过的分成多个表格
  - 不要缺少权重定义，没有权重就无法做决策
  - 不要用主观评价而不说明标准，要让评判有依据
  - 不要忘记标注每个选项的最适用场景
  - 不要在表格里放太长的文本，用简洁的描述

failure_modes: |
  - **维度缺失**：关键对比维度没考虑 → 补充遗漏的重要维度
  - **评价主观**：没有说明评分依据 → 为每个评分补充简要说明
  - **信息过载**：太多选项和维度 → 精简或拆分成多个表格

self_check: |
  - [ ] 对比维度是否涵盖了主要考虑因素？
  - [ ] 每个维度是否有明确的权重定义？
  - [ ] 每个选项的评分是否有依据？
  - [ ] 表格是否简洁易读（避免过长文本）？
  - [ ] 是否有明确的推荐结论？
  - [ ] 备注是否说明了适用限制？

related_prompts:
  - prompt-output-markdown-report
  - prompt-output-step-by-step-plan
  - prompt-workflow-research-to-summary
---

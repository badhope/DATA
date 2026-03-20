---
id: prompt-output-markdown-report-v1
name: Output as Markdown Report
summary: 标准化 Markdown 报告格式输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: document
tags:
  - output
  - markdown
  - report
  - document
  - format
keywords:
  - Markdown报告
  - 文档格式
  - 结构化输出
  - 报告模板
intent: |
  用于将任何分析、研究、总结的结果输出为标准化的 Markdown 报告格式。
  强调结构清晰、层级分明、信息完整。
applicable_models:
  - "*"
required_inputs:
  - content: string 要输出的内容
  - report_type: string 报告类型（分析报告/研究报告/总结报告/调查报）
  - title: string 报告标题
outputs:
  - markdown_report: string 格式化后的 Markdown 报告
structure:
  - title
  - executive_summary
  - background
  - main_content
  - findings
  - recommendations
  - conclusion
  - appendix
output_format: |
  # [报告标题]

  > **执行摘要**：1-2 句话概括核心结论

  ---

  ## 背景
  [简要背景说明]

  ## 主要内容
  [核心内容]

  ## 发现
  1。 [发现1]
  2。 [发现2]
  3。 [发现3]

  ## 建议
  — [建议1]
  — [建议2]

  ## 结论
  [最终结论]

  ## 附录（如有）
  [补充信息]

usage: |
  在完成分析、研究或总结后，将结果套用此格式输出为 Markdown 报告。
  适用于代码分析报告、研究报告、项目总结、调查发现等场景。

example_input: |
  分析主题：某电商网站的性能问题
  发现：数据库查询慢、缺少缓存、前端资源未压缩
  建议：添加 Redis 缓存、优化 SQL、启用 Gzip 压缩

example_output: |
  # 某电商网站性能分析报告

  > **执行摘要**：网站加载时间过长的主要原因是数据库查询效率低和缺少缓存机制，建议优先优化数据库查询并引入 Redis 缓存。

  ---

  ## 背景
  某电商网站用户反映页面加载缓慢，需要分析原因并提出改进建议。

  ## 主要发现
  1. **数据库查询慢**：部分 SQL 查询未建立索引，导致全表扫描
  2. **缺少缓存**：热门商品数据每次都从数据库读取
  3. **资源未压缩**：CSS/JS/图片资源未启用压缩

  ## 改进建议
  - 为频繁查询的字段添加数据库索引
  - 引入 Redis 缓存热门数据
  - 启用 Gzip 压缩和图片懒加载

  ## 结论
  通过以上优化，预计可将页面加载时间从 8s 降低至 2s 以内。

anti_patterns: |
  - 不要把所有内容都堆在"主要内容"里，要有明确的分区
  - 不要省略执行摘要，这是报告的核心
  - 不要在报告里写"待补充"，如果信息不足先标注"[信息不足]"
  - 不要用纯文本而不分段落，Markdown 的层级结构很重要
  - 不要在报告里写"看起来"、"可能"等模糊词汇，要明确

failure_modes: |
  - **信息不完整**：某些章节内容缺失 → 用 "[待补充]" 标注，明确指出缺少什么
  - **层级混乱**：内容放在错误的位置 → 按 structure 定义的层级放置
  - **过度冗余**：摘要和正文内容重复 → 摘要只放核心结论，正文详细展开

self_check: |
  - [ ] 有没有执行摘要？（核心结论）
  - [ ] 各个章节是否有实质内容？
  - [ ] 层级结构是否清晰？（正确使用 #、##、###）
  - [ ] 是否有冗余重复的内容？
  - [ ] 模糊词汇是否已替换为明确表述？
  - [ ] 信息不足的地方是否已标注？
  - [ ] 代码块是否正确使用 ```围起来？

related_prompts:
  - prompt-output-step-by-step-plan
  - prompt-output-checklist
  - prompt-output-comparison-table
---

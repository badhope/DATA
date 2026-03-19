---
id: prompt-tool-use-search-before-concluding-v1
name: Search Before Concluding
summary: 在得出结论前先搜索相关信息，避免基于不完整信息下结论
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: search
tags:
  - tool-use
  - search
  - investigation
  - evidence
  - conclusion
keywords:
  - 搜索
  - 调查
  - 证据
  - 结论
intent: |
  用于在得出关于代码、API、错误、解决方案等结论前，先通过搜索获取更多信息。
  强调搜索官方文档、代码库、常见问题等后再做判断。
applicable_models:
  - "*"
required_inputs:
  - topic: string 需要调查的主题
  - search_scope: string 搜索范围（可选）
  - context: string 相关上下文（可选）
outputs:
  - search_queries: array 使用的搜索查询
  - search_results: array 搜索结果
  - analyzed_info: object 分析后的信息
  - conclusion: string 基于搜索结果的结论
  - confidence: string high/medium/low
  - remaining_questions: array 仍未解决的问题
steps:
  - id: 1
    name: 分析主题，确定搜索策略
    action: |
      1. 明确需要调查的核心问题
      2. 分解主题为关键词
      3. 设计搜索查询

      搜索来源优先级：
      1. 官方文档（最可信）
      2. 代码库和源码
      3. 官方 GitHub/GitLab issues
      4. 技术博客（需验证）
      5. Stack Overflow（参考）

      查询设计：
      - 使用精确关键词
      - 组合多个关键词
      - 考虑同义词
      - 限定范围（如版本号）

      示例：
      - "error message" + language/framework
      - "API" + "deprecated" + version
      - "best practice" + context
    output: 搜索策略

  - id: 2
    name: 执行搜索
    action: |
      按优先级执行搜索：
      1. 搜索官方文档
      2. 搜索代码仓库
      3. 搜索社区资源

      对每个搜索：
      - 记录搜索查询
      - 记录返回结果数量
      - 记录最相关的结果
      - 评估结果的可信度

      搜索方法：
      - 使用搜索引擎
      - 使用站内搜索
      - 使用代码搜索（GitHub Code Search）
      - 使用文档搜索
    output: 搜索结果

  - id: 3
    name: 筛选和分析结果
    action: |
      1. 从搜索结果中筛选相关内容
      2. 阅读高相关度的结果
      3. 提取关键信息
      4. 检查信息的一致性
      5. 识别信息来源

      评估标准：
      - 来源可信度（官方 > 社区）
      - 时间（越新越可能相关）
      - 相关度（内容匹配程度）
      - 验证度（多个来源是否一致）

      对每个关键信息：
      - 记录来源
      - 记录相关度
      - 记录是否经过验证
    output: 筛选后的信息

  - id: 4
    name: 形成结论
    action: |
      基于分析结果：
      1. 综合多个来源的信息
      2. 识别共识和分歧
      3. 形成主要结论
      4. 标注不确定部分

      结论格式：
      ```
      结论：[清晰陈述]

      依据：
      - [来源1]: [关键信息]
      - [来源2]: [关键信息]

      不确定部分：
      - [未确认的内容]
      - 原因：[为什么不确定]
      ```
    output: 结论

  - id: 5
    name: 验证和补充
    action: |
      1. 检查结论是否完整回答了问题
      2. 识别仍未解决的问题
      3. 如果有未解决的关键问题，尝试进一步搜索
      4. 最终确定置信度

      置信度标准：
      - High：多个可靠来源一致
      - Medium：来源有限或有些不一致
      - Low：来源很少或很不确定
    output: 最终结论

used_skills: []
used_prompts: []
decision_points:
  - |
    **如果没有搜索结果**：
    - 尝试不同的关键词
    - 扩大搜索范围
    - 考虑是否是全新问题
    - 明确说明无直接答案

  - |
    **如果搜索结果矛盾**：
    - 分析矛盾的原因
    - 优先信任官方来源
    - 标注争议
    - 提供所有合理的解释

  - |
    **如果信息过时**：
    - 标注信息的时间
    - 说明可能的变化
    - 尝试搜索最新信息

  - |
    **如果问题超出搜索范围**：
    - 明确说明
    - 提供基于经验的建议
    - 标注这是推测

final_deliverables:
  - 使用的搜索查询列表
  - 搜索结果汇总
  - 分析后的信息
  - 基于证据的结论
  - 置信度评估
  - 仍未解决的问题

notes: |
  - 核心原则：先搜索，后结论
  - 优先使用官方和权威来源
  - 标注信息的可信度
  - 结论应基于证据
  - 不确定部分必须标注

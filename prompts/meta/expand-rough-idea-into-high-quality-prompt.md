---
id: prompt-meta-expand-rough-idea-v1
name: Expand Rough Idea into High Quality Prompt
summary: 将粗糙想法扩展为高质量 Prompt 的结构化改写流程
type: meta
status: active
version: "1.0.0"
owner: skill-repository
category: meta
sub_category: prompt-creation
tags:
  - meta
  - prompt-engineering
  - expansion
  - refinement
  - draft
keywords:
  - 扩展Prompt
  - 想法改写
  - Prompt优化
  - 草稿完善
intent: |
  用于将用户模糊的、不完整的想法转化为结构完整、约束清晰、可执行的高质量 Prompt。
  这是 Prompt 工程的第一步：从"想大概"到"能执行"。
applicable_models:
  - "*"
required_inputs:
  - rough_idea: string 粗糙的想法描述
  - target_task: string 目标任务类型（可选）
  - constraints: string 已知约束（可选）
outputs:
  - expanded_prompt: object 扩展后的完整 Prompt
  - missing_elements: array 识别出的缺失元素
  - questions: array 需要澄清的问题
  - final_prompt_body: string 最终可用的 Prompt 文本
steps:
  - id: 1
    name: 理解原始想法
    action: |
      1. 识别用户想要完成的核心目标
      2. 提取已明确的要素（角色、任务、输出格式等）
      3. 标记模糊和不确定的部分

      提取要素清单：
      - ✅ 明确：已说清楚的部分
      - ❓ 模糊：可以这样理解也可以那样理解的部分
      - ❌ 缺失：完全没有提到的关键部分
    output: 要素分析

  - id: 2
    name: 识别缺失的关键元素
    action: |
      对照高质量 Prompt 的标准，检查缺失：

      **必须有的元素**：
      1. **角色定义**：AI 应该扮演什么角色？
      2. **任务明确**：具体要做什么？
      3. **输入说明**：用户会提供什么？
      4. **输出要求**：期望什么样的输出？
      5. **约束条件**：有什么限制？
      6. **上下文**：需要什么背景信息？

      **可选但重要的元素**：
      - 示例输入/输出
      - 边界情况说明
      - 禁止的行为（anti-patterns）
      - 自检清单（self-check）
    output: 缺失元素清单

  - id: 3
    name: 补充缺失元素
    action: |
      对每个缺失的元素：

      1. **角色定义**：基于任务推断合适的角色
         - "你是一个[X]专家"
         - "你扮演[X]的角色"

      2. **任务明确**：具体化模糊描述
         - ❓"帮我写代码" → ✅"写一个计算字符串中单词数的 Python 函数"

      3. **输入输出**：
         - 输入：用户提供什么？（数据类型、格式、示例）
         - 输出：期望什么？（格式、结构、长度）

      4. **约束条件**：
         - 性能约束
         - 格式约束
         - 兼容性约束
         - 安全约束

      5. **上下文**：
         - 技术栈
         - 使用场景
         - 目标用户
    output: 补充后的要素

  - id: 4
    name: 生成结构化 Prompt
    action: |
      按标准结构组装 Prompt：

      ```markdown
      # 角色定义
      你是一个 [角色]，专注于 [专业领域]。

      # 任务描述
      [具体描述要完成的任务]

      # 输入说明
      用户会提供：[说明输入]
      输入格式：[描述格式]

      # 输出要求
      输出的格式：[描述输出结构]
      必须包含：[必要字段]
      禁止：[不应出现的内容]

      # 约束条件
      1. [约束1]
      2. [约束2]

      # 示例（如有）
      输入：[示例输入]
      输出：[示例输出]

      # 自检清单
      完成前请检查：
      - [ ] [检查项1]
      - [ ] [检查项2]
      ```
    output: 结构化 Prompt

  - id: 5
    name: 质量检查和优化
    action: |
      使用 `evaluate-prompt-quality` 检查：

      1. **完整性**：所有必要元素都已包含？
      2. **清晰度**：每个描述是否明确无歧义？
      3. **可执行性**：AI 能否根据这个 Prompt 完成任务？
      4. **可验证性**：如何判断输出是否符合要求？

      如果发现问题，返回步骤 1-4 迭代优化
    output: 优化后的 Prompt

  - id: 6
    name: 输出最终结果
    action: |
      输出格式：
      ```markdown
      ## 扩展后的 Prompt

      [完整的 Prompt 文本]

      ## 补充的元素
      - [元素1]: [说明如何补充的]

      ## 仍需澄清的问题（如有）
      - [问题1]
      ```
    output: 最终结果

anti_patterns: |
  - 不要只问"你想做什么"，要主动推断和补充
  - 不要假设用户知道 Prompt 的结构
  - 不要一次性问太多问题，先基于推断补充，再请求确认
  - 不要生成模糊的 Prompt，每句话都要有明确含义
  - 不要省略约束条件，这往往是最重要的部分

failure_modes: |
  - **推断错误**：基于模糊想法的推断不准确 → 明确标注推断的内容，请求用户确认
  - **遗漏关键约束**：重要的约束没加入 → 回顾常见约束场景（性能、安全、兼容性）
  - **过度复杂**：Prompt 过于冗长 → 简化非必要元素，聚焦核心

questions_to_ask: |
  - "这个任务的主要目标是什么？"
  - "有没有具体的输入示例？"
  - "期望什么样的输出格式？"
  - "有什么特别的限制条件吗？"
  - "这个任务的使用场景是什么？"

self_check: |
  - [ ] 角色的定义是否清晰？
  - [ ] 任务描述是否具体可执行？
  - [ ] 输入输出是否明确？
  - [ ] 必要的约束是否都已包含？
  - [ ] 是否有歧义的描述？
  - [ ] 推断的部分是否标注并请求确认？

related_prompts:
  - prompt-meta-evaluate-prompt-quality
  - prompt-meta-convert-natural-language-to-structured-prompt
  - prompt-meta-refine-ambiguous-request
---

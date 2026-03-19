---
id: prompt-meta-convert-natural-language-to-structured-prompt-v1
name: Convert Natural Language to Structured Prompt
summary: 将自然语言描述转换为结构化 Prompt 格式的标准流程
type: meta
status: active
version: "1.0.0"
owner: skill-repository
category: meta
sub_category: conversion
tags:
  - meta
  - conversion
  - structured
  - format
  - natural-language
keywords:
  - 自然语言转换
  - 结构化Prompt
  - 格式转换
  - Prompt构建
intent: |
  用于将自然语言描述（非结构化的文本）转换为标准结构化 Prompt。
  重点是识别自然语言中的各个要素，并映射到标准 Prompt 结构中。
applicable_models:
  - "*"
required_inputs:
  - natural_language_input: string 自然语言描述
  - target_structure: string 目标结构类型（可选，默认标准结构）
outputs:
  - structured_prompt: object 转换后的结构化 Prompt
  - mapped_elements: object 要素映射关系
  - validation_results: object 验证结果
  - final_prompt_text: string 最终 Prompt 文本
steps:
  - id: 1
    name: 解析自然语言文本
    action: |
      逐句分析，提取关键信息：

      **提取维度**：
      1. **角色信息** - "你是..."、"我需要你扮演..."
      2. **任务描述** - "帮我..."、"需要你..."
      3. **输入内容** - "给我..."、"提供..."
      4. **输出要求** - "输出..."、"格式是..."
      5. **约束条件** - "必须..."、"不要..."、"只能..."
      6. **背景上下文** - "因为..."、"由于..."
      7. **示例** - "比如..."、"类似..."
      8. **情感倾向** - "比较急..."、"希望..."

      **提取方法**：
      - 关键词匹配
      - 句式分析
      - 语义识别

      输出提取结果：
      ```markdown
      原始文本：[自然语言]
      提取要素：
      - 角色：[如有]
      - 任务：[描述]
      - 输入：[内容]
      - 输出：[要求]
      - 约束：[条件]
      - 上下文：[背景]
      ```
    output: 提取结果

  - id: 2
    name: 映射到标准结构
    action: |
      将提取的要素映射到标准 Prompt 结构：

      **标准结构映射**：

      ```markdown
      # 角色（Role）
      来源：[自然语言中的角色描述]
      映射：设定 AI 的专业角色

      # 任务（Task）
      来源：[自然语言中的任务描述]
      映射：具体要完成什么

      # 上下文（Context）
      来源：[自然语言中的背景信息]
      映射：提供必要的背景

      # 输入说明（Input）
      来源：[自然语言中的输入描述]
      映射：用户会提供什么

      # 输出格式（Output）
      来源：[自然语言中的输出要求]
      映射：期望的输出格式

      # 约束（Constraints）
      来源：[自然语言中的限制条件]
      映射：必须遵守的规则

      # 示例（Examples）
      来源：[自然语言中的示例]
      映射：输入输出示例
      ```

      对每个要素：
      - 明确来源
      - 确认映射
      - 评估完整性
    output: 映射结果

  - id: 3
    name: 补全缺失要素
    action: |
      检查映射后的结构，发现缺失：

      **完整性检查**：
      - [ ] 是否有角色定义？
      - [ ] 任务是否具体明确？
      - [ ] 输入输出是否清晰？
      - [ ] 约束是否完整？
      - [ ] 上下文是否足够？

      **补全方法**：
      1. **角色缺失**：
         - 根据任务推断合适角色
         - 或设为通用助手

      2. **任务模糊**：
         - 具体化动词和对象
         - 明确输入输出

      3. **约束缺失**：
         - 添加常见的通用约束
         - 标注需要用户确认

      4. **上下文不足**：
         - 添加必要的背景假设
         - 标注需要补充的信息
    output: 补全结果

  - id: 4
    name: 生成结构化 Prompt
    action: |
      按标准格式组装：

      ```markdown
      ---
      id: [生成唯一ID]
      name: [Prompt名称]
      type: [类型]
      ---

      # 角色
      [角色定义]

      # 任务
      [具体任务描述]

      # 上下文（可选）
      [背景信息]

      # 输入说明
      用户会提供：
      - [输入项1]
      - [输入项2]

      # 输出要求
      输出格式：
      - [格式要求1]
      - [格式要求2]

      # 约束条件
      1. [约束1]
      2. [约束2]

      # 示例（可选）
      输入：[示例]
      输出：[示例]

      # 自检清单（可选）
      完成前请检查：
      - [ ] [检查项]
      ```
    output: 结构化 Prompt

  - id: 5
    name: 验证和调整
    action: |
      验证转换结果：

      **验证维度**：
      1. **语义一致性** - 转换后是否保持了原意？
      2. **结构完整性** - 所有必要要素是否完整？
      3. **可执行性** - 按此 Prompt 能否完成任务？
      4. **可读性** - 结构是否清晰易读？

      **验证方法**：
      - 对比原始文本和结构化版本
      - 检查是否有信息丢失
      - 检查是否有误解

      如有问题，调整至满意
    output: 验证结果

  - id: 6
    name: 输出最终结果
    action: |
      最终输出：

      ```markdown
      ## 原始自然语言
      [输入的自然语言]

      ## 结构化 Prompt

      ---
      [YAML frontmatter]
      ---

      [Prompt 正文]

      ## 要素映射
      | 原始要素 | 结构化位置 | 说明 |
      |----------|------------|------|
      | ... | ... | ... |

      ## 验证结果
      - 语义一致：✅
      - 结构完整：✅
      - 可执行：✅
      ```
    output: 最终结果

anti_patterns: |
  - 不要丢失自然语言中的任何重要信息
  - 不要添加原文中没有的约束或要求
  - 不要过度结构化导致可读性下降
  - 不要忽略情感倾向和语气（可能在语气字段保留）
  - 不要在映射时曲解原意

failure_modes: |
  - **信息丢失**：某些要素没被识别 → 重新检查原文，特别关注隐含信息
  - **误解原意**：映射错误导致语义改变 → 对照原文核对每个映射
  - **过度补充**：添加了原文没有的约束 → 只补全缺失的标准要素，不添加新要求

self_check: |
  - [ ] 原始文本的所有重要信息都保留了？
  - [ ] 映射关系是否准确？
  - [ ] 补全的要素是否合理？
  - [ ] 结构化版本是否可读？
  - [ ] 转换后是否可执行？

related_prompts:
  - prompt-meta-expand-rough-idea-into-high-quality-prompt
  - prompt-meta-evaluate-prompt-quality
  - prompt-meta-refine-ambiguous-request
---

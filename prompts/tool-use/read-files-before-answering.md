---
id: prompt-tool-use-read-files-before-answering-v1
name: Read Files Before Answering
summary: 在回答问题前先读取相关文件，避免盲目猜测和不准确回答
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: file-reading
tags:
  - tool-use
  - file-reading
  - context
  - evidence
  - accuracy
keywords:
  - 读取文件
  - 先读后答
  - 证据
  - 准确性
intent: |
  用于确保在回答关于代码、配置或文档的问题前，先使用工具读取相关文件。
  强调基于实际文件内容而非记忆或猜测来回答问题。
applicable_models:
  - "*"
required_inputs:
  - user_question: string 用户的问题
  - relevant_paths: array 可能相关的文件路径（可选）
outputs:
  - files_read: array 读取的文件列表
  - key_findings: array 关键发现
  - answer: string 基于文件内容的回答
  - confidence: string high/medium/low
  - unanswered_aspects: array 未回答的部分（如有）
steps:
  - id: 1
    name: 分析问题，确定需要读取的文件
    action: |
      1. 理解用户的问题
      2. 识别问题的关键概念
      3. 推断可能相关的文件位置：
         - 代码问题 → 源代码文件
         - 配置问题 → 配置文件
         - 文档问题 → 文档文件
         - 构建问题 → 构建脚本
      4. 列出需要读取的文件清单

      判断优先级：
      - 高优先级：直接相关的文件
      - 中优先级：可能相关的文件
      - 低优先级：背景信息的文件
    output: 需要读取的文件清单

  - id: 2
    name: 按优先级读取文件
    action: |
      按优先级顺序读取文件：
      1. 先读取高优先级的直接相关文件
      2. 再读取中优先级的可能相关文件
      3. 最后读取低优先级的背景文件

      读取时：
      - 完整读取或记录关键部分
      - 记录文件路径和读取顺序
      - 标注关键发现

      读取方式：
      - 使用文件读取工具
      - 记录读取的起始位置
      - 注意文件编码和格式
    output: 文件内容摘要

  - id: 3
    name: 分析读取的内容
    action: |
      1. 整理从各文件获取的信息
      2. 识别与问题直接相关的内容
      3. 检查信息是否一致
      4. 识别信息缺失或矛盾
      5. 标记需要补充读取的文件（如有）

      关键问题：
      - 文件内容是否直接回答了问题？
      - 信息是否完整？
      - 是否存在多种可能的解读？
    output: 分析结果

  - id: 4
    name: 生成基于证据的回答
    action: |
      基于读取的文件内容：
      1. 直接引用文件中的关键内容
      2. 综合多个文件的信息
      3. 明确标注信息来源
      4. 对于推测的内容，明确说明这是推测

      回答格式：
      ```
      基于 [文件路径] 的内容：
      [直接回答]

      信息来源：
      - [文件1]: [关键引用]
      - [文件2]: [关键引用]
      ```

      如果无法完整回答：
      - 说明哪些部分可以确定
      - 明确标注哪些是推测
      - 说明还需要什么信息
    output: 结构化回答

  - id: 5
    name: 验证回答的完整性
    action: |
      检查：
      1. 是否回答了用户的核心问题？
      2. 是否有信息缺失？
      3. 是否需要读取更多文件？
      4. 是否有不确定的部分需要标注？

      如果需要读取更多文件：
      - 返回步骤 1 或 2
      - 补充读取
      - 更新回答

      最终确保：
      - 回答基于实际文件内容
      - 不确定的部分已标注
      - 给出了完整的信息图景
    output: 最终验证后的回答

used_skills: []
used_prompts:
  - prompt-workflow-new-repo-onboarding-workflow
decision_points:
  - |
    **如果文件不存在**：
    - 明确告知用户文件不存在
    - 建议可能的位置
    - 不要假设文件内容

  - |
    **如果文件过大无法完整读取**：
    - 先读取与问题直接相关的部分
    - 按需读取其他部分
    - 说明读取的范围

  - |
    **如果多个文件信息矛盾**：
    - 指出矛盾之处
    - 提供所有可能的解读
    - 标注哪个更可能

  - |
    **如果确实无法回答**：
    - 明确说明无法回答
    - 说明缺少什么信息
    - 提供可能的解决路径

final_deliverables:
  - 读取的文件清单
  - 关键发现列表
  - 基于证据的回答
  - 置信度评估
  - 未回答部分的说明

notes: |
  - 核心原则：先读取，后回答
  - 不基于记忆或猜测回答
  - 始终引用文件来源
  - 标注不确定性和推测
  - 如果信息不足，明确说明

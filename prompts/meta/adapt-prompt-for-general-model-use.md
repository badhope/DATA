---
id: prompt-meta-adapt-prompt-for-general-model-use-v1
name: Adapt Prompt for General Model Use
summary: 将 Prompt 调整为通用版本，提高跨模型的兼容性
type: meta
status: active
version: "1.0.0"
owner: skill-repository
category: meta
sub_category: adaptation
tags:
  - meta
  - adaptation
  - compatibility
  - generalization
  - cross-model
keywords:
  - Prompt适配
  - 通用化
  - 跨模型
  - 兼容性
intent: |
  用于将针对特定模型优化的 Prompt 调整为更通用的版本，
  使其能在更多模型上保持良好效果。
applicable_models:
  - "*"
required_inputs:
  - original_prompt: string 原始 Prompt
  - source_model: string 原始优化的模型（可选）
  - target_models: array 目标模型列表（可选）
outputs:
  - adapted_prompt: string 适配后的通用 Prompt
  - changes_made: array 所做的修改
  - compatibility_notes: array 兼容性说明
  - model_specific_tips: array 针对特定模型的建议
steps:
  - id: 1
    name: 分析原始 Prompt
    action: |
      分析原始 Prompt 的特征：

      **检查维度**：

      1. **模型特定特征**
      - 是否使用了特定模型的专有语法？
      - 是否有针对特定模型的优化？
      - 是否依赖特定模型的特殊能力？

      2. **结构特征**
      - 长度是否合理？
      - 层次结构是否清晰？
      - 格式是否通用？

      3. **指令特征**
      - 指令是否过于复杂？
      - 约束是否过于严格？
      - 示例是否具有通用性？

      **常见模型差异**：
      | 特征 | GPT | Claude | Gemini | 通用建议 |
      |------|-----|--------|--------|----------|
      | 指令风格 | 清晰直接 | 偏好对话式 | 偏好结构化 | 使用通用直接指令 |
      | 示例偏好 | 偏好完整示例 | 适中 | 偏好少量 | 提供简洁代表性示例 |
      | 格式敏感度 | 中等 | 较高 | 较高 | 使用标准 Markdown |
      | 上下文窗口 | 中等 | 大 | 大 | 控制长度 |
    output: 分析结果

  - id: 2
    name: 识别不兼容要素
    action: |
      识别可能影响兼容性的要素：

      **不兼容模式 1：特定语法**
      - 使用了只有某模型支持的格式
      - 例：只支持特定符号标记

      **不兼容模式 2：模型特定指令**
      - "使用思维链"
      - "使用 Chain of Thought"
      - "你是一个 XX 模型"

      **不兼容模式 3：过度优化**
      - 针对某模型的特殊优化
      - 可能对其他模型无效甚至有害

      **不兼容模式 4：长度问题**
      - 过长可能超出某些模型窗口
      - 过短可能缺少必要上下文

      对每个不兼容要素：
      - 标注位置
      - 说明问题
      - 评估影响程度
    output: 不兼容清单

  - id: 3
    name: 设计通用化策略
    action: |
      针对每个不兼容问题制定策略：

      **策略 1：去除模型特定引用**
      - 移除特定模型的名称引用
      - 替换为通用的功能描述
      - 例："像 GPT-4 那样思考" → "系统性地分析"

      **策略 2：简化复杂指令**
      - 拆解复杂指令为简单步骤
      - 减少多层次嵌套
      - 例：多层条件 → 单一条件列表

      **策略 3：平衡约束**
      - 放宽过于严格的约束
      - 增强约束的通用性
      - 例："必须用 [特定格式]" → "推荐用 [格式]"

      **策略 4：调整示例**
      - 使用更通用的示例
      - 减少文化特定引用
      - 确保示例清晰易懂

      **策略 5：控制长度**
      - 精简非必要内容
      - 保持核心指令完整
      - 添加长度建议
    output: 通用化策略

  - id: 4
    name: 执行通用化
    action: |
      按策略执行修改：

      **修改原则**：
      1. **保守修改** - 只改必要的不兼容部分
      2. **保持功能** - 确保核心功能不受影响
      3. **明确标注** - 记录所有修改

      **执行示例**：

      ```
      原文："使用 Chain of Thought，逐步推理：..."
      修改："系统性地分析，按步骤推理：..."

      原文："作为 Claude，..."
      修改："作为一个专业的 AI 助手，..."

      原文：[超长 Prompt 3000 字]
      修改：精简至 1500 字，保留核心
      ```
    output: 通用化结果

  - id: 5
    name: 验证通用性
    action: |
      验证修改后的通用性：

      **验证方法**：
      1. 检查是否还有特定模型引用
      2. 评估指令是否足够通用
      3. 检查长度是否合理
      4. 评估功能是否完整保留

      **通用性标准**：
      - [ ] 无特定模型名称引用？
      - [ ] 指令对大多数模型都有效？
      - [ ] 长度适中（建议 500-2000 字）？
      - [ ] 核心功能完整保留？
    output: 验证结果

  - id: 6
    name: 输出最终结果
    action: |
      最终输出：

      ```markdown
      ## 通用化后的 Prompt

      [完整 Prompt 文本]

      ## 修改内容
      | 原文 | 修改后 | 原因 |
      |------|--------|------|
      | ... | ... | ... |

      ## 兼容性说明
      - 适用于：GPT-4, Claude, Gemini 等主流模型
      - 长度：约 XXX 字
      - 格式：标准 Markdown

      ## 针对特定模型的建议
      | 模型 | 额外建议 |
      |------|----------|
      | GPT | 可添加... |
      | Claude | 可添加... |
      ```
    output: 最终结果

anti_patterns: |
  - 不要删除所有示例，只保留核心
  - 不要为了通用而牺牲核心指令的清晰度
  - 不要假设所有模型都一样，适度保留适配空间
  - 不要过度压缩导致语义改变
  - 不要添加针对所有模型的特定优化（那是过度设计）

failure_modes: |
  - **过度通用化**：丢失了有用的特定优化 → 保留有效的优化，只删除有害的
  - **功能丢失**：核心功能受影响 → 验证核心功能是否保留
  - **长度失控**：通用化后过长 → 回退到策略 4 精简

self_check: |
  - [ ] 是否还有特定模型的引用？
  - [ ] 核心功能是否完整？
  - [ ] 长度是否合理？
  - [ ] 指令是否足够通用？
  - [ ] 是否保持了可读性？

related_prompts:
  - prompt-meta-shorten-prompt-without-losing-quality
  - prompt-meta-evaluate-prompt-quality
  - prompt-meta-adapt-prompt-for-general-model-use
---

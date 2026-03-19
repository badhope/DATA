---
id: prompt-meta-debug-failing-prompt-v1
name: Debug a Failing Prompt
summary: 诊断和修复不生效 Prompt 的系统性调试流程
type: meta
status: active
version: "1.0.0"
owner: skill-repository
category: meta
sub_category: debugging
tags:
  - meta
  - debugging
  - troubleshooting
  - fix
  - prompt
keywords:
  - Prompt调试
  - 故障诊断
  - Prompt修复
  - 问题定位
intent: |
  用于诊断 Prompt 不生效的原因，并进行系统性修复。
  重点是识别 Prompt 中的问题模式，然后针对性修复。
applicable_models:
  - "*"
required_inputs:
  - failing_prompt: string 不生效的 Prompt 文本
  - expected_behavior: string 期望的行为
  - actual_behavior: string 实际行为
  - error_logs: array 错误日志（如有）
outputs:
  - diagnosis: object 诊断结果
  - identified_issues: array 发现的问题列表
  - fixes_applied: array 应用的修复
  - fixed_prompt: string 修复后的 Prompt
  - verification_plan: string 验证计划
steps:
  - id: 1
    name: 收集信息
    action: |
      收集调试所需的信息：

      **必须收集**：
      1. 完整的 Prompt 文本
      2. 期望的输出/行为
      3. 实际的输出/行为
      4. 使用的模型（如知道）

      **可选收集**：
      - 错误日志
      - 上下文历史
      - 多次尝试的结果对比

      **分析维度**：
      - 提示词本身的问题
      - 模型理解的问题
      - 输出格式的问题
      - 上下文的问题

      输出信息清单：
      ```markdown
      Prompt：[完整文本]
      期望：[期望行为]
      实际：[实际行为]
      模型：[使用的模型]
      ```
    output: 收集的信息

  - id: 2
    name: 识别问题类型
    action: |
      系统性检查问题类型：

      **类型 1：结构问题**
      - 缺少必要的结构要素（角色、任务、约束）
      - 结构混乱，层次不清晰
      - 缺少示例或示例不准确

      **类型 2：歧义问题**
      - 描述模糊，有多种理解
      - 指令矛盾（让做又不让做）
      - 术语使用不一致

      **类型 3：约束问题**
      - 约束缺失导致输出不符合要求
      - 约束冲突导致模型困惑
      - 约束过于严格或模糊

      **类型 4：格式问题**
      - 输出格式要求不明确
      - 格式要求与任务不匹配
      - 缺少格式化指导

      **类型 5：上下文问题**
      - 缺少必要的背景信息
      - 上下文太长导致关键信息被忽略
      - 上下文与任务不相关

      对每种可能的问题：
      - 标注问题类型
      - 引用 Prompt 中的具体位置
      - 说明问题表现
    output: 问题清单

  - id: 3
    name: 根因分析
    action: |
      针对识别的问题，分析根本原因：

      **分析方法**：
      1. **最小复现**：创建最简 Prompt 看是否仍有问题
      2. **对比测试**：逐个添加/移除要素看影响
      3. **二分调试**：分半检查，逐步定位

      **常见根因**：
      - **Prompt 层面**：
        - 指令不够明确具体
        - 缺少关键约束
        - 示例不够代表性

      - **任务层面**：
        - 任务对模型来说太难
        - 任务描述有歧义
        - 期望超出模型能力

      - **输出层面**：
        - 格式要求难以遵循
        - 验证标准不明确
        - 缺少后处理指导

      输出根因分析：
      ```markdown
      问题1 → 根因：[分析]
      问题2 → 根因：[分析]
      ```
    output: 根因分析

  - id: 4
    name: 设计修复方案
    action: |
      针对每个根因设计修复：

      **修复策略**：

      **结构问题修复**：
      - 补充缺失的结构要素
      - 重新组织层次结构
      - 添加或更换示例

      **歧义问题修复**：
      - 用更具体的词汇替换模糊词汇
      - 消除指令间的矛盾
      - 统一术语使用

      **约束问题修复**：
      - 添加缺失的约束
      - 澄清模糊的约束
      - 调整过于严格的约束

      **格式问题修复**：
      - 明确输出格式要求
      - 提供格式模板
      - 添加格式验证步骤

      **上下文问题修复**：
      - 补充必要的背景
      - 精简不相关的上下文
      - 使用更清晰的组织方式

      每个修复：
      - 说明改什么
      - 说明为什么这样改
      - 预期效果
    output: 修复方案

  - id: 5
    name: 应用修复
    action: |
      按方案修改 Prompt：

      1. **逐个应用修复**
         - 一次只改一个要素
         - 记录每次修改
         - 验证效果

      2. **避免引入新问题**
         - 检查修改是否影响其他部分
         - 确保修改不产生新的歧义

      3. **保持兼容性**
         - 修改后仍能处理原有有效场景
         - 不破坏已经工作的部分

      输出修复后的 Prompt
    output: 修复后的 Prompt

  - id: 6
    name: 验证修复
    action: |
      验证修复效果：

      **验证计划**：
      1. 使用原测试用例验证
      2. 测试边界情况
      3. 测试相关场景

      **验证标准**：
      - [ ] 原问题是否解决？
      - [ ] 是否引入新问题？
      - [ ] 已有的正常功能是否受影响？

      **结果评估**：
      - 完全修复：问题解决，无新问题
      - 部分修复：问题改善但未完全解决
      - 无效：问题依旧
      - 恶化：引入新问题

      根据结果决定：
      - 完全修复 → 完成
      - 部分修复 → 继续迭代
      - 无效/恶化 → 回退并尝试其他方案
    output: 验证结果

anti_patterns: |
  - 不要猜测原因，要基于证据分析
  - 不要一次改太多，要逐个验证
  - 不要忽略模型能力限制（有些任务模型本身就做不好）
  - 不要过度修复（为小问题添加大量复杂规则）
  - 不要忘记测试修复是否引入新问题

failure_modes: |
  - **问题定位错误**：修复了不对的地方 → 回到根因分析重新审视
  - **过度修复**：添加了不必要的复杂性 → 简化修复方案
  - **模型限制**：问题不在 Prompt 本身 → 坦诚说明，评估是否需要换方案

self_check: |
  - [ ] 问题类型识别是否准确？
  - [ ] 根因分析是否有依据？
  - [ ] 修复方案是否针对根因？
  - [ ] 是否逐个验证了修复效果？
  - [ ] 是否测试了相关场景？

related_prompts:
  - prompt-meta-evaluate-prompt-quality
  - prompt-meta-shorten-prompt-without-losing-quality
  - prompt-meta-refine-ambiguous-request
---

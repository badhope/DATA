---
id: prompt-meta-split-large-prompt-into-modules-v1
name: Split Large Prompt into Modules
summary: 将过长或复杂的 Prompt 拆分为可维护的模块化结构
type: meta
status: active
version: "1.0.0"
owner: skill-repository
category: meta
sub_category: modularization
tags:
  - meta
  - modularization
  - splitting
  - refactoring
  - maintainability
keywords:
  - Prompt拆分
  - 模块化
  - 拆解
  - 重构
  - 维护性
intent: |
  用于将过长或复杂的 Prompt 拆分为多个可独立使用、组合灵活的模块。
  适用于大型工作流、多阶段任务、需要灵活组合的场景。
applicable_models:
  - "*"
required_inputs:
  - large_prompt: string 过长的 Prompt
  - target_module_count: number 目标模块数量（可选）
  - modularization_hint: string 拆解提示（可选）
outputs:
  - module_structure: object 模块化结构设计
  - modules: array 拆分后的模块列表
  - composition_guide: string 组合使用指南
  - refactored_prompt: string 重构后的完整 Prompt
steps:
  - id: 1
    name: 分析原始 Prompt
    action: |
      全面分析原始 Prompt：

      **长度分析**：
      - 统计总长度（字符/词/行）
      - 识别主要区块
      - 标记重复内容

      **结构分析**：
      - 各部分功能
      - 依赖关系
      - 可独立程度

      **问题识别**：
      - 过长导致难以维护
      - 重复导致冗余
      - 耦合导致难以复用

      输出分析报告：
      ```markdown
      总长度：XXX 字符
      主要区块：X 个
      识别的问题：
      - [问题1]
      - [问题2]
      ```
    output: 分析结果

  - id: 2
    name: 识别模块边界
    action: |
      识别可拆分模块的边界：

      **拆分维度**：

      1. **按功能拆分**
      - 角色定义 → 独立模块
      - 任务描述 → 按子任务拆分
      - 输出格式 → 独立模块

      2. **按阶段拆分**
      - 前置处理 → 独立模块
      - 主体处理 → 独立模块
      - 后置处理 → 独立模块

      3. **按可复用性拆分**
      - 通用部分 → 基础模块
      - 专用部分 → 业务模块

      **模块识别标准**：
      - 功能独立（不依赖其他部分）
      - 语义完整（表达一个完整概念）
      - 可被引用（可能被其他 Prompt 使用）

      **依赖关系图**：
      ```markdown
      [模块A] → [模块B]
           ↘        ↙
            [模块C]
      ```
    output: 模块边界

  - id: 3
    name: 设计模块结构
    action: |
      设计拆分后的模块结构：

      **模块类型**：
      1. **核心模块（必须）**
         - 角色定义
         - 主任务
         - 输出格式

      2. **功能模块（可选）**
         - 特定约束
         - 特定示例
         - 特定检查

      3. **辅助模块（可组合）**
         - 上下文补充
         - 工具说明
         - 格式参考

      **模块设计原则**：
      - 每个模块只负责一件事
      - 模块间通过接口传递信息
      - 保持模块内聚性

      **命名规范**：
      ```
      模块名：{功能}_{类型}
      例如：role_base, task_coding, output_json
      ```
    output: 模块设计

  - id: 4
    name: 执行拆分
    action: |
      按设计执行拆分：

      **拆分步骤**：
      1. 提取核心模块
      2. 识别可复用部分
      3. 移除重复内容
      4. 建立模块间引用

      **拆分格式**：
      ```markdown
      ## 模块：{模块名}
      ### 类型：core/optional/auxiliary
      ### 依赖：无/{其他模块名}
      ### 内容：
      {模块内容}
      ### 引用方式：
      \`\`\`引用：{模块名}\`\`\`
      ```
    output: 拆分后的模块

  - id: 5
    name: 设计组合机制
    action: |
      设计模块的组合方式：

      **组合方式**：
      1. **直接引用**：在 Prompt 中引用其他模块
      2. **条件组合**：根据条件选择模块
      3. **顺序组合**：按顺序拼接模块

      **引用语法**：
      ```markdown
      [模块引用语法]
      当需要 {功能} 时，使用：
      {引用标记}
      ```

      **组合示例**：
      ```
      基础组合：
      {core_role} + {core_task} + {core_output}

      完整组合：
      {core_role} + {core_task} + {optional_constraint} + {core_output}
      ```
    output: 组合机制

  - id: 6
    name: 生成模块化 Prompt
    action: |
      生成最终的模块化版本：

      **输出格式**：
      ```markdown
      # 模块化 Prompt 文档

      ## 模块索引

      | 模块名 | 类型 | 用途 | 依赖 |
      |--------|------|------|------|
      | ... | ... | ... | ... |

      ## 模块详情

      ### {模块1}
      内容...

      ### {模块2}
      内容...

      ## 组合指南

      ### 标准组合
      {使用说明}

      ### 可选扩展
      {使用说明}

      ## 完整 Prompt（直接使用）

      [包含所有模块的完整版本]
      ```
    output: 最终结果

anti_patterns: |
  - 不要过度拆分（每个模块都要有意义）
  - 不要拆分后丢失必要的上下文
  - 不要创建难以理解的抽象层次
  - 不要忽略模块间的依赖关系
  - 不要拆分后难以组合回原意

failure_modes: |
  - **拆分过细**：模块太碎难以管理 → 合并相关的模块
  - **依赖混乱**：模块间依赖关系复杂 → 简化依赖，只保留必要的
  - **上下文丢失**：拆分后丢失关键信息 → 确保核心上下文在各模块中都引用

self_check: |
  - [ ] 每个模块是否功能独立？
  - [ ] 模块间依赖是否清晰？
  - [ ] 拆分后核心功能是否完整保留？
  - [ ] 组合后是否等于原始 Prompt？
  - [ ] 模块是否易于维护和扩展？

related_prompts:
  - prompt-meta-evaluate-prompt-quality
  - prompt-meta-shorten-prompt-without-losing-quality
  - prompt-meta-compose-multiple-prompts-for-one-task
---

---
id: prompt-tool-use-combine-multiple-tool-results-v1
name: Combine Multiple Tool Results
summary: 组合多个工具结果，强调在聚合来自不同工具的结果时处理冲突和依赖关系
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: aggregation
tags:
  - tool-use
  - combine
  - aggregation
  - merge
  - results
keywords:
  - 组合结果
  - 结果聚合
  - 合并
  - 多工具
intent: |
  用于在组合来自多个工具的结果时，系统性地处理信息整合、
  冲突解决和依赖关系，确保最终输出的一致性和完整性。
applicable_models:
  - "*"
required_inputs:
  - tool_results: array 各工具的结果
  - task_objective: string 任务目标
  - priority: string 优先级（可选）
outputs:
  - consolidated_results: object 整合后的结果
  - conflicts: array 发现的冲突
  - resolved_conflicts: array 已解决的冲突
  - dependency_graph: object 依赖关系图
  - final_output: object 最终输出
steps:
  - id: 1
    name: 收集和分类结果
    action: |
      1. 收集所有工具的结果
      2. 按来源工具分类
      3. 识别每类结果的类型

      分类维度：
      - **数据类型**：配置/状态/统计/关系
      - **格式类型**：结构化/非结构化
      - **优先级**：核心/辅助/参考

      整理格式：
      ```markdown
      工具 A 结果:
      - 类型: [类型]
      - 数据: [数据]

      工具 B 结果:
      - 类型: [类型]
      - 数据: [数据]
      ```
    output: 分类后的结果

  - id: 2
    name: 分析依赖关系
    action: |
      1. 识别结果间的依赖关系
      2. 确定信息的引用关系
      3. 构建依赖图

      依赖类型：
      - **引用依赖**：B 结果引用了 A 的信息
      - **时序依赖**：B 依赖 A 的执行
      - **逻辑依赖**：B 的正确性依赖 A
      - **独立**：两者无依赖

      依赖图格式：
      ```
      [结果A] --> [结果B]
      [结果A] --> [结果C]
      [结果B] --> [结果D]
      ```
    output: 依赖关系

  - id: 3
    name: 检测冲突
    action: |
      检查不同工具结果间的冲突：

      **冲突类型**：
      - **数据冲突**：同一数据不同值
      - **逻辑冲突**：推理结果矛盾
      - **格式冲突**：数据结构不一致
      - **优先级冲突**：不同优先级设置

      检测方法：
      1. 对比相同的数据点
      2. 检查逻辑一致性
      3. 验证格式兼容性

      对每个冲突：
      - 描述冲突内容
      - 列出涉及的来源
      - 评估冲突严重程度
    output: 冲突清单

  - id: 4
    name: 解决冲突
    action: |
      针对每个冲突，选择合适的解决策略：

      **解决策略**：
      1. **优先级策略**：按来源优先级选择
      2. **时间策略**：选择最新的
      3. **验证策略**：通过第三方验证
      4. **合并策略**：取交集或并集
      5. **保留策略**：标注冲突，让用户决定

      解决决策点：
      - 官方来源 > 非官方
      - 直接测量 > 推测
      - 最新 > 旧
      - 结构化 > 非结构化

      对每个解决的冲突：
      - 选择哪个
      - 原因
      - 其他选项的标注
    output: 冲突解决

  - id: 5
    name: 整合结果
    action: |
      1. 按依赖关系排序
      2. 合并兼容的信息
      3. 应用冲突解决策略
      4. 生成统一格式

      整合规则：
      - 独立信息：直接合并
      - 依赖信息：按依赖顺序整合
      - 冲突信息：应用解决策略

      输出格式：
      ```markdown
      # 整合结果

      ## 核心发现
      [最重要的 2-3 个发现]

      ## 详细结果
      [按类别整理]

      ## 数据表
      [结构化数据]

      ## 未解决项
      [如有]
      ```
    output: 整合后的结果

  - id: 6
    name: 生成最终输出
    action: |
      基于整合结果：
      1. 生成面向目标的最终输出
      2. 确保格式符合要求
      3. 添加必要的元数据

      输出结构：
      ```markdown
      # 最终输出

      ## 结论
      [直接回答目标问题]

      ## 依据
      - [依据1]
      - [依据2]

      ## 详细信息
      [详细数据]

      ## 置信度
      [评估]

      ## 限制和不确定性
      [如有]
      ```
    output: 最终输出

used_skills: []
used_prompts:
  - prompt-tool-use-produce-structured-tool-summary
decision_points:
  - |
    **如果无法解决冲突**：
    - 标注所有选项
    - 说明冲突原因
    - 保留给用户决定

  - |
    **如果存在循环依赖**：
    - 打破循环（选择优先级最高的）
    - 标注循环问题
    - 说明解决方法

  - |
    **如果某结果完全不可用**：
    - 排除该结果
    - 标记为不可用
    - 说明原因

  - |
    **如果结果超过预期量**：
    - 按优先级筛选
    - 保留核心结果
    - 标注省略的内容

final_deliverables:
  - 整合后的结果
  - 冲突清单
  - 已解决的冲突
  - 依赖关系图
  - 最终输出

notes: |
  - 核心原则：整合而非堆砌
  - 冲突要明确解决，不回避
  - 依赖关系要理清
  - 最终输出要面向目标
  - 保留追溯能力

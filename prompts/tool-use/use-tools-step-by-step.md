---
id: prompt-tool-use-use-tools-step-by-step-v1
name: Use Tools Step by Step
summary: 工具使用步骤指南，强调系统性使用工具而非一次性获取所有信息
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: systematic
tags:
  - tool-use
  - step-by-step
  - systematic
  - tools
  - process
keywords:
  - 工具使用
  - 步骤
  - 系统性
  - 流程
intent: |
  用于指导系统性使用工具的方法论。强调按步骤使用工具，
  每步验证后再进入下一步，避免遗漏重要信息和过早下结论。
applicable_models:
  - "*"
required_inputs:
  - task: string 任务目标
  - available_tools: array 可用的工具列表
  - constraints: string 约束条件（可选）
outputs:
  - tool_sequence: array 工具使用顺序
  - step_results: array 每步的结果
  - verification_points: array 验证点
  - intermediate_conclusions: array 中间结论
  - final_result: string 最终结果
steps:
  - id: 1
    name: 分析任务，确定需要的工具
    action: |
      1. 理解最终目标
      2. 分解为中间目标
      3. 确定需要的工具

      工具分类：
      - **文件读取工具**：读取代码、配置、文档
      - **搜索工具**：搜索代码、文档、网络
      - **分析工具**：分析代码结构、性能
      - **执行工具**：运行命令、测试
      - **生成工具**：生成代码、文档

      依赖关系分析：
      - 哪些信息可以并行获取？
      - 哪些信息需要依赖前一步的结果？
      - 正确的执行顺序是什么？
    output: 工具使用计划

  - id: 2
    name: 执行第一步
    action: |
      1. 使用指定的第一个工具
      2. 记录执行过程
      3. 收集输出结果

      执行时注意：
      - 使用工具的完整功能
      - 记录工具的完整输出
      - 注意错误和警告信息
      - 记录执行时间（如相关）

      输出格式：
      ```
      工具：[工具名称]
      输入：[使用的输入]
      输出：[完整输出摘要]
      错误/警告：[如有]
      ```
    output: 第一步结果

  - id: 3
    name: 验证结果
    action: |
      每步执行后验证：
      1. 检查输出是否有效
      2. 检查输出是否完整
      3. 检查是否出现错误

      验证标准：
      - 有输出？[ ]
      - 输出格式正确？[ ]
      - 包含所需信息？[ ]
      - 无错误？[ ]

      如果验证失败：
      - 诊断问题
      - 调整工具参数
      - 或更换工具
      - 重新执行
    output: 验证结果

  - id: 4
    name: 分析中间结果，决定下一步
    action: |
      基于当前结果：
      1. 提取有用信息
      2. 识别知识缺口
      3. 决定下一步使用什么工具
      4. 或决定是否可以得出结论

      决策点：
      - 信息是否足够完成目标？
      - 是否需要更多工具？
      - 是否遇到阻塞需要换方向？
      - 是否可以进入下一步？
    output: 下一步决策

  - id: 5
    name: 重复步骤 2-4 直到完成
    action: |
      对每个后续步骤：
      1. 执行工具
      2. 验证结果
      3. 分析结果
      4. 决定是否继续

      终止条件：
      - 达到最终目标
      - 确定无法继续
      - 时间/资源限制
      - 风险过高

      记录每个步骤：
      - 工具和参数
      - 执行结果
      - 验证状态
      - 决策原因
    output: 所有步骤结果

  - id: 6
    name: 聚合结果
    action: |
      1. 汇总所有中间结果
      2. 识别结果间的关联
      3. 处理可能的矛盾
      4. 形成最终结论

      聚合方式：
      - 按信息类型分类
      - 按时间线组织
      - 按可信度排序
      - 识别主信息和噪音
    output: 最终结果

used_skills: []
used_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-search-before-concluding
decision_points:
  - |
    **如果某步骤失败**：
    - 分析失败原因
    - 尝试替代方法
    - 记录失败和替代
    - 继续或重新规划

  - |
    **如果结果超出预期**：
    - 分析新信息
    - 可能需要调整计划
    - 记录变化

  - |
    **如果遇到循环**：
    - 检查是否在重复同样的搜索
    - 记录已尝试的方法
    - 决定是否继续或放弃

  - |
    **如果时间耗尽**：
    - 整理已有结果
    - 基于不完全信息给出结论
    - 标注哪些未完成

final_deliverables:
  - 工具使用顺序
  - 每步执行结果
  - 验证点状态
  - 中间结论
  - 最终结果
  - 执行日志

notes: |
  - 核心原则：系统性、验证性、记录性
  - 每步都要验证，不跳过
  - 记录所有执行过程便于追溯
  - 中间结论要有依据
  - 最终结果应整合所有步骤

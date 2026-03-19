---
id: prompt-tool-use-analyze-folder-then-plan-v1
name: Analyze Folder Then Plan
summary: 先分析目录结构再制定计划，强调在不了解结构前不盲目行动
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: folder-analysis
tags:
  - tool-use
  - folder
  - directory
  - analysis
  - planning
keywords:
  - 目录分析
  - 文件夹分析
  - 分析后计划
  - 结构分析
intent: |
  用于在处理文件系统任务前，先系统性地分析目录结构，
  理解文件组织后再制定具体的操作计划。
applicable_models:
  - "*"
required_inputs:
  - task: string 任务描述
  - target_path: string 目标路径
  - task_type: string 任务类型（可选：搜索/修改/创建/删除）
outputs:
  - folder_structure: object 目录结构
  - file_inventory: array 文件清单
  - key_files: array 关键文件
  - analysis_summary: string 分析摘要
  - action_plan: array 行动计划
  - risk_assessment: object 风险评估
steps:
  - id: 1
    name: 扫描目录结构
    action: |
      1. 列出目标目录的顶层内容
      2. 递归了解子目录结构
      3. 识别目录的组织方式

      扫描时记录：
      - 目录层级
      - 目录命名模式
      - 关键子目录
      - 空目录（可能需要删除）

      输出格式：
      ```
      [root]
      ├── [dir1]/
      │   ├── [subdir1]/
      │   └── [file1]
      ├── [dir2]/
      └── [file2]
      ```
    output: 目录结构

  - id: 2
    name: 识别文件类型
    action: |
      1. 识别文件类型（代码/配置/文档/资源）
      2. 识别关键文件（入口点/配置文件）
      3. 识别可能不需要的文件（临时/缓存）

      文件分类：
      - **代码文件**：.js/.ts/.py/.java 等
      - **配置文件**：.json/.yaml/.toml/.env 等
      - **文档文件**：.md/.txt/.pdf 等
      - **资源文件**：.png/.jpg/.css 等
      - **临时文件**：.tmp/.cache 等

      对每类文件：
      - 记录数量
      - 记录大小
      - 标记关键文件
    output: 文件清单

  - id: 3
    name: 定位关键文件
    action: |
      根据任务类型识别关键文件：

      **搜索任务**：
      - 目标文件位置
      - 相关索引文件

      **修改任务**：
      - 需要修改的文件
      - 相关依赖文件

      **创建任务**：
      - 创建位置
      - 模板文件（如果有）

      **删除任务**：
      - 要删除的文件
      - 不应删除的文件

      关键文件识别标准：
      1. 入口文件
      2. 配置文件
      3. 索引文件
      4. 与任务直接相关的文件
    output: 关键文件列表

  - id: 4
    name: 分析文件内容
    action: |
      对关键文件进行内容分析：
      1. 读取关键文件
      2. 理解文件内容和作用
      3. 识别文件间的关系

      分析维度：
      - **依赖关系**：哪些文件依赖哪些
      - **引用关系**：哪些文件引用哪些
      - **数据流**：数据如何流动
      - **配置依赖**：依赖哪些配置

      使用 `read-files-before-answering` 的方法
    used_prompts:
      - prompt-tool-use-read-files-before-answering
    output: 文件内容分析

  - id: 5
    name: 制定行动计划
    action: |
      基于分析结果：
      1. 确定具体的操作步骤
      2. 确定操作顺序
      3. 识别需要注意的点

      计划格式：
      ```
      步骤 1: [操作]
      - 文件: [文件路径]
      - 操作: [具体做什么]
      - 验证: [如何验证]

      步骤 2: ...
      ```

      排序原则：
      1. 先处理依赖关系
      2. 后处理被依赖的
      3. 并行处理独立的
    output: 行动计划

  - id: 6
    name: 风险评估
    action: |
      评估行动计划的风险：
      1. 误操作风险
      2. 影响范围
      3. 回滚难度

      风险点：
      - 删除操作是否可逆
      - 修改操作是否影响其他功能
      - 创建操作是否覆盖已有文件

      缓解措施：
      - 备份
      - 增量操作
      - 验证每步
    output: 风险评估

used_skills: []
used_prompts:
  - prompt-tool-use-read-files-before-answering
decision_points:
  - |
    **如果目录结构混乱**：
    - 尝试理解现有的组织逻辑
    - 建议更好的组织方式
    - 标注异常

  - |
    **如果发现大量临时文件**：
    - 建议清理
    - 确认不影响功能
    - 提供清理规则

  - |
    **如果关键文件缺失**：
    - 分析原因
    - 判断是否需要创建
    - 建议标准内容

  - |
    **如果操作风险高**：
    - 提供替代方案
    - 建议分步执行
    - 确保可回滚

final_deliverables:
  - 目录结构图
  - 文件清单
  - 关键文件分析
  - 分析摘要
  - 行动计划
  - 风险评估

notes: |
  - 核心原则：先理解结构，再制定计划
  - 不盲目操作不了解的目录
  - 识别关键文件，不遗漏
  - 行动计划要具体可执行
  - 始终考虑回滚

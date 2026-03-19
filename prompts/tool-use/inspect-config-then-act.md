---
id: prompt-tool-use-inspect-config-then-act-v1
name: Inspect Config Then Act
summary: 先检查配置再行动，强调在修改系统前必须先理解当前配置状态
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: configuration
tags:
  - tool-use
  - config
  - configuration
  - inspection
  - before-action
keywords:
  - 配置检查
  - 配置
  - 检查
  - 先检查后行动
intent: |
  用于强调在修改代码、部署应用、安装包等操作前，必须先检查和理解当前配置。
  避免因配置不一致导致的错误和问题。
applicable_models:
  - "*"
required_inputs:
  - planned_action: string 计划执行的操作
  - config_paths: array 相关的配置文件路径（可选）
  - environment: string 环境信息（可选）
outputs:
  - current_config: object 当前配置状态
  - config_analysis: object 配置分析
  - potential_issues: array 潜在问题
  - action_plan: array 行动方案
  - risk_assessment: object 风险评估
steps:
  - id: 1
    name: 列出相关配置文件
    action: |
      根据计划的操作，识别需要检查的配置文件：

      **代码修改相关**：
      - package.json / requirements.txt / Cargo.toml
      - tsconfig.json / .eslintrc
      - .env 文件
      - 框架配置文件

      **部署相关**：
      - docker-compose.yml
      - kubernetes 配置
      - nginx/apache 配置
      - CI/CD 配置

      **系统配置**：
      - 系统环境变量
      - 服务配置文件
      - 数据库配置

      识别方法：
      1. 从项目结构推断
      2. 从错误信息推断
      3. 从操作类型推断
    output: 配置文件清单

  - id: 2
    name: 读取配置
    action: |
      按优先级读取配置文件：
      1. 系统级配置文件
      2. 项目级配置文件
      3. 环境特定配置

      读取时记录：
      - 文件路径
      - 配置项和值
      - 配置的来源（默认/环境变量/命令行）
      - 配置的生效范围

      格式：
      ```
      [配置文件路径]
      - [配置项1]: [值] (来源)
      - [配置项2]: [值] (来源)
      ```
    output: 配置清单

  - id: 3
    name: 分析配置
    action: |
      分析读取的配置：
      1. 识别关键配置项
      2. 检查配置的一致性
      3. 识别可能的配置问题

      检查项：
      - **版本兼容性**：依赖版本是否兼容
      - **路径正确性**：路径是否存在
      - **权限设置**：权限是否正确
      - **环境差异**：不同环境配置是否正确
      - **默认值**：是否依赖未设置的默认值

      常见问题：
      - 环境变量未设置
      - 配置文件格式错误
      - 路径引用不存在
      - 版本不兼容
    output: 配置分析

  - id: 4
    name: 识别潜在问题
    action: |
      基于分析识别问题：
      1. 当前配置是否支持计划的操作？
      2. 是否需要修改配置？
      3. 配置变更可能影响什么？

      问题分类：
      - **阻塞问题**：必须解决才能继续
      - **警告问题**：可能引起问题，建议解决
      - **信息问题**：需要关注但不一定行动

      对每个问题：
      - 描述问题
      - 影响范围
      - 建议的处理方式
    output: 问题清单

  - id: 5
    name: 制定行动计划
    action: |
      基于配置检查结果：
      1. 如果有阻塞问题 → 先解决配置问题
      2. 如果有警告问题 → 决定是否先解决
      3. 确认可以安全执行后 → 制定执行步骤

      行动计划格式：
      ```
      1. [操作1] - 针对 [配置项]
      2. [操作2] - 针对 [配置项]
      ...
      执行操作: [计划的操作]
      ```
    output: 行动计划

  - id: 6
    name: 风险评估
    action: |
      评估配置相关的风险：
      1. 配置变更的影响范围
      2. 回滚难度
      3. 恢复时间

      风险等级：
      - 高：影响核心功能，难回滚
      - 中：影响部分功能，可回滚
      - 低：影响小，易恢复

      缓解措施：
      - 备份当前配置
      - 记录变更内容
      - 准备回滚命令
    output: 风险评估

used_skills: []
used_prompts:
  - prompt-tool-use-read-files-before-answering
decision_points:
  - |
    **如果发现配置问题**：
    - 评估问题严重程度
    - 决定是先修复还是继续
    - 记录发现的问题

  - |
    **如果缺少关键配置**：
    - 确认是否使用默认值
    - 检查是否需要创建配置
    - 建议的标准值是什么

  - |
    **如果配置存在但格式错误**：
    - 识别格式问题
    - 尝试理解意图
    - 建议正确格式

  - |
    **如果多个环境配置不一致**：
    - 列出差异
    - 评估影响
    - 建议统一方案

final_deliverables:
  - 当前配置清单
  - 配置分析结果
  - 潜在问题列表
  - 行动方案
  - 风险评估

notes: |
  - 核心原则：先检查配置，再执行操作
  - 记录所有检查过的配置
  - 问题要具体，不要泛泛而谈
  - 行动计划要可执行
  - 始终考虑回滚方案

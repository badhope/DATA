---
id: prompt-workflow-new-repo-onboarding-v1
name: New Repo Onboarding Workflow
summary: 新项目快速上手工作流，用于陌生代码仓库的全面分析和理解
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: onboarding
tags:
  - workflow
  - onboarding
  - repo-analysis
  - understanding
  - context-building
keywords:
  - 新项目
  - 代码分析
  - 仓库理解
  - 快速上手
  - context
intent: |
  用于帮助 AI 或开发者在面对陌生代码仓库时，通过系统性的分析流程快速理解项目结构、
  技术栈、关键模块和入口点，建立足够的上下文以便后续进行调试、功能开发或代码修改。
applicable_models:
  - "*"
required_inputs:
  - repo_path: string 仓库路径或根目录
  - task_objective: string 后续任务目标（可选，如调试/功能开发/代码审查）
  -已知信息: string 任何已知的项目背景信息（可选）
outputs:
  - project_map: object 项目结构地图
  - tech_stack: array 技术栈列表
  - key_modules: array 关键模块及职责
  - entry_points: array 入口点文件
  - dependencies: object 主要依赖关系
  - context_summary: string 为后续任务准备的上下文摘要
  - confidence_score: number 理解置信度 (0-1)
steps:
  - id: 1
    name: 扫描仓库结构
    action: |
      使用 `analyze-repository-structure` 或手动扫描仓库：
      1. 列出所有顶层目录和文件
      2. 识别项目类型（Web/后端/库/工具等）
      3. 找到配置文件（package.json, Cargo.toml, requirements.txt 等）
      4. 识别构建和启动脚本
    used_prompts:
      - prompt-task-repo-analysis-analyze-repository-structure
    output: 仓库结构概览

  - id: 2
    name: 分析技术栈
    action: |
      1. 读取 package.json/pyproject.toml/Cargo.toml 等依赖文件
      2. 识别主要框架和库
      3. 确定语言和运行时版本
      4. 了解项目分类（前端/后端/全栈/CLI/库）
    output: 技术栈清单

  - id: 3
    name: 识别关键模块
    action: |
      1. 分析 src/ 或 lib/ 目录结构
      2. 识别主要模块及其职责
      3. 理解模块间依赖关系
      4. 标记核心业务逻辑位置
    output: 模块结构图

  - id: 4
    name: 定位入口点
    action: |
      1. 查找 main 函数或入口文件
      2. 识别路由配置（API路由/页面路由）
      3. 找到中间件/插件加载点
      4. 确定初始化逻辑
    output: 入口点列表

  - id: 5
    name: 分析依赖关系
    action: |
      1. 查看构建配置文件
      2. 理解模块间调用关系
      3. 识别外部服务依赖
      4. 标记配置加载顺序
    output: 依赖关系图

  - id: 6
    name: 生成上下文摘要
    action: |
      根据任务目标，生成针对性的上下文摘要：
      - 如果是调试任务：标记可能的问题位置
      - 如果是功能开发：标记相关的现有实现
      - 如果是代码审查：标记重点审查区域
    output: 任务特定的上下文摘要

used_skills:
  - repo-analysis
  - research
used_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-summarize-project-architecture
  - prompt-routing-identify-task-type-and-route
decision_points:
  - |
    **如果仓库规模巨大（>1000文件）**：
    - 先聚焦与任务相关的目录
    - 使用 `locate-bug-related-files` 或 `analyze-folder-then-plan`
    - 标记未扫描的区域

  - |
    **如果缺少文档**：
    - 从代码注释和函数命名推断
    - 标记"文档缺失"警告
    - 建议后续补充文档

  - |
    **如果技术栈不熟悉**：
    - 使用 `research` 快速了解该技术栈
    - 标记需要学习的知识点

final_deliverables:
  - 结构化的项目地图（markdown 或 JSON）
  - 技术栈清单
  - 关键模块职责说明
  - 入口点位置
  - 针对任务目标的上下文摘要
  - 理解置信度评分

notes: |
  - 此工作流应在新项目或陌生代码库时首先执行
  - 生成的上下文摘要将作为后续工作流的基础输入
  - 如果任务中途遇到理解障碍，可随时重新执行此工作流的相关步骤
  - 保持输出结构化，便于后续 AI 任务使用

---
# Context

你是一个项目引导系统。当面对一个陌生的代码仓库时，你需要通过系统性的分析流程快速建立对项目的理解，为后续的调试、功能开发或代码修改任务做好准备。

此工作流遵循"先理解再执行"原则，确保在任何代码操作前都有足够的上下文。

## 适用场景

— 接手新项目
— 调试前需要了解代码库
— 开发新功能前需要理解现有实现
— 代码审查前的快速了解
— 重构前的结构分析

## 核心原则

1。 **先分析后操作**：不跳過分析步骤
2。 **工具辅助**：使用工具读取文件，而非仅凭记忆
3。 **结构化输出**：保持信息结构化便于后续使用
4。 **任务导向**：根据后续任务目标调整分析深度

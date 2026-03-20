---
id: prompt-routing-scan-repository-and-build-task-map-v1
name: Scan Repository and Build Task Map
summary: 扫描仓库结构，构建任务地图，指导后续 Prompt 选择和执行顺序
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: _routing
sub_category: repository-scanning
tags: [routing, repository, task-map, indexing, discovery]
keywords: [仓库扫描, 任务地图, 自主检索, Prompt 路由]
intent: 在执行任务前，先完整扫描 Skill/Prompt 仓库，建立任务上下文地图，确定后续使用的 Prompts、Skills、Workflows 及其执行顺序
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - qwen-plus
  - deepseek-v3
  - minimax-large
input_requirements:
  - repository_root: string (必填) 仓库根目录路径
  - current_task: string (必填) 当前要执行的任务描述
  - available_modules: string[] (可选) 已知的可用模块列表，默认扫描全仓库
output_requirements:
  - task_map: object 包含以下字段：
    - primary_task_type: string 主要任务类型
    - sub_tasks: array 子任务列表
    - recommended_prompts: array 推荐的 Prompts 列表（含路径和优先级）
    - recommended_skills: array 推荐的 Skills 列表（含路径）
    - recommended_workflows: array 推荐的 Workflows 列表（含路径）
    - execution_order: array 执行顺序建议
    - context_summary: string 任务上下文摘要
  - scan_results: object 扫描结果详情
  - confidence_score: number 任务识别置信度 (0-1)
tool_requirements: []
preconditions:
  - 已获取仓库的完整或部分目录结构
  - 已了解当前任务的基本描述
anti_patterns:
  - 不要在未扫描的情况下假设任务类型
  - 不要忽略仓库中已有的相关 Prompts/Skills
  - 不要返回过于笼统的任务分类
  - 不要遗漏用户明确提到的需求
failure_modes:
  - 仓库结构不完整时：标记为"部分扫描"，标注未扫描的目录
  - 任务描述模糊时：输出多个可能的解读供用户选择
  - 找不到相关 Prompts 时：返回最通用的 fallback 建议
self_check: |
  执行前检查：
  □ 是否已读取 INDEX.md 了解仓库整体结构
  □ 是否已检查 registry/ 目录中的注册表
  □ 是否已遍历 prompts/、skills/、workflows/ 目录
  □ 当前任务是否与某个已有 Prompts 的 intent 高度匹配
  □ 推荐的 Prompts 是否形成逻辑执行链
related_skills:
  - skill-analysis-repo-structure
  - skill-productivity-task-breakdown
related_workflows:
  - workflow-sequential-task-execution
  - workflow-multi-step-problem-solving
related_prompts:
  - prompt-routing-identify-task-type-and-route
  - prompt-routing-select-relevant-prompts-from-index
---

# Context

你是一个智能 Prompt 路由系统。当用户给你一个任务时，你需要先扫描整个 Skill/Prompt 仓库，理解仓库的结构和可用资源，然后构建一个任务地图，指导后续使用哪些 Prompts、Skills、Workflows，以及以什么顺序执行。

这个仓库遵循统一的目录结构：
— `prompts/_routing/` — 路由和检索 Prompt
— `prompts/system/` — 系统级 Prompt
— `prompts/task/` — 任务型 Prompt
— `prompts/workflow/` — 工作流 Prompt
— `skills/` — 可复用的技能单元
— `workflows/` — 多步骤工作流
— `registry/` — 注册表和索引
— `INDEX.md` — 全局索引

# Prompt Body

## 阶段 1：仓库结构扫描

你需要进行以下扫描步骤：

### 1。1 读取全局索引
首先读取仓库根目录的 `INDEX.md`，了解：
— 仓库的整体结构和分类
— 各个模块的统计信息
— 常用的 Prompt/Skill 组合

### 1。2 扫描 Prompts 目录
遍历 `prompts/` 目录，识别：
— 所有 `_routing` 类 Prompts（优先级最高）
— 所有 `system` 类 Prompts（作为基础）
— 与当前任务相关的 `task` 类 Prompts
— 相关的 `workflow` 类 Prompts

### 1。3 扫描 Skills 目录
遍历 `skills/` 目录，识别：
— 与当前任务相关的 Skills
— Skills 的输入输出定义
— Skills 之间的依赖关系

### 1。4 扫描 Workflows 目录
遍历 `workflows/` 目录，识别：
— 可直接复用的 Workflows
— Workflows 引用的 Skills 和 Prompts

### 1。5 检查 Registry
查看 `registry/` 目录中的注册表，获取：
— 所有 Tags 的分布
— Prompts/Skills 之间的关系图
— 按场景的推荐组合

## 阶段 2：任务分析与映射

基于扫描结果，对当前任务进行分类：

### 2。1 确定任务类型
将任务归类到以下主类型之一或多个：
— **coding**： 代码生成、修改、调试
— **debugging**： 错误分析、问题定位、修复
— **research**： 信息收集、分析、总结
— **writing**： 内容创作、文档撰写
— **planning**： 任务规划、拆解、执行
— **analysis**： 数据分析、架构分析
— **design**： 设计方案、UI/UX
— **automation**： 流程自动化、脚本编写
— **review**： 代码审查、知识回顾

### 2。2 识别子任务
将复杂任务拆分为子任务，每个子任务对应一个 Prompt 或 Skill。

### 2。3 建立执行顺序
确定：
— 哪些任务必须串行执行
— 哪些任务可以并行执行
— 依赖关系是什么

## 阶段 3：输出任务地图

根据分析结果，生成结构化的任务地图。

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| repository_root | string | 是 | 仓库根目录路径 |
| current_task | string | 是 | 当前要执行的任务描述 |
| task_context | string | 否 | 额外的上下文信息 |
| preferred_modules | string[] | 否 | 用户偏好的模块 |

# Usage Notes

1。 **首次使用**：当获得一个新的任务时，首先运行此 Prompt 进行仓库扫描
2。 **任务复杂时**：将此 Prompt 作为工作流的第一个步骤
3。 **任务简单时**：如果任务非常明确，可以跳过此步骤直接使用相关 Prompt
4。 **组合使用**：此 Prompt 的输出应传递给 `identify-task-type-and-route` 进行细化路由

# Example Input

```yaml
repository_root: /skill-repository
current_task： "我需要为一个 Vue 3 项目添加用户认证功能，包括登录、注册、Token 管理"
task_context： "项目使用 Vite + Pinia，已有基本的项目结构"
preferred_modules: ["coding", "security"]
```

# Example Output

```yaml
task_map:
  primary_task_type: coding
  sub_tasks:
    - id: 1
      name： "需求分析"
      type: analysis
      recommended_prompts:
        - path: "prompts/task/coding/analyze-requirement.md"
          priority: 1
    - id: 2
      name： "架构设计"
      type: design
      recommended_prompts:
        - path: "prompts/task/design/api-design.md"
          priority: 1
    - id: 3
      name： "代码生成"
      type: coding
      recommended_prompts:
        - path: "prompts/task/coding/generate-code-from-requirement.md"
          priority: 1
    - id: 4
      name： "代码审查"
      type: review
      recommended_prompts:
        - path: "prompts/task/coding/review-code-for-quality.md"
          priority: 2
  recommended_prompts:
    - path: "prompts/_routing/identify-task-type-and-route.md"
      priority: 1
      reason： "细化任务类型和路由"
    - path: "prompts/task/coding/generate-code-from-requirement.md"
      priority: 1
      reason： "核心任务"
    - path: "prompts/task/coding/review-code-for-quality.md"
      priority: 2
      reason： "质量保障"
  recommended_skills:
    - path: "skills/coding/coding-agent-system.md"
    - path: "skills/coding/code-generation.md"
  recommended_workflows:
    - path: "workflows/multi-step/feature-development.md"
  execution_order:
    - step: 1
      action： "运行 identify—task—type—and—route"
      depends_on: []
    - step: 2
      action： "按顺序执行 sub_tasks"
      depends_on: [1]
  context_summary： "为 Vue 3 项目添加完整的用户认证功能"
confidence_score: 0.85
scan_results:
  total_prompts_scanned: 45
  total_skills_scanned: 28
  total_workflows_scanned: 12
  matched_prompts: 8
  matched_skills: 5
  matched_workflows: 2
```

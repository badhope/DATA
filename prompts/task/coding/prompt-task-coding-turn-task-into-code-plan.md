---
id: prompt-coding-turn-task-into-code-plan
name: Turn Task Description into Code Plan
summary: 将任务描述转换为可执行的代码实现计划
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: plan
tags:
  - task-planning
  - implementation-plan
  - code-plan
keywords:
  - task
  - plan
  - implementation
  - breakdown
intent: |
  将模糊的任务描述转换为详细的代码实现计划。
  适用于需求较大或模糊，需要先拆解和规划的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - task_description: string (required) 任务描述
  - project_context: string (optional) 项目上下文
  - constraints: string (optional) 约束条件
  - existing_files: string[] (optional) 相关的现有文件
output_requirements:
  - plan_summary: string 计划概要
  - steps: string[] 分步骤说明
  - file_changes: object 新增/修改文件计划
  - dependencies: object 内部和外部依赖
  - risks: string[] 潜在风险
  - verification: string[] 验证步骤
tool_requirements:
  - Read 读取相关项目文件了解上下文
  - Glob 查找相关模块和依赖
  - Search 搜索相关实现
preconditions: |
  - 任务描述应当包含足够的背景信息
  - 建议提供项目类型和现有代码结构
anti_patterns: |
  - 不要制定过于笼统或过于细节的计划
  - 不要忽略现有的代码和约定
  - 不要制定无法在合理时间内完成计划
failure_modes:
  - 任务太模糊: 要求更多细节或提出假设
  - 范围太大: 提出分阶段方案
  - 依赖不清: 列出需要调研的依赖项
self_check: |
  - [ ] 计划是否覆盖了任务的所有方面？
  - [ ] 每个步骤是否足够小且可执行？
  - [ ] 步骤之间是否有清晰的依赖关系？
  - [ ] 是否有可衡量的验收标准？
  - [ ] 风险是否都被识别并有应对方案？
related_skills:
  - skill-planning
  - skill-repo-analysis
related_workflows:
  - workflow-planning
  - workflow-task-breakdown
related_prompts:
  - prompt-planning-break-down-task
  - prompt-coding-generate-from-requirement
  - prompt-planning-create-execution-plan
---

# Context

大型或模糊的任务需要先规划再执行。这个 prompt 帮助 AI 将任务描述转化为详细的代码实现计划，包括步骤分解、文件变更、依赖分析和风险评估。

# Prompt Body

你是一个软件架构师。用户的输入是一个任务描述。请将这个任务转换为一个可执行的代码实现计划。

## 输入信息

```
任务描述：
{task_description}

项目上下文：
{project_context}

约束条件：
{constraints}

相关现有文件：
{existing_files}
```

## 工作流程

1。 **理解任务**：明确任务的目标和范围
2。 **识别关键点**：确定核心功能和边界
3。 **拆分步骤**：将任务分解为可执行的小步骤
4。 **分析依赖**：确定需要的文件和外部依赖
5。 **评估风险**：识别潜在的问题和风险
6。 **制定验证**：确定如何验证每个步骤的完成

## 输出要求

### 1。 计划概要
用 2—3 句话总结这个计划要做什么。

### 2。 步骤分解

| 步骤 | 描述 | 目标文件 | 依赖步骤 | 预估复杂度 |
|------|------|---------|---------|-----------|
| 1 | …… | ... | - | 低 |
| 2 | …… | ... | 1 | 中 |
| ... | ... | ... | ... | ... |

### 3。 文件变更计划

```
新增文件：
— src/services/xxx。ts (新增服务)
— src/types/xxx。ts (新增类型定义)

修改文件：
— src/services/yyy。ts (添加方法)
— src/routes/index。ts (注册路由)
```

### 4。 依赖分析

```
外部依赖：
— package—a@^1。0。0 (用于 XXX)

内部依赖：
— src/utils/helper。ts (现有工具函数)
— src/services/base。ts (基类)
```

### 5。 风险评估

| 风险 | 影响 | 可能性 | 应对方案 |
|------|------|--------|---------|
| 风险1 | 高 | 中 | 方案…… |
| 风险2 | 低 | 高 | 方案…… |

### 6。 验证计划

| 步骤 | 验证方式 | 成功标准 |
|------|---------|---------|
| 1 | 单元测试 | 测试通过 |
| 2 | 手动测试 | 功能正常 |
| ... | ... | ... |

### 7。 建议的实施顺序
说明推荐的执行顺序和原因。

## 约束条件

— 计划应当具体、可执行、有验收标准
— 每个步骤应当可以在 2—4 小时内完成
— 识别所有必要的文件和依赖变更
— 考虑对现有代码的影响
- 提供多个可选方案（如果有）
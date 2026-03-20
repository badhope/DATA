# Prompts 仓库索引

> **你是第一次来这里？** 从下面的「快速入门」开始，只需要 3 步就能学会怎么用！

---

## 🚀 快速入门（新手必读）

### 第一步：了解这个仓库能做什么

这个仓库是一个 **Prompt 工具箱**，里面存放了各种"任务说明书"。每个 Prompt 就像一张配方卡，告诉你如何让 AI 完成特定任务。

**举例说明：**
- 你想让 AI 帮你修 Bug？→ 用「调试类」Prompt
- 你想让 AI 帮你写代码？→ 用「编程类」Prompt
- 你想让 AI 帮你分析项目？→ 用「仓库分析类」Prompt

### 第二步：按场景选择 Prompt

**你遇到的场景是哪个？**

| 你的场景 | 去哪里找 | 怎么用 |
|----------|----------|--------|
| 我不知道该用哪个 Prompt | 先读 `_routing/` | 让 AI 自动帮你选 |
| 我要让 AI 帮我写代码 | 用 `task/coding/` | 直接复制 Prompt 使用 |
| 我要让 AI 帮我修 Bug | 用 `task/debugging/` | 按顺序执行 4 个步骤 |
| 我要让 AI 帮我分析项目 | 用 `task/repo-analysis/` | 选一个合适的开始 |
| 我要让 AI 做多步骤任务 | 用 `workflow/` | 按流程执行 |
| 我要 AI 的回答是特定格式 | 用 `output/` | 组合使用 |
| 我想优化一个 Prompt | 用 `meta/` | 让 AI 帮你改写 |

### 第三步：复制和使用

1. 找到你需要的 Prompt 文件
2. 复制文件中的 **Prompt Body** 部分
3. 粘贴给 AI 使用

---

## 📚 完整分类地图

```
┌─────────────────────────────────────────────────────────┐
│                      快速入口                            │
├─────────────────────────────────────────────────────────┤
│  不知道用什么 Prompt？  →  _routing/  (AI 自动帮你选)   │
│  想了解整体结构？       →  看下面的分类详解               │
└─────────────────────────────────────────────────────────┘

                    ┌─────────┐
                    │ routing │  ← AI 自动路由（先读这个）
                    └────┬────┘
                         │
┌──────────┐    ┌─────────┼─────────┐    ┌──────────┐
│  system  │    │   task  │         │    │ workflow │
│ (定义行为)│───→│ (做任务)│         │───→│ (多步骤) │
└──────────┘    └─────────┬─────────┘    └──────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
    ┌────▼────┐     ┌─────▼────┐     ┌─────▼────┐
    │ coding  │     │ debugging│     │ repo    │
    └─────────┘     └──────────┘     │analysis  │
         │                │          └─────────┘
         │                │               │
    ┌────▼────┐     ┌─────▼────┐     ┌─────▼────┐
    │ planning│     │ research │     │  output  │  ← 输出格式
    └─────────┘     └──────────┘     └──────────┘
                          │
                     ┌────▼────┐
                     │  meta   │  ← Prompt 优化工具
                     └─────────┘
```

---

## 🎯 按场景查找

### 场景 1：我是新手，不知道从哪开始

**推荐顺序：**
1. 先读 `_routing/scan-repository-and-build-task-map` - 让 AI 帮你了解仓库
2. 再读 `identify-task-type-and-route` - 让 AI 帮你选择

**或者直接告诉我你想做什么：**

| 我想... | 推荐阅读 |
|---------|----------|
| 让 AI 帮我写代码 | `task/coding/generate-code-from-requirement` |
| 让 AI 帮我修 Bug | `task/debugging/` 整个目录 |
| 让 AI 帮我分析项目 | `task/repo-analysis/analyze-repository-structure` |
| 让 AI 帮我做计划 | `task/planning/create-execution-plan` |
| 让 AI 帮我做研究 | `task/research/prepare-research-brief` |

---

### 场景 2：我要完成一个复杂任务（多步骤）

**使用 Workflow Prompt：**

| 任务类型 | 对应 Workflow |
|----------|---------------|
| 接手新项目 | `workflow/new-repo-onboarding-workflow` |
| 调查 Bug | `workflow/bug-investigation-workflow` |
| 实现新功能 | `workflow/feature-implementation-workflow` |
| 代码阅读后做修改 | `workflow/repo-reading-to-change-plan-workflow` |
| 做研究并写报告 | `workflow/research-to-summary-workflow` |
| 把模糊需求变具体 | `workflow/vague-request-to-action-workflow` |
| 选择和组合 Prompts | `workflow/prompt-selection-composition-workflow` |
| 工具辅助调试 | `workflow/tool-assisted-debug-workflow` |
| 生成项目文档 | `workflow/documentation-generation-workflow` |
| 变更验证和报告 | `workflow/change-verify-and-report-workflow` |

---

### 场景 3：我要让 AI 的回答是特定格式

**使用 Output Prompt：**

| 需要的格式 | 用这个 Prompt |
|-----------|---------------|
| Markdown 报告 | `output/output-as-markdown-report` |
| JSON 结构 | `output/output-as-json-structure` |
| YAML 配置 | `output/output-as-yaml-config` |
| 检查清单 | `output/output-as-checklist` |
| 对比表格 | `output/output-as-comparison-table` |
| 分步骤计划 | `output/output-as-step-by-step-plan` |

---

### 场景 4：我想优化或调试 Prompt

**使用 Meta Prompt：**

| 我的需求 | 用这个 Prompt |
|---------|---------------|
| 把模糊想法变成完整 Prompt | `meta/expand-rough-idea-into-high-quality-prompt` |
| 优化不明确的请求 | `meta/refine-ambiguous-request` |
| 把自然语言转成结构化 Prompt | `meta/convert-natural-language-to-structured-prompt` |
| 调试一个不生效的 Prompt | `meta/debug-a-failing-prompt` |
| 压缩 Prompt 但不丢失质量 | `meta/shorten-prompt-without-losing-quality` |
| 让 Prompt 适配更多模型 | `meta/adapt-prompt-for-general-model-use` |
| 评估 Prompt 质量 | `meta/evaluate-prompt-quality` |
| 把长 Prompt 拆成模块 | `meta/split-large-prompt-into-modules` |

---

## 📖 分类详解

### `_routing/` - 自主路由类

**这是什么：** 帮助 AI 自动选择和组合 Prompt 的提示词。

**何时用：**
- 面对新项目，不知道该用什么
- 需要组合多个 Prompts
- 想让 AI 自动规划工作流程

**包含 4 个 Prompt：**
| 名称 | 用途 |
|------|------|
| `scan-repository-and-build-task-map` | 扫描仓库，建立任务地图 |
| `identify-task-type-and-route` | 识别任务类型并路由 |
| `select-relevant-prompts-from-index` | 从索引选择相关 Prompt |
| `compose-multiple-prompts-for-one-task` | 组合多个 Prompts |

---

### `system/` — 系统级提示词

**这是什么：** 定义 AI 的基础行为方式。

**何时用：**
— 作为所有任务的基础
— 需要明确 AI 的角色定位

**包含 3 个 Prompt：**
| 名称 | 用途 |
|------|------|
| `general-ai-workbench` | 通用 AI 工作台 |
| `coding-agent` | 编程 Agent 行为准则 |
| `debugging-agent` | 调试 Agent 行为准则 |

---

### `task/` - 任务型提示词

**这是什么：** 针对具体任务的提示词，可以直接完成特定工作。

#### `task/coding/` - 编程类
| 名称 | 用途 |
|------|------|
| `generate-code-from-requirement` | 从需求生成代码 |
| `implement-feature-from-spec` | 从规格实现功能 |
| `review-code-for-quality` | 代码质量审查 |

#### `task/debugging/` - 调试类
| 名称 | 用途 |
|------|------|
| `identify-root-cause` | 识别根因 |
| `generate-debug-plan` | 生成调试计划 |
| `fix-bug-safely` | 安全修复 |
| `verify-fix-after-change` | 验证修复 |

#### `task/repo-analysis/` - 仓库分析类
| 名称 | 用途 |
|------|------|
| `analyze-repository-structure` | 分析仓库结构 |
| `locate-bug-related-files` | 定位 Bug 相关文件 |
| `summarize-project-architecture` | 总结项目架构 |

#### `task/planning/` - 规划类
| 名称 | 用途 |
|------|------|
| `create-execution-plan` | 创建执行计划 |
| `break-down-task-into-subtasks` | 拆解任务 |

#### `task/research/` - 研究类
| 名称 | 用途 |
|------|------|
| `prepare-research-brief` | 准备研究简报 |

---

### `workflow/` — 工作流提示词

**这是什么：** 多步骤的完整工作流程模板。

**何时用：**
— 需要按顺序执行多个步骤
— 复杂任务需要明确流程指引

---

### `tool-use/` - 工具调用提示词

**这是什么：** 强调使用工具后得出结论的提示词。

**何时用：**
- 需要先读取文件再回答
- 需要先搜索再下结论
- 需要系统性使用工具

---

### `output/` — 输出格式提示词

**这是什么：** 标准化输出格式模板。

**何时用：**
— 需要特定格式的报告
— 需要结构化输出
— 需要符合特定规范

---

### `meta/` - Prompt 优化提示词

**这是什么：** 优化、调试和重写其他 Prompt 的工具。

**何时用：**
- 想优化现有 Prompt
- Prompt 效果不好需要调试
- 需要把通用 Prompt 改写为特定场景

---

## 🔧 常用组合推荐

| 你的目标 | 推荐组合（按顺序使用） |
|----------|----------------------|
| **写代码** | `system/coding-agent` → `task/coding/generate-code` |
| **修 Bug** | `system/debugging-agent` → `task/debugging/identify-root-cause` → `generate-debug-plan` → `fix-bug-safely` → `verify-fix` |
| **分析项目** | `system/general-ai-workbench` → `task/repo-analysis/analyze-repository-structure` |
| **做规划** | `system/general-ai-workbench` → `task/planning/create-execution-plan` |
| **做研究** | `system/general-ai-workbench` → `task/research/prepare-research-brief` |

---

## 📋 Prompt 文件标准字段

每个 Prompt 文件都包含以下字段，方便 AI 理解和检索：

| 字段 | 说明 |
|------|------|
| `id` | 唯一标识符 |
| `name` | 名称 |
| `summary` | 一句话描述 |
| `type` | 类型（workflow/tool-use/output/meta...） |
| `status` | 状态（active/draft/deprecated） |
| `version` | 版本号 |
| `category` | 主分类 |
| `tags` | 标签 |
| `keywords` | 关键词 |
| `intent` | 使用意图 |
| `required_inputs` | 需要的输入 |
| `outputs` | 预期的输出 |
| `steps` | 执行步骤 |
| `related_prompts` | 相关 Prompts |

---

## ❓ 常见问题

**Q： 我不知道该用哪个 Prompt？**
A： 去 `_routing/` 目录，让 AI 帮你选择。

**Q： 多个 Prompt 怎么组合使用？**
A： 看「常用组合推荐」表格，或者用 `workflow/prompt-selection-composition-workflow`。

**Q： 我想让 AI 的回答是特定格式怎么办？**
A： 在任务 Prompt 后面加上对应的 `output/` Prompt。

**Q： 这个 Prompt 效果不好怎么办？**
A： 用 `meta/debug-a-failing-prompt` 来调试。

---

## 📝 维护指南

### 添加新 Prompt
1. 遵循 `_core/prompt-writing-standard.md` 的规范
2. 使用 `_core/prompt-quality-checklist.md` 检查
3. 更新本 INDEX.md
4. 提交 PR

### 版本升级
- 保持向后兼容：`次版本号 +1`（如 1.0 → 1.1）
- 破坏性变更：`主版本号 +1`（如 1.0 → 2.0）

---

**最后更新**：2026—03—19

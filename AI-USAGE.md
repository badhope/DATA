# AI Usage Guide

本文件指导 AI 如何正确使用这个仓库中的 Prompts、Skills 和 Workflows。

---

## 目录

1. [读取顺序](#读取顺序)
2. [如何判断任务类型](#如何判断任务类型)
3. [如何选择 Prompts](#如何选择-prompts)
4. [如何组合多个 Prompts](#如何组合多个-prompts)
5. [何时使用 tool-use](#何时使用-tool-use)
6. [何时使用 output prompt](#何时使用-output-prompt)
7. [避免误选和乱用](#避免误选和乱用)

---

## 读取顺序

当 AI 下载这个仓库后，应按以下顺序读取：

```
1。 README。md              → 了解仓库定位和结构
2。 prompts/INDEX。md       → 了解 Prompts 仓库结构
3。 prompts/_routing/      → 学习如何选择和组合 Prompts
4。 AI—BOOTSTRAP。md        → 启动引导流程
5。 AI—ROUTING。md          → 详细路由指南
```

---

## 如何判断任务类型

### 任务类型识别流程

```
用户输入
    ↓
识别关键词 → 判断类型
    ↓
┌────────────────────────────────────────┐
│ 代码生成/修改？     → task/coding/      │
│ Bug 修复？          → task/debugging/  │
│ 项目分析？          → task/repo-analysis/│
│ 任务规划？          → task/planning/    │
│ 研究调查？          → task/research/    │
│ 复杂多步骤任务？    → workflow/         │
│ 需要特定输出格式？  → output/          │
│ Prompt 本身有问题？ → meta/            │
└────────────────────────────────────────┘
```

### 关键词映射

| 关键词 | 任务类型 | 推荐目录 |
|--------|----------|----------|
| 写代码、生成代码、函数、类 | coding | `task/coding/` |
| Bug、报错、错误、修复、崩溃 | debugging | `task/debugging/` |
| 分析项目、架构、文件结构 | repo-analysis | `task/repo-analysis/` |
| 计划、步骤、分解任务 | planning | `task/planning/` |
| 研究、调查、对比、评估 | research | `task/research/` |
| 流程、多步骤、阶段 | workflow | `workflow/` |
| 格式、JSON、YAML、报告 | output | `output/` |
| Prompt 优化、调试、压缩 | meta | `meta/` |

---

## 如何选择 Prompts

### 选择流程

```
1。 确定任务类型
       ↓
2。 进入对应目录
       ↓
3。 读取 prompt 文件的 intent 字段
       ↓
4。 对比 required_inputs 和你的输入
       ↓
5。 选择最匹配的 prompt
```

### 选择标准

— [ ] `intent` 是否与任务匹配？
— [ ] `required_inputs` 是否可以提供？
— [ ] `applicable_models` 是否包含当前模型？
— [ ] `status` 是否为 `active`？

---

## 如何组合多个 Prompts

### 组合场景

- 复杂任务需要多个步骤
- 单个 Prompt 无法覆盖完整需求
- 需要不同类型的 Prompt 配合

### 组合方法

使用 `prompts/_routing/compose-multiple-prompts-for-one-task.md` 进行组合。

### 组合原则

1. **单一职责**：每个 Prompt 只做一件事
2. **顺序执行**：按依赖顺序排列
3. **信息传递**：前一个 Prompt 的输出作为后一个的输入
4. **格式统一**：使用 output prompt 统一输出格式

---

## 何使用 tool—use

### tool—use 适用场景

| 场景 | 使用的 tool—use prompt |
|------|----------------------|
| 需要读取多个文件 | `read-files-before-answering` |
| 需要执行命令 | `use-command-output-safely` |
| 需要分析文件夹 | `analyze-folder-then-plan` |
| 需要检查配置 | `inspect-config-then-act` |
| 需要搜索信息 | `search-before-concluding` |
| 需要组合工具结果 | `combine-multiple-tool-results` |
| 需要结构化输出工具结果 | `produce-structured-tool-summary` |
| 需要按步骤使用工具 | `use-tools-step-by-step` |

### tool—use 使用流程

```
1。 识别需要使用工具的任务
        ↓
2。 选择合适的 tool—use prompt
        ↓
3。 按 prompt 中的步骤执行
        ↓
4。 使用 combine—multiple—tool—results 组合结果
        ↓
5。 使用 output prompt 格式化最终输出
```

---

## 何时使用 output prompt

### output prompt 适用场景

| 场景 | 使用的 output prompt |
|------|---------------------|
| 需要生成报告 | `output-as-markdown-report` |
| 需要结构化数据 | `output-as-json-structure` |
| 需要配置文件 | `output-as-yaml-config` |
| 需要任务清单 | `output-as-checklist` |
| 需要对比方案 | `output-as-comparison-table` |
| 需要执行计划 | `output-as-step-by-step-plan` |

### output prompt 使用方法

```
1. 完成主要任务
        ↓
2. 识别需要的输出格式
        ↓
3. 在 workflow 末尾组合对应的 output prompt
        ↓
4. 按 output prompt 的格式要求组织输出
```

---

## 避免误选和乱用

### 误选常见原因

1。 **关键词匹配过度**：仅凭几个词就判断类型
2。 **忽略 required_inputs**：选择了无法提供输入的 prompt
3。 **忽略前置条件**：没检查 system prompt 是否需要

### 避免方法

1。 **交叉验证**：多个维度确认任务类型
2。 **读取 intent**：仔细阅读 prompt 的 intent 字段
3。 **小规模测试**：先用简单输入测试 prompt 效果
4。 **回退方案**：准备备选的 prompt 组合

### 自我检查清单

— [ ] 任务类型判断是否有多个证据支持？
— [ ] required_inputs 是否可以全部满足？
— [ ] 选择的 prompt 之间是否有冲突？
— [ ] 组合后是否能完成完整任务？
— [ ] 输出格式是否符合用户期望？

---

## 相关文档

- [AI-BOOTSTRAP.md](AI-BOOTSTRAP.md) - 启动引导
- [AI-ROUTING.md](AI-ROUTING.md) - 详细路由指南
- [prompts/_routing/](prompts/_routing/) - 路由相关 Prompts

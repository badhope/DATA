# AI Skill & Prompt 仓库

<!-- Language Switcher -->
[English](README。md) · [中文](README。zh—CN。md)

---

<!-- Badges -->
[![Version](https://img.shields.io/badge/version-v1.1.0-blue.svg)](https://github.com/badhope/skill)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-yellowgreen.svg)](LICENSE-CODE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-orange.svg)](LICENSE-CONTENT)
[![GitHub stars](https://img.shields.io/github/stars/badhope/skill?style=social)](https://github.com/badhope/skill)

---

## 🎯 一句话定位

模块化的 AI Skill/Prompt/Workflow 资产仓库，同时面向**人类用户**（快速查找复制使用）和 **AI 系统**（自主理解、路由、筛选、组合资产）。

---

## ✨ 仓库内容概览

| 类型 | 数量 | 说明 |
|------|------|------|
| **Prompts** | 80+ | 可直接使用的提示词，覆盖编程、调试、规划、研究等场景 |
| **Skills** | 14 | AI 能力定义，用于任务路由和执行 |
| **Workflows** | 10 | 多步骤执行流程，用于复杂任务 |
| **Tool-Use 指南** | 8 | 文件读取、命令执行等工具的系统化使用指南 |
| **Output 格式** | 6 | JSON、YAML、Markdown、表格、检查清单、报告 |
| **Meta Prompts** | 8 | Prompt 工程工具，用于优化和调试 |

---

## 🚀 快速开始

### 人类用户

```
1。 根据任务类型找到对应目录
2。 选择适合你需求的 prompt
3。 复制粘贴到你的 AI 工具中使用
```

**我想要 AI 帮我……**

| 任务 | 去哪里 |
|------|--------|
| 生成或修改代码 | [prompts/task/coding/](prompts/task/coding/) |
| 调试和修复 Bug | [prompts/task/debugging/](prompts/task/debugging/) |
| 理解代码仓库 | [prompts/task/repo—analysis/](prompts/task/repo—analysis/) |
| 制定执行计划 | [prompts/task/planning/](prompts/task/planning/) |
| 做研究调研 | [prompts/task/research/](prompts/task/research/) |
| 执行多步骤工作流 | [prompts/workflow/](prompts/workflow/) |
| 输出特定格式 | [prompts/output/](prompts/output/) |
| 优化 Prompt | [prompts/meta/](prompts/meta/) |

---

### AI 系统

AI 应按以下顺序读取文件：

```
1. START-HERE.md            → 入口点（本文件会引导你来这里）
2. ARCHITECTURE.md          → 了解设计理念
3. ASSET-MAP.md             → 查看完整资产清单
4. INDEX.md                 → 了解整体结构
5. registry/prompts-registry.yaml → 发现可用 prompts
6. registry/routes-registry.yaml  → 学习任务到资产的路由
7. AI-USAGE.md              → 了解使用模式
8. AI-ROUTING.md            → 了解路由逻辑
9. AI-BOOTSTRAP.md          → 首次使用引导
```

**AI 决策流程：**

```
用户需求
    ↓
【识别任务类型】 → coding / debugging / repo-analysis / planning / research / meta
    ↓
【通过 registry/routes-registry.yaml 路由】
    ↓
【选择主 prompt + 支持性 prompts】
    ↓
【如需工具辅助】 → 从 prompts/tool-use/ 添加
    ↓
【如需特定输出】 → 从 prompts/output/ 添加
    ↓
【如为复杂任务】 → 使用 prompts/workflow/ 中的工作流
    ↓
【如需求不明确】 → 先向用户提问澄清
```

---

## 📁 目录结构

```
skill/
├── README。md              ← 英文入口（你在这里）
├── README。zh—CN。md        ← 中文入口
├── INDEX。md               ← 全局索引
│
├── prompts/               ← 核心 Prompt 资产
│   ├── _routing/          ← AI 自主路由（AI 必读）
│   ├── _core/             ← 核心规范（字段规格、写作标准）
│   ├── system/            ← 系统级 Prompts
│   ├── task/              ← 任务型 Prompts
│   │   ├── coding/        ← 代码生成、审查
│   │   ├── debugging/     ← Bug 调查、修复
│   │   ├── repo—analysis/ ← 项目理解、文件定位
│   │   ├── planning/      ← 任务分解、执行计划
│   │   └── research/      ← 研究简报、调研
│   ├── workflow/          ← 多步骤工作流
│   ├── tool—use/          ← 工具使用指南
│   ├── output/            ← 输出格式控制
│   ├── meta/              ← Prompt 工程工具
│   ├── INDEX。md           ← Prompts 索引
│   └── README。md         ← Prompts 使用说明
│
├── skills/                ← Skill 能力定义（正式主目录）
│   ├── ai—routing/        ← 路由能力
│   ├── coding/            ← 代码生成、审查
│   ├── debugging/         ← Bug 修复
│   ├── planning/          ← 任务规划
│   ├── repo—analysis/     ← 仓库理解
│   ├── research/          ← 研究方法论
│   ├── tool—use/          ← 工具使用
│   ├── prompt—composition/ ← Prompt 组合
│   ├── system—prompts/    ← 系统配置
│   ├── workflows/         ← 工作流指导
│   └── writing/           ← 文章起草
│
├── docs/                  ← 文档
│   └── guides/            ← 规范性指南
│       ├── SPEC。md        ← 完整规范
│       └── templates/     ← 资产模板
│
├── registry/              ← AI 可读的注册表
│   ├── prompts-registry.yaml
│   ├── skills-registry.yaml
│   ├── workflows-registry.yaml
│   ├── tags-registry.yaml
│   ├── relations-registry.yaml
│   └── routes-registry.yaml
│
├── AI—USAGE。md            ← AI 使用指南
├── AI—ROUTING。md          ← AI 路由指南
├── AI—BOOTSTRAP。md        ← AI 启动引导
├── CHANGELOG。md           ← 版本历史
├── PROJECT—PLAN。md         ← 项目规划
├── CONTRIBUTING。md         ← 贡献指南
├── CODE_OF_CONDUCT。md     ← 社区行为准则
├── SECURITY。md            ← 安全政策
├── LICENSE                ← 许可总览
├── LICENSE—CODE           ← Apache—2。0（代码/脚本/配置）
└── LICENSE—CONTENT        ← CC BY 4。0（Prompts/工作流/文档）
```

---

## 📖 资产类型说明

| 类型 | 定义 | 示例 |
|------|------|------|
| **Prompt** | 可直接给 AI 使用的执行指令 | "根据需求描述生成代码" |
| **Skill** | 能力说明，包含适用场景、输入输出 | "调试：系统性 Bug 调查流程" |
| **Workflow** | 多步骤执行流，组合多个 Prompts | "Bug 调查：定位→计划→修复→验证" |
| **Tool-Use** | 文件/命令操作的系统化方法 | "回答前先读取多个文件" |
| **Output** | AI 输出的格式规范 | "以 JSON 结构输出" |
| **Meta** | Prompt 自我优化和调试 | "调试一个失效的 Prompt" |

---

## 🔀 路由与选择

`registry/` 目录使 AI 能够自主选择和组合资产：

| Registry | 用途 |
|----------|------|
| `prompts-registry.yaml` | 所有 Prompts 的元数据，供 AI 发现 |
| `routes-registry.yaml` | 任务到 Prompt 的路由规则 |
| `relations-registry.yaml` | 资产之间的关系 |
| `tags-registry.yaml` | 统一标签词典 |

**路由工作原理：**

1。 AI 读取用户请求
2。 AI 检查 `routes-registry.yaml` 中的匹配 `trigger_patterns`
3。 AI 选择推荐的 `primary_prompt` + `supporting_prompts`
4。 AI 检查 `relations-registry.yaml` 获取相关资产
5。 AI 按选定顺序执行 Prompts

---

## 📋 核心任务覆盖

| 任务类型 | 主 Prompt | 支持性 Prompts |
|---------|-----------|----------------|
| **编程** | generate-code-from-requirement | + read-files, output-markdown-report |
| **调试** | identify-root-cause | + generate-plan, fix-bug, verify-fix |
| **仓库分析** | analyze-repository-structure | + read-files, summarize-architecture |
| **规划** | break-down-task | + create-execution-plan, output-checklist |
| **研究** | prepare-research-brief | + output-markdown-report |
| **Prompt 工程** | debug-failing-prompt | + shorten, evaluate-quality, adapt-general |

---

## 🔒 双许可

本仓库采用**双许可**模式：

| 许可 | 适用范围 |
|------|----------|
| **Apache—2。0** | 代码、脚本、配置（`.trae/skills/`、`.github/`、配置文件） |
| **CC BY 4。0** | 内容资产（所有 `prompts/`、`workflows/`、`skills/`、`docs/`） |

**快速参考：**
— Apache—2。0 许可的内容可在任何项目中自由使用
— CC BY 4。0 许可的内容需注明出处（见 [LICENSE—CONTENT](LICENSE—CONTENT)）

---

## 🤝 贡献

欢迎贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解指南。

---

## 📄 许可

— [LICENSE](LICENSE) — 许可总览
— [LICENSE—CODE](LICENSE—CODE) — Apache—2。0（代码/脚本/配置）
— [LICENSE—CONTENT](LICENSE—CONTENT) — CC BY 4。0（Prompts/工作流/文档）

---

## 📌 版本

**当前版本：v1.0.0**

查看 [CHANGELOG.md](CHANGELOG.md) 了解发布历史。

---

## 🔗 快速链接

— [INDEX。md](INDEX。md) — 全局资产索引
— [prompts/INDEX。md](prompts/INDEX。md) — Prompts 目录索引
— [AI—USAGE。md](AI—USAGE。md) — AI 使用指南
— [AI—ROUTING。md](AI—ROUTING。md) — AI 路由指南
— [AI—BOOTSTRAP。md](AI—BOOTSTRAP。md) — AI 启动引导
— [PROJECT—PLAN。md](PROJECT—PLAN。md) — 项目路线图

---

*本仓库同时为人类可用性和 AI 自主操作而设计。*

# AI Skill & Prompt Repository

<!-- ==================== METADATA ==================== -->
<!--
  repository: badhope/skill
  version: v1.1.0
  description: Modular AI Skill/Prompt/Workflow repository for humans and AI
  topics: [ai, prompts, skills, workflows, coding, debugging]
-->
<!-- ================================================= -->

<!-- Language Switcher -->
[English](README.md) · [中文](README.zh-CN.md)

---

<!-- Badges -->
[![Version](https://img.shields.io/badge/version-v1.1.0-blue.svg)](https://github.com/badhope/skill)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-yellowgreen.svg)](LICENSE-CODE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-orange.svg)](LICENSE-CONTENT)
[![GitHub stars](https://img.shields.io/github/stars/badhope/skill?style=social)](https://github.com/badhope/skill)

---

## 🎯 Overview

A modular **AI Skill/Prompt/Workflow** repository designed for both:

| Audience | Needs |
|----------|-------|
| **Human Users** | Quick find, copy, and use of prompts |
| **AI Systems** | Autonomous understanding, routing, selection, and composition |

---

## ✨ Repository at a Glance

| Category | Count | Description |
|----------|:-----:|-------------|
| **Prompts** | 132+ | Ready-to-use prompts for coding, debugging, planning, research |
| **Skills** | 14 | Capability definitions for AI task routing |
| **Workflows** | 10 | Multi-step execution flows |
| **Tool-Use Guides** | 8 | Systematic approaches to file reading, command execution |
| **Output Formats** | 6 | JSON, YAML, Markdown, tables, checklists, reports |
| **Meta Prompts** | 8 | Prompt engineering tools |

---

## 🚀 Quick Navigation

### For Human Users

> **"I want AI to..."**

| Task | → Go To |
|------|---------|
| 🔨 Generate or modify code | [prompts/task/coding/](prompts/task/coding/) |
| 🐛 Debug and fix bugs | [prompts/task/debugging/](prompts/task/debugging/) |
| 📊 Understand a repository | [prompts/task/repo-analysis/](prompts/task/repo-analysis/) |
| 📋 Create execution plans | [prompts/task/planning/](prompts/task/planning/) |
| 🔬 Conduct research | [prompts/task/research/](prompts/task/research/) |
| 🔄 Execute multi-step workflows | [prompts/workflow/](prompts/workflow/) |
| 📤 Output specific formats | [prompts/output/](prompts/output/) |
| 🛠️ Optimize prompts | [prompts/meta/](prompts/meta/) |

---

### For AI Systems

**Bootstrap Sequence** — Read files in this order:

```
1. START-HERE.md              → Entry point
2. ARCHITECTURE.md            → Design rationale
3. ASSET-MAP.md               → Complete inventory
4. INDEX.md                   → Structure overview
5. registry/prompts-registry.yaml  → Discover prompts
6. registry/routes-registry.yaml   → Learn routing
7. AI-USAGE.md                → Usage patterns
8. AI-ROUTING.md              → Routing logic
9. AI-BOOTSTRAP.md            → First-time setup
```

**Decision Flow:**

```
User Request
     │
     ▼
┌────────────────────────────────────┐
│  Identify Task Type                │
│  coding / debugging / repo-analysis │
│  planning / research / meta        │
└────────────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│  Route via routes-registry.yaml    │
└────────────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│  Select Primary + Supporting Prompts│
└────────────────────────────────────┘
     │
     ├─► [Need tools?]  → prompts/tool-use/
     ├─► [Need format?] → prompts/output/
     ├─► [Complex task?] → workflows/
     └─► [Unclear?]     → Ask clarifying questions
```

---

## 📂 Repository Structure

```
skill/
│
├── 🎯 ENTRY DOCUMENTS
├── START-HERE.md              ← Start here (humans & AI)
├── ARCHITECTURE.md            ← Why this structure
├── ASSET-MAP.md               ← Complete asset inventory
├── DECISION-LOG.md            ← Key decisions & rationale
├── EXTENSION-GUIDE.md         ← How to add new assets
├── MAINTENANCE-RULES.md       ← Standards & conventions
├── QUALITY-STANDARDS.md       ← Quality requirements
│
├── 📖 CORE ENTRY
├── README.md                   ← You are here
├── README.zh-CN.md            ← Chinese version
├── INDEX.md                   ← Master index
│
├── 💬 PROMPTS
├── prompts/
│   ├── _routing/              ← AI routing prompts
│   ├── _core/                 ← Standards & specs
│   ├── system/                ← System prompts
│   ├── task/                   │ ← Task-specific
│   │   ├── coding/            │    20 prompts
│   │   ├── debugging/         │    20 prompts
│   │   ├── repo-analysis/     │    10 prompts
│   │   ├── planning/          │    2 prompts
│   │   ├── research/          │    1 prompt
│   │   ├── refactoring/       │    8 prompts
│   │   ├── testing/           │    8 prompts
│   │   ├── engineering-planning/│  8 prompts
│   │   ├── documentation-for-code/│ 6 prompts
│   │   └── code-review/       │    8 prompts
│   ├── general/                │ ← General capabilities
│   │   ├── clarification/     │    8 prompts
│   │   ├── context-memory/    │    8 prompts
│   │   ├── reasoning/         │    7 prompts
│   │   ├── search/            │    7 prompts
│   │   ├── user-style-adaptation/│ 8 prompts
│   │   ├── long-term-assistant/│  8 prompts
│   │   ├── creative-special/  │   10 prompts
│   │   ├── personal/          │    6 prompts
│   │   ├── reflection/        │    6 prompts
│   │   └── learning-support/  │    8 prompts
│   ├── workflow/               │ ← 10 workflows
│   ├── tool-use/               │ ← 8 tool guides
│   ├── output/                  │ ← 6 output formats
│   └── meta/                   │ ← 8 meta prompts
│
├── 🎯 SKILLS
├── skills/                     ← Canonical skill directory
│   ├── ai-routing/
│   ├── routing/
│   ├── coding/
│   ├── debugging/
│   ├── planning/
│   ├── repo-analysis/
│   ├── research/
│   ├── tool-use/
│   ├── prompt-composition/
│   ├── system-prompts/
│   ├── workflows/
│   └── writing/
│
├── 📚 REGISTRY (AI-readable)
├── registry/
│   ├── prompts-registry.yaml   ← All prompts metadata
│   ├── skills-registry.yaml    ← All skills metadata
│   ├── routes-registry.yaml    ← Task routing rules
│   ├── relations-registry.yaml ← Asset relationships
│   └── tags-registry.yaml     ← Unified tag dictionary
│
├── 📎 EXAMPLES & CURATIONS
├── examples/                   ← Real-world usage examples
│   ├── coding/
│   ├── debugging/
│   ├── general/
│   └── creative-special/
│
├── author-picks/               ← Maintainer recommendations
│
├── 📚 DOCUMENTATION
├── docs/guides/
│   ├── SPEC.md                ← Complete specification
│   └── templates/             ← Asset templates
│
├── 🤖 AI GUIDES
├── AI-USAGE.md                 ← Usage patterns
├── AI-ROUTING.md               ← Routing logic
├── AI-BOOTSTRAP.md             ← Bootstrap guide
│
└── 📄 PROJECT DOCS
├── CHANGELOG.md               ← Version history
├── PROJECT-PLAN.md            ← Roadmap
├── CONTRIBUTING.md            ← Contribution guide
├── CODE_OF_CONDUCT.md         ← Community code
├── SECURITY.md                ← Security policy
└── LICENSE*                   ← Licensing info
```

---

## 📖 Asset Type Definitions

| Type | What It Is | Example |
|------|------------|---------|
| **Prompt** | Executable instruction | "Generate code from requirement" |
| **Skill** | Capability with use cases | "Debugging: investigate → plan → fix → verify" |
| **Workflow** | Multi-step process | "Bug Investigation workflow" |
| **Tool-Use** | Tool operation guide | "Read files before answering" |
| **Output** | Format specification | "Output as JSON structure" |
| **Meta** | Prompt self-optimization | "Debug a failing prompt" |

---

## 🔀 How Routing Works

```
1. AI parses user request
       │
       ▼
2. Match against trigger_patterns in routes-registry.yaml
       │
       ▼
3. Select recommended primary_prompt + supporting_prompts
       │
       ▼
4. Check relations-registry.yaml for related assets
       │
       ▼
5. Execute with selected prompts in sequence
```

---

## 🎯 Core Task Coverage

| Task | Primary Prompt | Supporting |
|------|---------------|------------|
| **Coding** | generate-code-from-requirement | read-files, output-markdown |
| **Debugging** | identify-root-cause | generate-plan, fix-bug, verify |
| **Repo Analysis** | analyze-repository-structure | read-files, summarize-arch |
| **Planning** | break-down-task | create-execution-plan, output-checklist |
| **Research** | prepare-research-brief | output-markdown-report |
| **Prompt Eng.** | debug-failing-prompt | shorten, evaluate, adapt |

---

## 🔒 Dual Licensing Model

| License | Applies To |
|---------|------------|
| **Apache-2.0** | Code, scripts, configs (`.trae/skills/`, configs) |
| **CC BY 4.0** | Content assets (prompts, workflows, skills, docs) |

> ℹ️ Use Apache-2.0 content freely. Use CC BY 4.0 content with attribution.

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📌 Version Info

| Item | Value |
|------|-------|
| **Current Version** | **v1.1.0** |
| **Release Date** | 2026-03-20 |

See [CHANGELOG.md](CHANGELOG.md) for detailed history.

---

## 🔗 Quick Reference

| Need | → Go To |
|------|---------|
| Global index | [INDEX.md](INDEX.md) |
| Prompts index | [prompts/INDEX.md](prompts/INDEX.md) |
| AI usage | [AI-USAGE.md](AI-USAGE.md) |
| AI routing | [AI-ROUTING.md](AI-ROUTING.md) |
| AI bootstrap | [AI-BOOTSTRAP.md](AI-BOOTSTRAP.md) |
| Project plan | [PROJECT-PLAN.md](PROJECT-PLAN.md) |
| Extension guide | [EXTENSION-GUIDE.md](EXTENSION-GUIDE.md) |

---

<!-- Machine-readable footer -->
<!--
  last_updated: 2026-03-20
  total_prompts: 132
  total_skills: 14
  total_workflows: 10
  status: active
-->

*This repository is designed for both **human usability** and **AI autonomous operation**.*

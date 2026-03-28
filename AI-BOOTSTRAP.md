# AI Bootstrap Guide

本文件是 AI 启动引导，用于 AI 下载仓库后快速了解结构并准备执行任务。

---

## 快速启动（3 步）

```
1. 读取 README.md                    → 了解仓库定位和HCSA架构
2. 读取 .trae/skills/README.md       → 了解Skills结构
3. 读取 .trae/skills/config/routing.yaml → 了解路由规则
```

---

## 仓库结构

```
skill/
├── .trae/skills/           # HCSA架构技能库
│   ├── meta/               # 战略层 (任务规划、协调、反思)
│   ├── workflows/          # 战术层 (流程编排)
│   ├── actions/            # 执行层 (具体操作)
│   ├── domains/            # 领域层 (领域专用)
│   ├── config/             # 配置文件
│   └── shared/             # 共享资源
├── docs/                   # 文档
├── src/                    # 源代码
└── tests/                  # 测试
```

---

## HCSA 四层架构

| 层级 | 职责 | 示例 |
|------|------|------|
| **Meta** | 战略规划、任务分解 | task-planner, orchestrator, reflector |
| **Workflow** | 流程编排、状态管理 | coding-workflow, debugging-workflow |
| **Action** | 具体操作、工具调用 | code-generator, test-generator |
| **Domain** | 领域专用知识 | python, react, docker, langchain |

---

## 路由规则

根据任务复杂度自动路由：

- **复杂度 < 3**: 直接调用 Action 或 Domain skill
- **复杂度 3-5**: 使用 Workflow skill 协调
- **复杂度 > 5**: 完整 Meta → Workflow → Action 流程

详见 [.trae/skills/config/routing.yaml](.trae/skills/config/routing.yaml)

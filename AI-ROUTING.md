# AI Routing Guide

本文件详细说明 AI 如何在仓库中进行任务路由和 Skill 选择。

---

## 路由原理

AI 路由是指 AI 根据用户需求，自主判断任务类型、选择合适 Skills、组合使用的工作流程。

```
用户需求
    ↓
[识别阶段]  → 判断任务类型和复杂度
    ↓
[路由阶段]  → 选择合适的 Skill 层级
    ↓
[执行阶段]  → 按选定流程执行
    ↓
[反思阶段]  → 评估结果并优化
```

---

## 路由入口

### 配置文件

| 文件 | 用途 |
|------|------|
| [.trae/skills/config/routing.yaml](.trae/skills/config/routing.yaml) | 路由规则配置 |
| [.trae/skills/README.md](.trae/skills/README.md) | Skills索引 |

---

## 复杂度评估

| 因素 | 权重 | 指标 |
|------|------|------|
| 多步骤 | 2 | "然后"、"同时"、"最后"、多个动词 |
| 跨文件 | 2 | "多个文件"、"模块间"、文件路径 |
| 外部API | 1 | "API"、"服务"、"第三方" |
| 领域专业 | 2 | 技术术语、特定模式 |
| 安全关键 | 2 | "认证"、"安全"、"加密" |

**复杂度 = 各因素权重之和 (最大10)**

---

## 路由策略

### 简单任务 (复杂度 < 3)

```
直接调用 Domain 或 Action 层 skill

示例:
"添加注释" → code-generator
"优化SQL" → sql-optimization
"创建Dockerfile" → docker
```

### 中等任务 (复杂度 3-5)

```
使用 Workflow 层 skill 协调

示例:
"实现登录功能" → coding-workflow
"修复这个bug" → debugging-workflow
```

### 复杂任务 (复杂度 > 5)

```
完整 Meta → Workflow → Action 流程

示例:
"实现用户认证系统" → task-planner → coding-workflow → code-generator
```

---

## 关键词匹配

详见 [.trae/skills/config/routing.yaml](.trae/skills/config/routing.yaml) 中的 `routing_rules`

```yaml
# 示例路由规则
- name: "ai_llm_task"
  condition:
    keywords: ["langchain", "rag", "llm", "prompt"]
  route:
    domain_skill: langchain

- name: "testing_task"
  condition:
    keywords: ["test", "testing", "测试"]
  route:
    domain_skill: unit-test
```

# AI Usage Guide

本文件指导 AI 如何正确使用这个仓库中的 Skills。

---

## 目录

1. [读取顺序](#读取顺序)
2. [如何判断任务类型](#如何判断任务类型)
3. [如何选择 Skills](#如何选择-skills)
4. [避免误选和乱用](#避免误选和乱用)

---

## 读取顺序

当 AI 下载这个仓库后，应按以下顺序读取：

```
1. README.md                        → 了解仓库定位和HCSA架构
2. .trae/skills/README.md           → 了解Skills结构
3. .trae/skills/config/routing.yaml → 学习路由规则
4. AI-BOOTSTRAP.md                  → 启动引导流程
5. AI-ROUTING.md                    → 详细路由指南
```

---

## 如何判断任务类型

### 任务类型分类

| 类型 | 关键词 | 推荐Skill |
|------|--------|-----------|
| **编码** | 实现、开发、创建、编写 | coding-workflow → code-generator |
| **调试** | bug、错误、修复、问题 | debugging-workflow |
| **测试** | 测试、单元测试、集成测试 | unit-test, integration-test |
| **部署** | 部署、Docker、K8s、CI/CD | docker, kubernetes, ci-cd-pipeline |
| **AI/LLM** | LangChain、RAG、Prompt | langchain, rag-system, prompt-engineering |
| **数据库** | SQL、MongoDB、Redis | sql-optimization, mongodb, redis-caching |
| **安全** | 安全、漏洞、审计 | security-auditor |

---

## 如何选择 Skills

### 按复杂度选择

```
复杂度 < 3  → Domain/Action 层
复杂度 3-5  → Workflow 层
复杂度 > 5  → Meta 层
```

### 按领域选择

```
前端开发 → domains/frontend/
后端开发 → domains/backend/
移动开发 → domains/mobile/
AI开发   → domains/ai/
DevOps   → domains/devops/
数据库   → domains/database/
测试     → domains/testing/
```

---

## 避免误选和乱用

### 常见错误

1. **简单任务过度规划**
   - 错误: "添加注释" 使用 task-planner
   - 正确: 直接使用 code-generator

2. **复杂任务跳过规划**
   - 错误: "实现认证系统" 直接写代码
   - 正确: 先用 task-planner 分解任务

3. **领域不匹配**
   - 错误: Python问题使用 typescript skill
   - 正确: 使用 python skill

### 最佳实践

- 先评估复杂度再选择层级
- 匹配任务领域和Skill领域
- 遵循 HCSA 架构流程
- 使用 routing.yaml 中的规则

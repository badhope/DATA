---
id: prompt-task-repo-analysis-summarize-project-architecture-v1
name: Summarize Project Architecture
summary: 输出项目架构的精炼总结，适合快速理解项目设计
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: task
sub_category: repo-analysis
tags: [repo-analysis, architecture, summary, design, overview]
keywords: [架构总结, 设计概述, 项目概要, 架构理解]
intent: 将复杂的项目架构简化为清晰易懂的总结，便于快速理解和沟通
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
  - repo_analysis: object (必填) 仓库分析结果（来自 analyze-repository-structure）
  - focus_summary: boolean (可选) 是否聚焦总结
output_requirements:
  - architecture_summary: object 包含：
    - high_level_design: string 高层设计
    - architecture_pattern: string 架构模式
    - component_interaction: string 组件交互
    - data_flow: string 数据流
    - technology_decisions: array 技术决策
    - design_principles: array 设计原则
tool_requirements: []
preconditions:
  - 应已完成仓库结构分析
anti_patterns:
  - 不要过于深入细节
  - 不要遗漏关键架构决策
  - 不要使用模糊的描述
failure_modes:
  - 分析报告不足时：标注需要补充的信息
  - 结构复杂时：识别主要层次并简化
self_check: |
  总结前检查：
  □ 是否理解了项目的整体架构
  □ 是否识别了核心组件和职责
  □ 是否理解了组件间的交互
  □ 是否了解了数据流向
related_skills:
  - skill-coding-architecture-review
  - skill-repo-analysis
  - skill-productivity-summarization
related_workflows:
  - workflow-repository-onboarding
  - workflow-multi-step-debugging
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-locate-bug-related-files
---

# Context

你是一个经验丰富的架构师，负责将复杂的项目架构简化为清晰的总结。这个 Prompt 强调：
1。 高层次的抽象
2。 清晰的架构模式识别
3。 简洁的表达
4。 重点突出的设计

# Prompt Body

## 阶段 1：高层设计理解

### 1。1 项目定位

```markdown
## 项目定位

### 一句话描述
[用一句话描述这个项目是什么、做什么]

### 核心价值
[项目的核心价值和存在的理由]

### 目标用户
[项目服务的用户群体]
```

### 1。2 架构模式识别

```markdown
## 架构模式

### 整体架构
| 模式类型 | 识别结果 | 依据 |
|----------|----------|------|
| 分层架构 | ✅ | 清晰的层级划分 |
| 微服务 | ❌ | 未发现服务边界 |
| 单体 | ⚠️ | 功能集中 |
| 事件驱动 | ⚠️ | 部分模块使用事件 |

### 架构风格
— [ ] 传统三层架构
— [ ] 洋葱架构 (Onion)
— [ ] 整洁架构 (Clean)
— [ ] 六边形架构 (Hexagonal)
— [ ] 微内核架构
— [ ] 云原生架构
```

## 阶段 2：组件划分

### 2。1 主要组件

```markdown
## 主要组件

### 组件列表
| 组件 | 职责 | 依赖关系 |
|------|------|----------|
| Frontend | 用户界面 | Backend API |
| Backend API | 业务逻辑 | Database， Cache |
| Database | 数据存储 | 无 |
| Cache | 缓存层 | Database |

### 组件关系
```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │ HTTP/gRPC
       ▼
┌─────────────┐
│ Backend API │
└──────┬──────┘
       │
┌──────┴──────┐
│             │
▼             ▼
┌───────┐ ┌───────┐
│ Cache │ │  DB   │
└───────┘ └───────┘
```
```

### 2。2 组件职责

```markdown
## 组件职责

### Frontend (前端)
— **技术栈**：React 18， TypeScript， TailwindCSS
— **职责**：用户交互、UI 渲染、状态管理
— **关键模块**：
  — components/ — UI 组件
  — pages/ — 页面
  — hooks/ — 业务逻辑复用
  — stores/ — 状态管理

### Backend API (后端)
— **技术栈**：Node。js， Express， TypeScript
— **职责**：业务逻辑、API 路由、数据处理
— **关键模块**：
  — controllers/ — 请求处理
  — services/ — 业务逻辑
  — repositories/ — 数据访问
  — middleware/ — 中间件

### Database (数据库)
— **类型**：PostgreSQL
— **职责**：持久化存储
— **模式**：关系型
```

## 阶段 3：数据流

### 3。1 请求处理流

```markdown
## 请求处理流

### 典型请求流程
```
用户操作
    ↓
前端组件
    ↓
API 请求 (HTTP)
    ↓
中间件 (认证、日志)
    ↓
控制器 (Router)
    ↓
服务层 (Business Logic)
    ↓
数据访问层 (Repository)
    ↓
数据库
    ↓
响应逐级返回
```

### 关键数据流
| 数据类型 | 来源 | 处理 | 存储 | 消费 |
|----------|------|------|------|------|
| 用户数据 | 前端表单 | 验证、服务 | PostgreSQL | 后端服务 |
| 认证令牌 | 前端 | 验证 | Redis | 所有请求 |
```

### 3。2 状态管理

```markdown
## 状态管理

### 全局状态
— **管理方式**：Zustand
— **存储位置**：src/stores/
— **用途**：用户信息、UI 状态

### 服务端状态
— **管理方式**：React Query
— **用途**：API 数据缓存

### 表单状态
— **管理方式**：React Hook Form
— **用途**：用户输入
```

## 阶段 4：技术决策

### 4。1 核心技术决策

```markdown
## 核心技术决策

| # | 决策 | 选择 | 权衡 | 理由 |
|---|------|------|------|------|
| 1 | 语言 | TypeScript | 有类型但增加复杂度 | 类型安全 |
| 2 | 框架 | React | 生态好但包大 | 社区成熟 |
| 3 | 状态管理 | Zustand | 简单但功能少 | 轻量级 |
| 4 | API 设计 | REST | 简单但字段冗余 | 易于理解 |

### 决策依据
— 团队技术栈熟悉度
— 性能要求
— 可维护性
— 扩展性需求
```

### 4。2 技术债

```markdown
## 技术债

### 已知技术债
| 项目 | 影响 | 优先级 | 说明 |
|------|------|--------|------|
| 旧版 jQuery | 维护困难 | 中 | 计划迁移 React |
| 硬编码配置 | 不灵活 | 高 | 应移至配置文件 |
| 缺少单元测试 | 质量风险 | 高 | 逐步添加中 |

### 架构限制
— 单体部署，暂不支持微服务
— 关系数据库，不适合海量数据
```

## 阶段 5：设计原则

### 5。1 遵循的设计原则

```markdown
## 设计原则

### SOLID 原则
| 原则 | 应用情况 | 示例 |
|------|----------|------|
| 单一职责 | ✅ 遵循 | 每个类一个职责 |
| 开闭原则 | ⚠️ 部分 | 对扩展开放 |
| 里氏替换 | ✅ 遵循 | 接口抽象 |
| 接口隔离 | ✅ 遵循 | 小接口 |
| 依赖反转 | ✅ 遵循 | 依赖注入 |

### 其他原则
— **DRY**：避免重复代码
— **KISS**：保持简单
— **YAGNI**：不做过度设计
```

### 5。2 架构原则

```markdown
## 架构原则

### 分层原则
— 每一层只依赖下一层
— 依赖通过接口/抽象
— 避免跨层依赖

### 模块化原则
— 高内聚、低耦合
— 模块边界清晰
— 依赖关系单向

### 错误处理原则
— 统一错误处理
— 错误逐级传播
— 不隐藏错误
```

## 阶段 6：输出总结

### 6。1 架构总结

```markdown
# 项目架构总结

## 一句话描述
[项目是什么、做什么]

## 架构模式
[采用的架构模式]

## 核心技术栈
| 层级 | 技术 |
|------|------|
| 前端 | React 18， TypeScript |
| 后端 | Node。js， Express |
| 数据库 | PostgreSQL |
| 缓存 | Redis |

## 主要组件
| 组件 | 职责 | 关键文件 |
|------|------|----------|
| 前端 | UI 和交互 | src/components |
| API | 业务逻辑 | src/services |
| 数据 | 持久化 | src/repositories |

## 数据流
```
[数据流描述]
```

## 关键设计决策
1。 **TypeScript**：类型安全
2。 **React**：生态成熟
3。 **Zustand**：轻量状态管理
4。 **REST API**：易于理解和集成

## 设计特点
— 清晰的分层架构
— 依赖注入解耦
— 统一的错误处理
— 模块化设计
```

### 6。2 快速参考

```markdown
## 快速参考

### 架构图
```
┌──────────────────────────────────────┐
│              Frontend                │
│         (React + Zustand)            │
└─────────────────┬────────────────────┘
                  │ HTTP
                  ▼
┌──────────────────────────────────────┐
│             Backend                  │
│    (Node.js + Express + Services)   │
└─────────────────┬────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐    ┌───────────────┐
│    Cache      │    │   Database    │
│   (Redis)     │    │ (PostgreSQL)  │
└───────────────┘    └───────────────┘
```

### 技术栈速查
— 前端：React， TypeScript， TailwindCSS
— 后端：Node。js， Express， TypeScript
— 数据库：PostgreSQL， Redis
— 测试：Jest， React Testing Library

### 目录结构速查
— 前端：src/components， src/pages， src/stores
— 后端：src/controllers， src/services， src/repositories
```

### 6。3 架构评估

```markdown
## 架构评估

### 优点
— ✅ 分层清晰，职责明确
— ✅ 依赖注入，易于测试
— ✅ 模块化设计，可维护性好
— ✅ 技术栈成熟，文档完善

### 缺点/风险
— ⚠️ 单体架构，扩展性有限
— ⚠️ 部分模块缺少单元测试
— ⚠️ 一些历史代码需要重构

### 扩展性评估
| 维度 | 评估 | 说明 |
|------|------|------|
| 功能扩展 | 🟢 好 | 模块化利于添加新功能 |
| 用户扩展 | 🟡 中 | 需要优化数据库 |
| 数据扩展 | 🟡 中 | 可能需要分库分表 |
```

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| repo_analysis | object | 是 | 仓库分析结果 |
| focus_summary | boolean | 否 | 是否聚焦总结 |

# Usage Notes

1。 **抽象层次**：保持高层视角，不过度深入细节
2。 **清晰表达**：使用图表和表格增强可读性
3。 **重点突出**：强调关键架构决策和设计
4。 **实用性**：输出应能帮助快速理解项目

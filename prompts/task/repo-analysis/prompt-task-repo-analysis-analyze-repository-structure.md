---
id: prompt-task-repo-analysis-analyze-repository-structure-v1
name: Analyze Repository Structure
summary: 全面分析仓库结构，输出结构化的仓库地图
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: task
sub_category: repo-analysis
tags: [repo-analysis, structure-analysis, project-understanding, onboarding, architecture]
keywords: [仓库分析, 结构分析, 项目理解, 代码库分析]
intent: 在面对陌生代码仓库时，快速理解项目结构、模块划分、技术栈和关键文件
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
  - repo_path: string (必填) 仓库路径或根目录文件列表
  - analysis_depth: string (可选) 分析深度 (quick/full)
  - focus_areas: array (可选) 重点关注的领域
output_requirements:
  - analysis_report: object 包含：
    - project_overview: object 项目概览
    - directory_structure: object 目录结构分析
    - tech_stack: object 技术栈
    - key_files: array 关键文件
    - module_map: object 模块地图
    - entry_points: array 入口点
    - dependency_analysis: object 依赖分析
tool_requirements: []
preconditions:
  - 应能访问仓库的文件列表
  - 应能读取关键配置文件
anti_patterns:
  - 不要假设所有仓库都是同一种结构
  - 不要忽略配置文件的价值
  - 不要遗漏构建和部署相关文件
failure_modes:
  - 仓库过大时：分批分析或做采样分析
  - 结构复杂时：识别主要结构并标注复杂点
  - 缺少文档时：从代码中推断结构
self_check: |
  分析前检查：
  □ 是否已识别仓库的根目录和主要子目录
  □ 是否已了解项目的类型（Web/CLI/库/服务等）
  □ 是否已识别构建系统和配置文件
  □ 是否已了解入口文件
related_skills:
  - skill-repo-analysis
  - skill-coding-architecture-review
  - skill-debugging-repository-understanding
related_workflows:
  - workflow-repository-onboarding
  - workflow-multi-step-debugging
related_prompts:
  - prompt-task-repo-analysis-locate-bug-related-files
  - prompt-task-repo-analysis-summarize-project-architecture
  - prompt-debugging-identify-root-cause
---

# Context

你是一个经验丰富的软件架构师，负责快速分析陌生代码仓库的结构。这个 Prompt 强调：
1。 系统性的分析方法
2。 从多维度理解项目
3。 清晰的输出结构
4。 实用的洞察和建议

# Prompt Body

## 阶段 1：项目概览

### 1。1 基本信息收集

```markdown
## 项目基本信息

### 目录结构速览
[列出根目录的文件和文件夹]

### 初步判断
— **项目类型**：[Web 应用 / CLI 工具 / 库 / 服务 / 移动应用 / 其他]
— **主要语言**：[主要编程语言]
— **复杂度估计**：[简单 / 中等 / 复杂]
```

### 1。2 项目定位

```markdown
## 项目定位

### 用途描述
[这个项目是做什么的]

### 目标用户
[谁会使用这个项目]

### 核心价值
[项目的核心功能和价值]
```

## 阶段 2：技术栈分析

### 2。1 语言和框架

```markdown
## 技术栈

### 编程语言
| 语言 | 版本 | 用途 |
|------|------|------|
| TypeScript | 5。x | 主语言 |
| Python | 3。11 | 脚本 |

### 框架
| 框架 | 版本 | 用途 |
|------|------|------|
| React | 18。x | 前端框架 |
| Express | 4。x | 后端框架 |

### 运行时
| 运行时 | 版本 |
|--------|------|
| Node.js | 20.x |
| Bun | 1.x |

### 构建工具
| 工具 | 版本 |
|------|------|
| Vite | 5.x |
| Webpack | 5.x |
```

### 2。2 依赖管理

```markdown
## 依赖管理

### 依赖配置文件
- package.json (Node.js)
- requirements.txt (Python)
- go.mod (Go)
- pom.xml (Java)
- Cargo.toml (Rust)

### 关键依赖
| 依赖 | 版本 | 用途 | 重要性 |
|------|------|------|--------|
| react | 18。x | UI 框架 | 核心 |
| lodash | 4。x | 工具库 | 高 |
```

## 阶段 3：目录结构分析

### 3。1 顶层目录

```markdown
## 顶层目录结构

```
/
├── src/                 # 源代码目录
├── tests/               # 测试目录
├── docs/                # 文档目录
├── configs/             # 配置文件
├── scripts/             # 脚本
├── packages/            # 多包管理
├── public/             # 静态资源
└── build/               # 构建输出
```

### 3。2 源码目录分析

```markdown
## 源码目录分析

### src/ 结构
```
src/
├── components/     # UI 组件
├── pages/          # 页面
├── hooks/          # 自定义 Hooks
├── utils/          # 工具函数
├── services/       # 服务层
├── stores/         # 状态管理
├── types/          # 类型定义
└── constants/      # 常量定义
```

### 职责划分
| 目录 | 职责 | 依赖关系 |
|------|------|----------|
| components | UI 组件 | 无外部依赖 |
| pages | 页面组合 | 依赖 components |
| hooks | 逻辑复用 | 依赖 components/services |
```

## 阶段 4：关键文件识别

### 4。1 配置文件

```markdown
## 关键配置文件

| 文件 | 用途 | 重要性 |
|------|------|--------|
| package。json | 依赖和脚本 | 🔴 必读 |
| tsconfig。json | TypeScript 配置 | 🔴 必读 |
| 。env。example | 环境变量模板 | 🔴 必读 |
| vite。config。ts | 构建配置 | 🟡 重要 |
| 。gitignore | Git 忽略规则 | 🟡 重要 |
```

### 4。2 入口文件

```markdown
## 入口文件

### 主入口
| 文件 | 用途 |
|------|------|
| src/main。ts | 应用入口 |
| src/index。tsx | React 渲染入口 |
| src/App。tsx | 根组件 |

### CLI 入口（如适用）
| 文件 | 用途 |
|------|------|
| bin/cli。js | CLI 入口点 |
```

## 阶段 5：模块地图

### 5。1 模块划分

```markdown
## 模块划分

### 模块结构
| 模块名 | 路径 | 职责 | 对外接口 |
|--------|------|------|----------|
| auth | src/auth | 认证授权 | login()， logout()， checkAuth() |
| user | src/user | 用户管理 | getUser()， updateUser() |
| product | src/product | 产品管理 | CRUD operations |
| order | src/order | 订单管理 | createOrder()， getOrders() |

### 模块依赖关系
```
auth ──────┐
           ├──> user
user ──────┼──> product
           │
order ─────┘
```

### 模块边界
[清晰定义的模块边界和交互方式]
```

### 5。2 核心模块详情

```markdown
## 核心模块详情

### [模块名]
— **路径**：[模块路径]
— **职责**：[模块职责]
— **导出**：[导出的主要接口]
— **依赖**：[模块依赖]
— **关键文件**：[关键文件列表]
```

## 阶段 6：依赖分析

### 6。1 内部依赖

```markdown
## 内部依赖

### 组件依赖关系
| 组件 | 被依赖 | 依赖 |
|------|--------|------|
| Button | Form， Modal | 无 |
| Modal | Form | Button |
| Form | 无 | Input， Button |

### 服务依赖关系
| 服务 | 被依赖 | 依赖 |
|------|--------|------|
| AuthService | UserService | API |
| UserService | OrderService | API, AuthService |
```

### 6。2 外部依赖

```markdown
## 外部依赖

### 核心依赖（不可缺失）
| 依赖 | 版本 | 用途 |
|------|------|------|
| react | 18。x | 核心框架 |
| zustand | 4。x | 状态管理 |

### 可替换依赖
| 依赖 | 版本 | 替代方案 |
|------|------|----------|
| axios | 1.x | fetch, got |
| lodash | 4。x | 原生实现 |
```

## 阶段 7：数据流分析

### 7。1 数据流

```markdown
## 数据流

### 请求数据流
```
用户操作
    ↓
组件事件
    ↓
服务调用 (API)
    ↓
状态更新 (Store)
    ↓
UI 重新渲染
```

### 状态管理
| 状态类型 | 管理方式 | 位置 |
|----------|----------|------|
| 全局状态 | Zustand | src/stores |
| 服务端状态 | React Query | src/hooks |
| 表单状态 | React Hook Form | 组件内部 |
| URL 状态 | React Router | 路由 |
```

## 阶段 8：输出报告

### 8。1 完整分析报告

```markdown
# 仓库结构分析报告

## 项目概览

### 基本信息
— **项目名称**：[名称]
— **项目类型**：[类型]
— **主要语言**：[语言]
— **复杂度**：[复杂度评级]

### 一句话描述
[用一句话描述这个项目]

## 技术栈

### 语言和框架
— **前端**：[框架和版本]
— **后端**：[框架和版本]
— **数据库**：[数据库类型]
— **其他**：[其他重要技术]

### 关键依赖
| 依赖 | 用途 | 重要性 |
|------|------|--------|
| ... | ... | ... |

## 目录结构

### 顶层结构
```
/
├── src/          # 源代码
├── tests/       # 测试
├── configs/     # 配置
└── ...
```

### 模块划分
| 模块 | 路径 | 职责 |
|------|------|------|
| ... | ... | ... |

## 关键文件

| 文件 | 用途 | 优先级 |
|------|------|--------|
| package。json | 依赖管理 | 🔴 必读 |
| tsconfig。json | TS 配置 | 🔴 必读 |

## 模块依赖

### 依赖关系图
```
[模块依赖图]
```

## 入口点

### 应用入口
- src/main.ts

### API 入口
- src/routes/api.ts

## 建议

### 新人 onboarding 路径
1。 阅读 README
2。 了解技术栈
3。 理解目录结构
4。 运行项目
5。 从核心模块开始

### 快速上手建议
[帮助新开发者快速上手的建议]
```

### 8。2 快速参考卡

```markdown
## 快速参考

### 运行项目
```bash
npm install
npm run dev
```

### 关键命令
| 命令 | 用途 |
|------|------|
| npm run dev | 开发模式 |
| npm run build | 构建 |
| npm test | 测试 |

### 目录速查
| 需要找 | 去哪里 |
|--------|--------|
| 组件 | src/components |
| 页面 | src/pages |
| 样式 | src/styles |
| 工具 | src/utils |
| 类型 | src/types |
```

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| repo_path | string | 是 | 仓库路径 |
| analysis_depth | string | 否 | 分析深度 |
| focus_areas | string[] | 否 | 重点关注领域 |

# Usage Notes

1。 **分层分析**：从粗到细，逐步深入
2。 **配置文件优先**：从配置文件快速了解项目
3。 **模块化理解**：理解模块划分和依赖
4。 **实用性为主**：输出对实际工作有帮助的分析

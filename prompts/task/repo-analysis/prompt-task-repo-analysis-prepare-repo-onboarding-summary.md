---
id: prompt-task-repo-analysis-prepare-repo-onboarding-summary-v1
name: Prepare Repo Onboarding Summary
summary: 为新开发者准备项目上手指南，包括环境准备、关键概念、开发流程和资源索引
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - onboarding
  - developer-guide
  - knowledge-transfer
  - new-developer
keywords:
  - 新人上手
  - 开发指南
  - 知识传递
  - 快速开始
  - 开发环境
intent: |
  帮助 AI 为陌生项目生成开发者上手指南，从而能够：
  - 让新开发者快速了解项目
  - 提供清晰的环境准备步骤
  - 索引关键文档和资源
  - 说明开发流程和规范
  - 缩短知识传递时间
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - target_audience: string 目标读者 (new-dev/experienced/cross-team)
  - depth: string 指南深度 (quick-start/detailed/comprehensive)
output_requirements:
  - onboarding_summary: object 包含：
    - project_overview: object 项目概览
    - prerequisites: array 前置要求
    - environment_setup: object 环境准备
    - key_concepts: array 关键概念
    - project_structure: object 项目结构
    - development_workflow: object 开发流程
    - coding_standards: object 代码规范
    - resources: object 资源索引
    - common_tasks: array 常见任务
    - troubleshooting: object 故障排查
tool_requirements:
  - file-reading
  - grep-search
  - directory-listing
preconditions:
  - 已完成项目结构分析
  - 已识别入口文件和配置
  - 已了解代码组织方式
anti_patterns:
  - 不要只列出文件，要解释每个部分"为什么"
  - 不要遗漏新开发者会遇到的常见问题
  - 不要假设开发者已经熟悉所有技术栈
failure_modes:
  - 信息过载：区分必读和选读内容
  - 信息过时：标注需要验证的内容
  - 流程复杂：提供分步骤指导
self_check: |
  分析后检查：
  □ 是否涵盖了新开发者需要的所有关键信息
  □ 是否提供了清晰的分步骤指导
  □ 是否索引了所有重要资源
  □ 是否预测了常见问题
related_skills:
  - skill-repo-analysis
  - workflow-new-repo-onboarding
  - tool-use-read-files-before-answering
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-feature-implementation
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-find-key-config-files
  - prompt-task-repo-analysis-detect-missing-documentation
---

# Context

你是一个经验丰富的开发者导师，负责为陌生项目创建新开发者上手指南。这个 Prompt 强调：
1. 快速建立整体认知
2. 提供可操作的分步骤指导
3. 预测和解答常见问题
4. 索引关键资源
5. 区分必读和选读内容

# Prompt Body

## 阶段 1：项目概览生成

### 1.1 概览信息提取

```markdown
## 项目概览模板

### 基本信息
| 信息 | 内容 | 来源 |
|------|------|------|
| 项目名称 | [从 README 或 package.json 获取] | README.md |
| 项目类型 | [Web 服务 / CLI / 库 / 全栈] | 目录结构 |
| 核心功能 | [一句话描述] | README.md |
| 技术栈 | [主要语言 + 框架] | package.json / pom.xml |
| 代码规模 | [行数 / 文件数] | 代码统计 |

### 快速定位
```markdown
- 这是什么项目？ → [项目定位]
- 它解决什么问题？ → [核心价值]
- 我在哪里可以找到...？
  - 入口文件 → `src/index.ts`
  - API 路由 → `src/routes/`
  - 数据库模型 → `src/models/`
  - 测试文件 → `tests/`
```
```

## 阶段 2：前置要求清单

### 2.1 环境要求

```markdown
## 前置要求

### 必需环境
| 要求 | 版本 | 检查命令 | 安装指南 |
|------|------|----------|----------|
| Node.js | >=18.0 | `node -v` | nodejs.org |
| npm | >=9.0 | `npm -v` | npmjs.com |
| Git | >=2.40 | `git --version` | git-scm.com |

### 可选但推荐
| 工具 | 用途 | 安装方式 |
|------|------|----------|
| nvm | Node 版本管理 | brew install nvm |
| Docker | 本地运行环境 | docker.com |
| Redis | 缓存（某些功能需要） | redis.io |

### 账号/权限要求
- GitHub 账号和仓库访问权限
- 环境变量配置（需向 team lead 申请）
```

### 2.2 知识要求

```markdown
## 知识要求

### 必需技能
- 熟悉 [主要编程语言] 的基本语法
- 了解 RESTful API 设计原则
- 熟悉 Git 版本控制
- 了解 [框架名] 的基本概念

### 推荐了解
- [技术栈相关概念]
- [架构模式，如 DDD/MVC]
- [数据库基本操作]
```

## 阶段 3：环境准备步骤

### 3.1 详细安装步骤

```markdown
## 环境准备（分步骤）

### Step 1: 克隆代码
```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: 安装依赖
```bash
npm install
```

### Step 3: 环境配置
```bash
cp .env.example .env.local
# 编辑 .env.local 填入必要的环境变量
```

### Step 4: 启动开发服务器
```bash
npm run dev
```

### Step 5: 验证安装
打开浏览器访问 http://localhost:3000
应该能看到 [预期页面]
```

### 3.2 常见环境问题

```markdown
## 环境问题排查

| 问题 | 症状 | 解决方案 |
|------|------|----------|
| 依赖安装失败 | npm ERR! | 删除 node_modules 和 package-lock.json，重新 npm install |
| 端口被占用 | EADDRINUSE | 修改 .env 中的 PORT 或 kill 占用的进程 |
| 缺少环境变量 | config error | 检查 .env.local 是否正确配置 |
| Node 版本不对 | engine error | 使用 nvm use 或 nvm install |
```

## 阶段 4：关键概念解释

### 4.1 核心概念清单

```markdown
## 关键概念

### 概念 1: [概念名称]
**是什么**： [一句话解释]
**在哪里使用**： [文件位置或使用场景]
**为什么重要**： [对开发的影响]
**示例代码**：
```typescript
// 示例
```

### 概念 2: [概念名称]
...
```

### 4.2 架构概览图

```markdown
## 架构概览

### 系统结构
```
┌─────────────────────────────────────────────────┐
│                   Client                         │
│               (React SPA)                        │
└─────────────────────┬───────────────────────────┘
                      │ HTTP/REST
┌─────────────────────▼───────────────────────────┐
│                 API Gateway                      │
│              (Express Router)                    │
└──────┬─────────────┬─────────────┬─────────────┘
       │             │             │
┌──────▼──────┐ ┌────▼────┐ ┌─────▼─────┐
│   Auth      │ │  Users   │ │  Products  │
│  Service    │ │ Service  │ │  Service   │
└─────────────┘ └─────────┘ └───────────┘
       │             │             │
┌──────▼─────────────▼─────────────▼─────────────┐
│              Data Layer                          │
│         (MongoDB + Mongoose)                    │
└─────────────────────────────────────────────────┘
```

### 4.3 关键术语表

```markdown
## 术语表

| 术语 | 英文 | 定义 | 在本项目中的用法 |
|------|------|------|------------------|
| 聚合根 | Aggregate Root | DDD 概念，领域实体的根 | Order 聚合根管理 OrderItem |
| 仓储 | Repository | 数据存取抽象 | UserRepository 处理用户数据 |
| DTO | Data Transfer Object | 数据传输对象 | CreateUserDTO 用于创建用户 |
```

## 阶段 5：项目结构解析

### 5.1 目录结构说明

```markdown
## 目录结构

```
project/
├── src/
│   ├── index.ts              # 【入口】应用启动
│   ├── app.ts                # 【配置】Express 应用配置
│   │
│   ├── config/               # 【配置】配置文件
│   │   ├── database.ts       # 数据库连接
│   │   └── redis.ts          # Redis 配置
│   │
│   ├── routes/               # 【路由】API 路由定义
│   │   ├── index.ts          # 路由汇总
│   │   ├── auth.ts           # 认证相关路由
│   │   └── users.ts          # 用户相关路由
│   │
│   ├── controllers/          # 【控制】请求处理
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   │
│   ├── services/             # 【业务】业务逻辑
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   │
│   ├── models/               # 【数据】数据模型
│   │   ├── user.model.ts
│   │   └── order.model.ts
│   │
│   ├── middleware/           # 【中间件】请求中间件
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   └── utils/                # 【工具】工具函数
│       ├── logger.ts
│       └── helpers.ts
│
├── tests/                    # 【测试】测试文件
├── docs/                     # 【文档】项目文档
├── scripts/                  # 【脚本】辅助脚本
└── package.json
```

### 5.2 文件职责速查

```markdown
## 文件职责速查

| 我想... | 去哪里 | 找谁 |
|---------|--------|------|
| 添加新的 API 路由 | src/routes/ | 新建 *.ts 文件 |
| 修改认证逻辑 | src/services/auth.service.ts | AuthService |
| 添加新的数据模型 | src/models/ | 新建 *.model.ts |
| 修改数据库查询 | src/models/*.ts | 对应 Model |
| 添加中间件 | src/middleware/ | 新建 *.middleware.ts |
| 编写测试 | tests/ | 新建 *.test.ts |
```
```

## 阶段 6：开发流程说明

### 6.1 开发工作流

```markdown
## 开发流程

### 日常开发流程
```bash
# 1. 从 main 创建新分支
git checkout main
git pull
git checkout -b feature/your-feature-name

# 2. 开发功能
# ... 编辑代码 ...

# 3. 运行测试
npm test

# 4. 提交代码（遵循 commit 规范）
git commit -m "feat: add user login feature"

# 5. 推送到远程
git push -u origin feature/your-feature-name

# 6. 创建 Pull Request
# 在 GitHub 上创建 PR，等待 review
```

### Commit 规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
test: 测试相关
chore: 构建/工具
```
```

### 6.2 代码审查清单

```markdown
## Pull Request 审查清单

### 提交前自检
- [ ] 代码符合项目代码规范
- [ ] 有新增功能则添加测试
- [ ] 运行 `npm run lint` 无错误
- [ ] 运行 `npm test` 全部通过
- [ ] 更新了相关文档

### PR 描述模板
```markdown
## 描述
[功能/修复的详细描述]

## 类型
- [ ] 新功能
- [ ] Bug 修复
- [ ] 重构
- [ ] 文档更新

## 测试
- [ ] 单元测试
- [ ] 集成测试
- [ ] 手动测试

## 截图（如有 UI 变更）
```
```

## 阶段 7：资源索引

### 7.1 文档资源

```markdown
## 文档资源

| 文档 | 位置 | 描述 | 必读 |
|------|------|------|------|
| README | /README.md | 项目基本介绍 | ✓ |
| 架构文档 | /docs/ARCHITECTURE.md | 系统架构设计 | ✓ |
| API 文档 | /docs/api/ | 接口文档 | ✓ |
| 部署指南 | /docs/DEPLOY.md | 部署说明 | ◐ |
| 代码规范 | /docs/STANDARDS.md | 代码风格 | ◐ |
```

### 7.2 关键联系人

```markdown
## 关键联系人

| 角色 | 职责范围 | 联系方式 |
|------|----------|----------|
| Tech Lead | 架构决策、技术问题 | @lead |
| 代码审查 | Code Review | @reviewers |
| DevOps | 部署、运维 | @devops |
```
```

## 阶段 8：生成上手指南

### 8.1 完整指南结构

```markdown
# 新开发者上手指南

## 🚀 快速开始

### 5 分钟了解本项目
[项目一句话介绍]

### 10 分钟跑起来
```bash
git clone <url>
cd <project>
npm install
cp .env.example .env.local
npm run dev
```

## 📖 深入学习

### 必读文档
1. [架构文档] - 理解系统设计
2. [API 文档] - 了解接口定义
3. [本指南] - 熟悉开发流程

### 开发任务示例
| 任务 | 涉及文件 | 步骤 |
|------|----------|------|
| 添加新 API | routes/, controllers/, services/ | 见示例 |
| 修改数据模型 | models/ | 见示例 |
| 编写测试 | tests/ | 见示例 |

## ❓ 常见问题

| 问题 | 答案 |
|------|------|
| [FAQ 1] | [答案 1] |
| [FAQ 2] | [答案 2] |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `target_audience` | 目标读者 | `new-dev` / `experienced` |
| `depth` | 指南深度 | `quick-start` / `detailed` |
| `tech_stack` | 技术栈 | `["Node.js", "Express", "MongoDB"]` |

# Usage Notes

1. **分层信息**：必读内容放前面，选读内容放后面
2. **渐进式学习**：从"能跑起来"到"理解原理"
3. **预测问题**：提前解答常见问题，减少咨询
4. **持续更新**：建议指定文档负责人，保持内容时效

# Example Input

```yaml
repo_path: "/workspace/nodejs-api"
target_audience: "new-dev"
depth: "detailed"
tech_stack: ["Node.js", "Express", "MongoDB", "TypeScript"]
```

# Example Output

```yaml
onboarding_summary:
  project_overview:
    name: "Node.js API"
    type: "RESTful API Service"
    summary: "提供用户认证和产品管理的 RESTful API"
    tech_stack: ["Node.js", "Express", "MongoDB", "TypeScript"]
  prerequisites:
    - name: "Node.js"
      version: ">=18.0.0"
    - name: "MongoDB"
      version: ">=6.0"
    - name: "Git"
  environment_setup:
    steps:
      - "git clone <url>"
      - "npm install"
      - "cp .env.example .env.local"
      - "npm run dev"
    verification: "curl http://localhost:3000/health"
  key_concepts:
    - name: "分层架构"
      description: "Controller → Service → Repository 分层"
    - name: "JWT 认证"
      description: "使用 JWT token 进行身份验证"
  project_structure:
    src/: "源代码"
    tests/: "测试文件"
    docs/: "文档"
  development_workflow:
    branch: "feature/<name>"
    commit: "Conventional Commits"
    review: "至少 1 人 approval"
  resources:
    docs:
      - name: "API Docs"
        path: "/docs/api"
      - name: "Architecture"
        path: "/docs/ARCHITECTURE.md"
    slack: "#dev-help"
  common_tasks:
    - task: "添加新 API"
      steps: ["在 routes/ 添加路由", "在 controllers/ 添加处理函数", "在 services/ 添加业务逻辑"]
  troubleshooting:
    - issue: "npm install 失败"
      solution: "清除缓存 npm cache clean --force"
```

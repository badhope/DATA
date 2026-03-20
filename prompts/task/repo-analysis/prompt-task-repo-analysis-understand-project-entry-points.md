---
id: prompt-task-repo-analysis-understand-project-entry-points-v1
name: Understand Project Entry Points
summary: 识别项目的入口文件，包括 main 函数、服务启动文件、API 路由注册、事件监听器等
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - entry-points
  - startup
  - initialization
  - bootstrap
keywords:
  - 入口点
  - 启动文件
  - main
  - 初始化
  - 引导
intent: |
  帮助 AI 理解项目的执行起点，从而能够：
  - 知道代码从哪里开始执行
  - 理解服务如何启动
  - 找到 API 路由定义位置
  - 识别事件和回调的注册点
  - 理解请求/命令的处理链路
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - analysis_depth: string 分析深度 (quick/full)
  - known_entry_hints: array 已知入口提示（可选）
output_requirements:
  - entry_points_report: object 包含：
    - primary_entry: object 主要入口（main/startup）
    - api_entry: object API/路由入口
    - event_entry: object 事件/消息入口
    - lib_entry: object 库导出入口
    - execution_flow: array 执行流程链
    - bootstrap_sequence: array 启动顺序
tool_requirements:
  - file-reading
  - grep-search
  - directory-listing
preconditions:
  - 已了解项目基本类型（Web服务/CLI/库/游戏等）
  - 已识别项目使用的语言和框架
anti_patterns:
  - 不要假设所有项目都有传统的 main 函数
  - 不要忽略框架特定的入口方式（如 Spring Boot 的注解、Next.js 的 page 目录）
  - 不要遗漏动态加载的入口点
failure_modes:
  - 多入口项目：列出所有入口并区分主次
  - 延迟加载：标注懒加载点
  - 微服务：识别各服务的独立入口
self_check: |
  分析后检查：
  □ 是否找到主要的启动/入口文件
  □ 是否识别了所有 API 路由注册位置
  □ 是否理解了请求处理链路
  □ 是否识别了事件/消息的处理入口
  □ 是否了解配置加载时机
related_skills:
  - skill-repo-analysis
  - skill-debugging
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-find-key-config-files
---

# Context

你是一个经验丰富的开发者，负责识别陌生项目的执行入口。这个 Prompt 强调：
1. 区分不同类型的入口点（启动入口、API入口、事件入口、库入口）
2. 理解框架特定的入口模式
3. 追踪执行流程链
4. 识别启动顺序和初始化依赖

# Prompt Body

## 阶段 1：识别项目类型和框架

### 1.1 项目类型判断

根据目录结构和文件特征判断项目类型：

```markdown
## 项目类型判断

### 判断依据
- 有 package.json → Node.js/前端项目
- 有 pom.xml/build.gradle → Java 项目
- 有 requirements.txt/Pipfile → Python 项目
- 有 Cargo.toml → Rust 项目
- 有 go.mod → Go 项目

### 框架识别
- 有 app.py/routes.py → Flask
- 有 next.config.js → Next.js
- 有 Application.java → Spring Boot
- 有 main.go → Go 标准项目
```

### 1.2 入口文件特征匹配

| 项目类型 | 常见入口文件 |
|----------|-------------|
| Node.js Web | index.js, app.js, server.js |
| Python CLI | __main__.py, cli.py, main.py |
| Java Spring | Application.java, *Application.java |
| Go CLI | main.go |
| React | src/index.jsx, src/App.tsx |
| Next.js | src/app/page.tsx (App Router) |

## 阶段 2：查找主要入口

### 2.1 启动入口搜索

按优先级搜索以下内容：

```markdown
### 搜索策略

1. **优先级 1：明确入口**
   - 搜索 `main` 函数定义
   - 搜索 `if __name__ == "__main__"`
   - 搜索 `package main`
   - 搜索 `public static void main`

2. **优先级 2：框架入口**
   - Express: `app.listen()`, `server.listen()`
   - Flask: `app.run()`
   - Spring Boot: `@SpringBootApplication`
   - Django: `manage.py`
   - Next.js: `next dev`, `next start`

3. **优先级 3：构建入口**
   - package.json scripts
   - Makefile
   - 构建脚本（build.sh, compile.sh）
```

### 2.2 入口文件内容分析

读取识别到的入口文件，分析：

```markdown
## 入口文件分析

### 文件路径
[入口文件完整路径]

### 关键职责
1. [入口文件负责的初始化工作]
2. [加载的配置/模块]
3. [启动的服务/监听端口]

### 依赖加载顺序
1. [第一个加载的依赖]
2. [第二个加载的依赖]
...
```

## 阶段 3：识别 API/路由入口

### 3.1 路由注册点搜索

```markdown
### API 路由搜索

**常见路由定义位置：**
- REST API: routes/, api/, controllers/
- GraphQL: schema/, graphql/
- gRPC: proto/

**框架特定搜索：**
- Express: `app.use()`, `router.get()`, `app.get/post/put/delete`
- FastAPI: `@app.get()`, `@router.get()`
- Spring: `@RequestMapping`, `@RestController`
- Django: `urlpatterns`
- Rails: `routes.rb`
```

### 3.2 路由结构提取

```markdown
## API 路由结构

### 主要路由模块
| 模块 | 路由前缀 | 处理文件 |
|------|----------|----------|
| [模块名] | [前缀如 /api/v1] | [文件路径] |

### 路由注册顺序
1. [第一个注册的中间件/路由]
2. [第二个注册的中间件/路由]
```

## 阶段 4：追踪执行流程

### 4.1 请求处理链追踪

```markdown
## 请求处理链

### 典型链路示例
```
请求 → 入口文件 → 中间件 → 路由 → 控制器 → 服务 → 数据层
```

### 本项目具体链路
1. [请求入口]
2. [中间件/拦截器]
3. [路由匹配]
4. [控制器/处理器]
5. [业务逻辑/服务层]
6. [数据访问层]
```

### 4.2 事件/消息入口识别

```markdown
## 事件处理入口

### 事件类型
- [ ] WebSocket 事件
- [ ] 消息队列事件
- [ ] 定时任务/CRON
- [ ] Webhook 回调
- [ ] 文件系统事件

### 事件监听位置
| 事件类型 | 监听文件 | 处理函数 |
|----------|----------|----------|
| [类型] | [路径] | [函数名] |
```

## 阶段 5：生成入口点报告

### 5.1 完整报告结构

```markdown
# 项目入口点分析报告

## 执行摘要
[2-3 句话描述项目如何启动和接收请求]

## 1. 主要入口
| 入口文件 | 类型 | 职责 |
|----------|------|------|
| [路径] | main/cli/api | [描述] |

## 2. API/路由入口
| 路由前缀 | 注册位置 | 说明 |
|----------|----------|------|
| /api | routes/index.js | REST API 入口 |
| /ws | websocket/index.js | WebSocket 入口 |

## 3. 启动顺序
1. [加载配置]
2. [初始化日志]
3. [连接数据库]
4. [注册路由]
5. [启动服务器]

## 4. 关键执行流程
[用箭头表示主要执行链]

## 5. 可视化地图
```
[入口] → [中间件] → [路由] → [控制器]
              ↓
         [错误处理]
              ↓
         [响应返回]
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `analysis_depth` | 分析深度 | `quick` / `full` |
| `known_entry_hints` | 已知的入口提示 | `["main.py", "server.js"]` |
| `project_type` | 项目类型 | `web-service` / `cli` / `library` |

# Usage Notes

1. **分类型处理**：不同类型项目有不同入口模式
2. **框架优先**：先识别框架，再按框架模式搜索入口
3. **优先级排序**：先找明确的 main/入口，再找框架特定模式
4. **追踪链路**：不仅要找到入口，还要理解请求如何流转

# Example Input

```yaml
repo_path: "/workspace/ecommerce-backend"
analysis_depth: "full"
known_entry_hints: []
```

# Example Output

```yaml
entry_points_report:
  primary_entry:
    file: "src/index.ts"
    type: "web-service"
    responsibilities:
      - "初始化 Express 应用"
      - "连接 MongoDB 数据库"
      - "注册 API 路由中间件"
      - "启动 HTTP 服务器"
  api_entry:
    base_path: "/api/v1"
    files:
      - "src/routes/auth.ts"
      - "src/routes/products.ts"
      - "src/routes/orders.ts"
    registration: "src/index.ts (app.use('/api/v1', router))"
  event_entry:
    websocket: "src/websocket/index.ts"
    cron: "src/jobs/index.ts"
    message_queue: "src/queue/consumer.ts"
  execution_flow:
    - "请求 → index.ts"
    - "→ cors/json 中间件"
    - "→ /api/v1 路由"
    - "→ 具体控制器"
    - "→ 服务层"
    - "→ 数据层"
  bootstrap_sequence:
    - "1. 加载 .env 配置"
    - "2. 初始化日志系统"
    - "3. 连接 MongoDB"
    - "4. 注册路由"
    - "5. 启动服务器监听 3000 端口"
```

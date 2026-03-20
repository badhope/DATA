---
id: prompt-task-repo-analysis-map-modules-and-responsibilities-v1
name: Map Modules and Responsibilities
summary: 分析项目的模块划分，理解各模块的职责边界和交互关系
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - module-design
  - architecture
  - responsibilities
  - code-organization
keywords:
  - 模块划分
  - 职责边界
  - 模块交互
  - 代码组织
  - 架构分析
intent: |
  帮助 AI 理解项目的模块划分和职责分配，从而能够：
  - 理解代码的组织逻辑
  - 识别模块的职责边界
  - 发现职责不清或耦合过度的问题
  - 为修改和扩展提供模块上下文
  - 评估架构质量
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - analysis_depth: string 分析深度 (quick/full)
  - existing_structure_hint: string 已知结构提示（可选）
output_requirements:
  - module_map_report: object 包含：
    - modules: array 模块清单
    - responsibilities: object 职责描述
    - boundaries: object 边界定义
    - dependencies: object 模块依赖关系
    - coupling_issues: array 耦合问题
    - cohesion_score: number 内聚度评分
tool_requirements:
  - file-reading
  - grep-search
  - directory-listing
preconditions:
  - 已了解项目的基本结构
  - 已识别入口文件和配置文件
anti_patterns:
  - 不要假设所有模块都遵循同一组织模式
  - 不要忽略模块间的隐式依赖
  - 不要遗漏跨模块共享代码的问题
failure_modes:
  - 大型复杂项目：识别核心模块和辅助模块
  - 职责重叠：标注模糊边界并建议改进
  - 结构混乱：描述现状并提供重构方向
self_check: |
  分析后检查：
  □ 是否识别了所有主要模块
  □ 是否清晰定义了每个模块的职责
  □ 是否标注了模块间的依赖关系
  □ 是否发现了架构问题
related_skills:
  - skill-repo-analysis
  - skill-coding
  - skill-coding-architecture-review
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-feature-implementation
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-understand-project-entry-points
  - prompt-task-repo-analysis-locate-business-logic
---

# Context

你是一个经验丰富的架构师，负责分析项目的模块划分和职责边界。这个 Prompt 强调：
1. 识别模块的组织逻辑
2. 明确职责边界和接口
3. 分析模块间的依赖关系
4. 评估内聚度和耦合度
5. 发现架构问题

# Prompt Body

## 阶段 1：模块识别

### 1.1 常见模块组织模式

```markdown
## 模块组织模式

### 按功能组织
```
src/
├── features/          # 按业务功能划分
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── products/
│   └── orders/
```

### 按层级组织
```
src/
├── controllers/       # 控制层
├── services/         # 服务层
├── repositories/     # 数据访问层
├── models/           # 模型层
```

### 混合模式（DDD）
```
src/
├── domain/           # 领域模型
│   ├── entities/
│   ├── value-objects/
│   └── aggregates/
├── application/      # 应用服务
├── infrastructure/   # 基础设施
└── interfaces/       # 接口层
```

### 微服务模式
```
services/
├── user-service/
├── product-service/
├── order-service/
└── common/
```

### Monorepo 模式
```
packages/
├── shared/
├── ui-components/
├── utils/
└── config/
```
```

### 1.2 模块识别策略

```markdown
## 模块识别方法

### 目录结构分析
1. 识别 src/ 或 lib/ 下的主要目录
2. 识别 features/ 或 modules/ 等功能目录
3. 识别按层级划分的目录

### 模块标识符
| 模式 | 特征 | 说明 |
|------|------|------|
| 目录名 | features/, modules/ | 功能模块 |
| 文件前缀 | *Controller, *Service | 分层模块 |
| 文件后缀 | *Component, *Page | UI 模块 |
| 命名空间 | namespace, package | 代码隔离 |

### 模块元信息提取
```markdown
## 模块元信息模板
| 模块名 | 目录/文件路径 | 主要职责 | 依赖模块 | 复杂度 |
|--------|--------------|----------|----------|--------|
| AuthModule | features/auth | 用户认证 | UserModule | 中 |
```
```

## 阶段 2：职责分析

### 2.1 职责定义方法

```markdown
## 职责分析流程

### 1. 入口点分析
- 模块提供什么功能？
- 模块被谁调用？
- 模块如何被访问？

### 2. 依赖分析
- 模块依赖哪些外部资源？
- 模块依赖哪些其他模块？
- 依赖是否合理？

### 3. 数据流分析
- 模块的输入是什么？
- 模块的输出是什么？
- 状态如何管理？
```

### 2.2 职责描述模板

```markdown
## 模块职责描述

### 模板
```markdown
## [模块名称]

### 职责定义
[一句话描述模块的核心职责]

### 职责范围
**包含：**
- [职责1]
- [职责2]

**不包含：**
- [排除的职责1]
- [排除的职责2]

### 提供的接口
| 接口 | 方法 | 说明 |
|------|------|------|
| IModuleService | getById() | 获取单个 |
| IModuleService | list() | 获取列表 |

### 依赖的模块
- [模块A] - 用于[用途]
- [模块B] - 用于[用途]

### 关键类/函数
- [类/函数名] - [职责]
```
```
```

## 阶段 3：边界定义

### 3.1 模块边界识别

```markdown
## 模块边界分析

### 边界类型
1. **强边界** - 通过公开接口交互，不共享内部状态
2. **弱边界** - 共享某些数据结构或配置
3. **模糊边界** - 模块间有隐式耦合

### 边界问题识别
| 问题类型 | 特征 | 影响 |
|----------|------|------|
| 循环依赖 | A→B→C→A | 难以独立测试 |
| 跨层调用 | Controller→Repository | 职责混乱 |
| 共享状态 | 全局变量修改 | 难以追踪 |
```

### 3.2 接口契约定义

```markdown
## 模块接口契约

### 公开接口
```typescript
// 认证模块公开接口
interface IAuthService {
  login(credentials: LoginDTO): Promise<AuthToken>
  logout(token: string): Promise<void>
  refreshToken(token: string): Promise<AuthToken>
  validateToken(token: string): Promise<User>
}
```

### 事件接口
```typescript
// 模块间事件
interface ModuleEvents {
  'user.created': (user: User) => void
  'order.completed': (order: Order) => void
}
```
```

## 阶段 4：依赖关系分析

### 4.1 依赖关系图

```markdown
## 模块依赖关系

### 直接依赖矩阵
| FROM \ TO | Auth | Product | Order | Payment |
|-----------|------|---------|-------|---------|
| Auth      | -    | ✗       | ✗     | ✗       |
| Product   | ✗    | -       | ✗     | ✗       |
| Order     | ✓    | ✓       | -     | ✓       |
| Payment   | ✗    | ✗       | ✓     | -       |

✓ = 依赖, ✗ = 无依赖, - = 自己
```

### 4.2 依赖层级分析

```markdown
## 依赖层级（从底层到高层）

### Layer 0: 基础设施
- Database
- Logger
- Cache
- FileSystem

### Layer 1: 核心域
- User
- Product
- Order

### Layer 2: 业务服务
- Payment
- Shipping
- Notification

### Layer 3: 应用层
- API Controllers
- CLI Commands
- Scheduled Jobs
```

## 阶段 5：架构质量评估

### 5.1 内聚度评估

```markdown
## 内聚度评估（0-100）

### 高内聚 (>70)
模块的所有元素都服务于单一职责
✅ 易于理解、测试和维护

### 中内聚 (40-70)
模块有多个相关但不紧密的职责
⚠️ 可能需要进一步拆分

### 低内聚 (<40)
模块有多个不相关的职责
❌ 需要重构

### 内聚度指标
| 模块 | 职责数 | 内聚度 | 评估 |
|------|--------|--------|------|
| UserService | 3 | 85 | 高 |
| HelperUtils | 12 | 25 | 低 |
```
```

### 5.2 耦合度评估

```markdown
## 耦合度评估

### 理想状态
- 低耦合：模块间通过接口交互
- 高内聚：模块内元素紧密相关

### 问题耦合类型
| 类型 | 描述 | 影响 | 解决方案 |
|------|------|------|----------|
| 内容耦合 | 一个模块直接修改另一个的数据 | 难以独立测试 | 使用接口 |
| 公共耦合 | 共享全局数据 | 难以追踪变化 | 使用参数传递 |
| 控制耦合 | 通过参数控制另一个模块行为 | 职责不清 | 职责分离 |
| 印记耦合 | 传递不必要的数据 | 维护困难 | 最小化接口 |
```

## 阶段 6：生成模块地图报告

### 6.1 完整报告结构

```markdown
# 模块划分与职责分析报告

## 执行摘要
[描述项目的模块组织方式和架构特点]

## 1. 模块概览
```yaml
modules:
  - name: "AuthModule"
    path: "features/auth"
    responsibility: "用户身份认证和授权"
    lines_of_code: 1200
    complexity: "medium"
  - name: "ProductModule"
    path: "features/products"
    responsibility: "产品目录管理"
    complexity: "medium"
```

## 2. 职责边界
```yaml
responsibilities:
  clear_boundaries:
    - "Auth → Product: 依赖 User 上下文"
    - "Order → Payment: 调用支付服务"
  unclear_boundaries:
    - "UserModule vs AuthModule: 用户数据和认证逻辑边界模糊"
```

## 3. 依赖关系图
```yaml
dependency_graph:
  layers:
    - layer: 0
      modules: [Database, Logger, Cache]
    - layer: 1
      modules: [User, Product]
    - layer: 2
      modules: [Order, Payment]
    - layer: 3
      modules: [API, CLI]
```

## 4. 架构问题
```yaml
issues:
  - type: "circular_dependency"
    modules: [A, B, C]
    severity: "high"
    recommendation: "引入接口解耦"
  - type: "low_cohesion"
    module: "HelperUtils"
    severity: "medium"
    recommendation: "拆分为专用工具模块"
```

## 5. 架构质量评分
| 维度 | 评分 | 说明 |
|------|------|------|
| 模块化程度 | 78/100 | 良好的功能划分 |
| 职责清晰度 | 72/100 | 部分边界模糊 |
| 内聚度 | 75/100 | 中高内聚 |
| 耦合度 | 68/100 | 需进一步解耦 |
| 可测试性 | 80/100 | 良好 |

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `analysis_depth` | 分析深度 | `quick` / `full` |
| `existing_structure_hint` | 已知结构提示 | `DDD模式` / `MVC` |
| `module_pattern` | 模块组织模式 | `features/` / `layers/` |

# Usage Notes

1. **先识别模式**：了解项目采用的模块组织模式
2. **职责优先**：关注"这个模块负责什么"而非"这个模块叫什么"
3. **接口契约**：模块边界通过接口定义，而非实现细节
4. **持续演进**：架构问题往往是演进过程中的妥协，理解历史背景

# Example Input

```yaml
repo_path: "/workspace/ecommerce-backend"
analysis_depth: "full"
existing_structure_hint: "DDD + 微服务"
```

# Example Output

```yaml
module_map_report:
  modules:
    - name: "UserModule"
      path: "src/domain/user"
      responsibility: "用户生命周期管理"
      public_api:
        - "UserService.create()"
        - "UserService.update()"
        - "UserService.findById()"
      dependencies: []
    - name: "OrderModule"
      path: "src/domain/order"
      responsibility: "订单处理和状态管理"
      public_api:
        - "OrderService.create()"
        - "OrderService.cancel()"
        - "OrderService.getStats()"
      dependencies: ["UserModule"]
  responsibilities:
    clear:
      - "AuthModule 负责认证"
      - "ProductModule 负责产品目录"
    unclear:
      - "CartModule 和 OrderModule 的边界"
  boundaries:
    strong:
      - "AuthModule → UserModule"
    weak:
      - "ProductModule ↔ InventoryModule"
  dependencies:
    graph:
      UserModule: []
      AuthModule: [UserModule]
      ProductModule: []
      OrderModule: [UserModule, ProductModule, PaymentModule]
      PaymentModule: [OrderModule]
  coupling_issues:
    - type: "circular"
      path: "OrderModule → PaymentModule → OrderModule"
      severity: "high"
  cohesion_score: 78
```

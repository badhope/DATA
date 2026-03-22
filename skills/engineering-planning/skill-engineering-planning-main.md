---
id: skill-engineering-planning-main-v1
name: Engineering Planning
summary: 技术项目规划与执行的系统性方法论
type: skill
category: engineering-planning
tags: [planning, engineering, roadmap, estimation, project-management, milestone]
keywords: [工程规划, 路线图, 估算, 项目管理, 里程碑]
intent: 提供技术项目从构思到交付的完整规划框架
use_cases:
  - 需要制定技术方案时
  - 需要估算项目工期时
  - 需要制定里程碑时
  - 需要评审技术方案时
inputs:
  - name: project_goal
    type: string
    required: true
    description: 项目目标描述
  - name: constraints
    type: object
    required: false
    description: 约束条件（时间、资源、技术限制）
outputs:
  - name: project_plan
    type: markdown
    description: 项目计划文档
  - name: technical_design
    type: markdown
    description: 技术设计方案
  - name: risk_assessment
    type: markdown
    description: 风险评估报告
prerequisites:
  - 理解业务目标
  - 了解技术栈
  - 有项目经验
steps:
  - step: 1
    action: 理解需求和约束
  - step: 2
    action: 分析技术方案选项
  - step: 3
    action: 制定实施计划
  - step: 4
    action: 评估风险和依赖
  - step: 5
    action: 定义里程碑和验收标准
examples:
  - input: "goal: redesign user auth system within 3 months"
    output: "complete engineering plan with milestones"
    notes: 展示如何在约束下规划
related_skills:
  - skill-planning-v1
  - skill-coding-v1
  - skill-research-v1
related_prompts:
  - prompt-task-engineering-planning-create-implementation-roadmap
  - prompt-task-engineering-planning-compare-technical-approach-options
notes: |
  关键原则：
  - 计划要实际可执行
  - 风险要提前识别
  - 里程碑要可验证
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Engineering Planning Skill

技术项目系统化规划的完整指南。

## 工程规划流程

```
需求理解 ──> 方案设计 ──> 计划制定 ──> 风险评估 ──> 执行监控
    │            │            │            │
    ▼            ▼            ▼            ▼
  澄清范围    技术选型      任务分解      风险缓解
  约束识别    架构设计      估算工期      依赖管理
```

## Phase 1: 需求理解

### 需求澄清检查表

```markdown
## 功能需求
- [ ] 核心功能是否清晰？
- [ ] 边界条件是否定义？
- [ ] 优先级是否明确？

## 非功能需求
- [ ] 性能指标（SLA）？
- [ ] 可用性要求？
- [ ] 安全性要求？
- [ ] 可扩展性要求？

## 约束条件
- [ ] 时间限制？
- [ ] 预算限制？
- [ ] 技术栈限制？
- [ ] 团队技能限制？
```

### 用户故事编写

```markdown
## 用户故事模板

作为 [角色]，我希望 [功能]，以便 [收益]。

### 验收标准
- Given [前置条件]
- When [操作]
- Then [预期结果]

### 示例

**故事**: 用户登录系统

```
作为 已注册用户
我希望 使用邮箱密码登录系统
以便 访问我的个人数据

验收标准:
- Given 用户已注册邮箱user@example.com
- When 用户输入正确邮箱和密码
- Then 系统显示登录成功跳转首页

- Given 用户输入错误密码
- When 用户点击登录
- Then 系统显示"密码错误"提示
```

### 莫斯科法则

| 优先级 | 说明 | 示例 |
|--------|------|------|
| Must | 硬性需求，无则失败 | 登录功能 |
| Should | 重要但非关键 | 记住登录状态 |
| Could | 锦上添花 | 社交登录 |
| Won't | 本期不做 | 生物识别登录 |

## Phase 2: 技术方案设计

### 方案对比矩阵

```markdown
## 方案A: 微服务架构

| 维度 | 评分 | 说明 |
|------|------|------|
| 开发速度 | 6/10 | 需要构建基础设施 |
| 可扩展性 | 9/10 | 天然水平扩展 |
| 运维复杂度 | 7/10 | 需要服务治理 |
| 成本 | 6/10 | 资源需求较高 |
| 团队能力 | 7/10 | 需要微服务经验 |

## 方案B: 模块化单体

| 维度 | 评分 | 说明 |
|------|------|------|
| 开发速度 | 9/10 | 简单直接 |
| 可扩展性 | 6/10 | 需要预留模块边界 |
| 运维复杂度 | 8/10 | 单一部署 |
| 成本 | 8/10 | 资源需求低 |
| 团队能力 | 9/10 | 团队熟悉 |

## 推荐: 方案B
**理由**: 团队规模小(<5人)，时间紧(3个月)，先MVP后演进
```

### 技术选型决策树

```
需要支持多端?
├── 是 ──> 选BFF模式或API Gateway
└── 否
    │
    需要高并发?
    ├── 是 ──> 选可水平扩展架构
    └── 否
        │
        需要快速迭代?
        ├── 是 ──> 选敏捷友好的架构
        └── 否 ──> 选成熟稳定方案
```

## Phase 3: 实施计划

### 工作分解结构 (WBS)

```markdown
# 用户认证系统重构

## 1. 基础设施 (1周)
   ├── 1.1 搭建开发环境
   ├── 1.2 配置CI/CD
   ├── 1.3 搭建测试环境
   └── 1.4 部署监控

## 2. 核心模块 (3周)
   ├── 2.1 用户注册模块
   │    ├── 2.1.1 数据模型设计
   │    ├── 2.1.2 API实现
   │    └── 2.1.3 单元测试
   ├── 2.2 登录认证模块
   │    ├── 2.2.1 Session管理
   │    ├── 2.2.2 Token刷新
   │    └── 2.2.3 安全加固
   └── 2.3 权限管理模块

## 3. 集成 (1周)
   ├── 3.1 旧系统数据迁移
   ├── 3.2 新旧系统切换
   └── 3.3 监控上线

## 4. 验收 (1周)
   ├── 4.1 功能验收测试
   ├── 4.2 性能测试
   └── 4.3 文档编写
```

### 里程碑定义

| 里程碑 | 日期 | 交付物 | 验收标准 |
|--------|------|--------|----------|
| M1 基础就绪 | +1w | 开发环境 | 所有开发者可正常开发 |
| M2 MVP完成 | +4w | 可运行的核心功能 | 核心流程跑通 |
| M3 集成完成 | +5w | 与现有系统集成 | 数据正确流转 |
| M4 上线 | +6w | 生产环境 | SLA达标 |

## Phase 4: 风险评估

### 风险识别矩阵

```markdown
## 技术风险

| 风险 | 概率 | 影响 | 风险值 | 应对策略 |
|------|------|------|--------|----------|
| 第三方服务不可用 | 中 | 高 | 15 | 本地降级方案 |
| 数据迁移丢失 | 低 | 极高 | 20 | 多次备份+回滚方案 |
| 性能不达标 | 中 | 高 | 15 | 提前做性能测试 |
| 安全漏洞 | 低 | 极高 | 20 | 安全审计+渗透测试 |

## 进度风险

| 风险 | 概率 | 影响 | 风险值 | 应对策略 |
|------|------|------|--------|----------|
| 人员变动 | 中 | 高 | 15 | 文档充分+知识共享 |
| 需求变更 | 高 | 中 | 12 | 敏捷迭代+范围控制 |
| 技术难题 | 中 | 中 | 9 | 预留技术攻关时间 |
```

### 风险缓解计划

```markdown
## 最高风险: 第三方认证服务依赖

### 风险描述
用户认证依赖外部OAuth服务，若服务不可用将导致用户无法登录。

### 缓解措施
1. 实现本地认证降级方案
2. 缓存Token减少外部调用
3. 监控第三方服务状态
4. 制定SLA应急响应流程

### 触发条件
当第三方服务响应时间 > 2秒或错误率 > 1%时触发降级

### 负责人
Backend Lead
```

## Phase 5: 执行与监控

### 每日站会模板

```markdown
## 2026-03-22 站会

### 昨日完成
- [x] 完成用户注册API设计
- [x] 编写登录模块技术文档

### 今日计划
- [ ] 实现用户注册API
- [ ] 编写注册API单元测试

### 阻碍
- [ ] 需要API Gateway配置支持

### 风险状态
⚠️ 第三方服务测试环境搭建延迟
```

### 迭代回顾模板

```markdown
## Sprint 1 回顾

### 做得好的
- 团队协作顺畅
- 代码审查执行到位
- 文档更新及时

### 需要改进的
- 任务估算不够准确
- 测试覆盖不足
- 风险识别不够主动

### 下个迭代改进
- [ ] 引入故事点估算
- [ ] 提高测试覆盖率到80%
- [ ] 每日风险更新
```

## 工程规划模板

```markdown
# [项目名称] 工程计划

## 1. 概述
### 背景
### 目标
### 范围

## 2. 技术方案
### 架构设计
### 技术选型
### 方案对比

## 3. 实施计划
### 工作分解
### 里程碑
### 资源分配

## 4. 风险评估
### 风险列表
### 缓解措施

## 5. 验收标准
### 功能验收
### 性能指标
### 质量标准

## 6. 附录
### 依赖列表
### 参考资料
```

## 相关提示词

- `prompt-task-engineering-planning-estimate-risk-and-dependencies`
- `prompt-task-engineering-planning-define-acceptance-criteria`
- `prompt-task-engineering-planning-break-feature-into-engineering-tasks`

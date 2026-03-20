# AI Routing Guide

本文件详细说明 AI 如何在仓库中进行任务路由和 Prompt 选择。

---

## 路由原理

AI 路由是指 AI 根据用户需求，自主判断任务类型、选择合适 Prompts、组合使用的工作流程。

```
用户需求
    ↓
[识别阶段]  → 判断任务类型
    ↓
[路由阶段]  → 选择合适的 Prompts/Skills/Workflows
    ↓
[组合阶段]  → 按需组合多个资源
    ↓
[执行阶段]  → 按选定流程执行
```

---

## 路由入口

### 入口文件

| 文件 | 用途 | 优先级 |
|------|------|--------|
| `prompts/_routing/identify-task-type-and-route` | 识别任务类型并路由 | 🔴 必须 |
| `prompts/_routing/select-relevant-prompts-from-index` | 从索引选择相关 Prompts | 🔴 必须 |
| `prompts/_routing/compose-multiple-prompts-for-one-task` | 组合多个 Prompts | 🟡 推荐 |
| `prompts/_routing/scan-repository-and-build-task-map` | 扫描仓库构建任务地图 | 🟢 可选 |

---

## 路由流程详解

### 第一步：理解用户需求

**必须做到：**
- 准确理解用户的核心目标
- 识别用户隐含的需求
- 判断任务复杂度（单步 vs 多步）

**禁止做到：**
- 仅凭关键词就做判断
- 忽略用户隐含需求
- 过早限定任务类型

### 第二步：识别任务类型

**识别维度：**

| 维度 | 检查内容 |
|------|----------|
| 输入类型 | 用户提供了什么？（代码/错误信息/文档/需求描述） |
| 目标类型 | 用户想达成什么？（生成/修改/分析/计划） |
| 复杂度 | 需要多少步骤？（单步/多步/复杂） |
| 输出类型 | 用户期望什么？（代码/报告/计划/特定格式） |

**任务类型映射：**

```
┌─────────────────────────────────────────────────────────┐
│                     任务类型判断                         │
├─────────────────────────────────────────────────────────┤
│  输入：代码段 + 目标：修改代码  →  coding                │
│  输入：错误信息 + 目标：修复    →  debugging            │
│  输入：项目路径 + 目标：了解   →  repo-analysis         │
│  输入：模糊需求 + 目标：计划   →  planning / workflow  │
│  输入：主题 + 目标：输出报告   →  research              │
└─────────────────────────────────────────────────────────┘
```

### 第三步：选择 Prompts

**选择标准：**

1. **intent 匹配度** - prompt 的 intent 是否与任务匹配
2. **required_inputs 可提供性** - 能否提供所需输入
3. **applicable_models 覆盖** - 当前模型是否在列表中
4. **status 有效性** - prompt 是否为 active 状态

**选择检查清单：**
```
- [ ] intent 完全匹配任务目标？
- [ ] required_inputs 可以全部提供？
- [ ] 没有冲突的约束条件？
- [ ] 组合后不会产生矛盾？
```

### 第四步：判断是否需要 Workflow

**Workflow 判断标准：**

| 条件 | 说明 | 决策 |
|------|------|------|
| 任务有明确的多阶段流程 | 如 Bug 调查通常分 4 步 | 使用 Workflow |
| 任务需要多个 Prompts 配合 | 单个 Prompt 不够用 | 组合 Prompts |
| 任务有固定的最优顺序 | 顺序很重要 | 使用 Workflow |
| 任务边界清晰但步骤多 | 5+ 步骤 | 使用 Workflow |

**不需要 Workflow 的情况：**
- 单个 Prompt 可以完成
- 步骤之间没有依赖
- 用户明确要求简单回答

### 第五步：组合和执行

**组合原则：**
1. **单一职责** - 每个 Prompt 只负责一件事
2. **顺序传递** - 前一步输出作为后一步输入
3. **格式统一** - 使用 output prompt 标准化输出

**执行检查：**
```
- [ ] 每个 Prompt 的前置条件都满足了？
- [ ] 步骤之间的信息传递是完整的？
- [ ] 最终输出格式符合用户期望？
```

---

## 特殊路由场景

### 场景 1：用户不知道自己要什么

```
用户说："帮我看看这个项目"
    ↓
识别为：模糊需求
    ↓
使用：workflow/vague—request—to—action
    ↓
先澄清问题，再确定任务类型
```

### 场景 2：需要多个 Skills 配合

```
用户需求：完整的项目分析
    ↓
需要的 Skills：
  — repo—analysis（分析结构）
  — coding（理解代码）
  — planning（制定改进计划）
    ↓
按顺序执行，组合结果
```

### 场景 3：需要工具辅助

```
任务需要：
  — 读取文件 → tool—use/read—files—before—answering
  — 执行命令 → tool—use/use—command—output—safely
  — 搜索信息 → tool—use/search—before—concluding
    ↓
先使用 tool—use prompt，再继续主任务
```

---

## 路由失败处理

### 常见失败原因

1. **任务类型判断错误** - 选了不合适的 Prompt 类型
2. **Prompt 选择不当** - 选了不匹配具体需求的 Prompt
3. **组合顺序错误** - 依赖关系没理清
4. **输入不满足** - required_inputs 无法提供

### 失败处理流程

```
发现问题
    ↓
回退到路由入口
    ↓
重新判断任务类型
    ↓
选择替代 Prompt 或调整组合
    ↓
继续执行
```

### 回退策略

| 失败阶段 | 回退动作 |
|----------|----------|
| 类型判断错误 | 使用 `identify-task-type-and-route` 重新判断 |
| Prompt 不合适 | 参考 `select-relevant-prompts-from-index` 重新选择 |
| 组合失败 | 使用 `compose-multiple-prompts-for-one-task` 重新组合 |
| 完全不确定 | 使用 `scan-repository-and-build-task-map` 重新扫描 |

---

## 路由自检清单

执行路由前检查：
— [ ] 是否准确理解了用户需求？
— [ ] 任务类型判断是否有多个证据支持？
— [ ] 选择的 Prompt 是否都满足 required_inputs？
— [ ] 是否需要 Workflow 还是单个 Prompt 就够？
— [ ] 组合顺序是否符合依赖关系？
— [ ] 是否有备选方案以防失败？

执行路由后检查：
— [ ] 执行过程是否顺畅？
— [ ] 输出是否符合预期？
— [ ] 是否需要调整组合方式？

---

## 相关文档

- [AI-BOOTSTRAP.md](AI-BOOTSTRAP.md) - 启动引导
- [AI-USAGE.md](AI-USAGE.md) - 使用指南
- [prompts/_routing/](prompts/_routing/) - 路由相关 Prompts
- [prompts/workflow/](prompts/workflow/) - 工作流 Prompts

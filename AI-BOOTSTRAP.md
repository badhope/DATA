# AI Bootstrap Guide

本文件是 AI 启动引导，用于 AI 下载仓库后快速了解结构并准备执行任务。

---

## 快速启动（5 步）

```
1. 读取 README.md           → 了解仓库定位
2. 读取 prompts/INDEX.md   → 了解 Prompts 结构
3. 读取 AI-USAGE.md        → 了解如何使用
4. 读取 AI-ROUTING.md      → 了解如何路由
5. 准备执行用户任务         → 开始工作
```

---

## 仓库自扫描流程

当 AI 首次接触这个仓库时，应执行以下扫描：

### 第一步：扫描仓库结构

```
读取文件：
1。 README。md       → 仓库定位
2。 prompts/INDEX。md → Prompts 仓库结构
3。 registry/        → 可用资源索引

输出：
— 仓库功能概览
— 可用资源地图
— 快速导航路径
```

### 第二步：构建任务地图

使用 `prompts/_routing/scan-repository-and-build-task-map.md`

```
执行扫描后，AI 应该知道：
— 有哪些任务类型可用
— 每种任务类型对应哪些 Prompts
— 如何快速定位需要的资源
```

### 第三步：理解路由机制

```
AI 应该理解：
1。 何时需要路由？（用户需求不明确时）
2。 如何路由？（按 AI—ROUTING。md 的流程）
3。 组合原则？（Prompts 组合规则）
```

---

## 启动检查清单

### 仓库理解检查

- [ ] 理解仓库的定位和目标
- [ ] 了解 prompts/ 的目录结构
- [ ] 知道各类 Prompts 的用途
- [ ] 了解 Skills 和 Workflows 的关系
- [ ] 理解注册表的作用

### 路由能力检查

- [ ] 知道如何判断任务类型
- [ ] 知道如何选择合适的 Prompt
- [ ] 知道何时需要 Workflow
- [ ] 知道如何组合多个 Prompts
- [ ] 知道如何使用 tool-use
- [ ] 知道如何使用 output prompt

### 执行准备检查

- [ ] 能够准确理解用户需求
- [ ] 能够识别隐含需求
- [ ] 能够判断任务复杂度
- [ ] 准备好备选方案

---

## 首次使用流程

```
用户发起请求
    ↓
┌─────────────────────────────────────┐
│ 1。 快速扫描仓库（如果还没做）          │
│    — 读取 prompts/INDEX。md          │
│    — 构建任务类型映射                 │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 2。 理解用户需求                      │
│    — 提取核心目标                    │
│    — 识别隐含需求                    │
│    — 判断复杂度                      │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 3。 执行路由选择                      │
│    — 判断任务类型                    │
│    — 选择 Prompts                    │
│    — 判断是否需要 Workflow           │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ 4。 组合执行                          │
│    — 按顺序执行 Prompts             │
│    — 必要时使用 tool—use             │
│    — 使用 output prompt 格式化       │
└─────────────────────────────────────┘
    ↓
返回结果给用户
```

---

## 缓存和记忆

### 短期记忆（单次会话）

AI 应在会话中记住：
- 用户的主要目标
- 已选择的 Prompts/Skills
- 任务执行状态

### 长期记忆（跨会话）

如果仓库更新，AI 应重新：
1. 扫描 prompts/INDEX.md 更新索引
2. 检查 registry/ 更新资源映射
3. 确认新增的 Prompts/Skills

---

## 常见启动问题

### Q1：用户需求很模糊怎么办？

```
使用 workflow/vague—request—to—action
先澄清问题，再确定任务类型
```

### Q2：不确定选哪个 Prompt？

```
参考 prompts/_routing/select—relevant—prompts—from—index
或使用 identify—task—type—and—route 让系统帮你选
```

### Q3：需要多个 Prompts 怎么组合？

```
使用 prompts/_routing/compose—multiple—prompts—for—one—task
按单一职责、顺序传递、格式统一的原则组合
```

### Q4：仓库很大，扫描太慢？

```
优先扫描：
1。 prompts/INDEX。md        （必须）
2。 prompts/_routing/      （推荐）
3。 对应任务类型的目录       （按需）

其他内容：按需读取
```

---

## 相关文档

- [README.md](README.md) - 仓库入口
- [prompts/INDEX.md](prompts/INDEX.md) - Prompts 索引
- [AI-USAGE.md](AI-USAGE.md) - 使用指南
- [AI-ROUTING.md](AI-ROUTING.md) - 路由指南

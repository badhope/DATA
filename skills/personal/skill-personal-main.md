---
id: skill-personal-main-v1
name: Personal Assistant
summary: 个人生活管理与日常助手指南
type: skill
category: personal
tags: [personal, life, productivity, organization, planning, daily]
keywords: [个人助理, 生活管理, 效率, 组织, 规划, 日常]
intent: 帮助用户进行个人生活管理、日常任务规划和习惯养成
use_cases:
  - 需要整理思绪和笔记时
  - 需要规划个人目标时
  - 需要建立日常习惯时
  - 需要管理个人事务时
inputs:
  - name: request_type
    type: string
    required: true
    description: 请求类型
  - name: context
    type: object
    required: false
    description: 上下文信息
outputs:
  - name: response
    type: markdown
    description: 生成的响应
  - name: action_items
    type: array
    description: 行动项列表
prerequisites:
  - 了解用户基本需求
steps:
  - step: 1
    action: 理解用户需求
  - step: 2
    action: 整理相关信息
  - step: 3
    action: 提供结构化建议
examples:
  - input: "type: organize thoughts, content: confused about career direction"
    output: "structured reflection guide with action items"
    notes: 展示如何帮助整理思绪
related_skills:
  - skill-reflection-main-v1
  - skill-planning-v1
related_prompts:
  - prompt-general-personal-turn-chaotic-thoughts-into-clear-notes
  - prompt-general-personal-help-organize-personal-tasks
notes: |
  重要原则：
  - 尊重用户隐私
  - 提供非评判性的支持
  - 鼓励积极行动
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Personal Assistant Skill

个人生活管理与日常助手的完整指南。

## 个人事务管理

### 任务整理模板

```markdown
## 任务整理清单

### 紧急且重要 (立即执行)
- [ ] 任务1
- [ ] 任务2

### 重要不紧急 (计划执行)
- [ ] 任务3
- [ ] 任务4

### 紧急不重要 (委托执行)
- [ ] 任务5

### 不紧急不重要 (排除)
- [ ] 任务6
```

### 每日计划模板

```markdown
## 2026-03-22 每日计划

### 今日三件事 (必须完成)
1. [ ] 最重要的事
2. [ ] 第二重要的事
3. [ ] 第三重要的事

### 例行事项
- [ ] 晨间惯例 (冥想/运动/阅读)
- [ ] 午间休息
- [ ] 晚间复盘

### 碎片时间利用
- 通勤时间: 听播客/有声书
- 等待时间: 快速浏览RSS/新闻

### 今日复盘
- 完成的事情:
- 未完成的事情:
- 明日改进:
```

## 目标管理

### SMART 目标设定

```markdown
## 目标: 学习一门新编程语言

### Specific (具体)
- 学习 Python 基础语法
- 完成 5 个实战项目
- 掌握常用库使用

### Measurable (可衡量)
- 100% 语法覆盖
- 5 个完整项目代码
- 10 个常用库

### Achievable (可达成)
- 每天投入 2 小时
- 8 周完成基础学习

### Relevant (相关)
- 提升编程能力
- 拓展职业发展

### Time-bound (有时限)
- 2026-05-31 前完成

---

## 目标分解

### Week 1-2: 基础语法
- [ ] 变量和数据类型
- [ ] 条件语句
- [ ] 循环语句
- [ ] 函数定义
- [ ] 练习题 20 道

### Week 3-4: 进阶语法
- [ ] 列表/字典/集合
- [ ] 文件操作
- [ ] 异常处理
- [ ] 练习题 30 道

### Week 5-6: 实战项目
- [ ] 项目1: 命令行工具
- [ ] 项目2: Web 爬虫
- [ ] 项目3: API 调用

### Week 7-8: 综合应用
- [ ] 项目4: 数据分析
- [ ] 项目5: Web 服务
- [ ] 知识整理
```

### 习惯追踪表

```markdown
## 30天习惯养成追踪

### 习惯: 每日阅读 30 分钟

| 日期 | 目标 | 实际 | 完成度 |
|------|------|------|--------|
| 03-22 | 30min | 35min | ✅ |
| 03-23 | 30min | 30min | ✅ |
| 03-24 | 30min | 20min | ⚠️ |
| 03-25 | 30min | 40min | ✅ |

### 本周总结
- 坚持天数: 4/7
- 平均时长: 31min
- 状态: 良好

### 下周目标
- 坚持 6/7 天
- 继续当前节奏
```

## 笔记整理

### 渐进式笔记法

```markdown
## 笔记模板

### 第一层: 快速笔记
捕捉所有想法，不需要组织

### 第二层: 整理笔记
将笔记分类到主题

### 第三层: 永久笔记
用自己的话重写，建立连接

---

## 具体应用

### 读书笔记模板
```
书名: 《原子习惯》
作者: James Clear
日期: 2026-03-22

## 核心观点
1. 习惯的四大步骤: 提示→渴求→反应→奖励
2. 让好习惯显而易见
3. 让坏习惯难以执行

## 行动计划
- [ ] 建立"早起"提示系统
- [ ] 设计习惯叠加
- [ ] 减少阻力

## 关联阅读
- 《掌控习惯》- 相关
```

### 会议/对话笔记
```markdown
## 会议笔记: 2026-03-22

### 讨论主题
[主题]

### 关键决策
1. 决定1
2. 决定2

### 行动项
- [ ] @张三 - 任务1 (截止: 03-25)
- [ ] @李四 - 任务2 (截止: 03-26)

### 下次会议
时间: 2026-03-29
议程: ...
```

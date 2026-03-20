---
id: prompt-general-personal-turn-chaotic-thoughts-into-clear-notes-v1
name: Turn Chaotic Thoughts into Clear Notes
summary: 将混乱思绪转化为清晰笔记
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: personal
tags:
  - notes
  - organization
  - thoughts
  - clarity
keywords:
  - 笔记整理
  - 思绪整理
  - 清晰化
  - 输出
intent: |
  帮助用户将脑中混乱的思绪转化为清晰、有结构的笔记。
  强调不需要完美，只需要把想法从脑中转移到纸上/屏幕上的过程。
  核心原则：好的笔记系统是让思绪从脑中"卸载"，释放认知压力。
applicable_models:
  - "*"
input_requirements:
  - chaotic_thoughts: string 混乱的想法
  - context: string 背景
output_requirements:
  - organized_notes: object 整理后的笔记
  - clarity_summary: string 清晰总结
  - next_actions: array 后续行动
tool_requirements: []
preconditions:
  - 用户有混乱的想法需要整理
anti_patterns:
  - 要求完美结构
  - 增加更多混乱
  - 过度分析
failure_modes:
  - 结构过于复杂：简单即可
  - 分析过度：先记下来再整理
  - 遗漏重要信息：完整记录再提炼
self_check: |
  整理前自检：
  □ 是否先完整记录了所有想法？
  □ 结构是否简单到可以立即使用？
  □ 是否留下了行动项？
related_skills:
  - skill-personal
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-personal-help-organize-personal-tasks
  - prompt-general-reflection-guide-daily-reflection
---

# Context

脑中想法太多太乱时，需要一个"卸载"的过程。本 prompt 的核心目标是：**帮助用户将混乱的思绪转化为清晰可用的笔记，释放认知压力**。

# Prompt Body

## 阶段 1：想法捕捉

### 1.1 完整捕捉

```markdown
## 想法捕捉

### 不要过滤
```markdown
**原则**: 先全部倒出来，不要过滤

**操作**:
- 把脑中所有相关想法都写下来
- 混乱也没关系
- 片段的想法也值得记录
- 感觉/情绪也可以记录
```
```

### 捕捉问题
```markdown
**帮助捕捉的问题**:
- "现在脑中在想什么？"
- "有什么担心/期待？"
- "有什么需要记住的？"
- "有什么想做的？"
- "有什么悬而未决的？"
```
```

## 阶段 2：想法整理

### 2.1 初步归类

```markdown
## 初步归类

### 分类维度
```markdown
**任务类**: 需要做的事
**想法类**: 产生的想法/灵感
**问题类**: 需要解决的
**决定类**: 需要做的决定
**关注类**: 需要关注的事
**情绪类**: 相关的感受
```
```

### 整理操作
```markdown
## 整理操作

**步骤**:
1. 快速浏览所有捕捉的想法
2. 给每个想法加一个标签（分类）
3. 识别重复的内容
4. 合并类似的
```
```

## 阶段 3：结构化

### 3.1 简单结构

```markdown
## 笔记结构

### 最简结构
```markdown
## 主题: [标题]

### 需要做的
- [ ] [任务1]
- [ ] [任务2]

### 想法/灵感
- [想法1]
- [想法2]

### 需要决定的
- [决定1]
- [决定2]

### 需要关注的
- [关注1]

### 备注/感受
- [备注]
```
```

### 3.2 优先级初步排序

```markdown
## 优先级

### 初步标注
```markdown
**🔥 紧急/重要**: [列表]
**📌 需要本周处理**: [列表]
**📋 之后再说**: [列表]
```
```

## 阶段 4：清晰化

### 4.1 提炼总结

```markdown
## 清晰总结

### 一句话说清楚
```markdown
**核心主题**: [用一句话描述这个混乱的核心是什么]

**关键问题**: [最重要的一个问题或决定]

**下一步最重要的事**: [是什么]
```
```

### 4.2 行动提炼

```markdown
## 行动项

### 立即可做（今天）
```markdown
- [ ] [行动1]
```

### 近期要做（本周）
```markdown
- [ ] [行动2]
```

### 计划要做（之后）
```markdown
- [ ] [行动3]
```
```

## 阶段 5：笔记模板

### 5.1 转化模板

```markdown
## 思绪整理

### 捕捉阶段（所有想法）
```markdown
[混乱但完整地记录所有想法]
```

### 整理阶段（归类）
```markdown
**任务**: [列表]
**想法**: [列表]
**问题**: [列表]
**决定**: [列表]
```

### 结构化阶段
```markdown
## [主题]

### 一句话总结
[总结]

### 行动项
- [ ] [立即可做]
- [ ] [近期要做]

### 备注
[备注]
```

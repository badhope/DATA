---
id: prompt-general-learning-support-turn-notes-into-study-guide-v1
name: Turn Notes into Study Guide
summary: 将笔记转化为学习指南
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - notes
  - study-guide
  - organization
  - review
keywords:
  - 笔记
  - 学习指南
  - 整理
  - 复习
intent: |
  帮助用户将零散的笔记转化为结构化的学习指南。
  强调从被动记录到主动整理的学习过程。
  核心原则：整理笔记本身就是一种学习方式。
applicable_models:
  - "*"
input_requirements:
  - notes: string 笔记内容
  - topic: string 主题
  - study_purpose: string 学习目的
output_requirements:
  - structured_guide: object 结构化指南
  - key_points: array 关键点
  - practice_questions: array 练习问题
tool_requirements: []
preconditions:
  - 用户有需要整理的笔记
anti_patterns:
  - 照搬原笔记
  - 过于简略
  - 缺乏结构
failure_modes:
  - 整理不到位：确保关键信息不丢失
  - 结构混乱：清晰的层次结构
  - 缺乏实用性：包含练习问题
self_check: |
  整理前自检：
  □ 是否保留了关键信息？
  □ 结构是否清晰易复习？
  □ 是否包含了自测问题？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-explain-complex-topic-step-by-step
  - prompt-general-learning-support-quiz-user-to-check-understanding
---

# Context

笔记需要整理才能成为有效的学习工具。本 prompt 的核心目标是：**帮助用户将零散的笔记转化为结构化、可复习的学习指南**。

# Prompt Body

## 阶段 1：信息提取

### 1.1 识别关键信息

```markdown
## 关键信息识别

### 从笔记中提取
```markdown
**核心概念**: [主要概念列表]
**重要定义**: [定义列表]
**关键公式/原则**: [公式/原则]
**重要例子**: [例子]
**常见考点**: [可能的考点]
```
```

### 信息分类
```markdown
## 分类整理

**必须记住的**:
- [核心定义]
- [关键公式]

**需要理解的**:
- [概念解释]
- [原理]

**会用就好的**:
- [应用类]
- [方法类]
```
```

## 阶段 2：结构重组

### 2.1 层次结构

```markdown
## 结构重组

### 组织方式
```markdown
**方式1: 按重要程度**
```
★★★ 核心概念
★★☆ 重要内容
★☆☆ 补充知识
```

**方式2: 按学习顺序**
```
第一层：基础概念
第二层：核心原理
第三层：应用延伸
```
```
```

### 2.2 章节组织

```markdown
## 章节组织

### 章节1: [名称]
```markdown
**核心内容**:
- [关键点1]
- [关键点2]

**需要记住**:
- [定义/公式]

**理解检查**:
- [问题]
```
```

## 阶段 3：学习材料制作

### 3.1 要点清单

```markdown
## 学习要点清单

### 必背清单
```markdown
1. [定义1] - 用自己的话说一遍
2. [定义2] - 用自己的话说一遍
...
```
```

### 3.2 理解性问题

```markdown
## 理解性问题

**概念类**:
- 什么是X？用自己的话说。
- X和Y有什么区别？

**应用类**:
- 什么时候用X方法？
- 如果遇到X情况怎么办？

**分析类**:
- 为什么X会导致Y？
- X的原理是什么？
```
```

## 阶段 4：复习指南

### 4.1 复习方法

```markdown
## 复习方法

### 快速复习
```markdown
**第一步**: 看标题，回忆内容
**第二步**: 看要点清单，检验记忆
**第三步**: 不记得的立刻回顾
```
```

### 深度复习
```markdown
**第一步**: 完整阅读指南
**第二步**: 回答理解性问题
**第三步**: 做练习题
**第四步**: 检验答案，不懂的再学
```
```

## 阶段 5：输出模板

### 5.1 学习指南模板

```markdown
## 学习指南: [主题]

### 核心概念
```markdown
**概念1**: [定义]
**概念2**: [定义]
```

### 章节结构
```markdown
**章节1**:
- 关键点: [列表]
- 必背: [列表]
- 检查问题: [问题]

**章节2**:
[类似结构]
```

### 自测问题
```markdown
1. [问题]
2. [问题]
3. [问题]
```

### 复习建议
```markdown
[复习方法建议]
```

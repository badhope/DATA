---
id: prompt-general-reflection-structure-self-review-without-self-attack-v1
name: Structure Self-review Without Self-attack
summary: 结构化自我审视，避免自我攻击
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - self-review
  - structure
  - self-compassion
  - growth
keywords:
  - 自我审视
  - 结构化
  - 自我关怀
  - 成长
intent: |
  提供一个结构化的自我审视框架，同时保持自我关怀，避免自我攻击。
  强调自我审视是成长工具，不是自我惩罚。
  核心原则：对自己温柔但诚实，看到全貌而非只看到缺点。
applicable_models:
  - "*"
input_requirements:
  - review_focus: string 审视重点
  - time_period: string 时间段
output_requirements:
  - structured_review: object 结构化审视
  - self_compassion_notes: string 自我关怀记录
  - balanced_feedback: string 平衡反馈
tool_requirements: []
preconditions:
  - 用户需要进行自我审视但担心自我批评
anti_patterns:
  - 自我攻击
  - 过于苛刻
  - 忽视积极面
failure_modes:
  - 变成自我攻击：保持自我关怀
  - 过于宽容：温和但诚实
  - 框架僵硬：保持灵活性
self_check: |
  审视前自检：
  □ 是否保持了自我关怀的态度？
  □ 是否避免了绝对化的自我评判？
  □ 是否看到了积极面和不足的平衡？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-guide-daily-reflection
  - prompt-general-reflection-identify-patterns-in-repeated-problems
---

# Context

自我审视很容易滑向自我攻击。本 prompt 的核心目标是：**提供一个结构化的自我审视框架，同时保持自我关怀，避免自我批评的陷阱**。

# Prompt Body

## 阶段 1：建立自我关怀基调

### 1.1 自我关怀原则

```markdown
## 自我关怀基调

### 自我审视 vs 自我攻击
```markdown
**自我审视**: "我注意到这次我没有达到预期，可能是因为..."
↓
**自我攻击**: "我怎么又失败了，我总是这样..."

**区别**:
- 描述 vs 评判
- 观察 vs 标签
- 好奇 vs 指责
```
```

### 开场提醒
```markdown
## 开场语

"我们来做自我审视，但记得对自己温柔一点。"

"成长的关键是诚实面对，但不是苛刻审判。"

"不管发现了什么，你都是在努力的人。"
```
```

## 阶段 2：结构化审视框架

### 2.1 多维度审视

```markdown
## 多维度审视

### 审视维度
```markdown
**行为维度**:
- 做了哪些有效的事？
- 哪些行为没有达到预期？

**策略维度**:
- 采用了什么方法？
- 方法是否有效？

**环境维度**:
- 有什么外部因素影响了结果？
- 环境是否需要调整？

**期望维度**:
- 期望是否合理？
- 是否给自己太大压力？
```
```

### 2.2 具体问题

```markdown
## 审视问题

### 关于做得好的
```markdown
**我做了什么有效的事？**
- [具体行为]

**我有什么优势被发挥出来了？**
- [优势列表]

**我可以更多地发挥什么优势？**
- [列表]
```
```

### 关于可以改进的
```markdown
**我有什么地方想改？**
- [具体方面]

**这个"想改"是合理的吗？**
- [评估：是否对自己太苛刻？]

**如果有差距，是什么原因？**
- [分析原因，不是找茬]

**我可以尝试什么不同的做法？**
- [具体尝试]
```
```

## 阶段 3：平衡反馈

### 3.1 平衡总结

```markdown
## 平衡总结

### 不是只看到缺点
```markdown
**积极面**:
- [做得好的]
- [有进步的地方]
- [优势的发挥]

**成长空间**:
- [可以改进的]
- [学到的教训]

**整体评估**:
- 你是在努力的人
- 有优点也有空间
- 这很正常
```
```

### 3.2 去绝对化

```markdown
## 去绝对化练习

### 转化绝对化语言
```markdown
❌ "我总是失败"
↓ 
✓ "我这次没有达到预期"

❌ "我从来都做不好"
↓
✓ "这个领域我还需要练习"

❌ "我就是这种人"
↓
✓ "这次的情况是..."
```
```

## 阶段 4：建设性反馈

### 4.1 温和建议

```markdown
## 温和建议

### 给自己建议的方式
```markdown
**给自己提建议**:
"如果你想改进，可以考虑..."
"也许下次可以尝试..."
"一个可能有用的小改变是..."

**不给责备**:
❌ "你应该早点..."
✓ "下次也许可以提前..."

❌ "你怎么又..."
✓ "这次的情况提醒我们..."
```
```

## 阶段 5：输出模板

### 5.1 自我审视模板

```markdown
## 自我审视

### 自我关怀提醒
我是在努力的人，不管发现什么

### 做得好的
- [列表]

### 成长空间
- [列表]

### 原因分析
[客观分析，不是自责]

### 下次尝试
[温和可行的尝试，不是苛刻要求]
```

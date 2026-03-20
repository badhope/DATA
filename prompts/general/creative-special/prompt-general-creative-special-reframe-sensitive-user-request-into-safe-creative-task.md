---
id: prompt-general-creative-special-reframe-sensitive-user-request-into-safe-creative-task-v1
name: Reframe Sensitive User Request into Safe Creative Task
summary: 将敏感用户请求重新框架为安全创意任务
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: creative-special
tags:
  - reframing
  - safety
  - creative
  - transformation
keywords:
  - 重新框架
  - 安全转化
  - 创意
  - 敏感
intent: |
  将用户的敏感请求重新框架为安全的创意任务。
  强调保留创意价值的同时转移到安全框架。
  核心原则：不让用户感到被拒绝，而是被引导到更有价值的创作方向。
applicable_models:
  - "*"
input_requirements:
  - original_request: string 原始请求
  - sensitivity_concern: string 敏感顾虑
output_requirements:
  - reframed_request: object 重新框架后的请求
  - transformation_reasoning: string 转化逻辑
  - creative_value_preserved: string 保留的创意价值
tool_requirements: []
preconditions:
  - 有敏感请求需要重新框架
anti_patterns:
  - 生硬拒绝
  - 破坏创意意图
  - 强制转向不相关方向
failure_modes:
  - 拒绝感过强：温和引导
  - 创意价值丧失：保留核心意图
  - 转化不自然：自然的转向
self_check: |
  转化前自检：
  □ 是否保留了用户的核心创意意图？
  □ 新的框架是否自然且有价值？
  □ 用户是否会感到被理解和引导？
related_skills:
  - skill-creative-special
related_workflows: []
related_prompts:
  - prompt-general-creative-special-analyze-sensitive-topic-safely
  - prompt-general-creative-special-compare-controversial-topics-multi-perspective
---

# Context

当用户提出敏感请求时，直接拒绝会伤害创意体验。本 prompt 的核心目标是：**将敏感请求温和地转化为安全的创意框架，保留创意价值**。

# Prompt Body

## 阶段 1：意图理解

### 1.1 理解核心需求

```markdown
## 理解核心创意意图

### 挖掘需求
```markdown
**用户想要什么（表面）**: [表面请求]
**用户真正想要什么（深层）**: [深层意图]

**可能的核心需求**:
- [ ] 创意表达
- [ ] 情感释放
- [ ] 故事创作
- [ ] 角色发展
- [ ] 世界观探索
- [ ] 其他: [补充]
```

### 意图映射
```markdown
**表面请求**: [描述]
↓
**核心意图**: [如：创造令人恐惧的反派、探索道德灰色地带、构建紧张的冲突]
↓
**可安全实现的方向**: [安全方向]
```
```

## 阶段 2：转化策略

### 2.1 转化维度

```markdown
## 转化策略

### 从具体到抽象
```markdown
**敏感元素**: [具体细节]
↓
**抽象概念**: [核心主题]
↓
**安全表达**: [新的具体表达]

**示例**:
敏感: 真实的暴力场景细节
→ 抽象: 冲突的紧张感和后果
→ 安全: 虚构世界中的冲突描写，关注情感影响而非细节
```
```

### 从现实到虚构
```markdown
**现实情境**: [敏感现实]
↓
**虚构映射**: [对应虚构情境]
↓
**虚构表达**: [安全的虚构表达]

**示例**:
敏感: 当代敏感社会冲突
→ 虚构映射: 幻想世界的势力冲突
→ 安全: 虚构王国间的政治阴谋
```
```

### 从直接到暗示
```markdown
**直接描写**: [敏感内容]
↓
**暗示手法**: [间接表达]
↓
**想象补充**: [留白给读者]

**示例**:
敏感: 暴力行为的细节描写
→ 暗示手法: 结果、影响、情感
→ 想象补充: "之后，房间里只剩下..."
```
```

## 阶段 3：框架重建

### 3.1 新框架构建

```markdown
## 新框架构建

### 框架要素
```markdown
**保留的创意价值**:
- [核心意图1]
- [核心意图2]

**新的安全表达**:
- [安全方向1]
- [安全方向2]

**增强的维度**（可选）:
- [增加的价值维度]
```
```

### 3.2 转化示例库

```markdown
## 转化示例库

### 冲突/暴力 → 心理/影响
```markdown
原始: 战斗场景细节
新框架: 战斗的心理影响、角色面对冲突的内心挣扎

保留的价值: 紧张感、角色的成长/选择
```

### 黑暗/悲观 → 复杂/反思
```markdown
原始: 纯粹的黑暗/悲观描写
新框架: 复杂道德观、灰色地带、角色的选择与后果

保留的价值: 深度、复杂性、反思性
```

### 争议话题 → 虚构映射
```markdown
原始: 直接讨论敏感争议话题
新框架: 虚构世界的类似情境、隐喻性表达

保留的价值: 讨论的实质内容、思考价值
```

### 成人/亲密 → 暗示/留白
```markdown
原始: 亲密场景直接描写
新框架: 暗示、情感连接、关系发展

保留的价值: 情感深度、关系的意义
```
```

## 阶段 4：温和引导

### 4.1 引导话术

```markdown
## 引导话术

### 肯定意图
```markdown
"我理解你想要...[深层意图]，这是一个很有深度的创作方向。"

"你的想法很有创意...[肯定核心价值]"
```

### 提出建议
```markdown
"如果我们把这个转向...[新方向]，可能可以更好地实现...[核心意图]。"

"我想到一个可能更有意思的方向...[建议]。保留你想要的...[核心价值]，同时让作品更丰富。"
```

### 邀请参与
```markdown
"你觉得这样的转化可以吗？还是你有其他想法？"

"我们可以一起探索这个新方向，你最想保留的是什么？"
```
```

## 阶段 5：输出模板

### 5.1 转化模板

```markdown
## 请求转化

### 原始请求
```markdown
**请求**: [原始描述]
**识别的敏感元素**: [列表]
```

### 核心意图提取
```markdown
**核心创意意图**: [描述]
**可保留的价值**: [列表]
```

### 转化框架
```markdown
**新的创作方向**: [描述]

**保留的元素**:
- [元素1]
- [元素2]

**新增的价值**:
- [价值1]

**安全边界**: [说明]
```

### 引导确认
```markdown
"你觉得这个方向怎么样？我们可以继续探索这个框架。"
```

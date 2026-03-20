---
id: prompt-debugging-fix-bug-safely
name: Fix Bug Safely
summary: 在证据支持下安全修复 Bug
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: fix
tags:
  - fix
  - safe
  - evidence-based
  - minimal-change
keywords:
  - fix
  - safe
  - evidence
  - minimal
  - change
intent: |
  在充分证据支持下实施最小化、安全的 Bug 修复。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - root_cause: string (required) 根因
  - target_code: string (required) 目标代码
  - fix_strategy: string (required) 修复策略
  - verification_plan: string (optional) 验证计划
output_requirements:
  - fix_code: string 修复后的代码
  - changes_summary: string 变更摘要
  - risk_assessment: string 风险评估
  - verification_steps: string[] 验证步骤
  - rollback_plan: string 回滚计划
tool_requirements:
  - Read 读取完整代码上下文
  - Write 修改代码文件
preconditions: |
  - 根因必须明确
  - 必须有足够的证据支持修复方向
anti_patterns: |
  - 不要在根因不明确时进行修复
  - 不要做超出必要范围的修改
  - 不要跳过测试验证
failure_modes: |
  - 根因不确定: 返回继续分析
  - 修复风险高: 说明风险并提供备选方案
self_check: |
  - [ ] 根因是否明确？
  - [ ] 修复是否最小化？
  - [ ] 是否有回归风险？
  - [ ] 是否有回滚计划？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
  - workflow-change-verify
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-propose-minimal-risk-fix
  - prompt-debugging-verify-fix-after-change
---

# Context

安全的 Bug 修复需要三个要素：明确的根因、最小化的改动、充分的验证。这个 prompt 帮助 AI 在证据支持下实施安全的修复。

# Prompt Body

你是一个高级软件工程师。用户的输入是根因和目标代码。请安全地修复 Bug。

## 输入信息

```
根因：{root_cause}
目标代码：{target_code}
修复策略：{fix_strategy}
验证计划：{verification_plan}
```

## 安全修复原则

### 1。 证据驱动
— 根因必须有明确的证据支持
— 修复方向必须能解决根因
— 不能基于猜测进行修复

### 2。 最小改动
— 只改必要的地方
— 不做功能增强或重构
— 保持代码风格一致

### 3。 风险评估
— 评估修复对其他功能的影响
— 识别潜在的回归风险
— 准备回滚计划

### 4。 充分验证
— 编写或更新测试用例
— 验证修复解决了问题
— 确保没有引入新问题

## 工作流程

1。 **确认根因**：验证根因分析的准确性
2。 **设计修复**：确定最小的修复方案
3。 **评估风险**：分析修复的影响和风险
4。 **实施修复**：按最小改动原则修改
5。 **验证修复**：确认问题已解决
6。 **回归测试**：确保没有引入新问题

## 输出要求

### 1。 修复代码
```language
{语言}
{修复后的完整代码}
```

### 2。 变更摘要
```diff
— 删除的代码
+ 新增的代码
```

### 3。 风险评估
| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| ... | ... | ... | ... |

### 4。 验证步骤
```
1。 [验证步骤]
2。 [验证步骤]
```

### 5。 回滚计划
```
如果修复失败：
1。 [回滚步骤]
2。 [回滚步骤]
```

## 约束条件

— 必须有明确的根因才能开始修复
— 修复必须遵循最小改动原则
— 必须评估回归风险
— 必须有验证和回滚计划
— 不确定时宁可继续分析也不盲目修复

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{root_cause}` | 根因 | `getProfile 方法未检查用户对象是否存在` |
| `{target_code}` | 目标代码 | `user.service.ts 中的 getProfile 方法` |
| `{fix_strategy}` | 修复策略 | `在访问属性前添加空值检查` |
| `{verification_plan}` | 验证计划（可选） | `测试用户不存在场景的响应` |

# Usage Notes

— 必须先通过 identify—root—cause 确认根因后才能使用
— 如果根因不确定，应返回继续分析而非强行修复
— 最小改动原则：只修复导致 bug 的代码，不做重构
— 风险评估和回滚计划是必需的

# Example Input

```
根因：
用户服务 getProfile 方法在用户数据不存在时直接访问属性，导致 NullPointerException。根因置信度：高。

目标代码：
```typescript
async getProfile(userId: string): Promise<UserProfile> {
  const user = await this.userRepository.findById(userId);
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar
  };
}
```

修复策略：
在访问 user 属性前添加空值检查，如果用户不存在则抛出明确的业务异常。

验证计划：
1。 测试用户不存在场景
2。 测试用户存在场景
3。 运行所有相关单元测试
```

# Example Output

```
修复代码
```typescript
async getProfile(userId: string): Promise<UserProfile> {
  const user = await this.userRepository.findById(userId);
  if (!user) {
    throw new UserNotFoundException(`User with id ${userId} not found`);
  }
  return {
    name: user.name,
    email: user.email,
    avatar: user.avatar
  };
}
```

变更摘要
```diff
-  const user = await this.userRepository.findById(userId);
-  return {
-    name: user.name,
+  const user = await this.userRepository.findById(userId);
+  if (!user) {
+    throw new UserNotFoundException(`User with id ${userId} not found`);
+  }
+  return {
+    name: user.name,
```

风险评估
| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| 异常类型变化 | 低 | 中 | 更新调用方错误处理 |
| 性能轻微下降 | 低 | 低 | 可忽略 |

验证步骤
1。 运行单元测试：npm test —— ——testPathPattern=user。service
2。 测试用户不存在场景：curl http：//localhost/api/users/invalid—id
3。 测试用户存在场景：curl http：//localhost/api/users/valid—id
4。 检查日志确认异常正确抛出

回滚计划
如果修复失败：
1。 git revert HEAD~1 恢复上一版本
2。 重新部署
3。 确认服务正常后验证问题是否恢复
```
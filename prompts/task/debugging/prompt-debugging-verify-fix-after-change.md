---
id: prompt-debugging-verify-fix-after-change
name: Verify Fix After Change
summary: 在代码修改后验证修复
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: verification
tags:
  - verify
  - fix
  - validation
  - test
  - regression
keywords:
  - verify
  - fix
  - validation
  - test
  - regression
  - check
intent: |
  在代码修改后系统性地验证修复是否有效且没有引入回归。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - original_bug: string (required) 原始 Bug 描述
  - fix_description: string (required) 修复描述
  - changes_made: string (required) 做出的修改
  - test_coverage: string (optional) 测试覆盖情况
output_requirements:
  - verification_results: string[] 验证结果
  - regression_tests: string[] 回归测试项
  - test_commands: string[] 可执行的测试命令
  - sign_off_criteria: string 验收标准
  - risks: string[] 潜在风险
tool_requirements:
  - Read 读取代码和测试
  - RunCommand 执行测试
preconditions: |
  - 修改应当已经完成
  - 最好有测试用例
anti_patterns: |
  - 不要只验证原问题
  - 不要跳过回归测试
  - 不要忽略边界情况
failure_modes: |
  - 测试失败: 分析失败原因
  - 测试覆盖不足: 建议新增测试
self_check: |
  - [ ] 原问题是否确认修复？
  - [ ] 回归测试是否通过？
  - [ ] 边界情况是否验证？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
  - workflow-change-verify
related_prompts:
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-detect-regression-risk
---

# Context

修复代码后，必须验证修复是否有效且没有引入新问题。这个 prompt 帮助系统性验证修复，包括原问题验证和回归测试。

# Prompt Body

你是一个软件工程师。用户的输入是修复信息。请系统性验证修复。

## 输入信息

```
原始 Bug：{original_bug}
修复描述：{fix_description}
做出的修改：{changes_made}
测试覆盖：{test_coverage}
```

## 验证框架

### 1。 原问题验证
确认原始问题已被修复：
— 按照原始复现步骤验证
— 检查错误是否不再出现
— 验证输出是否符合预期

### 2。 功能验证
确认相关功能仍然正常：
— 核心功能测试
— 关联功能测试
— 用户场景测试

### 3。 回归测试
确保没有引入新问题：
— 单元测试
— 集成测试
— 端到端测试

### 4。 边界情况
验证边界条件：
— 最小/最大输入
— 空值处理
— 并发情况

### 5。 代码质量
检查代码变更：
— 代码风格一致
— 错误处理完整
— 注释更新

## 输出要求

### 1。 验证结果
| 验证项 | 结果 | 说明 |
|--------|------|------|
| 原问题复现 | ✓/✗ | …… |
| 核心功能 | ✓/✗ | …… |
| 回归测试 | ✓/✗ | …… |
| 边界情况 | ✓/✗ | …… |

### 2。 回归测试项
```
需要执行的回归测试：
1。 [测试项1]
2。 [测试项2]
```

### 3。 测试命令
```bash
# 执行验证的命令
[命令1]
[命令2]
```

### 4。 验收标准
```
修复被认为成功的标准：
— [标准1]
— [标准2]
```

### 5。 潜在风险
```
可能的残余风险：
— [风险1]
— [风险2]
```

## 约束条件

— 必须验证原问题已修复
— 必须执行回归测试
— 必须检查边界情况
— 如果测试失败，分析原因
— 给出明确的验收标准

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{original_bug}` | 原始 Bug 描述 | `用户登出后服务端会话未失效` |
| `{fix_description}` | 修复描述 | `添加了调用后端 /api/auth/logout 的逻辑` |
| `{changes_made}` | 做出的修改 | `在 logout 函数中添加了 fetch 调用` |
| `{test_coverage}` | 测试覆盖情况（可选） | `有 logout 相关的单元测试` |

# Usage Notes

— 适用于代码修改后的验证阶段
— 必须包含原问题验证和回归测试
— 测试命令应该可执行
— 验收标准应该具体可衡量

# Example Input

```
原始 Bug：
用户点击登出后，如果打开了新标签页，新标签页仍然可以使用之前的会话。

修复描述：
在 logout 函数中添加了调用后端 /api/auth/logout 的逻辑，使服务端会话也失效。

做出的修改：
```diff
 async function logout() {
+  try {
+    await fetch('/api/auth/logout', { method: 'POST' });
+  } finally {
     localStorage.clear();
     window.location.href = '/login';
+  }
 }
```

测试覆盖：
— 有 logout 函数的单元测试
— 有 auth 相关的集成测试
```

# Example Output

```
验证结果
| 验证项 | 结果 | 说明 |
|--------|------|------|
| 原问题复现 | ✓ | 新标签页无法使用已登出的会话 |
| 核心功能 | ✓ | 登出功能正常，本地状态正确清除 |
| 回归测试 | ✓ | auth 集成测试全部通过 |
| 边界情况 | ✓ | API 失败时仍能正确清除本地状态 |

回归测试项
需要执行的回归测试：
1。 logout 单元测试
2。 auth 集成测试
3。 会话过期处理测试

测试命令
```bash
# 运行相关测试
npm test -- --testPathPattern="logout|auth"
# 手动验证
# 1。 登录用户
# 2。 点击登出
# 3。 在新标签页尝试访问需要登录的页面
# 4。 确认被重定向到登录页
```

验收标准
修复被认为成功的标准：
— [x] 原问题场景已验证修复
— [x] 所有相关测试通过
— [x] 手动验证通过
— [x] 代码变更已 Code Review

潜在风险
可能的残余风险：
— 第三方登录（OAuth）的会话可能未被正确处理
— 移动端的会话处理需要单独验证
```
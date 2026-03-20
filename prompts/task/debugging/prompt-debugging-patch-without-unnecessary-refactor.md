---
id: prompt-debugging-patch-without-unnecessary-refactor
name: Patch Bug Without Unnecessary Refactor
summary: 修补 Bug 而不进行不必要的重构
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: fix
tags:
  - patch
  - fix
  - conservative
  - no-refactor
keywords:
  - patch
  - fix
  - conservative
  - no-refactor
  - minimal
intent: |
  以最保守的方式修补 Bug，不进行任何非必要的重构。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - bug_description: string (required) Bug 描述
  - root_cause: string (required) 根因
  - target_code: string (required) 目标代码
output_requirements:
  - patch_code: string 修补后的代码
  - changes_scope: string 改动范围
  - what_changed: string[] 具体改动内容
  - what_not_changed: string[] 刻意不改动的内容
  - rationale: string 不重构的理由
tool_requirements:
  - Read 读取完整代码
  - Write 修改代码文件
preconditions: |
  - 根因必须明确
  - 目标代码必须清晰
anti_patterns: |
  - 不要借机重构无关代码
  - 不要改变代码结构
  - 不要优化性能（除非是 Bug 原因）
failure_modes: |
  - Bug 无法简单修补: 说明原因并提供备选方案
  - 需要重构才能修复: 说明最小必要的重构
self_check: |
  - [ ] 改动是否最小化？
  - [ ] 是否避免了不必要的改动？
  - [ ] 是否保持了原有代码结构？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
  - workflow-change-verify
related_prompts:
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-propose-minimal-risk-fix
---

# Context

修补 Bug 时，常见的错误是借机"清理"代码或进行重构。这会增加回归风险。这个 prompt 帮助 AI 以最保守的方式修补 Bug，只改必要的地方。

# Prompt Body

你是一个保守的软件工程师。用户的输入是 Bug 信息。请只修补 Bug，不做任何不必要的改动。

## 输入信息

```
Bug 描述：{bug_description}
根因：{root_cause}
目标代码：{target_code}
```

## 保守修补原则

### 1。 只改必要的地方
— 修复导致 Bug 的那一行/几行代码
— 不改周围看起来"不太好"的代码
— 不做"顺便优化"

### 2。 保持代码结构
— 不移动代码位置
— 不改变函数签名
— 不改变文件结构

### 3。 保持代码风格
— 使用与周围代码相同的风格
— 不改变命名约定
— 不改变注释风格

### 4。 避免"顺便"改动
— 不修复"顺便看到"的其他问题
— 不做性能优化（除非是 Bug 原因）
— 不做代码简化（除非影响可读性）

## 工作流程

1。 **确认 Bug 位置**：精确找到需要修改的代码
2。 **设计最小修补**：确定最小的修改方案
3。 **验证修改范围**：确认只改动了必要的地方
4。 **实施修补**：执行最小修改
5。 **检查未改动部分**：确认有意保持不变的部分

## 输出要求

### 1。 修补代码
```language
{语言}
{修补后的代码}
```

### 2。 改动范围
```
行数：从 X 行到 Y 行
函数：无
结构：无
```

### 3。 具体改动
```
已改动：
— [改动1]
— [改动2]

刻意不改动：
— [未改动1] — 理由
— [未改动2] — 理由
```

### 4。 不重构的理由
```
[说明为什么选择保守修补而不是重构]
```

## 约束条件

— 改动必须最小化，只改导致 Bug 的代码
— 不改变代码结构、位置、风格
— 不借机重构或优化其他代码
— 保持 Bug 之外的代码完全不变

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{bug_description}` | Bug 描述 | `用户登出后返回登录页，但会话未正确清除` |
| `{root_cause}` | 根因 | `logout 方法只清除本地存储，未调用后端登出 API` |
| `{target_code}` | 目标代码 | `auth.js 中的 logout 方法` |

# Usage Notes

— 适用于紧急 Bug 修复，需要快速上线
— 强调保守修补，避免引入新问题
— 重构应该作为单独的任务，而非修补的一部分
— 如果认为需要重构，应明确说明而非默默进行

# Example Input

```
Bug 描述：
用户点击登出按钮后，本地状态已清除，但如果在登出前打开了新标签页，新标签页仍然可以使用之前的会话。

根因：
logout 方法只调用了 localStorage。clear()，没有调用后端 /api/auth/logout 来使服务端会话失效。

目标代码：
```javascript
// auth.js
async function logout() {
  localStorage.clear();
  window.location.href = '/login';
}
```

注意：这段代码虽然可以改进（如添加错误处理、使用更好的状态管理），但这次只修 Bug，不做重构。
```

# Example Output

```
修补代码
```javascript
// auth.js
async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } finally {
    localStorage.clear();
    window.location.href = '/login';
  }
}
```

改动范围
行数：4 行到 7 行
函数签名：无变化
文件结构：无变化

具体改动
已改动：
— 添加 fetch 调用后端登出 API
— 使用 try/finally 确保 localStorage 即使在 API 调用失败时也能清除

刻意不改动：
— window。location。href 跳转逻辑 — 保持原有行为
— logout 函数的参数和返回值 — 保持 API 兼容性
— 不添加额外的状态管理逻辑 — 这是后续重构的范围

不重构的理由
1。 紧急修复，需要最小化改动降低风险
2。 当前代码虽然简陋，但功能基本正确
3。 大规模重构应该有独立的测试计划和 Code Review
4。 如果此次修补引入问题，更容易定位和回滚
```
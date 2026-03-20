---
id: prompt-task-repo-analysis-locate-bug-related-files-v1
name: Locate Bug Related Files
summary: 根据 bug 特征快速定位相关文件和代码位置
type: prompt
status: active
version: 1.0.0
owner: skill-repository
category: task
sub_category: repo-analysis
tags: [repo-analysis, bug-location, file-search, code-search, debugging]
keywords: [Bug 定位, 文件搜索, 代码定位, 调试准备]
intent: 在面对 bug 时，快速定位可能相关的文件和代码位置，缩小调试范围
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - qwen-plus
  - deepseek-v3
  - minimax-large
input_requirements:
  - bug_description: string (必填) Bug 描述
  - error_message: string (可选) 错误信息
  - error_type: string (可选) 错误类型
  - repo_structure: string (可选) 仓库结构（可引用之前的分析）
output_requirements:
  - location_report: object 包含：
    - candidate_files: array 候选文件列表
    - confidence_scores: object 每个文件的置信度
    - reasoning: object 定位理由
    - search_strategy: string 搜索策略
    - next_steps: array 建议的下一步
tool_requirements:
  - 代码搜索能力
  - 文件读取能力
preconditions:
  - 应了解仓库的基本结构
  - 应提供 bug 的相关信息
anti_patterns:
  - 不要盲目搜索所有文件
  - 不要忽略错误堆栈的提示
  - 不要遗漏测试文件
failure_modes:
  - 信息不足时：列出需要补充的信息
  - 多个可能位置时：列出所有可能性
  - 结构复杂时：提供分层的搜索策略
self_check: |
  搜索前检查：
  □ 是否提取了 bug 的关键特征
  □ 是否利用了错误堆栈的信息
  □ 是否理解了仓库的结构
  □ 是否识别了相关的模块
related_skills:
  - skill-debugging-analysis
  - skill-repo-analysis
  - skill-coding-code-search
related_workflows:
  - workflow-sequential-bug-fix
  - workflow-multi-step-debugging
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-debugging-identify-root-cause
  - prompt-debugging-generate-debug-plan
---

# Context

你是一个经验丰富的调试专家，负责根据 bug 特征快速定位相关文件。这个 Prompt 强调：
1。 利用错误信息缩小范围
2。 系统性的搜索策略
3。 置信度评估
4。 高效的调试路径

# Prompt Body

## 阶段 1：Bug 特征提取

### 1。1 错误信息分析

```markdown
## 错误信息分析

### 错误类型
- [ ] TypeError
- [ ] ReferenceError
- [ ] SyntaxError
- [ ] RuntimeError
- [ ] NetworkError
- [ ] DatabaseError
- [ ] AuthenticationError
- [ ] ValidationError
— [ ] 其他：[类型]

### 错误消息
```
[完整的错误消息]
```

### 关键信息提取
| 信息 | 值 | 重要性 |
|------|-----|--------|
| 文件名 | …… | 🔴 高 |
| 函数名 | …… | 🔴 高 |
| 行号 | …… | 🟡 中 |
| 错误类型 | …… | 🔴 高 |
```

### 1。2 堆栈跟踪分析

```markdown
## 堆栈跟踪分析

### 调用链
```
[堆栈跟踪]
```

### 关键位置
| # | 文件 | 函数 | 行号 | 重要性 |
|---|------|------|------|--------|
| 1 | index.js | main | 10 | 🔴 |
| 2 | service.js | process | 25 | 🔴 |
| 3 | utils.js | helper | 50 | 🟡 |
```

### 可能的根因位置
[基于堆栈跟踪的初步判断]
```

### 1。3 Bug 行为特征

```markdown
## Bug 行为特征

### 触发条件
— 操作：[什么操作触发]
— 数据：[什么数据触发]
— 时间：[什么时间/条件下触发]

### 影响范围
— 功能影响：[影响什么功能]
— 数据影响：[是否有数据问题]
— 性能影响：[是否有性能问题]

### 复现难度
— [ ] 100% 可复现
— [ ] 偶发复现
— [ ] 难以复现
```

## 阶段 2：搜索策略

### 2。1 基于错误的搜索

```markdown
## 搜索策略：基于错误消息

### 关键词提取
| 关键词 | 搜索范围 | 预期目标 |
|--------|----------|----------|
| "XXX" | 全局 | 错误消息来源 |
| functionName | 全局 | 相关函数 |
| ClassName | 全局 | 相关类 |
```

### 搜索命令
```bash
# 搜索错误消息中的关键字符串
grep —r "错误消息关键词" ——include="*。js"

# 搜索函数名
grep -r "functionName" --include="*.js"
```

### 2。2 基于模块的搜索

```markdown
## 搜索策略：基于功能模块

### 相关模块识别
| 模块 | 与 Bug 的关联 | 优先级 |
|------|---------------|--------|
| auth | 可能是认证问题 | 高 |
| payment | 涉及支付 | 高 |
| user | 涉及用户数据 | 中 |
```

### 2。3 基于类型的搜索

```markdown
## 搜索策略：基于文件类型

### 优先搜索
| 模式 | 理由 |
|------|------|
| *。service。ts | 业务逻辑集中地 |
| *。api。ts | API 处理 |
| *。model。ts | 数据模型 |
| *。middleware。ts | 中间件 |

### 跳过搜索
| 模式 | 理由 |
|------|------|
| *。test。ts | 测试文件 |
| *。spec。ts | 测试文件 |
| *。css | 样式文件 |
| *。json | 配置文件 |
```

## 阶段 3：文件定位

### 3。1 候选文件列表

```markdown
## 候选文件

| # | 文件路径 | 置信度 | 理由 |
|---|----------|--------|------|
| 1 | src/services/AuthService。ts | 90% | 错误堆栈显示 |
| 2 | src/middleware/auth。ts | 70% | 认证中间件 |
| 3 | src/routes/auth。ts | 60% | 认证路由 |
| 4 | src/types/auth。ts | 40% | 类型定义 |
```

### 3。2 置信度分析

```markdown
## 置信度分析

### 🔴 高置信度 (>70%)
| 文件 | 置信度 | 证据 |
|------|--------|------|
| AuthService。ts | 90% | 堆栈跟踪第 1 行 |

### 🟡 中置信度 (40—70%)
| 文件 | 置信度 | 证据 |
|------|--------|------|
| auth。ts | 60% | 功能相关 |

### 🟢 低置信度 (<40%)
| 文件 | 置信度 | 证据 |
|------|--------|------|
| types。ts | 30% | 可能涉及类型 |
```

## 阶段 4：详细分析

### 4。1 文件内容分析

```markdown
## 文件分析

### AuthService。ts 分析
— **文件路径**：src/services/AuthService。ts
— **文件大小**：150 行
— **主要功能**：用户认证和授权
— **导出函数**：login()， logout()， verifyToken()， refreshToken()

### 相关代码段
```typescript
// 第 25—30 行：可能的错误位置
async function verifyToken(token: string) {
  if (!token) {
    throw new Error('Token is required')；  // 错误可能在这里
  }
  // …… 验证逻辑
}
```

### 问题点
— **行 25—30**：空 token 检查
— **行 45—50**：token 解析
```

### 4。2 依赖关系分析

```markdown
## 依赖关系

### 文件依赖
```
AuthService.ts
├── uses： TokenService (第 5 行)
├── uses： UserRepository (第 8 行)
└── calls： external Auth API (第 40 行)
```

### 影响范围
| 文件 | 影响方式 |
|------|----------|
| TokenService。ts | AuthService 依赖它 |
| UserRepository。ts | AuthService 依赖它 |
```

## 阶段 5：定位结果

### 5。1 最可能的文件

```markdown
## 最可能的文件

### 第一嫌疑：AuthService。ts
— **置信度**：90%
— **理由**：[详细理由]
— **需要检查的行**：25—30， 45—50
— **建议检查点**：
  1。 token 验证逻辑
  2。 空值处理
  3。 异常捕获

### 第二嫌疑：TokenService。ts
— **置信度**：70%
— **理由**：[详细理由]
```

### 5。2 搜索路径建议

```markdown
## 搜索路径

### 路径 1：堆栈驱动
```
堆栈跟踪第 1 行 (AuthService。ts：25)
    ↓
调用者 (middleware/auth。ts：10)
    ↓
调用者 (routes/auth。ts：5)
```

### 路径 2：功能驱动
```
认证功能
    ↓
src/auth/*.ts
    ↓
src/services/AuthService.ts
    ↓
src/utils/token.ts
```

## 阶段 6：输出报告

### 6。1 定位报告

```markdown
# Bug 文件定位报告

## Bug 概述
[bug 的简要描述]

## 错误信息
[错误消息和类型]

## 定位结果

### 最可能的文件
| 优先级 | 文件 | 置信度 | 主要理由 |
|--------|------|--------|----------|
| 1 | src/services/AuthService。ts | 90% | 堆栈跟踪显示 |
| 2 | src/utils/TokenService。ts | 70% | 功能相关 |
| 3 | src/middleware/auth。ts | 60% | 中间件链 |

### 需要检查的具体位置
| 文件 | 行号范围 | 重点检查 |
|------|----------|----------|
| AuthService。ts | 25—30 | 空值处理 |
| AuthService。ts | 45—50 | token 解析 |
| TokenService。ts | 10—20 | token 生成 |

## 搜索策略
1。 首先检查 AuthService。ts 的第 25—30 行
2。 然后检查 TokenService。ts 的 token 验证逻辑
3。 最后检查 auth 中间件的调用链

## 下一步建议
1。 查看 AuthService。ts 的 verifyToken 函数
2。 检查 TokenService 的实现
3。 追踪完整的调用链
```

### 6。2 调试路线图

```markdown
## 调试路线图

```
[Bug 现象]
    ↓
[定位：AuthService。ts：25—30]
    ↓
[检查：空值处理]
    ↓
[可能原因 1：token 未传]
    ↓
[可能原因 2：token 格式错误]
    ↓
[制定修复计划]
```
```

# Variables

| 变量名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| bug_description | string | 是 | Bug 描述 |
| error_message | string | 否 | 错误信息 |
| error_type | string | 否 | 错误类型 |
| repo_structure | string | 否 | 仓库结构 |

# Usage Notes

1。 **信息驱动**：尽可能利用错误消息和堆栈
2。 **系统性**：按阶段执行搜索
3。 **置信度评估**：对每个候选文件给出置信度
4。 **实用路线**：提供清晰的调试路径

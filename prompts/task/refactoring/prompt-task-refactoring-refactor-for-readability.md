---
id: prompt-task-refactoring-refactor-for-readability-v1
name: Refactor for Readability
summary: 改善代码可读性，包括命名、注释、格式化、结构重组
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - readability
  - naming
  - documentation
keywords:
  - 可读性
  - 命名改善
  - 注释
  - 代码格式化
intent: |
  指导 AI 改善代码可读性，使代码更易于理解。
  强调可读性是代码质量的基础，好的代码应该自解释。
  核心原则：代码是给人类读的，可读性优先。
applicable_models:
  - "*"
input_requirements:
  - target_code: string 目标代码
  - readability_goals: array 可读性目标
output_requirements:
  - readability_analysis: object 可读性分析
  - improvement_plan: array 改善计划
  - refactored_code: string 改善后的代码
tool_requirements:
  - Read tool (读取代码)
  - Lint tool (代码分析)
preconditions:
  - 有代码需要改善可读性
anti_patterns:
  - 添加过多注释
  - 过度格式化
  - 改名导致语义改变
failure_modes:
  - 注释误导：保持注释与代码一致
  - 改名不当：确保改名语义正确
  - 过度简化：保持必要的细节
self_check: |
  改善前自检：
  □ 是否理解了代码的实际行为？
  □ 改名是否保持了语义？
  □ 注释是否与代码一致？
  □ 改善是否提高了可读性？
related_skills:
  - skill-code-review
  - skill-documentation-for-code
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-refactor-code-without-changing-behavior
  - prompt-task-code-review-review-code-for-readability
---

# Context

代码可读性直接影响代码的可维护性和协作效率。可读性好的代码无需额外解释就能被理解。本 prompt 的核心目标是：**指导 AI 系统性地改善代码可读性**。

# Prompt Body

## 阶段 1：可读性分析

### 1.1 命名分析

```markdown
## 命名分析

### 变量命名
| # | 变量名 | 当前 | 问题 | 建议 | 优先级 |
|---|---------|------|------|------|--------|
| 1 | [变量] | [当前] | [问题] | [建议] | P0/P1 |

### 函数命名
| # | 函数名 | 当前 | 问题 | 建议 | 优先级 |
|---|---------|------|------|------|--------|
| 1 | [函数] | [当前] | [问题] | [建议] | P0/P1 |

### 类/模块命名
| # | 名称 | 当前 | 问题 | 建议 | 优先级 |
|---|------|------|------|------|--------|
| 1 | [名称] | [当前] | [问题] | [建议] | P0/P1 |

### 命名问题类型
| 类型 | 描述 | 示例 |
|------|------|------|
| 无意义名称 | x, data, temp | a, value |
| 模糊名称 | handle, process | validateInput |
| 误导性名称 | 名称与实际不符 | isActive (实际是 hasPermission) |
| 缩写不当 | 难以理解的缩写 | calcTot |
| 匈牙利命名 | 过时的命名风格 | strName |
```

### 1.2 注释分析

```markdown
## 注释分析

### 注释质量评估
| # | 位置 | 注释内容 | 问题 | 建议 |
|---|------|----------|------|------|
| 1 | [位置] | [注释] | [问题] | [建议] |

### 注释问题
| 问题类型 | 描述 | 影响 |
|----------|------|------|
| 缺失关键注释 | 复杂逻辑无解释 | 高 |
| 注释过时 | 注释与代码不符 | 高 |
| 注释废话 | 注释不能增加理解 | 低 |
| 注释过多 | 每行都加注释 | 中 |
```

### 1.3 结构分析

```markdown
## 结构可读性

### 问题区域
| # | 位置 | 问题 | 严重度 | 建议 |
|---|------|------|--------|------|
| 1 | [位置] | [问题] | [严重度] | [建议] |

### 结构问题类型
| 类型 | 描述 | 改善方式 |
|------|------|----------|
| 过函数 | 函数超过 50 行 | 拆分 |
| 嵌套过深 | 超过 3 层嵌套 | 卫语句/提取函数 |
| 行过长 | 超过 120 字符 | 换行 |
| 缺少空白 | 无空行分隔逻辑 | 添加空行 |
```

## 阶段 2：改善计划

### 2.1 命名改善

```markdown
## 命名改善

### 命名原则
| 原则 | 描述 | 示例 |
|------|------|------|
| 自解释 | 名称说明用途 | getUserById |
| 具体化 | 避免模糊词 | handle vs processPayment |
| 一致性 | 保持命名风格一致 | getUser, getOrder |
| 约定俗成 | 遵循语言惯例 | isXxx, hasXxx |

### 改善清单
```markdown
**变量**:
- [x] `data` → `userData`
- [x] `tmp` → `temporaryFilePath`

**函数**:
- [x] `process()` → `processPayment()`
- [x] `handle()` → `handleUserAuthentication()`

**类**:
- [x] `Manager` → `OrderManager`
```
```

### 2.2 注释改善

```markdown
## 注释改善

### 注释原则
| 原则 | 描述 | 示例 |
|------|------|------|
| 解释为什么 | 不是解释是什么 | // 使用二分查找因为数据有序 |
| 解释复杂逻辑 | 简单逻辑不需要注释 | // 递归终止条件... |
| 保持一致 | 注释风格保持统一 | // 标题格式 |

### 注释清单
```markdown
**添加注释**:
- [x] [位置]: 添加为什么的注释

**更新注释**:
- [x] [位置]: 更新注释与代码一致

**删除注释**:
- [x] [位置]: 删除无意义的注释
```
```

### 2.3 结构改善

```markdown
## 结构改善

### 格式化清单
```markdown
- [x] 统一缩进
- [x] 添加空行分隔逻辑块
- [x] 换行过长的行
- [x] 统一引号风格
```

### 重构清单
```markdown
- [x] [位置]: 拆分过长的函数
- [x] [位置]: 简化嵌套
- [x] [位置]: 提取重复逻辑
```
```

## 阶段 3：实施

### 3.1 改名重构

```markdown
## 改名重构

### 变更记录
| 位置 | 原名称 | 新名称 | 原因 |
|------|--------|--------|------|
| [位置] | [原] | [新] | [原因] |

### 批量重命名
```bash
# 使用 IDE 的重构功能进行安全重命名
# 确保所有引用都被更新
```
```

### 3.2 注释更新

```markdown
## 注释更新

### 注释变更
| 位置 | 操作 | 内容 |
|------|------|------|
| [位置] | 添加 | [注释内容] |
| [位置] | 更新 | [新注释内容] |
| [位置] | 删除 | [原因] |
```

### 3.3 格式化

```markdown
## 格式化

### 格式化规范
```yaml
indent: 2 spaces
line_length: 100
quote_style: single
semicolon: true
```

### 应用
```bash
# 运行格式化工具
npm run format
```
```

## 阶段 4：验证

### 4.1 可读性验证

```markdown
## 可读性验证

### 命名验证
- [ ] 所有名称都有意义
- [ ] 名称与功能匹配
- [ ] 命名风格一致

### 注释验证
- [ ] 关键逻辑有注释
- [ ] 注释与代码一致
- [ ] 无废话注释

### 结构验证
- [ ] 函数长度合理
- [ ] 嵌套层级适当
- [ ] 代码组织清晰
```

### 4.2 功能验证

```markdown
## 功能验证

### 测试
- [ ] 所有测试通过
- [ ] 行为与重构前一致

### 代码审查
- [ ] 可读性明显改善
- [ ] 无引入新问题
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `target_code` | 目标代码路径 | `src/services/user.service.ts` |
| `readability_goals` | 可读性目标 | `["改善函数命名", "添加关键注释"]` |

# Usage Notes

1. **语义优先**：改名必须保持语义
2. **解释性注释**：注释解释为什么，不是做什么
3. **自解释代码**：好代码应该无需注释也能理解
4. **风格一致**：保持团队命名和格式风格一致
5. **验证行为**：改名和格式化后验证行为不变

# Example Input

```yaml
target_code: "src/utils/validation.ts"
readability_goals:
  - "改善变量命名"
  - "添加关键注释"
  - "改善代码结构"
```

# Example Output

```yaml
readability_analysis:
  naming_issues: 5
  comment_issues: 3
  structure_issues: 2

improvement_plan:
  naming:
    - "data → userInputData"
    - "tmp → temporaryCache"
    - "process → validateUserInput"
  comments:
    - "添加二分查找原因注释"
    - "更新过期注释"
    - "删除无用注释"
  structure:
    - "拆分 80 行函数为 3 个函数"
    - "添加空行分隔逻辑块"

refactored_code:
  path: "src/utils/validation.ts"
  changes:
    naming: 5
    comments: 3
    structure: 2
  verification: "所有测试通过"
```

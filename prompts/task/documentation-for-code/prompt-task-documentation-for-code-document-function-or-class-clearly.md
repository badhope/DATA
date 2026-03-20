---
id: prompt-task-documentation-for-code-document-function-or-class-clearly-v1
name: Document Function or Class Clearly
summary: 为函数或类生成清晰的文档注释
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: documentation-for-code
tags:
  - documentation
  - JSDoc
  - docstring
  - function
  - class
keywords:
  - 函数文档
  - 类文档
  - JSDoc
  - 注释
intent: |
  指导 AI 为函数或类生成清晰、规范的文档注释。
  强调文档注释必须与代码同步、准确、有意义。
  核心原则：好的文档注释解释"为什么"而非"是什么"。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - function_name: string 函数名
  - doc_format: string 文档格式
output_requirements:
  - doc_comment: string 文档注释
  - param_docs: array 参数文档
  - return_doc: string 返回值文档
  - example_usage: array 使用示例
tool_requirements:
  - Read tool (读取代码)
preconditions:
  - 有函数或类需要生成文档
anti_patterns:
  - 注释描述"是什么"而非"为什么"
  - 参数说明过于简略
  - 缺少使用示例
failure_modes:
  - 注释过时：保持与代码同步
  - 说明不清：提供清晰准确的描述
  - 缺少上下文：解释使用场景
self_check: |
  编写前自检：
  □ 是否理解了函数的用途？
  □ 是否清楚了参数和返回值？
  □ 是否理解了使用场景？
  □ 是否提供了足够的示例？
related_skills:
  - skill-documentation-for-code
  - skill-coding
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-documentation-for-code-generate-readme-for-code-module
  - prompt-task-documentation-for-code-generate-api-usage-documentation
---

# Context

文档注释是代码的内嵌文档，直接写在代码旁边，便于开发者查阅和维护。好的文档注释能帮助其他开发者快速理解函数或类的用途、参数、返回值和使用方式。本 prompt 的核心目标是：**指导 AI 为函数或类生成清晰、规范、有意义的文档注释**。

# Prompt Body

## 阶段 1：代码分析

### 1.1 函数/类理解

```markdown
## 函数/类分析

### 基本信息
| 项目 | 内容 |
|------|------|
| 名称 | [名称] |
| 类型 | [函数/类/方法] |
| 位置 | [路径] |
| 行数 | [行数] |

### 函数签名
```[语言]
[完整签名]
```

### 核心功能
```markdown
**功能描述**: [描述]

**解决的问题**:
1. [问题1]
2. [问题2]

**使用场景**:
- [场景1]
- [场景2]
```

### 依赖关系
| # | 依赖 | 用途 |
|---|------|------|
| 1 | [依赖] | [用途] |
```

### 1.2 参数分析

```markdown
## 参数分析

### 参数清单
| # | 参数名 | 类型 | 必需 | 默认值 | 说明 |
|---|--------|------|------|--------|------|
| 1 | [参数] | [类型] | [是/否] | [值] | [说明] |

### 参数约束
| # | 参数 | 约束条件 | 超出后果 |
|---|------|----------|----------|
| 1 | [参数] | [条件] | [后果] |

### 参数间关系
```markdown
[描述参数之间的关系或依赖]
```
```

### 1.3 返回值分析

```markdown
## 返回值分析

### 返回值
| 类型 | 说明 | 错误情况 |
|------|------|----------|
| [类型] | [说明] | [错误情况] |

### 返回值示例
```markdown
成功: [示例]
失败: [示例]
```
```

## 阶段 2：文档格式选择

### 2.1 格式类型

```markdown
## 文档格式

### JSDoc (JavaScript/TypeScript)
```javascript
/**
 * [描述]
 * @param {类型} 参数名 - [说明]
 * @returns {类型} [说明]
 * @throws {异常类型} [说明]
 */
```

### Python Docstring
```python
"""
[描述]

Args:
    参数名 (类型): [说明]

Returns:
    类型: [说明]

Raises:
    异常类型: [说明]
"""
```

### Go Doc
```go
// [描述]
//
// Parameters:
//   - 参数名 类型: [说明]
//
// Returns: [说明]
//
// Error: [说明]
```
```

### 2.2 格式选择
| 语言 | 推荐格式 |
|------|----------|
| JavaScript/TypeScript | JSDoc |
| Python | Docstring |
| Go | Go Doc |
| Java | Javadoc |
| Rust | Rust Doc |
```

## 阶段 3：文档编写

### 3.1 函数文档模板

```markdown
## 函数文档模板

```[格式]
/**
 * [一句话描述函数功能]
 *
 * [详细描述函数功能、作用和使用场景。如果函数有特殊的行为或副作用，应在这里说明]
 *
 * @param {类型} [参数名] - [参数说明，包含有效值范围、默认值等]
 * @param {类型} [参数名] - [参数说明]
 * @returns {类型} [返回值说明，包含可能的返回值类型]
 * @throws {异常类型} [可能抛出的异常及触发条件]
 * @example
 * // [简短示例]
 * [示例代码]
 *
 * // [完整示例]
 * [示例代码]
 */
```
```

### 3.2 类文档模板

```markdown
## 类文档模板

```[格式]
/**
 * [类的一句话描述]
 *
 * [类的详细说明，包括设计理念、用途、使用场景等]
 *
 * @constructor
 * @param {类型} [构造参数] - [参数说明]
 *
 * @example
 * // [使用示例]
 * const instance = new [ClassName]([参数]);
 * instance.[method]();
 */
```
```

### 3.3 方法文档模板

```markdown
## 方法文档模板

```[格式]
/**
 * [方法的一句话描述]
 *
 * [方法的详细说明]
 *
 * @param {类型} [参数名] - [参数说明]
 * @returns {类型} [返回值说明]
 * @async [如果是异步方法]
 *
 * @example
 * [示例代码]
 */
```
```

## 阶段 4：内容编写指南

### 4.1 描述编写

```markdown
## 描述编写指南

### 好描述的特征
| 特征 | 示例 |
|------|------|
| 简洁明了 | "验证用户输入的邮箱格式" |
| 解释为什么 | "在保存前验证，确保数据完整性" |
| 说明副作用 | "此方法会修改原始数组" |
| 描述使用场景 | "用于表单提交前的数据验证" |

### 避免的写法
| 写法 | 问题 | 改进 |
|------|------|------|
| "这是一个函数" | 太笼统 | 描述具体功能 |
| 与代码重复 | 无增量信息 | 解释代码不能表达的 |
| 缺少上下文 | 难以理解 | 说明使用场景 |
```

### 4.2 参数文档

```markdown
## 参数文档指南

### 参数描述要素
```markdown
@param {类型} 参数名 - [描述]
```

### 描述要素
| 要素 | 说明 | 示例 |
|------|------|------|
| 含义 | 参数代表什么 | "用户邮箱地址" |
| 格式 | 期望的格式 | "RFC 5322 格式" |
| 有效值 | 可接受的值 | "非空字符串" |
| 默认值 | 如果有的话 | "默认为 10" |
| 约束 | 限制条件 | "必须大于 0" |

### 联合类型文档
```markdown
@param {(类型1 | 类型2)} 参数名 - [说明]
```
```

### 4.3 返回值文档

```markdown
## 返回值文档指南

### 返回值描述要素
| 要素 | 说明 | 示例 |
|------|------|------|
| 类型 | 返回值类型 | "Promise<User>" |
| 内容 | 返回什么内容 | "创建的用户对象" |
| 特殊情况 | 特殊情况返回值 | "失败时返回 null" |

### void 返回
```markdown
/**
 * @returns {void}
 */
[无返回值的方法]

/**
 * @returns {boolean} 操作是否成功
 */
[返回布尔值的方法]
```
```

## 阶段 5：示例编写

### 5.1 示例类型

```markdown
## 示例编写

### 基础示例
```javascript
/**
 * @example
 * const result = validateEmail('user@example.com');
 * // result === true
 */
```

### 完整示例
```javascript
/**
 * @example
 * // 验证有效邮箱
 * validateEmail('user@example.com'); // true
 *
 * // 验证无效邮箱
 * validateEmail('not-an-email'); // false
 *
 * // 处理边界情况
 * validateEmail(''); // false
 */
```
```

### 5.2 示例指南

```markdown
## 示例编写指南

### 示例要求
| 要求 | 说明 |
|------|------|
| 可运行 | 代码应能实际执行 |
| 有说明 | 关键步骤有注释 |
| 有预期 | 展示预期结果 |
| 覆盖常用场景 | 最常见的使用方式 |

### 示例数量
| 复杂度 | 推荐示例数 |
|--------|------------|
| 简单函数 | 1-2 个 |
| 中等复杂度 | 2-3 个 |
| 复杂函数 | 3+ 个 |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/utils/validation.ts` |
| `function_name` | 函数名 | `validateEmail` |
| `doc_format` | 文档格式 | `jsdoc` |

# Usage Notes

1. **准确描述**：准确反映函数行为
2. **清晰简洁**：避免冗长和不必要的信息
3. **与代码同步**：代码变更时及时更新
4. **提供示例**：让使用者知道如何使用
5. **统一风格**：保持团队文档风格一致

# Example Input

```yaml
code_path: "src/utils/validation.ts"
function_name: "validateEmail"
doc_format: "jsdoc"
```

# Example Output

```yaml
doc_comment: |
  /**
   * 验证邮箱格式是否有效
   *
   * 使用 RFC 5322 标准验证邮箱格式。注意此方法只验证格式，
   * 不验证邮箱是否真实存在。
   *
   * @param {string} email - 要验证的邮箱地址
   * @returns {boolean} 邮箱格式是否有效
   * @throws {TypeError} 当 email 参数不是字符串时抛出
   * @example
   * validateEmail('user@example.com'); // true
   * validateEmail('invalid-email'); // false
   */

param_docs:
  - name: "email"
    type: "string"
    required: true
    description: "要验证的邮箱地址"

return_doc: |
  @returns {boolean} 邮箱格式是否有效

example_usage:
  - "validateEmail('user@example.com') // true"
  - "validateEmail('') // false"
```

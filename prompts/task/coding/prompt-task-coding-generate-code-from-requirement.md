---
id: prompt-coding-generate-from-requirement
name: Generate Code from Requirement
summary: 将自然语言需求转换为可工作的代码实现
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: generate
tags:
  - code-generation
  - requirement-to-code
  - nlp-to-code
keywords:
  - requirement
  - implementation
  - natural language
  - specification
intent: |
  将用户的自然语言需求转换为符合项目规范的可执行代码。
  适用于需求明确但尚未实现编码的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - requirement_text: string (required) 自然语言描述的功能需求
  - language: string (optional) 期望的编程语言，默认从项目推断
  - framework: string (optional) 使用的框架
  - constraints: string (optional) 任何约束条件或限制
output_requirements:
  - code: string 生成的代码实现
  - explanation: string 代码逻辑说明
  - changelog: string 变更摘要（如涉及修改现有文件）
  - test_suggestions: string (optional) 建议的测试用例
tool_requirements:
  - Read 读取相关项目文件以理解代码风格
  - Write 创建或修改代码文件
  - Glob/Search 查找相关模块和依赖
preconditions: |
  - 需求描述应当清晰、具体
  - 建议提供上下文信息（项目类型、使用的框架等）
anti_patterns: |
  - 不要在需求模糊时直接开始编码
  - 不要忽略项目现有的代码风格和约定
  - 不要生成包含硬编码凭据或不安全实现的代码
failure_modes:
  - 需求歧义: 要求用户提供更多细节或示例
  - 依赖缺失: 明确指出需要哪些外部依赖
  - 上下文不足: 请求查看相关代码文件以理解项目结构
self_check: |
  - [ ] 代码是否覆盖了需求中的所有功能点？
  - [ ] 代码风格是否与项目现有代码一致？
  - [ ] 是否处理了边界条件和错误情况？
  - [ ] 是否有潜在的安全风险？
  - [ ] 是否需要新增依赖？
related_skills:
  - skill-repo-analysis
  - skill-tool-use
related_workflows:
  - workflow-repo-reading-to-change
  - workflow-implementation
related_prompts:
  - prompt-coding-implement-from-spec
  - prompt-coding-improve-readability
  - prompt-debugging-fix-logic
---

# Context

在软件开发中，将自然语言需求转换为可工作的代码是核心任务之一。这个 prompt 帮助 AI 在收到清晰需求后，生成符合项目规范的代码实现。生成代码时必须考虑现有项目风格、最小改动原则、错误处理和可维护性。

# Prompt Body

你是一个高级软件工程师。用户的输入是一个自然语言描述的功能需求。请基于以下信息生成代码：

## 输入信息

```
需求描述：{requirement_text}
期望语言：{language}
使用框架：{framework}
约束条件：{constraints}
```

## 工作流程

1。 **理解需求**：先用自己的话复述需求，确认理解正确
2。 **分析上下文**：如果有项目上下文，先读取相关文件了解：
   — 项目的代码风格和命名约定
   — 相关的现有实现和模块
   — 使用的框架和依赖
3。 **设计方案**：确定代码结构和实现方式
4。 **生成代码**：编写符合项目规范的代码
5。 **自检**：验证代码是否满足需求

## 输出要求

生成的内容必须包含以下部分：

### 1。 代码实现
```language
{语言}
{代码内容}
```

### 2。 变更摘要
说明这个改动涉及哪些文件的新增或修改。

### 3。 依赖说明
如果需要新的依赖，明确列出。

### 4。 测试建议
建议至少 3 个测试用例来验证这个功能。

### 5。 潜在问题
列出实现中可能的风险或需要用户确认的点。

## 约束条件

— 代码必须符合 {language} 的最佳实践
— 如果没有指定语言，从项目上下文推断
— 必须考虑现有代码风格，如无特殊情况不要引入新的风格模式
— 错误处理是必须的，不能假设所有输入都是合法的
— 不能硬编码敏感信息（密钥、密码、连接字符串等）
— 生成的代码应该是可以直接编译/运行或集成到现有项目中的

# Variables

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `{requirement_text}` | 自然语言需求描述 | "实现一个用户登录功能，包含用户名密码验证，登录失败3次后锁定账户15分钟" |
| `{language}` | 期望的编程语言 | "Python"， "TypeScript"， "Java" |
| `{framework}` | 使用的框架 | "React"， "Django"， "Spring Boot" |
| `{constraints}` | 约束条件 | "不能使用第三方认证库"， "必须支持多租户" |

# Usage Notes

### 何时使用

— 用户描述了一个功能需求，希望直接得到代码实现
— 需要快速生成代码原型，然后进行修改
— 在设计评审后，需要将设计方案转化为代码

### 使用技巧

1。 **提供具体需求**：越具体的需求，生成的代码质量越高
2。 **给出上下文**：可以描述项目的技术栈、架构风格
3。 **说明约束**：如果有技术约束或业务规则，提前说明
4。 **查看相关代码**：使用前先了解项目结构和风格，生成更匹配的代码

### 配合使用

— 使用 `prompt-repo-analysis-identify-tech-stack` 了解项目技术栈
— 使用 `prompt-tool-use-search-function-calls` 查找相关现有实现
— 生成后使用 `prompt-code-review-quality` 进行质量审查

# Example Input

```
需求描述：实现一个缓存管理器，支持设置过期时间，内存使用超过阈值时自动清理最久未使用的条目
期望语言：TypeScript
使用框架：Node。js
约束条件：必须支持异步操作，线程安全
```

# Example Output

### 1。 代码实现

```typescript
interface CacheItem<T> {
  value: T;
  expireAt: number | null;
  lastAccessed: number;
}

interface CacheOptions {
  maxSize: number;
  defaultTTL?: number;
}

class CacheManager<T> {
  private cache: Map<string, CacheItem<T>>;
  private maxSize: number;
  private defaultTTL: number;

  constructor(options: CacheOptions) {
    this.cache = new Map();
    this.maxSize = options.maxSize;
    this.defaultTTL = options.defaultTTL || 3600000;
  }

  set(key: string, value: T, ttl?: number): void {
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      value,
      expireAt: ttl ? Date.now() + ttl : Date.now() + this.defaultTTL,
      lastAccessed: Date.now()
    });
  }

  async get(key: string): Promise<T | undefined> {
    const item = this.cache.get(key);

    if (!item) {
      return undefined;
    }

    if (item.expireAt && Date.now() > item.expireAt) {
      this.cache.delete(key);
      return undefined;
    }

    item.lastAccessed = Date.now();
    return item.value;
  }

  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestTime) {
        oldestTime = item.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export { CacheManager, CacheOptions, CacheItem };
```

### 2。 变更摘要

— 新增文件：`src/utils/cache-manager.ts`
— 导出类型：`CacheManager`， `CacheOptions`， `CacheItem`

### 3。 依赖说明

无需新增外部依赖，使用原生 Map 和 Promise。

### 4。 测试建议

```typescript
// 1。 基本存取
const cache = new CacheManager<string>({ maxSize: 3 });
await cache.set('key1', 'value1');
assert(await cache.get('key1') === 'value1');

// 2。 LRU 淘汰
const cache2 = new CacheManager<number>({ maxSize: 2 });
await cache2.set('a', 1);
await cache2.set('b', 2);
await cache2。set('c'， 3)； // 应淘汰 'a'
assert(await cache2.get('a') === undefined);
assert(await cache2.get('c') === 3);

// 3。 过期淘汰
const cache3 = new CacheManager<number>({ maxSize: 10, defaultTTL: 100 });
await cache3.set('x', 1);
await new Promise(r => setTimeout(r, 150));
assert(await cache3.get('x') === undefined);
```

### 5。 潜在问题

— 当前实现不是线程安全的。如果需要在多线程环境使用，需要添加锁机制
- 内存阈值检测在 set 时进行，如果有大量数据一次性写入，可能导致多次淘汰
---
id: prompt-task-refactoring-extract-reusable-module-v1
name: Extract Reusable Module
summary: 从现有代码中提取可复用的模块、库或工具函数
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - extraction
  - reusability
  - module-design
keywords:
  - 提取复用模块
  - 模块化
  - 抽象
  - 复用
intent: |
  指导 AI 从现有代码中识别和提取可复用的模块。
  强调复用的价值，但也提醒不要过度抽象。
  核心原则：提取要基于实际复用场景，不是为了抽象而抽象。
applicable_models:
  - "*"
input_requirements:
  - source_code: string 源代码位置
  - usage_patterns: array 预期使用场景
  - target_module_name: string 目标模块名
output_requirements:
  - reuse_analysis: object 复用分析
  - module_design: object 模块设计
  - extraction_plan: array 提取计划
  - refactored_code: object 重构后的代码
tool_requirements:
  - Read tool (读取源代码)
  - Grep tool (分析使用模式)
  - Glob tool (查找相似代码)
preconditions:
  - 有代码需要提取为复用模块
anti_patterns:
  - 过度抽象
  - 过早抽象
  - 抽象层级混乱
failure_modes:
  - 提取不足：分析所有可能的复用场景
  - 过度提取：基于实际需要而非假设
  - 接口设计不当：充分考虑使用场景
self_check: |
  提取前自检：
  □ 是否分析了复用场景？
  □ 是否评估了复用频率？
  □ 是否设计了合理的接口？
  □ 是否考虑了依赖关系？
related_skills:
  - skill-testing
  - skill-code-review
  - skill-architecture
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-refactor-code-without-changing-behavior
  - prompt-task-refactoring-improve-module-boundaries
---

# Context

代码复用是软件工程的基本原则之一。提取可复用模块可以减少重复代码、提高一致性、便于维护。但不恰当的提取会导致过度抽象和增加复杂度。本 prompt 的核心目标是：**指导 AI 基于实际需求和安全分析来提取可复用模块**。

# Prompt Body

## 阶段 1：复用场景分析

### 1.1 现有代码分析

```markdown
## 现有代码分析

### 代码来源
| 项目 | 内容 |
|------|------|
| 文件路径 | [路径] |
| 代码行数 | [数量] |
| 包含函数 | [列表] |

### 代码特征
| 特征 | 分析 |
|------|------|
| 自包含性 | [高/中/低] |
| 外部依赖 | [依赖列表] |
| 副作用 | [描述] |
```

### 1.2 复用场景识别

```markdown
## 复用场景分析

### 场景 1: [场景名称]
**描述**: [描述]
**调用位置**:
| 位置 | 调用方式 | 参数模式 |
|------|----------|----------|
| [位置] | [方式] | [模式] |

### 场景 2: [场景名称]
**描述**: [描述]
**调用位置**:
| 位置 | 调用方式 | 参数模式 |
|------|----------|----------|
| [位置] | [方式] | [模式] |

### 共同点提取
| 特征 | 描述 |
|------|------|
| 输入参数 | [共同参数] |
| 处理逻辑 | [共同逻辑] |
| 输出格式 | [共同格式] |

### 差异点识别
| 特征 | 场景1 | 场景2 | 处理方式 |
|------|-------|-------|----------|
| [差异1] | [值] | [值] | [方式] |
```

## 阶段 2：模块设计

### 2.1 设计原则

```markdown
## 模块设计原则

### SOLID 原则检查
| 原则 | 符合性 | 说明 |
|------|--------|------|
| 单一职责 | [✓/✗] | [说明] |
| 开闭原则 | [✓/✗] | [说明] |
| 里氏替换 | [✓/✗] | [说明] |
| 接口隔离 | [✓/✗] | [说明] |
| 依赖反转 | [✓/✗] | [说明] |

### 设计决策
| 决策点 | 选项 | 选择 | 理由 |
|--------|------|------|------|
| 静态/实例方法 | 两种 | [选择] | [理由] |
| 类/函数 | 两种 | [选择] | [理由] |
| 同步/异步 | 两种 | [选择] | [理由] |
```

### 2.2 接口设计

```markdown
## 接口设计

### 公共接口
```[语言]
[接口定义代码]
```

### 参数设计
| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| [参数] | [类型] | [是/否] | [值] | [说明] |

### 返回值设计
| 类型 | 说明 | 错误处理 |
|------|------|----------|
| [类型] | [说明] | [方式] |

### 副作用说明
- [副作用1]: [说明]
```

### 2.3 依赖设计

```markdown
## 依赖设计

### 内部依赖
| 模块 | 用途 | 提取前 | 提取后 |
|------|------|--------|--------|
| [模块] | [用途] | [原位置] | [内部] |

### 外部依赖
| 依赖 | 版本 | 用途 | 引入方式 |
|------|------|------|----------|
| [依赖] | [版本] | [用途] | [方式] |

### 依赖方向
```
[新模块] ← [调用方1]
[新模块] ← [调用方2]
[新模块] → [依赖模块]
```
```

## 阶段 3：提取计划

### 3.1 提取步骤

```markdown
## 提取步骤

### 步骤 1: 创建新模块
**任务**: 创建 [模块名]
**产出**: [文件路径]
**验证**: 模块可导入

### 步骤 2: 提取代码到新模块
**任务**: 移动代码
**产出**: 新模块包含提取的代码
**验证**: 原有功能正常

### 步骤 3: 更新引用
**任务**: 修改所有调用位置
**产出**: 所有调用使用新模块
**验证**: 功能正常

### 步骤 4: 清理原位置
**任务**: 删除原重复代码
**产出**: 原位置代码已清理
**验证**: 测试通过
```

### 3.2 回归风险

```markdown
## 回归风险评估

### 高风险项
| 位置 | 风险 | 影响 | 缓解措施 |
|------|------|------|----------|
| [位置] | [风险] | [影响] | [措施] |

### 中风险项
| 位置 | 风险 | 影响 | 缓解措施 |
|------|------|------|----------|
| [位置] | [风险] | [影响] | [措施] |
```

## 阶段 4：实施

### 4.1 代码实现

```markdown
## 模块实现

### 文件结构
```
[模块目录]/
├── index.ts          # 导出
├── [模块名].ts       # 主实现
├── [类型].ts         # 类型定义
└── [辅助].ts         # 辅助函数
```

### 核心实现
```[语言]
[代码]
```
```

### 4.2 类型定义

```markdown
## 类型定义

### 接口
```[语言]
[接口定义]
```

### 类型
```[语言]
[类型定义]
```
```

### 4.3 导出设计

```markdown
## 导出设计

### index.ts
```[语言]
[导出代码]
```

### 导出列表
| 名称 | 类型 | 说明 |
|------|------|------|
| [名称] | [类型] | [说明] |
```

## 阶段 5：验证

### 5.1 功能验证

```markdown
## 功能验证

### 原有功能
- [ ] 场景1 功能正常
- [ ] 场景2 功能正常

### 新模块功能
- [ ] 独立使用正常
- [ ] 错误处理正常
```

### 5.2 测试计划

```markdown
## 测试计划

### 单元测试
| 测试项 | 覆盖内容 | 优先级 |
|--------|----------|--------|
| [测试项] | [覆盖] | [P0/P1] |

### 集成测试
| 测试项 | 覆盖场景 | 优先级 |
|--------|----------|--------|
| [测试项] | [场景] | [P0/P1] |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `source_code` | 源代码路径 | `src/utils/format.ts` |
| `usage_patterns` | 预期使用场景 | `["多处日期格式化", "价格格式化"]` |
| `target_module_name` | 目标模块名 | `format-utils` |

# Usage Notes

1. **复用优先**：确实有复用需求才提取
2. **接口设计**：充分考虑使用场景
3. **小步提取**：渐进式提取和验证
4. **保持兼容**：确保现有调用不受影响
5. **文档完整**：为模块编写清晰的文档

# Example Input

```yaml
source_code: "src/utils/date.format.ts"
usage_patterns:
  - "订单列表日期显示"
  - "报表日期显示"
  - "日志时间戳显示"
target_module_name: "date-formatter"
```

# Example Output

```yaml
reuse_analysis:
  duplication_count: 3
  duplication_lines: 45
  common_pattern: "日期对象转字符串"

module_design:
  name: "date-formatter"
  exports:
    - "formatDate"
    - "formatDateTime"
    - "formatTime"
  interface: "date + formatString → string"

extraction_plan:
  - step: "创建新模块"
    file: "src/utils/date-formatter/index.ts"
  - step: "提取格式化逻辑"
    target: "formatDate, formatDateTime, formatTime"
  - step: "更新所有调用"
    locations: ["src/pages/order/", "src/pages/report/"]
  - step: "删除原重复代码"

refactored_code:
  new_module: "src/utils/date-formatter/"
  affected_files: ["3 个文件"]
  lines_saved: 45
```

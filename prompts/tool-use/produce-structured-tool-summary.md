---
id: prompt-tool-use-produce-structured-tool-summary-v1
name: Produce Structured Tool Summary
summary: 将工具执行结果结构化输出，确保信息清晰、易于理解和后续使用
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: output-formatting
tags:
  - tool-use
  - output-format
  - summary
  - structure
keywords:
  - 工具输出
  - 结构化输出
  - 结果整理
  - 摘要生成
intent: |
  将工具执行结果转换为结构化的摘要输出，确保信息清晰、可追溯、易于理解。
  强调工具输出必须结构化，而不是简单的原始文本堆砌。
  核心原则：结构化输出，清晰表达，便于后续使用。
applicable_models:
  - "*"
input_requirements:
  - tool_name: string 工具名称
  - raw_output: string 原始输出
  - context: string 执行上下文
output_requirements:
  - summary: object 结构化摘要
  - key_points: array 关键点
  - structured_output: string 结构化输出
  - metadata: object 元数据
tool_requirements:
  - Any tool output
preconditions:
  - 有工具执行结果需要整理
anti_patterns:
  - 直接输出原始文本
  - 不区分主次信息
  - 输出过于冗长
  - 缺少关键元数据
failure_modes:
  - 输出过长：提取关键信息，摘要呈现
  - 信息碎片化：整合相关联的信息
  - 格式混乱：统一输出格式
  - 缺少上下文：补充执行上下文
self_check: |
  输出前自检：
  □ 是否提取了关键信息？
  □ 是否结构化了输出内容？
  □ 是否补充了必要的上下文？
  □ 是否便于后续使用？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-combine-multiple-results
  - tool-use-use-command-output-safely
related_workflows:
  - workflow-change-verify-report
  - workflow-feature-implementation
related_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-combine-multiple-results
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**将工具执行结果结构化输出**。

当需要整理以下类型的工具输出时，必须遵循此 prompt：
- 文件读取结果
- 搜索结果
- 命令执行结果
- API 调用结果
- 复杂分析结果

# Prompt Body

## 阶段 1：信息提取

### 1.1 原始信息分析

```markdown
## 原始信息分析

### 信息类型识别
| 类型 | 特征 | 提取方式 |
|------|------|----------|
| 文件内容 | 代码/文本 | 提取关键部分 |
| 搜索结果 | 多文件匹配 | 分类整理 |
| 命令输出 | 结构化文本 | 解析格式 |
| API 响应 | JSON/XML | 提取字段 |
| 分析结果 | 混合信息 | 归纳整理 |

### 信息量评估
| 指标 | 值 | 说明 |
|------|-----|------|
| 总行数 | [数量] | 输出总行数 |
| 有效信息行 | [数量] | 包含有效信息的行 |
| 关键信息行 | [数量] | 包含关键信息的行 |
| 冗余信息行 | [数量] | 可以忽略的行 |
```
```

### 1.2 关键信息提取

```markdown
## 关键信息提取

### 必须保留的信息
| # | 信息 | 来源 | 重要性 |
|---|------|------|--------|
| 1 | [信息1] | [位置] | P0 |
| 2 | [信息2] | [位置] | P1 |

### 可以省略的信息
| # | 信息 | 省略原因 |
|---|------|----------|
| 1 | [信息1] | [原因] |

### 需要补充的上下文
- [ ] [上下文1]
- [ ] [上下文2]
```

## 阶段 2：结构化组织

### 2.1 信息分类

```markdown
## 信息分类

### 分类结果
| 类别 | 信息项数 | 说明 |
|------|----------|------|
| 配置信息 | [数量] | 配置文件相关 |
| 代码信息 | [数量] | 源代码相关 |
| 依赖信息 | [数量] | 依赖相关 |
| 文档信息 | [数量] | 文档相关 |
| 其他 | [数量] | 其他类型 |
```

### 2.2 结构化重组

```markdown
## 结构化重组

### 输出结构
```yaml
summary:
  title: "[摘要标题]"
  type: "[类型]"
  key_findings:
    - "[关键发现1]"
    - "[关键发现2]"
  details:
    "[详细信息的结构化呈现]"
  metadata:
    source: "[来源]"
    timestamp: "[时间]"
    context: "[上下文]"
```
```

## 阶段 3：摘要生成

### 3.1 执行摘要

```markdown
## 执行摘要

### 摘要内容
```markdown
[2-3 句话概括工具执行结果]

**关键发现**:
1. [发现1]
2. [发现2]
3. [发现3]
```

### 状态评估
| 评估项 | 结果 |
|--------|------|
| 执行状态 | [成功/失败/部分成功] |
| 信息完整度 | [完整/部分/不足] |
| 可信度 | [高/中/低] |
```
```

### 3.2 详细摘要

```markdown
## 详细摘要

### 主要内容
```markdown
## [主题]

### 1. [小标题]
[内容]

### 2. [小标题]
[内容]
```

### 关键数据
| 指标 | 值 |
|------|-----|
| [指标1] | [值] |
| [指标2] | [值] |
```

## 阶段 4：元数据整理

### 4.1 元数据提取

```markdown
## 元数据

### 来源信息
| 项目 | 值 |
|------|-----|
| 工具名称 | [名称] |
| 执行时间 | [时间] |
| 文件路径 | [路径] |
| 上下文 | [上下文] |

### 处理信息
| 项目 | 值 |
|------|-----|
| 原始行数 | [数量] |
| 处理后行数 | [数量] |
| 压缩比 | [比例] |
```
```

### 4.2 可追溯性

```markdown
## 可追溯性

### 原始数据引用
| # | 位置 | 内容摘要 |
|---|------|----------|
| 1 | [行号/位置] | [摘要] |

### 处理过程
1. [步骤1]
2. [步骤2]
3. [步骤3]
```

## 阶段 5：最终输出

### 5.1 标准格式

```markdown
# 工具执行结果摘要

## 基本信息
| 项目 | 内容 |
|------|------|
| 工具 | [工具名称] |
| 执行时间 | [时间] |
| 上下文 | [上下文] |

## 执行摘要
[2-3 句话概括]

## 关键发现
1. [发现1]
2. [发现2]
3. [发现3]

## 详细信息
[结构化的详细内容]

## 元数据
```yaml
[元数据内容]
```

## 可追溯性
[原始数据位置和引用]
```
```

### 5.2 简化格式

```markdown
## 工具结果摘要

**工具**: [名称]
**状态**: [状态]
**关键发现**:
- [发现1]
- [发现2]
**详细**: [详细信息的链接或位置]
```

## 自检清单

- [ ] 是否提取了关键信息？
- [ ] 是否结构化了输出内容？
- [ ] 是否补充了必要的上下文？
- [ ] 是否包含了元数据？
- [ ] 是否便于后续使用？
- [ ] 是否保持了可追溯性？

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `tool_name` | 工具名称 | `Read tool` |
| `raw_output` | 原始输出 | (实际输出) |
| `context` | 执行上下文 | `分析用户认证模块` |

# Usage Notes

1. **结构化**：输出必须有清晰的结构
2. **分层**：区分主次信息，层次分明
3. **可追溯**：保留对原始数据的引用
4. **简洁**：提取关键，避免冗余
5. **可用**：输出要便于后续使用

# Example Input

```yaml
tool_name: "Read tool"
raw_output: |
  // user.service.ts
  import { Injectable } from '@nestjs/common';
  import { UserRepository } from './user.repository';
  import { CreateUserDto } from './dto/create-user.dto';

  @Injectable()
  export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);
    }

    async findAll() {
      return this.userRepository.find();
    }
  }
context: "分析用户服务模块"
```

# Example Output

```yaml
summary:
  title: "用户服务模块分析"
  type: "file_content"
  key_findings:
    - "UserService 使用 NestJS @Injectable 装饰器"
    - "依赖 UserRepository 进行数据操作"
    - "提供 create 和 findAll 两个方法"
    - "使用 DTO 模式处理创建用户请求"
  details:
    class_name: "UserService"
    decorators:
      - "@Injectable()"
    dependencies:
      - name: "UserRepository"
        type: "constructor injection"
    methods:
      - name: "create"
        params: "CreateUserDto"
        returns: "Promise<User>"
      - name: "findAll"
        params: "none"
        returns: "Promise<User[]>"
    imports:
      - "@nestjs/common"
      - "./user.repository"
      - "./dto/create-user.dto"
  metadata:
    source: "src/user/user.service.ts"
    line_count: 15
    language: "TypeScript"
    framework: "NestJS"
    timestamp: "2024-01-15T10:30:00Z"
```

---
id: prompt-task-documentation-for-code-generate-readme-for-code-module-v1
name: Generate README for Code Module
summary: 为代码模块生成 README 文档，包括功能说明、使用方法、API 文档、示例
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: documentation-for-code
tags:
  - documentation
  - README
  - module
  - usage
keywords:
  - README
  - 模块文档
  - 使用说明
  - 快速入门
intent: |
  指导 AI 为代码模块生成完整的 README 文档。
  强调 README 必须面向使用者，清晰、完整、可操作。
  核心原则：好的 README 让用户能快速上手并正确使用模块。
applicable_models:
  - "*"
input_requirements:
  - module_path: string 模块路径
  - module_purpose: string 模块用途
  - target_audience: string 目标读者
output_requirements:
  - readme_structure: object README 结构
  - content_sections: array 内容章节
  - examples: array 示例代码
  - badges: array 徽章
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析导出)
preconditions:
  - 有代码模块需要生成 README
anti_patterns:
  - 内容空洞无物
  - 缺乏实际示例
  - 文档与代码脱节
failure_modes:
  - 结构混乱：按逻辑结构组织
  - 过于冗长：聚焦关键信息
  - 示例缺失：提供完整示例
self_check: |
  生成前自检：
  □ 是否理解了模块的功能和用途？
  □ 是否识别了目标读者？
  □ 是否覆盖了所有关键章节？
  □ 是否提供了实际可用的示例？
related_skills:
  - skill-documentation-for-code
  - skill-repo-analysis
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-documentation-for-code-document-function-or-class-clearly
  - prompt-task-documentation-for-code-generate-api-usage-documentation
---

# Context

README 是模块的门面，是用户了解模块的第一入口。一份好的 README 应该让用户能快速理解模块用途、正确安装使用、并获得足够的示例。本 prompt 的核心目标是：**指导 AI 为代码模块生成完整、清晰、实用的 README 文档**。

# Prompt Body

## 阶段 1：模块分析

### 1.1 模块理解

```markdown
## 模块理解

### 基本信息
| 项目 | 内容 |
|------|------|
| 模块名称 | [名称] |
| 模块路径 | [路径] |
| 模块类型 | [类型] |
| 代码行数 | [数量] |

### 模块用途
```markdown
**核心功能**: [描述]

**解决的问题**:
1. [问题1]
2. [问题2]
3. [问题3]

**适用场景**:
- [场景1]
- [场景2]
- [场景3]
```

### 目标读者
| 读者 | 关注点 | 文档重点 |
|------|--------|----------|
| [读者] | [关注] | [重点] |
```

### 1.2 功能清单

```markdown
## 模块功能清单

### 核心功能
| # | 功能 | 位置 | 导出API |
|---|------|------|---------|
| 1 | [功能] | [位置] | [API] |

### 辅助功能
| # | 功能 | 位置 | 导出API |
|---|------|------|---------|
| 1 | [功能] | [位置] | [API] |

### 配置项
| # | 配置项 | 类型 | 默认值 | 说明 |
|---|--------|------|--------|------|
| 1 | [项] | [类型] | [值] | [说明] |
```

## 阶段 2：README 结构设计

### 2.1 推荐结构

```markdown
## README 结构

### 标准章节顺序
1. 徽章区 (Badges)
2. 一句话简介
3. 功能特性
4. 快速开始
5. 安装说明
6. 基本使用
7. API 文档
8. 配置选项
9. 示例代码
10. 常见问题
11. 更新日志
12. 贡献指南
13. 许可证
```

### 2.2 内容规划

```markdown
## 内容规划

### 各章节内容要点
| 章节 | 必须包含 | 建议包含 | 可选 |
|------|----------|----------|------|
| 一句话简介 | 名称 + 核心价值 | 状态徽章 | - |
| 功能特性 | 核心功能列表 | 截图/GIF | 性能数据 |
| 快速开始 | 3步上手 | 代码片段 | 视频教程 |
| 安装说明 | npm/yarn 安装 | 依赖要求 | 环境要求 |
| API 文档 | 主要 API | 详细参数 | 类型定义 |
```

## 阶段 3：内容编写

### 3.1 徽章区

```markdown
## 徽章区

```markdown
[![npm version](https://img.shields.io/npm/v/[package].svg)](https://www.npmjs.com/package/[package])
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-green.svg)](https://travis-ci.org/[user]/[repo])
[![Coverage](https://img.shields.io/badge/coverage-90%25-green.svg)](https://codecov.io/gh/[user]/[repo])
```
```

### 3.2 功能特性

```markdown
## 功能特性

### 核心特性
| # | 特性 | 说明 |
|---|------|------|
| 1 | [特性] | [说明] |
| 2 | [特性] | [说明] |
| 3 | [特性] | [说明] |

### 差异化卖点
```markdown
**相比同类库的优势**:
- [优势1]: [说明]
- [优势2]: [说明]
- [优势3]: [说明]
```
```

### 3.3 快速开始

```markdown
## 快速开始

### 安装
```bash
npm install [package]
# 或
yarn add [package]
```

### 基本使用
```[语言]
import { [主要API] } from '[package]';

// 初始化
const [instance] = [createInstance]({
  // 配置
});

// 使用
const result = await [instance].[method]([params]);
```
```

### 3.4 API 文档

```markdown
## API 文档

### 主要 API

#### [API名称]
```markdown
**签名**: `[函数签名]`

**参数**:
| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| [参数] | [类型] | [是/否] | [值] | [说明] |

**返回值**: [类型]

**示例**:
```[语言]
[示例代码]
```

---

#### [API名称]
[同上结构]
```
```

## 阶段 4：示例代码

### 4.1 基础示例

```markdown
## 示例代码

### 基础示例
```[语言]
import { [API] } from '[package]';

// 示例 1: [标题]
async function example1() {
  const [result] = await [API]([参数]);
  console.log([结果]);
}
```

### 完整示例
```[语言]
import { [主要API] } from '[package]';

async function completeExample() {
  // 1. 初始化
  const client = new [Client]({
    apiKey: 'your-api-key',
    timeout: 5000,
  });
  
  // 2. 使用
  const result = await client.[method]({
    // 参数
  });
  
  // 3. 处理结果
  console.log(result);
}
```
```

### 4.2 场景示例

```markdown
### 场景 1: [场景标题]
```[语言]
[场景代码]
```

### 场景 2: [场景标题]
```[语言]
[场景代码]
```
```

## 阶段 5：常见问题

### 5.1 FAQ

```markdown
## 常见问题

### Q1: [问题]
**A**: [答案]

### Q2: [问题]
**A**: [答案]

### Q3: [问题]
**A**: [答案]
```

### 5.2 故障排除

```markdown
## 故障排除

### 问题 1: [描述]
**症状**: [症状]
**原因**: [原因]
**解决方案**: [方案]

### 问题 2: [描述]
**症状**: [症状]
**原因**: [原因]
**解决方案**: [方案]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `module_path` | 模块路径 | `src/utils/validation` |
| `module_purpose` | 模块用途 | `"输入验证工具"` |
| `target_audience` | 目标读者 | `"前端开发"` |

# Usage Notes

1. **用户视角**：站在用户角度编写
2. **清晰结构**：使用标题层级和表格
3. **完整示例**：提供实际可运行的示例
4. **持续更新**：确保文档与代码同步
5. **版本标注**：标注版本兼容性

# Example Input

```yaml
module_path: "src/utils/http-client"
module_purpose: "HTTP 请求封装库"
target_audience: "前端开发"
```

# Example Output

```yaml
readme_structure:
  sections:
    - "徽章区"
    - "简介"
    - "特性"
    - "快速开始"
    - "API文档"
    - "示例"
    - "FAQ"
  order: "标准顺序"

content_sections:
  intro: "轻量级 HTTP 客户端，支持拦截器、自动重试、并发控制"
  features:
    - "Promise-based API"
    - "请求/响应拦截器"
    - "自动重试"
    - "并发控制"

examples:
  - name: "基础请求"
    code: "const res = await http.get('/api/users');"
  - name: "带拦截器"
    code: "http.interceptors.request.use(config => {...});"
```

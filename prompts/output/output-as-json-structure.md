---
id: prompt-output-json-structure-v1
name: Output as JSON Structure
summary: 标准化 JSON 结构输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: data-format
tags:
  - output
  - json
  - structure
  - data-format
  - api
keywords:
  - JSON输出
  - 结构化数据
  - API响应
  - 数据格式
intent: |
  用于输出结构化的 JSON 数据，适用于 API 响应、数据存储、配置文件等场景。
  强调字段规范、类型明确、层级清晰。
applicable_models:
  - "*"
required_inputs:
  - data: object 要输出的数据
  - schema: object 数据结构定义（可选）
  - purpose: string 用途说明
outputs:
  - json_output: string 格式化后的 JSON 字符串
structure:
  root_object:
    status: string success/error
    data: object 实际数据
    meta: object 元信息
    error: object 错误信息（仅错误时）
json_schema: |
  {
    "status": "success | error",
    "data": { ... },
    "meta": {
      "timestamp": "ISO8601 时间戳",
      "version": "数据版本",
      "count": "数据条数（可选）"
    },
    "error": {
      "code": "错误码",
      "message": "错误信息"
    }
  }
output_format: |
  ```json
  {
    "status": "success",
    "data": {
      // 实际数据
    },
    "meta": {
      "timestamp": "2026-03-19T12:00:00Z",
      "version": "1.0"
    }
  }
  ```

usage: |
  当需要输出结构化数据供程序读取时使用此格式。
  适用于 API 设计、配置文件、数据导出、模块间数据交换等场景。

example_input: |
  需要输出用户信息：
  - id: 12345
  - name: 张三
  - email: zhang@example.com
  - role: admin

example_output: |
  ```json
  {
    "status": "success",
    "data": {
      "id": 12345,
      "name": "张三",
      "email": "zhang@example.com",
      "role": "admin"
    },
    "meta": {
      "timestamp": "2026-03-19T12:00:00Z",
      "version": "1.0"
    }
  }
  ```

anti_patterns: |
  - 不要输出纯 JSON 而不加 status/meta 包装，除非明确只需要裸数据
  - 不要混用字段命名风格（camelCase vs snake_case）
  - 不要省略必要的引号，JSON 键必须用双引号
  - 不要在字符串里直接放特殊字符而不转义
  - 不要输出 undefined，JSON 没有这个值，用 null

failure_modes: |
  - **字段缺失**：必需字段没有提供 → 明确标注哪些字段是必需的（required）
  - **类型错误**：字符串写成数字 → 检查每个字段的类型
  - **格式错误**：JSON 不合法 → 用在线工具验证或让 AI 修复
  - **层级过深**：嵌套超过 5 层 → 考虑拆分成扁平结构或用引用

self_check: |
  - [ ] JSON 格式是否合法？（键有双引号、无尾逗号）
  - [ ] 字段命名风格是否统一？
  - [ ] 必需字段是否都已包含？
  - [ ] 值的类型是否正确？
  - [ ] 是否有适当的层级结构（不过深也不过平）？
  - [ ] 是否包含 meta 信息（时间戳、版本等）？
  - [ ] 特殊字符是否已正确转义？

related_prompts:
  - prompt-output-yaml-config
  - prompt-output-markdown-report
  - prompt-tool-use-combine-multiple-tool-results
---

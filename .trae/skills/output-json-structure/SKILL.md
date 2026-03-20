---
name: "output-json-structure"
description: "将输出格式化为标准化 JSON 结构。适用于 API 响应、数据存储、配置文件等场景。Invoke when user needs structured JSON output."
---

# Output as JSON Structure

将数据输出为标准化的 JSON 结构格式。

## When to Use

- 需要 API 响应格式
- 输出数据结构化
- 配置文件生成
- 数据存储格式

## Output Structure

```json
{
  "status": "success/error",
  "data": {},
  "meta": {},
  "error": {}
}
```

## Related Prompts

- `output-as-yaml-config` - YAML 格式输出
- `output-as-json-structure` - JSON 格式输出
- `output-as-markdown-report` - 报告格式输出

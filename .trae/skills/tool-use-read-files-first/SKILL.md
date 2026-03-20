---
name: "tool-use-read-files-first"
description: "先读取文件再回答。确保在回答问题或修改代码前先阅读相关文件。Invoke when need to read files before answering."
---

# Read Files Before Answering

在回答问题或修改代码前先阅读相关文件。

## When to Use

- 回答关于代码的问题前
- 修改代码前了解上下文
- 需要理解项目结构
- 不确定文件内容时

## Tool Usage Principles

1. **先读后答** - 始终先读取相关文件
2. **理解上下文** - 了解代码的调用关系
3. **验证假设** - 通过阅读确认自己的理解

## Related Prompts

- `tool-use-analyze-folder-then-plan` - 分析文件夹后计划
- `tool-use-search-before-concluding` - 下结论前搜索

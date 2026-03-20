---
name: "workflow-prompt-selection-composition"
description: "Prompt 选择与组合工作流，为复杂任务选择和组合多个 Prompts。Invoke when a complex task requires multiple prompts to be composed."
---

# Prompt Selection and Composition Workflow

为复杂任务选择和组合多个 Prompts 的工作流。

## When to Use

- 复杂任务需要多步骤
- 不确定使用哪个 Prompt
- 需要组合多个 Prompts
- 自定义工作流程

## Workflow Steps

1. **分析任务目标** - 理解最终目标
2. **识别子任务** - 分解为可执行的步骤
3. **选择 Prompts** - 为每个子任务匹配合适的 Prompt
4. **定义执行顺序** - 确定依赖关系和顺序
5. **组合执行** - 按顺序调用 Prompts

## Related Prompts

- `prompt-routing-identify-task-type` - 任务类型识别
- `prompt-routing-select-relevant` - 选择相关 Prompts
- `prompt-routing-compose` - 组合多个 Prompts

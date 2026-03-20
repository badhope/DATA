---
name: "workflow-bug-investigation"
description: "系统性 Bug 调查工作流，从问题报告到根因定位的完整流程。Invoke when user reports a bug that needs systematic investigation."
---

# Bug Investigation Workflow

系统性调查和定位 Bug 的完整工作流。

## When to Use

- 用户报告了 bug
- 需要系统性调试
- 问题原因不明确
- 需要生成调试计划

## Workflow Steps

1. **收集错误信息** - 整理错误现象、堆栈、复现步骤
2. **分析问题类型** - 分类为运行时异常/逻辑错误/性能问题
3. **生成调试计划** - 制定系统性检查步骤
4. **定位根因** - 通过代码追踪确定问题源头
5. **制定修复策略** - 评估风险并制定修复方案
6. **验证修复** - 确认问题解决且无回归

## Related Prompts

- `prompt-debugging-identify-root-cause` - 根因定位
- `prompt-debugging-generate-debug-plan` - 调试计划生成
- `prompt-debugging-fix-bug-safely` - 安全修复

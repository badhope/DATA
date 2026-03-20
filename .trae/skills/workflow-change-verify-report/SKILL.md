---
name: "workflow-change-verify-report"
description: "变更验证与报告工作流，确保修改正确并记录结果。Invoke when changes need to be verified and documented."
---

# Change Verify and Report Workflow

变更验证与报告的完整工作流。

## When to Use

- 代码变更后需要验证
- 需要记录变更结果
- 提交前检查
- 回归测试

## Workflow Steps

1. **验证变更** - 检查修改正确性
2. **执行测试** - 运行相关测试用例
3. **检查副作用** - 确认无回归问题
4. **生成报告** - 记录变更和验证结果

## Related Prompts

- `prompt-debugging-verify-fix-after-change` - 验证修复
- `prompt-debugging-detect-regression-risk` - 回归检测

---
id: prompt-coding-add-feature-without-breaking
name: Add Feature Without Breaking Existing Behavior
summary: 添加新功能同时保证不破坏现有行为
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: extend
tags:
  - feature
  - extension
  - backward-compatibility
  - safe
keywords:
  - add
  - feature
  - extend
  - compatible
  - safe
intent: |
  在不破坏现有功能的前提下添加新功能。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - existing_code: string (required) 现有代码
  - new_feature: string (required) 新功能描述
  - compatibility_requirements: string (optional) 兼容性要求
output_requirements:
  - extended_code: string 扩展后的代码
  - change_summary: string 变更摘要
  - backward_compatibility: string 兼容性说明
  - regression_risks: string[] 回归风险点
  - test_plan: string[] 测试计划
tool_requirements:
  - Read 读取完整文件和相关测试
  - Write 修改或新增文件
preconditions: |
  - 需要完整了解现有代码和测试
  - 需要了解项目的扩展模式
anti_patterns: |
  - 不要改变现有函数的签名或行为
  - 不要删除或修改现有测试
  - 不要引入不兼容的变更
failure_modes:
  - 不兼容变更: 指出冲突并提供兼容方案
  - 影响范围不清: 详细分析影响
  - 测试缺失: 提供完整的测试计划
self_check: |
  - [ ] 现有 API 签名是否保持不变？
  - [ ] 现有行为是否完全保留？
  - [ ] 是否有向后兼容的接口？
  - [ ] 是否添加了足够的测试？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-change-verify
  - workflow-implementation
related_prompts:
  - prompt-coding-modify-with-minimal-change
  - prompt-coding-patch-for-scenario
  - prompt-testing-write-unit
---

# Context

添加新功能时最重要的是不破坏现有功能。这个 prompt 帮助 AI 以安全、向后兼容的方式扩展代码，确保现有功能不受影响。

# Prompt Body

你是一个软件工程师。用户的输入是一段现有代码和一个新功能需求。请在不破坏现有行为的前提下添加新功能。

## 输入信息

```
现有代码：
{existing_code}

新功能需求：
{new_feature}

兼容性要求：
{compatibility_requirements}
```

## 工作流程

1。 **理解现有代码**：分析现有代码的结构和行为
2。 **确定扩展点**：找到最佳的扩展位置
3。 **设计新功能**：设计不影响现有功能的实现
4。 **检查兼容性**：确保不改变现有 API
5。 **添加测试**：为新功能和回归测试添加用例
6。 **验证现有功能**：确保现有测试仍然通过

## 向后兼容检查

— [ ] API 签名是否完全不变？
— [ ] 默认行为是否保持不变？
— [ ] 现有参数是否仍然有效？
— [ ] 返回值格式是否兼容？
— [ ] 错误码是否保持一致？

## 输出要求

### 1。 扩展设计
```
扩展点：……
新增 API：……
兼容性保证：……
```

### 2。 完整代码
```language
{语言}
{扩展后的完整代码}
```

### 3。 变更摘要
```
新增：
— {新文件/新方法}

修改：
— {修改的文件}
```

### 4。 回归风险评估
| 风险点 | 可能性 | 影响 | 缓解措施 |
|--------|--------|------|---------|
| ... | ... | ... | ... |

### 5。 测试计划
```
现有功能回归测试：……
新功能测试：……
边界条件测试：……
```

## 约束条件

— 绝对不能改变现有 API 的签名
— 绝对不能修改现有功能的默认行为
— 新功能应当是可选的，不影响现有调用
— 必须添加足够的回归测试
- 如果有不兼容的变更，必须明确说明
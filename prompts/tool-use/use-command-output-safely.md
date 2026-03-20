---
id: prompt-tool-use-use-command-output-safely-v1
name: Use Command Output Safely
summary: 安全地分析命令输出，识别关键信息、错误信息和异常，避免忽略重要输出
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: output-analysis
tags:
  - tool-use
  - command-output
  - error-analysis
  - output-parsing
keywords:
  - 命令输出
  - 输出分析
  - 错误识别
  - 安全分析
intent: |
  安全地分析和解释命令输出，确保正确理解输出的含义。
  强调不忽略错误信息，不误解输出格式，不过度解读正常输出。
  核心原则：输出是证据，错误是关键，安全解读是责任。
applicable_models:
  - "*"
input_requirements:
  - command: string 执行的命令
  - raw_output: string 命令的原始输出
  - expected_behavior: string (可选) 期望的行为
output_requirements:
  - output_analysis: object 输出分析结果
  - key_findings: array 关键发现
  - errors_warnings: array 错误和警告
  - conclusion: string 基于输出的结论
  - confidence: string 分析置信度
tool_requirements:
  - Command execution tool
  - Read tool (用于查看相关文件)
preconditions:
  - 已执行某个命令并获得输出
anti_patterns:
  - 只看成功输出，忽略错误信息
  - 把 stderr 输出当作 stdout 处理
  - 把格式化输出当作原始数据
  - 过度解读正常输出
failure_modes:
  - 输出过长：聚焦关键信息，分段分析
  - 输出复杂：识别输出格式和关键字段
  - 错误信息不明确：提供上下文分析
  - 多命令输出混淆：分离各命令的输出
self_check: |
  分析前自检：
  □ 是否区分了 stdout 和 stderr？
  □ 是否识别了所有错误和警告？
  □ 是否理解了输出的格式？
  □ 结论是否与输出内容一致？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-search-before-concluding
  - tool-use-combine-multiple-results
related_workflows:
  - workflow-bug-investigation
  - workflow-tool-assisted-debug
related_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-search-before-concluding
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**安全地分析和解读命令输出**。

当需要分析以下类型的命令输出时，必须遵循此 prompt：
- 构建命令输出（npm build, docker build, etc）
- 测试命令输出（npm test, pytest, etc）
- 部署命令输出
- 系统命令输出（ps, top, df, etc）
- API 请求输出

# Prompt Body

## 阶段 1：输出分类和分离

### 1.1 输出类型识别

```markdown
## 输出分类

### 输出类型判断
| 类型 | 特征 | 处理方式 |
|------|------|----------|
| stdout | 标准输出，正常信息 | 直接分析 |
| stderr | 错误输出，红色文字 | 重点关注 |
| 混合输出 | 同时包含两者 | 分离后分析 |

### 分离策略
```bash
# 分离 stdout 和 stderr
command > stdout.txt 2> stderr.txt

# 只看 stderr
command 2>&1 1>/dev/null | grep -i error

# 只看退出码
command; echo "Exit code: $?"
```
```

### 1.2 输出格式识别

```markdown
## 输出格式分析

### 常见格式
| 格式 | 特征 | 示例 |
|------|------|------|
| JSON | {"key": "value"} | API 响应 |
| XML | <tag>content</tag> | SOAP 响应 |
| 表格 | 列对齐，有分隔符 | ls -l, ps |
| 纯文本 | 无固定格式 | echo, print |
| 日志 | 时间戳+级别+消息 | 应用日志 |
| 堆栈 | 多行，异常信息 | Error stack |

### 本输出格式识别
**识别结果**: [格式类型]
**依据**: [识别依据]
```

## 阶段 2：错误和警告识别

### 2.1 错误信息提取

```markdown
## 错误和警告提取

### 错误识别
```markdown
## 识别的错误

| # | 错误信息 | 严重度 | 来源位置 |
|---|----------|--------|----------|
| 1 | [错误1] | 严重/警告 | [位置] |
| 2 | [错误2] | 严重/警告 | [位置] |
```

### 警告识别
```markdown
## 识别的警告

| # | 警告信息 | 影响 | 来源位置 |
|---|----------|------|----------|
| 1 | [警告1] | [影响] | [位置] |
| 2 | [警告2] | [影响] | [位置] |
```

### 退出码分析
```markdown
## 退出码分析

**退出码**: [代码]
**含义**: [解释]
**是否正常**: [是/否]
```
```

### 2.2 错误上下文分析

```markdown
## 错误上下文分析

### 错误 1: [错误摘要]
**完整错误**:
```
[错误全文]
```

**上下文**:
- 命令: [执行的命令]
- 工作目录: [目录]
- 时间: [时间]

**可能原因**:
1. [原因1]
2. [原因2]

**建议的进一步分析**:
- [分析步骤1]
- [分析步骤2]
```

## 阶段 3：关键信息提取

### 3.1 成功信息分析

```markdown
## 成功信息分析

### 关键成功指标
| 指标 | 值 | 说明 |
|------|-----|------|
| [指标1] | [值] | [说明] |
| [指标2] | [值] | [说明] |

### 输出摘要
```markdown
[2-3 句话总结命令的主要输出内容]
```
```

### 3.2 数据提取

```markdown
## 关键数据提取

### 提取的数据
| 字段 | 值 | 格式 |
|------|-----|------|
| [字段1] | [值] | [格式] |
| [字段2] | [值] | [格式] |

### 数据验证
- [ ] 数据格式是否符合预期？
- [ ] 数据值是否在合理范围内？
- [ ] 数据是否与上下文一致？
```

## 阶段 4：综合分析和结论

### 4.1 综合分析

```markdown
## 综合分析

### 整体状态评估
**状态**: [成功/部分成功/失败]

### 分析摘要
```markdown
[分析的主要发现]
```

### 输出可信度
| 因素 | 评估 |
|------|------|
| 输出完整性 | [1-5] |
| 错误处理 | [1-5] |
| 数据一致性 | [1-5] |
| **整体可信度** | **高/中/低** |
```
```

### 4.2 结论和后续建议

```markdown
## 结论

### 基于输出的结论
[明确的结论]

### 置信度
**置信度**: [高/中/低]

**依据**:
- [依据1]
- [依据2]

### 后续建议
1. [建议1]
2. [建议2]

### 需要进一步验证
- [需要验证的点]
```

## 阶段 5：输出报告生成

```markdown
## 输出分析报告

### 命令信息
| 项目 | 内容 |
|------|------|
| 命令 | [执行的命令] |
| 退出码 | [码] |
| 执行时间 | [时间] |
| 工作目录 | [目录] |

### 输出分类
| 类型 | 行数 | 占比 |
|------|------|------|
| 正常输出 | [数量] | [百分比] |
| 错误输出 | [数量] | [百分比] |
| 警告 | [数量] | [百分比] |

### 关键发现
1. [发现1]
2. [发现2]

### 错误摘要
```yaml
errors:
  - message: "[错误信息]"
    severity: "[严重度]"
    line: "[行号]"
  warnings:
    - message: "[警告信息]"
      impact: "[影响]"
      line: "[行号]"
```

### 结论
[结论]

### 后续行动
1. [行动1]
2. [行动2]

## 自检清单
- [ ] 是否分离了 stdout 和 stderr？
- [ ] 是否识别了所有错误和警告？
- [ ] 是否正确理解了输出格式？
- [ ] 结论是否与输出一致？
- [ ] 是否避免了过度解读？
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `command` | 执行的命令 | `npm run build` |
| `raw_output` | 命令输出 | (实际输出内容) |
| `expected_behavior` | 期望行为 | `构建成功，无错误` |

# Usage Notes

1. **分离输出**：区分 stdout 和 stderr
2. **错误优先**：先关注错误和警告
3. **格式理解**：理解输出格式再解读
4. **上下文**：考虑命令和环境的上下文
5. **保守解读**：不确定时保守解读

# Example Input

```yaml
command: "npm test"
raw_output: |
  PASS  tests/unit/user.test.js
  PASS  tests/unit/order.test.js
  FAIL  tests/unit/payment.test.js
  Error: expect(received).toBe(expected)
  
  Expected: 200
  Received: 500
expected_behavior: "所有测试通过"
```

# Example Output

```yaml
output_analysis:
  total_lines: 45
  stdout_lines: 42
  stderr_lines: 3
  exit_code: 1

errors_warnings:
  - type: "test_failure"
    severity: "high"
    message: "tests/unit/payment.test.js failed"
    test: "PaymentService.processPayment"
    expected: 200
    received: 500
    stack: "Error: expect(received).toBe(expected)"
    line: 23

key_findings:
  - "2/3 测试套件通过"
  - "payment.test.js 中 PaymentService.processPayment 测试失败"
  - "测试期望返回 200，实际返回 500"

conclusion: |
  测试失败，PaymentService.processPayment 在处理支付时返回错误状态码 500。
  需要检查支付服务的错误处理逻辑。

confidence: "high"
```

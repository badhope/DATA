---
id: prompt-debugging-create-minimal-checklist
name: Create Minimal Debugging Checklist
summary: 创建最小化调试清单
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: checklist
tags:
  - checklist
  - minimal
  - systematic
  - verification
keywords:
  - checklist
  - minimal
  - systematic
  - verify
  - check
intent: |
  创建针对特定问题的最小化调试清单。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - problem_type: string (required) 问题类型
  - context: string (required) 问题上下文
  - available_tools: string[] (optional) 可用工具
output_requirements:
  - checklist: string[] 调试清单
  - expected_results: string[] 每项的预期结果
  - interpretation_guide: string 结果解读指南
  - completion_criteria: string 完成标准
tool_requirements:
  - Read 读取相关代码和配置
preconditions: |
  - 问题类型应当明确
  - 上下文应当足够
anti_patterns: |
  - 不要创建过于详细的清单
  - 不要包含无关的检查项
  - 不要忽略重要的验证点
failure_modes: |
  - 问题类型不清: 询问更多细节
  - 清单过长: 聚焦核心检查项
self_check: |
  - [ ] 清单是否足够小？
  - [ ] 是否覆盖关键检查点？
  - [ ] 是否有明确的完成标准？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-generate-debug-plan
  - prompt-debugging-prioritize-debugging-steps
---

# Context

一个好的调试清单应该足够小以保持效率，同时覆盖所有关键检查点。这个 prompt 帮助为特定问题创建最小化的调试清单。

# Prompt Body

你是一个软件工程师。用户的输入是问题信息。请创建最小化的调试清单。

## 输入信息

```
问题类型：{problem_type}
问题上下文：{context}
可用工具：{available_tools}
```

## 清单设计原则

### 1。 最小化原则
— 只包含必要且关键的检查项
— 排除可以通过推理排除的项目
— 避免重复检查

### 2。 系统性原则
— 按逻辑顺序排列
— 前一项为后一项提供信息
— 覆盖完整的检查路径

### 3。 可验证原则
— 每项都有明确的通过/失败标准
— 结果可明确解读
— 不依赖主观判断

## 清单结构

### 基础信息检查
— [ ] 错误消息完整记录
— [ ] 问题复现步骤确认
— [ ] 环境信息记录

### 代码层面检查
— [ ] 相关代码文件存在
— [ ] 语法正确性验证
— [ ] 关键逻辑路径确认

### 配置层面检查
— [ ] 配置文件存在且可读
— [ ] 配置值合理性验证
— [ ] 环境变量设置确认

### 依赖层面检查
— [ ] 依赖项完整
— [ ] 版本兼容性检查
— [ ] 导入路径正确性

### 运行时检查
— [ ] 日志输出检查
— [ ] 资源状态检查
— [ ] 错误传播路径追踪

## 输出要求

### 1。 调试清单

| # | 检查项 | 操作方法 | 预期结果 |
|---|--------|---------|---------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |

### 2。 结果解读

```
如果 [结果]，则 [解读]
如果 [结果]，则 [解读]
```

### 3。 完成标准
```
[调试清单完成的标准]
```

### 4。 何时停止
```
满足以下条件之一时，可以停止清单检查：
— [条件1]
— [条件2]
```

## 约束条件

— 清单应当精简，控制在 7—10 项以内
— 每项应当简单明了，可快速执行
— 必须有明确的预期结果和解读方式

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{problem_type}` | 问题类型 | `api_timeout` |
| `{context}` | 问题上下文 | `用户反馈支付接口偶发超时` |
| `{available_tools}` | 可用工具 | `["Postman", "Redis CLI", "数据库客户端"]` |

# Usage Notes

— 适用于快速系统性排查特定类型问题
— 清单应聚焦目标问题，避免无关检查
— 每项检查应有明确的结果预期
— 完成标准帮助确定何时可以停止

# Example Input

```
问题类型：数据库连接失败
问题上下文：
— 错误消息：Connection refused
— 发生在应用启动时
— 其他服务正常，只有用户服务报错

可用工具：
— MySQL 客户端
— Docker 命令
— Docker 命令
```

# Example Output

```
调试清单

| # | 检查项 | 操作方法 | 预期结果 |
|---|--------|---------|---------|
| 1 | MySQL 服务状态 | docker ps | MySQL 容器运行中 |
| 2 | 端口监听状态 | docker port mysql | 3306 端口映射正确 |
| 3 | 连接配置读取 | 检查 docker—compose。yml | 环境变量正确映射 |
| 4 | 网络连通性 | docker network inspect | 容器在同一网络 |
| 5 | 认证信息 | 检查 MYSQL_ROOT_PASSWORD | 密码与环境变量一致 |
| 6 | 磁盘空间 | df —h | MySQL 数据目录有足够空间 |
| 7 | MySQL 日志 | docker logs mysql | 无启动错误 |

结果解读

如果所有检查通过：
→ 问题可能在应用配置或代码层面

如果第 1—2 项失败：
→ MySQL 服务未正确启动或端口配置错误

如果第 3—5 项失败：
→ Docker Compose 配置问题

如果第 6 项失败：
→ 资源不足问题

完成标准
7 项检查全部通过，或明确找到失败原因

何时停止
— 找到明确的失败原因
— 全部 7 项检查通过但问题仍存在（需升级）
```
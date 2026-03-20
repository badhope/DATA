---
id: prompt-debugging-debug-configuration-issue
name: Debug Configuration Issue
summary: 调试配置问题
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: config
tags:
  - configuration
  - debug
  - config
  - settings
keywords:
  - configuration
  - config
  - debug
  - settings
  - environment
intent: |
  系统性调试配置相关的问题。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - symptom: string (required) 问题现象
  - config_files: string[] (optional) 相关配置文件
  - config_type: string (optional) 配置类型
output_requirements:
  - likely_config_issues: string[] 最可能的配置问题
  - config_hierarchy: string 配置层级
  - resolution_steps: string[] 解决步骤
  - verification: string 验证方法
tool_requirements:
  - Read 读取配置文件
  - Glob 查找配置文件
preconditions: |
  - 问题现象应当清晰
  - 最好知道涉及哪些配置文件
anti_patterns: |
  - 不要假设配置总是正确的
  - 不要忽略配置继承/覆盖关系
  - 不要忽略环境差异
failure_modes: |
  - 配置文件太多: 识别关键配置文件
  - 配置来源不清: 帮助梳理配置层级
self_check: |
  - [ ] 是否检查了所有相关配置？
  - [ ] 是否理解了配置层级？
  - [ ] 是否验证了配置生效？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-debug-environment-problem
---

# Context

配置问题是常见的故障原因，但往往被忽视。这个 prompt 帮助系统性调试配置问题，包括配置文件、环境变量、启动参数等。

# Prompt Body

你是一个软件工程师。用户的输入是问题现象和相关配置信息。请系统性调试配置问题。

## 输入信息

```
问题现象：{symptom}
相关配置文件：{config_files}
配置类型：{config_type}
```

## 配置问题类型

### 1。 配置文件问题
— 配置文件不存在
— 配置文件格式错误
— 配置文件路径错误
— 配置文件未加载

### 2。 配置值问题
— 值类型错误
— 值范围错误
— 值拼写错误
— 缺少必需配置

### 3。 配置继承问题
— 默认值覆盖
— 环境特定配置冲突
— 局部配置与全局配置冲突

### 4。 配置加载问题
— 加载顺序错误
— 环境变量未传递
— 配置未刷新

## 调试步骤

### 1。 收集配置信息
```
当前配置值：[列出]
配置来源：[文件/环境变量/默认值]
配置生效时间：[时机]
```

### 2。 验证配置
```
必需配置：
— [配置项] = [值] ✓/✗

格式验证：
— [配置项] = [值] — [验证结果]
```

### 3。 层级分析
```
全局配置 → 环境配置 → 本地配置 → 运行时覆盖
    ↓            ↓           ↓           ↓
  [值]        [值]        [值]        [值]
```

### 4。 常见配置问题检查清单
— [ ] 配置文件存在且可读
— [ ] 配置格式正确（JSON/YAML/ENV）
— [ ] 必需配置项都存在
— [ ] 配置值类型正确
— [ ] 环境变量正确传递
— [ ] 配置被正确加载

## 输出要求

### 1。 最可能的配置问题
```
1。 [问题1] — 概率：[高/中/低]
2。 [问题2] — 概率：[高/中/低]
```

### 2。 配置层级
```
[显示配置层级和最终生效的值]
```

### 3。 解决步骤
```
1。 [步骤1]
2。 [步骤2]
...
```

### 4。 验证方法
```
如何确认配置问题已解决：
[验证方法和预期结果]
```

## 约束条件

— 系统性检查所有可能的配置来源
— 理解配置的继承和覆盖关系
— 验证配置是否真正生效（不只是文件内容）
— 考虑环境差异

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{symptom}` | 问题现象 | `应用启动时报数据库连接失败` |
| `{config_files}` | 相关配置文件（可选） | `["config/database.yml", ".env"]` |
| `{config_type}` | 配置类型（可选） | `database` |

# Usage Notes

— 适用于配置相关的故障调试
— 配置问题往往在文件层面正确，但未正确加载
— 需要验证配置是否真正生效
— 环境差异是常见的配置问题来源

# Example Input

```
问题现象：
应用在生产环境启动失败，错误信息为"Failed to connect to database"，但本地开发环境正常。

相关配置文件：
- config/database.yml
- docker-compose.yml
- .env

配置类型：数据库
```

# Example Output

```
最可能的配置问题
1。 数据库连接配置 — 概率：高
2。 Docker 网络配置 — 概率：中
3。 环境变量传递 — 概率：中

配置层级
1。 config/database。yml（默认配置）
   username: root
   password: password
   host: localhost
   port: 5432
   database: myapp

2。 。env（环境变量覆盖）
   DATABASE_URL=postgresql://user:pass@prod-db:5432/myapp

3。 docker—compose。yml（容器配置）
   environment:
     - DATABASE_URL=${DATABASE_URL}
   depends_on:
     - postgres

最终生效配置（生产环境）：
host： prod—db (从 DATABASE_URL 解析)
port: 5432
database: myapp

解决步骤
1。 确认 docker—compose。yml 中 DATABASE_URL 是否正确映射
2。 确认 postgres 容器名称是否为 prod—db
3。 检查容器网络配置是否正确
4。 验证 DATABASE_URL 格式是否正确

验证方法
如何确认配置问题已解决：
1。 docker exec —it app—container ping prod—db — 测试网络连通性
2。 docker exec —it app—container printenv DATABASE_URL — 确认环境变量
3。 docker—compose logs postgres — 检查数据库日志
4。 重启应用容器并观察连接状态
```
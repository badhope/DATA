---
id: prompt-debugging-debug-environment-problem
name: Debug Environment Problem
summary: 调试环境相关问题
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: environment
tags:
  - environment
  - debug
  - runtime
  - setup
keywords:
  - environment
  - runtime
  - setup
  - debug
  - platform
intent: |
  系统性调试环境相关的问题。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - symptom: string (required) 问题现象
  - environment_info: string (optional) 环境信息
  - working_in_other_env: boolean (optional) 在其他环境是否正常
output_requirements:
  - likely_issues: string[] 最可能的环境问题
  - environment_checklist: string[] 环境检查清单
  - resolution_steps: string[] 解决步骤
  - environment_comparison: string 环境对比
tool_requirements:
  - Read 读取相关配置
  - RunCommand 执行诊断命令
preconditions: |
  - 问题现象应当清晰
  - 最好知道环境信息
anti_patterns: |
  - 不要假设环境总是配置正确的
  - 不要忽略版本兼容性问题
  - 不要忽视权限问题
failure_modes: |
  - 环境信息不足: 请求更多信息
  - 多个可能原因: 逐一排查
self_check: |
  - [ ] 是否检查了所有环境因素？
  - [ ] 是否对比了不同环境？
  - [ ] 解决方案是否可行？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-debug-configuration-issue
  - prompt-debugging-identify-root-cause
---

# Context

环境问题（操作系统、运行时版本、权限、资源限制等）是常见的故障原因。这个 prompt 帮助系统性调试环境相关问题。

# Prompt Body

你是一个软件工程师和系统管理员。用户的输入是问题现象。请系统性调试环境问题。

## 输入信息

```
问题现象：{symptom}
环境信息：{environment_info}
在其他环境是否正常：{working_in_other_env}
```

## 环境问题类型

### 1。 平台问题
— 操作系统差异
— 文件路径差异（Windows/Linux/macOS）
— 换行符差异
— 大小写敏感性

### 2。 运行时问题
— 语言版本不匹配
— 运行时版本不兼容
— 缺少运行时依赖
— 运行时配置差异

### 3。 权限问题
— 文件/目录权限不足
— 环境变量访问限制
— 网络权限限制
— 临时目录权限

### 4。 资源问题
— 内存不足
— 磁盘空间不足
— 文件描述符限制
— 进程数限制

### 5。 依赖问题
— 系统库缺失
— 系统库版本不匹配
— 编译器缺失或版本不对

## 环境检查清单

### 基础信息
— [ ] 操作系统类型和版本
— [ ] 架构（x86/x64/arm）
— [ ] 主机名

### 运行时环境
— [ ] 语言版本（Python/Node/Java等）
— [ ] 包管理器版本
— [ ] 运行时配置

### 权限和环境变量
— [ ] 当前用户和权限
— [ ] 关键环境变量
— [ ] PATH 配置

### 资源状态
— [ ] 内存使用
— [ ] 磁盘空间
— [ ] 打开的文件数

## 输出要求

### 1。 最可能的环境问题
```
1。 [问题1] — 概率：[高/中/低] — 理由：[说明]
2。 [问题2] — 概率：[高/中/低] — 理由：[说明]
```

### 2。 环境检查结果
| 检查项 | 值 | 状态 |
|--------|---|------|
| ... | ... | ✓/✗ |

### 3。 解决步骤
```
1。 [步骤1]
2。 [步骤2]
...
```

### 4。 环境对比（如果适用）
```
问题环境：[配置]
正常环境：[配置]
差异：[列出差异]
```

## 约束条件

— 系统性检查所有环境因素
— 对比问题环境和正常环境
— 考虑平台和版本的兼容性
— 验证资源充足性

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{symptom}` | 问题现象 | `应用在生产环境启动失败，报权限错误` |
| `{environment_info}` | 环境信息（可选） | `Ubuntu 22.04, Node.js 18, Docker` |
| `{working_in_other_env}` | 在其他环境是否正常 | `本地开发环境正常` |

# Usage Notes

— 适用于跨环境问题（如本地正常但生产异常）
— 系统性检查是关键
— 对比分析是定位环境问题的有效方法
— 资源问题往往被忽视但很常见

# Example Input

```
问题现象：
应用在生产环境启动时报错"Error： EACCES： permission denied， access '/var/log/app。log'"，但本地开发环境正常启动。

环境信息：
— 生产环境：Ubuntu 22。04， Node。js 18。16。0
— 本地环境：macOS 14， Node。js 18。16。0
— 部署方式：Docker Compose

在其他环境是否正常：
本地开发环境正常，只有生产环境有问题
```

# Example Output

```
最可能的环境问题
1。 文件权限问题 — 概率：高 — 理由：错误信息明确指向权限拒绝
2。 Docker 用户配置问题 — 概率：中 — 理由：容器内外用户可能不同
3。 SELinux/AppArmor 限制 — 概率：低 — 理由：Ubuntu 默认不启用

环境检查结果
| 检查项 | 生产环境 | 本地环境 | 状态 |
|--------|---------|---------|------|
| 操作系统 | Ubuntu 22。04 | macOS 14 | ✓ |
| Node。js 版本 | 18。16。0 | 18。16。0 | ✓ |
| 运行用户 | root | 当前用户 | ⚠️ 差异 |
| /var/log 权限 | drwxr—xr—x root | — | ⚠️ |
| Docker 用户 | root | — | ⚠️ |

解决步骤
1。 检查 Docker Compose 中的用户配置
   cat docker-compose.yml | grep -A 5 user

2。 修改日志路径到容器可写目录
   environment:
     - LOG_PATH=/app/logs/app.log
   volumes:
     - ./logs:/app/logs

3。 或在容器内创建所需目录并设置权限
   RUN mkdir -p /var/log/app && chown -R node:node /var/log/app

环境对比
问题环境：容器以 root 用户运行，/var/log 目录权限限制
正常环境：本地开发直接以当前用户运行，无权限限制

差异：
— 运行用户不同（root vs 普通用户）
— 日志目录权限不同
```
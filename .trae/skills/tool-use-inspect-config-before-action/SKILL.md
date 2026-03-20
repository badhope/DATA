---
name: "tool-use-inspect-config-before-action"
description: "先检查配置文件再执行操作。确保在修改或部署前了解当前配置。Invoke when need to inspect config before taking action."
---

# Inspect Config Before Action

先检查配置文件再执行操作。

## When to Use

- 修改配置前
- 部署应用前
- 运行命令前
- 调试问题前

## Process

1. 读取相关配置文件
2. 理解当前配置状态
3. 评估修改影响
4. 执行操作

## Related Prompts

- `tool-use-read-files-first` - 先读取文件
- `tool-use-use-commands-safely` - 安全使用命令

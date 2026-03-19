---
id: prompt-output-yaml-config-v1
name: Output as YAML Config
summary: 标准化 YAML 配置文件输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: config-format
tags:
  - output
  - yaml
  - config
  - configuration
  - settings
keywords:
  - YAML配置
  - 配置文件
  - 设置文件
  - 格式模板
intent: |
  用于输出 YAML 格式的配置文件，适用于项目配置、环境设置、数据序列化等场景。
  强调可读性、层级清晰、注释完善。
applicable_models:
  - "*"
required_inputs:
  - config_data: object 要输出的配置数据
  - config_type: string 配置类型（应用配置/环境配置/部署配置）
  - purpose: string 用途说明
outputs:
  - yaml_output: string 格式化后的 YAML 配置
structure:
  - comment
  - root_keys
  - nested_structures
  - list_items
output_format: |
  ```yaml
  # 配置文件标题
  # 描述：配置文件用途

  # 主要配置区块
  app:
    name: "应用名称"
    version: "1.0.0"
    environment: "development"

  # 数据库配置
  database:
    host: "localhost"
    port: 3306
    name: "myapp_db"

  # 其他配置...
  ```

usage: |
  当需要输出配置文件或设置文件时使用此格式。
  适用于应用配置文件 Docker 配置、CI/CD 配置、数据导入导出等场景。

example_input: |
  需要输出一个 Web 服务的配置：
  - 服务名: my-web-app
  - 端口: 8080
  - 启用调试: true
  - 数据库: PostgreSQL, localhost:5432

example_output: |
  ```yaml
  # Web 服务配置文件
  # 用途：定义 Web 服务的基本配置

  app:
    name: "my-web-app"
    port: 8080
    debug: true

  database:
    type: "postgresql"
    host: "localhost"
    port: 5432

  features:
    auth: true
    cache: false
  ```

anti_patterns: |
  - 不要省略注释，YAML 的主要优势就是可读性
  - 不要混用缩进风格（统一用 2 空格）
  - 不要用 Tab 字符，YAML 不允许
  - 不要省略必要的引号（包含特殊字符的值需要引号）
  - 不要创建过深的嵌套层级（超过 4 层考虑拆分）

failure_modes: |
  - **缩进错误**：空格数不对 → YAML 对缩进敏感，确保一致
  - **制表符**：用了 Tab → YAML 只允许空格，用 2 或 4 空格
  - **特殊字符**：值包含 : 或 # → 用引号包围字符串
  - **类型错误**：字符串写成数字 → 确认类型是否符合预期

self_check: |
  - [ ] 缩进是否一致（统一 2 或 4 空格）？
  - [ ] 是否使用空格而非 Tab？
  - [ ] 字符串值是否在需要时加了引号？
  - [ ] 列表项是否正确使用 - 开头？
  - [ ] 是否有清晰的区块划分和注释？
  - [ ] 嵌套层级是否过深（建议不超过 4 层）？
  - [ ] 是否适合目标使用场景？

related_prompts:
  - prompt-output-json-structure
  - prompt-output-markdown-report
  - prompt-tool-use-inspect-config-then-act
---

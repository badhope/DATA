---
id: prompt-workflow-documentation-generation-v1
name: Documentation Generation Workflow
summary: 文档生成工作流，用于从代码和需求生成完整项目文档
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: documentation
tags:
  - workflow
  - documentation
  - docs
  - generation
  - writing
keywords:
  - 文档生成
  - 文档编写
  - 技术文档
  - 说明文档
intent: |
  用于系统性地生成项目文档，包括 README、API 文档、使用指南等。
  通过分析和整理代码信息，生成清晰、准确的文档内容。
applicable_models:
  - "*"
required_inputs:
  - doc_type: string 文档类型（README/API指南/使用教程/开发文档）
  - scope: string 文档范围（全部/模块/组件）
  - target_audience: string 目标读者（开发者/用户/管理员）
  - existing_docs: array 现有文档（可选）
outputs:
  - document_outline: object 文档大纲
  - content_sections: array 内容章节
  - api_reference: array API 参考（如适用）
  - code_examples: array 代码示例
  - final_document: string 最终文档
steps:
  - id: 1
    name: 理解需求和范围
    action: |
      1. 确定文档类型和目的
      2. 确定目标读者
      3. 确定文档范围和边界
      4. 确定文档风格和格式
      5. 查看现有文档避免重复
    output: 文档需求

  - id: 2
    name: 收集信息
    action: |
      1. 分析项目结构
      2. 读取核心代码文件
      3. 收集配置文件信息
      4. 查看现有的注释和文档
      5. 了解使用示例
    used_prompts:
      - prompt-task-repo-analysis-analyze-repository-structure
    output: 信息收集清单

  - id: 3
    name: 分析代码
    action: |
      1. 识别公共 API 和接口
      2. 分析函数签名和参数
      3. 理解数据结构和类型
      4. 提取代码示例
      5. 识别重要的边界情况
    used_prompts:
      - prompt-task-repo-analysis-summarize-project-architecture
    output: 代码分析结果

  - id: 4
    name: 制定大纲
    action: |
      根据文档类型制定结构：
      **README**:
      - 项目简介
      - 功能特性
      - 快速开始
      - 完整指南
      - API 参考
      - 贡献指南
      - 许可证

      **API 文档**:
      - 概述
      - 认证
      - 端点列表
      - 请求/响应格式
      - 错误码
      - 示例

      **使用教程**:
      - 入门指南
      - 基础功能
      - 高级功能
      - 最佳实践
      - 故障排除
    output: 文档大纲

  - id: 5
    name: 编写内容
    action: |
      按大纲逐步编写：
      1. 编写每个章节的内容
      2. 使用清晰简洁的语言
      3. 添加代码示例
      4. 添加表格和图表（如需要）
      5. 确保逻辑清晰

      写作原则：
      - 从读者角度出发
      - 提供足够的上下文
      - 使用实际代码示例
      - 避免歧义
    output: 章节内容

  - id: 6
    name: 审核和完善
    action: |
      1. 检查内容的准确性和完整性
      2. 检查格式一致性
      3. 检查代码示例是否可运行
      4. 检查术语是否统一
      5. 添加必要的交叉引用
      6. 优化可读性
    output: 审核后的文档

  - id: 7
    name: 最终格式化
    action: |
      1. 应用项目文档格式规范
      2. 添加目录（如需要）
      3. 添加索引（如需要）
      4. 添加版本信息
      5. 添加最后更新时间
      6. 导出为目标格式
    output: 最终文档

used_skills:
  - writing-article-draft
  - repo-analysis
used_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-summarize-project-architecture
decision_points:
  - |
    **如果信息不完整**：
    - 标记缺失的部分
    - 尝试从代码推断
    - 请求补充信息
    - 标注"待补充"

  - |
    **如果存在冲突信息**：
    - 以代码为准
    - 标注可能的问题
    - 建议验证

  - |
    **如果读者群体不确定**：
    - 提供多层次的文档
    - 基础部分面向所有读者
    - 高级部分标注"进阶"

  - |
    **如果文档过长**：
    - 拆分为多个文档
    - 使用链接关联
    - 提供总览和导航

final_deliverables:
  - 文档大纲
  - 各章节内容
  - 代码示例
  - API 参考（如适用）
  - 最终格式化文档

notes: |
  - 文档应与代码保持同步
  - 优先保证准确性而非完整性
  - 使用读者熟悉的术语
  - 代码示例应可直接使用
  - 保持文档结构清晰易读

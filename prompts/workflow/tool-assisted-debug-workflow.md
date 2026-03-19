---
id: prompt-workflow-tool-assisted-debug-v1
name: Tool Assisted Debug Workflow
summary: 工具辅助调试工作流，强调使用工具读取文件和搜索信息后再进行调试
type: workflow
status: active
version: "1.0.0"
owner: skill-repository
category: workflow
sub_category: debugging
tags:
  - workflow
  - debugging
  - tool-use
  - investigation
  - file-analysis
keywords:
  - 工具调试
  - 文件分析
  - 搜索调试
  - 辅助调试
intent: |
  用于在调试任务中强调工具辅助的重要性。通过先使用工具读取相关文件、
  搜索代码、查看配置，再进行根因分析和修复，避免盲目猜测。
applicable_models:
  - "*"
required_inputs:
  - error_description: string 错误描述
  - error_context: string 错误上下文
  - environment: string 环境信息（可选）
outputs:
  - files_analyzed: array 分析过的文件
  - search_results: array 搜索结果
  - hypotheses: array 可能的根因假设
  - verified_root_cause: object 验证后的根因
  - fix_plan: object 修复计划
  - verification_results: object 验证结果
steps:
  - id: 1
    name: 收集错误信息
    action: |
      1. 记录完整的错误信息
      2. 记录错误堆栈（如果有）
      3. 记录复现步骤
      4. 确定错误类型
      5. 识别相关的代码区域
    output: 错误信息摘要

  - id: 2
    name: 读取相关文件
    action: |
      使用 `read-files-before-answering` 读取关键文件：
      1. 从错误堆栈确定相关文件
      2. 按依赖关系排序读取顺序
      3. 读取核心逻辑文件
      4. 读取配置文件
      5. 读取测试文件（了解预期行为）

      记录每个文件的关键信息：
      - 函数和类的定义
      - 数据流
      - 关键变量
    used_prompts:
      - prompt-tool-use-read-files-before-answering
    output: 文件分析结果

  - id: 3
    name: 搜索代码
    action: |
      使用 `search-before-concluding` 搜索关键信息：
      1. 搜索错误关键词
      2. 搜索相关函数调用
      3. 搜索变量使用
      4. 搜索类似的已知问题
      5. 搜索相关的 Stack Overflow 或文档

      整理搜索结果：
      - 排除不相关结果
      - 标记可能的原因
      - 记录有用的参考
    used_prompts:
      - prompt-tool-use-search-before-concluding
    output: 搜索结果

  - id: 4
    name: 分析配置
    action: |
      使用 `inspect-config-then-act` 检查配置：
      1. 检查环境变量
      2. 检查配置文件
      3. 检查版本兼容性
      4. 检查依赖关系

      确认：
      - 配置是否正确
      - 版本是否兼容
      - 依赖是否完整
    used_prompts:
      - prompt-tool-use-inspect-config-then-act
    output: 配置分析结果

  - id: 5
    name: 生成假设
    action: |
      基于以上分析：
      1. 列出所有可能的根因假设
      2. 评估每个假设的可能性
      3. 设计验证实验
      4. 优先验证最可能的假设
      5. 记录验证过程

      使用 `identify-root-cause` 的方法论
    used_prompts:
      - prompt-task-debugging-identify-root-cause
    output: 根因假设清单

  - id: 6
    name: 验证和修复
    action: |
      验证假设后：
      1. 使用 `fix-bug-safely` 实施修复
      2. 确保最小变更
      3. 添加测试防止回归
    used_prompts:
      - prompt-task-debugging-fix-bug-safely
    output: 修复结果

  - id: 7
    name: 验证修复
    action: |
      使用 `verify-fix-after-change` 验证：
      1. 重新运行原始测试用例
      2. 运行相关测试套件
      3. 检查边界情况
      4. 确认修复完成
    used_prompts:
      - prompt-task-debugging-verify-fix-after-change
    output: 验证报告

used_skills:
  - debugging
used_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-search-before-concluding
  - prompt-tool-use-inspect-config-then-act
  - prompt-task-debugging-identify-root-cause
  - prompt-task-debugging-fix-bug-safely
  - prompt-task-debugging-verify-fix-after-change
decision_points:
  - |
    **如果文件太多无法全部读取**：
    - 优先读取错误堆栈中的文件
    - 按相关性排序
    - 标记未读取但可能相关的文件

  - |
    **如果搜索没有结果**：
    - 尝试更广泛的关键词
    - 搜索相似的错误模式
    - 考虑直接分析代码

  - |
    **如果多个假设都合理**：
    - 按风险高低排序验证
    - 先验证容易验证的
    - 记录所有可能性

  - |
    **如果确认需要修改多个文件**：
    - 评估修改的依赖关系
    - 确定修改顺序
    - 逐一验证每步

final_deliverables:
  - 分析过的文件清单
  - 搜索结果
  - 根因分析
  - 修复计划
  - 修复后的代码
  - 验证报告

notes: |
  - 始终先读取文件再下结论
  - 不要跳过配置检查
  - 保持假设验证的系统性
  - 记录所有发现便于追溯
  - 修复时遵循最小变更原则

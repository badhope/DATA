---
id: prompt-output-step-by-step-plan-v1
name: Output as Step by Step Plan
summary: 标准化分步骤计划格式输出模板
type: output
status: active
version: "1.0.0"
owner: skill-repository
category: output
sub_category: plan
tags:
  - output
  - plan
  - steps
  - roadmap
  - timeline
keywords:
  - 分步计划
  - 执行计划
  - 路线图
  - 时间线
  - 步骤
intent: |
  用于输出结构化的分步骤计划，适用于项目规划、任务分解、执行方案等场景。
  强调步骤清晰、依赖明确、时间估算合理。
applicable_models:
  - "*"
required_inputs:
  - task: string 任务目标
  - constraints: string 约束条件（时间、资源等）
  - priority: string 优先级说明
outputs:
  - plan_output: string 格式化后的分步骤计划
structure:
  - title
  - overview
  - prerequisites
  - steps
  - timeline
  - risks
  - success_criteria
output_format: |
  # [计划标题]

  > **目标**：[具体目标描述]
  > **预计时间**：[总时间估算]
  > **优先级**：[高/中/低]

  ---

  ## 概览
  [简要说明计划的整体思路]

  ## 前置条件
  - [ ] 前置条件 1
  - [ ] 前置条件 2

  ## 执行步骤

  ### 步骤 1：[步骤名称]
  **时间**：~[估算时间]
  **负责人**：[角色或团队]
  **操作**：
  1. [具体操作1]
  2. [具体操作2]

  **完成标准**：[如何判断这步完成]

  ### 步骤 2：[步骤名称]
  ...

  ## 时间线
  ```
  [Week 1] ──→ [Week 2] ──→ [Week 3]
    步骤1        步骤2        步骤3
  ```

  ## 风险与缓解
  | 风险 | 影响 | 缓解措施 |
  |------|------|----------|
  | 风险1 | 高 | 缓解方案 |

  ## 验收标准
  - [ ] 标准1
  - [ ] 标准2

usage: |
  当需要将复杂任务分解为可执行步骤时使用此格式。
  适用于项目执行计划、功能开发计划、迁移计划、问题修复计划等场景。

example_input: |
  任务：迁移单体应用为微服务架构
  约束：不能停机、3个月内完成
  优先级：高

example_output: |
  # 微服务架构迁移计划

  > **目标**：将现有单体应用拆分为微服务架构不停机迁移
  > **预计时间**：12 周
  > **优先级**：高

  ---

  ## 概览
  按照业务边界将系统拆分为用户、订单、支付三个微服务，采用 strangler fig 模式逐步迁移。

  ## 前置条件
  - [ ] 完成现有系统的依赖分析
  - [ ] 搭建微服务基础架构（服务网格、API 网关）
  - [ ] 制定数据迁移策略

  ## 执行步骤

  ### 步骤 1：基础设施搭建
  **时间**：2 周
  **操作**：
  1. 搭建 Kubernetes 集群
  2. 部署 Istio 服务网格
  3. 配置 API 网关

  **完成标准**：基础服务可正常访问

  ### 步骤 2：用户服务拆分
  **时间**：3 周
  **依赖**：步骤 1
  **操作**：
  1. 提取用户模块代码
  2. 独立部署用户服务
  3. 配置服务间通信

  **完成标准**：新用户请求通过微服务处理

  ### 步骤 3：订单和支付服务拆分
  ...

  ## 风险与缓解
  | 风险 | 影响 | 缓解措施 |
  |------|------|----------|
  | 数据一致性 | 高 | 使用分布式事务 |
  | 性能下降 | 中 | 做好压力测试 |

  ## 验收标准
  - [ ] 所有历史数据完整迁移
  - [ ] API 响应时间 < 200ms
  - [ ] 系统可用性 > 99.9%

anti_patterns: |
  - 不要把步骤写得太笼统，每步应该具体到可执行的操作
  - 不要遗漏前置条件，前置条件未完成会导致后续步骤失败
  - 不要忽略风险评估，有风险不可怕，可怕的是没识别到
  - 不要缺少验收标准，不知道什么才算完成
  - 不要时间估算太乐观，留有一定的 buffer

failure_modes: |
  - **步骤不具体**：无法指导执行 → 拆分为更小的可执行操作
  - **遗漏依赖**：步骤间依赖没标注 → 补充步骤间的依赖关系
  - **时间估算不合理**：太乐观或太悲观 → 基于历史数据或专家判断调整

self_check: |
  - [ ] 每步是否具体到可执行的操作？
  - [ ] 是否标注了步骤间的依赖关系？
  - [ ] 是否有合理的时间估算？
  - [ ] 是否识别了主要风险并有缓解措施？
  - [ ] 是否有明确的验收标准？
  - [ ] 是否有清晰的时间线或里程碑？

related_prompts:
  - prompt-output-checklist
  - prompt-output-markdown-report
  - prompt-task-planning-break-down-task-into-subtasks
  - prompt-workflow-feature-implementation
---

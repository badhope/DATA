---
id: prompt-task-repo-analysis-identify-dependencies-and-risk-v1
name: Identify Dependencies and Risk
summary: 分析项目依赖关系，识别潜在风险点，包括循环依赖、过时依赖、安全漏洞依赖等
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - dependencies
  - risk-analysis
  - security
  - maintainability
keywords:
  - 依赖分析
  - 风险识别
  - 循环依赖
  - 安全漏洞
  - 依赖健康度
intent: |
  帮助 AI 分析项目的依赖关系和潜在风险，从而能够：
  - 了解项目的依赖结构和复杂度
  - 识别潜在的维护风险
  - 发现安全问题和技术债务
  - 评估升级影响范围
  - 为重构和迁移提供决策依据
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - analysis_depth: string 分析深度 (quick/full)
  - dependency_file: string 依赖文件路径
output_requirements:
  - dependency_report: object 包含：
    - direct_dependencies: array 直接依赖
    - transitive_dependencies: array 间接依赖
    - dependency_tree: object 依赖树结构
    - risk_indicators: array 风险指标
    - outdated_deps: array 过时依赖
    - security_issues: array 安全问题
    - circular_deps: array 循环依赖
    - maintenance_score: number 维护健康度
tool_requirements:
  - file-reading
  - grep-search
  - command-execution (用于依赖分析工具)
preconditions:
  - 已识别项目使用的语言和包管理器
  - 已找到依赖配置文件
anti_patterns:
  - 不要只列出依赖，要分析依赖关系背后的风险
  - 不要忽略传递依赖（transitive dependencies）的风险
  - 不要遗漏过时依赖的升级风险
failure_modes:
  - 依赖过多：识别核心依赖和边缘依赖
  - 循环依赖：标注循环链并建议解耦方案
  - 安全漏洞：提供漏洞详情和修复优先级
self_check: |
  分析后检查：
  □ 是否完整识别了直接依赖和间接依赖
  □ 是否标注了每个依赖的用途
  □ 是否识别了高风险的依赖
  □ 是否提供了风险缓解建议
related_skills:
  - skill-repo-analysis
  - skill-coding
  - tool-use-inspect-config-then-act
related_workflows:
  - workflow-feature-implementation
  - workflow-new-repo-onboarding
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-find-key-config-files
  - prompt-task-repo-analysis-map-modules-and-responsibilities
---

# Context

你是一个经验丰富的软件架构师，负责分析项目依赖关系并识别潜在风险。这个 Prompt 强调：
1. 深入理解依赖结构和传递依赖
2. 识别技术债务和安全风险
3. 评估维护健康度
4. 提供可执行的改进建议

# Prompt Body

## 阶段 1：依赖结构分析

### 1.1 直接依赖识别

```markdown
## 直接依赖清单

### 按用途分类
1. **核心业务依赖** - 直接实现业务功能的库
2. **框架依赖** - 提供基础框架能力的库
3. **工具依赖** - 开发/构建/测试工具
4. **基础设施依赖** - 日志、监控、存储等

### 依赖元信息
| 依赖名 | 版本 | 用途 | 维护状态 | 健康度 |
|--------|------|------|----------|--------|
| express | ^4.18.0 | Web 框架 | 活跃 | 高 |
| lodash | ^4.17.21 | 工具库 | 活跃 | 高 |
| deprecated-lib | 1.0.0 | [用途] | 停止维护 | 低 |
```

### 1.2 传递依赖分析

```markdown
## 传递依赖分析

### 依赖层级
```
项目
├── express (直接)
│   ├── accepts (间接)
│   ├── content-type (间接)
│   └── ...
├── mongoose (直接)
│   ├── mongodb (间接)
│   └── ...
```

### 依赖冲突检测
- 检查是否存在同一依赖的不同版本
- 识别 npm/yarn 的幽灵依赖问题
```

## 阶段 2：风险识别

### 2.1 过时依赖风险

```markdown
## 过时依赖检测

### 版本老化分析
| 依赖 | 当前版本 | 最新版本 | 更新幅度 | 风险 |
|------|----------|----------|----------|------|
| axios | 0.21.0 | 1.6.0 | 大版本更新 | 中 |
| moment | 2.29.1 | 2.30.0 | 补丁更新 | 低 |

### 过时原因分类
1. **功能冻结** - 长期无更新的稳定依赖
2. **迁移困难** - 升级会导致 breaking changes
3. **被替代** - 有更好的替代方案
4. **被遗弃** - 作者停止维护
```

### 2.2 安全漏洞风险

```markdown
## 安全漏洞分析

### 高危依赖检测
| 依赖 | 漏洞数 | 最高严重度 | 可用修复 |
|------|--------|------------|----------|
| lodash | 1 | 高 | 升级到 4.17.21+ |
| yaml | 2 | 严重 | 升级到 2.0.0+ |

### 漏洞来源追踪
1. **已知漏洞库** - 检查 nsp advisory、CVE 数据库
2. **不活跃维护** - 检查最后一次提交时间
3. **未知依赖** - 未审核的依赖引入的风险
```

### 2.3 循环依赖风险

```markdown
## 循环依赖检测

### 循环依赖链
```
模块 A → 模块 B → 模块 C → 模块 A
```

### 循环依赖的影响
- 难以独立测试
- 启动顺序敏感
- 内存泄漏风险
- 难以拆分为微服务
```

## 阶段 3：维护健康度评估

### 3.1 依赖健康度指标

```markdown
## 依赖健康度矩阵

| 指标 | 权重 | 当前值 | 评分 |
|------|------|--------|------|
| 活跃度 | 25% | 最近 3 个月有更新的依赖比例 | 0-100 |
| 安全性 | 25% | 无已知高危漏洞的依赖比例 | 0-100 |
| 版本新鲜度 | 20% | 使用最新小版本的依赖比例 | 0-100 |
| 维护状态 | 15% | 活跃维护的依赖比例 | 0-100 |
| 依赖数量 | 15% | 依赖数量的合理性 | 0-100 |

### 综合维护评分
- 80-100: 优秀 - 依赖管理良好
- 60-79: 良好 - 有少量改进空间
- 40-59: 一般 - 需要关注和优化
- <40: 较差 - 需要系统性重构
```

### 3.2 依赖复杂度分析

```markdown
## 依赖复杂度指标

### 量化指标
| 指标 | 数值 | 说明 |
|------|------|------|
| 直接依赖数 | 45 | package.json 中的 dependencies |
| 开发依赖数 | 23 | devDependencies |
| 总依赖传递深度 | 12 | 依赖树的最大深度 |
| 唯一依赖总数 | 156 | 去重后的总依赖数 |

### 复杂度评估
- 深度 > 10 层：考虑拆分或使用替代方案
- 唯一依赖 > 200：考虑减少依赖或使用更轻量的替代
```

## 阶段 4：风险缓解建议

### 4.1 优先级分类

```markdown
## 风险处理优先级

### P0 - 必须立即处理
- 已知严重安全漏洞
- 完全停止维护的核心依赖
- 导致构建失败的依赖冲突

### P1 - 短期内处理
- 高危安全漏洞
- 即将停止维护的依赖
- 过时的大版本依赖

### P2 - 规划中处理
- 中危漏洞
- 可升级的过时依赖
- 性能问题依赖

### P3 - 持续优化
- 代码风格工具更新
- 低风险工具库升级
```

### 4.2 升级策略建议

```markdown
## 依赖升级策略

### 安全补丁升级（低风险）
立即执行，影响范围小
```bash
npm audit fix
```

### 小版本升级（中等风险）
测试后执行，可能有行为变化
```bash
npm update <package>@~<version>
```

### 大版本升级（高风险）
需要完整测试，breaking changes
1. 阅读升级指南
2. 评估 breaking changes
3. 制定升级计划
4. 执行升级
5. 全面测试
```

## 阶段 5：生成依赖风险报告

### 5.1 完整报告结构

```markdown
# 依赖分析与风险报告

## 执行摘要
[描述项目依赖的整体健康状况]

## 1. 依赖概览
```yaml
dependency_overview:
  direct_deps: 45
  dev_deps: 23
  total_unique: 156
  max_depth: 12
  health_score: 72  # 良好
```

## 2. 风险清单
```yaml
risks:
  critical:
    - id: "CVE-2023-xxx"
      package: "lodash"
      severity: "CRITICAL"
      description: "原型污染漏洞"
      fix_version: "4.17.21"
  high:
    - package: "axios"
      issue: "版本过旧"
      latest: "1.6.0"
      recommendation: "规划升级"
```

## 3. 过时依赖
```yaml
outdated_dependencies:
  - package: "moment"
    current: "2.29.1"
    latest: "2.30.0"
    reason: "功能冻结，建议迁移到 date-fns"
    migration_effort: "medium"
```

## 4. 循环依赖
```yaml
circular_dependencies:
  - path: "A → B → C → A"
    impact: "测试困难"
    recommendation: "重构接口设计"
```

## 5. 维护建议
```yaml
recommendations:
  immediate:
    - "升级 lodash 到 4.17.21+ 修复安全漏洞"
  short_term:
    - "规划 axios 大版本升级"
    - "评估 moment 迁移到 date-fns"
  long_term:
    - "建立依赖审查机制"
    - "定期更新依赖版本"
```

## 6. 依赖健康度仪表盘
```
健康度: ████████████░░░░░░░ 72/100

安全:  ████████████████░░░ 85/100
活跃:  ██████████████░░░░░ 78/100
新鲜:  ████████████░░░░░░░ 65/100
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `analysis_depth` | 分析深度 | `quick` / `full` |
| `dependency_file` | 依赖文件路径 | `package.json` / `requirements.txt` |
| `package_manager` | 包管理器 | `npm` / `pip` / `maven` |

# Usage Notes

1. **先评估健康度**：快速判断项目依赖的整体状况
2. **优先处理安全**：已知漏洞必须优先处理
3. **考虑升级成本**：权衡升级收益和迁移成本
4. **跟踪传递依赖**：直接依赖的安全不等于整体安全

# Example Input

```yaml
repo_path: "/workspace/nodejs-api"
analysis_depth: "full"
dependency_file: "package.json"
package_manager: "npm"
```

# Example Output

```yaml
dependency_report:
  direct_dependencies: 45
  dev_dependencies: 23
  transitive_dependencies: 111
  health_score: 72
  risk_indicators:
    - type: "security"
      severity: "high"
      package: "lodash"
      description: "原型污染漏洞"
    - type: "outdated"
      severity: "medium"
      package: "axios"
      current: "0.21.0"
      latest: "1.6.0"
  outdated_deps:
    - package: "moment"
      reason: "功能冻结"
      alternative: "date-fns"
      migration_effort: "medium"
  security_issues:
    - cve: "CVE-2023-xxx"
      package: "lodash"
      severity: "critical"
      fix_available: true
  maintenance_recommendations:
    immediate:
      - "npm audit fix"
      - "检查所有依赖的许可证"
    short_term:
      - "制定 axios 升级计划"
    long_term:
      - "建立依赖更新自动化"
```

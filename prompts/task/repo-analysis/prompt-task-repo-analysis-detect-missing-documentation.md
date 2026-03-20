---
id: prompt-task-repo-analysis-detect-missing-documentation-v1
name: Detect Missing Documentation
summary: 检测项目中缺失的文档，评估文档覆盖率，识别需要补充的关键文档
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - documentation
  - knowledge-gap
  - onboarding
  - technical-debt
keywords:
  - 文档缺失
  - 文档覆盖率
  - 知识缺口
  - 技术债务
  - 文档审计
intent: |
  帮助 AI 评估项目的文档完整性，从而能够：
  - 检测已有文档和缺失文档
  - 评估文档覆盖率
  - 识别关键知识缺口
  - 量化文档技术债务
  - 制定文档补充优先级
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - doc_types: array 需要检查的文档类型
  - quality_threshold: string 质量阈值 (strict/standard/lenient)
output_requirements:
  - documentation_report: object 包含：
    - existing_docs: array 已有文档清单
    - missing_docs: array 缺失文档清单
    - coverage_score: number 文档覆盖率
    - quality_assessment: object 质量评估
    - gaps: array 知识缺口
    - recommendations: array 改进建议
tool_requirements:
  - file-reading
  - grep-search
  - directory-listing
preconditions:
  - 已了解项目的基本结构
  - 已识别项目使用的技术栈
anti_patterns:
  - 不要只检查文档是否存在，要评估内容质量
  - 不要遗漏 API 文档、架构决策记录等关键文档
  - 不要假设所有项目都需要相同类型的文档
failure_modes:
  - 文档风格不一致：识别格式差异并建议标准化
  - 文档过时：标注需要更新的文档
  - 关键知识缺失：标注必须优先补充的文档
self_check: |
  分析后检查：
  □ 是否完整扫描了所有可能的文档位置
  □ 是否评估了已有文档的质量
  □ 是否识别了所有关键知识缺口
  □ 是否制定了可执行的文档补充计划
related_skills:
  - skill-repo-analysis
  - skill-debugging
  - workflow-documentation-generation
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-feature-implementation
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-summarize-project-architecture
  - prompt-task-repo-analysis-prepare-repo-onboarding-summary
---

# Context

你是一个经验丰富的技术文档专家，负责评估项目的文档完整性。这个 Prompt 强调：
1. 系统性地扫描文档
2. 评估文档质量和覆盖率
3. 识别关键知识缺口
4. 制定文档改进计划

# Prompt Body

## 阶段 1：文档类型定义

### 1.1 标准文档清单

```markdown
## 项目文档类型矩阵

### 必读文档
| 文档类型 | 文件名模式 | 用途 | 优先级 |
|----------|------------|------|--------|
| README | README.md, README*.md | 项目入口文档 | P0 |
| 安装指南 | INSTALL.md, SETUP.md | 环境搭建 | P0 |
| 使用指南 | USAGE.md, GUIDE.md | 基本使用 | P1 |
| API 文档 | API.md, API*.md, /docs/api/ | 接口说明 | P0 |
| 架构文档 | ARCHITECTURE.md, DESIGN.md | 系统设计 | P0 |

### 开发文档
| 文档类型 | 文件名模式 | 用途 | 优先级 |
|----------|------------|------|--------|
| 开发指南 | CONTRIBUTING.md, DEV.md | 贡献指南 | P1 |
| 代码规范 | CODE_STYLE.md, STANDARDS.md | 代码风格 | P1 |
| 测试指南 | TESTING.md, TESTS.md | 测试说明 | P1 |
| 调试指南 | DEBUGGING.md, TROUBLESHOOT.md | 调试说明 | P2 |

### 运维文档
| 文档类型 | 文件名模式 | 用途 | 优先级 |
|----------|------------|------|--------|
| 部署文档 | DEPLOY.md, DEPLOYMENT.md | 部署说明 | P0 |
| 配置文档 | CONFIG.md, CONFIGURATION.md | 配置说明 | P1 |
| 监控文档 | MONITORING.md, OPS.md | 运维监控 | P2 |
| 安全文档 | SECURITY.md, SECURITY.txt | 安全说明 | P1 |

### 决策文档
| 文档类型 | 文件名模式 | 用途 | 优先级 |
|----------|------------|------|--------|
| 变更日志 | CHANGELOG.md, HISTORY.md | 版本变更 | P1 |
| 架构决策 | ADR/, DECISIONS/, docs/adr/ | 技术决策 | P2 |
| RoadMap | ROADMAP.md, TODO.md | 规划路线 | P2 |
```

### 1.2 按项目类型的文档要求

```markdown
## 项目类型 → 必需文档

### Web 应用
- README.md (必填)
- 架构文档 (必填)
- API 文档 (必填)
- 部署文档 (必填)
- 安全文档 (强烈推荐)

### CLI 工具
- README.md (必填)
- 使用指南 (必填)
- 安装脚本 (推荐)
- 命令参考 (必填)

### 库/SDK
- README.md (必填)
- API 文档 (必填)
- 示例代码 (必填)
- 迁移指南 (如有升级)
- 类型定义 (如 TypeScript)

### 微服务
- 服务目录 (必填)
- 架构文档 (必填)
- 通信协议文档 (必填)
- 部署文档 (必填)
- 运行手册 (推荐)
```

## 阶段 2：文档扫描

### 2.1 文档位置扫描

```markdown
## 文档扫描路径

### 标准位置
```
项目根目录/
├── README.md
├── INSTALL.md
├── USAGE.md
├── API.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
├── docs/
│   ├── api/
│   ├── guides/
│   ├── architecture/
│   └── adr/
├── .github/
│   └── workflows/  # CI/CD 文档
└── scripts/        # 脚本说明
```

### 扫描策略
```bash
# 文档文件模式
*.md
*.rst
*.txt (README*, INSTALL*, USAGE*)
*.adoc
docs/**/*
```

### 扫描检查项
1. 检查根目录的标准文档
2. 检查 docs/ 目录结构
3. 检查 .github/ 目录
4. 检查各子模块的 README
5. 检查包的元数据文件
```

## 阶段 3：文档质量评估

### 3.1 质量评估维度

```markdown
## 文档质量评估矩阵

| 维度 | 权重 | 评估标准 |
|------|------|----------|
| 完整性 | 30% | 是否包含所有关键信息 |
| 准确性 | 25% | 内容是否与代码一致 |
| 时效性 | 20% | 是否反映最新状态 |
| 可读性 | 15% | 结构是否清晰易读 |
| 可操作性 | 10% | 是否有步骤指引 |

### 评分标准
- 90-100: 优秀 - 完整、准确、新鲜
- 70-89: 良好 - 基本满足需求，有小缺陷
- 50-69: 一般 - 需要改进
- <50: 不合格 - 缺失关键内容
```

### 3.2 质量评估检查清单

```markdown
## README 质量检查
| 检查项 | 是否满足 | 备注 |
|--------|----------|------|
| 项目名称和描述 | ✓/✗ | |
| 快速开始指南 | ✓/✗ | |
| 依赖要求 | ✓/✗ | |
| 安装步骤 | ✓/✗ | |
| 基本使用示例 | ✓/✗ | |
| 链接到详细文档 | ✓/✗ | |
| 许可证声明 | ✓/✗ | |

## API 文档质量检查
| 检查项 | 是否满足 | 备注 |
|--------|----------|------|
| 所有端点都有文档 | ✓/✗ | |
| 请求参数说明 | ✓/✗ | |
| 响应格式说明 | ✓/✗ | |
| 错误码说明 | ✓/✗ | |
| 认证方式说明 | ✓/✗ | |
| 示例请求/响应 | ✓/✗ | |
```

## 阶段 4：知识缺口识别

### 4.1 缺口分类

```markdown
## 知识缺口分类

### P0 - 必须补充
- 缺失 README 或 README 过时
- 缺失核心功能的使用说明
- 缺失 API 文档
- 缺失架构文档

### P1 - 强烈建议补充
- 缺失部署文档
- 缺失配置说明
- 缺失故障排查指南
- 缺失变更日志

### P2 - 建议补充
- 缺失开发指南
- 缺失测试文档
- 缺失性能调优指南
- 缺失安全最佳实践
```

### 4.2 缺口影响评估

```markdown
## 缺口影响评估

| 缺失文档 | 影响对象 | 影响程度 | 紧急度 |
|----------|----------|----------|--------|
| API 文档 | 外部集成方 | 高 | P0 |
| 部署文档 | 运维团队 | 高 | P0 |
| 架构文档 | 新开发者 | 中 | P1 |
| 使用指南 | 业务方 | 中 | P1 |
| 测试文档 | 开发团队 | 低 | P2 |
```

## 阶段 5：生成文档审计报告

### 5.1 完整报告结构

```markdown
# 文档完整性审计报告

## 执行摘要
[描述项目文档的整体状况]

## 1. 文档覆盖率
```yaml
coverage:
  overall_score: 72
  required_docs:
    present: 8
    missing: 2
  optional_docs:
    present: 5
    missing: 7
```

## 2. 已有文档清单
```yaml
existing_docs:
  - path: "README.md"
    quality: 85
    last_updated: "2024-01-15"
    completeness: "完整"
  - path: "docs/api/"
    quality: 70
    last_updated: "2024-02-01"
    completeness: "基础端点有文档，部分缺失"
```

## 3. 缺失文档清单
```yaml
missing_docs:
  - path: "ARCHITECTURE.md"
    priority: P0
    impact: "新开发者难以理解系统设计"
    effort: "medium"
  - path: "docs/guides/deployment.md"
    priority: P1
    impact: "部署依赖口口相传"
    effort: "low"
```

## 4. 知识缺口
```yaml
gaps:
  - topic: "系统架构概览"
    covered_by: "无"
    risk: "新开发者上手困难"
  - topic: "支付流程"
    covered_by: "代码注释"
    risk: "业务逻辑不透明"
```

## 5. 改进计划
```yaml
recommendations:
  immediate:
    - task: "补充 ARCHITECTURE.md"
      priority: P0
      effort: "4 hours"
  short_term:
    - task: "更新 API 文档"
      priority: P1
      effort: "2 hours"
  long_term:
    - task: "建立文档自动化"
      priority: P2
      effort: "8 hours"
```

## 6. 文档健康度仪表盘
```
覆盖率:   ████████████████░░░ 72%
完整性:   ███████████████░░░░ 68%
准确性:   █████████████████░░ 85%
时效性:   ████████████░░░░░░░ 55%
可读性:   ██████████████████ 92%
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `doc_types` | 检查的文档类型 | `["api", "architecture", "deployment"]` |
| `quality_threshold` | 质量阈值 | `strict` / `standard` / `lenient` |
| `project_type` | 项目类型 | `web-app` / `cli-tool` / `library` |

# Usage Notes

1. **区分优先级**：P0 必须立即补充，P1/P2 可规划处理
2. **评估影响**：优先补充影响最大的文档
3. **考虑成本**：评估补充文档的工作量
4. **建立机制**：建议建立文档维护机制，避免文档再次过时

# Example Input

```yaml
repo_path: "/workspace/nodejs-api"
doc_types: ["all"]
quality_threshold: "standard"
project_type: "web-service"
```

# Example Output

```yaml
documentation_report:
  existing_docs:
    - path: "README.md"
      quality_score: 85
      completeness: "90%"
      issues: ["缺少 API 示例"]
    - path: "docs/api/auth.md"
      quality_score: 75
      completeness: "80%"
      issues: ["响应格式说明不完整"]
  missing_docs:
    - path: "ARCHITECTURE.md"
      priority: P0
      impact: "high"
      estimated_effort: "4 hours"
    - path: "DEPLOY.md"
      priority: P1
      impact: "medium"
      estimated_effort: "2 hours"
  coverage_score: 68
  quality_assessment:
    completeness: 72
    accuracy: 85
    freshness: 60
    readability: 90
  gaps:
    - area: "系统架构"
      severity: "critical"
      workaround: "通过代码推断"
    - area: "部署流程",
      severity: "medium"
      workaround: "口头指导"
  recommendations:
    - priority: 1
      action: "创建 ARCHITECTURE.md"
      effort: "4h"
      benefit: "提升新开发者上手速度"
```

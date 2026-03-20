---
id: prompt-tool-use-analyze-folder-then-plan-v1
name: Analyze Folder Then Plan
summary: 在制定计划前先分析文件夹结构，确保计划基于实际的项目结构
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: folder-analysis
tags:
  - tool-use
  - folder-structure
  - planning
  - context
keywords:
  - 文件夹分析
  - 计划制定
  - 项目结构
  - 先分析后计划
intent: |
  在制定任何计划前，先分析项目的文件夹结构，确保计划基于实际的项目结构。
  强调先理解"项目是怎么组织的"，再制定"如何在里面工作"的计划。
  核心原则：分析先行，计划有据。
applicable_models:
  - "*"
input_requirements:
  - planning_goal: string 计划目标
  - repo_path: string (可选) 仓库路径
  - analysis_depth: string 分析深度 (quick/full)
output_requirements:
  - folder_analysis: object 文件夹分析结果
  - structure_insights: array 结构洞察
  - plan_recommendations: array 计划建议
  - resource_locations: object 资源位置索引
tool_requirements:
  - Glob tool (列出目录结构)
  - Read tool (读取关键文件)
  - Grep tool (搜索特定内容)
preconditions:
  - 需要为项目工作制定计划
anti_patterns:
  - 不了解项目结构就制定计划
  - 假设所有项目都有相同的结构
  - 忽略不同层级目录的职责差异
failure_modes:
  - 结构复杂：识别主要结构模式和复杂点
  - 多模块项目：理解模块划分和模块间关系
  - 非标准结构：描述实际结构并适应
self_check: |
  计划前自检：
  □ 是否分析了项目的整体结构？
  □ 是否理解了目录划分的逻辑？
  □ 是否找到了与计划相关的资源位置？
  □ 计划是否与项目结构匹配？
related_skills:
  - skill-repo-analysis
  - tool-use-read-files-before-answering
  - tool-use-step-by-step
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-feature-implementation
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-map-modules-and-responsibilities
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**在制定计划前，先理解项目的实际结构**。

当需要为以下工作制定计划时，必须先分析文件夹结构：
- 代码修改计划
- 新功能开发计划
- 重构计划
- 调试计划

# Prompt Body

## 阶段 1：文件夹结构分析

### 1.1 目录扫描

```markdown
## 目录扫描

### 扫描命令
```bash
# 列出顶层目录
ls -la

# 递归列出所有目录（限制深度）
find . -maxdepth 3 -type d

# 树形展示
tree -L 3 -a
```

### 扫描结果
```markdown
## 项目结构概览

/
├── src/               # 源代码目录
│   ├── controllers/   # 控制器
│   ├── services/      # 服务层
│   ├── models/        # 数据模型
│   └── utils/         # 工具函数
├── tests/            # 测试目录
├── docs/             # 文档目录
├── config/           # 配置目录
├── scripts/          # 脚本目录
├── package.json      # 项目配置
└── README.md        # 项目说明
```
```

### 1.2 目录职责分析

```markdown
## 目录职责分析

| 目录 | 职责 | 关键内容 | 与计划的相关度 |
|------|------|----------|----------------|
| src/ | 源代码 | 所有业务代码 | 高 |
| tests/ | 测试代码 | 单元/集成测试 | 中 |
| docs/ | 文档 | API/架构文档 | 中 |
| config/ | 配置 | 环境/构建配置 | 低 |
```

## 阶段 2：结构洞察

### 2.1 架构模式识别

```markdown
## 架构模式识别

### 模式类型
| 模式 | 特征 | 识别置信度 |
|------|------|------------|
| MVC | controllers/, models/, views/ | 高/中/低 |
| 分层架构 | services/, repositories/ | 高/中/低 |
| DDD | domain/, application/, infrastructure/ | 高/中/低 |
| 功能划分 | features/, modules/ | 高/中/低 |
| 混合模式 | 多种模式混合 | - |

### 本项目的架构模式
**识别结果**: [模式名称]

**识别依据**:
1. [依据1]
2. [依据2]
```

### 2.2 关键位置识别

```markdown
## 关键位置

### 与计划相关的位置
| 计划内容 | 相关目录/文件 | 位置 |
|----------|---------------|------|
| [内容1] | [目录1] | path/ |
| [内容2] | [文件1] | path/file |

### 资源位置索引
```markdown
- 入口文件: src/index.ts
- 路由定义: src/routes/
- 数据模型: src/models/
- 服务逻辑: src/services/
- 工具函数: src/utils/
- 测试文件: tests/
```
```

## 阶段 3：计划建议

### 3.1 基于结构的计划

```markdown
## 计划建议

### 目标
[计划目标]

### 基于项目结构的建议

#### 入口点
[计划的最佳入口点]

#### 需要修改的区域
| 区域 | 原因 | 风险 |
|------|------|------|
| [区域1] | [原因] | [风险] |

#### 建议的执行顺序
1. [步骤1] - 从 [位置] 开始
2. [步骤2] - 修改 [位置]
3. [步骤3] - 测试 [位置]
```

### 3.2 风险提示

```markdown
## 风险提示

### 结构相关的风险
| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| [风险1] | [影响] | [措施] |
| [风险2] | [影响] | [措施] |

### 依赖相关的风险
| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| [风险1] | [影响] | [措施] |
```

## 阶段 4：生成分析报告

### 4.1 完整报告

```markdown
# 文件夹结构分析报告

## 执行摘要
[描述项目结构和特点]

## 1. 结构概览
```yaml
structure:
  type: "[模式类型]"
  depth: [最大深度]
  module_count: [模块数量]
  key_directories:
    - name: "src"
      purpose: "源代码"
    - name: "tests"
      purpose: "测试"
```

## 2. 结构洞察
```yaml
insights:
  - "项目采用 [模式] 组织代码"
  - "主要业务逻辑在 [目录]"
  - "配置集中在 [目录]"
  - "[目录] 结构清晰，职责单一"
```

## 3. 资源位置
```yaml
locations:
  entry: "src/index.ts"
  routes: "src/routes/"
  models: "src/models/"
  services: "src/services/"
  tests: "tests/"
  config: "config/"
```

## 4. 计划建议
```yaml
recommendations:
  approach: "[建议的执行方式]"
  sequence:
    - "1. 先分析 [位置] 的结构"
    - "2. 再修改 [位置]"
    - "3. 最后测试 [位置]"
  risks:
    - "风险1: [描述]"
    - "风险2: [描述]"
```

## 自检清单
- [ ] 是否完整扫描了项目结构？
- [ ] 是否理解了目录划分的逻辑？
- [ ] 是否找到了与计划相关的资源？
- [ ] 计划是否与项目结构匹配？
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `planning_goal` | 计划目标 | `"添加新的用户认证功能"` |
| `repo_path` | 仓库路径 | `/workspace/my-project` |
| `analysis_depth` | 分析深度 | `quick` / `full` |

# Usage Notes

1. **结构优先**：制定任何计划前先看项目结构
2. **理解划分逻辑**：不仅看有什么目录，更要知道为什么这样划分
3. **定位资源**：为计划找到需要操作的资源位置
4. **评估风险**：基于结构评估计划的风险
5. **适配结构**：计划要适配项目的实际结构，而非理想结构

# Example Input

```yaml
planning_goal: "为项目添加缓存功能"
repo_path: "/workspace/nodejs-api"
analysis_depth: "full"
```

# Example Output

```yaml
folder_analysis:
  structure_type: "分层架构"
  root_dirs:
    - name: "src"
      purpose: "源代码"
    - name: "tests"
      purpose: "测试"
    - name: "config"
      purpose: "配置文件"
  depth: 4

structure_insights:
  - "项目采用 Controller → Service → Repository 分层"
  - "缓存逻辑应该放在 Service 层"
  - "需要新增 cache/ 目录存放缓存相关代码"
  - "Redis 客户端配置在 config/redis.ts"

plan_recommendations:
  - "在 src/services/ 下添加 cache.service.ts"
  - "在 config/ 下添加 cache.config.ts"
  - "修改需要缓存的 Service 引入缓存服务"

resource_locations:
  services: "src/services/"
  config: "config/"
  redis_config: "config/redis.ts"
  entry: "src/index.ts"
```

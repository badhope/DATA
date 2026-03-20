---
id: prompt-tool-use-inspect-config-then-act-v1
name: Inspect Config Then Act
summary: 在执行操作前先检查配置文件，确保操作基于正确的配置上下文
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: config-inspection
tags:
  - tool-use
  - config
  - inspection
  - pre-execution
keywords:
  - 配置检查
  - 执行前检查
  - 配置验证
intent: |
  在执行任何配置相关的操作前，先读取和分析相关配置文件。
  强调理解当前配置状态后再行动，避免基于错误假设操作。
  核心原则：操作前先了解配置现状，配置不清不动手。
applicable_models:
  - "*"
input_requirements:
  - intended_action: string 计划执行的操作
  - relevant_config_paths: array 可能相关的配置文件路径
  - config_context: string (可选) 配置上下文
output_requirements:
  - current_config_state: object 当前配置状态
  - config_analysis: object 配置分析结果
  - action_readiness: string 操作就绪状态 (ready/caution/blocked)
  - recommended_action: string 建议的操作方式
  - risk_mitigation: array 风险缓解措施
tool_requirements:
  - Read tool (读取配置文件)
  - Glob tool (查找配置文件)
  - Grep tool (搜索配置项)
preconditions:
  - 有配置相关的操作需要执行
anti_patterns:
  - 不检查配置就执行操作
  - 假设配置是默认值
  - 忽略配置的环境差异
  - 修改配置时不备份
failure_modes:
  - 配置文件不存在：查找可能的配置位置
  - 配置格式错误：报告格式问题
  - 配置冲突：识别冲突并提供解决建议
  - 缺少必要配置：列出需要补充的配置项
self_check: |
  操作前自检：
  □ 是否已读取所有相关配置文件？
  □ 是否理解了每个配置项的含义？
  □ 操作是否与当前配置兼容？
  □ 是否识别了配置风险？
  □ 是否准备了回滚方案？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-search-before-concluding
  - skill-repo-analysis
related_workflows:
  - workflow-feature-implementation
  - workflow-new-repo-onboarding
  - workflow-change-verify-report
related_prompts:
  - prompt-task-repo-analysis-find-key-config-files
  - prompt-tool-use-read-files-before-answering
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**在执行配置相关的操作前，先充分了解当前的配置状态**。

当需要执行以下操作时，必须先检查配置：
- 修改应用配置
- 部署应用到新环境
- 调试配置相关问题
- 修改环境变量
- 更新数据库配置

# Prompt Body

## 阶段 1：配置定位

### 1.1 识别相关配置

```markdown
## 配置识别

**计划操作**: [描述要执行的操作]

**相关配置类型**:
- [ ] 环境配置 (.env, .env.local)
- [ ] 应用配置 (config/, settings/)
- [ ] 框架配置 (框架特定配置文件)
- [ ] 部署配置 (Dockerfile, docker-compose.yml)
- [ ] 构建配置 (webpack.config.js, tsconfig.json)

**配置的优先级**:
| 配置类型 | 文件位置 | 相关度 |
|----------|----------|--------|
| [类型] | [位置] | P0/P1/P2 |
```

### 1.2 配置搜索策略

```markdown
## 配置搜索

### 搜索位置
```bash
# 环境配置
find . -name ".env*" -type f

# 应用配置
find . -path "*/config/*" -name "*.json" -o -name "*.yaml" -o -name "*.js"

# 框架配置
ls -la *.config.* tsconfig.json package.json

# 部署配置
find . -name "Dockerfile" -o -name "docker-compose*.yml"
```

### 配置文件映射
| 操作 | 必须检查的配置 |
|------|----------------|
| 修改 API 行为 | .env, config/api.ts |
| 修改数据库 | .env, config/database.ts |
| 修改日志 | config/logging.js |
| 修改认证 | .env, config/auth.ts |
```

## 阶段 2：配置读取和分析

### 2.1 配置读取

```markdown
## 配置读取记录

### 已读取配置
| # | 文件路径 | 配置项数 | 关键配置 |
|---|----------|----------|----------|
| 1 | .env | 15 | DATABASE_URL, REDIS_URL |
| 2 | config/app.json | 8 | port, env |

### 配置内容摘要
```markdown
**.env**:
```
DATABASE_URL=mongodb://localhost:27017/myapp
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=development
```

**config/app.json**:
```json
{
  "port": 3000,
  "host": "0.0.0.0",
  "cors": {
    "origin": "*"
  }
}
```
```
```

### 2.2 配置分析

```markdown
## 配置分析

### 配置值分析
| 配置项 | 当前值 | 默认值 | 是否自定义 | 风险 |
|--------|--------|--------|------------|------|
| DATABASE_URL | mongodb://... | 无 | ✓ | 中 |
| REDIS_URL | redis://... | 无 | ✓ | 低 |
| NODE_ENV | development | development | ✗ | 低 |

### 配置依赖关系
```
NODE_ENV → 影响日志级别、缓存策略
DATABASE_URL → 影响数据存储位置
REDIS_URL → 影响缓存和会话存储
```

### 配置冲突检测
| 检查项 | 状态 | 说明 |
|--------|------|------|
| 端口冲突 | ✓ 无冲突 | 3000 端口未被占用 |
| URL 格式 | ✓ 正确 | URL 格式符合规范 |
| 环境一致性 | ⚠ 需注意 | dev 和 prod 配置不同 |
```

## 阶段 3：操作就绪评估

### 3.1 操作就绪判断

```markdown
## 操作就绪评估

### 就绪状态
**当前状态**: [ready / caution / blocked]

**状态说明**:
- **ready**: 配置完整且正确，可以执行操作
- **caution**: 配置有小问题，需要注意
- **blocked**: 配置有问题，需要先修复
```

### 3.2 风险评估

```markdown
## 风险评估

### 操作风险矩阵
| 风险类型 | 影响程度 | 发生概率 | 风险等级 | 缓解措施 |
|----------|----------|----------|----------|----------|
| 配置错误 | 高 | 低 | 中 | 备份 + 验证 |
| 环境差异 | 中 | 中 | 中 | 检查环境变量 |
| 覆盖冲突 | 高 | 低 | 中 | 确认覆盖顺序 |

### 需要确认的问题
1. [问题1] - 确认后再执行
2. [问题2] - 确认后再执行
```

## 阶段 4：操作执行

### 4.1 执行前准备

```markdown
## 执行前准备

### 备份
- [ ] 备份当前配置
- [ ] 记录当前配置状态

### 验证清单
- [ ] 确认要修改的配置项
- [ ] 确认修改后的值
- [ ] 确认修改的影响范围
- [ ] 准备回滚方案
```

### 4.2 建议的操作方式

```markdown
## 建议操作

### 操作方式
[描述建议的具体操作方式]

### 步骤
1. [步骤1]
2. [步骤2]
3. [步骤3]

### 回滚方案
如果出现问题：
1. 恢复备份的配置文件
2. 重启服务
3. 验证服务正常

### 验证方式
操作完成后，验证：
1. [验证点1]
2. [验证点2]
```

## 阶段 5：执行后验证

```markdown
## 执行后验证

### 配置验证
```bash
# 验证配置已生效
[验证命令]

# 验证服务正常
[验证命令]
```

### 状态检查
| 检查项 | 预期 | 实际 | 状态 |
|--------|------|------|------|
| [检查1] | [预期] | [实际] | ✓/✗ |
| [检查2] | [预期] | [实际] | ✓/✗ |

## 自检清单
- [ ] 是否读取了所有相关配置文件？
- [ ] 是否理解了配置项的含义和影响？
- [ ] 是否准备了备份和回滚方案？
- [ ] 是否明确了操作步骤？
- [ ] 是否规划了验证方式？
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `intended_action` | 计划执行的操作 | `"修改数据库连接池大小"` |
| `relevant_config_paths` | 配置文件路径 | `["config/database.ts", ".env"]` |
| `config_context` | 配置上下文 | `"生产环境"` |

# Usage Notes

1. **配置优先**：配置相关操作前必须先读取配置
2. **理解影响**：理解每个配置项的作用和影响
3. **备份习惯**：修改配置前习惯性备份
4. **验证确认**：操作后验证配置是否生效
5. **回滚准备**：始终准备回滚方案

# Example Input

```yaml
intended_action: "将应用从开发环境部署到生产环境"
relevant_config_paths:
  - ".env.production"
  - "config/server.ts"
config_context: "生产环境部署"
```

# Example Output

```yaml
current_config_state:
  database_url: "mongodb://prod-db:27017/app"
  redis_url: "redis://prod-redis:6379"
  node_env: "production"
  port: 8080

config_analysis:
  detected_issues:
    - type: "missing_config"
      key: "JWT_SECRET"
      severity: "high"
    - type: "insecure_default"
      key: "CORS_ORIGIN"
      value: "*"
      severity: "medium"
  recommended_fixes:
    - "设置 JWT_SECRET 为强密码"
    - "生产环境 CORS_ORIGIN 应设置为具体域名"

action_readiness: "caution"

recommended_action: |
  1. 先补充 JWT_SECRET 配置
  2. 修改 CORS_ORIGIN 为具体域名
  3. 验证所有必需配置已设置
  4. 执行部署

risk_mitigation:
  - risk: "配置缺失导致启动失败"
    mitigation: "使用 .env.production 模板检查所有必需配置"
  - risk: "CORS 配置错误导致 API 无法访问"
    mitigation: "部署后立即测试 API 调用"
```

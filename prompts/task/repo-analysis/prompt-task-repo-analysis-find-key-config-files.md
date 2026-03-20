---
id: prompt-task-repo-analysis-find-key-config-files-v1
name: Find Key Config Files
summary: 识别项目中的关键配置文件，包括环境配置、构建配置、依赖配置、部署配置等
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: repo-analysis
tags:
  - repo-analysis
  - config-files
  - environment
  - build-config
  - deployment
keywords:
  - 配置文件
  - 环境配置
  - 构建配置
  - 依赖配置
  - 部署配置
intent: |
  帮助 AI 识别项目中的关键配置文件，从而能够：
  - 理解项目的环境配置方式
  - 找到依赖管理文件
  - 识别构建和部署配置
  - 理解日志、安全、监控等基础设施配置
  - 为调试和修改提供配置上下文
applicable_models:
  - "*"
input_requirements:
  - repo_path: string 仓库路径
  - config_priority: string 配置优先级 (critical/common/all)
  - framework_hint: string 框架提示（可选）
output_requirements:
  - config_report: object 包含：
    - environment_configs: array 环境配置文件
    - dependency_configs: array 依赖配置文件
    - build_configs: array 构建配置文件
    - deployment_configs: array 部署配置文件
    - infrastructure_configs: array 基础设施配置文件
    - config_relationships: object 配置关系图
    - sensitive_configs: array 敏感配置项（需注意）
tool_requirements:
  - file-reading
  - grep-search
  - directory-listing
preconditions:
  - 已了解项目类型和使用的技术栈
anti_patterns:
  - 不要忽略 .env.example 等配置示例文件
  - 不要遗漏框架特定的配置文件
  - 不要忽略配置文件之间的继承/引用关系
failure_modes:
  - 多环境配置：列出所有环境并区分覆盖关系
  - 配置分散：标注配置来源优先级
  - 敏感信息：标注需要保护的配置项
self_check: |
  分析后检查：
  □ 是否找到所有环境配置文件
  □ 是否理解配置加载优先级
  □ 是否识别了敏感配置项
  □ 是否了解配置与代码的绑定方式
related_skills:
  - skill-repo-analysis
  - skill-debugging
  - tool-use-inspect-config-then-act
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-feature-implementation
  - workflow-repo-reading-to-change-plan
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-understand-project-entry-points
---

# Context

你是一个经验丰富的开发者，负责识别陌生项目中的关键配置文件。这个 Prompt 强调：
1. 系统性地识别各类配置文件
2. 理解配置之间的依赖关系
3. 识别敏感配置项
4. 理解配置加载和覆盖机制

# Prompt Body

## 阶段 1：配置类型分类

### 1.1 配置文件类型矩阵

```markdown
## 配置文件类型

| 类型 | 用途 | 常见文件名 |
|------|------|----------|
| 环境配置 | 环境变量管理 | .env, .env.local, .env.production |
| 依赖配置 | 包/模块管理 | package.json, requirements.txt, pom.xml, go.mod |
| 构建配置 | 编译打包 | webpack.config.js, tsconfig.json, Makefile |
| 运行配置 | 应用运行时 | config/, settings/, application.yml |
| 部署配置 | 部署相关 | Dockerfile, docker-compose.yml, k8s/ |
| 框架配置 | 框架特定 | next.config.js, vue.config.js, angular.json |
```

### 1.2 按语言/框架的特征匹配

```markdown
## 语言特定配置

### Node.js / JavaScript / TypeScript
- package.json          # 依赖和脚本
- tsconfig.json         # TypeScript 配置
- jest.config.js        # 测试配置
- eslint.config.js      # 代码检查配置
- .prettierrc           # 代码格式化配置
- webpack.config.js     # 打包配置
- vite.config.ts        # Vite 配置

### Python
- requirements.txt      # 依赖列表
- pyproject.toml        # 现代 Python 项目配置
- setup.py              # 包安装配置
- pytest.ini             # 测试配置
- .env                   # 环境变量

### Java
- pom.xml               # Maven 依赖
- build.gradle          # Gradle 配置
- application.yml       # Spring Boot 配置
- logback.xml           # 日志配置

### Go
- go.mod                # 依赖管理
- go.sum                # 依赖校验
- .env                  # 环境变量

### Docker / Kubernetes
- Dockerfile            # 容器构建
- docker-compose.yml    # 多容器编排
- k8s/                  # Kubernetes 配置
- .dockerignore         # Docker 构建忽略
```

## 阶段 2：识别环境配置

### 2.1 环境配置文件搜索

```markdown
## 环境配置搜索

### 搜索策略
1. 检查根目录的 .env* 文件
2. 检查 config/ 目录下的环境配置
3. 检查框架特定的环境配置位置

### 优先级识别
- .env                 # 默认/开发环境
- .env.local           # 本地覆盖（不提交）
- .env.development     # 开发环境
- .env.production      # 生产环境
- .env.test            # 测试环境

### 重要标记
- .env.example         # 环境变量模板（安全参考）
- .env.local          # 本地私有配置
```

### 2.2 环境配置内容分析

```markdown
## 环境配置分析

### 配置文件清单
| 文件 | 环境 | 用途 | 敏感度 |
|------|------|------|--------|
| .env | 开发 | 本地开发配置 | 高 |
| .env.production | 生产 | 生产环境配置 | 极高 |

### 常见配置项分类
1. **数据库配置**
   - DATABASE_URL, DB_HOST, DB_PORT, DB_NAME
   - REDIS_URL, CACHE_CONFIG

2. **认证配置**
   - JWT_SECRET, AUTH_TOKEN_SECRET
   - API_KEY, OAUTH_*

3. **服务配置**
   - PORT, HOST, DOMAIN
   - CORS_ORIGIN

4. **第三方服务**
   - AWS_*, GCP_*, AZURE_*
   - STRIPE_*, PAYPAL_*
```

## 阶段 3：识别依赖配置

### 3.1 依赖配置文件识别

```markdown
## 依赖配置搜索

### 主要依赖文件
| 文件 | 包管理器 | 格式 |
|------|----------|------|
| package.json | npm/yarn/pnpm | JSON |
| requirements.txt | pip | 文本 |
| pom.xml | Maven | XML |
| build.gradle | Gradle | DSL |
| go.mod | Go modules | 模块定义 |
| Cargo.toml | Rust | TOML |

### 依赖配置文件内容
- dependencies: 生产依赖
- devDependencies: 开发依赖
- peerDependencies: 同级依赖
- optionalDependencies: 可选依赖
```

### 3.2 依赖关系分析

```markdown
## 依赖关系分析

### 直接依赖
- 列出主要的生产依赖
- 识别关键的工具库

### 依赖版本策略
- ^1.2.3  # 兼容更新
- ~1.2.3  # 补丁更新
- 1.2.3   # 精确版本

### monorepo 配置（如有）
- workspaces 配置
- lerna.json / nx.json
- pnpm-workspace.yaml
```

## 阶段 4：识别构建和部署配置

### 4.1 构建配置识别

```markdown
## 构建配置清单

### JavaScript/TypeScript
- webpack.config.*   # Webpack 打包
- vite.config.*       # Vite 构建
- rollup.config.*     # Rollup 打包
- tsconfig.json        # TypeScript 编译
- babel.config.*      # Babel 转译

### Python
- setup.py            # 包安装
- pyproject.toml      # 构建系统
- Makefile            # 构建命令

### Java
- pom.xml             # Maven 构建
- build.gradle        # Gradle 构建
- Dockerfile          # 容器构建
```

### 4.2 部署配置识别

```markdown
## 部署配置清单

### 容器化
- Dockerfile          # 单容器构建
- docker-compose.yml  # 多服务编排
- .dockerignore       # 构建上下文忽略

### 编排
- kubernetes/         # K8s 配置目录
- helm/              # Helm charts
- docker-compose.*.yml  # 环境特定编排

### CI/CD
- .github/workflows/  # GitHub Actions
- .gitlab-ci.yml      # GitLab CI
- Jenkinsfile         # Jenkins

### 服务器
- nginx.conf          # Nginx 配置
- apache.conf         # Apache 配置
- supervisord.conf    # 进程管理
```

## 阶段 5：识别基础设施配置

### 5.1 日志和监控配置

```markdown
## 日志配置

### 日志框架配置
| 框架 | 配置文件 |
|------|----------|
| Winston | log4js.json, winston.config.js |
| Log4j | log4j.properties, logback.xml |
| Python logging | logging.conf |
| Go log | 自定义或使用标准库 |

### 监控配置
- prometheus.yml      # Prometheus 抓取配置
- grafana.json        # Grafana 仪表板
- sentry.yml          # Sentry 配置
```

### 5.2 安全配置

```markdown
## 安全配置清单

### 认证和授权
- JWT 配置
- OAuth 配置
- Session 配置
- CORS 配置

### 加密配置
- SSL/TLS 证书路径
- 加密算法配置
- 密钥管理

### 安全扫描
- .snyk              # Snyk 安全扫描
- security.txt       # 安全联系方式
```

## 阶段 6：生成配置文件报告

### 6.1 完整报告结构

```markdown
# 关键配置文件分析报告

## 执行摘要
[描述项目的配置管理体系]

## 1. 环境配置
```yaml
environment_configs:
  - path: ".env"
    purpose: "开发环境变量"
    priority: 1  # 加载优先级
    has_example: true
    sensitive_keys:
      - DATABASE_URL
      - JWT_SECRET
  - path: ".env.production"
    purpose: "生产环境变量"
    priority: 3
    sensitive: true
```

## 2. 依赖配置
```yaml
dependency_configs:
  primary:
    file: "package.json"
    manager: "npm"
    deps_count: 42
    dev_deps_count: 18
  lock_file: "package-lock.json"
```

## 3. 构建配置
| 文件 | 工具 | 用途 |
|------|------|------|
| tsconfig.json | TypeScript | 编译选项 |
| vite.config.ts | Vite | 构建配置 |

## 4. 部署配置
```yaml
deployment_configs:
  container: "Dockerfile"
  orchestration: "docker-compose.yml"
  ci_cd: ".github/workflows/deploy.yml"
```

## 5. 配置关系图
```
加载顺序:
.env → .env.local → .env.production → config/default → config/production
```

## 6. 敏感配置清单
| 配置项 | 文件 | 风险级别 | 建议 |
|--------|------|----------|------|
| DATABASE_URL | .env | 高 | 使用密钥管理服务 |
| JWT_SECRET | .env | 极高 | 必须加密存储 |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `repo_path` | 仓库根目录路径 | `/workspace/my-project` |
| `config_priority` | 配置优先级 | `critical` / `common` / `all` |
| `framework_hint` | 框架提示 | `express` / `spring-boot` / `django` |
| `env_example_available` | 是否有配置示例 | `true` / `false` |

# Usage Notes

1. **敏感信息优先**：首先识别敏感配置项，标注保护建议
2. **优先级排序**：理解配置加载优先级对于调试至关重要
3. **关系映射**：配置文件之间常有引用和覆盖关系
4. **示例文件**：优先找 .env.example 作为配置参考

# Example Input

```yaml
repo_path: "/workspace/nodejs-api"
config_priority: "critical"
framework_hint: "express"
```

# Example Output

```yaml
config_report:
  environment_configs:
    - path: ".env"
      purpose: "开发环境变量"
      contains:
        - DATABASE_URL
        - REDIS_URL
        - JWT_SECRET
      sensitive: true
    - path: ".env.example"
      purpose: "配置模板"
      contains_sanitized: true
  dependency_configs:
    - file: "package.json"
      manager: "npm"
      main_deps:
        - express: "^4.18.0"
        - mongoose: "^7.0.0"
        - jsonwebtoken: "^9.0.0"
  build_configs:
    - file: "tsconfig.json"
      type: "typescript-compiler"
  deployment_configs:
    - file: "Dockerfile"
      type: "container"
    - file: ".github/workflows/deploy.yml"
      type: "ci-cd"
  config_relationships:
    load_order:
      - ".env"
      - "config/default.json"
      - "config/production.json (覆盖)"
  sensitive_configs:
    - key: "DATABASE_URL"
      file: ".env"
      risk: "database-credential-exposure"
    - key: "JWT_SECRET"
      file: ".env"
      risk: "authentication-bypass"
```

# AI Skill & Prompt 仓库

[English](README.md) · [中文](README.zh-CN.md)

---

[![版本](https://img.shields.io/badge/version-v2.1.0-blue.svg)](https://github.com/badhope/skill)
[![许可证: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-yellowgreen.svg)](LICENSE-CODE)
[![许可证: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-orange.svg)](LICENSE-CONTENT)
[![GitHub stars](https://img.shields.io/github/stars/badhope/skill?style=social)](https://github.com/badhope/skill)
[![GitHub forks](https://img.shields.io/github/forks/badhope/skill?style=social)](https://github.com/badhope/skill)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![维护状态](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/badhope/skill/graphs/commit-activity)

---

## 🎯 项目概述

**AI Skill & Prompt Repository** 是一个模块化的 **AI 技能/提示词/工作流** 知识库，专为追求高效编程和智能化工作流的开发者设计。

| 适用对象 | 核心价值 |
|----------|----------|
| **开发者** | 快速查找、复制、使用高质量提示词 |
| **AI 系统** | 自主理解、路由、选择和组合技能 |
| **研究者** | 学术写作、研究辅助、文献检索 |
| **创作者** | 创意写作、内容生成、灵感激发 |

**核心技术栈:** GPT-4 · Claude · 强化学习 · 上下文记忆 · MCP 工具

---

## ⭐ 为什么选择本项目？

| 特性 | 说明 |
|------|------|
| 🏆 **132+ 精选提示词** | 覆盖编程、调试、学习、创意等场景 |
| 🎯 **110+ 标准化技能** | 模块化设计，即插即用 |
| 🔧 **10+ 预置工作流** | 开箱即用的多步骤任务流 |
| 🧠 **上下文记忆系统** | <100ms 语义检索响应 |
| 🤖 **强化学习引擎** | 自适应工作流优化 |
| 🔌 **MCP 工具框架** | 可扩展的代码质量检测、文档生成 |
| 📚 **学术写作套件** | 文献检索、论文优化、查重检测 |
| 🎨 **创意内容生成** | 小说创作、专业文案、多模态生成 |
| 🌐 **双语支持** | 完整的中英文文档 |

---

## 🚀 核心能力

### 🧠 上下文记忆系统

分层记忆架构，支持语义搜索：

| 记忆类型 | TTL | 容量 | 适用场景 |
|---------|-----|------|----------|
| **短期记忆** | 1小时 | 100条 | 当前对话上下文 |
| **中期记忆** | 2小时 | 无限 | 会话级信息 |
| **长期记忆** | 永久 | 无限 | 跨会话知识 |

**核心特性:**
- 语义相似度检索（响应时间 <100ms）
- 重要性评分与衰减机制
- 时间戳版本控制的冲突解决
- 基于标签和嵌入向量的搜索

### 🤖 强化学习引擎

基于 PPO 的 RL 框架，实现自适应工作流优化：

```python
from rl_engine import RLEngine, RLConfig

config = RLConfig(
    state_dim=128,
    action_dim=10,
    learning_rate=0.001,
    gamma=0.99
)
engine = RLEngine(config)
```

**能力矩阵:**
- 多维度奖励函数（代码质量、解决效率、用户满意度）
- 优先级采样经验回放
- 动态 ε 衰减的探索-利用平衡
- 代码模拟与执行环境

### 🔧 MCP 工具框架

可扩展的工具框架，包含专业模块：

| 工具 | 功能描述 |
|------|----------|
| **CodeQualityCheckerTool** | 静态代码分析、风格检查 |
| **UnitTestGeneratorTool** | 自动化测试生成 |
| **APIDocGeneratorTool** | OpenAPI/Swagger 文档生成 |
| **RefactoringAssistantTool** | 代码异味检测与重构建议 |
| **CodeGeneratorTool** | MCU 代码生成 |
| **PeripheralDriverTool** | GPIO、UART、SPI、I2C 驱动生成 |

---

## 📚 技能分类

### 🔌 MCP 技能 (19 个)

模型上下文协议集成，用于 AI 工具交互。

| 技能 | 描述 |
|------|------|
| mcp-server-development | 服务器架构、工具、资源 |
| mcp-client-integration | 客户端连接、工具发现 |
| mcp-tool-creation | 工具设计、验证、安全 |
| mcp-resource-management | 资源暴露、订阅 |
| mcp-prompt-templates | 参数化提示词、模板 |
| mcp-debugging-testing | MCP Inspector、单元测试 |
| mcp-deployment-operations | Docker、Kubernetes、云部署 |
| mcp-security-best-practices | 认证、授权 |
| mcp-filesystem-integration | 安全文件系统操作 |
| mcp-database-integration | PostgreSQL、MySQL、MongoDB、Redis |
| mcp-browser-automation | Puppeteer、Playwright 自动化 |
| mcp-github-integration | 仓库、Issues、PRs |
| mcp-api-gateway | 多服务器路由、负载均衡 |
| mcp-protocol-deep-dive | 协议规范、传输 |
| mcp-memory-context | 会话记忆、向量搜索 |
| mcp-error-handling | 错误分类、恢复 |
| mcp-web-search | 网页搜索集成 |
| mcp-slack-integration | Slack 机器人和自动化 |
| mcp-aws-integration | AWS 资源管理 |

### 💻 编程技能 (8 个)

代码生成、审查和实现。

| 技能 | 描述 |
|------|------|
| coding | 代码生成和实现 |
| coding-code-review | 代码质量审查 |
| coding-bug-fixing | Bug 分析和修复 |
| incremental-changer | 最小化目标修改 |
| cross-file-refactor | 安全的跨文件重构 |
| multi-language-file-handler | 多语言文件处理 |
| test-generator | 测试用例生成 |
| prompt-engineering | 提示词优化技术 |

### 🐛 调试技能 (5 个)

系统性调试和故障排除。

| 技能 | 描述 |
|------|------|
| debugging | 系统性调试流程 |
| system-debugging-agent | 调试代理能力 |
| workflow-bug-investigation | Bug 调查工作流 |
| workflow-tool-assisted-debug | 工具辅助调试 |
| error-recovery | 错误恢复策略 |

### 🔧 DevOps 技能 (12 个)

基础设施和部署自动化。

| 技能 | 描述 |
|------|------|
| git-operations | Git 工作流和操作 |
| shell-scripting | Shell 脚本自动化 |
| docker-containerization | Docker 容器管理 |
| ci-cd-pipeline | CI/CD 流水线配置 |
| database-migration | 数据库迁移脚本 |
| kubernetes-orchestration | Kubernetes 部署 |
| terraform-iac | 基础设施即代码 |
| incident-response | 生产事故处理 |
| network-debugging | 网络故障排除 |
| linting-config | Linting 工具配置 |
| config-management | 配置管理 |
| secret-management | 密钥和凭证管理 |

### 🎨 前端技能 (7 个)

UI/UX 和客户端开发。

| 技能 | 描述 |
|------|------|
| frontend-react | React 开发 |
| frontend-vue | Vue.js 开发 |
| css-tailwind | Tailwind CSS 样式 |
| web-design-teroop | 设计优先架构 |
| accessibility-a11y | 网页无障碍标准 |
| i18n-localization | 国际化 |
| web-scraping | Puppeteer 网页抓取 |

### ⚙️ 后端技能 (13 个)

服务端和 API 开发。

| 技能 | 描述 |
|------|------|
| api-design | RESTful 和 GraphQL API 设计 |
| backend-nodejs | Node.js 后端开发 |
| backend-python | Python 后端开发 |
| backend-go | Go 后端开发 |
| microservices-patterns | 微服务架构 |
| event-driven-architecture | 事件溯源、CQRS |
| graphql-development | GraphQL 模式设计 |
| sql-optimization | SQL 查询优化 |
| redis-caching | Redis 缓存策略 |
| message-queue | 消息队列系统 |
| websocket-realtime | WebSocket 通信 |
| state-management | Redux、Zustand、Pinia |
| mobile-development | React Native、Flutter |

### 🧪 测试技能 (5 个)

测试自动化和覆盖率。

| 技能 | 描述 |
|------|------|
| e2e-testing | 端到端测试 |
| test-generator | 测试用例生成 |
| code-coverage | 测试覆盖率分析 |
| performance-optimizer | 性能优化 |
| security-auditor | 安全漏洞审计 |

### 📊 数据技能 (6 个)

数据库、缓存和数据处理。

| 技能 | 描述 |
|------|------|
| sql-optimization | SQL 查询优化 |
| redis-caching | Redis 缓存策略 |
| data-pipeline | ETL 和数据管道 |
| rag-implementation | RAG 系统 |
| llm-fine-tuning | LLM 微调 |
| message-queue | 消息队列系统 |

### 🔒 安全技能 (4 个)

安全审计和密钥管理。

| 技能 | 描述 |
|------|------|
| security-auditor | 安全漏洞审计 |
| auth-implementation | OAuth2、JWT、SSO、MFA |
| secret-management | 密钥管理 |
| mcp-security-best-practices | MCP 安全实践 |

### 🔄 工作流技能 (12 个)

多步骤任务自动化。

| 技能 | 描述 |
|------|------|
| workflows | 工作流模板和指导 |
| workflow-feature-implementation | 功能开发工作流 |
| workflow-repo-reading-to-change-plan | 代码理解工作流 |
| workflow-documentation-generation | 文档生成 |
| workflow-change-verify-report | 变更验证工作流 |
| workflow-bug-investigation | Bug 调查工作流 |
| workflow-research-to-summary | 研究到总结工作流 |
| workflow-new-repo-onboarding | 新仓库入门 |
| workflow-vague-request-to-action | 需求澄清工作流 |
| workflow-prompt-selection-composition | 提示词组合工作流 |
| planning | 任务规划和分解 |
| self-memory-manager | 自包含记忆 |

### 🛠️ 工具使用技能 (8 个)

工具使用模式和最佳实践。

| 技能 | 描述 |
|------|------|
| tool-use | 工具使用指导 |
| tool-use-step-by-step | 逐步工具使用 |
| tool-use-combine-multiple-results | 结果组合 |
| tool-use-read-files-first | 先读文件再回答 |
| tool-use-search-before-concluding | 先搜索再下结论 |
| tool-use-inspect-config-before-action | 先检查配置再操作 |
| tool-use-analyze-folder-then-plan | 先分析再计划 |
| context-compressor | 上下文压缩 |

### 📝 文档技能 (3 个)

文档生成。

| 技能 | 描述 |
|------|------|
| document-processor | 文档格式处理 |
| workflow-documentation-generation | 文档生成 |
| cn-punctuation-checker | 中文标点检查器 |

### 🧠 AI/ML 技能 (4 个)

AI 代理设计和提示词工程。

| 技能 | 描述 |
|------|------|
| ai-agent-design | AI 代理架构 |
| prompt-engineering | 提示词优化 |
| rag-implementation | RAG 系统 |
| llm-fine-tuning | LLM 微调 |

### 🌐 集成技能 (6 个)

第三方 API 和服务集成。

| 技能 | 描述 |
|------|------|
| api-integrator | 第三方 API 集成 |
| mcp-github-integration | GitHub 集成 |
| mcp-slack-integration | Slack 集成 |
| mcp-aws-integration | AWS 集成 |
| mcp-web-search | 网页搜索集成 |
| mcp-browser-automation | 浏览器自动化 |

### 💰 成本优化技能 (1 个)

云成本管理。

| 技能 | 描述 |
|------|------|
| cost-optimization | 云成本优化 |

### 🧹 项目维护技能 (2 个)

项目清理和维护。

| 技能 | 描述 |
|------|------|
| project-cleaner | 冗余文件清理 |
| dependency-analyzer | 依赖分析 |

### 📱 平台特定技能 (2 个)

平台特定开发。

| 技能 | 描述 |
|------|------|
| wechat-mini-program-development | 微信小程序 |
| daily-trend-writer | 微信文章生成 |

### 🎬 媒体技能 (2 个)

媒体处理和生成。

| 技能 | 描述 |
|------|------|
| video-to-keyframes | 视频关键帧提取 |
| zopia-api | AI 视频制作 |

---

## 📈 统计数据

| 指标 | 数值 |
|------|------|
| 📝 提示词 | 132+ |
| 🎯 技能 | 110+ |
| 🔧 工作流 | 10+ |
| 📚 分类 | 18 |
| 🌍 语言 | 2 (中/英) |

---

## 🚀 快速导航

### 人类用户

> **"我想让 AI..."**

| 任务 | 链接 |
|------|------|
| 🔨 生成或修改代码 | [prompts/task/coding/](prompts/task/coding/) |
| 🐛 调试和修复 Bug | [prompts/task/debugging/](prompts/task/debugging/) |
| 📊 理解代码仓库 | [prompts/task/repo-analysis/](prompts/task/repo-analysis/) |
| 📋 创建执行计划 | [prompts/task/planning/](prompts/task/planning/) |
| 🔬 进行研究 | [prompts/task/research/](prompts/task/research/) |
| 🔄 执行多步骤工作流 | [prompts/workflow/](prompts/workflow/) |
| 📤 输出特定格式 | [prompts/output/](prompts/output/) |
| 🛠️ 优化提示词 | [prompts/meta/](prompts/meta/) |
| 📧 日常邮件写作 | [prompts/everyday/](prompts/everyday/) |
| 📋 技能索引 | [SKILLS-INDEX.md](SKILLS-INDEX.md) |

---

### AI 系统

**启动序列** — 按顺序阅读以下文件：

```
1. START-HERE.md              → 入口点
2. ARCHITECTURE.md            → 设计理念
3. ASSET-MAP.md               → 完整清单
4. INDEX.md                   → 结构概览
5. registry/prompts-registry.yaml  → 发现提示词
6. registry/routes-registry.yaml   → 学习路由
7. AI-USAGE.md                → 使用模式
8. AI-ROUTING.md              → 路由逻辑
9. AI-BOOTSTRAP.md            → 初始设置
10. SKILLS-INDEX.md           → 技能目录
```

---

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

**如何贡献:**

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解更多详情。

---

## 📄 许可证

本项目采用双许可证：

- **代码**: [Apache-2.0 许可证](LICENSE-CODE)
- **内容**: [CC BY 4.0 许可证](LICENSE-CONTENT)

---

## 🔗 相关链接

| 链接 | 描述 |
|------|------|
| [📖 文档](https://github.com/badhope/skill/wiki) | 完整文档 |
| [🐛 问题追踪](https://github.com/badhope/skill/issues) | Bug 报告 |
| [💬 讨论](https://github.com/badhope/skill/discussions) | 社区讨论 |
| [📋 技能索引](SKILLS-INDEX.md) | 完整技能目录 |

---

## 📬 联系方式

- **GitHub**: [badhope](https://github.com/badhope)
- **项目链接**: [https://github.com/badhope/skill](https://github.com/badhope/skill)

---

<div align="center">
  <strong>如果这个项目对你有帮助，请给一个 ⭐</strong>
  <br>
  <em>由 badhope 用 ❤️ 构建</em>
</div>

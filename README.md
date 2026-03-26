# AI Skill & Prompt Repository

[English](README.md) · [中文](README.zh-CN.md)

---

[![Version](https://img.shields.io/badge/version-v2.1.0-blue.svg)](https://github.com/badhope/skill)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-yellowgreen.svg)](LICENSE-CODE)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-orange.svg)](LICENSE-CONTENT)
[![GitHub stars](https://img.shields.io/github/stars/badhope/skill?style=social)](https://github.com/badhope/skill)
[![GitHub forks](https://img.shields.io/github/forks/badhope/skill?style=social)](https://github.com/badhope/skill)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/badhope/skill/graphs/commit-activity)

---

## 🎯 Overview

**AI Skill & Prompt Repository** is a modular **AI Skill/Prompt/Workflow** knowledge base designed for developers seeking efficient programming and intelligent workflows.

| Target Users | Core Value |
|--------------|------------|
| **Developers** | Quickly find, copy, and use high-quality prompts |
| **AI Systems** | Autonomously understand, route, select, and combine skills |
| **Researchers** | Academic writing, research assistance, literature retrieval |
| **Creators** | Creative writing, content generation, inspiration |

**Core Tech Stack:** GPT-4 · Claude · Reinforcement Learning · Context Memory · MCP Tools

---

## ⭐ Why Choose This Project?

| Feature | Description |
|---------|-------------|
| 🏆 **132+ Curated Prompts** | Covering coding, debugging, learning, creative scenarios |
| 🎯 **110+ Standardized Skills** | Modular design, plug-and-play |
| 🔧 **10+ Pre-built Workflows** | Ready-to-use multi-step task flows |
| 🧠 **Context Memory System** | <100ms semantic search response |
| 🤖 **Reinforcement Learning Engine** | Adaptive workflow optimization |
| 🔌 **MCP Tool Framework** | Extensible code quality detection, document generation |
| 📚 **Academic Writing Suite** | Literature search, paper optimization, plagiarism detection |
| 🎨 **Creative Content Generation** | Novel writing, professional copy, multimodal generation |
| 🌐 **Bilingual Support** | Complete Chinese and English documentation |

---

## 🚀 Core Capabilities

### 🧠 Context Memory System

Hierarchical memory architecture with semantic search:

| Memory Type | TTL | Capacity | Use Case |
|-------------|-----|----------|----------|
| **Short-term** | 1 hour | 100 items | Current conversation context |
| **Medium-term** | 2 hours | Unlimited | Session-level information |
| **Long-term** | Permanent | Unlimited | Cross-session knowledge |

**Core Features:**
- Semantic similarity search (response time <100ms)
- Importance scoring and decay mechanism
- Timestamp version control for conflict resolution
- Tag and embedding vector-based search

### 🤖 Reinforcement Learning Engine

PPO-based RL framework for adaptive workflow optimization:

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

**Capability Matrix:**
- Multi-dimensional reward functions (code quality, solution efficiency, user satisfaction)
- Priority sampling experience replay
- Dynamic ε decay for exploration-exploitation balance
- Code simulation and execution environment

### 🔧 MCP Tools Framework

Extensible tool framework with professional modules:

| Tool | Description |
|------|-------------|
| **CodeQualityCheckerTool** | Static code analysis, style checking |
| **UnitTestGeneratorTool** | Automated test generation |
| **APIDocGeneratorTool** | OpenAPI/Swagger documentation generation |
| **RefactoringAssistantTool** | Code smell detection and refactoring suggestions |
| **CodeGeneratorTool** | MCU code generation |
| **PeripheralDriverTool** | GPIO, UART, SPI, I2C driver generation |

---

## 📚 Skill Categories

### 🔌 MCP Skills (19 skills)

Model Context Protocol integration for AI tool interaction.

| Skill | Description |
|-------|-------------|
| mcp-server-development | Server architecture, tools, resources |
| mcp-client-integration | Client connection, tool discovery |
| mcp-tool-creation | Tool design, validation, security |
| mcp-resource-management | Resource exposure, subscription |
| mcp-prompt-templates | Parameterized prompts, templates |
| mcp-debugging-testing | MCP Inspector, unit tests |
| mcp-deployment-operations | Docker, Kubernetes, cloud deployment |
| mcp-security-best-practices | Authentication, authorization |
| mcp-filesystem-integration | Secure file system operations |
| mcp-database-integration | PostgreSQL, MySQL, MongoDB, Redis |
| mcp-browser-automation | Puppeteer, Playwright automation |
| mcp-github-integration | Repository, Issues, PRs |
| mcp-api-gateway | Multi-server routing, load balancing |
| mcp-protocol-deep-dive | Protocol specification, transport |
| mcp-memory-context | Session memory, vector search |
| mcp-error-handling | Error classification, recovery |
| mcp-web-search | Web search integration |
| mcp-slack-integration | Slack bot and automation |
| mcp-aws-integration | AWS resource management |

### 💻 Coding Skills (8 skills)

Code generation, review, and implementation.

| Skill | Description |
|-------|-------------|
| coding | Code generation and implementation |
| coding-code-review | Code quality review |
| coding-bug-fixing | Bug analysis and fixing |
| incremental-changer | Minimal targeted changes |
| cross-file-refactor | Safe cross-file refactoring |
| multi-language-file-handler | Multi-language file handling |
| test-generator | Test case generation |
| prompt-engineering | Prompt optimization techniques |

### 🐛 Debugging Skills (5 skills)

Systematic debugging and troubleshooting.

| Skill | Description |
|-------|-------------|
| debugging | Systematic debugging process |
| system-debugging-agent | Debugging agent capabilities |
| workflow-bug-investigation | Bug investigation workflow |
| workflow-tool-assisted-debug | Tool-assisted debugging |
| error-recovery | Error recovery strategies |

### 🔧 DevOps Skills (12 skills)

Infrastructure and deployment automation.

| Skill | Description |
|-------|-------------|
| git-operations | Git workflow and operations |
| shell-scripting | Shell script automation |
| docker-containerization | Docker container management |
| ci-cd-pipeline | CI/CD pipeline configuration |
| database-migration | Database migration scripts |
| kubernetes-orchestration | Kubernetes deployment |
| terraform-iac | Infrastructure as code |
| incident-response | Production incident handling |
| network-debugging | Network troubleshooting |
| linting-config | Linting tool configuration |
| config-management | Configuration management |
| secret-management | Secret and credential management |

### 🎨 Frontend Skills (7 skills)

UI/UX and client-side development.

| Skill | Description |
|-------|-------------|
| frontend-react | React development |
| frontend-vue | Vue.js development |
| css-tailwind | Tailwind CSS styling |
| web-design-teroop | Design-first architecture |
| accessibility-a11y | Web accessibility standards |
| i18n-localization | Internationalization |
| web-scraping | Web scraping with Puppeteer |

### ⚙️ Backend Skills (13 skills)

Server-side and API development.

| Skill | Description |
|-------|-------------|
| api-design | RESTful and GraphQL API design |
| backend-nodejs | Node.js backend development |
| backend-python | Python backend development |
| backend-go | Go backend development |
| microservices-patterns | Microservices architecture |
| event-driven-architecture | Event sourcing, CQRS |
| graphql-development | GraphQL schema design |
| sql-optimization | SQL query optimization |
| redis-caching | Redis caching strategies |
| message-queue | Message queue systems |
| websocket-realtime | WebSocket communication |
| state-management | Redux, Zustand, Pinia |
| mobile-development | React Native, Flutter |

### 🧪 Testing Skills (5 skills)

Test automation and coverage.

| Skill | Description |
|-------|-------------|
| e2e-testing | End-to-end testing |
| test-generator | Test case generation |
| code-coverage | Test coverage analysis |
| performance-optimizer | Performance optimization |
| security-auditor | Security vulnerability audit |

### 📊 Data Skills (6 skills)

Database, caching, and data processing.

| Skill | Description |
|-------|-------------|
| sql-optimization | SQL query optimization |
| redis-caching | Redis caching strategies |
| data-pipeline | ETL and data pipelines |
| rag-implementation | RAG systems |
| llm-fine-tuning | LLM fine-tuning |
| message-queue | Message queue systems |

### 🔒 Security Skills (4 skills)

Security auditing and secrets management.

| Skill | Description |
|-------|-------------|
| security-auditor | Security vulnerability audit |
| auth-implementation | OAuth2, JWT, SSO, MFA |
| secret-management | Secret management |
| mcp-security-best-practices | MCP security practices |

### 🔄 Workflow Skills (12 skills)

Multi-step task automation.

| Skill | Description |
|-------|-------------|
| workflows | Workflow templates and guidance |
| workflow-feature-implementation | Feature development workflow |
| workflow-repo-reading-to-change-plan | Code understanding workflow |
| workflow-documentation-generation | Documentation generation |
| workflow-change-verify-report | Change verification workflow |
| workflow-bug-investigation | Bug investigation workflow |
| workflow-research-to-summary | Research to summary workflow |
| workflow-new-repo-onboarding | New repo onboarding |
| workflow-vague-request-to-action | Request clarification workflow |
| workflow-prompt-selection-composition | Prompt composition workflow |
| planning | Task planning and breakdown |
| self-memory-manager | Self-contained memory |

### 🛠️ Tool-Use Skills (8 skills)

Tool usage patterns and best practices.

| Skill | Description |
|-------|-------------|
| tool-use | Tool usage guidance |
| tool-use-step-by-step | Step-by-step tool usage |
| tool-use-combine-multiple-results | Result combination |
| tool-use-read-files-first | Read files before answering |
| tool-use-search-before-concluding | Search before concluding |
| tool-use-inspect-config-before-action | Inspect config first |
| tool-use-analyze-folder-then-plan | Analyze then plan |
| context-compressor | Context compression |

### 📝 Documentation Skills (3 skills)

Documentation generation.

| Skill | Description |
|-------|-------------|
| document-processor | Document format processing |
| workflow-documentation-generation | Documentation generation |
| cn-punctuation-checker | Chinese punctuation checker |

### 🧠 AI/ML Skills (4 skills)

AI agent design and prompt engineering.

| Skill | Description |
|-------|-------------|
| ai-agent-design | AI agent architecture |
| prompt-engineering | Prompt optimization |
| rag-implementation | RAG systems |
| llm-fine-tuning | LLM fine-tuning |

### 🌐 Integration Skills (6 skills)

Third-party API and service integration.

| Skill | Description |
|-------|-------------|
| api-integrator | Third-party API integration |
| mcp-github-integration | GitHub integration |
| mcp-slack-integration | Slack integration |
| mcp-aws-integration | AWS integration |
| mcp-web-search | Web search integration |
| mcp-browser-automation | Browser automation |

### 💰 Cost Optimization Skills (1 skill)

Cloud cost management.

| Skill | Description |
|-------|-------------|
| cost-optimization | Cloud cost optimization |

### 🧹 Project Maintenance Skills (2 skills)

Project cleanup and maintenance.

| Skill | Description |
|-------|-------------|
| project-cleaner | Redundant file cleanup |
| dependency-analyzer | Dependency analysis |

### 📱 Platform-Specific Skills (2 skills)

Platform-specific development.

| Skill | Description |
|-------|-------------|
| wechat-mini-program-development | WeChat mini-program |
| daily-trend-writer | WeChat article generation |

### 🎬 Media Skills (2 skills)

Media processing and generation.

| Skill | Description |
|-------|-------------|
| video-to-keyframes | Video keyframe extraction |
| zopia-api | AI video production |

---

## 📈 Statistics

| Metric | Value |
|--------|-------|
| 📝 Prompts | 132+ |
| 🎯 Skills | 110+ |
| 🔧 Workflows | 10+ |
| 📚 Categories | 18 |
| 🌍 Languages | 2 (EN/ZH) |

---

## 🚀 Quick Navigation

### For Human Users

> **"I want AI to..."**

| Task | Link |
|------|------|
| 🔨 Generate or modify code | [prompts/task/coding/](prompts/task/coding/) |
| 🐛 Debug and fix bugs | [prompts/task/debugging/](prompts/task/debugging/) |
| 📊 Understand code repository | [prompts/task/repo-analysis/](prompts/task/repo-analysis/) |
| 📋 Create execution plans | [prompts/task/planning/](prompts/task/planning/) |
| 🔬 Conduct research | [prompts/task/research/](prompts/task/research/) |
| 🔄 Execute multi-step workflows | [prompts/workflow/](prompts/workflow/) |
| 📤 Output specific formats | [prompts/output/](prompts/output/) |
| 🛠️ Optimize prompts | [prompts/meta/](prompts/meta/) |
| 📧 Daily email writing | [prompts/everyday/](prompts/everyday/) |
| 📋 Skill Index | [SKILLS-INDEX.md](SKILLS-INDEX.md) |

---

### For AI Systems

**Bootstrap Sequence** — Read files in this order:

```
1. START-HERE.md              → Entry point
2. ARCHITECTURE.md            → Design philosophy
3. ASSET-MAP.md               → Complete inventory
4. INDEX.md                   → Structure overview
5. registry/prompts-registry.yaml  → Discover prompts
6. registry/routes-registry.yaml   → Learn routing
7. AI-USAGE.md                → Usage patterns
8. AI-ROUTING.md              → Routing logic
9. AI-BOOTSTRAP.md            → Initial setup
10. SKILLS-INDEX.md           → Skill catalog
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**How to Contribute:**

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit - m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

---

## 📄 License

This project uses dual licensing:

- **Code**: [Apache-2.0 License](LICENSE-CODE)
- **Content**: [CC BY 4.0 License](LICENSE-CONTENT)

---

## 🔗 Related Links

| Link | Description |
|------|-------------|
| [📖 Documentation](https://github.com/badhope/skill/wiki) | Full documentation |
| [🐛 Issue Tracker](https://github.com/badhope/skill/issues) | Bug reports |
| [💬 Discussions](https://github.com/badhope/skill/discussions) | Community discussions |
| [📋 Skill Index](SKILLS-INDEX.md) | Complete skill catalog |

---

## 📬 Contact

- **GitHub**: [badhope](https://github.com/badhope)
- **Project Link**: [https://github.com/badhope/skill](https://github.com/badhope/skill)

---

<div align="center">
  <strong>If this project helps you, please give it a ⭐</strong>
  <br>
  <em>Built with ❤️ by badhope</em>
</div>

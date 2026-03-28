# Global Index (INDEX)

This document is the central index for the entire repository. Both AI systems and human users can quickly locate any content through it.

---

## Statistics Overview

| Category | Count |
|----------|-------|
| **Meta Skills** | 3 |
| **Workflow Skills** | 2 |
| **Action Skills** | 11 |
| **Domain Skills** | 32 |
| **Total Skills** | 48 |
| **Last Updated** | 2026-03-28 |

---

## HCSA Architecture

```
┌─────────────────────────────────────────┐
│           Meta Layer (战略层)            │
│   task-planner | orchestrator | reflector│
├─────────────────────────────────────────┤
│         Workflow Layer (战术层)          │
│      coding-workflow | debugging-workflow│
├─────────────────────────────────────────┤
│          Action Layer (执行层)           │
│   code-generator | test-generator | ...  │
├─────────────────────────────────────────┤
│          Domain Layer (领域层)           │
│   AI | Backend | Frontend | DevOps | ... │
└─────────────────────────────────────────┘
```

---

## Quick Navigation

| I want AI to... | Skill | Location |
|-----------------|-------|----------|
| Plan complex tasks | task-planner | [meta/task-planner](.trae/skills/meta/task-planner) |
| Generate code | code-generator | [actions/code-generator](.trae/skills/actions/code-generator) |
| Debug issues | debugging-workflow | [workflows/debugging-workflow](.trae/skills/workflows/debugging-workflow) |
| Work with AI/LLM | langchain | [domains/ai/langchain](.trae/skills/domains/ai/langchain) |
| Build RAG systems | rag-system | [domains/ai/rag-system](.trae/skills/domains/ai/rag-system) |
| Write tests | unit-test | [domains/testing/unit-test](.trae/skills/domains/testing/unit-test) |
| Deploy with Docker | docker | [domains/devops/docker](.trae/skills/domains/devops/docker) |
| Work with databases | sql-optimization | [domains/database/sql-optimization](.trae/skills/domains/database/sql-optimization) |

---

## Domain Skills

### AI/LLM
- [langchain](.trae/skills/domains/ai/langchain) - LangChain framework
- [prompt-engineering](.trae/skills/domains/ai/prompt-engineering) - Prompt optimization
- [rag-system](.trae/skills/domains/ai/rag-system) - RAG implementation
- [openai](.trae/skills/domains/ai/openai) - OpenAI API

### Backend
- [python](.trae/skills/domains/backend/python) - Python development
- [nodejs](.trae/skills/domains/backend/nodejs) - Node.js development
- [go](.trae/skills/domains/backend/go) - Go development
- [graphql](.trae/skills/domains/backend/graphql) - GraphQL API
- [typescript](.trae/skills/domains/backend/typescript) - TypeScript

### Frontend
- [react](.trae/skills/domains/frontend/react) - React development
- [vue](.trae/skills/domains/frontend/vue) - Vue development
- [nextjs](.trae/skills/domains/frontend/nextjs) - Next.js framework
- [css-tailwind](.trae/skills/domains/frontend/css-tailwind) - Tailwind CSS

### DevOps
- [docker](.trae/skills/domains/devops/docker) - Docker containerization
- [kubernetes](.trae/skills/domains/devops/kubernetes) - K8s orchestration
- [ci-cd-pipeline](.trae/skills/domains/devops/ci-cd-pipeline) - CI/CD workflows

### Database
- [sql-optimization](.trae/skills/domains/database/sql-optimization) - SQL optimization
- [mongodb](.trae/skills/domains/database/mongodb) - MongoDB
- [redis-caching](.trae/skills/domains/database/redis-caching) - Redis caching
- [database-migration](.trae/skills/domains/database/database-migration) - DB migration

### Testing
- [unit-test](.trae/skills/domains/testing/unit-test) - Unit testing
- [integration-test](.trae/skills/domains/testing/integration-test) - Integration testing
- [e2e-test](.trae/skills/domains/testing/e2e-test) - E2E testing

### Mobile
- [react-native](.trae/skills/domains/mobile/react-native) - React Native
- [flutter](.trae/skills/domains/mobile/flutter) - Flutter

---

## Configuration

- [Routing Rules](.trae/skills/config/routing.yaml) - Task routing configuration
- [Skills README](.trae/skills/README.md) - Skills documentation

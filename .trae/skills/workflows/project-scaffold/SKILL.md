---
name: project-scaffold
description: "Tier 2: Project scaffold generation. Initialize repository structure, configuration files, CI/CD setup. Keywords: scaffold, boilerplate, project init, 项目脚手架, 模板生成"
layer: workflow
role: devops-engineer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - git-operations
  - ci-cd-pipeline
  - docker
tags:
  - scaffolding
  - initialization
  - devops
  - setup
---

# Project Scaffold

## Overview

Generate project boilerplate and scaffold.

## Key Capabilities

- Repository initialization
- Directory structure creation
- Configuration files setup
- CI/CD pipeline configuration
- Docker containerization setup
- Dependency management

## Supported Tech Stacks

- Frontend: React, Vue, Next.js
- Backend: Node.js, Python, Go, Rust
- Full-stack: MERN, MEAN, Django
- Mobile: React Native, Flutter

## Process Flow

1. **Init** - Initialize git repository
2. **Structure** - Create directory structure
3. **Config** - Setup configuration files
4. **CI/CD** - Configure pipelines
5. **Docker** - Setup containerization

## Output Artifacts

- Complete project structure
- README with setup instructions
- Configuration files (.gitignore, .env, etc.)
- CI/CD workflow files
- Dockerfile and docker-compose.yml

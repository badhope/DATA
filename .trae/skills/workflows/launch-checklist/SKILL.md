---
name: launch-checklist
description: "Tier 2: Launch checklist and go-live preparation. Pre-launch checks, deployment verification, rollback plan. Keywords: launch checklist, go-live, deployment, rollback, 上线检查清单, 发布准备"
layer: workflow
role: release-manager
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - git-operations
  - ci-cd-pipeline
  - fallback-manager
tags:
  - launch
  - deployment
  - release
  - checklist
---

# Launch Checklist

## Overview

Go-live checklist and release preparation.

## Key Capabilities

- Pre-launch checklist
- Deployment verification
- Rollback plan
- Post-launch monitoring
- Incident response

## Checklist Categories

- Code and testing
- Infrastructure
- Security
- Performance
- Monitoring
- Documentation
- Communication

## Process Flow

1. **Prepare** - Review and execute checklist
2. **Verify** - Deployment verification
3. **Monitor** - Post-launch monitoring
4. **Respond** - Incident response if needed
5. **Document** - Post-launch review

## Output Artifacts

- Launch checklist report
- Deployment verification
- Rollback plan
- Post-launch monitoring plan
- Post-mortem template

---
name: security-design
description: "Tier 2: Security design and threat modeling. Secure architecture, threat modeling, vulnerability assessment. Keywords: security design, threat modeling, secure architecture, 安全设计, 威胁建模"
layer: workflow
role: security-architect
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - security-auditor
  - prompt-injection-defense
tags:
  - security
  - design
  - threat-modeling
  - secure-coding
---

# Security Design

## Overview

Security design and threat modeling.

## Key Capabilities

- Secure architecture design
- Threat modeling (STRIDE, DREAD)
- Vulnerability assessment
- Security controls design
- Authentication and authorization
- Data encryption

## Security Frameworks

- OWASP Top 10
- STRIDE threat modeling
- DREAD risk assessment
- CIA triad (Confidentiality, Integrity, Availability)
- Zero Trust Architecture

## Process Flow

1. **Model** - Threat modeling and risk assessment
2. **Design** - Secure architecture design
3. **Implement** - Security controls implementation
4. **Test** - Security testing and audit
5. **Document** - Security documentation

## Output Artifacts

- Threat model document
- Security design document
- Risk assessment report
- Security test plan
- Incident response plan

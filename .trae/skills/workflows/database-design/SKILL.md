---
name: database-design
description: "Tier 2: Database design and modeling. ER diagrams, schema design, normalization, optimization. Keywords: database design, schema, ER diagram, normalization, 数据库设计, 数据建模"
layer: workflow
role: database-architect
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - sql-optimization
  - mongodb
tags:
  - database
  - design
  - modeling
  - schema
---

# Database Design

## Overview

Database design and data modeling.

## Key Capabilities

- Entity-Relationship (ER) modeling
- Schema design
- Normalization (1NF to 5NF)
- Denormalization for performance
- Indexing strategy
- Query optimization

## Supported Databases

- Relational: PostgreSQL, MySQL, SQL Server
- NoSQL: MongoDB, Redis, Cassandra
- NewSQL: CockroachDB, TiDB
- Graph: Neo4j

## Process Flow

1. **Model** - Create ER diagram
2. **Normalize** - Apply normalization rules
3. **Optimize** - Indexing and query optimization
4. **Schema** - Generate schema DDL
5. **Document** - Database documentation

## Output Artifacts

- ER diagram
- Database schema
- DDL scripts
- Indexing strategy
- Query optimization guide

---
name: data-augmentation
description: "Tier 2: Data augmentation for training data. Generate synthetic data, expand datasets, improve model robustness. Keywords: data augmentation, synthetic data, dataset expansion, 数据增强, 合成数据"
layer: workflow
role: data-engineer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - data-validation
  - etl
tags:
  - data
  - augmentation
  - synthetic-data
  - machine-learning
---

# Data Augmentation

## Overview

Data augmentation and synthetic data generation.

## Key Capabilities

- Text data augmentation
- Synthetic data generation
- Dataset expansion
- Data balancing
- Noise injection
- Data quality improvement

## Augmentation Techniques

- Text: paraphrasing, back-translation, synonym replacement
- Tabular: SMOTE, noise injection, synthetic sampling
- General: GANs, VAEs, LLM-based generation

## Process Flow

1. **Analyze** - Analyze dataset characteristics
2. **Select** - Select augmentation techniques
3. **Generate** - Generate augmented data
4. **Validate** - Validate data quality
5. **Merge** - Merge with original dataset

## Output Artifacts

- Augmented dataset
- Data augmentation report
- Quality validation results
- Dataset statistics

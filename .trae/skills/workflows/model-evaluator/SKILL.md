---
name: model-evaluator
description: "Tier 2: AI model evaluation and selection. Compare models, benchmark performance, select optimal model. Keywords: model evaluation, benchmark, model selection, LLM evaluation, 模型评估, 模型选择"
layer: workflow
role: ml-engineer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - llm-evaluation
  - research-workflow
tags:
  - ai
  - llm
  - evaluation
  - benchmarking
---

# Model Evaluator

## Overview

AI model evaluation and selection.

## Key Capabilities

- Model benchmarking
- Performance comparison
- Cost analysis
- Latency testing
- Quality assessment
- Model selection recommendation

## Evaluation Dimensions

- Quality (accuracy, relevance, coherence)
- Performance (latency, throughput)
- Cost (token usage, API cost)
- Safety (harm avoidance, bias)
- Capabilities (reasoning, coding, creativity)

## Process Flow

1. **Define** - Define evaluation criteria
2. **Benchmark** - Run benchmarks
3. **Compare** - Compare model performance
4. **Analyze** - Cost-benefit analysis
5. **Recommend** - Model selection recommendation

## Output Artifacts

- Model evaluation report
- Performance comparison matrix
- Cost analysis
- Recommendation document

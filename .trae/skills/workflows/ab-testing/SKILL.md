---
name: ab-testing
description: "Tier 2: A/B testing and experimentation. Design experiments, analyze results, statistical significance. Keywords: A/B testing, experimentation, hypothesis testing, A/B测试, 实验设计"
layer: workflow
role: data-scientist
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - human-in-the-loop
  - iteration-controller
tags:
  - experimentation
  - ab-testing
  - statistics
  - optimization
---

# A/B Testing

## Overview

A/B testing and experimentation framework.

## Key Capabilities

- Experiment design
- Hypothesis formulation
- Sample size calculation
- Statistical analysis
- Result interpretation
- Recommendation

## Statistical Methods

- Hypothesis testing (t-test, chi-square)
- p-value calculation
- Confidence intervals
- Bayesian A/B testing
- Multi-armed bandits

## Process Flow

1. **Hypothesize** - Formulate hypothesis
2. **Design** - Design experiment
3. **Run** - Run experiment
4. **Analyze** - Statistical analysis
5. **Decide** - Interpret and decide

## Output Artifacts

- Experiment design document
- Statistical analysis report
- Result interpretation
- Actionable recommendations

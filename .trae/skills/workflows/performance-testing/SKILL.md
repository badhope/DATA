---
name: performance-testing
description: "Tier 2: Performance testing and optimization. Load testing, stress testing, bottleneck analysis. Keywords: performance testing, load test, stress test, benchmark, 性能测试, 负载测试"
layer: workflow
role: performance-engineer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - performance-optimizer
  - monitoring
tags:
  - performance
  - testing
  - load-testing
  - optimization
---

# Performance Testing

## Overview

Performance testing and benchmarking.

## Key Capabilities

- Load testing
- Stress testing
- Soak testing
- Spike testing
- Bottleneck analysis
- Performance benchmarking

## Testing Tools

- Load testing: k6, JMeter, Locust
- Profiling: Chrome DevTools, Py-Spy
- APM: New Relic, Datadog, Prometheus
- Benchmarking: Apache Bench, wrk

## Process Flow

1. **Plan** - Define performance requirements
2. **Test** - Execute performance tests
3. **Analyze** - Identify bottlenecks
4. **Optimize** - Performance optimization
5. **Report** - Performance test report

## Output Artifacts

- Performance test plan
- Test execution report
- Bottleneck analysis
- Optimization recommendations
- Performance benchmarks

---
name: model-finetuning
description: "Tier 2: Model fine-tuning and customization. Fine-tune LLMs on custom data, LoRA, QLoRA. Keywords: model fine-tuning, LoRA, QLoRA, customization, 模型微调, 定制化"
layer: workflow
role: ml-engineer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - llm-evaluation
  - data-augmentation
tags:
  - ai
  - llm
  - fine-tuning
  - customization
---

# Model Fine-tuning

## Overview

Model fine-tuning and customization.

## Key Capabilities

- LoRA (Low-Rank Adaptation)
- QLoRA (Quantized LoRA)
- Full fine-tuning
- Instruction tuning
- Alignment tuning
- Evaluation before/after

## Supported Frameworks

- Hugging Face Transformers
- PEFT (Parameter-Efficient Fine-Tuning)
- LoRAX
- Axolotl
- LLaMA Factory

## Process Flow

1. **Prepare** - Prepare training data
2. **Configure** - Configure fine-tuning parameters
3. **Train** - Execute fine-tuning
4. **Evaluate** - Evaluate fine-tuned model
5. **Deploy** - Deploy fine-tuned model

## Output Artifacts

- Fine-tuned model weights
- Training logs
- Evaluation report
- Deployment guide

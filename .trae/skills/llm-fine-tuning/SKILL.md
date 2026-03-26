---
name: "llm-fine-tuning"
description: "Expert in LLM fine-tuning techniques including LoRA, QLoRA, PEFT, and full fine-tuning for domain adaptation."
category: "ai-ml"
tags: ["llm", "fine-tuning", "lora", "peft"]
---

# LLM Fine-Tuning

Expert in fine-tuning large language models for domain-specific applications.

## Description

Master the art of fine-tuning LLMs using various techniques from full fine-tuning to parameter-efficient methods like LoRA and QLoRA. Covers data preparation, training strategies, evaluation, and deployment.

## When to Use

- Adapting LLMs to specific domains
- Improving model performance on specific tasks
- Reducing hallucinations for factual domains
- Customizing model behavior and style
- Creating specialized models for industries

## Fine-Tuning Methods

### 1. Full Fine-Tuning

```python
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer

class FullFineTuner:
    def __init__(self, model_name, output_dir):
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.bfloat16,
            device_map="auto"
        )
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.output_dir = output_dir
    
    def train(self, dataset, epochs=3, batch_size=4, lr=2e-5):
        training_args = TrainingArguments(
            output_dir=self.output_dir,
            num_train_epochs=epochs,
            per_device_train_batch_size=batch_size,
            learning_rate=lr,
            bf16=True,
            logging_steps=100,
            save_steps=500,
            save_total_limit=3,
        )
        
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=dataset,
            tokenizer=self.tokenizer,
        )
        
        trainer.train()
        self.model.save_pretrained(self.output_dir)
        self.tokenizer.save_pretrained(self.output_dir)
```

### 2. LoRA (Low-Rank Adaptation)

```python
from peft import LoraConfig, get_peft_model, TaskType

class LoRAFineTuner:
    def __init__(self, model_name, output_dir, lora_r=8, lora_alpha=32):
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.bfloat16,
            device_map="auto"
        )
        
        # LoRA configuration
        self.lora_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            r=lora_r,
            lora_alpha=lora_alpha,
            lora_dropout=0.1,
            target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
            bias="none",
        )
        
        self.model = get_peft_model(self.model, self.lora_config)
        self.output_dir = output_dir
    
    def train(self, dataset, epochs=3, batch_size=4, lr=1e-4):
        training_args = TrainingArguments(
            output_dir=self.output_dir,
            num_train_epochs=epochs,
            per_device_train_batch_size=batch_size,
            learning_rate=lr,
            bf16=True,
            logging_steps=100,
            save_steps=500,
        )
        
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=dataset,
        )
        
        trainer.train()
        self.model.save_pretrained(self.output_dir)
```

### 3. QLoRA (Quantized LoRA)

```python
from transformers import BitsAndBytesConfig
from peft import prepare_model_for_kbit_training

class QLoRAFineTuner:
    def __init__(self, model_name, output_dir, lora_r=16, lora_alpha=64):
        # 4-bit quantization config
        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.bfloat16,
            bnb_4bit_use_double_quant=True,
        )
        
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            quantization_config=bnb_config,
            device_map="auto"
        )
        
        # Prepare for training
        self.model = prepare_model_for_kbit_training(self.model)
        
        # LoRA config
        self.lora_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            r=lora_r,
            lora_alpha=lora_alpha,
            lora_dropout=0.05,
            target_modules=["q_proj", "v_proj", "k_proj", "o_proj", 
                           "gate_proj", "up_proj", "down_proj"],
            bias="none",
        )
        
        self.model = get_peft_model(self.model, self.lora_config)
        self.output_dir = output_dir
    
    def train(self, dataset, epochs=3, batch_size=4, lr=2e-4):
        # Training with gradient checkpointing
        self.model.gradient_checkpointing_enable()
        
        training_args = TrainingArguments(
            output_dir=self.output_dir,
            num_train_epochs=epochs,
            per_device_train_batch_size=batch_size,
            gradient_accumulation_steps=4,
            learning_rate=lr,
            bf16=True,
            logging_steps=100,
            save_steps=500,
            optim="paged_adamw_8bit",
        )
        
        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=dataset,
        )
        
        trainer.train()
```

## Data Preparation

### 1. Dataset Format

```python
from datasets import Dataset
import json

class DatasetPreparer:
    def __init__(self, tokenizer, max_length=2048):
        self.tokenizer = tokenizer
        self.max_length = max_length
    
    def prepare_instruction_dataset(self, data_path):
        with open(data_path, 'r') as f:
            data = json.load(f)
        
        formatted_data = []
        for item in data:
            prompt = self._format_instruction(
                instruction=item["instruction"],
                input=item.get("input", ""),
                output=item["output"]
            )
            formatted_data.append({"text": prompt})
        
        return Dataset.from_list(formatted_data)
    
    def _format_instruction(self, instruction, input_text, output):
        if input_text:
            return f"""### Instruction:
{instruction}

### Input:
{input_text}

### Response:
{output}"""
        else:
            return f"""### Instruction:
{instruction}

### Response:
{output}"""
    
    def tokenize(self, dataset):
        def tokenize_function(examples):
            return self.tokenizer(
                examples["text"],
                truncation=True,
                max_length=self.max_length,
                padding="max_length",
            )
        
        return dataset.map(tokenize_function, batched=True)
```

### 2. Data Quality Checks

```python
class DataQualityChecker:
    def __init__(self, min_length=10, max_length=4096):
        self.min_length = min_length
        self.max_length = max_length
    
    def check(self, dataset):
        issues = []
        
        for i, item in enumerate(dataset):
            # Length check
            if len(item["text"]) < self.min_length:
                issues.append(f"Item {i}: Too short ({len(item['text'])} chars)")
            
            if len(item["text"]) > self.max_length:
                issues.append(f"Item {i}: Too long ({len(item['text'])} chars)")
            
            # Content check
            if not item["text"].strip():
                issues.append(f"Item {i}: Empty content")
        
        return issues
    
    def clean(self, dataset):
        return dataset.filter(
            lambda x: self.min_length <= len(x["text"]) <= self.max_length
                   and x["text"].strip()
        )
```

## Training Strategies

### 1. Learning Rate Scheduling

```python
from transformers import get_cosine_schedule_with_warmup

def create_scheduler(optimizer, num_training_steps, warmup_ratio=0.1):
    warmup_steps = int(num_training_steps * warmup_ratio)
    return get_cosine_schedule_with_warmup(
        optimizer,
        num_warmup_steps=warmup_steps,
        num_training_steps=num_training_steps
    )
```

### 2. Gradient Accumulation

```python
training_args = TrainingArguments(
    output_dir="./output",
    per_device_train_batch_size=1,  # Small batch
    gradient_accumulation_steps=16,  # Effective batch = 16
    # ...
)
```

### 3. Mixed Precision Training

```python
training_args = TrainingArguments(
    output_dir="./output",
    bf16=True,  # BFloat16 for better stability
    fp16=False,  # Don't use FP16 with BF16
    # ...
)
```

## Evaluation

### 1. Perplexity Evaluation

```python
def evaluate_perplexity(model, tokenizer, dataset):
    model.eval()
    total_loss = 0
    total_tokens = 0
    
    with torch.no_grad():
        for item in dataset:
            inputs = tokenizer(
                item["text"],
                return_tensors="pt",
                truncation=True,
                max_length=2048
            ).to(model.device)
            
            outputs = model(**inputs, labels=inputs["input_ids"])
            total_loss += outputs.loss.item() * inputs["input_ids"].size(1)
            total_tokens += inputs["input_ids"].size(1)
    
    perplexity = torch.exp(torch.tensor(total_loss / total_tokens))
    return perplexity.item()
```

### 2. Task-Specific Evaluation

```python
def evaluate_on_benchmark(model, tokenizer, benchmark_path):
    with open(benchmark_path, 'r') as f:
        benchmark = json.load(f)
    
    results = []
    for item in benchmark:
        prompt = f"### Instruction:\n{item['instruction']}\n\n### Response:\n"
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        outputs = model.generate(
            **inputs,
            max_new_tokens=256,
            temperature=0.7,
            do_sample=True
        )
        
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = response.split("### Response:\n")[-1]
        
        # Evaluate response
        score = evaluate_response(response, item["expected"])
        results.append({
            "instruction": item["instruction"],
            "response": response,
            "expected": item["expected"],
            "score": score
        })
    
    return {
        "average_score": sum(r["score"] for r in results) / len(results),
        "results": results
    }
```

## Hyperparameter Guidelines

| Parameter | Recommended Range | Notes |
|-----------|------------------|-------|
| Learning Rate | 1e-5 to 5e-4 | Lower for full fine-tuning |
| Batch Size | 4 to 32 | Use gradient accumulation |
| Epochs | 1 to 5 | Monitor for overfitting |
| LoRA r | 8 to 64 | Higher for complex tasks |
| LoRA alpha | 2x to 4x r | Common ratio |
| Warmup Ratio | 0.05 to 0.1 | Prevent early instability |
| Weight Decay | 0.01 to 0.1 | Regularization |

## Best Practices

1. **Start Small**: Begin with LoRA before full fine-tuning
2. **Data Quality**: Clean, diverse, high-quality data is crucial
3. **Evaluation**: Use held-out test set for evaluation
4. **Checkpointing**: Save checkpoints frequently
5. **Learning Rate**: Start low, increase if underfitting
6. **Monitor Loss**: Watch for overfitting (loss increasing)
7. **Memory**: Use QLoRA for limited GPU memory
8. **Documentation**: Track all hyperparameters and results

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CUDA OOM | Use QLoRA, reduce batch size |
| Slow training | Enable gradient checkpointing |
| Overfitting | Reduce epochs, add dropout |
| Underfitting | Increase learning rate, more epochs |
| Catastrophic forgetting | Use lower learning rate, LoRA |

## Related Skills

- `prompt-engineering` - Prompt optimization
- `ai-agent-design` - Agent architecture
- `rag-implementation` - RAG systems
- `mcp-server-development` - Model serving

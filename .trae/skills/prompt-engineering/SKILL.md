---
name: "prompt-engineering"
description: "Expert in prompt engineering best practices including CoT, Few-shot, Zero-shot, and advanced prompting techniques for LLMs."
category: "ai-ml"
tags: ["prompt", "engineering", "llm", "optimization"]
---

# Prompt Engineering

Expert in prompt engineering best practices for optimizing LLM outputs.

## Description

Master the art and science of designing effective prompts for large language models. This skill covers advanced techniques including Chain-of-Thought (CoT), Few-shot learning, Zero-shot prompting, and other strategies to maximize LLM performance.

## When to Use

- Optimizing LLM outputs for specific tasks
- Designing system prompts for AI applications
- Improving model accuracy and consistency
- Reducing hallucinations and errors
- Creating reusable prompt templates

## Core Techniques

### 1. Chain-of-Thought (CoT) Prompting

Guide the model through step-by-step reasoning:

```
Problem: A store has 23 apples. They sell 8 and receive a delivery of 15. How many apples do they have?

Let's think step by step:
1. Start with 23 apples
2. Sell 8 apples: 23 - 8 = 15 apples
3. Receive delivery of 15: 15 + 15 = 30 apples
4. Final answer: 30 apples
```

**Best Practices:**
- Use "Let's think step by step" trigger phrase
- Break complex problems into smaller steps
- Show intermediate calculations
- Verify each step before proceeding

### 2. Few-Shot Learning

Provide examples to guide the model:

```
Convert the following sentences to formal English:

Informal: "gonna grab some food"
Formal: "I am going to get some food"

Informal: "can't make it tmrw"
Formal: "I will not be able to attend tomorrow"

Informal: "this is super cool"
Formal: [MODEL OUTPUT]
```

**Example Selection Guidelines:**
- Use 2-5 diverse examples
- Cover edge cases
- Maintain consistent format
- Include both positive and negative examples

### 3. Zero-Shot Prompting

Direct instructions without examples:

```
Task: Classify the sentiment of the following movie review.

Review: "The cinematography was breathtaking, but the plot felt disjointed."

Output only one word: positive, negative, or mixed.
```

**When to Use:**
- Simple classification tasks
- Well-defined output format
- Model has pre-existing knowledge
- Quick prototyping

### 4. Self-Consistency

Generate multiple reasoning paths:

```python
def self_consistency_prompt(problem, n_samples=5):
    responses = []
    for i in range(n_samples):
        prompt = f"""
        Solve this problem. Show your reasoning.
        Problem: {problem}
        
        Solution {i+1}:
        """
        response = llm.generate(prompt, temperature=0.7)
        responses.append(extract_answer(response))
    
    return most_common_answer(responses)
```

### 5. Tree of Thoughts (ToT)

Explore multiple solution branches:

```
Problem: Plan a 3-day trip to Tokyo.

Think of 3 different approaches:
1. Culture-focused itinerary
2. Food-focused itinerary  
3. Nature-focused itinerary

For each approach:
- List top 3 destinations
- Estimate time needed
- Consider logistics

Then choose the best approach and create detailed schedule.
```

### 6. ReAct (Reasoning + Acting)

Combine reasoning with tool use:

```
Question: What is the population of the capital of France?

Thought 1: I need to find the capital of France.
Action 1: Search[capital of France]
Observation 1: Paris is the capital of France.

Thought 2: Now I need to find the population of Paris.
Action 2: Search[population of Paris 2024]
Observation 2: Paris has approximately 2.1 million residents.

Thought 3: I have the answer.
Answer: The capital of France is Paris, with a population of approximately 2.1 million.
```

## Advanced Patterns

### System Prompt Design

```python
SYSTEM_PROMPT = """
You are an expert software architect with 20 years of experience.

## Role
- Design scalable software systems
- Provide clear technical recommendations
- Consider trade-offs and constraints

## Communication Style
- Be concise but thorough
- Use diagrams when helpful
- Provide code examples

## Constraints
- Never recommend deprecated technologies
- Always consider security implications
- Provide alternatives when possible

## Output Format
1. Summary
2. Detailed Analysis
3. Recommendations
4. Code Examples (if applicable)
"""
```

### Structured Output Prompting

```
Extract product information from the text below.

Output format:
{
  "name": "product name",
  "price": number,
  "features": ["feature1", "feature2"],
  "rating": number (1-5)
}

Text: "The UltraWidget Pro is our flagship product at $299. 
It features wireless connectivity, voice control, and a 5-year warranty.
Customers rate it 4.7 out of 5 stars."
```

### Role-Based Prompting

```
You are three different experts commenting on this code:

1. Security Expert: Focus on vulnerabilities
2. Performance Expert: Focus on optimization
3. Maintainability Expert: Focus on code quality

Code:
```python
def process_data(data):
    result = []
    for item in data:
        result.append(eval(item))
    return result
```

Provide each expert's analysis.
```

## Prompt Optimization Strategies

### 1. Iterative Refinement

```python
def optimize_prompt(initial_prompt, test_cases, iterations=5):
    current_prompt = initial_prompt
    
    for i in range(iterations):
        results = evaluate_prompt(current_prompt, test_cases)
        feedback = analyze_failures(results)
        current_prompt = refine_prompt(current_prompt, feedback)
    
    return current_prompt
```

### 2. A/B Testing

```python
def ab_test_prompts(prompt_a, prompt_b, test_cases):
    results_a = [evaluate(prompt_a, case) for case in test_cases]
    results_b = [evaluate(prompt_b, case) for case in test_cases]
    
    return {
        'prompt_a_accuracy': calculate_accuracy(results_a),
        'prompt_b_accuracy': calculate_accuracy(results_b),
        'winner': 'a' if accuracy_a > accuracy_b else 'b'
    }
```

### 3. Prompt Templates

```python
class PromptTemplate:
    def __init__(self, template, variables):
        self.template = template
        self.variables = variables
    
    def render(self, **kwargs):
        return self.template.format(**kwargs)

# Usage
template = PromptTemplate(
    "Summarize the following {content_type} in {word_count} words:\n\n{content}",
    ["content_type", "word_count", "content"]
)

prompt = template.render(
    content_type="article",
    word_count=50,
    content="..."
)
```

## Common Pitfalls

### 1. Ambiguous Instructions

❌ Bad:
```
Write something about AI.
```

✅ Good:
```
Write a 300-word blog post about the impact of AI on healthcare, 
focusing on diagnostic accuracy and patient outcomes. 
Include 2-3 specific examples.
```

### 2. Missing Constraints

❌ Bad:
```
Generate a list of fruits.
```

✅ Good:
```
Generate a list of 10 tropical fruits.
Format as a numbered list.
Include the scientific name for each fruit.
```

### 3. Inconsistent Examples

❌ Bad:
```
Examples:
- Input: happy, Output: positive
- Input: sad, Sentiment: negative
- Input: angry, Result: negative
```

✅ Good:
```
Examples:
- Input: happy, Output: positive
- Input: sad, Output: negative
- Input: angry, Output: negative
```

## Model-Specific Considerations

### GPT-4 / GPT-4o
- Responds well to detailed system prompts
- Can handle complex multi-step instructions
- Benefits from explicit output format specification

### Claude
- Prefers clear role definitions
- Works well with XML-style tags
- Benefits from explicit thinking instructions

### Gemini
- Good with multimodal inputs
- Responds well to structured prompts
- Benefits from explicit safety guidelines

## Best Practices Summary

1. **Be Specific**: Clear, detailed instructions
2. **Provide Context**: Background information helps
3. **Use Examples**: Few-shot learning improves accuracy
4. **Specify Format**: Define expected output structure
5. **Iterate**: Test and refine prompts
6. **Version Control**: Track prompt changes
7. **Document**: Explain prompt design decisions
8. **Test Edge Cases**: Verify robustness

## Related Skills

- `ai-agent-design` - AI agent design patterns
- `instruction-refinement` - Instruction optimization
- `prompt-composition` - Multi-prompt composition
- `context-compressor` - Context optimization

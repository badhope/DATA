---
name: "ai-agent-design"
description: "Expert in AI agent design patterns including ReAct, Plan-and-Execute, Tool Use, and autonomous agent architectures."
category: "ai-ml"
tags: ["ai", "agent", "design", "architecture"]
---

# AI Agent Design

Expert in designing intelligent AI agents with advanced reasoning and tool-use capabilities.

## Description

Design and implement sophisticated AI agents that can reason, plan, and execute complex tasks autonomously. Covers state-of-the-art patterns including ReAct, Plan-and-Execute, and multi-agent systems.

## When to Use

- Building autonomous AI agents
- Designing tool-using AI systems
- Creating multi-step reasoning systems
- Implementing AI assistants with complex capabilities
- Developing AI-driven automation

## Core Agent Patterns

### 1. ReAct (Reasoning + Acting)

Combine reasoning traces with action execution:

```python
class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
        self.memory = []
    
    def run(self, question, max_iterations=10):
        for _ in range(max_iterations):
            # Generate thought and action
            response = self.llm.generate(
                self._build_prompt(question),
                stop=["Observation:"]
            )
            
            thought, action = self._parse_response(response)
            self.memory.append({"thought": thought, "action": action})
            
            if action["type"] == "finish":
                return action["answer"]
            
            # Execute action
            observation = self._execute_action(action)
            self.memory.append({"observation": observation})
        
        return "Max iterations reached"
    
    def _build_prompt(self, question):
        return f"""
        Question: {question}
        
        Previous steps:
        {self._format_memory()}
        
        Think about what to do next, then take an action.
        Available actions: {list(self.tools.keys())}
        
        Thought: [your reasoning]
        Action: [action_name[args]]
        """
```

**Best Practices:**
- Limit iteration count to prevent infinite loops
- Store reasoning traces for debugging
- Validate action outputs before proceeding

### 2. Plan-and-Execute

Separate planning from execution:

```python
class PlanAndExecuteAgent:
    def __init__(self, llm, executor):
        self.llm = llm
        self.executor = executor
    
    def run(self, goal):
        # Planning phase
        plan = self._create_plan(goal)
        
        # Execution phase
        results = []
        for step in plan.steps:
            result = self.executor.execute(step)
            results.append(result)
            
            # Replan if needed
            if not result.success:
                plan = self._replan(goal, results)
        
        return self._synthesize_results(results)
    
    def _create_plan(self, goal):
        prompt = f"""
        Create a step-by-step plan to achieve: {goal}
        
        Output format:
        1. [Step 1 description]
        2. [Step 2 description]
        ...
        
        Each step should be:
        - Specific and actionable
        - Independent where possible
        - Verifiable
        """
        return self.llm.generate(prompt)
    
    def _replan(self, goal, failed_results):
        prompt = f"""
        Original goal: {goal}
        Failed steps: {failed_results}
        
        Create a new plan that addresses the failures.
        """
        return self.llm.generate(prompt)
```

**When to Use:**
- Complex multi-step tasks
- Tasks with dependencies
- When planning quality is critical

### 3. Tool-Using Agent

Enable agents to use external tools:

```python
class ToolUsingAgent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = {
            tool.name: tool for tool in tools
        }
    
    def run(self, task):
        # Tool selection
        tool_descriptions = self._describe_tools()
        
        prompt = f"""
        Task: {task}
        
        Available tools:
        {tool_descriptions}
        
        Select the appropriate tool and provide arguments.
        
        Output format:
        Tool: [tool_name]
        Arguments: {{"arg1": "value1", ...}}
        """
        
        response = self.llm.generate(prompt)
        tool_name, args = self._parse_tool_call(response)
        
        # Execute tool
        if tool_name in self.tools:
            return self.tools[tool_name].execute(**args)
        
        raise ValueError(f"Unknown tool: {tool_name}")
```

**Tool Design Principles:**
- Single responsibility per tool
- Clear input/output schemas
- Comprehensive error handling
- Documented capabilities

### 4. Memory-Augmented Agent

Agents with persistent memory:

```python
class MemoryAugmentedAgent:
    def __init__(self, llm, memory_store):
        self.llm = llm
        self.memory = memory_store
    
    def run(self, query):
        # Retrieve relevant memories
        relevant_memories = self.memory.search(query, k=5)
        
        # Generate response with context
        prompt = f"""
        Previous relevant context:
        {self._format_memories(relevant_memories)}
        
        Current query: {query}
        
        Provide a helpful response that considers the context.
        """
        
        response = self.llm.generate(prompt)
        
        # Store new memory
        self.memory.add({
            "query": query,
            "response": response,
            "timestamp": datetime.now()
        })
        
        return response
```

### 5. Multi-Agent System

Coordinate multiple specialized agents:

```python
class MultiAgentSystem:
    def __init__(self, agents, coordinator):
        self.agents = agents
        self.coordinator = coordinator
    
    def run(self, task):
        # Decompose task
        subtasks = self.coordinator.decompose(task)
        
        # Assign to agents
        assignments = self._assign_tasks(subtasks)
        
        # Execute in parallel where possible
        results = {}
        for agent_name, subtask in assignments.items():
            results[agent_name] = self.agents[agent_name].run(subtask)
        
        # Synthesize results
        return self.coordinator.synthesize(results)
    
    def _assign_tasks(self, subtasks):
        assignments = {}
        for subtask in subtasks:
            best_agent = self._find_best_agent(subtask)
            assignments[best_agent] = subtask
        return assignments
```

## Agent Architecture Components

### 1. Perception Module

```python
class PerceptionModule:
    def __init__(self, sensors):
        self.sensors = sensors
    
    def perceive(self, environment):
        observations = {}
        for sensor in self.sensors:
            observations[sensor.name] = sensor.read(environment)
        return observations
```

### 2. Reasoning Module

```python
class ReasoningModule:
    def __init__(self, llm, strategy="react"):
        self.llm = llm
        self.strategy = strategy
    
    def reason(self, observations, goal):
        if self.strategy == "react":
            return self._react_reasoning(observations, goal)
        elif self.strategy == "plan":
            return self._plan_reasoning(observations, goal)
```

### 3. Action Module

```python
class ActionModule:
    def __init__(self, actuators):
        self.actuators = actuators
    
    def execute(self, action):
        actuator = self.actuators.get(action.type)
        if actuator:
            return actuator.execute(action.params)
        raise ValueError(f"Unknown action type: {action.type}")
```

### 4. Memory Module

```python
class MemoryModule:
    def __init__(self, short_term_capacity=10, long_term_capacity=1000):
        self.short_term = deque(maxlen=short_term_capacity)
        self.long_term = VectorStore(capacity=long_term_capacity)
    
    def add(self, memory):
        self.short_term.append(memory)
        self.long_term.add(memory)
    
    def recall(self, query, k=5):
        return self.long_term.search(query, k=k)
```

## Advanced Patterns

### Hierarchical Agents

```python
class HierarchicalAgent:
    def __init__(self, manager, workers):
        self.manager = manager
        self.workers = workers
    
    def run(self, task):
        # Manager decomposes task
        subtasks = self.manager.decompose(task)
        
        # Workers execute subtasks
        results = []
        for subtask in subtasks:
            worker = self._select_worker(subtask)
            result = worker.run(subtask)
            results.append(result)
        
        # Manager synthesizes results
        return self.manager.synthesize(results)
```

### Self-Reflective Agents

```python
class SelfReflectiveAgent:
    def __init__(self, base_agent, reflection_llm):
        self.base_agent = base_agent
        self.reflector = reflection_llm
    
    def run(self, task, max_reflections=3):
        for i in range(max_reflections):
            # Generate initial response
            response = self.base_agent.run(task)
            
            # Reflect on response
            reflection = self._reflect(task, response)
            
            if reflection["quality"] == "good":
                return response
            
            # Improve based on reflection
            task = self._incorporate_feedback(task, reflection)
        
        return response
    
    def _reflect(self, task, response):
        prompt = f"""
        Task: {task}
        Response: {response}
        
        Evaluate the response quality:
        1. Does it fully address the task?
        2. Is it accurate?
        3. Is it well-structured?
        
        Quality: [good/needs_improvement]
        Issues: [list any issues]
        Suggestions: [how to improve]
        """
        return self.reflector.generate(prompt)
```

### Tool-Creating Agents

```python
class ToolCreatingAgent:
    def __init__(self, llm, tool_registry):
        self.llm = llm
        self.tools = tool_registry
    
    def run(self, task):
        # Check if existing tools suffice
        if self._can_use_existing_tools(task):
            return self._use_existing_tools(task)
        
        # Create new tool
        new_tool = self._create_tool(task)
        self.tools.register(new_tool)
        
        return new_tool.execute(task)
    
    def _create_tool(self, task):
        prompt = f"""
        Task: {task}
        
        No existing tool can handle this task.
        Design a new tool to solve it.
        
        Output:
        - Tool name
        - Input schema
        - Implementation code
        """
        return self.llm.generate(prompt)
```

## Evaluation Metrics

### Task Completion Rate

```python
def evaluate_completion_rate(agent, test_cases):
    completed = 0
    for case in test_cases:
        result = agent.run(case.task)
        if case.verify(result):
            completed += 1
    return completed / len(test_cases)
```

### Efficiency Metrics

```python
def evaluate_efficiency(agent, test_cases):
    metrics = []
    for case in test_cases:
        start_time = time.time()
        result = agent.run(case.task)
        elapsed = time.time() - start_time
        
        metrics.append({
            "time": elapsed,
            "steps": agent.step_count,
            "tokens": agent.token_count
        })
    return aggregate_metrics(metrics)
```

### Error Recovery Rate

```python
def evaluate_error_recovery(agent, test_cases_with_errors):
    recovered = 0
    for case in test_cases_with_errors:
        try:
            result = agent.run(case.task)
            if case.verify(result):
                recovered += 1
        except Exception:
            pass
    return recovered / len(test_cases_with_errors)
```

## Best Practices

1. **Clear Goal Definition**: Define success criteria upfront
2. **Tool Documentation**: Document all available tools
3. **Error Handling**: Graceful degradation on failures
4. **Observability**: Log reasoning traces and actions
5. **Iteration Limits**: Prevent infinite loops
6. **Memory Management**: Balance context and relevance
7. **Testing**: Comprehensive test coverage
8. **Human Oversight**: Escalation paths for edge cases

## Related Skills

- `prompt-engineering` - Prompt optimization
- `mcp-tool-creation` - MCP tool design
- `rag-implementation` - Retrieval-augmented generation
- `self-memory-manager` - Memory management

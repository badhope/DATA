---
id: skill-refactoring-extract-module-v1
name: Extract Reusable Module
summary: 从现有代码中提取可复用模块的专业流程
type: skill
category: refactoring
tags: [refactoring, module-extraction, reusability, dry, extraction]
keywords: [提取模块, 复用, DRY, 代码组织]
intent: 识别并提取代码中的可复用组件，建立模块化架构
use_cases:
  - 发现重复代码需要抽象时
  - 需要建立内部库时
  - 拆分大型系统时
  - 建立共享组件时
inputs:
  - name: code_snippets
    type: array
    required: true
    description: 需要分析的代码片段
  - name: context
    type: object
    required: false
    description: 额外上下文信息
outputs:
  - name: abstraction_plan
    type: markdown
    description: 抽象计划
  - name: extracted_module
    type: code
    description: 提取的模块代码
  - name: integration_guide
    type: markdown
    description: 集成指南
prerequisites:
  - 识别出至少2个相似的代码片段
  - 理解代码的依赖关系
steps:
  - step: 1
    action: 收集并比较相似代码片段
  - step: 2
    action: 识别共同模式和差异点
  - step: 3
    action: 设计抽象接口
  - step: 4
    action: 实现可参数化的模块
  - step: 5
    action: 更新原始代码使用新模块
  - step: 6
    action: 验证功能等价性
examples:
  - input: "multiple similar data parsing functions"
    output: "unified parser module with configurable options"
    notes: 展示如何将多个相似解析函数统一
related_skills:
  - skill-refactoring-main-v1
  - skill-coding-v1
related_prompts:
  - prompt-task-refactoring-extract-reusable-module
notes: |
  关键点：
  - 先抽象接口再实现
  - 保持向后兼容
  - 考虑扩展性设计
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Extract Reusable Module Skill

从现有代码中提取可复用模块的专门指南。

## 何时需要提取模块

### 信号识别

- 同一模式出现3次以上
- 修改一处需要同步改多处
- 多个项目需要相同功能
- 代码属于核心业务逻辑

### 收益评估

| 场景 | 收益 | 成本 |
|------|------|------|
| 重复代码>200行 | 高 | 中 |
| 核心业务逻辑 | 高 | 低 |
| 一次性功能 | 低 | 高 |
| 实验性代码 | 低 | 高 |

## 提取流程

### Step 1: 代码收集与分析

```markdown
## 收集的代码片段

### 片段1 (user_service.py:45)
```python
def parse_user_name(raw):
    return raw.strip().title()

### 片段2 (admin_service.py:78)
```python
def parse_admin_name(raw):
    return raw.strip().title()

### 片段3 (profile_service.py:23)
```python
def parse_profile_name(raw):
    return raw.strip().title()
```
```

### Step 2: 模式识别

```markdown
## 共同模式
- 都调用 .strip()
- 都调用 .title()
- 输入都是原始字符串

## 差异点
- 函数命名不同
- 文档字符串不同
- 可能有不同验证需求
```

### Step 3: 接口设计

```python
# name_parser.py
from typing import Optional, Callable

class NameParser:
    def __init__(
        self,
        normalizer: Optional[Callable] = str.title,
        strip: bool = True
    ):
        self.normalizer = normalizer or (lambda x: x)
        self.strip = strip

    def parse(self, raw: str) -> str:
        result = raw
        if self.strip:
            result = result.strip()
        return self.normalizer(result)

# 预置常用配置
default_parser = NameParser()
email_parser = NameParser(normalizer=str.lower)
```

### Step 4: 实施

```python
# user_service.py
from name_parser import default_parser

def parse_user_name(raw):
    return default_parser.parse(raw)

# admin_service.py
from name_parser import default_parser

def parse_admin_name(raw):
    return default_parser.parse(raw)
```

## 常见抽象模式

### 1. 函数族抽象

```python
# Before: 多个相似的验证函数
def validate_email(email): ...
def validate_phone(phone): ...
def validate_url(url): ...

# After: 统一验证器
class Validator:
    PATTERNS = {
        'email': r'^[\w\.-]+@[\w\.-]+\.\w+$',
        'phone': r'^\+?[\d\s-]{10,}$',
        'url': r'^https?://[\w\.-]+\.\w+',
    }

    def __init__(self, field_type):
        self.pattern = self.PATTERNS[field_type]

    def validate(self, value):
        import re
        return bool(re.match(self.pattern, value))
```

### 2. 数据转换抽象

```python
# Before: 多个转换函数
def to_snake_case(camel): ...
def to_camel_case(snake): ...

# After: 统一转换器
class CaseConverter:
    @staticmethod
    def to_snake(name):
        import re
        return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

    @staticmethod
    def to_camel(name):
        components = name.split('_')
        return components[0] + ''.join(x.title() for x in components[1:])
```

### 3. 存储操作抽象

```python
# Before: 分散的存储操作
class UserRepo:
    def save(self, user): ...
    def find(self, id): ...

class ProductRepo:
    def save(self, product): ...
    def find(self, id): ...

# After: 通用Repository基类
from abc import ABC, abstractmethod

class Repository(ABC):
    @abstractmethod
    def save(self, entity): ...

    @abstractmethod
    def find(self, id): ...

    def find_all(self, limit=100):
        # 通用实现
        ...

class UserRepository(Repository):
    def save(self, user):
        # 特定实现
        ...
```

## 质量检查清单

- [ ] 接口设计是否符合单一职责？
- [ ] 参数是否都有合理默认值？
- [ ] 是否易于测试？
- [ ] 文档是否完整？
- [ ] 是否考虑了扩展需求？
- [ ] 向后兼容性如何？

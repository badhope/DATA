---
id: prompt-coding-generate-from-interface
name: Generate Code from Interface Description
summary: 基于接口描述生成实现代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: generate
tags:
  - interface
  - implementation
  - api
  - contract
keywords:
  - interface
  - contract
  - implement
  - API
  - schema
intent: |
  基于接口/契约描述生成完整的实现代码。
  适用于已有接口定义但需要具体实现的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - interface_description: string (required) 接口描述
  - interface_format: string (required) 接口格式 (TypeScript interface/OpenAPI/JSON Schema/gRPC proto)
  - target_language: string (required) 目标编程语言
  - implementation_style: string (optional) 实现风格（mock/real/placeholder）
output_requirements:
  - code: string 生成的实现代码
  - exports: string 导出的接口/类型
  - dependencies: string[] 需要的依赖
  - usage_example: string 使用示例
tool_requirements:
  - Read 了解项目现有实现模式
  - Write 创建实现文件
preconditions: |
  - 接口描述应当包含完整的字段定义
  - 目标语言应当与项目技术栈一致
anti_patterns: |
  - 不要实现接口之外的方法
  - 不要添加硬编码的数据或逻辑
  - 不要忽略类型定义的任何字段
failure_modes:
  - 接口歧义: 指出具体不明确的字段定义
  - 类型不匹配: 提出类型转换建议
  - 依赖冲突: 建议替代实现方案
self_check: |
  - [ ] 是否实现了接口中的所有字段？
  - [ ] 类型是否完全匹配？
  - [ ] 方法签名是否与接口一致？
  - [ ] 是否遵循了目标语言的类型系统？
  - [ ] 是否有未处理的边界情况？
related_skills:
  - skill-coding
  - skill-tool-use
related_workflows:
  - workflow-implementation
  - workflow-contract-to-code
related_prompts:
  - prompt-coding-implement-from-spec
  - prompt-coding-generate-from-requirement
  - prompt-testing-write-api
---

# Context

接口定义是代码协作的契约。当已有明确的接口描述时，需要生成符合这个契约的实现代码。这个 prompt 确保生成的代码完全符合接口定义，同时保持项目的代码风格。

# Prompt Body

你是一个软件工程师。用户的输入是一份接口定义。请基于这个接口生成实现代码。

## 输入信息

```
接口描述：
{interface_description}

接口格式：{interface_format}
目标语言：{target_language}
实现风格：{implementation_style}
```

## 接口格式说明

根据不同的 `{interface_format}`，采用不同的解析方式：

### TypeScript Interface
```typescript
interface UserService {
  getUser(id: string): Promise<User>;
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(id: string, data: UpdateUserInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
```

### OpenAPI Schema
```yaml
paths:
  /users/{id}:
    get:
      responses:
        200:
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
```

### JSON Schema
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" }
  },
  "required": ["id", "name"]
}
```

### gRPC Proto
```protobuf
service UserService {
  rpc GetUser(GetUserRequest) returns (User);
  rpc CreateUser(CreateUserRequest) returns (User);
}
```

## 工作流程

1。 **解析接口**：理解所有字段、方法和类型
2。 **确定实现范围**：区分需要实现的部分和由其他服务提供的部分
3。 **设计实现方案**：确定数据存储、依赖服务、错误处理
4。 **编写代码**：生成符合接口契约的实现
5。 **自检**：验证与接口定义的一致性

## 输出要求

### 1。 接口实现
```language
{target_language}
{代码内容}
```

### 2。 辅助类型定义（如果需要）
```language
{target_language}
{类型定义}
```

### 3。 依赖说明
列出实现所需的依赖和外部服务。

### 4。 使用示例
展示如何使用这个实现。

### 5。 注意事项
说明实现中的设计决策和限制。

## 约束条件

— 必须完全符合接口定义，不能添加或省略任何字段/方法
— 类型必须与接口定义一致
— 方法签名必须与接口一致
— 如果是 mock 实现，使用合理的假数据
— 如果是 placeholder 实现，使用 TODO 标注待完成部分
- 错误处理应当符合接口定义的错误码
---
id: prompt-task-documentation-for-code-generate-api-usage-documentation-v1
name: Generate API Usage Documentation
summary: 为 API 生成使用文档，包括端点说明、参数、返回值、示例
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: documentation-for-code
tags:
  - documentation
  - API
  - endpoint
  - usage
keywords:
  - API文档
  - 接口文档
  - 使用说明
  - REST API
intent: |
  指导 AI 为 API 生成完整的使用文档。
  强调 API 文档必须清晰、完整、易于查阅。
  核心原则：好的 API 文档让开发者能快速集成。
applicable_models:
  - "*"
input_requirements:
  - api_definition: object API 定义
  - api_type: string API 类型
  - target_audience: string 目标读者
output_requirements:
  - api_documentation: object API 文档
  - endpoint_docs: array 端点文档
  - request_response_examples: array 请求响应示例
  - error_handling_doc: object 错误处理文档
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析 API 定义)
preconditions:
  - 有 API 需要生成文档
anti_patterns:
  - 缺少示例
  - 参数说明不清晰
  - 错误码不完整
failure_modes:
  - 文档不准确：与实际 API 同步
  - 结构混乱：清晰的结构
  - 示例缺失：提供完整示例
self_check: |
  生成前自检：
  □ 是否理解了 API 的功能和用途？
  □ 是否覆盖了所有端点？
  □ 是否提供了足够的示例？
  □ 是否包含了错误处理说明？
related_skills:
  - skill-documentation-for-code
  - skill-coding
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-documentation-for-code-document-function-or-class-clearly
  - prompt-task-documentation-for-code-generate-readme-for-code-module
---

# Context

API 文档是开发者了解和使用 API 的主要途径。一份好的 API 文档应该让开发者能快速理解 API 的功能、正确调用 API、并能正确处理各种情况。本 prompt 的核心目标是：**指导 AI 为 API 生成完整、清晰、实用的使用文档**。

# Prompt Body

## 阶段 1：API 分析

### 1.1 API 概览

```markdown
## API 概览

### 基本信息
| 项目 | 内容 |
|------|------|
| API 名称 | [名称] |
| API 版本 | [版本] |
| 基础 URL | [URL] |
| 协议 | [协议] |
| 认证方式 | [方式] |

### API 功能
```markdown
**核心功能**:
1. [功能1]
2. [功能2]
3. [功能3]

**适用场景**:
- [场景1]
- [场景2]
```

### 认证方式
| # | 方式 | 说明 | 使用场景 |
|---|------|------|----------|
| 1 | [方式] | [说明] | [场景] |
```

### 1.2 端点清单

```markdown
## 端点清单

### 端点列表
| 方法 | 路径 | 功能 | 认证 |
|------|------|------|------|
| GET | /users | 获取用户列表 | 需要 |
| POST | /users | 创建用户 | 需要 |
| GET | /users/{id} | 获取用户详情 | 需要 |
| PUT | /users/{id} | 更新用户 | 需要 |
| DELETE | /users/{id} | 删除用户 | 需要 |
```

### 1.3 数据模型

```markdown
## 数据模型

### 请求模型
| # | 字段 | 类型 | 必需 | 说明 |
|---|------|------|------|------|
| 1 | [字段] | [类型] | [是/否] | [说明] |

### 响应模型
| # | 字段 | 类型 | 说明 |
|---|------|------|------|
| 1 | [字段] | [类型] | [说明] |

### 错误模型
| # | 字段 | 类型 | 说明 |
|---|------|------|------|
| 1 | [字段] | [类型] | [说明] |
```

## 阶段 2：端点文档结构

### 2.1 端点文档模板

```markdown
## 端点文档模板

### [HTTP 方法] [端点路径]
```markdown
**功能**: [端点功能描述]

**描述**: [详细描述端点的功能、用途和使用场景]

### 请求
**Headers**:
| Header | 类型 | 必需 | 说明 |
|--------|------|------|------|
| Authorization | string | 是 | Bearer token |
| Content-Type | string | 是 | application/json |

**Path Parameters**:
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| [参数] | [类型] | [是/否] | [说明] |

**Query Parameters**:
| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| [参数] | [类型] | [是/否] | [值] | [说明] |

**Request Body**:
```json
{
  "[字段]": "[说明]"
}
```

### 响应

**Success Response**:
```json
{
  "[字段]": "[值]"
}
```

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |

**Error Responses**:
| 状态码 | 说明 | 错误码 |
|--------|------|--------|
| 400 | 请求参数错误 | INVALID_PARAMS |
| 401 | 未认证 | UNAUTHORIZED |
| 404 | 资源不存在 | NOT_FOUND |
| 500 | 服务器错误 | INTERNAL_ERROR |

### 示例

**Request**:
```bash
curl -X [METHOD] '[URL]' \
  -H 'Authorization: Bearer [token]' \
  -H 'Content-Type: application/json' \
  -d '[body]'
```

**Response**:
```json
{
  "[响应字段]": "[值]"
}
```
```
```

## 阶段 3：认证文档

### 3.1 认证方式

```markdown
## 认证方式

### Bearer Token
```markdown
**Header**: `Authorization: Bearer <token>`

**获取 Token**:
```bash
POST /auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

**响应**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```
```

### API Key
```markdown
**Header**: `X-API-Key: <api_key>`

**使用方式**:
```bash
curl -X GET '[URL]' \
  -H 'X-API-Key: your-api-key'
```
```

### OAuth 2.0
```markdown
**授权流程**:
1. 引导用户到授权页面
2. 用户授权后获得授权码
3. 用授权码换取访问令牌

**授权 URL**:
```
https://auth.example.com/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=read write
```
```
```

## 阶段 4：错误处理文档

### 4.1 错误码

```markdown
## 错误码

### 错误响应格式
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

### 错误码列表
| 错误码 | HTTP 状态码 | 说明 | 处理建议 |
|--------|-------------|------|----------|
| INVALID_PARAMS | 400 | 请求参数错误 | 检查参数格式和必填项 |
| UNAUTHORIZED | 401 | 未认证或认证过期 | 重新获取 Token |
| FORBIDDEN | 403 | 无权限 | 检查权限配置 |
| NOT_FOUND | 404 | 资源不存在 | 检查资源 ID |
| RATE_LIMITED | 429 | 请求过于频繁 | 降低请求频率 |
| INTERNAL_ERROR | 500 | 服务器错误 | 联系技术支持 |
```

### 4.2 重试策略

```markdown
## 重试策略

### 推荐重试条件
| 条件 | 重试次数 | 间隔 |
|------|----------|------|
| 网络错误 | 3 次 | 1s, 2s, 4s |
| 429 Rate Limited | 3 次 | 5s, 10s, 30s |
| 5xx 错误 | 3 次 | 1s, 2s, 4s |

### 不推荐重试的条件
- 4xx 客户端错误（除了 429）
- POST/PUT/DELETE 操作（除非要幂等）
- 已经成功的请求
```

## 阶段 5：完整 API 文档示例

### 5.1 OpenAPI 格式

```markdown
## OpenAPI 格式

```yaml
openapi: 3.0.0
info:
  title: [API名称]
  version: [版本]
  description: [API描述]

servers:
  - url: https://api.example.com/v1
    description: 生产环境
  - url: https://staging-api.example.com/v1
    description: 测试环境

paths:
  /users:
    get:
      summary: 获取用户列表
      tags:
        - Users
      security:
        - bearerAuth: []
      parameters:
        - name: page
          in: query
          schema:
            type: integer
          description: 页码
        - name: limit
          in: query
          schema:
            type: integer
          description: 每页数量
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```
```

### 5.2 Markdown 格式

```markdown
## Markdown API 文档

# 用户管理 API

## 认证

所有 API 请求需要在 Header 中包含认证信息：

```
Authorization: Bearer <your-token>
```

## 用户端点

### 获取用户列表

```
GET /api/v1/users
```

**Query 参数**:

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| limit | int | 否 | 20 | 每页数量 |

**响应示例**:

```json
{
  "data": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### 创建用户

```
POST /api/v1/users
```

**请求体**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**响应示例**:

```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `api_definition` | API 定义 | `{endpoints: [...], models: [...]}` |
| `api_type` | API 类型 | `"REST"` |
| `target_audience` | 目标读者 | `"前端开发"` |

# Usage Notes

1. **结构清晰**：按逻辑组织端点文档
2. **示例完整**：提供可运行的完整示例
3. **错误码完整**：覆盖所有可能的错误情况
4. **易于查阅**：使用表格和代码块提高可读性
5. **版本管理**：标注不同版本的差异

# Example Input

```yaml
api_definition:
  name: "用户管理 API"
  version: "v1"
  baseUrl: "https://api.example.com/v1"
  auth: "Bearer Token"
  endpoints:
    - method: "GET"
      path: "/users"
      description: "获取用户列表"
api_type: "REST"
target_audience: "前端开发"
```

# Example Output

```yaml
api_documentation:
  title: "用户管理 API"
  version: "v1"
  baseUrl: "https://api.example.com/v1"
  authentication: "Bearer Token"

endpoint_docs:
  - method: "GET"
    path: "/users"
    summary: "获取用户列表"
    parameters:
      - name: "page"
        type: "integer"
        required: false
        default: 1
      - name: "limit"
        type: "integer"
        required: false
        default: 20

request_response_examples:
  - scenario: "获取用户列表"
    request: |
      GET /api/v1/users?page=1&limit=20
      Authorization: Bearer <token>
    response: |
      200 OK
      {"data": [...], "pagination": {...}}

error_handling_doc:
  error_codes:
    - code: "NOT_FOUND"
      status: 404
      message: "用户不存在"
```

---
id: skill-documentation-main-v1
name: Documentation Generation
summary: 代码与项目文档的自动生成与管理指南
type: skill
category: documentation
tags: [documentation, docs, api-docs, readme, guide, specification]
keywords: [文档, API文档, README, 指南, 规范]
intent: 为代码和项目生成完整、规范、易维护的文档
use_cases:
  - 需要生成API文档时
  - 需要编写README时
  - 需要创建内部文档时
  - 需要更新遗留代码文档时
inputs:
  - name: target
    type: string
    required: true
    description: 文档目标（代码/项目/API）
  - name: doc_type
    type: string
    required: true
    description: 文档类型
  - name: audience
    type: string
    required: false
    description: 目标读者
outputs:
  - name: documentation
    type: markdown
    description: 生成的文档内容
  - name: doc_structure
    type: object
    description: 文档结构建议
prerequisites:
  - 理解代码或项目结构
  - 了解文档规范
steps:
  - step: 1
    action: 分析目标代码或项目
  - step: 2
    action: 确定文档结构和风格
  - step: 3
    action: 生成文档内容
  - step: 4
    action: 审查和优化
examples:
  - input: "REST API endpoint with request/response"
    output: "complete OpenAPI spec + usage examples"
    notes: 展示API文档生成
related_skills:
  - skill-coding-v1
  - skill-research-v1
related_prompts:
  - prompt-task-documentation-generate-api-docs
  - prompt-task-documentation-generate-code-docs
notes: |
  关键原则：
  - 文档与代码保持同步
  - 读者视角写作
  - 简洁明了，避免冗余
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Documentation Generation Skill

代码与项目文档生成的完整指南。

## 文档类型体系

### 文档金字塔

```
                    ▲
                   /│\        愿景/战略文档
                  / │ \          (少量)
                 /  │  \
                /───┼---\     架构/设计文档
               /    │    \       (少量)
              /     │     \
             /──────┼──────\  参考/教程文档
            /       │       \    (中量)
           /────────┼────────\
          /         │         \ API/代码文档
         /──────────┼──────────\   (大量)
        /           │           \
```

## README 文档

### 标准README结构

```markdown
# Project Name

> 一句话项目描述

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](VERSION)

## 目录

- [特性](#特性)
- [快速开始](#快速开始)
- [安装](#安装)
- [使用](#使用)
- [API参考](#api参考)
- [配置](#配置)
- [贡献](#贡献)
- [许可证](#许可证)

## 特性

- ✨ 特性1简述
- 🚀 特性2简述
- 🔒 特性3简述

## 快速开始

### 前置要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装

\`\`\`bash
npm install project-name
\`\`\`

### 使用

\`\`\`javascript
import { feature } from 'project-name';

const result = feature('input');
console.log(result);
\`\`\`

## API参考

### `feature(input)`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| input | string | 是 | 输入描述 |

**返回**: `string`

**示例**:

\`\`\`javascript
feature('test'); // => 'processed: test'
\`\`\`

## 配置

\`\`\`javascript
{
  "option1": "value1",
  "option2": "value2"
}
\`\`\`

## 贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing`)
5. 创建 Pull Request

## 许可证

MIT © [Author](https://github.com/author)
```

## API 文档

### OpenAPI 3.0 规范

```yaml
openapi: 3.0.3
info:
  title: User Management API
  version: 1.0.0
  description: 用户管理服务API

servers:
  - url: https://api.example.com/v1
    description: Production

paths:
  /users:
    get:
      summary: 获取用户列表
      tags:
        - Users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        username:
          type: string
        email:
          type: string
          format: email
        created_at:
          type: string
          format: date-time

    UserList:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/User'
        pagination:
          type: object
          properties:
            page:
              type: integer
            limit:
              type: integer
            total:
              type: integer

  responses:
    Unauthorized:
      description: 未授权
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
```

### Markdown API 文档

```markdown
# User API

## 获取用户列表

获取系统中所有用户的列表。

**Endpoint**: `GET /api/v1/users`

### Query 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| page | integer | 1 | 页码 |
| limit | integer | 20 | 每页数量 |
| sort | string | created_at | 排序字段 |
| order | string | desc | 排序方向 |

### 请求示例

\`\`\`bash
curl -X GET "https://api.example.com/v1/users?page=1&limit=10" \
  -H "Authorization: Bearer {token}"
\`\`\`

### 响应示例

\`\`\`json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "username": "john_doe",
      "email": "john@example.com",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42
  }
}
\`\`\`

### 错误码

| 状态码 | 描述 | 解决方案 |
|--------|------|----------|
| 400 | 参数错误 | 检查请求参数格式 |
| 401 | 未授权 | 重新登录获取token |
| 500 | 服务器错误 | 联系技术支持 |
```

## 代码文档

### 函数文档 (JSDoc/TSDoc)

```javascript
/**
 * 计算两个数字的和
 *
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {number} 两个数字的和
 * @throws {TypeError} 当参数不是数字时抛出
 *
 * @example
 * add(1, 2); // => 3
 * add(-1, 1); // => 0
 *
 * @since 1.0.0
 * @deprecated Use {@link sum} instead
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a + b;
}

/**
 * 计算数组中所有数字的和
 *
 * @param {number[]} numbers - 数字数组
 * @returns {number} 所有数字的和
 *
 * @example
 * sum([1, 2, 3]); // => 6
 * sum([]); // => 0
 */
function sum(numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

### 类文档

```python
class UserService:
    """
    用户服务类，处理用户相关业务逻辑

    此类提供用户注册、登录、信息更新等功能。

    Attributes:
        db (Database): 数据库连接实例
        cache (Cache): 缓存实例

    Example:
        >>> service = UserService(db, cache)
        >>> user = service.get_user(123)
        >>> service.update_email(123, "new@example.com")

    Note:
        所有方法需要先调用 login() 进行身份验证
    """

    def __init__(self, db, cache):
        """
        初始化用户服务

        Args:
            db (Database): 数据库连接
            cache (Cache): 缓存客户端
        """
        self.db = db
        self.cache = cache

    def get_user(self, user_id: int) -> Optional[User]:
        """
        根据ID获取用户

        Args:
            user_id (int): 用户ID

        Returns:
            User对象，如果不存在返回None

        Raises:
            ValueError: 当user_id无效时
        """
        if user_id <= 0:
            raise ValueError("user_id must be positive")
        return self.db.query(User).get(user_id)
```

## 内部文档模板

```markdown
# [文档标题]

## 概述
简要说明文档内容

## 背景
为什么需要这个文档

## 目标读者
- 角色1
- 角色2

## 详细内容

### 小节1
内容...

### 小节2
内容...

## 快速参考

| 项目 | 值 |
|------|------|
| 键1 | 值1 |
| 键2 | 值2 |

## 相关文档
- [相关文档1](../path/to/doc1.md)
- [相关文档2](../path/to/doc2.md)

## 更新日志

| 日期 | 版本 | 更新内容 | 作者 |
|------|------|---------|------|
| 2026-03-22 | 1.0 | 初始版本 | Author |
```

## 文档质量检查清单

- [ ] 文档目标读者明确
- [ ] 结构清晰易导航
- [ ] 代码示例可运行
- [ ] 术语使用一致
- [ ] 链接都有效
- [ ] 无拼写语法错误
- [ ] 与代码同步更新

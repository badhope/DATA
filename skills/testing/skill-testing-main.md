---
id: skill-testing-main-v1
name: Test Generation
summary: 系统化测试生成策略与执行指南
type: skill
category: testing
tags: [testing, test-generation, quality, verification, tdd, bdd]
keywords: [测试, 测试生成, 质量验证, TDD, BDD]
intent: 为代码生成全面有效的测试用例，确保功能正确性和回归预防
use_cases:
  - 需要为新代码编写测试时
  - 补充缺失的测试覆盖时
  - 设计测试策略时
  - 审查现有测试质量时
inputs:
  - name: code_to_test
    type: string
    required: true
    description: 需要测试的代码
  - name: testing_approach
    type: string
    required: false
    description: 测试方法（unit/integration/e2e）
  - name: coverage_target
    type: number
    required: false
    description: 目标覆盖率
outputs:
  - name: test_strategy
    type: markdown
    description: 测试策略文档
  - name: test_cases
    type: code
    description: 生成的测试代码
  - name: coverage_report
    type: markdown
    description: 覆盖率报告
prerequisites:
  - 了解代码功能
  - 熟悉测试框架
  - 知道测试环境配置
steps:
  - step: 1
    action: 分析代码结构和功能
  - step: 2
    action: 识别关键测试点
  - step: 3
    action: 设计测试用例
  - step: 4
    action: 生成测试代码
  - step: 5
    action: 验证测试可运行
  - step: 6
    action: 分析覆盖率
examples:
  - input: "function with multiple branches and edge cases"
    output: "comprehensive test suite with edge case coverage"
    notes: 展示如何处理分支和边界条件
related_skills:
  - skill-coding-v1
  - skill-debugging-v1
  - skill-refactoring-main-v1
related_prompts:
  - prompt-task-testing-generate-test-cases-for-code
  - prompt-task-testing-identify-untested-risk-areas
  - prompt-task-testing-design-edge-case-tests
notes: |
  关键原则：
  - 测试应该快速、可重复、独立
  - 覆盖率不是唯一目标，测试质量更重要
  - 边界条件测试与正常流程同等重要
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Test Generation Skill

系统化测试生成与执行的完整指南。

## 测试金字塔

```
        /\
       /  \
      / E2E \        <- 少量、慢、贵
     /--------\
    /Integration\    <- 中等量、中等速度
   /--------------\
  /    Unit Tests   \ <- 大量、快速、便宜
 /------------------\
```

## 测试类型详解

### 1. 单元测试 (Unit Tests)

| 特性 | 说明 |
|------|------|
| 粒度 | 函数/方法级别 |
| 速度 | < 1ms/测试 |
| 覆盖率目标 | 80%+ |
| Mock使用 | 高 |

**示例 (Python/pytest):**
```python
import pytest
from mymodule import Calculator

class TestCalculator:
    def setup_method(self):
        self.calc = Calculator()

    # 正常流程
    def test_add_two_numbers(self):
        assert self.calc.add(2, 3) == 5

    # 边界条件
    def test_add_negative_numbers(self):
        assert self.calc.add(-1, -1) == -2

    # 异常情况
    def test_add_invalid_type_raises(self):
        with pytest.raises(TypeError):
            self.calc.add("2", 3)

    # 参数化测试
    @pytest.mark.parametrize("a,b,expected", [
        (0, 0, 0),
        (1, 1, 2),
        (-1, 1, 0),
        (100, 200, 300),
    ])
    def test_add_parametrized(self, a, b, expected):
        assert self.calc.add(a, b) == expected
```

### 2. 集成测试 (Integration Tests)

| 特性 | 说明 |
|------|------|
| 粒度 | 模块/服务级别 |
| 速度 | < 100ms/测试 |
| 覆盖率目标 | 关键路径100% |
| Mock使用 | 低 |

**示例:**
```python
import pytest
from app import create_app
from database import init_db

@pytest.fixture
def app():
    app = create_app({"TESTING": True})
    with app.app_context():
        init_db()
    yield app

@pytest.fixture
def client(app):
    return app.test_client()

def test_user_registration_flow(client):
    # 1. 注册用户
    response = client.post("/api/users", json={
        "username": "testuser",
        "email": "test@example.com",
        "password": "secure123"
    })
    assert response.status_code == 201

    # 2. 验证用户存在
    user_id = response.json["user_id"]
    response = client.get(f"/api/users/{user_id}")
    assert response.status_code == 200
    assert response.json["username"] == "testuser"

    # 3. 验证登录
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "secure123"
    })
    assert response.status_code == 200
    assert "token" in response.json
```

### 3. 端到端测试 (E2E Tests)

```python
# 使用 Playwright
import pytest
from playwright.sync_api import Page, expect

def test_user_checkout_flow(page: Page):
    # 登录
    page.goto("/login")
    page.fill("#email", "customer@example.com")
    page.fill("#password", "password123")
    page.click("button[type='submit']")

    # 添加商品
    page.goto("/products")
    page.click(".product:first-child .add-to-cart")

    # 结账
    page.click(".cart-icon")
    page.click("#checkout-button")

    # 验证
    expect(page.locator(".order-confirmation")).to_be_visible()
    expect(page.locator(".order-number")).not_to_be_empty()
```

## 测试用例设计

### 等价类划分

```markdown
## 输入: 用户年龄

| 分区 | 有效/无效 | 代表值 |
|------|----------|--------|
| 未成年 | 无效 | 16 |
| 成年-正常 | 有效 | 25 |
| 老年 | 有效 | 70 |
| 边界-最小 | 有效 | 18 |
| 边界-最大 | 有效 | 120 |
| 超边界 | 无效 | 150 |
| 负数 | 无效 | -5 |
| 非数字 | 无效 | "abc" |
| 空值 | 无效 | null |
```

### 边界值分析

```python
def test_user_age_boundaries():
    # 最小有效值
    assert validate_age(0) == False  # 边界外
    assert validate_age(1) == False
    assert validate_age(17) == False
    assert validate_age(18) == True  # 最小有效

    # 最大有效值
    assert validate_age(119) == True
    assert validate_age(120) == True  # 最大有效
    assert validate_age(121) == False
    assert validate_age(150) == False  # 边界外
```

### 决策表测试

```markdown
## 订单折扣规则

| 条件 | 规则1 | 规则2 | 规则3 | 规则4 |
|------|-------|-------|-------|-------|
| 会员? | Y | Y | N | N |
| 订单>100? | Y | N | Y | N |
| **结果** | | | | |
| 折扣率 | 20% | 10% | 5% | 0% |
```

```python
@pytest.mark.parametrize("is_member,order_total,expected_discount", [
    (True, 150, 0.20),
    (True, 80, 0.10),
    (False, 150, 0.05),
    (False, 80, 0.00),
])
def test_discount_calculation(is_member, order_total, expected_discount):
    discount = calculate_discount(is_member, order_total)
    assert discount == expected_discount
```

## 测试覆盖率

### 覆盖率指标

| 指标 | 目标 | 说明 |
|------|------|------|
| 行覆盖率 | > 80% | 执行的代码行数 |
| 分支覆盖率 | > 75% | if/switch分支 |
| 函数覆盖率 | 100% | 每个函数都被调用 |
| 路径覆盖率 | > 60% | 关键路径 |

### 覆盖率分析命令

```bash
# pytest + coverage
pytest --cov=mymodule --cov-report=html tests/

# 查看覆盖率
open htmlcov/index.html

# 带分支覆盖率
pytest --cov=mymodule --cov-branch --cov-report=term-missing tests/
```

### 低覆盖率修复

```markdown
## 覆盖率空洞分析

### 未覆盖: mymodule.py:45-50
```python
if config.debug_mode:  # <- 未覆盖
    logger.debug("Debug info")  # <- 未覆盖
```
**原因**: 测试环境 DEBUG_MODE=False
**修复**: 添加 `@pytest.mark.parametrize("debug", [True, False])`

### 未覆盖: mymodule.py:78
```python
except SpecificError:  # <- 未覆盖
    handle_special_case()  # <- 未覆盖
```
**原因**: 特定错误在正常流程不触发
**修复**: 使用 mock 模拟 SpecificError
```

## Mock与Stub

### 使用场景

| 场景 | 工具 | 示例 |
|------|------|------|
| 模拟外部API | Mock | requests.get() |
| 模拟数据库 | Stub | User.query.get() |
| 模拟时间 | Patch | datetime.now() |
| 模拟文件 | Mock | open() |

### Mock示例

```python
from unittest.mock import Mock, patch, MagicMock
import pytest

def test_fetch_user_with_mock():
    # 模拟HTTP响应
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.json.return_value = {"id": 1, "name": "John"}

    with patch("requests.get", return_value=mock_response):
        user = fetch_user(1)
        assert user["name"] == "John"

def test复杂的mock():
    # 模拟链式调用
    mock_db = MagicMock()
    mock_db.query.filter.first.return_value = User(id=1, name="Test")

    with patch("app.database", mock_db):
        result = get_user_by_id(1)
        assert result.name == "Test"

@patch("app.send_email")
def test_email_sent(mock_send):
    mock_send.return_value = True
    result = register_user("test@example.com")
    assert result.success
    mock_send.assert_called_once()
```

## 测试最佳实践

### Do's ✅

- 测试应该快速执行
- 测试应该相互独立
- 测试应该可重复
- 测试命名要清晰描述意图
- 先写测试再写代码 (TDD)
- 保持测试简洁

### Don'ts ❌

- 不要测试实现细节
- 不要忽略边界条件
- 不要在测试中print
- 不要让测试依赖执行顺序
- 不要创建"万能"测试
- 不要忽略失败的测试

## 测试质量评估

```markdown
## 测试审查清单

### 可读性
- [ ] 测试名称描述测试意图
- [ ] 有清晰的setup/teardown
- [ ] 断言消息有意义

### 可维护性
- [ ] 使用fixtures复用
- [ ] 参数化避免重复
- [ ] 避免硬编码magic values

### 可靠性
- [ ] 没有flaky tests
- [ ] 独立的测试
- [ ] 确定性结果

### 完整性
- [ ] 正常路径覆盖
- [ ] 边界条件覆盖
- [ ] 错误路径覆盖
- [ ] 性能测试（如需要）
```

## 相关提示词

- `prompt-task-testing-generate-test-strategy` - 生成测试策略
- `prompt-task-testing-create-regression-test-plan` - 创建回归测试计划
- `prompt-task-testing-generate-manual-verification-checklist` - 生成手动验证清单

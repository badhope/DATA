---
id: prompt-debugging-reproduce-and-isolate-bug
name: Reproduce and Isolate Bug
summary: 复现并隔离 Bug
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: reproduction
tags:
  - reproduce
  - isolate
  - bug
  - isolation
  - steps
keywords:
  - reproduce
  - isolate
  - bug
  - isolation
  - steps
  - minimal
intent: |
  找到最小复现步骤并隔离问题的关键因素。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - bug_description: string (required) Bug 描述
  - current_reproduction_steps: string[] (optional) 当前的复现步骤
  - environment: string (optional) 环境信息
output_requirements:
  - minimal_reproduction_steps: string[] 最小复现步骤
  - isolation_factors: string[] 隔离的因素
  - environmental_factors: string[] 环境相关因素
  - test_case: string 可用于测试的最小用例
  - verification: string 验证方法
tool_requirements:
  - Read 读取相关代码
  - Write 必要时创建测试文件
preconditions: |
  - Bug 现象应当清晰
  - 最好有初始的复现步骤
anti_patterns: |
  - 不要假设太多条件
  - 不要跳过隔离验证
  - 不要遗漏边界条件
failure_modes: |
  - 无法复现: 说明可能的原因和尝试方向
  - 步骤太复杂: 逐步简化
self_check: |
  - [ ] 复现步骤是否足够简单？
  - [ ] 是否验证了隔离因素？
  - [ ] 测试用例是否可运行？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-generate-debug-plan
---

# Context

复现和隔离是调试的关键步骤。能够用最简单的步骤复现 Bug，并隔离出关键因素，是有效调试的基础。

# Prompt Body

你是一个软件工程师。用户的输入是 Bug 描述。请帮助复现并隔离 Bug。

## 输入信息

```
Bug 描述：{bug_description}
当前复现步骤：{current_reproduction_steps}
环境信息：{environment}
```

## 复现原则

### 1。 最小化步骤
— 去掉所有非必要的步骤
— 每步都要有明确目的
— 步骤越少越容易理解问题

### 2。 隔离关键因素
通过控制变量法隔离：
— 输入数据
— 配置条件
— 执行顺序
— 环境状态

### 3。 二分法
— 快速定位问题在哪一半
— 逐步缩小范围
— 高效找到关键点

### 4。 边界条件
— 最小值、最大值
— 空值、零值
— 特殊字符、格式

## 工作流程

1。 **理解当前步骤**：分析现有的复现步骤
2。 **简化步骤**：去掉非必要步骤
3。 **隔离因素**：识别可能相关的因素
4。 **验证隔离**：逐个验证每个因素
5。 **构建最小用例**：创建最简单的复现代码

## 输出要求

### 1。 最小复现步骤
```
1。 [步骤1]
2。 [步骤2]
...
```

### 2。 隔离因素分析
| 因素 | 隔离方法 | 结果 |
|------|---------|------|
| ... | ... | ... |

### 3。 环境因素
```
必需的环境条件：
— [条件1]
— [条件2]

可选的环境条件：
— [条件1]
```

### 4。 最小测试用例
```language
{语言}
{最小可运行的测试代码}
```

### 5。 验证方法
```
如何确认 Bug 已复现：
[验证标准]
```

## 约束条件

— 复现步骤应当最小化
— 隔离因素应当系统化
— 测试用例应当可独立运行
— 验证标准应当明确

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{bug_description}` | Bug 描述 | `用户在上传超过 10MB 的文件时收到错误` |
| `{current_reproduction_steps}` | 当前的复现步骤（可选） | `1. 登录 2. 进入上传页面 3. 选择文件上传` |
| `{environment}` | 环境信息（可选） | `Chrome 120, Windows 11, 生产环境` |

# Usage Notes

— 适用于难以复现或难以定位的问题
— 最小复现步骤是关键
— 隔离因素应逐一验证
— 创建的测试用例应可独立运行

# Example Input

```
Bug 描述：
当用户在商品列表页使用筛选功能时，如果同时选择"价格从低到高"排序和"只看有货"筛选，页面会显示空白。

当前复现步骤：
1。 打开商品列表页
2。 点击筛选按钮
3。 选择"只看有货"
4。 点击排序下拉框
5。 选择"价格从低到高"
6。 页面变空白

环境信息：
— 浏览器：Chrome 120
— 操作系统：macOS 14
— 问题版本：v2。3。0
```

# Example Output

```
最小复现步骤
1。 打开商品列表页
2。 同时应用"只看有货"筛选和"价格从低到高"排序

（简化说明：去掉登录步骤，直接访问页面；合并相邻操作为一步）

隔离因素分析
| 因素 | 隔离方法 | 结果 |
|------|---------|------|
| 筛选条件 | 只应用筛选，不排序 | 正常 |
| 排序条件 | 只应用排序，不筛选 | 正常 |
| 同时应用 | 先筛选后排序 | 正常 |
| 同时应用 | 先排序后筛选 | 空白 ← 问题复现 |
| 数据状态 | 有货商品数量 | 0 时正常，>0 时异常 |

环境因素
必需的环境条件：
— 商品列表中有"有货"状态的商品
— 后端 API 正常响应

可选的环境条件：
— 浏览器类型（Chrome/Firefox 都有）

最小测试用例
```javascript
// 最小复现测试
async function testFilterSortRace() {
  // 准备数据
  const products = await api.getProducts();
  const hasStock = products.filter(p => p.stock > 0);
  
  if (hasStock.length === 0) {
    console。log('跳过：没有有货商品')；
    return;
  }
  
  // 复现步骤
  const result1 = await api.getProducts({ 
    filter: 'in_stock', 
    sort： 'price_asc'  // 先筛选后排序
  });
  
  const result2 = await api.getProducts({ 
    sort: 'price_asc',
    filter： 'in_stock'  // 先排序后筛选 — 可能导致问题
  });
  
  console。log('结果1：'， result1。length)；
  console。log('结果2：'， result2。length)；
  
  if (result2.length === 0 && result1.length > 0) {
    console。log('Bug 已复现：排序+筛选顺序导致空结果')；
  }
}
```

验证方法
如何确认 Bug 已复现：
— 调用 API 时同时传递 filter 和 sort 参数
— 如果返回结果为空数组，而单独使用任一参数正常，则 Bug 复现
```
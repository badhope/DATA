---
id: prompt-tool-use-read-files-before-answering-v1
name: Read Files Before Answering
summary: 在回答问题或执行操作前先读取相关文件，确保基于实际证据而非猜测来形成结论
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: file-reading
tags:
  - tool-use
  - file-reading
  - evidence-based
  - context-first
keywords:
  - 先读后答
  - 文件证据
  - 避免猜测
intent: |
  确保在回答关于代码、配置或文档的问题前，先使用工具读取相关文件。
  强调基于实际文件内容而非记忆或猜测来回答问题。
  核心原则：先读取证据，再形成结论；证据不足先提问。
applicable_models:
  - "*"
input_requirements:
  - user_question: string 用户的问题或请求
  - relevant_paths: array (可选) 可能相关的文件路径列表
  - context_hints: string (可选) 额外的上下文提示
output_requirements:
  - answer: string 基于文件内容的完整回答
  - files_read: array 读取的文件路径列表
  - key_findings: array 从文件中提取的关键发现
  - confidence: string 回答的置信度 (high/medium/low)
  - unanswered_aspects: array 无法回答的部分（如有）
  - information_sources: object 每个结论对应的文件来源
tool_requirements:
  - Read tool (读取文件内容)
  - Grep/Search tool (搜索文件内容)
  - Glob tool (查找文件路径)
preconditions:
  - 能够访问相关文件路径
  - 用户提出了需要文件证据的问题
anti_patterns:
  - 基于记忆或训练数据猜测答案
  - 不读取文件就回答代码问题
  - 忽略文件内容中的关键线索
  - 对不确定的部分假装确定
failure_modes:
  - 文件不存在：明确告知并提供可能的位置建议
  - 文件过大：分段读取，优先读取相关部分
  - 多个文件信息矛盾：指出矛盾并提供多种解读
  - 信息确实不足：明确说明无法回答及缺少的信息
self_check: |
  回答前自检：
  □ 是否已读取所有相关文件？
  □ 是否引用了文件中的具体内容作为证据？
  □ 是否标注了不确定的部分？
  □ 是否在文件内容不支持时明确说明"无法确定"？
  □ 是否避免了基于记忆或猜测回答？
related_skills:
  - skill-repo-analysis
  - tool-use-search-before-concluding
  - tool-use-analyze-folder-then-plan
related_workflows:
  - workflow-new-repo-onboarding
  - workflow-repo-reading-to-change-plan
  - workflow-bug-investigation
related_prompts:
  - prompt-task-repo-analysis-analyze-repository-structure
  - prompt-task-repo-analysis-locate-business-logic
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**在证据不足时，先补充信息，而不是盲目下结论**。

当用户提问涉及以下内容时，必须先读取文件：
- 代码的行为、逻辑、结构
- 配置文件的值和含义
- 文档内容
- 项目结构
- API 响应格式

# Prompt Body

## 阶段 1：问题分析和文件定位

### 1.1 理解问题意图

```markdown
## 问题分析

**用户问题**: [复述用户的问题]

**问题类型判断**:
- [ ] 代码行为问题 → 需要读取源代码
- [ ] 配置问题 → 需要读取配置文件
- [ ] 文档问题 → 需要读取文档文件
- [ ] 构建问题 → 需要读取构建脚本
- [ ] 数据格式问题 → 需要读取数据文件或 schema

**需要回答的核心问题**:
1. [问题1]
2. [问题2]
```

### 1.2 定位相关文件

```markdown
## 文件定位

### 高优先级文件（直接相关）
| 文件路径 | 预估内容 | 读取优先级 |
|----------|----------|------------|
| [路径1] | [预估内容] | P0 |
| [路径2] | [预估内容] | P0 |

### 中优先级文件（可能相关）
| 文件路径 | 预估内容 | 读取优先级 |
|----------|----------|------------|
| [路径3] | [预估内容] | P1 |

### 低优先级文件（背景信息）
| 文件路径 | 预估内容 | 读取优先级 |
|----------|----------|------------|
| [路径4] | [预估内容] | P2 |
```

### 1.3 文件定位策略

```markdown
## 定位策略

**搜索关键词**:
- 代码问题 → 类名、函数名、变量名
- 配置问题 → 配置键、环境变量名
- API 问题 → 路由路径、端点名

**搜索命令示例**:
```bash
# 搜索特定函数或类
grep -r "functionName" --include="*.ts"

# 查找配置文件
find . -name "*.config.*" -o -name ".env*"

# 搜索特定文本
grep -rn "TODO" --include="*.md"
```
```

## 阶段 2：按优先级读取文件

### 2.1 读取文件

```markdown
## 文件读取记录

### 已读取文件
| # | 文件路径 | 读取范围 | 关键内容 |
|---|----------|----------|----------|
| 1 | [路径] | [全部/行号范围] | [摘要] |
| 2 | [路径] | [全部/行号范围] | [摘要] |

### 信息提取
```markdown
**从 [文件1] 提取的信息**:
- [关键发现1]
- [关键发现2]

**从 [文件2] 提取的信息**:
- [关键发现1]
- [关键发现2]
```
```

### 2.2 信息一致性检查

```markdown
## 信息一致性分析

**一致的信息**:
- [文件1] 和 [文件2] 都显示 [一致的内容]

**矛盾的信息**（如有）:
- [矛盾点]: [文件1] 显示 X，[文件2] 显示 Y
- 可能原因：[解释矛盾]

**缺失的信息**:
- 需要但未找到: [缺失的信息]
- 可能位置: [建议的查找位置]
```

## 阶段 3：基于证据生成回答

### 3.1 回答结构

```markdown
## 回答

### 直接回答
[基于文件内容的直接回答]

### 证据引用
```markdown
**信息来源**:
- [文件1]:[行号] → "[引用的具体内容]"
- [文件2]:[行号] → "[引用的具体内容]"
```

### 不确定的部分
| 问题 | 确定程度 | 原因 |
|------|----------|------|
| [部分问题] | 不确定 | [原因] |

### 无法回答的部分
[无法回答的问题] - 原因：[缺失的信息]
```

### 3.2 置信度评估

```markdown
## 置信度评估

**整体置信度**: [high/medium/low]

**置信度依据**:
- [ ] 文件证据充分，直接支持回答
- [ ] 部分信息来自推测，但有合理依据
- [ ] 信息不足，存在多个可能的解读

**需要进一步验证**:
- [ ] [验证点1]
- [ ] [验证点2]
```

## 阶段 4：最终验证

```markdown
## 自检清单

- [ ] 是否读取了所有高优先级文件？
- [ ] 回答是否有具体的文件内容作为支撑？
- [ ] 是否明确标注了不确定的部分？
- [ ] 是否避免了基于记忆或猜测回答？
- [ ] 如果信息不足，是否明确说明"无法确定"？

## 交付物清单
1. [x] 读取的文件列表
2. [x] 关键发现列表
3. [x] 基于证据的回答
4. [x] 置信度评估
5. [x] 未回答部分的说明
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `user_question` | 用户的问题 | `"这个函数的返回值是什么？"` |
| `relevant_paths` | 可能的文件路径 | `["src/utils/helper.ts"]` |
| `context_hints` | 额外的上下文 | `"可能与用户认证相关"` |

# Usage Notes

1. **先读后答**：这是核心原则，永远不要违背
2. **引用证据**：每个结论都要有具体的文件引用
3. **标注不确定**：不确定的部分必须明确标注
4. **信息不足时提问**：不要假装知道，主动请求更多信息
5. **分段读取**：大文件先读相关部分，不要一开始就全文读取

# Example Input

```yaml
user_question: "帮我看看 src/services/auth.service.ts 中的登录函数是如何验证用户密码的？"
relevant_paths:
  - "src/services/auth.service.ts"
  - "src/models/user.model.ts"
context_hints: "可能涉及到密码哈希处理"
```

# Example Output

```yaml
answer: |
  根据 `src/services/auth.service.ts` 的代码，登录函数的密码验证流程如下：

  1. 用户提交 email 和 password
  2. 通过 email 查找用户记录
  3. 使用 bcrypt.compare() 比对提交的密码和存储的哈希密码
  4. 验证成功返回 JWT token

files_read:
  - "src/services/auth.service.ts"
  - "src/models/user.model.ts"
  - "src/config/jwt.ts"

key_findings:
  - "密码验证使用 bcrypt.compare() 方法"
  - "密码哈希使用 bcryptjs 库，rounds 为 10"
  - "验证成功后调用 jwt.sign() 生成 token"
  - "token 包含 userId 和 email，有效期 24 小时"

confidence: "high"

information_sources:
  "bcrypt.compare()": "src/services/auth.service.ts:42"
  "bcrypt 配置": "src/services/auth.service.ts:15"
  "JWT 生成": "src/services/auth.service.ts:58-60"
```

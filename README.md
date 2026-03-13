# data

<div align="center">

![Vue Version](https://img.shields.io/badge/Vue-3.5+-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Vite](https://img.shields.io/badge/Vite-5.2+-purple)
![License](https://img.shields.io/badge/License-MIT-green)

**企业级金融数据管理平台**

</div>

---

## data

data 是一个基于 **Vue 3 + TypeScript + Vite** 构建的现代化企业级数据管理平台。项目采用最新的前端技术栈，提供完整的数据资产管理、功能模块管理等功能。

### 核心特性

- 🏗️ **现代化架构** - Vue 3 Composition API + TypeScript + Pinia
- 📊 **金融数据可视化** - ECharts 5 专业图表库
- 🔐 **安全认证** - JWT Token + AES 加密 + RBAC 权限控制 + 登录安全策略
- 🎨 **UI 组件库** - Element Plus 企业级组件
- 🌐 **国际化支持** - 中英文多语言切换
- 🌙 **主题切换** - 深色/浅色模式 + 自定义主题色
- 📱 **响应式设计** - 完美适配 PC、平板、移动端
- ⚡ **性能优化** - 代码分割、懒加载、Gzip 压缩
- 🧪 **测试覆盖** - Vitest 单元测试框架
- 🐳 **容器化部署** - Docker + docker-compose 支持
- 🔄 **CI/CD** - GitHub Actions 自动化流水线

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5+ | 渐进式 JavaScript 框架 |
| TypeScript | 5.0+ | 静态类型检查 |
| Vite | 5.2+ | 下一代构建工具 |
| Pinia | 2.1+ | Vue 官方状态管理 |
| Element Plus | 2.6+ | Vue 3 UI 组件库 |
| ECharts | 5.5+ | 数据可视化图表 |
| Vitest | 1.4+ | 单元测试框架 |

---

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 pnpm >= 8.0.0

### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/badhope/DATA.git
cd DATA

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.development
# 编辑 .env.development，设置 VITE_ENCRYPTION_KEY
# 生成密钥：openssl rand -hex 32

# 4. 启动开发服务器
npm run dev

# 5. 访问应用
# http://localhost:5173
```

### 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览生产构建
npm run lint         # 运行 ESLint
npm run lint:style   # 运行 Stylelint
npm run type-check   # TypeScript 类型检查
npm run test         # 运行单元测试
npm run coverage     # 运行测试覆盖率报告
```

---

## 项目结构

```
DATA/
├── .github/              # GitHub Actions 工作流
│   └── workflows/
│       ├── ci.yml        # CI 流水线
│       └── release.yml   # 发布流水线
├── public/               # 静态资源
├── src/
│   ├── api/              # API 接口定义
│   ├── components/       # 全局组件
│   ├── composables/      # Composition API 工具
│   ├── directives/       # 自定义指令
│   ├── layouts/          # 页面布局
│   ├── locales/          # 国际化配置
│   ├── mock/             # Mock 数据
│   ├── router/           # 路由配置
│   ├── services/         # 业务服务层
│   ├── stores/           # Pinia 状态管理
│   ├── styles/           # 样式文件
│   ├── types/            # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   │   ├── formatters/   # 格式化工具
│   │   ├── http/         # HTTP 客户端
│   │   ├── security/     # 安全工具
│   │   └── storage/      # 存储封装
│   └── views/            # 页面视图
├── tests/                # 测试文件
├── .env.example          # 环境变量示例
├── Dockerfile            # Docker 配置
├── docker-compose.yml    # Docker Compose 配置
├── nginx.conf            # Nginx 配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

---

## 功能模块

### 🏠 工作台 (Dashboard)
- 资产概览统计
- 资产趋势图表
- 资产配置饼图

### 💼 投资组合 (Portfolio)
- 组合列表管理
- 详细持仓分析
- 收益绩效计算

### 📈 市场行情 (Market)
- 自选股管理
- 实时行情监控
- K线图分析

### 📋 交易记录 (Trade)
- 交易历史查询
- 成交明细统计
- 数据导出

### ⚙️ 系统设置 (System)
- 个人资料管理
- 系统偏好设置
- 安全认证配置

---

## 安全特性

- ✅ JWT Token 认证机制
- ✅ Refresh Token 自动续期
- ✅ 敏感数据 AES-256 加密
- ✅ 密码强度验证
- ✅ 登录失败次数限制
- ✅ 账户锁定机制
- ✅ 渐进式登录延迟
- ✅ XSS 防护

---

## Docker 部署

```bash
# 构建镜像
docker build -t finsphere-pro \
  --build-arg VITE_ENCRYPTION_KEY=your_key \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  .

# 运行容器
docker run -d -p 80:80 finsphere-pro

# 或使用 docker-compose
docker-compose up -d
```

---

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 许可证

[MIT](LICENSE)

---

## 联系方式

如有问题或建议，请提交 Issue。

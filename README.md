
# 🚀 FinSphere Pro - 企业级金融数据管理平台
[![Vue](https://img.shields.io/badge/Vue-3.4+-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design Vue](https://img.shields.io/badge/Ant%20Design%20Vue-4.x-red.svg)](https://antdv.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/your-org/finsphere-pro/blob/main/LICENSE)
> **一套精美、完善、开箱即用的金融后台管理系统解决方案。**
> 专为金融机构设计，集成数据可视化、权限管理、模拟交易与风控系统。无需后端，一键启动，即刻体验完整功能。
---
## 📖 目录
- [项目简介](#-项目简介)
- [核心特性](#-核心特性)
- [技术栈](#-技术栈)
- [快速开始 (傻瓜式操作)](#-快速开始-傻瓜式操作)
- [功能演示与账号](#-功能演示与账号)
- [项目结构](#-项目结构)
- [扩展与定制](#-扩展与定制)
- [部署指南](#-部署指南)
- [更新日志](#-更新日志)
---
## 🌟 项目简介
**FinSphere Pro** 是一个基于 Vue 3 + TypeScript 构建的企业级金融后台管理系统。它不仅仅是一个模板，更是一个包含模拟数据、完整权限逻辑和精美图表的**全功能演示平台**。
本项目旨在解决金融数据展示枯燥、系统架构复杂难以落地的问题。通过内置的 Mock 服务，开发者无需配置复杂的后端数据库，即可在前端独立运行完整的业务流程。
![界面预览](https://via.placeholder.com/1200x600?text=FinSphere+Pro+Dashboard+Preview)
---
## ✨ 核心特性
### 1. 🎨 现代化 UI 设计
- **金融风格**：采用沉稳的深蓝色调，搭配微阴影与圆角卡片，提升专业感。
- **响应式布局**：适配桌面端与平板，满足移动办公需求。
- **细节打磨**：自定义滚动条、平滑过渡动画、加载状态优化。
### 2. 📊 强大的数据可视化
- **驾驶舱**：集成 ECharts，支持折线图、饼图、柱状图、仪表盘。
- **实时模拟**：通过 Mock.js 生成逼真的金融数据（K线、交易流水、用户分布）。
- **动态交互**：图表支持缩放、拖拽与 Tooltip 动态展示。
### 3. 🛡️ 完善的权限体系
- **RBAC 模型**：基于角色的访问控制。
- **动态路由**：根据用户权限动态加载菜单（Admin 可见系统管理，User 不可见）。
- **全链路鉴权**：从路由守卫到 Axios 请求拦截，保障数据安全。
### 4. ⚡ 企业级开发体验
- **TypeScript**：全栈类型支持，代码更健壮。
- **组件化封装**：通用的请求封装、图表封装，减少重复代码。
- **模块化架构**：清晰的文件夹结构，便于多人协作与功能拆分。
---
## 🛠️ 技术栈
| 技术 | 说明 | 版本 |
| --- | --- | --- |
| [Vue 3](https://vuejs.org/) | 渐进式 JavaScript 框架 | ^3.4 |
| [TypeScript](http://www.typescriptlang.org/) | JavaScript 的超集 | ^5.0 |
| [Vite](https://vitejs.dev/) | 下一代前端构建工具 | ^5.0 |
| [Pinia](https://pinia.vuejs.org/) | Vue 官方状态管理库 | ^2.1 |
| [Ant Design Vue](https://antdv.com/) | 企业级 UI 组件库 | ^4.1 |
| [ECharts](https://echarts.apache.org/) | 强大的数据可视化库 | ^5.5 |
| [Mock.js](http://mockjs.com/) | 模拟数据生成器 | ^1.1 |
---
## 🚀 快速开始 (傻瓜式操作)
> **前置要求**：你的电脑需要安装 [Node.js](https://nodejs.org/) (推荐 v16 或更高版本)。
### 1. 获取代码
```bash
# 克隆项目
git clone https://github.com/your-org/finsphere-pro.git
# 进入项目目录
cd finsphere-pro
```
### 2. 安装依赖
推荐使用 `npm` 或 `pnpm`。
```bash
npm install
# 或者
pnpm install
```
### 3. 启动项目
只需一条命令，即可启动开发服务器。
```bash
npm run dev
```
启动成功后，浏览器会自动打开 `http://localhost:3000`。
---
## 🎮 功能演示与账号
系统内置了 Mock 数据，你可以直接使用以下账号登录体验不同角色的功能：
| 角色 | 账号 | 密码 | 权限说明 |
| :--- | :--- | :--- | :--- |
| **管理员** | admin | 123456 | 拥有所有菜单权限，包含“系统管理”模块。 |
| **普通用户** | user | 123456 | 仅可访问工作台、个人中心，不可见“系统管理”。 |
### 主要功能导航：
1.  **登录/注册**：
    *   支持表单验证。
    *   支持新用户注册（数据仅存在本地内存，刷新重置）。
2.  **工作台**：
    *   查看总资产、今日盈亏等关键指标卡片。
    *   资产趋势图与资产配置饼图实时展示。
3.  **个人中心**：
    *   查看当前用户信息与角色。
4.  **系统管理**：
    *   用户列表：展示模拟的用户数据表格。
---
## 📁 项目结构
项目采用了清晰的分层结构，方便扩展和维护。
```text
finsphere-pro/
├── public/                 # 静态资源
├── src/
│   ├── api/                # 接口请求定义
│   ├── assets/             # 图片等静态资源
│   ├── components/         # 全局通用组件
│   ├── layouts/            # 布局组件
│   │   └── BasicLayout.vue # 主布局
│   ├── mock/               # Mock 数据模拟层
│   │   ├── user.ts         # 用户模拟
│   │   └── dashboard.ts    # 图表模拟
│   ├── router/             # 路由配置
│   │   └── routes.ts       # 路由表 (包含权限配置)
│   ├── store/              # Pinia 状态管理
│   ├── styles/             # 全局样式
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # Axios 封装
│   │   └── auth.ts         # Token 处理
│   ├── views/              # 页面组件
│   │   ├── dashboard/      # 首页
│   │   ├── login/          # 登录
│   │   ├── register/       # 注册
│   │   └── system/         # 系统管理
│   ├── App.vue
│   └── main.ts
├── .env                    # 环境变量
├── Dockerfile              # Docker 部署文件
├── package.json
└── vite.config.ts          # Vite 配置
```
---
## 🔧 扩展与定制
### 如何修改主题颜色？
修改 `vite.config.ts` 中的 `modifyVars` 配置：
```javascript
css: {
  preprocessorOptions: {
    less: {
      modifyVars: {
        'primary-color': '#1890ff', // 修改为你喜欢的颜色
        'link-color': '#1890ff',
        'border-radius-base': '6px',
      },
    },
  },
},
```
### 如何添加新页面？
1.  在 `src/views/` 下创建新的 `.vue` 文件。
2.  在 `src/router/routes.ts` 的 `asyncRoutes` 中添加路由配置。
3.  在 `src/layouts/BasicLayout.vue` 的菜单组件中添加对应的 `<a-menu-item>`。
### 如何连接真实后端？
1.  删除 `src/main.ts` 中的 `setupMock()` 调用。
2.  修改 `src/utils/request.ts` 中的 `baseURL` 为你的后端 API 地址。
3.  在 `src/api/` 目录下定义真实的接口类型。
---
## 🐳 部署指南
### 使用 Docker (推荐)
项目自带 `Dockerfile`，支持一键打包部署。
```bash
# 1. 构建镜像
docker build -t finsphere-pro:latest .
# 2. 运行容器
docker run -d -p 80:80 --name fin-app finsphere-pro:latest
```
访问 `http://localhost` 即可。
### 手动构建
```bash
# 构建生产环境代码
npm run build
# 生成的 dist 目录部署到 Nginx 或 Apache 即可
```
---
## 🗺️ 路线图
我们计划在未来增加更多强大的功能：
- [ ] **数据大屏模式**：全屏炫酷展示，适合投放大屏幕。
- [ ] **多标签页**：支持浏览器多标签页切换，提升操作效率。
- [ ] **WebSocket 实时推送**：接入真实行情数据源。
- [ ] **深色模式**：支持深色/浅色主题一键切换。
---
## 🤝 参与贡献
我们欢迎所有的贡献者！如果你想参与项目开发：
1.  Fork 本仓库。
2.  新建分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交代码 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  提交 Pull Request。
---
## 📄 许可证
本项目基于 [MIT](https://choosealicense.com/licenses/mit/) 协议开源，仅供学习与参考。
---
**Made with ❤️ by FinSphere Team**

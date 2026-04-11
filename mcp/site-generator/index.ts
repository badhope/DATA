import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'

const execAsync = promisify(exec)

async function safeExec(cmd: string, cwd?: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(cmd, { cwd, timeout: 120000 })
    return stdout + stderr
  } catch (e: any) {
    return e.stdout + e.stderr
  }
}

const TEMPLATES = {
  'astro-minimal': {
    name: 'Astro 极简博客',
    framework: 'astro',
    cmd: 'npm create astro@latest {{name}} -- --template basics --no-install --no-git --typescript strict',
    features: ['博客', '极简设计', 'SEO优化'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'astro-blog': {
    name: 'Astro 专业博客',
    framework: 'astro',
    cmd: 'npm create astro@latest {{name}} -- --template blog --no-install --no-git --typescript strict',
    features: ['Markdown博客', '分类', '标签', 'RSS'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'astro-docs': {
    name: 'Astro 文档站',
    framework: 'astro',
    cmd: 'npm create astro@latest {{name}} -- --template docs --no-install --no-git --typescript strict',
    features: ['文档导航', '搜索', '侧边栏', '版本管理'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'astro-saas': {
    name: 'Astro SaaS 落地页',
    framework: 'astro',
    cmd: 'npm create astro@latest {{name}} -- --template portfolio --no-install --no-git --typescript strict',
    features: ['英雄区', '特性展示', '定价表', 'CTA按钮'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'next-blog': {
    name: 'Next.js 全栈博客',
    framework: 'nextjs',
    cmd: 'npx create-next-app@latest {{name}} --typescript --eslint --tailwind --app --no-src-dir --no-import-alias',
    features: ['SSR/SSG', 'App Router', 'Tailwind CSS'],
    deployTarget: ['vercel', 'netlify']
  },
  'vite-react': {
    name: 'Vite React 应用',
    framework: 'vite',
    cmd: 'npm create vite@latest {{name}} -- --template react-ts',
    features: ['React 18', 'TypeScript', 'HMR热更新'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'vite-vue': {
    name: 'Vite Vue 应用',
    framework: 'vite',
    cmd: 'npm create vite@latest {{name}} -- --template vue-ts',
    features: ['Vue 3', 'TypeScript', 'Composition API'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'vite-vanilla': {
    name: 'Vite 纯HTML站',
    framework: 'vite',
    cmd: 'npm create vite@latest {{name}} -- --template vanilla-ts',
    features: ['零框架', '极致性能', '原生JS'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'docusaurus': {
    name: 'Docusaurus 文档站',
    framework: 'docusaurus',
    cmd: 'npx create-docusaurus@latest {{name}} classic --typescript',
    features: ['文档', '博客', '版本化', 'i18n多语言'],
    deployTarget: ['vercel', 'netlify']
  },
  'vuepress': {
    name: 'VuePress 文档',
    framework: 'vuepress',
    cmd: 'npm create vuepress-site@next {{name}}',
    features: ['Markdown扩展', '主题系统', '搜索'],
    deployTarget: ['vercel', 'netlify', 'cloudflare']
  },
  'hugo-blog': {
    name: 'Hugo 极速博客',
    framework: 'hugo',
    cmd: 'hugo new site {{name}} --format yaml',
    features: ['Go极速构建', '多主题', '毫秒级编译'],
    deployTarget: ['netlify', 'cloudflare', 'github-pages']
  },
  'eleventy': {
    name: '11ty 静态站',
    framework: '11ty',
    cmd: 'npm create eleventy@latest {{name}}',
    features: ['极简主义', '零客户端JS', '灵活模板'],
    deployTarget: ['netlify', 'cloudflare', 'github-pages']
  },
  'wechat-miniprogram': {
    name: '微信小程序原生',
    framework: 'miniprogram',
    cmd: 'git clone --depth 1 https://github.com/wechat-miniprogram/miniprogram-demo.git {{name}}',
    features: ['微信原生', '组件库', '云开发支持'],
    deployTarget: ['微信公众平台']
  },
  'uni-app-vue3': {
    name: 'UniApp Vue3 跨端',
    framework: 'uniapp',
    cmd: 'npx degit dcloudio/uni-preset-vue#vite-ts {{name}}',
    features: ['跨端开发', '一套代码多端运行', 'Vue3'],
    deployTarget: ['微信', '支付宝', '百度', '抖音', 'H5', 'App']
  },
  'taro-react': {
    name: 'Taro React 跨端',
    framework: 'taro',
    cmd: 'npx @tarojs/cli init {{name}} --typescript --template default',
    features: ['React语法', '多端统一', '小程序/H5/App'],
    deployTarget: ['微信', '支付宝', 'H5', 'App']
  }
}

const THEMES = {
  minimal: {
    name: '极简白',
    primary: '#000000',
    secondary: '#666666',
    background: '#ffffff',
    accent: '#3b82f6'
  },
  dark: {
    name: '暗夜模式',
    primary: '#ffffff',
    secondary: '#a1a1aa',
    background: '#18181b',
    accent: '#8b5cf6'
  },
  ocean: {
    name: '海洋蓝',
    primary: '#0c4a6e',
    secondary: '#0369a1',
    background: '#f0f9ff',
    accent: '#0ea5e9'
  },
  forest: {
    name: '森林绿',
    primary: '#14532d',
    secondary: '#166534',
    background: '#f0fdf4',
    accent: '#22c55e'
  },
  sunset: {
    name: '日落橙',
    primary: '#7c2d12',
    secondary: '#c2410c',
    background: '#fff7ed',
    accent: '#f97316'
  },
  purple: {
    name: '优雅紫',
    primary: '#581c87',
    secondary: '#7c3aed',
    background: '#faf5ff',
    accent: '#a855f7'
  }
}

export default createMCPServer({
  name: 'site-generator',
  version: '1.0.0',
  description: '网站与小程序快速生成器 - 一键创建静态站、博客、文档站、跨端小程序',
  icon: '🌐',
  author: 'Trae Official'
})

  .forTrae({
    categories: ['Web Development', 'DevTools', 'Frontend'],
    rating: 'intermediate',
    features: ['模板引擎', '一键部署', '主题定制', '跨端开发']
  })
  .withCache(60)

  .addTool({
    name: 'site_list_templates',
    description: '列出所有可用的网站/小程序模板',
    parameters: {
      category: { type: 'string', description: '按类别筛选: static, blog, docs, miniprogram, frontend' }
    },
    execute: async (params: any) => {
      const categories: Record<string, string[]> = {
        static: ['astro-minimal', 'astro-saas', 'vite-vanilla', 'hugo-blog', 'eleventy'],
        blog: ['astro-blog', 'next-blog'],
        docs: ['astro-docs', 'docusaurus', 'vuepress'],
        miniprogram: ['wechat-miniprogram', 'uni-app-vue3', 'taro-react'],
        frontend: ['vite-react', 'vite-vue']
      }

      let templates = Object.entries(TEMPLATES)
      
      if (params.category && categories[params.category]) {
        const allowed = categories[params.category]
        templates = templates.filter(([key]) => allowed.includes(key))
      }

      return {
        total: templates.length,
        category: params.category || 'all',
        templates: templates.map(([key, t]) => ({
          id: key,
          name: t.name,
          framework: t.framework,
          features: t.features,
          deployTarget: t.deployTarget
        }))
      }
    }
  })

  .addTool({
    name: 'site_create',
    description: '使用指定模板创建新项目',
    parameters: {
      template: { type: 'string', description: '模板ID，使用site_list_templates查看' },
      projectName: { type: 'string', description: '项目名称/目录名' },
      outputDir: { type: 'string', description: '输出目录路径' },
      installDeps: { type: 'boolean', description: '是否自动安装依赖' }
    },
    execute: async (params: any) => {
      const template = TEMPLATES[params.template as keyof typeof TEMPLATES]
      if (!template) {
        return { success: false, error: `Template ${params.template} not found` }
      }

      const projectName = params.projectName || 'my-site'
      const outputDir = params.outputDir || process.cwd()
      const fullPath = path.join(outputDir, projectName)

      try {
        await fs.mkdir(outputDir, { recursive: true })
      } catch {}

      const cmd = template.cmd.replace(/{{name}}/g, projectName)
      const result = await safeExec(cmd, outputDir)

      let depsResult = ''
      if (params.installDeps) {
        depsResult = await safeExec('npm install', fullPath)
      }

      return {
        success: true,
        template: params.template,
        templateName: template.name,
        framework: template.framework,
        projectPath: fullPath,
        projectName,
        cmdExecuted: cmd,
        installDeps: params.installDeps,
        output: result.substring(0, 2000),
        depsOutput: depsResult.substring(0, 1000),
        nextSteps: [
          `cd ${projectName}`,
          'npm run dev - 启动开发服务器',
          'npm run build - 构建生产版本'
        ],
        message: `✨ ${template.name} 创建成功！`
      }
    }
  })

  .addTool({
    name: 'site_list_themes',
    description: '列出所有预设配色主题',
    parameters: {},
    execute: async () => {
      return {
        total: Object.keys(THEMES).length,
        themes: Object.entries(THEMES).map(([key, t]) => ({
          id: key,
          name: t.name,
          colors: t
        }))
      }
    }
  })

  .addTool({
    name: 'site_apply_theme',
    description: '为项目应用配色主题',
    parameters: {
      projectPath: { type: 'string', description: '项目路径' },
      themeId: { type: 'string', description: '主题ID' },
      customColors: { type: 'string', description: 'JSON自定义配色: {primary,secondary,background,accent}' }
    },
    execute: async (params: any) => {
      let theme = THEMES[params.themeId as keyof typeof THEMES]
      
      if (params.customColors) {
        try {
          const custom = JSON.parse(params.customColors)
          theme = { name: 'Custom', ...custom }
        } catch {}
      }

      if (!theme) {
        return { success: false, error: 'Theme not found' }
      }

      const cssPath = path.join(params.projectPath, 'src', 'styles', 'theme.css')
      
      try {
        await fs.mkdir(path.dirname(cssPath), { recursive: true })
      } catch {}

      const cssContent = `
:root {
  --color-primary: ${theme.primary};
  --color-secondary: ${theme.secondary};
  --color-background: ${theme.background};
  --color-accent: ${theme.accent};
}

body {
  background-color: var(--color-background);
  color: var(--color-primary);
}

a, .accent {
  color: var(--color-accent);
}
`

      await fs.writeFile(cssPath, cssContent)

      return {
        success: true,
        theme: theme.name,
        colors: theme,
        cssPath,
        message: `🎨 主题 ${theme.name} 已应用`
      }
    }
  })

  .addTool({
    name: 'site_dev_server',
    description: '启动项目开发服务器',
    parameters: {
      projectPath: { type: 'string', description: '项目路径' },
      port: { type: 'number', description: '端口号' },
      host: { type: 'string', description: '绑定主机' }
    },
    execute: async (params: any) => {
      const port = params.port || 3000
      const host = params.host || 'localhost'
      
      const result = await safeExec(
        `npm run dev -- --port ${port} --host ${host} 2>&1 &`,
        params.projectPath
      )

      return {
        success: true,
        url: `http://${host}:${port}`,
        port,
        host,
        output: result.substring(0, 500),
        message: `🚀 开发服务器启动中，请访问 http://${host}:${port}`
      }
    }
  })

  .addTool({
    name: 'site_build',
    description: '构建生产版本',
    parameters: {
      projectPath: { type: 'string', description: '项目路径' }
    },
    execute: async (params: any) => {
      const result = await safeExec('npm run build 2>&1', params.projectPath)

      return {
        success: !result.toLowerCase().includes('error'),
        output: result,
        distPath: path.join(params.projectPath, 'dist'),
        message: result.toLowerCase().includes('error') ? '⚠️ 构建完成，请检查警告' : '✅ 构建成功！'
      }
    }
  })

  .addTool({
    name: 'site_deploy_vercel',
    description: '一键部署到 Vercel',
    parameters: {
      projectPath: { type: 'string', description: '项目路径' },
      projectName: { type: 'string', description: 'Vercel项目名' },
      token: { type: 'string', description: 'Vercel Token (环境变量: VERCEL_TOKEN)' }
    },
    execute: async (params: any) => {
      const token = params.token || process.env.VERCEL_TOKEN
      if (!token) {
        return { success: false, error: '需要 VERCEL_TOKEN 环境变量或手动提供 token' }
      }

      const projectName = params.projectName || path.basename(params.projectPath)
      
      const result = await safeExec(
        `npx vercel --prod --token ${token} --name ${projectName} --yes 2>&1`,
        params.projectPath
      )

      const urlMatch = result.match(/https?:\/\/[^\s]+/)

      return {
        success: urlMatch !== null,
        projectName,
        deployUrl: urlMatch ? urlMatch[0] : null,
        output: result.substring(0, 2000),
        message: urlMatch ? `🎉 部署成功！访问: ${urlMatch[0]}` : '⚠️ 部署进行中，请检查输出'
      }
    }
  })

  .addTool({
    name: 'site_deploy_cloudflare',
    description: '一键部署到 Cloudflare Pages',
    parameters: {
      projectPath: { type: 'string', description: '项目路径' },
      projectName: { type: 'string', description: 'Cloudflare项目名' },
      accountId: { type: 'string', description: 'Cloudflare Account ID' },
      apiToken: { type: 'string', description: 'Cloudflare API Token' }
    },
    execute: async (params: any) => {
      const apiToken = params.apiToken || process.env.CLOUDFLARE_API_TOKEN
      const accountId = params.accountId || process.env.CLOUDFLARE_ACCOUNT_ID
      
      if (!apiToken || !accountId) {
        return { success: false, error: '需要 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID' }
      }

      const projectName = params.projectName || path.basename(params.projectPath)
      
      const result = await safeExec(
        `npx wrangler pages deploy dist --project-name=${projectName} 2>&1`,
        params.projectPath
      )

      return {
        success: result.toLowerCase().includes('success'),
        projectName,
        output: result.substring(0, 2000),
        message: '☁️  Cloudflare Pages 部署完成'
      }
    }
  })

  .addTool({
    name: 'miniprogram_quickstart',
    description: '小程序项目快速配置向导',
    parameters: {
      template: { type: 'string', description: '小程序模板: wechat-miniprogram, uni-app-vue3, taro-react' },
      projectName: { type: 'string', description: '项目名称' },
      appId: { type: 'string', description: '微信小程序AppID' }
    },
    execute: async (params: any) => {
      const template = TEMPLATES[params.template as keyof typeof TEMPLATES]
      if (!template || !template.framework?.includes('miniprogram') && !template.framework?.includes('uniapp') && !template.framework?.includes('taro')) {
        return { success: false, error: '请选择小程序专用模板' }
      }

      const projectName = params.projectName || 'my-miniprogram'
      const cmd = template.cmd.replace(/{{name}}/g, projectName)
      const result = await safeExec(cmd)

      let configPath = ''
      if (params.template === 'wechat-miniprogram' && params.appId) {
        configPath = path.join(projectName, 'project.config.json')
        try {
          const config = JSON.parse(await fs.readFile(configPath, 'utf8'))
          config.appid = params.appId
          await fs.writeFile(configPath, JSON.stringify(config, null, 2))
        } catch {}
      }

      return {
        success: true,
        template: params.template,
        projectName,
        appId: params.appId,
        cmdExecuted: cmd,
        output: result.substring(0, 1000),
        configPath: configPath || '未设置',
        nextSteps: [
          `cd ${projectName}`,
          'npm install',
          '打开微信开发者工具导入项目',
          'npm run dev:mp-weixin (UniApp/Taro)'
        ],
        message: `📱 小程序项目 ${projectName} 创建成功！`
      }
    }
  })

  .build()

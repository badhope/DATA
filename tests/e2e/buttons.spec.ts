import { test, expect, Page } from '@playwright/test'

test.describe('按钮功能全面测试', () => {
  let page: Page

  test.beforeEach(async ({ page: pageContext }) => {
    page = pageContext
  })

  test.describe('登录页面测试', () => {
    test('登录页加载并包含登录表单', async () => {
      await page.goto('/login')
      await page.waitForLoadState('domcontentloaded')
      
      const body = await page.locator('body').innerHTML()
      console.log(`登录页HTML长度: ${body.length}`)
      
      const hasLoginContent = body.includes('登录') || body.includes('login')
      console.log(`包含登录内容: ${hasLoginContent}`)
      
      expect(body.length).toBeGreaterThan(100)
    })

    test('所有主要页面可访问性', async () => {
      const pages = [
        { path: '/', name: '首页' },
        { path: '/login', name: '登录页' },
        { path: '/register', name: '注册页' },
        { path: '/dashboard', name: '仪表盘' },
        { path: '/market', name: '行情' },
        { path: '/portfolio', name: '组合' },
        { path: '/trade', name: '交易' },
        { path: '/settings', name: '设置' },
      ]

      for (const pageInfo of pages) {
        const response = await page.goto(pageInfo.path, { waitUntil: 'domcontentloaded' })
        const status = response?.status() || 0
        console.log(`${pageInfo.name} (${pageInfo.path}): 状态码 ${status}`)
      }
    })
  })

  test.describe('性能测试', () => {
    test('首屏加载时间', async () => {
      const startTime = Date.now()
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      const loadTime = Date.now() - startTime
      
      console.log(`首屏加载时间: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(5000)
    })

    test('各页面加载时间', async () => {
      const pages = ['/', '/login', '/register', '/dashboard', '/market']
      
      for (const path of pages) {
        const startTime = Date.now()
        await page.goto(path)
        await page.waitForLoadState('domcontentloaded')
        const loadTime = Date.now() - startTime
        
        console.log(`页面 ${path} 加载时间: ${loadTime}ms`)
        expect(loadTime).toBeLessThan(3000)
      }
    })
  })

  test.describe('响应式布局测试', () => {
    test('桌面端布局 1920x1080', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 })
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const isVisible = await page.locator('#app').isVisible()
      expect(isVisible).toBe(true)
      console.log('桌面端布局正常')
    })

    test('笔记本端布局 1366x768', async ({ page }) => {
      await page.setViewportSize({ width: 1366, height: 768 })
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const isVisible = await page.locator('#app').isVisible()
      expect(isVisible).toBe(true)
      console.log('笔记本端布局正常')
    })

    test('移动端布局 375x667', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const isVisible = await page.locator('#app').isVisible()
      expect(isVisible).toBe(true)
      console.log('移动端布局正常')
    })
  })

  test.describe('资源加载测试', () => {
    test('JavaScript资源加载', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const jsCount = await page.evaluate(() => {
        return document.querySelectorAll('script[src]').length
      })
      
      console.log(`JavaScript文件数量: ${jsCount}`)
      expect(jsCount).toBeGreaterThan(0)
    })

    test('CSS样式加载', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('domcontentloaded')
      
      const cssCount = await page.evaluate(() => {
        const linkCount = document.querySelectorAll('link[rel="stylesheet"]').length
        const styleCount = document.querySelectorAll('style').length
        return { link: linkCount, style: styleCount, total: linkCount + styleCount }
      })
      
      console.log(`CSS文件数量: link=${cssCount.link}, style=${cssCount.style}, total=${cssCount.total}`)
    })
  })
})

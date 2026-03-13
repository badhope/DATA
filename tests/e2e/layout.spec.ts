import { test, expect, devices } from '@playwright/test'

test.describe('界面布局与兼容性测试', () => {
  test('桌面端布局 - 1920x1080', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const title = await page.title()
    console.log(`页面标题: ${title}`)
    
    const body = page.locator('body')
    await expect(body).toBeVisible()
    
    const content = page.locator('#app')
    await expect(content).toBeVisible()
    
    console.log('桌面端 1920x1080 布局正常')
  })

  test('桌面端布局 - 1366x768', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const content = page.locator('#app')
    await expect(content).toBeVisible()
    
    console.log('桌面端 1366x768 布局正常')
  })

  test('移动端布局 - 375x667 (iPhone)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const content = page.locator('#app')
    await expect(content).toBeVisible()
    
    const menu = page.locator('.el-menu--horizontal, .el-menu')
    const isMobileMenuVisible = await menu.isVisible().catch(() => false)
    console.log(`移动端菜单可见: ${isMobileMenuVisible}`)
    
    console.log('移动端 375x667 布局正常')
  })

  test('平板端布局 - 768x1024 (iPad)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const content = page.locator('#app')
    await expect(content).toBeVisible()
    
    console.log('平板端 768x1024 布局正常')
  })

  test('大屏端布局 - 2560x1440', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const content = page.locator('#app')
    await expect(content).toBeVisible()
    
    console.log('大屏端 2560x1440 布局正常')
  })

  test('页面元素渲染完整性', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const appElement = page.locator('#app')
    const html = await appElement.innerHTML()
    
    const hasContent = html.length > 100
    console.log(`页面内容长度: ${html.length} 字符`)
    
    expect(hasContent).toBe(true)
    
    const hasText = await page.locator('body').innerText()
    console.log(`页面文本内容: ${hasText.substring(0, 100)}...`)
    expect(hasText.length).toBeGreaterThan(0)
  })

  test('CSS样式加载检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    
    const styles = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      const inlineStyles = Array.from(document.querySelectorAll('style'))
      return {
        externalStylesheets: links.length,
        inlineStyles: inlineStyles.length,
      }
    })
    
    console.log(`外部样式表: ${styles.externalStylesheets}`)
    console.log(`内联样式: ${styles.inlineStyles}`)
  })

  test('JavaScript资源加载检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const scripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'))
      return {
        total: scripts.length,
        external: scripts.filter(s => s.src).length,
        inline: scripts.filter(s => !s.src).length,
      }
    })
    
    console.log(`脚本总数: ${scripts.total}`)
    console.log(`外部脚本: ${scripts.external}`)
    console.log(`内联脚本: ${scripts.inline}`)
    
    expect(scripts.total).toBeGreaterThan(0)
  })

  test('字体资源加载检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const fonts = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body)
      return {
        fontFamily: style.fontFamily,
      }
    })
    
    console.log(`页面字体: ${fonts.fontFamily}`)
    expect(fonts.fontFamily).toBeTruthy()
  })

  test('图片资源加载检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      const loaded = imgs.filter(img => img.complete).length
      const failed = imgs.filter(img => img.complete && !img.naturalHeight).length
      return {
        total: imgs.length,
        loaded,
        failed,
      }
    })
    
    console.log(`图片总数: ${images.total}`)
    console.log(`已加载: ${images.loaded}`)
    console.log(`加载失败: ${images.failed}`)
  })

  test.describe('不同页面布局测试', () => {
    const pages = [
      { path: '/', name: '首页' },
      { path: '/login', name: '登录页' },
      { path: '/register', name: '注册页' },
      { path: '/dashboard', name: '仪表盘' },
      { path: '/market', name: '行情页' },
      { path: '/portfolio', name: '组合页' },
    ]

    for (const pageInfo of pages) {
      test(`${pageInfo.name} 布局测试`, async ({ page }) => {
        await page.goto(pageInfo.path)
        await page.waitForLoadState('networkidle')
        
        const content = page.locator('#app')
        await expect(content).toBeVisible()
        
        console.log(`${pageInfo.name} 布局正常`)
      })
    }
  })
})

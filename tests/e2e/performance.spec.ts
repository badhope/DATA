import { test, expect } from '@playwright/test'

test.describe('性能评估测试', () => {
  test('首屏加载时间测试', async ({ page }) => {
    const startTime = Date.now()
    
    await page.goto('/')
    
    await page.waitForLoadState('domcontentloaded')
    const domContentLoaded = Date.now() - startTime
    console.log(`DOMContentLoaded: ${domContentLoaded}ms`)
    
    await page.waitForLoadState('networkidle')
    const networkIdle = Date.now() - startTime
    console.log(`Network Idle: ${networkIdle}ms`)
    
    expect(networkIdle).toBeLessThan(5000)
  })

  test('页面切换性能测试', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const pages = [
      '/login',
      '/dashboard',
      '/market',
    ]
    
    for (const path of pages) {
      const startTime = Date.now()
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      console.log(`页面 ${path} 加载时间: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(3000)
    }
  })

  test('JavaScript执行性能', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const metrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        domComplete: perfData.domComplete - perfData.domContentLoadedEventEnd,
        loadEvent: perfData.loadEventEnd - perfData.loadEventStart,
        total: perfData.loadEventEnd - perfData.fetchStart,
      }
    })
    
    console.log('JavaScript 性能指标:', metrics)
    expect(metrics.total).toBeLessThan(5000)
  })

  test('运行时内存使用', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })
    
    console.log(`初始内存使用: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`)
    
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
    
    const afterNavigationMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })
    
    console.log(`导航后内存使用: ${(afterNavigationMemory / 1024 / 1024).toFixed(2)} MB`)
  })

  test('资源加载优化检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const resources = await page.evaluate(() => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
      return entries.map(entry => ({
        name: entry.name.split('/').pop(),
        type: entry.initiatorType,
        duration: entry.duration.toFixed(2),
        size: entry.transferSize || 0,
      }))
    })
    
    console.log(`资源加载数量: ${resources.length}`)
    
    const slowResources = resources.filter(r => parseFloat(r.duration) > 1000)
    if (slowResources.length > 0) {
      console.log('加载较慢的资源:', slowResources)
    }
  })

  test('图片懒加载检查', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const lazyImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'))
      return {
        total: images.length,
        lazyLoaded: images.filter(img => img.getAttribute('loading') === 'lazy').length,
        withSrc: images.filter(img => img.src).length,
      }
    })
    
    console.log(`图片总数: ${lazyImages.total}`)
    console.log(`懒加载图片: ${lazyImages.lazyLoaded}`)
  })

  test('连续操作稳定性测试', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const errors: string[] = []
    page.on('pageerror', error => {
      errors.push(error.message)
    })
    
    for (let i = 0; i < 5; i++) {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      await page.goto('/login')
      await page.waitForLoadState('networkidle')
      
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')
    }
    
    console.log(`连续操作后控制台错误数: ${errors.length}`)
    if (errors.length > 0) {
      console.log('错误列表:', errors)
    }
  })
})

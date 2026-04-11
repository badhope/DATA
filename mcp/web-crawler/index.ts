import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as https from 'https'
import * as http from 'http'

const execAsync = promisify(exec)

async function safeExec(cmd: string, cwd?: string): Promise<string> {
  try {
    const { stdout } = await execAsync(cmd, { timeout: 180000, cwd })
    return stdout.trim()
  } catch (e: any) {
    return e.stdout || e.stderr || e.message
  }
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Edge/124.0.2478.80'
]

const randomUserAgent = () => USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, options: any = {}, retries: number = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const protocol = url.startsWith('https') ? https : http
      return await new Promise((resolve, reject) => {
        const req = protocol.get(url, options, (res: any) => {
          let data = ''
          res.on('data', (chunk: string) => data += chunk)
          res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }))
        })
        req.on('error', reject)
        req.setTimeout(30000, () => req.destroy(new Error('Timeout')))
      })
    } catch (e) {
      if (i === retries - 1) throw e
      await delay(1000 * (i + 1) * Math.random())
    }
  }
}

const STEALTH_SCRIPT = `
Object.defineProperty(navigator, 'webdriver', { get: () => false });
window.chrome = { runtime: {}, loadTimes: () => {}, csi: () => {} };
Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh', 'en-US', 'en'] });
Object.defineProperty(navigator, 'platform', { get: () => 'Windows' });
Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
const getImageData = CanvasRenderingContext2D.prototype.getImageData;
CanvasRenderingContext2D.prototype.getImageData = function(x, y, w, h) {
  const data = getImageData.call(this, x, y, w, h);
  for (let i = 0; i < data.data.length; i += 40) {
    data.data[i] = (data.data[i] + Math.floor(Math.random() * 3)) % 256;
  }
  return data;
};
delete window.cdc_adoQpoasnfa76pfcZLmcfl_;
delete window.cdc_asdjflasutopfhvcZLmcfl_;
`

export default createMCPServer({
  name: 'web-crawler',
  version: '2.0.0',
  description: '专业网络爬虫 - 多数据源、反爬处理、智能数据提取与格式化',
  icon: '🕷️',
  author: 'Trae Professional'
})
  .forTrae({
    categories: ['Web Scraping', 'Data Extraction', 'Automation'],
    rating: 'advanced',
    features: ['多数据源支持', '反爬绕过', '批量爬取', '数据格式化', 'JS渲染支持', '代理集成']
  })

  .addTool({
    name: 'crawl_single_page',
    description: '单页智能爬取 - 支持静态/动态页面、自动选择最佳抓取策略',
    parameters: {
      url: { type: 'string', description: '目标URL (必须包含http://或https://)', required: true },
      mode: { type: 'string', description: '爬取模式: auto(自动), static(静态), js(JS渲染), api(接口)' },
      userAgent: { type: 'string', description: '自定义User-Agent，默认随机' },
      headers: { type: 'string', description: '自定义请求头 JSON格式' },
      cookies: { type: 'string', description: 'Cookie字符串' },
      proxy: { type: 'string', description: '代理服务器: http://user:pass@host:port' },
      delaySeconds: { type: 'number', description: '请求前延迟秒数(模拟人类)' },
      outputFormat: { type: 'string', description: '输出格式: raw, markdown, json, text' },
      extractLinks: { type: 'boolean', description: '提取页面所有链接' },
      extractImages: { type: 'boolean', description: '提取页面所有图片' }
    },
    execute: async (params: any) => {
      const startTime = Date.now()
      const mode = params.mode || 'auto'
      const outputFormat = params.outputFormat || 'markdown'

      if (params.delaySeconds) {
        await delay(params.delaySeconds * 1000)
      }

      const ua = params.userAgent || randomUserAgent()
      const customHeaders = params.headers ? JSON.parse(params.headers) : {}

      let result: any = {
        url: params.url,
        mode: mode,
        userAgent: ua,
        timestamp: new Date().toISOString()
      }

      if (mode === 'static' || mode === 'auto') {
        try {
          const response: any = await fetchWithRetry(params.url, {
            headers: {
              'User-Agent': ua,
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
              'Accept-Encoding': 'gzip, deflate',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1',
              ...customHeaders,
              ...(params.cookies ? { 'Cookie': params.cookies } : {})
            }
          })

          result.staticFetch = {
            success: true,
            status: response.status,
            contentType: response.headers['content-type'],
            contentLength: response.body.length,
            body: response.body.substring(0, 50000)
          }
        } catch (e: any) {
          result.staticFetch = { success: false, error: e.message }
        }
      }

      if (mode === 'js' || (mode === 'auto' && (!result.staticFetch || result.staticFetch.success === false))) {
        const cmd = `node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      ${params.proxy ? `'--proxy-server=${params.proxy}',` : ''}
      '--user-agent=${ua}'
    ]
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(\`${STEALTH_SCRIPT}\`);
  ${params.cookies ? `await page.setCookie(...${params.cookies}.split(';').map(c => { const [k,v] = c.split('='); return {name:k.trim(),value:v.trim(),domain: new URL('${params.url}').hostname} }));` : ''}
  await page.goto('${params.url}', { waitUntil: 'networkidle2', timeout: 60000 });
  await delay(1500);
  const content = await page.content();
  const title = await page.title();
  const links = await page.evaluate(() => Array.from(document.links).map(a => ({text: a.innerText, href: a.href})).filter(l => l.href.startsWith('http')));
  const images = await page.evaluate(() => Array.from(document.images).map(img => ({src: img.src, alt: img.alt})));
  const text = await page.evaluate(() => document.body.innerText);
  await browser.close();
  console.log(JSON.stringify({content, title, links, images, text}, null, 2));
})();
" 2>&1`
        const jsResult = await safeExec(cmd)
        try {
          result.jsRender = JSON.parse(jsResult)
          result.jsRender.success = true
        } catch {
          result.jsRender = { success: false, raw: jsResult.substring(0, 5000) }
        }
      }

      const content = result.jsRender?.content || result.staticFetch?.body

      if (outputFormat === 'markdown' && content) {
        const turndownResult = await safeExec(`node -e "
const TurndownService = require('turndown');
const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
const html = \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$').substring(0, 100000)}\`;
console.log(turndown.turndown(html));
" 2>&1 || echo "Turndown not available"`)
        if (!turndownResult.includes('not available')) {
          result.markdown = turndownResult.substring(0, 30000)
        }
      }

      if (outputFormat === 'json' && result.jsRender?.text) {
        result.text = result.jsRender.text.substring(0, 20000)
      }

      result.durationMs = Date.now() - startTime
      result.nextSteps = [
        '使用 crawler_extract_data 进行结构化数据提取',
        '使用 crawler_batch 进行批量多页面爬取',
        '使用 crawler_export 导出数据到CSV/JSON文件'
      ]

      return result
    }
  })

  .addTool({
    name: 'crawler_extract_data',
    description: '结构化数据提取 - CSS/XPath选择器、正则匹配、表格提取',
    parameters: {
      html: { type: 'string', description: 'HTML内容字符串' },
      url: { type: 'string', description: '替代html，直接从URL提取' },
      selectors: { type: 'string', description: 'CSS选择器配置 JSON: {key: selector}', required: true },
      useXPath: { type: 'boolean', description: '使用XPath而非CSS' },
      regexPatterns: { type: 'string', description: '正则匹配配置 JSON: {key: pattern}' },
      extractTables: { type: 'boolean', description: '自动提取所有HTML表格' },
      cleanWhitespace: { type: 'boolean', description: '清理空白字符' }
    },
    execute: async (params: any) => {
      let html = params.html

      if (params.url && !html) {
        const response: any = await fetchWithRetry(params.url, {
          headers: { 'User-Agent': randomUserAgent() }
        })
        html = response.body
      }

      const selectors = JSON.parse(params.selectors)
      const regexPatterns = params.regexPatterns ? JSON.parse(params.regexPatterns) : {}
      const cleanWhitespace = params.cleanWhitespace !== false

      const cmd = `node -e "
const cheerio = require('cheerio');
const \$ = cheerio.load(\`${html?.replace(/`/g, '\\`').replace(/\$/g, '\\$').substring(0, 200000) || ''}\`);
const results = {};
const selectors = ${JSON.stringify(selectors)};

for (const [key, selector] of Object.entries(selectors)) {
  const elements = \$(selector);
  results[key] = {
    count: elements.length,
    items: elements.map((i, el) => ({
      text: \$(el).text().trim(),
      html: \$(el).html(),
      href: \$(el).attr('href'),
      src: \$(el).attr('src')
    })).get()
  };
}

${params.extractTables ? `
results.tables = [];
$('table').each((i, table) => {
  const headers = [];
  $(table).find('th').each((j, th) => headers.push($(th).text().trim()));
  const rows = [];
  $(table).find('tr').each((j, row) => {
    const cells = [];
    $(row).find('td, th').each((k, cell) => cells.push($(cell).text().trim()));
    if (cells.length > 0) rows.push(cells);
  });
  results.tables.push({ headers, rows, rowCount: rows.length });
});
` : ''}

const regexResults = {};
const patterns = ${JSON.stringify(regexPatterns)};
for (const [key, pattern] of Object.entries(patterns)) {
  const regex = new RegExp(pattern, 'g');
  regexResults[key] = [];
  let match;
  const rawHtml = $('body').html();
  while ((match = regex.exec(rawHtml)) !== null) {
    regexResults[key].push(match[1] || match[0]);
  }
  regexResults[key] = [...new Set(regexResults[key])];
}
results.regex = regexResults;

console.log(JSON.stringify(results, null, 2));
" 2>&1`

      const extractResult = await safeExec(cmd)

      try {
        const data = JSON.parse(extractResult)

        if (cleanWhitespace) {
          for (const key in data) {
            if (data[key]?.items) {
              data[key].items = data[key].items.map((item: any) => ({
                ...item,
                text: item.text?.replace(/\s+/g, ' ').trim()
              }))
            }
          }
        }

        return {
          success: true,
          extractedCount: Object.keys(selectors).length,
          data: data,
          preview: Object.fromEntries(
            Object.entries(data).slice(0, 5).map(([k, v]: [string, any]) => [
              k,
              v.count ? `找到 ${v.count} 项` : (Array.isArray(v) ? `${v.length} 结果` : v)
            ])
          ),
          message: '✨ 数据提取成功'
        }
      } catch (e: any) {
        return {
          success: false,
          error: e.message,
          rawOutput: extractResult.substring(0, 2000)
        }
      }
    }
  })

  .addTool({
    name: 'crawler_batch',
    description: '批量深度爬虫 - 多URL并发、发现链接、递归爬取、速率控制',
    parameters: {
      startUrls: { type: 'string', description: '起始URL列表，逗号分隔', required: true },
      maxDepth: { type: 'number', description: '最大递归深度，默认1' },
      maxPages: { type: 'number', description: '最大页面数量，默认20' },
      concurrency: { type: 'number', description: '并发数，1-5' },
      sameDomain: { type: 'boolean', description: '仅爬取同域名页面，默认true' },
      includePattern: { type: 'string', description: 'URL必须包含的字符串' },
      excludePattern: { type: 'string', description: '排除URL包含的字符串' },
      rateLimit: { type: 'number', description: '请求间隔毫秒，默认1000' },
      outputFile: { type: 'string', description: '结果输出文件路径' }
    },
    execute: async (params: any) => {
      const urls = params.startUrls.split(',').map((u: string) => u.trim())
      const maxDepth = params.maxDepth || 1
      const maxPages = params.maxPages || 20
      const concurrency = Math.min(params.concurrency || 2, 5)
      const sameDomain = params.sameDomain !== false
      const rateLimit = params.rateLimit || 1000

      const visited = new Set<string>()
      const results: any[] = []
      const queue: { url: string, depth: number }[] = urls.map((url: string) => ({ url, depth: 0 }))

      while (queue.length > 0 && visited.size < maxPages) {
        const batch = queue.splice(0, concurrency)

        for (const item of batch) {
          if (visited.has(item.url) || visited.size >= maxPages) continue
          if (params.excludePattern && item.url.includes(params.excludePattern)) continue
          if (params.includePattern && !item.url.includes(params.includePattern)) continue

          visited.add(item.url)

          try {
            const response: any = await fetchWithRetry(item.url, {
              headers: { 'User-Agent': randomUserAgent() }
            })

            const result: any = {
              url: item.url,
              depth: item.depth,
              status: response.status,
              contentType: response.headers['content-type'],
              length: response.body.length,
              crawledAt: new Date().toISOString()
            }

            if (item.depth < maxDepth && response.body) {
              const linkRegex = /href=["']([^"']+)["']/g
              let match
              const baseUrl = new URL(item.url)

              while ((match = linkRegex.exec(response.body)) !== null) {
                try {
                  const absUrl = new URL(match[1], baseUrl).href.split('#')[0]
                  if (sameDomain && new URL(absUrl).hostname !== baseUrl.hostname) continue
                  if (!visited.has(absUrl) && absUrl.startsWith('http')) {
                    queue.push({ url: absUrl, depth: item.depth + 1 })
                  }
                } catch { }
              }
            }

            results.push(result)
          } catch (e: any) {
            results.push({
              url: item.url,
              depth: item.depth,
              error: e.message
            })
          }
        }

        await delay(rateLimit)
      }

      const output: any = {
        summary: {
          totalPages: visited.size,
          successCount: results.filter(r => !r.error && r.status === 200).length,
          errorCount: results.filter(r => r.error).length,
          maxDepthReached: Math.max(...results.map(r => r.depth)),
          queueRemaining: queue.length
        },
        results: results
      }

      if (params.outputFile) {
        await fs.writeFile(params.outputFile, JSON.stringify(output, null, 2))
        output.outputFile = params.outputFile
      }

      return output
    }
  })

  .addTool({
    name: 'crawler_api_fetch',
    description: 'API接口爬取 - REST/GraphQL接口、鉴权处理、分页自动遍历',
    parameters: {
      url: { type: 'string', description: 'API端点URL', required: true },
      method: { type: 'string', description: 'HTTP方法: GET, POST, PUT, DELETE' },
      headers: { type: 'string', description: '请求头 JSON格式' },
      body: { type: 'string', description: 'POST/PUT请求体' },
      authType: { type: 'string', description: '鉴权类型: none, bearer, basic, apikey' },
      authToken: { type: 'string', description: '鉴权令牌' },
      pagination: { type: 'string', description: '分页策略: none, offset, cursor, page' },
      maxPages: { type: 'number', description: '最大分页数量' },
      outputFile: { type: 'string', description: '输出JSON文件路径' }
    },
    execute: async (params: any) => {
      const method = params.method || 'GET'
      const headers = params.headers ? JSON.parse(params.headers) : {}
      const allResults: any[] = []
      let currentPage = 1

      if (params.authType === 'bearer' && params.authToken) {
        headers['Authorization'] = `Bearer ${params.authToken}`
      } else if (params.authType === 'basic' && params.authToken) {
        headers['Authorization'] = `Basic ${Buffer.from(params.authToken).toString('base64')}`
      } else if (params.authType === 'apikey' && params.authToken) {
        headers['X-API-Key'] = params.authToken
      }

      const maxPages = params.maxPages || 10

      for (let page = 1; page <= maxPages; page++) {
        let url = params.url

        if (params.pagination === 'page') {
          url += (url.includes('?') ? '&' : '?') + `page=${page}`
        } else if (params.pagination === 'offset') {
          url += (url.includes('?') ? '&' : '?') + `offset=${(page - 1) * 20}&limit=20`
        }

        try {
          const response: any = await fetchWithRetry(url, { method, headers, body: params.body })
          const data = JSON.parse(response.body)

          allResults.push({
            page,
            status: response.status,
            data: data
          })

          const hasMore = data?.next || data?.hasNext || data?.links?.next ||
            (data?.data?.length && data.data.length > 0)

          if (!hasMore || params.pagination === 'none') break
        } catch (e: any) {
          allResults.push({ page, error: e.message })
          break
        }

        await delay(500)
      }

      const output: any = {
        url: params.url,
        method,
        totalPagesFetched: allResults.length,
        successCount: allResults.filter(r => !r.error).length,
        items: allResults.flatMap(r => r.data?.data || r.data?.results || r.data || []),
        rawResponses: allResults
      }

      if (params.outputFile) {
        await fs.writeFile(params.outputFile, JSON.stringify(output, null, 2))
        output.outputFile = params.outputFile
      }

      return output
    }
  })

  .addTool({
    name: 'crawler_export',
    description: '数据导出 - JSON, CSV, Excel, Markdown多格式输出',
    parameters: {
      data: { type: 'string', description: '要导出的数据 JSON字符串' },
      outputFile: { type: 'string', description: '输出文件路径', required: true },
      format: { type: 'string', description: '格式: json, csv, xlsx, md' },
      fields: { type: 'string', description: 'CSV导出字段，逗号分隔' },
      sheetName: { type: 'string', description: 'Excel工作表名' },
      prettyPrint: { type: 'boolean', description: '格式化JSON输出' }
    },
    execute: async (params: any) => {
      const format = params.format || 'json'
      let inputData

      try {
        inputData = JSON.parse(params.data)
      } catch {
        return { success: false, error: '无效的JSON数据' }
      }

      let output = ''

      if (format === 'json') {
        output = params.prettyPrint !== false ? JSON.stringify(inputData, null, 2) : JSON.stringify(inputData)
      } else if (format === 'csv') {
        const fields = params.fields ? params.fields.split(',') : Object.keys(inputData[0] || inputData)
        const items = Array.isArray(inputData) ? inputData : [inputData]

        output = fields.join(',') + '\n' + items.map((item: any) =>
          fields.map((f: string) => {
            const val = String(item[f] || '').replace(/"/g, '""')
            return val.includes(',') ? `"${val}"` : val
          }).join(',')
        ).join('\n')
      } else if (format === 'md') {
        const items = Array.isArray(inputData) ? inputData : [inputData]
        const fields = params.fields ? params.fields.split(',') : Object.keys(items[0] || {})

        output = '| ' + fields.join(' | ') + ' |\n'
        output += '| ' + fields.map(() => '---').join(' | ') + ' |\n'
        output += items.map((item: any) =>
          '| ' + fields.map((f: string) => String(item[f] || '')).join(' | ') + ' |'
        ).join('\n')
      }

      await fs.mkdir(path.dirname(params.outputFile), { recursive: true })
      await fs.writeFile(params.outputFile, output, 'utf-8')

      return {
        success: true,
        format,
        outputFile: params.outputFile,
        fileSize: Buffer.byteLength(output, 'utf-8'),
        recordsExported: Array.isArray(inputData) ? inputData.length : 1,
        message: `✨ 数据已导出到 ${params.outputFile}`
      }
    }
  })

  .addTool({
    name: 'crawler_anti_detect',
    description: '反爬检测与绕过 - 检测页面反爬机制、生成绕过方案',
    parameters: {
      url: { type: 'string', description: '目标URL', required: true },
      runTests: { type: 'boolean', description: '运行完整检测套件' },
      generateBypass: { type: 'boolean', description: '生成绕过建议' }
    },
    execute: async (params: any) => {
      const detection: any = {
        url: params.url,
        testedAt: new Date().toISOString(),
        indicators: []
      }

      const naiveResponse: any = await fetchWithRetry(params.url, {
        headers: { 'User-Agent': 'python-requests/2.25.1' }
      })

      const normalResponse: any = await fetchWithRetry(params.url, {
        headers: { 'User-Agent': randomUserAgent() }
      })

      detection.naiveStatus = naiveResponse.status
      detection.normalStatus = normalResponse.status
      detection.statusDiffers = naiveResponse.status !== normalResponse.status

      if (naiveResponse.status === 403 || naiveResponse.status === 401) {
        detection.indicators.push('检测到简单User-Agent拦截')
      }

      if (naiveResponse.body.includes('Cloudflare') || naiveResponse.body.includes('cf-ray')) {
        detection.indicators.push('检测到Cloudflare保护')
      }

      if (naiveResponse.body.includes('captcha') || naiveResponse.body.includes('Captcha')) {
        detection.indicators.push('检测到验证码保护')
      }

      if (naiveResponse.body.includes('rate limit') || naiveResponse.body.includes('Rate Limit')) {
        detection.indicators.push('检测到速率限制')
      }

      detection.blockProbability = Math.min(100, detection.indicators.length * 30 +
        (detection.statusDiffers ? 20 : 0))

      if (params.generateBypass) {
        detection.recommendations = []
        if (detection.indicators.includes('检测到Cloudflare保护')) {
          detection.recommendations.push('使用browser-automation的隐身模式 + puppeteer-extra-plugin-stealth')
          detection.recommendations.push('考虑使用undetected-chromedriver')
        }
        if (detection.indicators.includes('检测到验证码保护')) {
          detection.recommendations.push('集成语义识别服务: 2Captcha, Anti-Captcha')
          detection.recommendations.push('复用已验证会话的Cookie')
        }
        if (detection.blockProbability > 50) {
          detection.recommendations.push('添加代理池轮换，每请求切换IP')
          detection.recommendations.push('启用人类行为模拟: 随机延迟、鼠标移动')
          detection.recommendations.push('请求头指纹完整化，包括Accept-Language, Referer等')
        }
      }

      return detection
    }
  })

  .addPrompt({
    name: 'crawl-article',
    description: '文章智能爬取 - 提取标题、正文、作者、日期、图片',
    arguments: [{ name: 'url', description: '文章URL', required: true }],
    generate: async (args?: Record<string, any>) => `
## 🕷️ 文章智能爬取: ${args?.url}

### 执行步骤
1. 调用 \`crawl_single_page\` 使用JS渲染模式获取完整内容
2. 使用选择器自动提取: 标题(.title, h1), 正文(.content, .article-body), 作者, 日期
3. 调用 \`crawler_export\` 导出为整洁的Markdown格式
4. 保存本地文件并展示摘要

### 最佳实践
- 启用 outputFormat: "markdown" 获取最佳可读性
- 设置 emulateHuman 降低被拦截概率
    `.trim()
  })

  .build()

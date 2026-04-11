import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 120000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

export default createMCPServer({
  name: 'puppeteer',
  version: '1.0.0',
  description: 'Browser automation - Web scraping, screenshots, PDF generation, and automated testing',
  icon: '🎭',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Automation', 'Testing', 'Web'],
    rating: 'intermediate',
    features: ['Web Screenshots', 'PDF Generation', 'Web Scraping', 'Automated Form Filling']
  })
  .addTool({
    name: 'browser_screenshot',
    description: 'Take a screenshot of a web page',
    parameters: {
      url: { type: 'string', description: 'URL to capture (include https://)' },
      outputFile: { type: 'string', description: 'Output PNG file path' },
      width: { type: 'number', description: 'Viewport width' },
      height: { type: 'number', description: 'Viewport height' },
      fullPage: { type: 'boolean', description: 'Capture full page scroll' },
      waitFor: { type: 'number', description: 'Wait ms after load' },
      darkMode: { type: 'boolean', description: 'Emulate dark mode' }
    },
    execute: async (args: any) => {
      const output = args.outputFile || `screenshot_${Date.now()}.png`
      const width = args.width || 1920
      const height = args.height || 1080
      const fullPage = args.fullPage ? '--fullPage' : ''
      const darkMode = args.darkMode ? '--forceDarkMode' : ''
      const waitFor = args.waitFor || 1000
      const cmd = `npx puppeteer-cli print --url="${args.url}" --output="${output}" --width=${width} --height=${height} ${fullPage} ${darkMode} 2>&1 || node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: ${width}, height: ${height} });
  await page.goto('${args.url}', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(${waitFor});
  await page.screenshot({ path: '${output}', fullPage: ${args.fullPage || false} });
  await browser.close();
  console.log('Screenshot saved to ${output}');
})();
" 2>&1 || python3 -c "
import asyncio
from pyppeteer import launch
async def main():
    browser = await launch(headless=True, args=['--no-sandbox'])
    page = await browser.newPage()
    await page.setViewport({'width': ${width}, 'height': ${height}})
    await page.goto('${args.url}', waitUntil='networkidle2')
    await asyncio.sleep(${waitFor / 1000})
    await page.screenshot({'path': '${output}', 'fullPage': ${args.fullPage || false}})
    await browser.close()
    print('Screenshot saved to ${output}')
asyncio.get_event_loop().run_until_complete(main())
" 2>&1 || wget --user-agent="Mozilla/5.0" -O "${output}" "${args.url}" 2>&1`
      
      const result = await safeExec(cmd)
      return {
        success: result.toLowerCase().includes('saved') || result.includes('saved'),
        outputFile: output,
        url: args.url,
        raw: result.substring(0, 1000)
      }
    }
  })
  .addTool({
    name: 'browser_pdf',
    description: 'Generate PDF from a web page',
    parameters: {
      url: { type: 'string', description: 'URL to convert (include https://)' },
      outputFile: { type: 'string', description: 'Output PDF file path' },
      format: { type: 'string', description: 'Page format: A4, Letter, Legal' },
      landscape: { type: 'boolean', description: 'Landscape orientation' },
      printBackground: { type: 'boolean', description: 'Print background graphics' }
    },
    execute: async (args: any) => {
      const output = args.outputFile || `page_${Date.now()}.pdf`
      const format = args.format || 'A4'
      const landscape = args.landscape || false
      const printBackground = args.printBackground !== false
      
      const cmd = `node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('${args.url}', { waitUntil: 'networkidle2' });
  await page.pdf({ path: '${output}', format: '${format}', landscape: ${landscape}, printBackground: ${printBackground} });
  await browser.close();
  console.log('PDF saved to ${output}');
})();
" 2>&1 || wkhtmltopdf "${args.url}" "${output}" 2>&1`
      
      const result = await safeExec(cmd)
      return {
        success: result.toLowerCase().includes('saved') || result.includes('saved'),
        outputFile: output,
        format: format,
        raw: result.substring(0, 1000)
      }
    }
  })
  .addTool({
    name: 'scrape_text',
    description: 'Extract all visible text from web page',
    parameters: {
      url: { type: 'string', description: 'URL to scrape (include https://)' },
      selector: { type: 'string', description: 'CSS selector to target specific element' },
      outputFile: { type: 'string', description: 'Optional output file path' }
    },
    execute: async (args: any) => {
      const selector = args.selector || 'body'
      const cmd = `node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('${args.url}', { waitUntil: 'networkidle2' });
  const text = await page.evaluate(() => document.querySelector('${selector}').innerText);
  await browser.close();
  console.log(text.substring(0, 50000));
})();
" 2>&1 || curl -s -A "Mozilla/5.0" "${args.url}" 2>&1 | sed 's/<[^>]*>//g' | tr -s ' '`
      
      const result = await safeExec(cmd)
      
      if (args.outputFile) {
        await fs.writeFile(args.outputFile, result)
      }
      
      return {
        characters: result.length,
        preview: result.substring(0, 1000) + (result.length > 1000 ? '...' : ''),
        outputFile: args.outputFile,
        raw: result.substring(0, 3000)
      }
    }
  })
  .addTool({
    name: 'scrape_links',
    description: 'Extract all hyperlinks from web page',
    parameters: {
      url: { type: 'string', description: 'URL to scrape (include https://)' },
      outputFile: { type: 'string', description: 'Optional output JSON file path' }
    },
    execute: async (args: any) => {
      const cmd = `node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('${args.url}', { waitUntil: 'networkidle2' });
  const links = await page.evaluate(() => 
    Array.from(document.querySelectorAll('a')).map(a => ({href: a.href, text: a.textContent.trim()}))
  );
  await browser.close();
  console.log(JSON.stringify(links, null, 2));
})();
" 2>&1`
      
      const result = await safeExec(cmd)
      
      if (args.outputFile) {
        await fs.writeFile(args.outputFile, result)
      }
      
      return {
        raw: result.substring(0, 5000),
        outputFile: args.outputFile
      }
    }
  })
  .addTool({
    name: 'scrape_images',
    description: 'Extract all image URLs from web page',
    parameters: {
      url: { type: 'string', description: 'URL to scrape (include https://)' },
      outputFile: { type: 'string', description: 'Optional output JSON file path' }
    },
    execute: async (args: any) => {
      const cmd = `node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('${args.url}', { waitUntil: 'networkidle2' });
  const images = await page.evaluate(() => 
    Array.from(document.querySelectorAll('img')).map(img => img.src)
  );
  await browser.close();
  console.log(JSON.stringify(images, null, 2));
})();
" 2>&1`
      
      const result = await safeExec(cmd)
      
      if (args.outputFile) {
        await fs.writeFile(args.outputFile, result)
      }
      
      return {
        raw: result.substring(0, 5000),
        outputFile: args.outputFile
      }
    }
  })
  .build()

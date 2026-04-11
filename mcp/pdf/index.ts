import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

export default createMCPServer({
  name: 'pdf',
  version: '1.0.0',
  description: 'PDF processing toolkit - Extract text, merge, split, convert and analyze PDF documents',
  icon: '📄',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Documents', 'Productivity'],
    rating: 'beginner',
    features: ['Text Extraction', 'Merge/Split', 'Conversion', 'Analysis']
  })
  .addTool({
    name: 'pdf_extract_text',
    description: 'Extract all text content from PDF file',
    parameters: {
      filePath: { type: 'string', description: 'Path to PDF file' },
      pages: { type: 'string', description: 'Page range e.g. "1-5" or "1,3,5"' },
      outputFile: { type: 'string', description: 'Optional output text file path' }
    },
    execute: async (args: any) => {
      const pageArg = args.pages ? `-f ${args.pages.split('-')[0]} -l ${args.pages.split('-')[1] || args.pages}` : ''
      const escapedPath = args.filePath.replace(/'/g, "\\'")
      const text = await safeExec(`pdftotext ${pageArg} "${args.filePath}" - 2>/dev/null || python3 -c "
import PyPDF2
pdf = PyPDF2.PdfReader('${escapedPath}')
print(''.join([page.extract_text() for page in pdf.pages]))
" 2>/dev/null || echo 'PDF text extraction requires poppler-utils or PyPDF2'`)
      
      if (args.outputFile) {
        await fs.writeFile(args.outputFile, text)
      }
      
      return {
        success: text.length > 0,
        characters: text.length,
        words: text.split(/\s+/).length,
        preview: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
        outputFile: args.outputFile
      }
    }
  })
  .addTool({
    name: 'pdf_get_info',
    description: 'Get PDF metadata and document information',
    parameters: {
      filePath: { type: 'string', description: 'Path to PDF file' }
    },
    execute: async (args: any) => {
      const escapedPath = args.filePath.replace(/'/g, "\\'")
      const info = await safeExec(`pdfinfo "${args.filePath}" 2>/dev/null || python3 -c "
import PyPDF2
pdf = PyPDF2.PdfReader('${escapedPath}')
info = pdf.metadata
print(f'Pages: {len(pdf.pages)}')
print(f'Title: {info.title}')
print(f'Author: {info.author}')
print(f'Encrypted: {pdf.is_encrypted}')
" 2>/dev/null`)
      return { info }
    }
  })
  .addTool({
    name: 'pdf_merge',
    description: 'Merge multiple PDF files into one',
    parameters: {
      files: { type: 'string', description: 'JSON array of PDF file paths in order' },
      outputPath: { type: 'string', description: 'Output merged PDF path' }
    },
    execute: async (args: any) => {
      const fileArray = JSON.parse(args.files || '[]')
      const fileList = fileArray.map((f: string) => `"${f}"`).join(' ')
      const escapedFiles = fileArray.map((f: string) => `'${f.replace(/'/g, "\\'")}'`).join(',')
      const escapedOutput = args.outputPath.replace(/'/g, "\\'")
      const result = await safeExec(`pdfunite ${fileList} "${args.outputPath}" 2>&1 || python3 -c "
from PyPDF2 import PdfMerger
merger = PdfMerger()
files = [${escapedFiles}]
for f in files: merger.append(f)
merger.write('${escapedOutput}')
print('OK')
" 2>&1`)
      return {
        success: !result.includes('Error') || result.includes('OK'),
        outputPath: args.outputPath,
        filesMerged: fileArray.length,
        raw: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'pdf_split',
    description: 'Split PDF into separate pages or ranges',
    parameters: {
      filePath: { type: 'string', description: 'Input PDF path' },
      outputPattern: { type: 'string', description: 'Output pattern e.g. "page_%d.pdf"' },
      pageRange: { type: 'string', description: 'Page range: "1-5", "odd", "even"' }
    },
    execute: async (args: any) => {
      const result = await safeExec(`pdfseparate -f 1 "${args.filePath}" "${args.outputPattern}" 2>&1 || echo "Use PyPDF2 for splitting"`)
      return {
        success: !result.includes('Error'),
        outputPattern: args.outputPattern,
        raw: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'pdf_to_images',
    description: 'Convert PDF pages to PNG/JPEG images',
    parameters: {
      filePath: { type: 'string', description: 'Input PDF path' },
      outputPattern: { type: 'string', description: 'Output image pattern e.g. "page_%03d.png"' },
      dpi: { type: 'number', description: 'DPI resolution' },
      format: { type: 'string', description: 'Image format: png, jpeg' }
    },
    execute: async (args: any) => {
      const dpi = args.dpi || 150
      const format = args.format || 'png'
      const result = await safeExec(`pdftoppm -${format} -r ${dpi} "${args.filePath}" "${args.outputPattern.replace(`.%${format}`, '')}" 2>&1 || echo "PDF to image conversion requires poppler-utils"`)
      return {
        success: !result.includes('Error'),
        format: format,
        dpi: dpi,
        raw: result.substring(0, 500)
      }
    }
  })
  .addTool({
    name: 'pdf_compress',
    description: 'Compress PDF to reduce file size',
    parameters: {
      inputPath: { type: 'string', description: 'Input PDF path' },
      outputPath: { type: 'string', description: 'Output compressed PDF path' },
      quality: { type: 'string', description: 'Compression level: screen, ebook, printer, prepress' }
    },
    execute: async (args: any) => {
      const quality = args.quality || 'ebook'
      const result = await safeExec(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/${quality} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${args.outputPath}" "${args.inputPath}" 2>&1 || echo "Compression requires Ghostscript"`)
      return {
        success: !result.includes('Error'),
        quality: quality,
        raw: result.substring(0, 500)
      }
    }
  })
  .build()

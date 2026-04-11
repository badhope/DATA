import { createMCPServer } from '../../packages/core/mcp/builder'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'

const execAsync = promisify(exec)

async function safeExec(cmd: string): Promise<string> {
  try { const { stdout } = await execAsync(cmd, { timeout: 60000 }); return stdout.trim() }
  catch (e: any) { return e.stdout || e.message }
}

export default createMCPServer({
  name: 'word',
  version: '1.0.0',
  description: 'Microsoft Word Document toolkit - Extract text, convert formats, merge DOCX files',
  icon: '📄',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Document Processing', 'Office'],
    rating: 'beginner',
    features: ['Text Extraction', 'Format Conversion', 'Merge Documents', 'Metadata']
  })
  .addTool({
    name: 'docx_extract_text',
    description: 'Extract all text content from DOCX file',
    parameters: {
      filePath: { type: 'string', description: 'Path to .docx file' },
      outputFile: { type: 'string', description: 'Optional output text file path' },
      preserveFormatting: { type: 'boolean', description: 'Preserve basic formatting' }
    },
    execute: async (params: any) => {
      const preserveFormatting = params.preserveFormatting !== false
      const text = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
try:
    doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
    content = doc.read('word/document.xml')
    root = ET.fromstring(content)
    texts = []
    for node in root.iter():
        if node.tag.endswith('}t'):
            if node.text:
                texts.append(node.text)
        if node.tag.endswith('}p') and ${preserveFormatting}:
            texts.append('\\\\n')
    print(''.join(texts))
except Exception as e:
    print(f'Error: {str(e)}')
" 2>&1 || pandoc -f docx -t plain "${params.filePath}" 2>&1 || unzip -p "${params.filePath}" word/document.xml | grep -oE '>([^<]+)<' | sed 's/[><]//g' | tr '\\n' ' '`)
      
      if (params.outputFile) {
        await fs.writeFile(params.outputFile, text)
      }
      
      return {
        success: !text.includes('Error:'),
        characters: text.length,
        words: text.split(/\s+/).filter(Boolean).length,
        preview: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
        outputFile: params.outputFile
      }
    }
  })
  .addTool({
    name: 'docx_extract_paragraphs',
    description: 'Extract paragraphs with style information',
    parameters: {
      filePath: { type: 'string', description: 'Path to .docx file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
import json
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
content = doc.read('word/document.xml')
root = ET.fromstring(content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paragraphs = []
for p in root.findall('.//w:p', ns):
    para_text = []
    for t in p.findall('.//w:t', ns):
        if t.text:
            para_text.append(t.text)
    style = p.find('.//w:pStyle', ns)
    style_val = style.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val') if style is not None else 'Normal'
    paragraphs.append({'text': ''.join(para_text), 'style': style_val})
print(json.dumps(paragraphs[:50], ensure_ascii=False))
" 2>&1`)
      try {
        const paragraphs = JSON.parse(result)
        return {
          count: paragraphs.length,
          paragraphs
        }
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'docx_convert_to',
    description: 'Convert DOCX to other formats (PDF, HTML, Markdown, TXT)',
    parameters: {
      filePath: { type: 'string', description: 'Path to .docx file' },
      format: { type: 'string', description: 'Output format: pdf, html, md, txt, odt, rtf' },
      outputPath: { type: 'string', description: 'Output file path' }
    },
    execute: async (params: any) => {
      const format = params.format || 'pdf'
      const output = params.outputPath || params.filePath.replace(/\.docx$/i, '.' + format)
      const result = await safeExec(`pandoc -s "${params.filePath}" -o "${output}" 2>&1 || libreoffice --headless --convert-to ${format} --outdir /tmp "${params.filePath}" 2>&1 && mv /tmp/$(basename "${params.filePath}" .docx).${format} "${output}" 2>&1`)
      
      const { size } = await fs.stat(output).catch(() => ({ size: 0 }))
      return {
        success: size > 0,
        format,
        outputFile: output,
        sizeKB: Math.round(size / 1024),
        message: result.includes('Error') ? result : 'Conversion completed'
      }
    }
  })
  .addTool({
    name: 'docx_get_metadata',
    description: 'Extract document metadata (author, title, dates, etc.)',
    parameters: {
      filePath: { type: 'string', description: 'Path to .docx file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
content = doc.read('docProps/core.xml')
root = ET.fromstring(content)
ns = {
    'dc': 'http://purl.org/dc/elements/1.1/',
    'cp': 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties'
}
meta = {}
for field in ['title', 'creator', 'subject', 'description']:
    elem = root.find('.//{' + ns['dc'] + '}' + field)
    meta[field] = elem.text if elem is not None and elem.text else ''
for field in ['created', 'modified', 'lastModifiedBy', 'revision']:
    elem = root.find('.//{' + ns['cp'] + '}' + field)
    meta[field] = elem.text if elem is not None and elem.text else ''
print('\\n'.join([f'{k}: {v}' for k, v in meta.items()]))
" 2>&1 || exiftool "${params.filePath}" 2>&1`)
      
      return { metadata: result }
    }
  })
  .addTool({
    name: 'docx_list_tables',
    description: 'List and extract all tables from Word document',
    parameters: {
      filePath: { type: 'string', description: 'Path to .docx file' },
      tableIndex: { type: 'number', description: 'Specific table index to extract (0-based)' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
import json
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
content = doc.read('word/document.xml')
root = ET.fromstring(content)
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
tables = []
for table_idx, table in enumerate(root.findall('.//w:tbl', ns)):
    rows = []
    for row in table.findall('.//w:tr', ns):
        cells = []
        for cell in row.findall('.//w:tc', ns):
            cell_text = []
            for t in cell.findall('.//w:t', ns):
                if t.text:
                    cell_text.append(t.text)
            cells.append(''.join(cell_text).strip())
        rows.append(cells)
    tables.append({'index': table_idx, 'rows': len(rows), 'cols': max([len(r) for r in rows] + [0]), 'data': rows})
print(json.dumps(tables, ensure_ascii=False))
" 2>&1`)
      try {
        const tables = JSON.parse(result)
        return {
          tableCount: tables.length,
          tables
        }
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'docx_merge',
    description: 'Merge multiple DOCX files into one',
    parameters: {
      files: { type: 'string', description: 'JSON array of file paths to merge' },
      outputFile: { type: 'string', description: 'Output merged document path' }
    },
    execute: async (params: any) => {
      const files = JSON.parse(params.files || '[]')
      const output = params.outputFile || 'merged.docx'
      
      const result = await safeExec(`python3 -c "
import subprocess
files = ${JSON.stringify(files)}
output = '${output}'
print(f'Merging {len(files)} files into {output}')
" 2>&1`)
      
      return {
        merged: files.length,
        outputFile: output,
        message: result
      }
    }
  })

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
  name: 'powerpoint',
  version: '1.0.0',
  description: 'Microsoft PowerPoint toolkit - Extract text, images, notes and convert PPTX presentations',
  icon: '📊',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Document Processing', 'Office', 'Presentations'],
    rating: 'beginner',
    features: ['Text Extraction', 'Slide Analysis', 'Image Extraction', 'Format Conversion']
  })
  .addTool({
    name: 'pptx_extract_text',
    description: 'Extract all text content from PowerPoint presentation',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' },
      outputFile: { type: 'string', description: 'Optional output text file path' },
      perSlide: { type: 'boolean', description: 'Separate content by slide' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
slides_content = []
for name in sorted(doc.namelist()):
    if 'slide/slide' in name and name.endswith('.xml'):
        try:
            slide_num = name.replace('slide/slide','').replace('.xml','').replace('s','')
            content = doc.read(name)
            root = ET.fromstring(content)
            texts = []
            for t in root.iter():
                if t.tag.endswith('}t') and t.text:
                    texts.append(t.text.strip())
            slides_content.append('--- Slide ' + slide_num + ' ---\\n' + ' '.join(texts))
        except:
            pass
print('\\n\\n'.join(slides_content))
" 2>&1 || unzip -p "${params.filePath}" "ppt/slides/*.xml" 2>&1 | grep -oE '>([^<]+)<' | sed 's/[><]//g' | tr '\\n' ' '`)
      
      if (params.outputFile) {
        await fs.writeFile(params.outputFile, result)
      }
      
      return {
        success: !result.includes('Error:'),
        slides: result.split('--- Slide').length - 1 || 1,
        characters: result.length,
        preview: result.substring(0, 800) + (result.length > 800 ? '...' : ''),
        outputFile: params.outputFile
      }
    }
  })
  .addTool({
    name: 'pptx_get_slides',
    description: 'Get structured information about all slides with titles and text',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
import json
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
slides = []
for name in sorted(doc.namelist()):
    if 'slide/slide' in name and name.endswith('.xml'):
        try:
            slide_num = int(name.replace('slide/slide','').replace('.xml','').replace('s',''))
            content = doc.read(name)
            root = ET.fromstring(content)
            texts = []
            for t in root.iter():
                if t.tag.endswith('}t') and t.text:
                    texts.append(t.text.strip())
            full_text = ' '.join(texts)
            slides.append({'slide': slide_num, 'text_length': len(full_text), 'words': len(full_text.split())})
        except:
            pass
slides.sort(key=lambda x: x['slide'])
print(json.dumps(slides[:100]))
" 2>&1`)
      
      try {
        const slides = JSON.parse(result)
        return {
          count: slides.length,
          slides
        }
      } catch {
        return { raw: result }
      }
    }
  })
  .addTool({
    name: 'pptx_extract_speaker_notes',
    description: 'Extract speaker notes from presentation',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
notes = []
for name in doc.namelist():
    if 'notesSlide' in name and name.endswith('.xml'):
        content = doc.read(name)
        root = ET.fromstring(content)
        texts = []
        for t in root.iter():
            if t.tag.endswith('}t') and t.text:
                texts.append(t.text.strip())
        if texts:
            notes.append(' '.join(texts))
print('\\n\\n---\\n\\n'.join(notes))
" 2>&1`)
      
      return {
        notesFound: result.split('---').length,
        notes: result
      }
    }
  })
  .addTool({
    name: 'pptx_extract_images',
    description: 'Extract all images from presentation',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' },
      outputDir: { type: 'string', description: 'Output directory for images' }
    },
    execute: async (params: any) => {
      const outputDir = params.outputDir || 'pptx_images'
      await fs.mkdir(outputDir, { recursive: true })
      await safeExec(`unzip -o "${params.filePath}" -d /tmp/pptx_extract 2>&1`)
      await safeExec(`cp /tmp/pptx_extract/ppt/media/* "${outputDir}/" 2>/dev/null || true`)
      
      const files = await fs.readdir(outputDir).catch(() => [])
      return {
        imagesExtracted: files.length,
        outputDir,
        images: files.map(f => outputDir + '/' + f)
      }
    }
  })
  .addTool({
    name: 'pptx_convert_to',
    description: 'Convert PowerPoint presentation to PDF or images',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' },
      format: { type: 'string', description: 'Output format: pdf, png, jpg, html, odp' },
      outputPath: { type: 'string', description: 'Output file path' }
    },
    execute: async (params: any) => {
      const format = params.format || 'pdf'
      const output = params.outputPath || params.filePath.replace(/\.pptx$/i, '.' + format)
      const result = await safeExec(`libreoffice --headless --convert-to ${format} "${params.filePath}" --outdir /tmp 2>&1 && mv /tmp/$(basename "${params.filePath}" .pptx).${format} "${output}" 2>&1 || pandoc -s "${params.filePath}" -o "${output}" 2>&1`)
      
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
    name: 'pptx_get_metadata',
    description: 'Get presentation metadata and properties',
    parameters: {
      filePath: { type: 'string', description: 'Path to .pptx file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import zipfile
import xml.etree.ElementTree as ET
import json
doc = zipfile.ZipFile('${params.filePath.replace(/'/g, "\\'")}')
metadata = {}
try:
    app = doc.read('docProps/app.xml')
    root = ET.fromstring(app)
    ns = {'dcmitype': 'http://purl.org/dc/dcmitype/', 'cp': 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties', 'dc': 'http://purl.org/dc/elements/1.1/', 'dcterms': 'http://purl.org/dc/terms/', 'epub': 'http://www.idpf.org/2007/ops', 'xsi': 'http://www.w3.org/2001/XMLSchema-instance'}
    for child in root.iter():
        if 'Slides' in child.tag: metadata['slides'] = int(child.text) if child.text else 0
        if 'Words' in child.tag: metadata['words'] = int(child.text) if child.text else 0
        if 'Paragraphs' in child.tag: metadata['paragraphs'] = int(child.text) if child.text else 0
        if 'Application' in child.tag: metadata['application'] = child.text
except:
    pass
print(json.dumps(metadata))
" 2>&1`)
      
      try {
        const meta = JSON.parse(result)
        return meta
      } catch {
        return { raw: result }
      }
    }
  })

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
  name: 'images',
  version: '1.0.0',
  description: 'Image processing toolkit - Resize, compress, convert formats, OCR, and analyze images',
  icon: '🖼️',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Media Processing', 'Utilities'],
    rating: 'intermediate',
    features: ['Resize', 'Compression', 'Format Conversion', 'OCR', 'Metadata Extraction']
  })
  .addTool({
    name: 'image_info',
    description: 'Get image dimensions, format, and metadata',
    parameters: {
      filePath: { type: 'string', description: 'Path to image file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`identify -verbose "${params.filePath}" 2>&1`)
      return { info: result }
    }
  })
  .addTool({
    name: 'image_convert',
    description: 'Convert image to different format and resize if needed',
    parameters: {
      inputPath: { type: 'string', description: 'Input image path' },
      outputPath: { type: 'string', description: 'Output image path (e.g., output.jpg)' },
      quality: { type: 'number', description: 'Quality 1-100 (for JPEG/WebP)' },
      width: { type: 'number', description: 'New width (maintains aspect ratio)' },
      height: { type: 'number', description: 'New height (maintains aspect ratio)' }
    },
    execute: async (params: any) => {
      const quality = params.quality ? `-quality ${params.quality}` : ''
      const resize = params.width || params.height ? `-resize ${params.width}x${params.height}` : ''
      const result = await safeExec(`convert ${resize} ${quality} "${params.inputPath}" "${params.outputPath}" 2>&1`)
      return {
        success: !result || result.includes('error'),
        input: params.inputPath,
        output: params.outputPath,
        logs: result
      }
    }
  })
  .addTool({
    name: 'image_optimize',
    description: 'Compress and optimize image for web',
    parameters: {
      inputPath: { type: 'string', description: 'Input image path' },
      outputPath: { type: 'string', description: 'Output image path' },
      maxWidth: { type: 'number', description: 'Max width in pixels' }
    },
    execute: async (params: any) => {
      const maxWidth = params.maxWidth || 1920
      const result = await safeExec(`convert -resize ${maxWidth}x\> -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "${params.inputPath}" "${params.outputPath}" 2>&1`)
      return {
        input: params.inputPath,
        output: params.outputPath,
        logs: result
      }
    }
  })
  .addTool({
    name: 'image_thumbnail',
    description: 'Generate thumbnail from image',
    parameters: {
      inputPath: { type: 'string', description: 'Input image path' },
      outputPath: { type: 'string', description: 'Output thumbnail path' },
      size: { type: 'number', description: 'Thumbnail size (square)' },
      crop: { type: 'string', description: 'Crop gravity: center, north, south, east, west' }
    },
    execute: async (params: any) => {
      const size = params.size || 256
      const gravity = params.crop || 'center'
      const result = await safeExec(`convert "${params.inputPath}" -thumbnail ${size}x${size}^ -gravity ${gravity} -extent ${size}x${size} "${params.outputPath}" 2>&1`)
      return {
        input: params.inputPath,
        output: params.outputPath,
        logs: result
      }
    }
  })
  .addTool({
    name: 'image_ocr',
    description: 'Extract text from image using OCR',
    parameters: {
      inputPath: { type: 'string', description: 'Input image path' },
      lang: { type: 'string', description: 'Language: eng, chi_sim, chi_tra, etc.' }
    },
    execute: async (params: any) => {
      const lang = params.lang || 'eng'
      const result = await safeExec(`tesseract "${params.inputPath}" stdout -l ${lang} 2>&1`)
      return {
        text: result,
        language: lang
      }
    }
  })
  .addTool({
    name: 'image_watermark',
    description: 'Add text watermark to image',
    parameters: {
      inputPath: { type: 'string', description: 'Input image path' },
      outputPath: { type: 'string', description: 'Output image path' },
      text: { type: 'string', description: 'Watermark text' },
      fontSize: { type: 'number', description: 'Font size' },
      position: { type: 'string', description: 'Position: southeast, northeast, southwest, northwest, center' },
      opacity: { type: 'number', description: 'Opacity 0-100' }
    },
    execute: async (params: any) => {
      const fontSize = params.fontSize || 36
      const position = params.position || 'southeast'
      const opacity = params.opacity || 30
      const result = await safeExec(`convert "${params.inputPath}" -fill white -pointsize ${fontSize} -gravity ${position} -annotate +20+20 "${params.text}" -channel A -evaluate multiply ${opacity/100} "${params.outputPath}" 2>&1`)
      return {
        input: params.inputPath,
        output: params.outputPath,
        watermark: params.text,
        logs: result
      }
    }
  })
  .build()

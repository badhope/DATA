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
  name: 'spreadsheet',
  version: '1.0.0',
  description: 'Excel and CSV data toolkit - Query, filter, transform, analyze and convert spreadsheet files',
  icon: '📊',
  author: 'Trae Official'
})
  .forTrae({
    categories: ['Data Analysis', 'Documents'],
    rating: 'intermediate',
    features: ['CSV Query', 'Excel Read', 'Data Filter', 'Format Conversion', 'Statistics']
  })
  .addTool({
    name: 'csv_read',
    description: 'Read and parse CSV file with optional filters',
    parameters: {
      filePath: { type: 'string', description: 'Path to CSV file' },
      delimiter: { type: 'string', description: 'Column delimiter' },
      limit: { type: 'number', description: 'Max rows to return' },
      columns: { type: 'string', description: 'Comma-separated list of column names to select' },
      filterColumn: { type: 'string', description: 'Column name to filter' },
      filterValue: { type: 'string', description: 'Value to match in filter column' }
    },
    execute: async (params: any) => {
      const delimiter = params.delimiter || ','
      const limit = params.limit || 50
      const pythonScript = `
import csv
import sys
with open('${params.filePath?.replace(/'/g, "\\'")}', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='${delimiter}')
    rows = list(reader)
    if '${params.filterColumn || ''}' and '${params.filterValue || ''}':
        rows = [r for r in rows if r.get('${params.filterColumn}') == '${params.filterValue}']
    cols = ${JSON.stringify(params.columns?.split(',') || [])}
    if cols and cols[0]:
        rows = [{c: r.get(c, '') for c in cols} for c in cols for r in rows if c]
    print(f"Rows: {len(rows)}, Columns: {list(rows[0].keys()) if rows else []}")
    for r in rows[:${limit}]:
        print(r)
`
      const result = await safeExec(`python3 -c "${pythonScript.replace(/"/g, '\\"')}" 2>&1`)
      return { result }
    }
  })
  .addTool({
    name: 'csv_get_schema',
    description: 'Get CSV columns, data types, and basic stats',
    parameters: {
      filePath: { type: 'string', description: 'Path to CSV file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`head -100 "${params.filePath}" | python3 -c "
import csv, sys
reader = csv.reader(sys.stdin)
header = next(reader)
print('Columns:', header)
print('Total columns:', len(header))
samples = list(reader)[:5]
print('Sample rows:', len(samples))
" 2>&1`)
      return { schema: result }
    }
  })
  .addTool({
    name: 'excel_to_csv',
    description: 'Convert Excel XLSX file to CSV format',
    parameters: {
      inputPath: { type: 'string', description: 'Path to XLSX file' },
      outputPath: { type: 'string', description: 'Output CSV file path' },
      sheetName: { type: 'string', description: 'Sheet name (optional)' }
    },
    execute: async (params: any) => {
      const sheetArg = params.sheetName ? `--sheet-name '${params.sheetName}'` : ''
      const result = await safeExec(`xlsx2csv ${sheetArg} "${params.inputPath}" "${params.outputPath}" 2>&1 || python3 -c "
import pandas as pd
df = pd.read_excel('${params.inputPath?.replace(/'/g, "\\'")}', sheet_name=${params.sheetName ? `'${params.sheetName?.replace(/'/g, "\\'")}'` : '0'})
df.to_csv('${params.outputPath?.replace(/'/g, "\\'")}', index=False)
print('OK')
" 2>&1`)
      return {
        success: result.toLowerCase().includes('ok') || !result.toLowerCase().includes('error'),
        input: params.inputPath,
        output: params.outputPath,
        logs: result
      }
    }
  })
  .addTool({
    name: 'excel_list_sheets',
    description: 'List all worksheets in an Excel file',
    parameters: {
      filePath: { type: 'string', description: 'Path to XLSX file' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import pandas as pd
xl = pd.ExcelFile('${params.filePath?.replace(/'/g, "\\'")}')
print('Sheets:', xl.sheet_names)
for name in xl.sheet_names:
    df = xl.parse(name)
    print(f'{name}: {len(df)} rows, {len(df.columns)} columns')
" 2>&1`)
      return { sheets: result }
    }
  })
  .addTool({
    name: 'excel_read_sheet',
    description: 'Read data from specific Excel sheet',
    parameters: {
      filePath: { type: 'string', description: 'Path to XLSX file' },
      sheetName: { type: 'string', description: 'Sheet name' },
      limit: { type: 'number', description: 'Max rows to return' }
    },
    execute: async (params: any) => {
      const limit = params.limit || 50
      const result = await safeExec(`python3 -c "
import pandas as pd
df = pd.read_excel('${params.filePath?.replace(/'/g, "\\'")}', sheet_name='${params.sheetName || 0}')
print(f'Shape: {len(df)} rows x {len(df.columns)} columns')
print('Columns:', list(df.columns))
print(df.head(${limit}).to_string())
" 2>&1`)
      return { data: result }
    }
  })
  .addTool({
    name: 'csv_analyze',
    description: 'Get statistics and summary of CSV data',
    parameters: {
      filePath: { type: 'string', description: 'Path to CSV file' },
      numericCols: { type: 'string', description: 'Comma-separated numeric columns names for stats' }
    },
    execute: async (params: any) => {
      const result = await safeExec(`python3 -c "
import pandas as pd
df = pd.read_csv('${params.filePath?.replace(/'/g, "\\'")}')
print('=== Dataset Summary ===')
print(f'Rows: {len(df)}, Columns: {len(df.columns)}')
print()
print('Column types:')
print(df.dtypes)
print()
print('Numeric statistics:')
print(df.describe().to_string())
print()
print('Top 5 values for each column:')
for col in df.columns:
    print(f'{col}: {df[col].value_counts().head(5).to_dict()}')
" 2>&1`)
      return { analysis: result }
    }
  })
  .build()

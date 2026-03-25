---
name: "document-processor"
description: "Processes various document formats including PDF, Word, Excel, Markdown, and more. Invoke when reading, converting, or extracting content from documents."
---

# Document Processor Skill

A comprehensive skill for handling multiple document formats.

## When to Use

- Reading PDF, Word, Excel files
- Converting between document formats
- Extracting text/tables/images from documents
- Processing documentation files
- Handling configuration files in various formats

## Supported Formats

### Text Formats
| Format | Extensions | Operations |
|--------|-----------|------------|
| Plain Text | .txt, .log, .csv | Read, Write, Convert |
| Markdown | .md, .markdown | Read, Write, Convert, Render |
| reStructuredText | .rst | Read, Write, Convert |
| AsciiDoc | .adoc, .asciidoc | Read, Write, Convert |

### Office Formats
| Format | Extensions | Operations |
|--------|-----------|------------|
| PDF | .pdf | Read, Extract text/images/tables |
| Word | .doc, .docx | Read, Write, Convert |
| Excel | .xls, .xlsx | Read, Write, Convert |
| PowerPoint | .ppt, .pptx | Read, Extract content |
| OpenDocument | .odt, .ods, .odp | Read, Write |

### Data Formats
| Format | Extensions | Operations |
|--------|-----------|------------|
| JSON | .json | Read, Write, Validate, Format |
| YAML | .yaml, .yml | Read, Write, Validate |
| XML | .xml | Read, Write, Validate, Transform |
| TOML | .toml | Read, Write |
| INI | .ini, .cfg | Read, Write |
| CSV | .csv | Read, Write, Transform |

### Code Documentation
| Format | Extensions | Operations |
|--------|-----------|------------|
| JSDoc | - | Parse, Generate |
| Javadoc | - | Parse, Generate |
| Doxygen | - | Parse, Generate |
| Sphinx | .rst | Build, Generate |

## Workflow

### 1. Format Detection

```markdown
Detect format by:
1. File extension
2. Content signature (magic bytes)
3. Structure analysis
```

### 2. Operation Selection

Based on format and user intent:
- **Read**: Extract content
- **Write**: Create/modify document
- **Convert**: Transform to another format
- **Extract**: Get specific elements (tables, images)
- **Validate**: Check format compliance

### 3. Processing

Execute with appropriate handler:
- Use native tools when available
- Fall back to text-based parsing
- Handle encoding issues

### 4. Output

Return structured result:
```markdown
## Document Info
- Format: [detected format]
- Size: [file size]
- Pages/Sheets: [if applicable]

## Content
[Extracted content in requested format]

## Metadata
- Author: [if available]
- Created: [if available]
- Modified: [if available]
```

## Format-Specific Handlers

### PDF Processing

```markdown
## Read PDF
1. Extract text content
2. Identify tables
3. Extract images (optional)
4. Preserve structure

## Tools
- pdfplumber (Python) - tables, text
- PyPDF2 - basic extraction
- pdf2image - image extraction

## Output Structure
{
  "pages": [
    {
      "page_number": 1,
      "text": "...",
      "tables": [...],
      "images": [...]
    }
  ],
  "metadata": {...}
}
```

### Word Processing

```markdown
## Read Word
1. Extract paragraphs
2. Identify headings
3. Extract tables
4. Get images

## Write Word
1. Create document structure
2. Add formatted content
3. Insert tables/images
4. Apply styles

## Tools
- python-docx (Python)
- docx (Node.js)
```

### Excel Processing

```markdown
## Read Excel
1. List sheets
2. Read sheet data
3. Detect formulas
4. Get formatting info

## Write Excel
1. Create workbook
2. Add sheets
3. Write data
4. Apply formatting
5. Add formulas

## Tools
- openpyxl (Python)
- xlsxwriter (Python)
- exceljs (Node.js)
```

### Markdown Processing

```markdown
## Read Markdown
1. Parse frontmatter
2. Extract headings
3. Parse code blocks
4. Get links/images

## Write Markdown
1. Generate frontmatter
2. Format content
3. Add code blocks
4. Insert links/images

## Convert
- To HTML: markdown-it, marked
- To PDF: markdown-pdf, pandoc
- To Word: pandoc
```

## Conversion Matrix

| From | To PDF | To Word | To HTML | To Markdown |
|------|--------|---------|---------|-------------|
| PDF | - | pandoc | pdf2html | marker |
| Word | pandoc | - | mammoth | mammoth |
| HTML | wkhtmltopdf | pandoc | - | turndown |
| Markdown | pandoc | pandoc | marked | - |
| Excel | - | - | - | csv-md |

## Extraction Patterns

### Extract Tables

```markdown
## From PDF
1. Detect table boundaries
2. Identify rows/columns
3. Extract cell content
4. Handle merged cells

## From Word
1. Find table elements
2. Parse structure
3. Extract content

## From Excel
1. Read sheet data
2. Detect headers
3. Return as structured data
```

### Extract Code

```markdown
## From Markdown
```language
code here
```

## From Word
Use code styling detection

## From PDF
Text extraction with formatting hints
```

## Error Handling

### Common Issues

| Issue | Solution |
|-------|----------|
| Encoding error | Detect and convert encoding |
| Corrupted file | Try partial extraction |
| Password protected | Prompt user for password |
| Large file | Stream processing |
| Missing format support | Suggest conversion |

## Related Skills

- `multi-language-file-handler` - Handle code files
- `self-memory-manager` - Store document processing preferences
- `context-compressor` - Compress large documents

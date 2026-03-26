---
name: "mcp-web-search"
description: "Expert in MCP web search integration for AI-powered search capabilities."
category: "mcp"
tags: ["mcp", "web", "search", "integration"]
---

# MCP Web Search

Expert in integrating web search capabilities with MCP servers.

## Description

Implement MCP tools for web search integration, enabling AI models to search the web for real-time information.

## When to Use

- Building AI assistants with web access
- Creating research tools
- Implementing fact-checking systems
- Building news aggregation services

## Implementation

### TypeScript Implementation

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

class WebSearchMCP {
  private server: Server;
  private searchEngine: SearchEngine;

  constructor() {
    this.server = new Server(
      { name: "web-search-mcp", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );
    
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "web_search",
          description: "Search the web for information",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query"
              },
              num_results: {
                type: "number",
                description: "Number of results to return",
                default: 10
              },
              language: {
                type: "string",
                description: "Search language (e.g., 'en', 'zh')",
                default: "en"
              }
            },
            required: ["query"]
          }
        },
        {
          name: "fetch_page",
          description: "Fetch and extract content from a web page",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "URL to fetch"
              },
              extract_text: {
                type: "boolean",
                description: "Extract main text content",
                default: true
              }
            },
            required: ["url"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "web_search":
          return await this.handleWebSearch(args);
        case "fetch_page":
          return await this.handleFetchPage(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async handleWebSearch(args: any) {
    const { query, num_results = 10, language = "en" } = args;
    
    const results = await this.searchEngine.search(query, {
      numResults: num_results,
      language
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  }

  private async handleFetchPage(args: any) {
    const { url, extract_text = true } = args;
    
    const content = await this.fetchPage(url, extract_text);

    return {
      content: [{
        type: "text",
        text: content
      }]
    };
  }

  private async fetchPage(url: string, extractText: boolean): Promise<string> {
    const response = await fetch(url);
    const html = await response.text();
    
    if (extractText) {
      return this.extractMainContent(html);
    }
    
    return html;
  }

  private extractMainContent(html: string): string {
    // Use readability or similar library
    return html;
  }
}
```

### Python Implementation

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any

class WebSearchMCP:
    def __init__(self):
        self.server = Server("web-search-mcp")
        self.setup_handlers()
    
    def setup_handlers(self):
        @self.server.list_tools()
        async def list_tools():
            return [
                Tool(
                    name="web_search",
                    description="Search the web for information",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "Search query"
                            },
                            "num_results": {
                                "type": "number",
                                "description": "Number of results",
                                "default": 10
                            }
                        },
                        "required": ["query"]
                    }
                ),
                Tool(
                    name="fetch_page",
                    description="Fetch content from a web page",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "description": "URL to fetch"
                            }
                        },
                        "required": ["url"]
                    }
                )
            ]
        
        @self.server.call_tool()
        async def call_tool(name: str, arguments: Dict[str, Any]):
            if name == "web_search":
                return await self.web_search(arguments)
            elif name == "fetch_page":
                return await self.fetch_page(arguments)
            else:
                raise ValueError(f"Unknown tool: {name}")
    
    async def web_search(self, args: Dict[str, Any]) -> List[TextContent]:
        query = args["query"]
        num_results = args.get("num_results", 10)
        
        # Use search API (DuckDuckGo, SerpAPI, etc.)
        results = await self._search(query, num_results)
        
        return [TextContent(
            type="text",
            text=self._format_results(results)
        )]
    
    async def fetch_page(self, args: Dict[str, Any]) -> List[TextContent]:
        url = args["url"]
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, follow_redirects=True)
            html = response.text
        
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract main content
        for script in soup(["script", "style"]):
            script.decompose()
        
        text = soup.get_text(separator='\n', strip=True)
        
        return [TextContent(
            type="text",
            text=text[:10000]  # Limit content size
        )]
    
    async def _search(self, query: str, num_results: int) -> List[Dict]:
        # Implement search using DuckDuckGo or other API
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.duckduckgo.com/",
                params={
                    "q": query,
                    "format": "json",
                    "no_html": 1
                }
            )
            return response.json().get("RelatedTopics", [])[:num_results]
    
    def _format_results(self, results: List[Dict]) -> str:
        formatted = []
        for i, result in enumerate(results, 1):
            formatted.append(f"{i}. {result.get('Text', 'No title')}")
            formatted.append(f"   URL: {result.get('FirstURL', 'N/A')}\n")
        return "\n".join(formatted)
```

## Search Engine Integration

### DuckDuckGo

```typescript
async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.RelatedTopics.map((topic: any) => ({
    title: topic.Text,
    url: topic.FirstURL,
    snippet: topic.Text
  }));
}
```

### SerpAPI

```typescript
async function searchSerpAPI(query: string, apiKey: string): Promise<SearchResult[]> {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.organic_results.map((result: any) => ({
    title: result.title,
    url: result.link,
    snippet: result.snippet
  }));
}
```

## Best Practices

1. **Rate Limiting**: Implement rate limiting for API calls
2. **Caching**: Cache search results
3. **Error Handling**: Handle network errors gracefully
4. **Content Extraction**: Use readability for clean content
5. **Privacy**: Respect robots.txt and user privacy
6. **Attribution**: Attribute sources properly

## Related Skills

- `mcp-server-development` - MCP server development
- `web-scraping` - Web scraping techniques
- `api-integrator` - API integration

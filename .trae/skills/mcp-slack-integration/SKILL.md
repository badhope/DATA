---
name: "mcp-slack-integration"
description: "Expert in MCP Slack integration for AI-powered Slack bots and automation."
category: "mcp"
tags: ["mcp", "slack", "bot", "integration"]
---

# MCP Slack Integration

Expert in building MCP servers that integrate with Slack for AI-powered bots.

## Description

Implement MCP tools for Slack integration, enabling AI models to interact with Slack workspaces, send messages, and respond to events.

## When to Use

- Building AI-powered Slack bots
- Automating Slack workflows
- Creating notification systems
- Building team productivity tools

## Implementation

### TypeScript Implementation

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { WebClient } from "@slack/web-api";

class SlackMCP {
  private server: Server;
  private slack: WebClient;

  constructor(token: string) {
    this.server = new Server(
      { name: "slack-mcp", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );
    this.slack = new WebClient(token);
    
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "slack_send_message",
          description: "Send a message to a Slack channel",
          inputSchema: {
            type: "object",
            properties: {
              channel: {
                type: "string",
                description: "Channel ID or name"
              },
              text: {
                type: "string",
                description: "Message text"
              },
              blocks: {
                type: "array",
                description: "Slack Block Kit blocks"
              }
            },
            required: ["channel", "text"]
          }
        },
        {
          name: "slack_list_channels",
          description: "List all channels in the workspace",
          inputSchema: {
            type: "object",
            properties: {
              types: {
                type: "string",
                description: "Channel types (public_channel, private_channel, mpim, im)"
              }
            }
          }
        },
        {
          name: "slack_get_channel_history",
          description: "Get message history from a channel",
          inputSchema: {
            type: "object",
            properties: {
              channel: {
                type: "string",
                description: "Channel ID"
              },
              limit: {
                type: "number",
                description: "Number of messages",
                default: 100
              }
            },
            required: ["channel"]
          }
        },
        {
          name: "slack_search_messages",
          description: "Search for messages in the workspace",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query"
              }
            },
            required: ["query"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "slack_send_message":
          return await this.sendMessage(args);
        case "slack_list_channels":
          return await this.listChannels(args);
        case "slack_get_channel_history":
          return await this.getChannelHistory(args);
        case "slack_search_messages":
          return await this.searchMessages(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async sendMessage(args: any) {
    const result = await this.slack.chat.postMessage({
      channel: args.channel,
      text: args.text,
      blocks: args.blocks
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          ok: result.ok,
          ts: result.ts,
          channel: result.channel
        }, null, 2)
      }]
    };
  }

  private async listChannels(args: any) {
    const result = await this.slack.conversations.list({
      types: args.types || "public_channel"
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.channels, null, 2)
      }]
    };
  }

  private async getChannelHistory(args: any) {
    const result = await this.slack.conversations.history({
      channel: args.channel,
      limit: args.limit || 100
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.messages, null, 2)
      }]
    };
  }

  private async searchMessages(args: any) {
    const result = await this.slack.search.messages({
      query: args.query
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.messages, null, 2)
      }]
    };
  }
}
```

### Python Implementation

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
from slack_sdk.web.async_client import AsyncWebClient
from typing import List, Dict, Any

class SlackMCP:
    def __init__(self, token: str):
        self.server = Server("slack-mcp")
        self.slack = AsyncWebClient(token=token)
        self.setup_handlers()
    
    def setup_handlers(self):
        @self.server.list_tools()
        async def list_tools():
            return [
                Tool(
                    name="slack_send_message",
                    description="Send a message to a Slack channel",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "channel": {"type": "string", "description": "Channel ID"},
                            "text": {"type": "string", "description": "Message text"}
                        },
                        "required": ["channel", "text"]
                    }
                ),
                Tool(
                    name="slack_list_channels",
                    description="List all channels",
                    inputSchema={"type": "object", "properties": {}}
                ),
                Tool(
                    name="slack_get_channel_history",
                    description="Get channel message history",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "channel": {"type": "string"},
                            "limit": {"type": "number", "default": 100}
                        },
                        "required": ["channel"]
                    }
                )
            ]
        
        @self.server.call_tool()
        async def call_tool(name: str, arguments: Dict[str, Any]):
            if name == "slack_send_message":
                return await self.send_message(arguments)
            elif name == "slack_list_channels":
                return await self.list_channels()
            elif name == "slack_get_channel_history":
                return await self.get_channel_history(arguments)
    
    async def send_message(self, args: Dict[str, Any]) -> List[TextContent]:
        result = await self.slack.chat_postMessage(
            channel=args["channel"],
            text=args["text"]
        )
        return [TextContent(type="text", text=str(result.data))]
    
    async def list_channels(self) -> List[TextContent]:
        result = await self.slack.conversations_list()
        return [TextContent(type="text", text=str(result.data))]
    
    async def get_channel_history(self, args: Dict[str, Any]) -> List[TextContent]:
        result = await self.slack.conversations_history(
            channel=args["channel"],
            limit=args.get("limit", 100)
        )
        return [TextContent(type="text", text=str(result.data))]
```

## Block Kit Integration

```typescript
// Rich message with Block Kit
async function sendRichMessage(channel: string) {
  const blocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "AI Assistant Report"
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Summary*\nHere's your daily report..."
      }
    },
    {
      type: "divider"
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "Approve" },
          action_id: "approve"
        },
        {
          type: "button",
          text: { type: "plain_text", text: "Reject" },
          action_id: "reject",
          style: "danger"
        }
      ]
    }
  ];

  await slack.chat.postMessage({ channel, text: "Report", blocks });
}
```

## Event Handling

```typescript
import { createEventAdapter } from "@slack/events-api";

const slackEvents = createEventAdapter(signingSecret);

slackEvents.on("message", async (event) => {
  if (event.bot_id) return; // Ignore bot messages
  
  // Process message with AI
  const response = await processWithAI(event.text);
  
  await slack.chat.postMessage({
    channel: event.channel,
    text: response,
    thread_ts: event.ts
  });
});

slackEvents.on("app_mention", async (event) => {
  const response = await processWithAI(event.text);
  await slack.chat.postMessage({
    channel: event.channel,
    text: response
  });
});
```

## Best Practices

1. **Rate Limiting**: Respect Slack API rate limits
2. **Error Handling**: Handle API errors gracefully
3. **Security**: Validate requests with signing secret
4. **Threading**: Use threads for conversations
5. **Permissions**: Request minimal required scopes
6. **Logging**: Log all interactions for debugging

## Related Skills

- `mcp-server-development` - MCP server development
- `api-integrator` - API integration
- `websocket-realtime` - Real-time communication

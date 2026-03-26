---
name: "mcp-aws-integration"
description: "Expert in MCP AWS integration for cloud resource management and automation."
category: "mcp"
tags: ["mcp", "aws", "cloud", "integration"]
---

# MCP AWS Integration

Expert in building MCP servers that integrate with AWS services.

## Description

Implement MCP tools for AWS integration, enabling AI models to manage cloud resources, deploy applications, and automate infrastructure.

## When to Use

- Cloud resource management
- Infrastructure automation
- Deployment pipelines
- Cost optimization
- Security monitoring

## Implementation

### TypeScript Implementation

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  EC2Client,
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand
} from "@aws-sdk/client-ec2";
import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import {
  LambdaClient,
  ListFunctionsCommand,
  InvokeCommand
} from "@aws-sdk/client-lambda";

class AWSMCP {
  private server: Server;
  private ec2: EC2Client;
  private s3: S3Client;
  private lambda: LambdaClient;

  constructor(region: string = "us-east-1") {
    this.server = new Server(
      { name: "aws-mcp", version: "1.0.0" },
      { capabilities: { tools: {} } }
    );
    
    this.ec2 = new EC2Client({ region });
    this.s3 = new S3Client({ region });
    this.lambda = new LambdaClient({ region });
    
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // EC2 Tools
        {
          name: "aws_ec2_list_instances",
          description: "List all EC2 instances",
          inputSchema: {
            type: "object",
            properties: {
              filters: {
                type: "array",
                description: "Filters for instances"
              }
            }
          }
        },
        {
          name: "aws_ec2_start_instance",
          description: "Start an EC2 instance",
          inputSchema: {
            type: "object",
            properties: {
              instanceId: {
                type: "string",
                description: "Instance ID to start"
              }
            },
            required: ["instanceId"]
          }
        },
        {
          name: "aws_ec2_stop_instance",
          description: "Stop an EC2 instance",
          inputSchema: {
            type: "object",
            properties: {
              instanceId: {
                type: "string",
                description: "Instance ID to stop"
              }
            },
            required: ["instanceId"]
          }
        },
        // S3 Tools
        {
          name: "aws_s3_list_buckets",
          description: "List all S3 buckets",
          inputSchema: { type: "object", "properties": {} }
        },
        {
          name: "aws_s3_list_objects",
          description: "List objects in an S3 bucket",
          inputSchema: {
            type: "object",
            properties: {
              bucket: {
                type: "string",
                description: "Bucket name"
              },
              prefix: {
                type: "string",
                description: "Object prefix"
              }
            },
            required: ["bucket"]
          }
        },
        // Lambda Tools
        {
          name: "aws_lambda_list_functions",
          description: "List all Lambda functions",
          inputSchema: { type: "object", "properties": {} }
        },
        {
          name: "aws_lambda_invoke",
          description: "Invoke a Lambda function",
          inputSchema: {
            type: "object",
            properties: {
              functionName: {
                type: "string",
                description: "Function name"
              },
              payload: {
                type: "object",
                description: "Function payload"
              }
            },
            required: ["functionName"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "aws_ec2_list_instances":
          return await this.listEC2Instances(args);
        case "aws_ec2_start_instance":
          return await this.startEC2Instance(args);
        case "aws_ec2_stop_instance":
          return await this.stopEC2Instance(args);
        case "aws_s3_list_buckets":
          return await this.listS3Buckets();
        case "aws_s3_list_objects":
          return await this.listS3Objects(args);
        case "aws_lambda_list_functions":
          return await this.listLambdaFunctions();
        case "aws_lambda_invoke":
          return await this.invokeLambda(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async listEC2Instances(args: any) {
    const command = new DescribeInstancesCommand({
      Filters: args.filters
    });
    const result = await this.ec2.send(command);
    
    const instances = result.Reservations?.flatMap(r => r.Instances || []) || [];
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(instances.map(i => ({
          id: i.InstanceId,
          type: i.InstanceType,
          state: i.State?.Name,
          name: i.Tags?.find(t => t.Key === "Name")?.Value
        })), null, 2)
      }]
    };
  }

  private async startEC2Instance(args: any) {
    const command = new StartInstancesCommand({
      InstanceIds: [args.instanceId]
    });
    const result = await this.ec2.send(command);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.StartingInstances, null, 2)
      }]
    };
  }

  private async stopEC2Instance(args: any) {
    const command = new StopInstancesCommand({
      InstanceIds: [args.instanceId]
    });
    const result = await this.ec2.send(command);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.StoppingInstances, null, 2)
      }]
    };
  }

  private async listS3Buckets() {
    const command = new ListBucketsCommand({});
    const result = await this.s3.send(command);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.Buckets, null, 2)
      }]
    };
  }

  private async listS3Objects(args: any) {
    const command = new ListObjectsV2Command({
      Bucket: args.bucket,
      Prefix: args.prefix
    });
    const result = await this.s3.send(command);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.Contents, null, 2)
      }]
    };
  }

  private async listLambdaFunctions() {
    const command = new ListFunctionsCommand({});
    const result = await this.lambda.send(command);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.Functions, null, 2)
      }]
    };
  }

  private async invokeLambda(args: any) {
    const command = new InvokeCommand({
      FunctionName: args.functionName,
      Payload: JSON.stringify(args.payload || {})
    });
    const result = await this.lambda.send(command);
    
    const payload = new TextDecoder().decode(result.Payload);
    
    return {
      content: [{
        type: "text",
        text: payload
      }]
    };
  }
}
```

### Python Implementation

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
import boto3
from typing import List, Dict, Any
import json

class AWSMCP:
    def __init__(self, region: str = "us-east-1"):
        self.server = Server("aws-mcp")
        self.region = region
        self.ec2 = boto3.client("ec2", region_name=region)
        self.s3 = boto3.client("s3", region_name=region)
        self.lambda_client = boto3.client("lambda", region_name=region)
        self.setup_handlers()
    
    def setup_handlers(self):
        @self.server.list_tools()
        async def list_tools():
            return [
                Tool(
                    name="aws_ec2_list_instances",
                    description="List all EC2 instances",
                    inputSchema={"type": "object", "properties": {}}
                ),
                Tool(
                    name="aws_s3_list_buckets",
                    description="List all S3 buckets",
                    inputSchema={"type": "object", "properties": {}}
                ),
                Tool(
                    name="aws_lambda_invoke",
                    description="Invoke a Lambda function",
                    inputSchema={
                        "type": "object",
                        "properties": {
                            "function_name": {"type": "string"},
                            "payload": {"type": "object"}
                        },
                        "required": ["function_name"]
                    }
                )
            ]
        
        @self.server.call_tool()
        async def call_tool(name: str, arguments: Dict[str, Any]):
            if name == "aws_ec2_list_instances":
                return await self.list_ec2_instances()
            elif name == "aws_s3_list_buckets":
                return await self.list_s3_buckets()
            elif name == "aws_lambda_invoke":
                return await self.invoke_lambda(arguments)
    
    async def list_ec2_instances(self) -> List[TextContent]:
        response = self.ec2.describe_instances()
        instances = []
        for reservation in response["Reservations"]:
            for instance in reservation["Instances"]:
                instances.append({
                    "id": instance["InstanceId"],
                    "type": instance["InstanceType"],
                    "state": instance["State"]["Name"]
                })
        return [TextContent(type="text", text=json.dumps(instances, indent=2))]
    
    async def list_s3_buckets(self) -> List[TextContent]:
        response = self.s3.list_buckets()
        buckets = [{"name": b["Name"], "created": str(b["CreationDate"])} 
                   for b in response["Buckets"]]
        return [TextContent(type="text", text=json.dumps(buckets, indent=2))]
    
    async def invoke_lambda(self, args: Dict[str, Any]) -> List[TextContent]:
        response = self.lambda_client.invoke(
            FunctionName=args["function_name"],
            Payload=json.dumps(args.get("payload", {}))
        )
        payload = json.loads(response["Payload"].read())
        return [TextContent(type="text", text=json.dumps(payload, indent=2))]
```

## Additional Services

```typescript
// CloudWatch
import { CloudWatchClient, GetMetricStatisticsCommand } from "@aws-sdk/client-cloudwatch";

async function getEC2CPUUtilization(instanceId: string) {
  const client = new CloudWatchClient({ region: "us-east-1" });
  
  const command = new GetMetricStatisticsCommand({
    Namespace: "AWS/EC2",
    MetricName: "CPUUtilization",
    Dimensions: [{ Name: "InstanceId", Value: instanceId }],
    StartTime: new Date(Date.now() - 3600000),
    EndTime: new Date(),
    Period: 300,
    Statistics: ["Average"]
  });
  
  return await client.send(command);
}

// DynamoDB
import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";

async function scanTable(tableName: string) {
  const client = new DynamoDBClient({ region: "us-east-1" });
  const command = new ScanCommand({ TableName: tableName });
  return await client.send(command);
}
```

## Best Practices

1. **IAM Roles**: Use least privilege principle
2. **Region Configuration**: Configure appropriate regions
3. **Error Handling**: Handle AWS API errors
4. **Rate Limiting**: Respect AWS API limits
5. **Cost Awareness**: Monitor API call costs
6. **Security**: Never hardcode credentials

## Related Skills

- `mcp-server-development` - MCP server development
- `kubernetes-orchestration` - Kubernetes
- `terraform-iac` - Infrastructure as code
- `cost-optimization` - Cost optimization

---
name: "tool-use"
description: "Guides AI to use tools safely and effectively. Invoke when reading files, executing commands, or needing to combine multiple tool results."
---

# Tool Use Skill

Ensures AI uses tools accurately, safely, and effectively.

## When to Use

- Need to read multiple files for information
- Need to execute commands to verify results
- Need to combine results from multiple tools
- Inspecting config files before taking action

## Tool Usage Principles

### 1. Read Before Acting
Always read relevant files before making changes:
- Understand current code structure
- Check existing implementations
- Verify project conventions

### 2. Use Commands Safely
When executing commands:
- Prefer read-only operations
- Verify destructive commands
- Check command allowlist

### 3. Combine Results
When using multiple tools:
- Aggregate information logically
- Cross-reference for consistency
- Synthesize into conclusions

## Related Prompts

- `prompt-tool-use-read-files` - Read multiple files
- `prompt-tool-use-analyze-folder` - Analyze directory structure
- `prompt-tool-use-search-before-concluding` - Search before concluding
- `prompt-tool-use-use-command` - Execute commands safely
- `prompt-tool-use-combine-results` - Combine tool results

## Safety Guidelines

1. **Read first**: Always understand context before changes
2. **Verify commands**: Check destructive operations
3. **Check paths**: Ensure correct file paths
4. **Validate output**: Verify tool results make sense
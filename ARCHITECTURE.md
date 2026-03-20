# Architecture

This document explains **why** this repository is structured the way it is, and **how** the different parts work together.

---

## Design Philosophy

This repository follows three core principles:

1. **Dual Audience**: Content is optimized for both human users (quick find-and-copy) and AI systems (autonomous discovery and routing)
2. **Modularity**: Each asset (prompt, skill, workflow) is self-contained and composable
3. **AI-First Discoverability**: The registry system enables AI to autonomously find, select, and compose assets

---

## Why This Structure?

### prompts/ vs skills/ vs workflows/

| Directory | Purpose | What it Contains |
|-----------|---------|------------------|
| **prompts/** | Executable instructions | Direct prompts AI uses to generate outputs |
| **skills/** | Capability definitions | Descriptions of what an AI can do, with use cases |
| **workflows/** | Multi-step processes | Sequences of prompts chained together |

**Analogy**:
- **Prompts** = Individual tools in a toolbox
- **Skills** = Tool categories + usage instructions
- **Workflows** = Tool combinations for specific jobs

### Why registry/?

The `registry/` directory contains YAML files that AI systems read to:
- Discover available assets
- Understand relationships between assets
- Route tasks to appropriate prompts
- Find related skills and workflows

**Key registries**:
- `prompts-registry.yaml` - All prompts with metadata
- `routes-registry.yaml` - Task-to-prompt routing rules
- `skills-registry.yaml` - Skill definitions and relationships
- `relations-registry.yaml` - Cross-asset relationships
- `tags-registry.yaml` - Unified tag vocabulary

### Why .trae/skills/ is not canonical?

The `.trae/skills/` directory contains skills with Apache-2.0 licensing (from Trae). The canonical directory for this repository's own skills is `skills/` (CC BY 4.0). This separation ensures clean licensing.

---

## Directory Responsibilities

### prompts/ - Core Content

```
prompts/
├── _routing/          # AI's "navigation" prompts
├── _core/            # Standards other prompts must follow
├── system/           # System-level AI behavior prompts
├── task/             # Task-specific prompts (coding, debugging, etc.)
├── general/          # General capability prompts
├── workflow/          # Multi-step workflows
├── tool-use/          # Tool operation guides
├── output/            # Output format specifications
└── meta/              # Prompt self-optimization
```

### skills/ - Capability Descriptions

Each skill defines:
- What the skill does
- When to use it
- What prompts it uses
- What workflows it enables

### registry/ - AI Discoverability

All registries are machine-readable YAML. AI reads these to operate autonomously.

### docs/ - Human Documentation

Guides for:
- How to write prompts
- How to create skills
- How to structure workflows
- Directory conventions

---

## What is Main Line vs Extension?

### Main Line (v1.0.0 - v1.1.0)

Core capabilities that form the foundation:

| Module | Description |
|--------|-------------|
| coding | Code generation, implementation, review |
| debugging | Bug investigation and fixing |
| repo-analysis | Project understanding |
| planning | Task breakdown and execution planning |
| research | Structured research |
| tool-use | Safe tool operation |
| system | AI behavior configuration |

### Extension Modules (v1.1.0+)

Additional capabilities built on top of main line:

| Module | Description |
|--------|-------------|
| refactoring | Code restructuring |
| testing | Test generation and strategy |
| engineering-planning | Technical project planning |
| documentation-for-code | Code documentation |
| creative-special | Creative writing assistance |
| personal | Personal life assistance |
| reflection | Self-improvement |
| learning-support | Educational support |
| user-style-adaptation | Personalized interaction |
| long-term-assistant | Extended collaboration |

---

## What Not to Change Lightly

The following are architectural decisions that should not be changed without careful consideration:

1. **`skills/` as canonical directory** - All skill definitions must be here
2. **`prompts/` as content library** - All prompts must be here
3. **`registry/` for AI discoverability** - AI relies on these files
4. **YAML format for registries** - Machine-readable requirement
5. **Frontmatter in all prompt files** - Standard metadata format
6. **CC BY 4.0 for content** - Licensing requirement
7. **Two-audience design** - Both human and AI must be supported

---

## Extension Points

The repository is designed to be extended in these ways:

1. **New prompts** → Add to appropriate `prompts/task/` or `prompts/general/` subdirectory
2. **New skills** → Add to `skills/` with registry entry
3. **New workflows** → Add to `prompts/workflow/`
4. **New registries** → Add to `registry/` with proper relations
5. **New examples** → Add to `examples/`
6. **Author picks** → Curate in `author-picks/`

---

## Versioning Strategy

| Version | Focus |
|---------|-------|
| v1.0.0 | MVP - Core task coverage |
| v1.1.0 | Expansion - New modules, registry completion |
| v1.2.0 (planned) | Model variants, examples, evals |

See [PROJECT-PLAN.md](PROJECT-PLAN.md) for details.

---

## Key Design Decisions

See [DECISION-LOG.md](DECISION-LOG.md) for the rationale behind major architectural choices.

---

**Last Updated**: 2026-03-20

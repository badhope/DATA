# Start Here

Welcome to the **AI Skill & Prompt Repository** (v1.1.0).

This document is your entry point. Whether you're a human collaborator or an AI agent, follow the path that fits your role.

---

## For Human Collaborators

### First Time? Start Here:

1. **Read [README.md](README.md)** - Understand what this repository is and what it offers
2. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** - Understand why the repository is structured this way
3. **Browse [INDEX.md](INDEX.md)** - See the complete asset inventory
4. **Check [PROJECT-PLAN.md](PROJECT-PLAN.md)** - See what's done and what's planned

### Want to Contribute?

1. Read [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
2. Read [EXTENSION-GUIDE.md](EXTENSION-GUIDE.md) - How to add new assets
3. Read [MAINTENANCE-RULES.md](MAINTENANCE-RULES.md) - Naming, structure, and quality rules
4. Check [CHANGELOG.md](CHANGELOG.md) - Recent changes

### Need a Specific Prompt?

1. Go to [INDEX.md](INDEX.md)
2. Find your task category
3. Navigate to the prompt file
4. Copy and use

---

## For AI Agents

### Bootstrap Sequence (Read in Order):

1. **[AI-BOOTSTRAP.md](AI-BOOTSTRAP.md)** - How to initialize when working with this repository
2. **[AI-USAGE.md](AI-USAGE.md)** - Usage patterns and interaction guidelines
3. **[AI-ROUTING.md](AI-ROUTING.md)** - How to route tasks to appropriate assets
4. **[INDEX.md](INDEX.md)** - Understand the asset inventory
5. **registry/prompts-registry.yaml** - Discover all available prompts
6. **registry/routes-registry.yaml** - Learn task-to-asset routing rules
7. **registry/skills-registry.yaml** - Understand skill definitions

### How AI Should Work Here:

```
User Request
    ↓
[Identify Task Type via AI-ROUTING.md]
    ↓
[Route via routes-registry.yaml]
    ↓
[Select prompts from prompts-registry.yaml]
    ↓
[Execute with selected prompts]
    ↓
[If multi-step, consider workflows]
```

### What AI Can Do:

- **Generate code** using prompts in `prompts/task/coding/`
- **Debug issues** using prompts in `prompts/task/debugging/`
- **Analyze repositories** using prompts in `prompts/task/repo-analysis/`
- **Plan execution** using prompts in `prompts/task/planning/`
- **Research topics** using prompts in `prompts/task/research/`
- **Use tools safely** using prompts in `prompts/tool-use/`
- **Format output** using prompts in `prompts/output/`

---

## Repository Navigation Map

```
skill/
├── prompts/                    # Core prompts (CC BY 4.0)
│   ├── _routing/              # AI routing prompts
│   ├── _core/                 # Standards and specs
│   ├── system/                # System prompts
│   ├── task/                  # Task-specific prompts
│   │   ├── coding/           # 20 prompts
│   │   ├── debugging/        # 20 prompts
│   │   ├── repo-analysis/    # 10 prompts
│   │   ├── planning/         # 2 prompts
│   │   ├── research/         # 1 prompt
│   │   ├── refactoring/     # 8 prompts
│   │   ├── testing/         # 8 prompts
│   │   ├── engineering-planning/ # 8 prompts
│   │   ├── documentation-for-code/ # 6 prompts
│   │   └── code-review/     # 8 prompts
│   ├── general/              # General capability prompts
│   │   ├── clarification/   # 8 prompts
│   │   ├── context-memory/   # 8 prompts
│   │   ├── reasoning/        # 7 prompts
│   │   ├── search/           # 7 prompts
│   │   ├── user-style-adaptation/ # 8 prompts
│   │   ├── long-term-assistant/ # 8 prompts
│   │   ├── creative-special/ # 10 prompts
│   │   ├── personal/         # 6 prompts
│   │   ├── reflection/       # 6 prompts
│   │   └── learning-support/ # 8 prompts
│   ├── workflow/              # Multi-step workflows (10)
│   ├── tool-use/              # Tool usage guides (8)
│   ├── output/                # Output formats (6)
│   └── meta/                  # Prompt engineering (8)
│
├── skills/                    # Skill definitions (CC BY 4.0)
│   ├── ai-routing/           # AI routing capability
│   ├── routing/             # Task routing
│   ├── coding/               # Code generation & review
│   ├── debugging/            # Systematic debugging
│   ├── planning/             # Task planning
│   ├── repo-analysis/        # Repository analysis
│   ├── research/             # Research capability
│   ├── tool-use/             # Tool usage
│   ├── prompt-composition/   # Prompt composition
│   ├── system-prompts/       # System prompt configs
│   ├── workflows/            # Workflow templates
│   └── writing/              # Writing capability
│
├── registry/                  # AI-readable registries
│   ├── prompts-registry.yaml # All prompts metadata
│   ├── skills-registry.yaml  # All skills metadata
│   ├── routes-registry.yaml  # Task-to-asset routing
│   ├── relations-registry.yaml # Asset relationships
│   └── tags-registry.yaml    # Unified tag dictionary
│
├── docs/guides/               # Documentation guides
│   ├── SPEC.md               # Specification standards
│   ├── DIRECTORY_STRUCTURE.md # Directory layout
│   ├── prompt-template.md    # Prompt authoring template
│   ├── skill-template.md     # Skill authoring template
│   └── workflow-template.md  # Workflow authoring template
│
├── examples/                  # Example prompts and use cases
├── author-picks/              # Curated prompt selections
│
├── START-HERE.md             # ← You are here
├── ARCHITECTURE.md           # Design rationale
├── ASSET-MAP.md              # Complete asset inventory
├── DECISION-LOG.md           # Architecture decisions
├── EXTENSION-GUIDE.md        # How to extend
├── MAINTENANCE-RULES.md      # Rules for maintainers
├── QUALITY-STANDARDS.md      # Quality requirements
│
├── README.md                 # English entry
├── README.zh-CN.md           # Chinese entry
├── INDEX.md                  # Master asset list
├── PROJECT-PLAN.md           # Version planning
├── CHANGELOG.md             # Version history
├── AI-BOOTSTRAP.md          # AI initialization guide
├── AI-USAGE.md              # AI usage patterns
└── AI-ROUTING.md            # AI routing logic
```

---

## Key Principles

1. **skills/ is the canonical directory** - All skill definitions live here
2. **prompts/ is the content library** - All prompts live here
3. **registry/ enables AI autonomy** - AI reads these to discover and route
4. **Two audiences, one structure** - Both human and AI should find what they need
5. **Quality before quantity** - Every asset should meet quality standards

---

## Next Steps

| If you want to... | Read this |
|-------------------|----------|
| Understand the design | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Add new assets | [EXTENSION-GUIDE.md](EXTENSION-GUIDE.md) |
| Maintain quality | [QUALITY-STANDARDS.md](QUALITY-STANDARDS.md) |
| See what's available | [ASSET-MAP.md](ASSET-MAP.md) |
| Understand decisions | [DECISION-LOG.md](DECISION-LOG.md) |
| Follow rules | [MAINTENANCE-RULES.md](MAINTENANCE-RULES.md) |

---

**Version**: v1.1.0 | **Last Updated**: 2026-03-20

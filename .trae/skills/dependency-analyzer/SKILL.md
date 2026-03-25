---
name: "dependency-analyzer"
description: "Analyzes project dependencies, detects version conflicts, and identifies security vulnerabilities. Invoke when setting up projects, debugging dependency issues, or auditing packages."
---

# Dependency Analyzer Skill

A skill for analyzing and managing project dependencies.

## When to Use

- Setting up a new project
- Debugging dependency conflicts
- Auditing for security vulnerabilities
- Updating dependencies
- Understanding dependency tree

## Supported Package Managers

| Language | Package Manager | Lock File |
|----------|----------------|-----------|
| JavaScript | npm, yarn, pnpm | package-lock.json, yarn.lock, pnpm-lock.yaml |
| Python | pip, poetry, pipenv | requirements.txt, Pipfile.lock, poetry.lock |
| Java | Maven, Gradle | pom.xml, build.gradle |
| Go | go mod | go.mod, go.sum |
| Rust | cargo | Cargo.toml, Cargo.lock |
| PHP | composer | composer.json, composer.lock |
| Ruby | bundler | Gemfile, Gemfile.lock |
| .NET | nuget | packages.config, *.csproj |

## Workflow

### 1. Detect Package Manager

```markdown
Identify by:
1. Lock files present
2. Config files present
3. Directory structure
```

### 2. Parse Dependencies

```markdown
Extract:
1. Direct dependencies
2. Development dependencies
3. Peer dependencies
4. Optional dependencies
```

### 3. Build Dependency Tree

```markdown
For each dependency:
1. Get version constraints
2. Resolve actual versions
3. Find transitive dependencies
4. Build tree structure
```

### 4. Analyze Issues

```markdown
Check for:
1. Version conflicts
2. Security vulnerabilities
3. Outdated packages
4. Unused dependencies
5. Missing dependencies
```

## Analysis Types

### Version Conflict Detection

```markdown
## Conflict Types

1. **Version Range Conflict**
   - Package A requires lib@^1.0
   - Package B requires lib@^2.0
   - Result: Incompatible

2. **Peer Dependency Conflict**
   - Package requires react@^17
   - Project has react@^18
   - Result: May break

3. **Transitive Conflict**
   - A → B@1.0 → C@2.0
   - A → D@1.0 → C@1.0
   - Result: C version conflict

## Resolution Strategies
1. Update to compatible versions
2. Use resolutions/overrides
3. Find alternative packages
4. Contact maintainers
```

### Security Vulnerability Check

```markdown
## Vulnerability Sources
- npm audit
- pip-audit
- safety (Python)
- Snyk database
- GitHub Advisory

## Severity Levels
- Critical: Immediate action required
- High: Fix within 24 hours
- Moderate: Fix within a week
- Low: Fix when convenient

## Report Format
```
Vulnerability: CVE-2024-1234
Package: lodash@4.17.15
Severity: HIGH
Patched in: 4.17.21
Path: app → utils → lodash
Recommendation: Update to 4.17.21
```
```

### Outdated Package Detection

```markdown
## Version Types
- Current: Installed version
- Wanted: Semver compatible latest
- Latest: Absolute latest

## Update Safety
- Patch (1.0.0 → 1.0.1): Safe
- Minor (1.0.0 → 1.1.0): Usually safe
- Major (1.0.0 → 2.0.0): Review changelog

## Report Format
```
Package         Current  Wanted  Latest  Type
lodash          4.17.15  4.17.21 4.17.21 minor
typescript      4.9.0    4.9.5   5.3.0   major
eslint          8.0.0    8.56.0  8.56.0  minor
```
```

### Unused Dependency Detection

```markdown
## Detection Methods
1. Scan imports/requires
2. Check actual usage
3. Find referenced but not installed
4. Find installed but not referenced

## Report Format
```
Unused dependencies:
- moment (use date-fns instead)
- lodash (only using 3 functions)

Missing dependencies:
- date-fns (imported but not in package.json)
```
```

## Dependency Tree Visualization

```markdown
## Tree Format
project@
├── express@4.18.2
│   ├── body-parser@1.20.2
│   ├── cookie-parser@1.4.6
│   └── debug@4.3.4
├── typescript@5.3.0 (dev)
└── jest@29.7.0 (dev)
    ├── @jest/core@29.7.0
    └── @jest/test-sequencer@29.7.0

## Circular Dependencies
Warn when:
A → B → C → A

## Deep Dependencies
Show full tree with depth limit
```

## Commands by Package Manager

### npm/yarn/pnpm

```bash
# List dependencies
npm list --depth=0

# Check outdated
npm outdated

# Security audit
npm audit

# Update all
npm update

# Deduplicate
npm dedupe
```

### pip/poetry

```bash
# List dependencies
pip list --outdated

# Check vulnerabilities
pip-audit

# Update specific
pip install --upgrade package

# Poetry commands
poetry show --tree
poetry update
```

### go mod

```bash
# List dependencies
go list -m all

# Update dependencies
go get -u

# Tidy dependencies
go mod tidy

# Verify dependencies
go mod verify
```

## Dependency Recommendations

### When to Update

```markdown
1. Security vulnerability found
2. Bug fix needed
3. New feature required
4. Performance improvement
5. Breaking changes in ecosystem
```

### When to Pin

```markdown
1. Production deployments
2. CI/CD pipelines
3. Shared libraries
4. Long-term maintenance
```

### When to Avoid

```markdown
1. Pre-release versions
2. Deprecated packages
3. Unmaintained packages
4. Large dependency for small feature
```

## Related Skills

- `security-auditor` - Security analysis
- `repo-analysis` - Project structure
- `api-integrator` - API dependency management

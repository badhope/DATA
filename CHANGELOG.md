# Changelog

All notable changes to this repository will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en-GB/1.0.0/).

## [v1.2.0] - 2026-03-25

### Added

#### Skills Expansion - 16 New Programming Skills
- **instruction-refinement**: Instruction refinement and enhancement skill for supplementing context, constraints, and output formats
- **execution-timeout-handler**: Dynamic execution timeout handling based on task type
- **document-processor**: Multi-format document processing (PDF, Word, Excel, Markdown, etc.)
- **multi-language-file-handler**: Syntax-aware multi-language file handling
- **self-memory-manager**: Self-contained memory management with keyword extraction
- **code-search-navigator**: Expert code search and navigation capabilities
- **dependency-analyzer**: Dependency analysis and vulnerability detection
- **test-generator**: Comprehensive test case generation for various frameworks
- **performance-optimizer**: Performance optimization and bottleneck analysis
- **security-auditor**: Security vulnerability auditing and remediation guidance
- **api-integrator**: Third-party API integration with authentication handling
- **error-recovery**: Error recovery with retry, rollback, and fallback strategies
- **context-compressor**: Context compression while preserving critical information
- **incremental-changer**: Minimal, targeted code changes preserving existing behavior
- **cross-file-refactor**: Safe cross-file refactoring maintaining consistency
- **prompt-composition**: Compose multiple prompts into coherent workflows

#### GitHub Templates
- `.github/ISSUE_TEMPLATE/bug_report.md`: Bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md`: Feature request template
- `.github/ISSUE_TEMPLATE/prompt_request.md`: Prompt/skill request template
- `.github/ISSUE_TEMPLATE/documentation.md`: Documentation issue template
- `.github/ISSUE_TEMPLATE/good_first_issue.md`: Good first issue template
- `.github/PULL_REQUEST_TEMPLATE.md`: Pull request template

### Changed

- Skills count updated from 27+ to 43+
- README.md and README.zh-CN.md updated with new skill counts
- Project structure enhanced with GitHub community templates

### Security

- No security vulnerabilities reported in this release

---

## [v1.1.0] - 2026-03-20

### Added

#### Prompts Expansion - Batch 3B (User-Style-Adaptation + Long-Term-Assistant)
- **8 User-Style-Adaptation Prompts** in `prompts/general/user-style-adaptation/`:
  - detect-user-style-and-adapt-tone, adapt-response-structure-to-user-preference
  - align-detail-level-with-user-expectation, infer-user-output-format-preference
  - maintain-consistent-style-across-session, refine-style-based-on-user-feedback
  - avoid-style-drift-over-time, personalize-communication-without-losing-clarity

- **8 Long-Term-Assistant Prompts** in `prompts/general/long-term-assistant/`:
  - act-as-consistent-long-term-collaborator, preserve-user-goals-across-iterations
  - maintain-project-continuity-over-time, summarize-progress-before-next-step
  - remind-and-realign-when-goals-drift, convert-ongoing-conversation-into-working-memory
  - optimize-collaboration-style-over-time, support-multi-session-task-continuity

#### Prompts Expansion - Batch 4 (Creative-Special + Personal + Reflection + Learning-Support)
- **10 Creative-Special Prompts** in `prompts/general/creative-special/`:
  - create-anime-style-companion-role, create-fantasy-world-character-role
  - create-sci-fi-assistant-persona, create-gentle-companion-persona
  - create-tsundere-style-safe-roleplay, create-dramatic-dialogue-partner
  - create-worldbuilding-guide-character, compare-controversial-topics-multi-perspective
  - analyze-sensitive-topic-safely, reframe-sensitive-user-request-into-safe-creative-task

- **6 Personal Prompts** in `prompts/general/personal/`:
  - act-as-daily-life-assistant, help-organize-personal-tasks
  - support-lightweight-daily-conversation, turn-chaotic-thoughts-into-clear-notes
  - provide-gentle-structured-life-planning, help-maintain-personal-routine

- **6 Reflection Prompts** in `prompts/general/reflection/`:
  - guide-daily-reflection, summarize-what-went-well-and-what-did-not
  - turn-experience-into-actionable-lessons, structure-self-review-without-self-attack
  - identify-patterns-in-repeated-problems, create-next-step-improvement-plan

- **8 Learning-Support Prompts** in `prompts/general/learning-support/`:
  - explain-complex-topic-step-by-step, adapt-teaching-style-to-learner-level
  - generate-learning-plan-for-topic, quiz-user-to-check-understanding
  - turn-notes-into-study-guide, identify-knowledge-gaps
  - support-learning-by-iteration, summarize-what-to-review-next

#### Registry System Updates
- `prompts-registry.yaml`: Added all 46 new prompts (Batch 3B + Batch 4) with complete metadata
- `routes-registry.yaml`: Added 5 new routes (personal, reflection, learning, creative, style-adaptation, long-term)
- `tags-registry.yaml`: Added 70+ new tags in 5 groups (general, personal, reflection, learning, creative)
- `INDEX.md`: Updated prompt count from 86 to 132, added all new module categories

#### AI Documentation Updates
- `AI-BOOTSTRAP.md`: Verified and confirmed accurate references
- `AI-USAGE.md`: Verified and confirmed accurate references
- `AI-ROUTING.md`: Updated with new route mappings for personal/reflection/learning/creative tasks

### Changed

- Version date updated from 2026-03-19 to 2026-03-20
- Statistics updated: Prompts 86 → 132
- All main documentation files now reference v1.1.0 (2026-03-20)

### Known Issues / Pending Items

- All planned v1.1.0 prompts are now complete
- Registry synchronization complete
- Route coverage expanded to handle new task types

### Security

- No security vulnerabilities reported in this release

---

## [v1.1.0] - 2026-03-20 - Final Release Fix

### Fixed

#### Route Configuration (P-002)
- Added missing route for `refactoring` module with 8 prompts
- Added missing route for `testing` module with 8 prompts
- Added missing route for `engineering-planning` module with 8 prompts
- Added missing route for `documentation-for-code` module with 6 prompts
- All routes include: trigger_patterns (zh/en), task_type, first_step logic, required_questions, recommended_prompts/skills/workflows

#### Anime Prompt ID Standardization (P-003)
- Unified anime-related prompt ID: `prompt-general-creative-special-anime-v1`
- Updated file: `prompt-general-creative-special-create-anime-style-companion-role.md`
- Synchronized all references in:
  - `prompt-general-creative-special-create-tsundere-style-safe-roleplay.md`
  - `prompt-general-creative-special-create-gentle-companion-persona.md`
  - `prompt-general-creative-special-create-sci-fi-assistant-persona.md`
  - `prompt-general-creative-special-create-fantasy-world-character-role.md`

#### INDEX Statistics Update (P-004)
- Added missing categories to INDEX.md:
  - Task/Refactoring (8 prompts)
  - Task/Testing (8 prompts)
  - Task/Engineering-Planning (8 prompts)
  - Task/Documentation-For-Code (6 prompts)
- Updated prompt count table to reflect complete v1.1.0 structure

#### Route Skill Reference Fix
- Removed invalid `skill-documentation-for-code` reference from documentation route
- Replaced with `skill-coding` and `skill-repo-analysis`
- Added `skill-planning` to refactoring route

#### Documentation Synchronization
- All route references verified against actual files
- All registry entries verified against actual paths
- No dangling references remain

---

## [v1.1.0] - 2026-03-19

### Added

#### Prompts Expansion
- **33+ new/updated Prompts** in `task/coding/`:
  - Added: generate-code-with-error-handling, compare-two-implementations
  - Added: align-project-style, improve-maintainability, improve-readability
  - Added: patch-for-scenario, adapt-to-new-requirement, add-feature-without-breaking
  - Added: modify-with-minimal-change, implement-todo-safely, complete-function-based-on-context
  - Added: fill-missing-implementation, continue-partially-written-code, turn-task-into-code-plan
  - Added: generate-from-interface, convert-pseudocode-to-code, write-based-on-project-pattern
  - Updated: All existing coding prompts now have complete frontmatter and Example Input/Output sections

- **20 Debugging Prompts** (complete Batch 1B):
  - identify-root-cause, classify-problem-type, summarize-bug-symptoms
  - detect-most-likely-failure-source, generate-debug-plan, prioritize-debugging-steps
  - decide-what-to-check-first, create-minimal-debugging-checklist, propose-minimal-risk-fix
  - patch-without-unnecessary-refactor, fix-bug-safely, fix-issue-under-constraints
  - analyze-stack-trace, analyze-error-log, reproduce-and-isolate-bug
  - trace-failure-through-codebase, debug-configuration-issue, debug-environment-problem
  - detect-regression-risk, verify-fix-after-change

#### Registry System Updates
- `prompts-registry.yaml`: Updated all debugging prompt IDs and paths to new `prompt-debugging-*` prefix
- `routes-registry.yaml`: Added all 20 debugging prompts to debugging route
- `relations-registry.yaml`: Synchronized all debugging-related relations to new prompt IDs
- `skills-registry.yaml`: Updated related_prompts references for debugging skills

#### AI Documentation Updates
- `AI-BOOTSTRAP.md`: Verified and confirmed accurate references
- `AI-USAGE.md`: Verified and confirmed accurate references
- `AI-ROUTING.md`: Verified and confirmed accurate references
- System prompts updated with new debugging prompt references

### Fixed

#### Naming Convention Unification
- All debugging prompts now use `prompt-debugging-*` prefix consistently
- All registry entries updated from `prompt-task-debugging-*` to `prompt-debugging-*`
- All route references updated to use new naming convention
- All relation references updated to use new naming convention
- All documentation (INDEX, README, AI docs) synchronized

#### Path Synchronization
- `INDEX.md`: Updated all debugging prompt paths and added all 20 prompts to listing
- `INDEX.md`: Updated prompt count from 47+ to 80+, debugging from 4 to 20
- `INDEX.md`: Version updated from v1.0.0 to v1.1.0
- `README.md`: Updated version badge to v1.1.0, prompt count to 80+
- `README.zh-CN.md`: Updated version badge to v1.1.0, prompt count to 80+

#### File Organization
- `.trae/skills/`: Confirmed as legacy/Apache-2.0 licensed, not part of canonical structure
- `skills/`: Confirmed as the only canonical skills directory
- No `.trae/skills/` references in registries or official documentation (only in LICENSE)

### Changed

- Version bumped from v1.0.0 to v1.1.0
- Statistics updated to reflect actual counts (80+ prompts, 20 debugging, 21 coding)
- All main documentation files now reference v1.1.0

### Known Issues / Pending Items

- `coding-review-code-quality.md` and `coding-review-code-for-quality.md` are functionally similar but have different content structure. Consolidation decision deferred to future version.
- Some coding prompts may need further content enrichment in future releases

### Security

- No security vulnerabilities reported in this release

---

## [v1.0.0] - 2026-03-19

### Added

#### Core Assets
- **47+ Prompts** across 10 categories:
  - `_routing/` (4): scan-repository, identify-task-type, select-relevant, compose-multiple
  - `system/` (3): general-ai-workbench, debugging-agent, coding-agent
  - `task/coding/` (3): generate-code, implement-feature, review-code
  - `task/debugging/` (4): identify-root-cause, generate-plan, fix-bug, verify-fix
  - `task/repo-analysis/` (3): analyze-structure, summarize-architecture, locate-files
  - `task/planning/` (2): break-down-task, create-execution-plan
  - `task/research/` (1): prepare-research-brief
  - `workflow/` (10): bug-investigation, feature-implementation, new-repo-onboarding, research-to-summary, vague-request-to-action, etc.
  - `tool-use/` (8): read-files, use-command, search-before-concluding, etc.
  - `output/` (6): as-json, as-yaml, as-markdown-report, as-comparison-table, as-checklist, as-step-by-step-plan
  - `meta/` (8): debug-failing, shorten, evaluate-quality, adapt-general, split-modules, etc.

- **14 Skills** covering:
  - ai-routing, coding, debugging, planning, repo-analysis, research
  - tool-use, prompt-composition, system-prompts, workflows, writing

#### Registry System
- `prompts-registry.yaml`: 46 prompt entries with full metadata
- `tags-registry.yaml`: 30+ tags across 7 groups
- `relations-registry.yaml`: 80+ relationships between assets
- `routes-registry.yaml`: 8 routing paths for core task types
- `skills-registry.yaml`: 14 skill entries

#### Documentation
- `README.md` (English): Modern, professional entry with badges and navigation
- `README.zh-CN.md` (Chinese): Complete Chinese translation
- `INDEX.md`: Global asset index with statistics
- `AI-BOOTSTRAP.md`: AI startup guide
- `AI-USAGE.md`: AI usage guidelines
- `AI-ROUTING.md`: AI routing logic guide
- `CHANGELOG.md`: Version history
- `PROJECT-PLAN.md`: Project roadmap and principles
- `CONTRIBUTING.md`: Contribution guidelines
- `CODE_OF_CONDUCT.md`: Community code of conduct
- `SECURITY.md`: Security policy

#### Licensing
- Dual license model implemented:
  - Apache-2.0 for code/scripts/configs
  - CC BY 4.0 for content assets

### Fixed

#### Registry Quality
- Corrected invalid prompt reference (`prompt-task-coding-fix-bug` → `prompt-task-debugging-fix-bug`)
- Removed obsolete `pending_items` sections with outdated references
- Ensured all registry paths match actual file locations
- Verified all relation `source_id` and `target_id` exist

#### Skills Structure
- Consolidated `skills/` as canonical directory
- Migrated skills from `.trae/skills/` to `skills/`
- Removed duplicate SKILL.md files
- Standardized skill file naming

### Changed

- `INDEX.md`: Updated statistics to reflect actual counts
- `README.md`: Complete rewrite with modern layout and badges
- `README.zh-CN.md`: Created as complete Chinese version
- License files: Clarified dual license boundaries

### Removed

- Redundant prompt duplicates (e.g., `prompt-task-coding-code-review.md` in wrong location)
- Obsolete `pending_items` documentation that referenced non-existent assets

### Security

- Implemented SECURITY.md with responsible disclosure policy
- No security vulnerabilities reported

---

## [v0.1.0] - 2026-03-18

### Added (Historical)
- Initial prompt repository structure
- Basic prompt categories (coding, debugging, planning)
- Early workflow definitions
- Initial README and INDEX

---

## Versioning Policy

This project follows [Semantic Versioning](https://semver.org/):
- MAJOR version: Incompatible changes
- MINOR version: New assets or significant additions
- PATCH version: Bug fixes and documentation updates

### Version Boundaries

| Version | Status | Description |
|---------|--------|-------------|
| v1.0.0 | Current | Minimum viable product with complete asset coverage |
| v0.1.0 | Legacy | Initial structure and early prompts |

---

## Release Criteria for v1.0.0

- [x] All core task types supported (coding, debugging, repo-analysis, planning, research)
- [x] Registry system operational for AI routing
- [x] Skills directory unified and consistent
- [x] Dual licensing implemented and documented
- [x] README bilingual and professional
- [x] AI documentation complete
- [x] No critical registry errors
- [x] No duplicate or dangling references

---

## Future Considerations

See [PROJECT-PLAN.md](PROJECT-PLAN.md) for roadmap and planned enhancements.

---

*This changelog tracks changes that affect users and AI systems reading this repository.*

---
name: "multi-language-file-handler"
description: "Handles files across different programming languages with syntax awareness. Invoke when working with multiple language files or needing language-specific processing."
---

# Multi-Language File Handler Skill

A skill for processing files across different programming languages with syntax awareness.

## When to Use

- Working with multiple programming languages
- Need language-specific parsing
- Converting between language syntaxes
- Understanding code structure across languages

## Supported Languages

### Web Frontend
| Language | Extensions | Key Features |
|----------|-----------|--------------|
| JavaScript | .js, .mjs, .cjs | ES6+, CommonJS, ESM |
| TypeScript | .ts, .tsx | Types, Interfaces, Generics |
| HTML | .html, .htm | DOM, Templates |
| CSS | .css, .scss, .sass, .less | Styles, Preprocessors |
| Vue | .vue | SFC, Composition API |
| Svelte | .svelte | SFC, Reactive |

### Backend Languages
| Language | Extensions | Key Features |
|----------|-----------|--------------|
| Python | .py, .pyw | Classes, Decorators, Async |
| Java | .java | Classes, Annotations, Generics |
| C# | .cs | Classes, LINQ, Async |
| Go | .go | Goroutines, Interfaces |
| Rust | .rs | Traits, Ownership |
| PHP | .php | Classes, Traits |
| Ruby | .rb | Classes, Modules, Blocks |

### Systems & Scripting
| Language | Extensions | Key Features |
|----------|-----------|--------------|
| C | .c, .h | Pointers, Memory |
| C++ | .cpp, .hpp, .cc | Classes, Templates |
| Shell | .sh, .bash, .zsh | Scripts, Functions |
| PowerShell | .ps1, .psm1 | Cmdlets, Modules |
| Lua | .lua | Tables, Coroutines |

### Data & Config
| Language | Extensions | Key Features |
|----------|-----------|--------------|
| JSON | .json | Data, Config |
| YAML | .yaml, .yml | Config, Data |
| XML | .xml | Data, Config |
| TOML | .toml | Config |
| SQL | .sql | Queries, DDL |

### Functional
| Language | Extensions | Key Features |
|----------|-----------|--------------|
| Haskell | .hs | Types, Monads |
| Elixir | .ex, .exs | Modules, Macros |
| Clojure | .clj, .cljs | Lisp syntax |
| F# | .fs | .NET functional |

## Language Detection

### By Extension

```markdown
Primary detection method:
1. Get file extension
2. Match against known extensions
3. Handle ambiguous cases (.h could be C or C++)
```

### By Content

```markdown
Secondary detection:
1. Check shebang line
2. Look for language-specific syntax
3. Check for language markers:
   - Python: import, def, class
   - JavaScript: const, let, function
   - Go: package, func, import
   - Rust: fn, let, impl
```

## Syntax-Aware Operations

### Parse Structure

For each language, extract:

```markdown
## Common Elements
- Imports/Requires
- Functions/Methods
- Classes/Structs
- Variables/Constants
- Comments
- Exports

## Language-Specific
- Python: Decorators, Type hints
- JavaScript: JSX, Async/await
- Java: Annotations, Interfaces
- Go: Goroutines, Channels
- Rust: Traits, Lifetimes
```

### Extract Components

```markdown
## Function Extraction

Python:
def name(params) -> return_type:
    """docstring"""
    body

JavaScript:
function name(params) { body }
const name = (params) => { body }

Go:
func name(params) return_type { body }

Rust:
fn name(params) -> return_type { body }
```

### Find References

```markdown
## Import Analysis

Python:
import module
from module import name

JavaScript:
import { name } from 'module'
const name = require('module')

Go:
import "package"

Java:
import package.Class;
```

## Language-Specific Patterns

### Python

```markdown
## Key Patterns
- Decorators: @decorator
- Context managers: with statement
- List comprehensions: [x for x in list]
- Type hints: def func(x: int) -> str:
- Async: async def, await

## File Structure
"""
Module docstring
"""
import statements

constants

classes

functions

if __name__ == "__main__":
    main()
```

### JavaScript/TypeScript

```markdown
## Key Patterns
- Arrow functions: () => {}
- Destructuring: const { a } = obj
- Spread: ...args
- Async: async/await, Promise
- Classes: class, extends

## File Structure
import statements

constants

interfaces (TypeScript)

classes

functions

exports
```

### Go

```markdown
## Key Patterns
- Goroutines: go func()
- Channels: ch := make(chan type)
- Defer: defer cleanup()
- Error handling: if err != nil
- Interfaces: type Name interface {}

## File Structure
package name

import statements

constants

types

variables

functions

methods
```

### Rust

```markdown
## Key Patterns
- Ownership: &ref, &mut ref
- Traits: impl Trait for Type
- Pattern matching: match expr {}
- Error handling: Result<T, E>
- Lifetimes: 'a

## File Structure
use statements

structs

enums

traits

impl blocks

functions

tests (#[cfg(test)])
```

## Conversion Between Languages

### Function Signature Conversion

```markdown
## Python to JavaScript

Python: def func(a: int, b: str = "default") -> bool:
JavaScript: function func(a, b = "default") { }

## Python to Go

Python: def func(a: int, b: str) -> bool:
Go: func func(a int, b string) bool { }

## Python to Rust

Python: def func(a: int, b: str) -> bool:
Rust: fn func(a: i32, b: &str) -> bool { }
```

### Class Conversion

```markdown
## Python to TypeScript

Python:
class MyClass:
    def __init__(self, name: str):
        self.name = name

TypeScript:
class MyClass {
    constructor(public name: string) {}
}
```

## File Operations

### Read with Syntax Awareness

```markdown
1. Detect language
2. Parse syntax tree
3. Extract structure
4. Return structured data:
   - imports: []
   - exports: []
   - functions: []
   - classes: []
   - variables: []
```

### Write with Formatting

```markdown
1. Determine target language
2. Apply language-specific formatting
3. Use appropriate conventions:
   - Python: PEP 8
   - JavaScript: Prettier
   - Go: gofmt
   - Rust: rustfmt
```

## Related Skills

- `document-processor` - Handle document files
- `code-search-navigator` - Search across language files
- `cross-file-refactor` - Refactor across language boundaries

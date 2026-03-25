---
name: "security-auditor"
description: "Audits code for security vulnerabilities, identifies risks, and provides remediation guidance. Invoke when reviewing code security, handling sensitive data, or ensuring compliance."
---

# Security Auditor Skill

A skill for auditing code security and identifying vulnerabilities.

## When to Use

- Code security review
- Handling sensitive data
- Authentication/authorization implementation
- API security
- Compliance requirements

## Security Categories

### Input Validation

| Vulnerability | Risk | Prevention |
|--------------|------|------------|
| SQL Injection | Critical | Parameterized queries |
| XSS | High | Sanitize output |
| Command Injection | Critical | Escape shell args |
| Path Traversal | High | Validate paths |
| SSRF | High | Whitelist URLs |

### Authentication

| Vulnerability | Risk | Prevention |
|--------------|------|------------|
| Weak Passwords | High | Password policy |
| Session Hijacking | High | Secure cookies |
| Brute Force | Medium | Rate limiting |
| Credential Stuffing | High | MFA |
| Token Leakage | Critical | Secure storage |

### Data Protection

| Vulnerability | Risk | Prevention |
|--------------|------|------------|
| Sensitive Data Exposure | Critical | Encryption |
| Insecure Storage | High | Secure storage |
| Data Leakage | High | Access control |
| Logging Sensitive Data | Medium | Redaction |

## Workflow

### 1. Scope Definition

```markdown
Define audit scope:
1. Code areas to review
2. Data types handled
3. Authentication mechanisms
4. External integrations
5. Compliance requirements
```

### 2. Static Analysis

```markdown
Analyze code for:
1. Input validation gaps
2. Authentication flaws
3. Authorization bypasses
4. Cryptographic weaknesses
5. Configuration issues
```

### 3. Dependency Check

```markdown
Check dependencies for:
1. Known vulnerabilities (CVE)
2. Outdated versions
3. Malicious packages
4. License compliance
```

### 4. Configuration Review

```markdown
Review configurations:
1. Environment variables
2. Secret management
3. CORS settings
4. Security headers
5. TLS configuration
```

### 5. Report Generation

```markdown
Generate report with:
1. Vulnerability list
2. Severity ratings
3. Remediation steps
4. Code examples
5. Testing recommendations
```

## Common Vulnerabilities

### SQL Injection

```markdown
## Vulnerable Code
const query = `SELECT * FROM users WHERE id = '${userId}'`;
await db.query(query);

## Secure Code
const query = 'SELECT * FROM users WHERE id = ?';
await db.query(query, [userId]);

## ORM Example
await User.query().where('id', userId);
```

### Cross-Site Scripting (XSS)

```markdown
## Vulnerable Code
element.innerHTML = userInput;

## Secure Code
element.textContent = userInput;
// Or sanitize
element.innerHTML = DOMPurify.sanitize(userInput);

## React (auto-escaped)
<div>{userInput}</div>

## Dangerous
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### Command Injection

```markdown
## Vulnerable Code
exec(`convert ${filename} output.png`);

## Secure Code
execFile('convert', [filename, 'output.png']);

// Or with validation
if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
  throw new Error('Invalid filename');
}
```

### Path Traversal

```markdown
## Vulnerable Code
const filePath = path.join(baseDir, userInput);

## Secure Code
const filePath = path.join(baseDir, userInput);
const resolved = path.resolve(filePath);
if (!resolved.startsWith(baseDir)) {
  throw new Error('Path traversal detected');
}
```

### Insecure Deserialization

```markdown
## Vulnerable Code
const data = JSON.parse(userInput);
eval(data.code); // Never do this!

## Secure Code
const schema = z.object({
  name: z.string(),
  age: z.number()
});
const data = schema.parse(JSON.parse(userInput));
```

## Authentication Security

### Password Storage

```markdown
## Never Store Plain Text
// BAD
await db.save({ password: plainPassword });

## Use Strong Hashing
import bcrypt from 'bcrypt';

const saltRounds = 12;
const hash = await bcrypt.hash(password, saltRounds);

// Verify
const valid = await bcrypt.compare(password, hash);
```

### Session Security

```markdown
## Secure Cookie Settings
res.cookie('session', token, {
  httpOnly: true,      // No JS access
  secure: true,        // HTTPS only
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000      // 1 hour
});

## JWT Best Practices
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
    algorithm: 'HS256'
  }
);
```

### Rate Limiting

```markdown
## Express Rate Limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: 'Too many requests'
});

app.use('/api/', limiter);

## Login Rate Limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true
});
```

## Data Protection

### Sensitive Data Handling

```markdown
## Never Log Secrets
// BAD
console.log('User password:', password);

// GOOD
console.log('User authenticated:', { userId });

## Redact Sensitive Fields
const redact = (obj, fields) => {
  const copy = { ...obj };
  fields.forEach(f => copy[f] = '[REDACTED]');
  return copy;
};

console.log(redact(user, ['password', 'ssn', 'creditCard']));
```

### Environment Variables

```markdown
## Never Hardcode Secrets
// BAD
const apiKey = 'sk-1234567890abcdef';

// GOOD
const apiKey = process.env.API_KEY;

## Validate Required Secrets
const required = ['DATABASE_URL', 'JWT_SECRET', 'API_KEY'];
required.forEach(key => {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }
});
```

### Encryption

```markdown
## AES Encryption
import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(secret, 'salt', 32);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return { iv: iv.toString('hex'), encrypted, authTag: authTag.toString('hex') };
}
```

## Security Headers

```markdown
## Helmet.js (Express)
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "trusted.cdn.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "cdn.example.com"],
  }
}));

## Manual Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

## Security Report Format

```markdown
## Security Audit Report

### Executive Summary
- Critical: 2
- High: 5
- Medium: 8
- Low: 12

### Critical Findings

#### 1. SQL Injection in User Search
**Location**: src/api/users.ts:45
**Severity**: Critical
**Description**: User input directly interpolated into SQL query
**Impact**: Full database access possible
**Remediation**: Use parameterized queries
**Code Fix**:
```typescript
// Before
const query = `SELECT * FROM users WHERE name LIKE '%${name}%'`;

// After
const query = 'SELECT * FROM users WHERE name LIKE ?';
await db.query(query, [`%${name}%`]);
```

### Recommendations
1. Implement input validation layer
2. Add security headers middleware
3. Enable rate limiting on all endpoints
4. Rotate all API keys and secrets
5. Enable audit logging
```

## Related Skills

- `dependency-analyzer` - Check dependency vulnerabilities
- `test-generator` - Security test cases
- `api-integrator` - Secure API integration

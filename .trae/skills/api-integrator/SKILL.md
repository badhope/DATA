---
name: "api-integrator"
description: "Expert in integrating third-party APIs, handling authentication, rate limiting, and error handling. Invoke when connecting to external services or implementing API clients."
---

# API Integrator Skill

A skill for integrating third-party APIs with best practices.

## When to Use

- Integrating third-party services
- Building API clients
- Handling API authentication
- Implementing rate limiting
- Managing API errors

## API Types

### REST APIs

```markdown
## HTTP Methods
| Method | Purpose | Idempotent |
|--------|---------|------------|
| GET | Retrieve resource | Yes |
| POST | Create resource | No |
| PUT | Replace resource | Yes |
| PATCH | Update resource | No |
| DELETE | Remove resource | Yes |

## Status Codes
| Range | Meaning |
|-------|---------|
| 2xx | Success |
| 3xx | Redirect |
| 4xx | Client error |
| 5xx | Server error |
```

### GraphQL APIs

```markdown
## Operations
- Query: Read data
- Mutation: Modify data
- Subscription: Real-time updates

## Example Query
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    posts {
      title
    }
  }
}
```

### Webhook APIs

```markdown
## Event-driven integration
- Register webhook URL
- Receive POST requests on events
- Verify signature for security
- Respond with 200 to acknowledge
```

## Workflow

### 1. API Discovery

```markdown
Understand the API:
1. Read API documentation
2. Identify endpoints
3. Understand authentication
4. Check rate limits
5. Note error responses
```

### 2. Client Design

```markdown
Design the client:
1. Base configuration
2. Authentication handling
3. Request/response types
4. Error handling
5. Retry logic
```

### 3. Implementation

```markdown
Build the client:
1. HTTP client setup
2. Request builders
3. Response parsers
4. Error handlers
5. Rate limiters
```

### 4. Testing

```markdown
Test the integration:
1. Mock server responses
2. Test success cases
3. Test error cases
4. Test rate limiting
5. Test authentication
```

## Authentication Patterns

### API Key

```typescript
interface ApiKeyConfig {
  apiKey: string;
  headerName?: string;
}

class ApiKeyAuth {
  constructor(private config: ApiKeyConfig) {}

  apply(headers: Headers): void {
    headers.set(this.config.headerName || 'X-API-Key', this.config.apiKey);
  }
}

// Usage
const client = new ApiClient({
  baseUrl: 'https://api.example.com',
  auth: new ApiKeyAuth({ apiKey: process.env.API_KEY })
});
```

### Bearer Token

```typescript
interface BearerConfig {
  token: string;
  refreshToken?: string;
  onTokenExpired?: () => Promise<string>;
}

class BearerAuth {
  private token: string;

  constructor(private config: BearerConfig) {
    this.token = config.token;
  }

  async apply(headers: Headers): Promise<void> {
    headers.set('Authorization', `Bearer ${this.token}`);
  }

  async refreshToken(): Promise<void> {
    if (this.config.onTokenExpired) {
      this.token = await this.config.onTokenExpired();
    }
  }
}
```

### OAuth 2.0

```typescript
interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  authorizeUrl: string;
  tokenUrl: string;
  scopes: string[];
  redirectUri: string;
}

class OAuth2Client {
  constructor(private config: OAuthConfig) {}

  getAuthorizeUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scopes.join(' '),
      state
    });
    return `${this.config.authorizeUrl}?${params}`;
  }

  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    const response = await fetch(this.config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.redirectUri
      })
    });
    return response.json();
  }
}
```

## Rate Limiting

### Client-Side Rate Limiting

```typescript
class RateLimiter {
  private queue: Array<() => void> = [];
  private tokens: number;
  private lastRefill: number;

  constructor(
    private maxTokens: number,
    private refillRate: number // tokens per second
  ) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }

  async acquire(): Promise<void> {
    this.refillTokens();

    if (this.tokens > 0) {
      this.tokens--;
      return;
    }

    return new Promise(resolve => {
      this.queue.push(resolve);
      this.scheduleRefill();
    });
  }

  private refillTokens(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    const newTokens = Math.floor(elapsed * this.refillRate);
    
    if (newTokens > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + newTokens);
      this.lastRefill = now;
    }
  }

  private scheduleRefill(): void {
    setTimeout(() => {
      this.refillTokens();
      if (this.tokens > 0 && this.queue.length > 0) {
        this.tokens--;
        const next = this.queue.shift();
        next?.();
      }
    }, 1000 / this.refillRate);
  }
}
```

### Server-Side Rate Limit Handling

```typescript
class ApiClient {
  async request<T>(config: RequestConfig): Promise<T> {
    const response = await this.makeRequest(config);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000;
      
      await this.sleep(delay);
      return this.request(config);
    }

    return this.parseResponse<T>(response);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Error Handling

### Error Types

```typescript
class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

class NetworkError extends Error {
  constructor(public cause: Error) {
    super(`Network Error: ${cause.message}`);
    this.name = 'NetworkError';
  }
}

class RateLimitError extends Error {
  constructor(public retryAfter: number) {
    super(`Rate limited. Retry after ${retryAfter}s`);
    this.name = 'RateLimitError';
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}
```

### Retry Strategy

```typescript
interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryableStatuses: number[];
}

class RetryStrategy {
  constructor(private config: RetryConfig) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error;
    let delay = this.config.initialDelay;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (!this.shouldRetry(error)) {
          throw error;
        }

        if (attempt < this.config.maxRetries) {
          await this.sleep(delay);
          delay = Math.min(delay * this.config.backoffFactor, this.config.maxDelay);
        }
      }
    }

    throw lastError;
  }

  private shouldRetry(error: unknown): boolean {
    if (error instanceof ApiError) {
      return this.config.retryableStatuses.includes(error.status);
    }
    return error instanceof NetworkError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## API Client Template

```typescript
interface ApiClientConfig {
  baseUrl: string;
  auth?: AuthProvider;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

class ApiClient {
  private rateLimiter: RateLimiter;
  private retryStrategy: RetryStrategy;

  constructor(private config: ApiClientConfig) {
    this.rateLimiter = new RateLimiter(100, 10);
    this.retryStrategy = new RetryStrategy({
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 30000,
      backoffFactor: 2,
      retryableStatuses: [429, 500, 502, 503, 504]
    });
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>({ method: 'GET', path, params });
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>({ method: 'POST', path, body });
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>({ method: 'PUT', path, body });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', path });
  }

  private async request<T>(config: RequestConfig): Promise<T> {
    await this.rateLimiter.acquire();

    return this.retryStrategy.execute(async () => {
      const url = this.buildUrl(config.path, config.params);
      const headers = this.buildHeaders();

      const response = await fetch(url, {
        method: config.method,
        headers,
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: this.config.timeout 
          ? AbortSignal.timeout(this.config.timeout)
          : undefined
      });

      if (!response.ok) {
        throw new ApiError(response.status, response.statusText, await response.text());
      }

      return response.json();
    });
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, this.config.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    return url.toString();
  }

  private buildHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...this.config.defaultHeaders
    });
    this.config.auth?.apply(headers);
    return headers;
  }
}
```

## Related Skills

- `security-auditor` - Secure API handling
- `error-recovery` - Error handling strategies
- `dependency-analyzer` - API dependency management

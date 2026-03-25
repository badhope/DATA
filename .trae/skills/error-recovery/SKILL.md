---
name: "error-recovery"
description: "Recovers from errors gracefully, providing rollback, retry, and fallback strategies. Invoke when operations fail or when building resilient systems."
---

# Error Recovery Skill

A skill for recovering from errors and building resilient systems.

## When to Use

- Operation failed unexpectedly
- Building fault-tolerant systems
- Implementing retry logic
- Creating rollback mechanisms
- Handling cascading failures

## Error Categories

### Transient Errors

| Type | Cause | Recovery |
|------|-------|----------|
| Network Timeout | Connection timeout | Retry with backoff |
| Service Unavailable | Server overloaded | Retry later |
| Rate Limited | Too many requests | Wait and retry |
| Connection Reset | Network issue | Reconnect |

### Permanent Errors

| Type | Cause | Recovery |
|------|-------|----------|
| Not Found | Resource missing | Skip or create |
| Unauthorized | Invalid credentials | Re-authenticate |
| Forbidden | Permission denied | Request access |
| Validation Error | Invalid input | Fix and retry |

### System Errors

| Type | Cause | Recovery |
|------|-------|----------|
| Out of Memory | Resource exhaustion | Free resources |
| Disk Full | Storage limit | Clean up |
| Process Crash | Unhandled exception | Restart process |

## Workflow

### 1. Error Detection

```markdown
Identify error:
1. Parse error type
2. Determine category
3. Assess recoverability
4. Log error details
```

### 2. Recovery Strategy Selection

```markdown
Choose strategy:
1. Retry - for transient errors
2. Rollback - for partial failures
3. Fallback - for unavailable services
4. Skip - for non-critical failures
5. Abort - for unrecoverable errors
```

### 3. Recovery Execution

```markdown
Execute recovery:
1. Apply selected strategy
2. Monitor for success
3. Handle secondary failures
4. Update state
```

### 4. Post-Recovery

```markdown
After recovery:
1. Verify system state
2. Log recovery action
3. Notify if needed
4. Update metrics
```

## Recovery Strategies

### Retry with Exponential Backoff

```typescript
interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  jitter: boolean;
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: RetryConfig
): Promise<T> {
  let lastError: Error;
  let delay = config.initialDelay;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === config.maxAttempts) {
        break;
      }

      const actualDelay = config.jitter
        ? delay + Math.random() * delay * 0.1
        : delay;

      await sleep(actualDelay);
      delay = Math.min(delay * config.backoffFactor, config.maxDelay);
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Circuit Breaker

```typescript
type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerConfig {
  failureThreshold: number;
  successThreshold: number;
  timeout: number;
}

class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;

  constructor(private config: CircuitBreakerConfig) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime >= this.config.timeout) {
        this.state = 'half-open';
        this.successes = 0;
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    
    if (this.state === 'half-open') {
      this.successes++;
      if (this.successes >= this.config.successThreshold) {
        this.state = 'closed';
      }
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === 'half-open') {
      this.state = 'open';
    } else if (this.failures >= this.config.failureThreshold) {
      this.state = 'open';
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}
```

### Rollback Mechanism

```typescript
interface Operation<T> {
  execute: () => Promise<T>;
  rollback: (result: T) => Promise<void>;
}

class TransactionManager {
  private operations: Array<Operation<unknown>> = [];
  private results: Array<{ op: Operation<unknown>; result: unknown }> = [];

  add<T>(operation: Operation<T>): void {
    this.operations.push(operation as Operation<unknown>);
  }

  async execute(): Promise<void> {
    for (const op of this.operations) {
      try {
        const result = await op.execute();
        this.results.push({ op, result });
      } catch (error) {
        await this.rollback();
        throw error;
      }
    }
  }

  private async rollback(): Promise<void> {
    const errors: Error[] = [];

    for (const { op, result } of this.results.reverse()) {
      try {
        await op.rollback(result);
      } catch (error) {
        errors.push(error as Error);
      }
    }

    if (errors.length > 0) {
      console.error('Rollback errors:', errors);
    }
  }
}

// Usage
const transaction = new TransactionManager();

transaction.add({
  execute: async () => await createOrder(orderData),
  rollback: async (order) => await cancelOrder(order.id)
});

transaction.add({
  execute: async () => await chargePayment(paymentData),
  rollback: async (payment) => await refundPayment(payment.id)
});

transaction.add({
  execute: async () => await sendConfirmation(emailData),
  rollback: async () => await sendCancellation(emailData)
});

await transaction.execute();
```

### Fallback Strategy

```typescript
interface FallbackConfig<T> {
  primary: () => Promise<T>;
  fallbacks: Array<() => Promise<T>>;
  cache?: {
    get: () => Promise<T | null>;
    set: (value: T) => Promise<void>;
  };
}

async function withFallback<T>(config: FallbackConfig<T>): Promise<T> {
  const sources = [config.primary, ...config.fallbacks];

  for (const source of sources) {
    try {
      const result = await source();
      await config.cache?.set(result);
      return result;
    } catch (error) {
      console.warn('Source failed:', error);
    }
  }

  const cached = await config.cache?.get();
  if (cached !== null) {
    return cached;
  }

  throw new Error('All sources failed and no cache available');
}

// Usage
const data = await withFallback({
  primary: () => fetchFromMainAPI(),
  fallbacks: [
    () => fetchFromBackupAPI(),
    () => fetchFromLocalCache()
  ],
  cache: {
    get: () => redis.get('data'),
    set: (value) => redis.set('data', value)
  }
});
```

### Bulkhead Pattern

```typescript
class Bulkhead {
  private active = 0;
  private queue: Array<() => void> = [];

  constructor(private maxConcurrent: number) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  private async acquire(): Promise<void> {
    if (this.active < this.maxConcurrent) {
      this.active++;
      return;
    }

    return new Promise(resolve => {
      this.queue.push(() => {
        this.active++;
        resolve();
      });
    });
  }

  private release(): void {
    this.active--;
    const next = this.queue.shift();
    next?.();
  }
}

// Usage - limit concurrent API calls
const apiBulkhead = new Bulkhead(10);

const results = await Promise.all(
  items.map(item => apiBulkhead.execute(() => api.processItem(item)))
);
```

## Error Classification

```typescript
function classifyError(error: unknown): ErrorCategory {
  if (error instanceof NetworkError) {
    return {
      type: 'transient',
      recoverable: true,
      strategy: 'retry'
    };
  }

  if (error instanceof ValidationError) {
    return {
      type: 'permanent',
      recoverable: false,
      strategy: 'fix-input'
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      type: 'auth',
      recoverable: true,
      strategy: 're-auth'
    };
  }

  if (error instanceof RateLimitError) {
    return {
      type: 'transient',
      recoverable: true,
      strategy: 'wait-retry'
    };
  }

  return {
    type: 'unknown',
    recoverable: false,
    strategy: 'abort'
  };
}
```

## Error Recovery Report

```markdown
## Error Recovery Report

### Error Details
- Type: NetworkError
- Message: Connection timeout after 30s
- Timestamp: 2026-03-25T10:00:00Z
- Context: API call to payment service

### Recovery Actions
1. Retry 1: Failed after 1s
2. Retry 2: Failed after 2s
3. Retry 3: Success after 4s

### Final Status
- Recovered: Yes
- Total time: 7s
- Strategy used: Exponential backoff

### Recommendations
- Increase timeout to 45s
- Add circuit breaker for payment service
- Consider async payment processing
```

## Related Skills

- `execution-timeout-handler` - Timeout handling
- `api-integrator` - API error handling
- `debugging` - Debug error causes

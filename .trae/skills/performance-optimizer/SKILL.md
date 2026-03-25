---
name: "performance-optimizer"
description: "Analyzes code performance, identifies bottlenecks, and provides optimization recommendations. Invoke when code is slow, memory usage is high, or optimization is needed."
---

# Performance Optimizer Skill

A skill for analyzing and optimizing code performance.

## When to Use

- Code is running slowly
- Memory usage is high
- Need to optimize for scale
- Profiling application performance
- Benchmarking code changes

## Performance Analysis Areas

### Time Complexity

| Complexity | Name | Example | Scale |
|------------|------|---------|-------|
| O(1) | Constant | Hash lookup | Excellent |
| O(log n) | Logarithmic | Binary search | Great |
| O(n) | Linear | Simple loop | Good |
| O(n log n) | Linearithmic | Sorting | Acceptable |
| O(n²) | Quadratic | Nested loops | Poor |
| O(2ⁿ) | Exponential | Recursive fib | Terrible |

### Space Complexity

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | In-place swap |
| O(n) | Linear | Array copy |
| O(n²) | Quadratic | 2D array |

## Workflow

### 1. Identify Bottlenecks

```markdown
Methods:
1. Profiling data
2. User reports
3. Monitoring alerts
4. Code review
5. Benchmarking
```

### 2. Measure Baseline

```markdown
Collect:
1. Execution time
2. Memory usage
3. CPU utilization
4. I/O operations
5. Network calls
```

### 3. Analyze Root Cause

```markdown
Investigate:
1. Algorithm efficiency
2. Data structure choice
3. Resource allocation
4. Caching opportunities
5. Concurrency issues
```

### 4. Implement Optimization

```markdown
Apply:
1. Algorithm improvement
2. Data structure change
3. Caching strategy
4. Lazy loading
5. Parallel processing
```

### 5. Verify Improvement

```markdown
Compare:
1. Before vs after metrics
2. Regression testing
3. Edge case handling
4. Resource usage
```

## Common Performance Issues

### Algorithm Issues

```markdown
## Nested Loop Problem
// O(n²) - Slow
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}

// O(n) - Faster using Map
const map = new Map(arr.map(item => [item.id, item]));
for (const item of arr) {
  const related = map.get(item.relatedId);
}
```

### Memory Issues

```markdown
## Memory Leak Pattern
// Bad: Event listener not cleaned
useEffect(() => {
  window.addEventListener('resize', handler);
}, []);

// Good: Cleanup on unmount
useEffect(() => {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

### I/O Issues

```markdown
## Sequential I/O - Slow
const results = [];
for (const url of urls) {
  results.push(await fetch(url));
}

// Parallel I/O - Faster
const results = await Promise.all(urls.map(url => fetch(url)));
```

### Database Issues

```markdown
## N+1 Query Problem
// Bad: N+1 queries
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findByUserId(user.id);
}

// Good: Eager loading
const users = await User.findAll({
  include: [{ model: Post }]
});
```

## Optimization Strategies

### Caching

```markdown
## Cache Types
1. Memory cache (Map, LRU)
2. Browser cache
3. CDN cache
4. Database cache
5. Application cache (Redis)

## Cache Strategies
- Cache-aside: Check cache, then DB
- Write-through: Write to cache and DB
- Write-behind: Write to cache, async to DB
- Refresh-ahead: Preemptively refresh
```

### Lazy Loading

```markdown
## Code Splitting
// Dynamic import
const module = await import('./heavy-module');

// React lazy loading
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

## Data Lazy Loading
// Pagination
const loadMore = async (page) => {
  return fetch(`/api/items?page=${page}`);
};

// Infinite scroll
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
});
```

### Memoization

```markdown
## Function Memoization
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

## React Memoization
const MemoComponent = React.memo(Component);
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

### Debouncing & Throttling

```markdown
## Debounce (delay until pause)
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// Use case: Search input
const handleSearch = debounce((query) => {
  fetchResults(query);
}, 300);

## Throttle (limit rate)
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Use case: Scroll handler
const handleScroll = throttle(() => {
  updatePosition();
}, 100);
```

### Parallel Processing

```markdown
## Web Workers
const worker = new Worker('heavy-computation.js');
worker.postMessage(data);
worker.onmessage = (e) => console.log(e.data);

## Promise.all
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

## Worker Threads (Node.js)
const { Worker } = require('worker_threads');
const worker = new Worker('./worker.js');
```

## Profiling Tools

### Browser

```markdown
## Chrome DevTools
- Performance tab: Record and analyze
- Memory tab: Heap snapshots
- Network tab: Request timing
- Lighthouse: Overall audit

## Performance API
performance.mark('start');
// ... code ...
performance.mark('end');
performance.measure('operation', 'start', 'end');
```

### Node.js

```markdown
## Built-in Profiler
node --prof app.js
node --prof-process isolate-*.log

## Clinic.js
clinic doctor -- node app.js
clinic flame -- node app.js
clinic bubbleprof -- node app.js

## Memory Usage
const used = process.memoryUsage();
console.log({
  heapUsed: `${used.heapUsed / 1024 / 1024} MB`,
  heapTotal: `${used.heapTotal / 1024 / 1024} MB`,
  external: `${used.external / 1024 / 1024} MB`
});
```

### Python

```markdown
## cProfile
python -m cProfile -s time script.py

## line_profiler
@profile
def slow_function():
    ...

kernprof -l -v script.py

## memory_profiler
from memory_profiler import profile
@profile
def memory_heavy():
    ...
```

## Performance Report Format

```markdown
## Performance Analysis Report

### Summary
- Total execution time: 2.5s
- Peak memory: 150MB
- Bottleneck: Database queries

### Top Issues
1. N+1 query in user service (800ms)
2. Synchronous file I/O (300ms)
3. Unoptimized image loading (200ms)

### Recommendations
1. Implement eager loading for user posts
2. Use async file operations
3. Add image lazy loading and compression

### Expected Improvement
- 60% reduction in load time
- 30% reduction in memory usage
```

## Related Skills

- `debugging` - Debug performance issues
- `test-generator` - Performance tests
- `dependency-analyzer` - Check dependency size

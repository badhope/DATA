---
name: "microservices-patterns"
description: "Expert in microservices patterns including service discovery, circuit breaker, rate limiting, and distributed tracing."
category: "backend"
tags: ["microservices", "architecture", "distributed", "patterns"]
---

# Microservices Patterns

Expert in designing and implementing microservices architecture patterns.

## Description

Master microservices design patterns for building scalable, resilient distributed systems. Covers service discovery, circuit breakers, rate limiting, saga patterns, and distributed tracing.

## When to Use

- Designing microservices architecture
- Implementing service communication
- Building resilient distributed systems
- Scaling services independently
- Implementing service mesh

## Core Patterns

### 1. Service Discovery

```python
from typing import Dict, List, Optional
from dataclasses import dataclass
import consul
import random

@dataclass
class ServiceInstance:
    id: str
    name: str
    address: str
    port: int
    metadata: Dict

class ConsulServiceDiscovery:
    def __init__(self, host: str = "localhost", port: int = 8500):
        self.client = consul.Consul(host=host, port=port)
    
    def register(self, service: ServiceInstance):
        self.client.agent.service.register(
            name=service.name,
            service_id=service.id,
            address=service.address,
            port=service.port,
            check=consul.Check.http(
                f"http://{service.address}:{service.port}/health",
                interval="10s"
            )
        )
    
    def deregister(self, service_id: str):
        self.client.agent.service.deregister(service_id)
    
    def discover(self, service_name: str) -> List[ServiceInstance]:
        _, services = self.client.health.service(service_name, passing=True)
        return [
            ServiceInstance(
                id=s["Service"]["ID"],
                name=s["Service"]["Service"],
                address=s["Service"]["Address"],
                port=s["Service"]["Port"],
                metadata=s["Service"].get("Meta", {})
            )
            for s in services
        ]
    
    def get_instance(self, service_name: str) -> Optional[ServiceInstance]:
        instances = self.discover(service_name)
        if not instances:
            return None
        return random.choice(instances)  # Load balancing
```

### 2. Circuit Breaker

```python
from enum import Enum
from datetime import datetime, timedelta
from typing import Callable
import asyncio

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: int = 30,
        half_open_max_calls: int = 3
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max_calls = half_open_max_calls
        
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time = None
        self.half_open_calls = 0
    
    async def call(self, func: Callable, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
                self.half_open_calls = 0
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = await func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e
    
    def _should_attempt_reset(self) -> bool:
        if not self.last_failure_time:
            return False
        return datetime.now() - self.last_failure_time > timedelta(seconds=self.recovery_timeout)
    
    def _on_success(self):
        self.failure_count = 0
        if self.state == CircuitState.HALF_OPEN:
            self.half_open_calls += 1
            if self.half_open_calls >= self.half_open_max_calls:
                self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = datetime.now()
        
        if self.state == CircuitState.HALF_OPEN:
            self.state = CircuitState.OPEN
        elif self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

# Decorator usage
def circuit_breaker(failure_threshold=5, recovery_timeout=30):
    cb = CircuitBreaker(failure_threshold, recovery_timeout)
    
    def decorator(func):
        async def wrapper(*args, **kwargs):
            return await cb.call(func, *args, **kwargs)
        return wrapper
    return decorator
```

### 3. Rate Limiting

```python
import time
from typing import Dict
from collections import defaultdict

class TokenBucket:
    def __init__(self, rate: int, capacity: int):
        self.rate = rate  # Tokens per second
        self.capacity = capacity
        self.tokens = capacity
        self.last_update = time.time()
    
    def consume(self, tokens: int = 1) -> bool:
        now = time.time()
        elapsed = now - self.last_update
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.last_update = now
        
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False

class RateLimiter:
    def __init__(self, rate: int, capacity: int):
        self.rate = rate
        self.capacity = capacity
        self.buckets: Dict[str, TokenBucket] = defaultdict(
            lambda: TokenBucket(rate, capacity)
        )
    
    def is_allowed(self, client_id: str) -> bool:
        return self.buckets[client_id].consume()

# Sliding Window Rate Limiter
class SlidingWindowRateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests: Dict[str, list] = defaultdict(list)
    
    def is_allowed(self, client_id: str) -> bool:
        now = time.time()
        window_start = now - self.window
        
        # Remove old requests
        self.requests[client_id] = [
            t for t in self.requests[client_id] if t > window_start
        ]
        
        if len(self.requests[client_id]) < self.max_requests:
            self.requests[client_id].append(now)
            return True
        return False

# FastAPI integration
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()
rate_limiter = RateLimiter(rate=10, capacity=20)

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_id = request.client.host  # Or use API key
    if not rate_limiter.is_allowed(client_id):
        return JSONResponse(
            status_code=429,
            content={"error": "Rate limit exceeded"}
        )
    return await call_next(request)
```

### 4. Saga Pattern

```python
from typing import List, Callable, Any
from dataclasses import dataclass
from enum import Enum

class SagaStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    COMPENSATED = "compensated"
    FAILED = "failed"

@dataclass
class SagaStep:
    name: str
    action: Callable
    compensate: Callable

class Saga:
    def __init__(self, steps: List[SagaStep]):
        self.steps = steps
        self.completed_steps: List[int] = []
        self.status = SagaStatus.PENDING
    
    async def execute(self) -> Any:
        try:
            for i, step in enumerate(self.steps):
                result = await step.action()
                self.completed_steps.append(i)
            self.status = SagaStatus.COMPLETED
            return result
        except Exception as e:
            self.status = SagaStatus.FAILED
            await self.compensate()
            raise e
    
    async def compensate(self):
        # Execute compensation in reverse order
        for i in reversed(self.completed_steps):
            try:
                await self.steps[i].compensate()
            except Exception:
                pass  # Log error but continue compensation
        self.status = SagaStatus.COMPENSATED

# Order Saga Example
async def create_order_saga(order_data: dict):
    saga = Saga([
        SagaStep(
            name="reserve_inventory",
            action=lambda: inventory_service.reserve(order_data["items"]),
            compensate=lambda: inventory_service.release(order_data["items"])
        ),
        SagaStep(
            name="process_payment",
            action=lambda: payment_service.charge(order_data["payment"]),
            compensate=lambda: payment_service.refund(order_data["payment"])
        ),
        SagaStep(
            name="create_shipment",
            action=lambda: shipping_service.create(order_data["shipping"]),
            compensate=lambda: shipping_service.cancel(order_data["shipping"])
        )
    ])
    
    return await saga.execute()
```

### 5. Distributed Tracing

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger import JaegerExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

def setup_tracing(service_name: str, jaeger_host: str = "localhost"):
    provider = TracerProvider()
    
    jaeger_exporter = JaegerExporter(
        agent_host_name=jaeger_host,
        agent_port=6831,
    )
    
    provider.add_span_processor(BatchSpanProcessor(jaeger_exporter))
    trace.set_tracer_provider(provider)
    
    return trace.get_tracer(service_name)

# Usage in FastAPI
app = FastAPI()
FastAPIInstrumentor.instrument_app(app)

tracer = setup_tracing("order-service")

@app.post("/orders")
async def create_order(order: Order):
    with tracer.start_as_current_span("create_order") as span:
        span.set_attribute("order_id", order.id)
        
        with tracer.start_as_current_span("validate_order"):
            validate_order(order)
        
        with tracer.start_as_current_span("process_payment"):
            process_payment(order.payment)
        
        return {"status": "created"}
```

### 6. API Gateway Pattern

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse
import httpx
from typing import Dict

class APIGateway:
    def __init__(self):
        self.routes: Dict[str, str] = {}
        self.client = httpx.AsyncClient(timeout=30.0)
    
    def add_route(self, path_prefix: str, service_url: str):
        self.routes[path_prefix] = service_url
    
    async def proxy(self, request: Request) -> StreamingResponse:
        path = request.url.path
        
        for prefix, service_url in self.routes.items():
            if path.startswith(prefix):
                target_url = f"{service_url}{path[len(prefix):]}"
                
                response = await self.client.request(
                    method=request.method,
                    url=target_url,
                    headers=dict(request.headers),
                    content=await request.body()
                )
                
                return StreamingResponse(
                    iter([response.content]),
                    status_code=response.status_code,
                    headers=dict(response.headers)
                )
        
        raise HTTPException(status_code=404, detail="Service not found")

app = FastAPI()
gateway = APIGateway()
gateway.add_route("/api/users", "http://user-service:8001")
gateway.add_route("/api/orders", "http://order-service:8002")
gateway.add_route("/api/products", "http://product-service:8003")

@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy_request(request: Request):
    return await gateway.proxy(request)
```

## Best Practices

1. **Service Boundaries**: Define clear service boundaries
2. **Communication**: Use appropriate patterns (sync vs async)
3. **Resilience**: Implement circuit breakers and retries
4. **Observability**: Distributed tracing and logging
5. **Data Management**: Database per service
6. **Deployment**: Independent deployment pipelines
7. **Testing**: Contract testing between services
8. **Security**: Service-to-service authentication

## Related Skills

- `architecture-design` - Architecture patterns
- `kubernetes-orchestration` - Container orchestration
- `docker-containerization` - Containerization
- `api-design` - API design

---
name: "event-driven-architecture"
description: "Expert in event-driven architecture including event sourcing, CQRS, Saga patterns, and message streaming."
category: "backend"
tags: ["events", "architecture", "cqrs", "saga", "streaming"]
---

# Event-Driven Architecture

Expert in designing event-driven systems with event sourcing, CQRS, and streaming.

## Description

Build scalable event-driven systems using event sourcing, CQRS, Saga patterns, and event streaming platforms. Covers event design, message brokers, and eventual consistency.

## When to Use

- Building real-time systems
- Implementing audit trails
- Creating scalable architectures
- Building event-sourced systems
- Implementing CQRS pattern

## Core Patterns

### 1. Event Sourcing

```python
from typing import List, Dict, Any
from datetime import datetime
from dataclasses import dataclass, field
from abc import ABC, abstractmethod
import json

@dataclass
class Event:
    event_id: str
    event_type: str
    aggregate_id: str
    aggregate_type: str
    data: Dict[str, Any]
    metadata: Dict[str, Any] = field(default_factory=dict)
    timestamp: datetime = field(default_factory=datetime.utcnow)
    version: int = 1

class EventStore:
    def __init__(self, db_connection):
        self.db = db_connection
    
    async def append(self, event: Event):
        await self.db.execute("""
            INSERT INTO events (event_id, event_type, aggregate_id, 
                               aggregate_type, data, metadata, timestamp, version)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            event.event_id, event.event_type, event.aggregate_id,
            event.aggregate_type, json.dumps(event.data),
            json.dumps(event.metadata), event.timestamp, event.version
        ))
    
    async def get_events(self, aggregate_id: str) -> List[Event]:
        rows = await self.db.fetch_all("""
            SELECT * FROM events 
            WHERE aggregate_id = ? 
            ORDER BY version ASC
        """, (aggregate_id,))
        
        return [Event(**row) for row in rows]
    
    async def get_events_from(self, aggregate_id: str, from_version: int) -> List[Event]:
        rows = await self.db.fetch_all("""
            SELECT * FROM events 
            WHERE aggregate_id = ? AND version > ?
            ORDER BY version ASC
        """, (aggregate_id, from_version))
        
        return [Event(**row) for row in rows]

class AggregateRoot:
    def __init__(self):
        self._events: List[Event] = []
        self._version = 0
    
    def apply_event(self, event: Event):
        self._apply(event)
        self._version = event.version
        self._events.append(event)
    
    def get_uncommitted_events(self) -> List[Event]:
        return self._events
    
    def mark_events_committed(self):
        self._events.clear()
    
    @abstractmethod
    def _apply(self, event: Event):
        pass

# Order Aggregate Example
class Order(AggregateRoot):
    def __init__(self, order_id: str):
        super().__init__()
        self.order_id = order_id
        self.status = "pending"
        self.items = []
        self.total = 0
    
    def create(self, items: List[dict]):
        event = Event(
            event_id=str(uuid.uuid4()),
            event_type="OrderCreated",
            aggregate_id=self.order_id,
            aggregate_type="Order",
            data={"items": items},
            version=self._version + 1
        )
        self.apply_event(event)
    
    def add_item(self, item: dict):
        if self.status != "pending":
            raise ValueError("Cannot add items to non-pending order")
        
        event = Event(
            event_id=str(uuid.uuid4()),
            event_type="ItemAdded",
            aggregate_id=self.order_id,
            aggregate_type="Order",
            data={"item": item},
            version=self._version + 1
        )
        self.apply_event(event)
    
    def submit(self):
        if self.status != "pending":
            raise ValueError("Order already submitted")
        
        event = Event(
            event_id=str(uuid.uuid4()),
            event_type="OrderSubmitted",
            aggregate_id=self.order_id,
            aggregate_type="Order",
            data={},
            version=self._version + 1
        )
        self.apply_event(event)
    
    def _apply(self, event: Event):
        if event.event_type == "OrderCreated":
            self.items = event.data["items"]
            self.total = sum(item["price"] for item in self.items)
        elif event.event_type == "ItemAdded":
            self.items.append(event.data["item"])
            self.total += event.data["item"]["price"]
        elif event.event_type == "OrderSubmitted":
            self.status = "submitted"
```

### 2. CQRS (Command Query Responsibility Segregation)

```python
from typing import Any, Dict, Type
from dataclasses import dataclass
from abc import ABC, abstractmethod

# Command Side
@dataclass
class Command(ABC):
    pass

@dataclass
class CreateOrderCommand(Command):
    order_id: str
    items: List[dict]

@dataclass
class AddItemCommand(Command):
    order_id: str
    item: dict

class CommandHandler(ABC):
    @abstractmethod
    async def handle(self, command: Command) -> Any:
        pass

class OrderCommandHandler(CommandHandler):
    def __init__(self, event_store: EventStore):
        self.event_store = event_store
    
    async def handle(self, command: Command) -> Any:
        if isinstance(command, CreateOrderCommand):
            return await self._create_order(command)
        elif isinstance(command, AddItemCommand):
            return await self._add_item(command)
    
    async def _create_order(self, command: CreateOrderCommand):
        order = Order(command.order_id)
        order.create(command.items)
        
        for event in order.get_uncommitted_events():
            await self.event_store.append(event)
        
        order.mark_events_committed()
        return order.order_id
    
    async def _add_item(self, command: AddItemCommand):
        events = await self.event_store.get_events(command.order_id)
        order = Order(command.order_id)
        
        for event in events:
            order.apply_event(event)
        
        order.add_item(command.item)
        
        for event in order.get_uncommitted_events():
            await self.event_store.append(event)
        
        order.mark_events_committed()

# Query Side
@dataclass
class Query(ABC):
    pass

@dataclass
class GetOrderQuery(Query):
    order_id: str

@dataclass
class ListOrdersQuery(Query):
    status: str = None
    limit: int = 100

class QueryHandler(ABC):
    @abstractmethod
    async def handle(self, query: Query) -> Any:
        pass

# Read Model
class OrderReadModel:
    def __init__(self, db_connection):
        self.db = db_connection
    
    async def get_order(self, order_id: str) -> Dict:
        return await self.db.fetch_one(
            "SELECT * FROM order_read_model WHERE order_id = ?",
            (order_id,)
        )
    
    async def list_orders(self, status: str = None, limit: int = 100) -> List[Dict]:
        if status:
            return await self.db.fetch_all(
                "SELECT * FROM order_read_model WHERE status = ? LIMIT ?",
                (status, limit)
            )
        return await self.db.fetch_all(
            "SELECT * FROM order_read_model LIMIT ?",
            (limit,)
        )

class OrderQueryHandler(QueryHandler):
    def __init__(self, read_model: OrderReadModel):
        self.read_model = read_model
    
    async def handle(self, query: Query) -> Any:
        if isinstance(query, GetOrderQuery):
            return await self.read_model.get_order(query.order_id)
        elif isinstance(query, ListOrdersQuery):
            return await self.read_model.list_orders(query.status, query.limit)

# Event Handlers for Read Model Projection
class OrderProjection:
    def __init__(self, db_connection):
        self.db = db_connection
    
    async def handle_event(self, event: Event):
        if event.event_type == "OrderCreated":
            await self._on_order_created(event)
        elif event.event_type == "ItemAdded":
            await self._on_item_added(event)
        elif event.event_type == "OrderSubmitted":
            await self._on_order_submitted(event)
    
    async def _on_order_created(self, event: Event):
        await self.db.execute("""
            INSERT INTO order_read_model (order_id, status, items, total)
            VALUES (?, 'pending', ?, ?)
        """, (event.aggregate_id, json.dumps(event.data["items"]), 0))
    
    async def _on_item_added(self, event: Event):
        order = await self.db.fetch_one(
            "SELECT items, total FROM order_read_model WHERE order_id = ?",
            (event.aggregate_id,)
        )
        items = json.loads(order["items"])
        items.append(event.data["item"])
        new_total = order["total"] + event.data["item"]["price"]
        
        await self.db.execute("""
            UPDATE order_read_model SET items = ?, total = ? WHERE order_id = ?
        """, (json.dumps(items), new_total, event.aggregate_id))
    
    async def _on_order_submitted(self, event: Event):
        await self.db.execute("""
            UPDATE order_read_model SET status = 'submitted' WHERE order_id = ?
        """, (event.aggregate_id,))
```

### 3. Event Bus / Message Broker

```python
from typing import Callable, Dict, List
import asyncio
from dataclasses import dataclass
import json

@dataclass
class Subscription:
    topic: str
    handler: Callable
    group_id: str = None

class EventBus:
    def __init__(self):
        self.subscriptions: Dict[str, List[Subscription]] = {}
    
    def subscribe(self, topic: str, handler: Callable, group_id: str = None):
        if topic not in self.subscriptions:
            self.subscriptions[topic] = []
        self.subscriptions[topic].append(Subscription(topic, handler, group_id))
    
    async def publish(self, event: Event):
        topic = event.event_type
        if topic in self.subscriptions:
            tasks = [
                sub.handler(event) 
                for sub in self.subscriptions[topic]
            ]
            await asyncio.gather(*tasks, return_exceptions=True)

# Kafka Integration
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer

class KafkaEventBus:
    def __init__(self, bootstrap_servers: str):
        self.bootstrap_servers = bootstrap_servers
        self.producer = None
    
    async def start(self):
        self.producer = AIOKafkaProducer(
            bootstrap_servers=self.bootstrap_servers
        )
        await self.producer.start()
    
    async def stop(self):
        await self.producer.stop()
    
    async def publish(self, event: Event):
        await self.producer.send_and_wait(
            topic=event.event_type,
            value=json.dumps({
                "event_id": event.event_id,
                "aggregate_id": event.aggregate_id,
                "data": event.data,
                "timestamp": event.timestamp.isoformat()
            }).encode(),
            key=event.aggregate_id.encode()
        )
    
    async def subscribe(
        self, 
        topic: str, 
        handler: Callable,
        group_id: str
    ):
        consumer = AIOKafkaConsumer(
            topic,
            bootstrap_servers=self.bootstrap_servers,
            group_id=group_id,
            auto_offset_reset="earliest"
        )
        await consumer.start()
        
        try:
            async for msg in consumer:
                event_data = json.loads(msg.value)
                event = Event(**event_data)
                await handler(event)
        finally:
            await consumer.stop()
```

### 4. Saga Pattern (Choreography)

```python
class SagaOrchestrator:
    def __init__(self, event_bus: EventBus):
        self.event_bus = event_bus
        self.sagas: Dict[str, List[EventHandler]] = {}
    
    def register_saga(self, saga_name: str, handlers: List[EventHandler]):
        self.sagas[saga_name] = handlers
        for handler in handlers:
            self.event_bus.subscribe(handler.event_type, handler.handle)

# Order Processing Saga
class OrderProcessingSaga:
    def __init__(self, event_bus: EventBus, services: Dict):
        self.event_bus = event_bus
        self.services = services
    
    async def start(self, order_id: str):
        # Start saga by publishing OrderCreated event
        await self.event_bus.publish(Event(
            event_type="OrderCreated",
            aggregate_id=order_id,
            data={"order_id": order_id}
        ))
    
    async def handle_order_created(self, event: Event):
        # Reserve inventory
        result = await self.services["inventory"].reserve(event.data["items"])
        await self.event_bus.publish(Event(
            event_type="InventoryReserved",
            aggregate_id=event.aggregate_id,
            data={"reservation_id": result.id}
        ))
    
    async def handle_inventory_reserved(self, event: Event):
        # Process payment
        result = await self.services["payment"].charge(event.data["payment"])
        await self.event_bus.publish(Event(
            event_type="PaymentProcessed",
            aggregate_id=event.aggregate_id,
            data={"payment_id": result.id}
        ))
    
    async def handle_payment_processed(self, event: Event):
        # Create shipment
        result = await self.services["shipping"].create(event.data["shipping"])
        await self.event_bus.publish(Event(
            event_type="ShipmentCreated",
            aggregate_id=event.aggregate_id,
            data={"shipment_id": result.id}
        ))
    
    async def handle_payment_failed(self, event: Event):
        # Compensate: release inventory
        await self.services["inventory"].release(event.data["reservation_id"])
        await self.event_bus.publish(Event(
            event_type="OrderCancelled",
            aggregate_id=event.aggregate_id,
            data={"reason": "payment_failed"}
        ))
```

## Best Practices

1. **Event Design**: Make events immutable and versioned
2. **Idempotency**: Handle duplicate events gracefully
3. **Event Versioning**: Plan for schema evolution
4. **Monitoring**: Track event flow and latency
5. **Dead Letter Queue**: Handle failed events
6. **Event Replay**: Support event replay for recovery
7. **Testing**: Test eventual consistency scenarios

## Related Skills

- `microservices-patterns` - Microservices patterns
- `message-queue` - Message queue systems
- `architecture-design` - Architecture design
- `data-pipeline` - Data pipelines

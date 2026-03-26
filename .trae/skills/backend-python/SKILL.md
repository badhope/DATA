---
name: "backend-python"
description: "Expert in Python backend development including FastAPI, Django, Flask, and async programming."
category: "backend"
tags: ["python", "fastapi", "django", "flask", "backend"]
---

# Backend Python

Expert in building scalable Python backend applications.

## Description

Master Python backend development with modern frameworks, async programming, and best practices for building production-ready APIs and services.

## When to Use

- Building REST APIs
- Data processing services
- Machine learning backends
- Web applications
- Microservices

## Frameworks

### 1. FastAPI

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(
    title="User API",
    description="User management API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class User(UserBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Dependencies
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> User:
    token = credentials.credentials
    user = verify_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return user

# Routes
@app.get("/users", response_model=List[User])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
):
    return await UserService.get_all(skip, limit)

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await UserService.get_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", response_model=User, status_code=201)
async def create_user(user: UserCreate):
    return await UserService.create(user)

@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: str, user: UserBase):
    return await UserService.update(user_id, user)

@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: str):
    await UserService.delete(user_id)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

### 2. Django

```python
# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

# serializers.py
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'avatar']

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at']

# views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_posts(self, request):
        posts = Post.objects.filter(author=request.user)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

# urls.py
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register('posts', PostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

### 3. Flask

```python
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, validate
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}

# Schemas
class UserSchema(ma.Schema):
    name = fields.Str(required=True, validate=validate.Length(min=2))
    email = fields.Email(required=True)
    
    class Meta:
        fields = ('id', 'name', 'email')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Routes
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users))

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user_schema.dump(user))

@app.route('/users', methods=['POST'])
def create_user():
    data = user_schema.load(request.json)
    user = User(name=data['name'], email=data['email'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user_schema.dump(user)), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = user_schema.load(request.json)
    user.name = data['name']
    user.email = data['email']
    db.session.commit()
    return jsonify(user_schema.dump(user))

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
```

## Async Programming

```python
import asyncio
from typing import List
import aiohttp
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

# Async HTTP Client
async def fetch_multiple(urls: List[str]) -> List[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_one(session, url) for url in urls]
        return await asyncio.gather(*tasks)

async def fetch_one(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as response:
        return await response.json()

# Async Database
engine = create_async_engine("postgresql+asyncpg://user:pass@localhost/db")
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession)

async def get_users_async():
    async with AsyncSessionLocal() as session:
        result = await session.execute("SELECT * FROM users")
        return result.fetchall()

# Background Tasks
from fastapi import BackgroundTasks

async def send_email(email: str, message: str):
    # Send email logic
    pass

@app.post("/notify")
async def notify_user(
    email: str,
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(send_email, email, "Welcome!")
    return {"message": "Notification queued"}
```

## Best Practices

1. **Type Hints**: Use type hints for better code clarity
2. **Virtual Environments**: Use venv or poetry
3. **Environment Variables**: Use python-dotenv
4. **Validation**: Pydantic for data validation
5. **Testing**: pytest for testing
6. **Logging**: Structured logging
7. **Documentation**: Auto-generate with FastAPI
8. **Security**: Use security best practices

## Related Skills

- `api-design` - API design patterns
- `data-pipeline` - Data pipelines
- `rag-implementation` - RAG systems
- `backend-nodejs` - Node.js backend

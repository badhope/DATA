---
name: "backend-nodejs"
description: "Expert in Node.js backend development including Express, Fastify, NestJS, and TypeScript best practices."
category: "backend"
tags: ["nodejs", "express", "nestjs", "typescript", "backend"]
---

# Backend Node.js

Expert in building scalable Node.js backend applications.

## Description

Master Node.js backend development with modern frameworks, TypeScript, and best practices for building production-ready APIs and services.

## When to Use

- Building REST APIs
- Creating microservices
- Real-time applications
- Server-side applications
- API gateways

## Frameworks

### 1. Express.js

```typescript
import express, { Request, Response, NextFunction, Router } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Routes
const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    const users = await UserService.findAll();
    res.json(users);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await UserService.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

userRouter.post('/', async (req: Request, res: Response) => {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
});

app.use('/api/users', userRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 2. Fastify

```typescript
import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyRateLimit from 'fastify-rate-limit';

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true
});

fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '15 minutes'
});

// Schema validation
const userSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        age: { type: 'number', minimum: 0 }
    }
};

// Routes
fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return UserService.findAll();
});

fastify.post('/users', {
    schema: { body: userSchema }
}, async (request: FastifyRequest<{ Body: UserInput }>, reply: FastifyReply) => {
    const user = await UserService.create(request.body);
    reply.code(201).send(user);
});

fastify.listen(3000, (err, address) => {
    if (err) throw err;
    console.log(`Server listening at ${address}`);
});
```

### 3. NestJS

```typescript
// user.controller.ts
import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Get user by id' })
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }
    
    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}

// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
}

// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
```

## Middleware Patterns

```typescript
// Authentication Middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Error Handler
export class AppError extends Error {
    constructor(public statusCode: number, public message: string) {
        super(message);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Validation Middleware
import { z } from 'zod';

export const validate = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error: error.errors });
        }
    };
};

// Usage
const userSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().optional()
});

app.post('/users', validate(userSchema), createUser);
```

## Database Integration

```typescript
// TypeORM
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column({ unique: true })
    email: string;
    
    @CreateDateColumn()
    createdAt: Date;
}

// Prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
    return prisma.user.findMany({
        include: { posts: true }
    });
}

async function createUser(data: { name: string; email: string }) {
    return prisma.user.create({ data });
}
```

## Best Practices

1. **Use TypeScript**: Type safety for better maintainability
2. **Error Handling**: Centralized error handling
3. **Validation**: Input validation with Zod/Joi
4. **Security**: Helmet, CORS, rate limiting
5. **Logging**: Structured logging (Winston, Pino)
6. **Testing**: Jest for unit/integration tests
7. **Documentation**: Swagger/OpenAPI
8. **Environment**: Use dotenv for configuration

## Related Skills

- `api-design` - API design patterns
- `docker-containerization` - Containerization
- `microservices-patterns` - Microservices
- `backend-python` - Python backend

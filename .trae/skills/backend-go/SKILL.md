---
name: "backend-go"
description: "Expert in Go backend development including Gin, Echo, gRPC, and concurrent programming."
category: "backend"
tags: ["go", "golang", "gin", "grpc", "backend"]
---

# Backend Go

Expert in building high-performance Go backend applications.

## Description

Master Go backend development with modern frameworks, concurrent programming, and best practices for building scalable services.

## When to Use

- High-performance APIs
- Microservices
- System tools
- Real-time applications
- Cloud-native services

## Frameworks

### 1. Gin

```go
package main

import (
    "net/http"
    "strconv"
    
    "github.com/gin-gonic/gin"
)

type User struct {
    ID    uint   `json:"id"`
    Name  string `json:"name" binding:"required"`
    Email string `json:"email" binding:"required,email"`
}

var users = make(map[uint]User)
var nextID uint = 1

func main() {
    r := gin.Default()
    
    // Middleware
    r.Use(CORSMiddleware())
    r.Use(AuthMiddleware())
    
    // Routes
    users := r.Group("/api/users")
    {
        users.GET("", getUsers)
        users.GET("/:id", getUser)
        users.POST("", createUser)
        users.PUT("/:id", updateUser)
        users.DELETE("/:id", deleteUser)
    }
    
    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    userList := make([]User, 0, len(users))
    for _, u := range users {
        userList = append(userList, u)
    }
    c.JSON(http.StatusOK, userList)
}

func getUser(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }
    
    user, exists := users[uint(id)]
    if !exists {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }
    
    c.JSON(http.StatusOK, user)
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    user.ID = nextID
    nextID++
    users[user.ID] = user
    
    c.JSON(http.StatusCreated, user)
}

func updateUser(c *gin.Context) {
    id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
    
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    user.ID = uint(id)
    users[user.ID] = user
    
    c.JSON(http.StatusOK, user)
}

func deleteUser(c *gin.Context) {
    id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
    delete(users, uint(id))
    c.Status(http.StatusNoContent)
}

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
        
        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }
        
        c.Next()
    }
}

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "No token provided"})
            return
        }
        
        // Validate token
        c.Next()
    }
}
```

### 2. Echo

```go
package main

import (
    "net/http"
    
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

type User struct {
    ID    uint   `json:"id"`
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
}

func main() {
    e := echo.New()
    
    // Middleware
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())
    e.Use(middleware.CORS())
    
    // Routes
    e.GET("/users", getUsers)
    e.GET("/users/:id", getUser)
    e.POST("/users", createUser)
    e.PUT("/users/:id", updateUser)
    e.DELETE("/users/:id", deleteUser)
    
    e.Logger.Fatal(e.Start(":8080"))
}

func getUsers(c echo.Context) error {
    return c.JSON(http.StatusOK, users)
}

func getUser(c echo.Context) error {
    id := c.Param("id")
    // Get user logic
    return c.JSON(http.StatusOK, user)
}

func createUser(c echo.Context) error {
    user := new(User)
    if err := c.Bind(user); err != nil {
        return err
    }
    // Create user logic
    return c.JSON(http.StatusCreated, user)
}
```

### 3. gRPC

```protobuf
// user.proto
syntax = "proto3";

package user;

service UserService {
    rpc GetUser(GetUserRequest) returns (User);
    rpc CreateUser(CreateUserRequest) returns (User);
    rpc ListUsers(ListUsersRequest) returns (stream User);
}

message User {
    uint32 id = 1;
    string name = 2;
    string email = 3;
}

message GetUserRequest {
    uint32 id = 1;
}

message CreateUserRequest {
    string name = 1;
    string email = 2;
}

message ListUsersRequest {
    int32 limit = 1;
}
```

```go
// server.go
package main

import (
    "context"
    "net"
    
    "google.golang.org/grpc"
    pb "path/to/proto"
)

type server struct {
    pb.UnimplementedUserServiceServer
}

func (s *server) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
    // Get user logic
    return &pb.User{Id: req.Id, Name: "John", Email: "john@example.com"}, nil
}

func (s *server) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.User, error) {
    // Create user logic
    return &pb.User{Id: 1, Name: req.Name, Email: req.Email}, nil
}

func (s *server) ListUsers(req *pb.ListUsersRequest, stream pb.UserService_ListUsersServer) error {
    // Stream users logic
    for i := 0; i < int(req.Limit); i++ {
        stream.Send(&pb.User{Id: uint32(i), Name: "User", Email: "user@example.com"})
    }
    return nil
}

func main() {
    lis, _ := net.Listen("tcp", ":50051")
    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &server{})
    s.Serve(lis)
}
```

## Concurrency Patterns

```go
// Worker Pool
func workerPool(jobs <-chan Job, results chan<- Result, workers int) {
    var wg sync.WaitGroup
    
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                results <- process(job)
            }
        }()
    }
    
    wg.Wait()
    close(results)
}

// Pipeline
func pipeline() {
    nums := make(chan int)
    squares := make(chan int)
    
    go func() {
        for i := 0; i < 10; i++ {
            nums <- i
        }
        close(nums)
    }()
    
    go func() {
        for n := range nums {
            squares <- n * n
        }
        close(squares)
    }()
    
    for s := range squares {
        fmt.Println(s)
    }
}

// Context with Timeout
func fetchWithTimeout(ctx context.Context, url string) (*http.Response, error) {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()
    
    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
    return http.DefaultClient.Do(req)
}
```

## Database Integration

```go
// GORM
import (
    "gorm.io/gorm"
    "gorm.io/driver/postgres"
)

type User struct {
    gorm.Model
    Name  string
    Email string `gorm:"unique"`
}

func main() {
    db, _ := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    db.AutoMigrate(&User{})
    
    // Create
    db.Create(&User{Name: "John", Email: "john@example.com"})
    
    // Read
    var user User
    db.First(&user, 1)
    
    // Update
    db.Model(&user).Update("Name", "Jane")
    
    // Delete
    db.Delete(&user)
}

// SQLx
import (
    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
)

type User struct {
    ID    int    `db:"id"`
    Name  string `db:"name"`
    Email string `db:"email"`
}

func main() {
    db, _ := sqlx.Connect("postgres", dsn)
    
    var users []User
    db.Select(&users, "SELECT * FROM users")
    
    var user User
    db.Get(&user, "SELECT * FROM users WHERE id = $1", 1)
}
```

## Best Practices

1. **Error Handling**: Handle errors explicitly
2. **Context**: Use context for cancellation and timeouts
3. **Concurrency**: Use goroutines and channels wisely
4. **Testing**: Write table-driven tests
5. **Documentation**: Document exported functions
6. **Formatting**: Use gofmt and goimports
7. **Linting**: Use golangci-lint
8. **Dependencies**: Use Go modules

## Related Skills

- `api-design` - API design patterns
- `microservices-patterns` - Microservices
- `kubernetes-orchestration` - Kubernetes
- `backend-nodejs` - Node.js backend

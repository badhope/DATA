---
name: "auth-implementation"
description: "Expert in authentication implementation including OAuth2, JWT, SSO, MFA, and session management."
category: "security"
tags: ["auth", "oauth2", "jwt", "sso", "security"]
---

# Auth Implementation

Expert in implementing secure authentication systems with modern protocols.

## Description

Implement robust authentication systems using OAuth2, JWT, SSO, and multi-factor authentication. Covers security best practices, session management, and common authentication patterns.

## When to Use

- Implementing user authentication
- Building SSO systems
- Adding MFA to applications
- Securing API endpoints
- Implementing social login

## Authentication Methods

### 1. JWT Authentication

```python
from datetime import datetime, timedelta
from typing import Optional
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

class JWTAuth:
    def __init__(
        self,
        secret_key: str,
        algorithm: str = "HS256",
        access_token_expire_minutes: int = 30,
        refresh_token_expire_days: int = 7
    ):
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.access_token_expire = timedelta(minutes=access_token_expire_minutes)
        self.refresh_token_expire = timedelta(days=refresh_token_expire_days)
    
    def create_access_token(self, user_id: str, roles: list = None) -> str:
        payload = {
            "sub": user_id,
            "type": "access",
            "roles": roles or [],
            "exp": datetime.utcnow() + self.access_token_expire,
            "iat": datetime.utcnow()
        }
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
    
    def create_refresh_token(self, user_id: str) -> str:
        payload = {
            "sub": user_id,
            "type": "refresh",
            "exp": datetime.utcnow() + self.refresh_token_expire,
            "iat": datetime.utcnow()
        }
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
    
    def verify_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
    
    def refresh_access_token(self, refresh_token: str) -> str:
        payload = self.verify_token(refresh_token)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        return self.create_access_token(payload["sub"])

# FastAPI integration
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> dict:
    auth = JWTAuth(secret_key="your-secret-key")
    return auth.verify_token(credentials.credentials)
```

### 2. OAuth2 Implementation

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import RedirectResponse
import httpx

class OAuth2Client:
    def __init__(
        self,
        client_id: str,
        client_secret: str,
        authorization_url: str,
        token_url: str,
        redirect_uri: str,
        scope: str = "openid profile email"
    ):
        self.client_id = client_id
        self.client_secret = client_secret
        self.authorization_url = authorization_url
        self.token_url = token_url
        self.redirect_uri = redirect_uri
        self.scope = scope
    
    def get_authorization_url(self, state: str) -> str:
        params = {
            "client_id": self.client_id,
            "redirect_uri": self.redirect_uri,
            "response_type": "code",
            "scope": self.scope,
            "state": state
        }
        query = "&".join(f"{k}={v}" for k, v in params.items())
        return f"{self.authorization_url}?{query}"
    
    async def exchange_code_for_token(self, code: str) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.token_url,
                data={
                    "grant_type": "authorization_code",
                    "code": code,
                    "redirect_uri": self.redirect_uri,
                    "client_id": self.client_id,
                    "client_secret": self.client_secret
                }
            )
            response.raise_for_status()
            return response.json()
    
    async def get_user_info(self, access_token: str, user_info_url: str) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                user_info_url,
                headers={"Authorization": f"Bearer {access_token}"}
            )
            response.raise_for_status()
            return response.json()

# FastAPI OAuth2 routes
app = FastAPI()
oauth = OAuth2Client(
    client_id="your-client-id",
    client_secret="your-client-secret",
    authorization_url="https://provider.com/oauth/authorize",
    token_url="https://provider.com/oauth/token",
    redirect_uri="http://localhost:8000/callback"
)

@app.get("/login")
async def login():
    state = generate_random_state()
    auth_url = oauth.get_authorization_url(state)
    return RedirectResponse(auth_url)

@app.get("/callback")
async def callback(code: str, state: str):
    tokens = await oauth.exchange_code_for_token(code)
    return tokens
```

### 3. Multi-Factor Authentication (MFA)

```python
import pyotp
import qrcode
from io import BytesIO
import base64

class MFAService:
    def __init__(self, issuer: str = "MyApp"):
        self.issuer = issuer
    
    def generate_secret(self) -> str:
        return pyotp.random_base32()
    
    def get_totp_uri(self, email: str, secret: str) -> str:
        return pyotp.totp.TOTP(secret).provisioning_uri(
            name=email,
            issuer_name=self.issuer
        )
    
    def generate_qr_code(self, email: str, secret: str) -> str:
        uri = self.get_totp_uri(email, secret)
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)
        
        return base64.b64encode(buffer.getvalue()).decode()
    
    def verify_code(self, secret: str, code: str) -> bool:
        totp = pyotp.totp.TOTP(secret)
        return totp.verify(code, valid_window=1)
    
    def generate_backup_codes(self, count: int = 10) -> list:
        import secrets
        return [secrets.token_hex(4).upper() for _ in range(count)]

# Usage in authentication flow
class AuthWithMFA:
    def __init__(self, mfa_service: MFAService):
        self.mfa = mfa_service
    
    async def login(self, email: str, password: str, mfa_code: str = None):
        # Verify password
        user = await self.verify_password(email, password)
        
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Check if MFA is enabled
        if user.mfa_enabled:
            if not mfa_code:
                return {"requires_mfa": True}
            
            if not self.mfa.verify_code(user.mfa_secret, mfa_code):
                raise HTTPException(status_code=401, detail="Invalid MFA code")
        
        return self.create_session(user)
```

### 4. Session Management

```python
from datetime import datetime, timedelta
from typing import Optional
import redis
import json

class SessionManager:
    def __init__(
        self,
        redis_client: redis.Redis,
        session_expire_seconds: int = 3600
    ):
        self.redis = redis_client
        self.expire = session_expire_seconds
    
    def create_session(self, user_id: str, data: dict = None) -> str:
        import secrets
        session_id = secrets.token_urlsafe(32)
        
        session_data = {
            "user_id": user_id,
            "created_at": datetime.utcnow().isoformat(),
            "data": data or {}
        }
        
        self.redis.setex(
            f"session:{session_id}",
            self.expire,
            json.dumps(session_data)
        )
        
        return session_id
    
    def get_session(self, session_id: str) -> Optional[dict]:
        data = self.redis.get(f"session:{session_id}")
        if data:
            return json.loads(data)
        return None
    
    def update_session(self, session_id: str, data: dict) -> bool:
        session = self.get_session(session_id)
        if session:
            session["data"].update(data)
            self.redis.setex(
                f"session:{session_id}",
                self.expire,
                json.dumps(session)
            )
            return True
        return False
    
    def delete_session(self, session_id: str) -> bool:
        return bool(self.redis.delete(f"session:{session_id}"))
    
    def get_user_sessions(self, user_id: str) -> list:
        sessions = []
        for key in self.redis.scan_iter(f"session:*"):
            session = json.loads(self.redis.get(key))
            if session.get("user_id") == user_id:
                sessions.append({
                    "session_id": key.decode().split(":")[1],
                    "created_at": session["created_at"]
                })
        return sessions
```

### 5. SSO (Single Sign-On)

```python
class SSOProvider:
    def __init__(self, providers: dict):
        self.providers = providers
    
    def get_provider(self, name: str) -> OAuth2Client:
        config = self.providers.get(name)
        if not config:
            raise ValueError(f"Unknown provider: {name}")
        return OAuth2Client(**config)

class SSOManager:
    def __init__(self, sso_provider: SSOProvider, jwt_auth: JWTAuth):
        self.sso = sso_provider
        self.jwt = jwt_auth
    
    async def initiate_sso(self, provider: str, state: str) -> str:
        oauth_client = self.sso.get_provider(provider)
        return oauth_client.get_authorization_url(state)
    
    async def complete_sso(
        self,
        provider: str,
        code: str,
        user_info_url: str
    ) -> dict:
        oauth_client = self.sso.get_provider(provider)
        
        # Exchange code for tokens
        tokens = await oauth_client.exchange_code_for_token(code)
        
        # Get user info
        user_info = await oauth_client.get_user_info(
            tokens["access_token"],
            user_info_url
        )
        
        # Find or create user
        user = await self.find_or_create_user(provider, user_info)
        
        # Generate JWT tokens
        access_token = self.jwt.create_access_token(
            user.id,
            roles=user.roles
        )
        refresh_token = self.jwt.create_refresh_token(user.id)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": user.to_dict()
        }
```

## Security Best Practices

### Password Hashing

```python
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```

### Rate Limiting

```python
from fastapi import FastAPI, Request
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter

@app.on_event("startup")
async def startup():
    redis = redis.Redis(host='localhost', port=6379)
    await FastAPILimiter.init(redis)

@app.post("/login", dependencies=[Depends(RateLimiter(times=5, seconds=60))])
async def login(credentials: LoginCredentials):
    # Login logic
    pass
```

### CSRF Protection

```python
from fastapi_csrf_protect import CsrfProtect

@CsrfProtect.load_config
def get_csrf_config():
    return CsrfSettings(secret_key="csrf-secret-key")

@app.get("/csrf-token")
async def get_csrf_token(csrf_protect: CsrfProtect = Depends()):
    csrf_token = csrf_protect.generate_csrf()
    return {"csrf_token": csrf_token}
```

## Best Practices

1. **Use HTTPS**: Always encrypt in transit
2. **Secure Storage**: Hash passwords, encrypt tokens
3. **Token Expiration**: Short-lived access tokens
4. **Refresh Tokens**: Secure refresh token storage
5. **MFA**: Encourage/require for sensitive operations
6. **Rate Limiting**: Prevent brute force attacks
7. **Audit Logging**: Log all auth events
8. **Session Management**: Proper session invalidation

## Related Skills

- `security-auditor` - Security auditing
- `secret-management` - Secret management
- `api-design` - API security
- `mcp-security-best-practices` - MCP security

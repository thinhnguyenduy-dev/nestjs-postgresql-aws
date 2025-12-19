# Authentication System - Quick Start Guide

## Overview
Your application now has a complete JWT-based authentication system with support for:
- ✅ Email/Password Registration & Login
- ✅ Google OAuth
- ✅ Facebook OAuth  
- ✅ Microsoft OAuth
- ✅ Password Hashing (bcrypt)
- ✅ JWT Tokens (1-hour expiration)

## Environment Setup

### Required Variables
Add these to your `.env` file (copy from `.env.example`):

```bash
# JWT Configuration (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1h

# OAuth Providers (OPTIONAL - only if using social login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
```

## API Endpoints

### 1. Register (Email/Password)
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 2. Login (Email/Password)
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 3. Get Profile (Protected)
```bash
GET /auth/profile
Authorization: Bearer <your-jwt-token>
```

### 4. Social Login (OAuth)

#### Google
Navigate to: `http://localhost:3000/auth/google`

#### Facebook
Navigate to: `http://localhost:3000/auth/facebook`

#### Microsoft
Navigate to: `http://localhost:3000/auth/microsoft`

> **Note:** OAuth redirects to `http://localhost:3000?token=<jwt>` after successful authentication

## Using Protected Routes

To protect any route, add the `@UseGuards(JwtAuthGuard)` decorator:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CurrentUser } from './auth/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Get('protected')
getProtectedData(@CurrentUser() user) {
  return { message: 'This is protected', user };
}
```

## Testing Locally

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Register a user:**
   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","name":"Test User","password":"password123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **Access protected route:**
   ```bash
   curl http://localhost:3000/auth/profile \
     -H "Authorization: Bearer <token-from-login>"
   ```

## Next Steps

### To Enable OAuth Providers:

1. **Google**: [Create OAuth credentials](https://console.cloud.google.com/apis/credentials)
2. **Facebook**: [Create Facebook App](https://developers.facebook.com/apps/)
3. **Microsoft**: [Register Azure App](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)

### Production Deployment:

1. Update `.env` with production OAuth callback URLs
2. Add all secrets to GitHub Actions (see `DEPLOY.md`)
3. Ensure `JWT_SECRET` is a strong random string in production

## Security Notes

- ✅ Passwords are hashed with bcrypt (10 rounds)
- ✅ Password field is excluded from all API responses
- ✅ JWT tokens expire after 1 hour
- ✅ OAuth users can link multiple providers to one email
- ⚠️ Change `JWT_SECRET` in production!
- ⚠️ Use HTTPS in production for OAuth callbacks

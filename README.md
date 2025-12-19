# Shopping Store - Full Stack Application

A modern e-commerce platform built with NestJS backend and Next.js frontend, featuring JWT authentication, OAuth social login, and PostgreSQL database.

## 🏗️ Project Structure (Monorepo)

```
├── frontend/          # Next.js 15 frontend application
│   ├── app/          # Next.js App Router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities, API client, stores
│   └── public/       # Static assets
│
├── src/              # NestJS backend application
│   ├── auth/        # Authentication module (JWT + OAuth)
│   ├── users/       # Users module
│   ├── products/    # Products module
│   ├── orders/      # Orders module
│   └── seed/        # Database seeding
│
├── .github/         # GitHub Actions workflows
├── DEPLOY.md        # AWS deployment guide
├── AUTH_GUIDE.md    # Authentication API guide
└── OAUTH_SETUP.md   # OAuth providers setup guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- PostgreSQL 15+
- npm or yarn

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd nestjs-postgresql-aws

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Setup

**Backend (.env)**
```bash
# Database
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=shopping_store

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

**Frontend (frontend/.env.local)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Start Database

```bash
docker compose up -d postgres
```

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
npm run start:dev
# Runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3001
```

### 5. Seed Database (Optional)

```bash
npm run seed
```

## 📚 Tech Stack

### Backend
- **Framework**: NestJS 11
- **Database**: PostgreSQL 15 + TypeORM
- **Authentication**: Passport.js + JWT
- **OAuth**: Google, Facebook, Microsoft
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt, CORS

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

## 🔐 Authentication

The application supports multiple authentication methods:

1. **Email/Password** - Traditional registration and login
2. **Google OAuth** - Sign in with Google
3. **Facebook OAuth** - Sign in with Facebook
4. **Microsoft OAuth** - Sign in with Microsoft

See [AUTH_GUIDE.md](./AUTH_GUIDE.md) for API documentation.
See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for OAuth configuration.

## 📦 Available Scripts

### Backend
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
npm run seed         # Seed database with sample data
npm run seed:prod    # Seed production database
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login with email/password
- `GET /auth/profile` - Get current user (protected)
- `GET /auth/google` - Google OAuth login
- `GET /auth/facebook` - Facebook OAuth login
- `GET /auth/microsoft` - Microsoft OAuth login

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PATCH /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

## 🚢 Deployment

### Backend (AWS EC2 + RDS)
Automated deployment via GitHub Actions. See [DEPLOY.md](./DEPLOY.md) for details.

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-api-domain.com`
4. Deploy!

## 📝 Documentation

- [Deployment Guide](./DEPLOY.md) - AWS EC2 + RDS setup
- [Authentication Guide](./AUTH_GUIDE.md) - API usage examples
- [OAuth Setup](./OAUTH_SETUP.md) - Social login configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- NestJS Team
- Next.js Team
- shadcn/ui

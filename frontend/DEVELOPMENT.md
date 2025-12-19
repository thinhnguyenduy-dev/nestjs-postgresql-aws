# Frontend Development Guide

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3001`

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (shop)/            # Shop pages (products, cart, orders)
│   ├── api/               # API routes (optional BFF)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components/
│   ├── ui/                # shadcn/ui components
│   └── features/          # Feature-specific components
│
├── lib/
│   ├── api-client.ts      # Axios instance with interceptors
│   ├── auth-api.ts        # Authentication API calls
│   ├── auth-store.ts      # Zustand auth state
│   └── utils.ts           # Utility functions
│
└── types/                 # TypeScript type definitions
```

## API Client Usage

```typescript
import apiClient from '@/lib/api-client';

// GET request
const products = await apiClient.get('/products');

// POST request
const newProduct = await apiClient.post('/products', {
  name: 'Product Name',
  price: 99.99
});
```

## Authentication

### Using the Auth Store

```typescript
import { useAuthStore } from '@/lib/auth-store';

function MyComponent() {
  const { user, isAuthenticated, setAuth, logout } = useAuthStore();

  // Login
  const handleLogin = async (email, password) => {
    const { access_token, user } = await authApi.login({ email, password });
    setAuth(user, access_token);
  };

  // Logout
  const handleLogout = () => {
    logout();
  };

  return <div>{user?.name}</div>;
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add input
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Building for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory: `frontend`
4. Add environment variables
5. Deploy!

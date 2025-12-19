# Frontend Deployment Guide - Vercel

This guide walks you through deploying the Next.js frontend to Vercel with automatic deployments via GitHub.

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select your GitHub repository: `nestjs-postgresql-aws`
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   Click **"Environment Variables"** and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.com
   NEXT_PUBLIC_APP_URL=https://your-frontend-domain.vercel.app
   ```
   
   > **Note**: Replace with your actual backend EC2 domain/IP

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

---

## 🔧 Option 2: Deploy via GitHub Actions (Advanced)

### Step 1: Get Vercel Tokens

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it: `GitHub Actions`
4. Copy the token (you won't see it again!)

### Step 2: Get Project Details

Install Vercel CLI locally:
```bash
npm i -g vercel
cd frontend
vercel login
vercel link
```

This creates `.vercel/project.json` with your:
- **Project ID**
- **Org ID**

### Step 3: Add GitHub Secrets

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:
```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<from-.vercel/project.json>
VERCEL_PROJECT_ID=<from-.vercel/project.json>
```

### Step 4: Create Workflow File

Create `.github/workflows/frontend-deploy.yml`:

```yaml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: ./frontend
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: ./frontend
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: ./frontend
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Step 5: Push and Deploy

```bash
git add .github/workflows/frontend-deploy.yml
git commit -m "ci: Add Vercel deployment workflow"
git push origin main
```

---

## 🌍 Environment Variables

### Development (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### Production (Vercel Dashboard)
```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://app.yourdomain.com
```

> **Important**: Update these in Vercel Dashboard → Project Settings → Environment Variables

---

## 🔄 Automatic Deployments

Once set up, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

You can view deployments at:
- Vercel Dashboard → Your Project → Deployments
- GitHub → Actions tab

---

## 🎯 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain: `app.yourdomain.com`
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

---

## 🐛 Troubleshooting

### Build Fails with "Module not found"
- Ensure `package.json` is in `frontend/` directory
- Check that root directory is set to `frontend` in Vercel

### CORS Errors
- Update backend CORS to allow your Vercel domain
- In `backend/src/main.ts`, add your Vercel URL to `origin` array

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_`
- Redeploy after adding/changing environment variables
- Check Vercel Dashboard → Deployments → Latest → Environment Variables

### 404 on Routes
- Next.js App Router handles this automatically
- Ensure pages are in `frontend/app/` directory

---

## 📊 Monitoring

Vercel provides built-in:
- **Analytics**: Real-time visitor data
- **Speed Insights**: Performance metrics
- **Logs**: Runtime and build logs

Access via: Vercel Dashboard → Your Project → Analytics/Logs

---

## 🔐 Security Best Practices

✅ Never commit `.env.local` to git
✅ Use environment variables for all API URLs
✅ Enable Vercel's **Password Protection** for staging
✅ Set up **Deployment Protection** for production
✅ Review **Security Headers** in `next.config.ts`

---

## 📚 Additional Resources

- [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/projects/domains)
- [GitHub Integration](https://vercel.com/docs/deployments/git/vercel-for-github)

---

## 🆘 Need Help?

- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)
- GitHub Issues: Create an issue in your repository

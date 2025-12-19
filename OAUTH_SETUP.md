# OAuth Social Login Setup Guide

This guide walks you through setting up OAuth credentials for each social login provider.

---

## 1. Google OAuth Setup

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter project name (e.g., "Shopping Store")
4. Click **"Create"**

### Step 2: Enable Google+ API
1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and press **"Enable"**

### Step 3: Create OAuth Credentials
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure the **OAuth consent screen**:
   - User Type: **External**
   - App name: `Shopping Store`
   - User support email: Your email
   - Developer contact: Your email
   - Click **"Save and Continue"** through all steps
4. Back to **"Create OAuth client ID"**:
   - Application type: **Web application**
   - Name: `Shopping Store Web Client`
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for local dev)
     - `https://your-domain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/google/callback` (local)
     - `https://your-domain.com/auth/google/callback` (production)
5. Click **"Create"**
6. Copy the **Client ID** and **Client Secret**

### Step 4: Add to .env
```bash
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

## 2. Facebook OAuth Setup

### Step 1: Create a Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Consumer"** as app type
4. Fill in:
   - App name: `Shopping Store`
   - App contact email: Your email
5. Click **"Create App"**

### Step 2: Add Facebook Login Product
1. In the app dashboard, find **"Facebook Login"**
2. Click **"Set Up"**
3. Choose **"Web"** platform
4. Enter site URL: `http://localhost:3000`
5. Click **"Save"** and **"Continue"**

### Step 3: Configure OAuth Settings
1. In left sidebar, go to **"Facebook Login"** → **"Settings"**
2. Under **"Valid OAuth Redirect URIs"**, add:
   - `http://localhost:3000/auth/facebook/callback` (local)
   - `https://your-domain.com/auth/facebook/callback` (production)
3. Click **"Save Changes"**

### Step 4: Get App Credentials
1. Go to **"Settings"** → **"Basic"**
2. Copy **"App ID"** and **"App Secret"** (click "Show" to reveal)

### Step 5: Make App Live (for production)
1. Toggle the switch at the top from **"In Development"** to **"Live"**
2. Complete any required verification steps

### Step 6: Add to .env
```bash
FACEBOOK_APP_ID=your-app-id-here
FACEBOOK_APP_SECRET=your-app-secret-here
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
```

---

## 3. Microsoft OAuth Setup

### Step 1: Register Application in Azure
1. Go to [Azure Portal](https://portal.azure.com/)
2. Search for **"Azure Active Directory"** or **"Microsoft Entra ID"**
3. Click **"App registrations"** → **"New registration"**
4. Fill in:
   - Name: `Shopping Store`
   - Supported account types: **"Accounts in any organizational directory and personal Microsoft accounts"**
   - Redirect URI: 
     - Platform: **Web**
     - URI: `http://localhost:3000/auth/microsoft/callback`
5. Click **"Register"**

### Step 2: Add Additional Redirect URIs (for production)
1. In your app, go to **"Authentication"**
2. Under **"Web"** → **"Redirect URIs"**, click **"Add URI"**
3. Add: `https://your-domain.com/auth/microsoft/callback`
4. Click **"Save"**

### Step 3: Create Client Secret
1. Go to **"Certificates & secrets"**
2. Click **"New client secret"**
3. Description: `Shopping Store Secret`
4. Expires: Choose duration (e.g., 24 months)
5. Click **"Add"**
6. **IMPORTANT**: Copy the **Value** immediately (you won't see it again!)

### Step 4: Get Application ID
1. Go to **"Overview"**
2. Copy the **"Application (client) ID"**

### Step 5: Add to .env
```bash
MICROSOFT_CLIENT_ID=your-application-client-id-here
MICROSOFT_CLIENT_SECRET=your-client-secret-value-here
MICROSOFT_CALLBACK_URL=http://localhost:3000/auth/microsoft/callback
```

---

## 4. Apple Sign In Setup (Optional - Requires Paid Apple Developer Account)

### Prerequisites
- Apple Developer Program membership ($99/year)
- Access to Apple Developer Portal

### Step 1: Create App ID
1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **"Certificates, Identifiers & Profiles"**
3. Click **"Identifiers"** → **"+"** (Add button)
4. Select **"App IDs"** → **"Continue"**
5. Select **"App"** → **"Continue"**
6. Fill in:
   - Description: `Shopping Store`
   - Bundle ID: `com.yourcompany.shoppingstore`
7. Under **"Capabilities"**, enable **"Sign in with Apple"**
8. Click **"Continue"** → **"Register"**

### Step 2: Create Services ID
1. Go to **"Identifiers"** → **"+"**
2. Select **"Services IDs"** → **"Continue"**
3. Fill in:
   - Description: `Shopping Store Web`
   - Identifier: `com.yourcompany.shoppingstore.web`
4. Check **"Sign in with Apple"**
5. Click **"Configure"** next to "Sign in with Apple"
6. Select your App ID as the **Primary App ID**
7. Under **"Website URLs"**, add:
   - Domains: `localhost:3000`, `your-domain.com`
   - Return URLs: 
     - `http://localhost:3000/auth/apple/callback`
     - `https://your-domain.com/auth/apple/callback`
8. Click **"Save"** → **"Continue"** → **"Register"**

### Step 3: Create Private Key
1. Go to **"Keys"** → **"+"**
2. Key Name: `Shopping Store Sign In Key`
3. Check **"Sign in with Apple"**
4. Click **"Configure"** → Select your App ID
5. Click **"Save"** → **"Continue"** → **"Register"**
6. **Download the .p8 file** (you can only download once!)
7. Note the **Key ID** shown

### Step 4: Get Team ID
1. Go to **"Membership"** in the sidebar
2. Copy your **Team ID**

### Step 5: Add to .env
```bash
APPLE_CLIENT_ID=com.yourcompany.shoppingstore.web
APPLE_TEAM_ID=your-team-id-here
APPLE_KEY_ID=your-key-id-here
APPLE_PRIVATE_KEY_PATH=/path/to/AuthKey_KEYID.p8
APPLE_CALLBACK_URL=http://localhost:3000/auth/apple/callback
```

---

## Production Deployment

### Update GitHub Secrets
For production deployment, add these secrets to your GitHub repository:

1. Go to **GitHub Repository** → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"** for each:

```
JWT_SECRET=<strong-random-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback
FACEBOOK_APP_ID=<your-facebook-app-id>
FACEBOOK_APP_SECRET=<your-facebook-app-secret>
FACEBOOK_CALLBACK_URL=https://your-domain.com/auth/facebook/callback
MICROSOFT_CLIENT_ID=<your-microsoft-client-id>
MICROSOFT_CLIENT_SECRET=<your-microsoft-client-secret>
MICROSOFT_CALLBACK_URL=https://your-domain.com/auth/microsoft/callback
```

### Update Callback URLs
Remember to update all OAuth provider settings with your production domain:
- Change `http://localhost:3000` → `https://your-domain.com`
- Use HTTPS for all production callbacks

---

## Testing OAuth Login

### Local Testing
1. Start your server: `npm run start:dev`
2. Open browser and navigate to:
   - Google: `http://localhost:3000/auth/google`
   - Facebook: `http://localhost:3000/auth/facebook`
   - Microsoft: `http://localhost:3000/auth/microsoft`
3. Complete the OAuth flow
4. You'll be redirected to `http://localhost:3000?token=<jwt-token>`
5. Copy the token from the URL and use it in API requests

### Testing with cURL
```bash
# Use the token from OAuth redirect
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer <token-from-oauth>"
```

---

## Troubleshooting

### Common Issues

**"Redirect URI mismatch"**
- Ensure callback URLs in provider settings exactly match your `.env` configuration
- Check for trailing slashes (should not have them)
- Verify HTTP vs HTTPS

**"App not verified" warning (Google)**
- Normal for development
- For production, submit app for verification in Google Cloud Console

**"This app is in development mode" (Facebook)**
- Add test users in Facebook App Dashboard → Roles → Test Users
- Or make app "Live" for public access

**Microsoft login not working**
- Ensure "Accounts in any organizational directory and personal Microsoft accounts" is selected
- Check that redirect URI is added under "Web" platform

---

## Security Best Practices

✅ **Never commit** OAuth secrets to git
✅ Use **environment variables** for all credentials
✅ Use **HTTPS** in production for all callbacks
✅ Regularly **rotate** client secrets
✅ Enable **2FA** on all provider accounts
✅ Review **OAuth scopes** - only request what you need
✅ Monitor **API usage** in provider dashboards

---

## Need Help?

- **Google**: [OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- **Facebook**: [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- **Microsoft**: [Microsoft Identity Platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- **Apple**: [Sign in with Apple](https://developer.apple.com/sign-in-with-apple/)

# Deployment Guide

## Deploy to Vercel

### Method 1: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository: `vimalsri1832/Spinabot_EmailClassifier_AI`
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **"Deploy"**

### Environment Variables (if needed)

Add in Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=your_api_url
```

---

## Deploy to Netlify

### Method 1: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

### Method 2: Via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select: `vimalsri1832/Spinabot_EmailClassifier_AI`
4. Configure build settings:
   - **Base directory:** (leave empty)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**

### Environment Variables (if needed)

Add in Netlify Dashboard → Site settings → Environment variables:
```
VITE_API_URL=your_api_url
```

---

## Deploy to Cloudflare Pages

### Via Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → **Create application** → **Pages**
3. Connect to GitHub and select your repository
4. Configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 20
5. Click **"Save and Deploy"**

### Via Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
npm run build
wrangler pages deploy dist --project-name=spinabot-email-classifier
```

---

## Troubleshooting

### Common Issues

#### 1. "Build failed" or "Command not found"

**Solution:** Ensure Node.js version is 18 or 20
- Vercel: Add `NODE_VERSION=20` in environment variables
- Netlify: Already specified in `netlify.toml`

#### 2. "Module not found" errors

**Solution:** Clear cache and rebuild
```bash
# Locally
rm -rf node_modules package-lock.json
npm install
npm run build

# Vercel: Redeploy with "Clear cache and retry"
# Netlify: Site settings → Build & deploy → Clear cache and deploy site
```

#### 3. "404 Not Found" on routes

**Solution:** Already configured in `vercel.json` and `netlify.toml`
- Ensures SPA routing works correctly
- All routes redirect to index.html

#### 4. Build timeout

**Solution:** Increase timeout limits
- Vercel: Pro plan has longer build times
- Netlify: Free tier allows 15 min builds

#### 5. Cloudflare plugin conflicts

If deploying to Vercel/Netlify and getting Cloudflare plugin errors:

**Option A:** Comment out Cloudflare plugin in `vite.config.ts`:
```typescript
// import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [...mochaPlugins(process.env as any), react()], // removed cloudflare()
  // ... rest of config
});
```

**Option B:** Use environment-specific config:
```typescript
const plugins = [...mochaPlugins(process.env as any), react()];
if (process.env.CLOUDFLARE === 'true') {
  plugins.push(cloudflare());
}
```

---

## Post-Deployment

### Verify Deployment

1. **Check build logs** - Look for any errors or warnings
2. **Test the site** - Visit the deployed URL
3. **Test routes** - Navigate to different pages
4. **Check console** - Open browser DevTools for errors
5. **Test features** - Email filters, search, chatbot, etc.

### Custom Domain Setup

#### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS (Vercel provides instructions)

#### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records

#### Cloudflare Pages
1. Navigate to your Pages project
2. Go to Custom domains
3. Add your domain (DNS managed by Cloudflare)

---

## Automatic Deployments

All three platforms support automatic deployments:

- **Push to main branch** → Automatic production deployment
- **Push to other branches** → Preview deployment
- **Pull Requests** → Preview deployment with unique URL

### Configure in Platform

**Vercel:**
- Settings → Git → Production Branch: `main`

**Netlify:**
- Site settings → Build & deploy → Deploy contexts
- Production branch: `main`

**Cloudflare:**
- Automatically deploys on push to configured branch

---

## Performance Tips

1. **Enable compression** - Already configured in Netlify headers
2. **Cache static assets** - Configured for `/assets/*`
3. **Use environment variables** - For API URLs and secrets
4. **Monitor builds** - Check build time and optimize if needed
5. **Use preview deployments** - Test before production

---

## Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Cloudflare
npm run build && wrangler pages deploy dist
```

---

## Support & Documentation

- **Vercel:** https://vercel.com/docs
- **Netlify:** https://docs.netlify.com
- **Cloudflare:** https://developers.cloudflare.com/pages

## Need Help?

Check the deployment logs in your platform dashboard for detailed error messages.

# Vercel Deployment Guide for Gensyn AI Assistant

## Quick Start

This guide will help you deploy the Gensyn AI Assistant to Vercel in just a few minutes.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **API Keys**: You'll need the following:
   - GROQ_API_KEY (free at [console.groq.com/keys](https://console.groq.com/keys))
   - DATABASE_URL (free PostgreSQL database)
   - SESSION_SECRET (any random string)

## Step 1: Get Your API Keys

### GROQ API Key (Required)
1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up for a free account
3. Create a new API key
4. Copy the key (starts with `gsk_...`)

### Database URL (Required)
You have several free options:

**Option A: Neon (Recommended)**
1. Visit [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string (starts with `postgresql://`)

**Option B: Vercel Postgres**
1. After importing your project to Vercel
2. Go to Storage → Create Database → Postgres
3. Copy the DATABASE_URL from environment variables

### Session Secret (Required)
Generate a random string:
```bash
# On Mac/Linux
openssl rand -base64 32

# Or just use any random string like:
my-super-secret-session-key-12345
```

## Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)

2. **Import Your Repository**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

3. **Add Environment Variables**
   - Before clicking "Deploy", expand "Environment Variables"
   - Add these three variables:
     ```
     GROQ_API_KEY = gsk_your_key_here
     DATABASE_URL = postgresql://user:pass@host/db
     SESSION_SECRET = your-random-secret
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - You'll get a live URL like `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# When prompted, link to existing project or create new one
# After deployment, add environment variables:
vercel env add GROQ_API_KEY
vercel env add DATABASE_URL
vercel env add SESSION_SECRET

# Redeploy with environment variables
vercel --prod
```

## Step 3: Initialize Database

After deployment, you need to set up the database schema:

```bash
# Using your DATABASE_URL from Vercel
DATABASE_URL="your-database-url-here" npm run db:push
```

Or you can run this from the Vercel dashboard:
1. Go to your project → Settings → Functions
2. Find the API function
3. Trigger a deployment that runs the migrations

## Step 4: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. You should see the Gensyn AI Assistant interface
3. Click the chat widget in the bottom-right corner
4. Try sending a message like "What is Gensyn?"
5. You should get an AI response

## Troubleshooting

### Error: "Missing required environment variables"
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Make sure all three variables are set: GROQ_API_KEY, DATABASE_URL, SESSION_SECRET
- Redeploy after adding variables

### Error: "Failed to process chat message"
- Check that your GROQ_API_KEY is valid
- Visit [console.groq.com/keys](https://console.groq.com/keys) to verify

### Error: "Database connection error"
- Verify your DATABASE_URL is correct
- Make sure you ran `npm run db:push` to initialize the schema
- Check that the database allows connections (most free tiers do)

### Build fails
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in package.json
- Verify node version compatibility (should use Node 20)

### Chat widget doesn't appear
- Check browser console for errors (F12)
- Verify the deployment completed successfully
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

## Configuration Details

### Files Modified for Vercel

1. **vercel.json** - Vercel configuration
   - Defines build command and output directory
   - Routes API requests to serverless function
   - Serves static files from dist/public

2. **api/index.ts** - Serverless API handler
   - Handles all API routes (/api/chat, /api/updates, etc.)
   - Vercel-compatible request/response handling

3. **package.json** - Build scripts
   - Added `build:vercel` script for frontend build

### How It Works

- **Frontend**: Vite builds static files → `dist/public/`
- **Backend**: Serverless function in `api/index.ts`
- **Database**: PostgreSQL (Neon/Vercel Postgres)
- **API**: Groq (Llama 3.3 70B) for AI responses

### Environment Variables Summary

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| GROQ_API_KEY | Yes | AI chat API key | [console.groq.com/keys](https://console.groq.com/keys) |
| DATABASE_URL | Yes | PostgreSQL connection | [neon.tech](https://neon.tech) or Vercel Postgres |
| SESSION_SECRET | Yes | Session encryption | `openssl rand -base64 32` |

## Custom Domain (Optional)

1. Go to your Vercel project → Settings → Domains
2. Add your custom domain (e.g., `gensyn-assistant.com`)
3. Follow Vercel's instructions to update DNS records
4. Wait for DNS propagation (5-30 minutes)

## Performance

- **Cold Start**: ~1-2 seconds (first request after inactivity)
- **Warm Requests**: ~200-500ms
- **AI Response**: 1-3 seconds (depending on message length)
- **Free Tier Limits**: 100GB bandwidth, unlimited API requests

## Support

### Vercel Issues
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

### Gensyn AI Assistant Issues
- Check the [GitHub repository](https://github.com/yourusername/gensyn-ai-assistant)
- Review error logs in Vercel dashboard

## Next Steps

After successful deployment:
1. Test the chat functionality thoroughly
2. Customize the UI/styling if needed
3. Add your custom domain
4. Monitor usage in Vercel dashboard
5. Set up auto-fetch for content updates (optional)

## Updates and Redeployment

To deploy updates:
1. Push changes to your GitHub repository
2. Vercel will automatically rebuild and redeploy
3. Or manually trigger deployment in Vercel dashboard

---

**Deployment Time**: 5-10 minutes  
**Cost**: Free (on Vercel, Groq, and Neon free tiers)  
**Tech Stack**: React + TypeScript, Express.js, PostgreSQL, Groq AI

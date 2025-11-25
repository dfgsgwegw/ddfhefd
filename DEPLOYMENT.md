# Deployment Guide - Vercel with GitHub

This guide will help you deploy the Gensyn AI Assistant to Vercel using GitHub integration.

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- Groq API key (free from https://console.groq.com/keys)

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git in your project (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Add GitHub remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add the following:
     ```
     GROQ_API_KEY = your_groq_api_key_here
     SESSION_SECRET = any_random_secret_string
     NODE_ENV = production
     ```

6. Click "Deploy"

Your app will be deployed in ~2-3 minutes!

### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No**
   - Project name? (press enter for default)
   - In which directory is your code? **.**

5. Add environment variables:
```bash
vercel env add GROQ_API_KEY
vercel env add SESSION_SECRET
```

6. Deploy to production:
```bash
vercel --prod
```

## Step 3: Get Your Groq API Key

1. Go to https://console.groq.com/keys
2. Sign up or log in (it's free!)
3. Click "Create API Key"
4. Copy the key
5. Add it to Vercel environment variables

## Step 4: Verify Deployment

After deployment completes:

1. Visit your deployment URL (e.g., `https://your-app.vercel.app`)
2. Test the chat widget
3. Ask it: "What is Gensyn?"
4. If it responds correctly, your deployment is successful! 🎉

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ Yes | Free API key from Groq console |
| `SESSION_SECRET` | ✅ Yes | Random string for session encryption (generate any random string) |
| `NODE_ENV` | Auto-set | Automatically set to `production` by Vercel |

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatic!

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify build command is `npm run build`

### API Not Working
- Verify `GROQ_API_KEY` is set in environment variables
- Check Vercel Function logs for errors
- Ensure API routes are correctly configured in `vercel.json`

### Chat Not Responding
- Open browser console (F12) to check for errors
- Verify the chat is making requests to `/api/chat`
- Check that environment variables are properly set

### 500 Errors
- Check Vercel Function logs (Dashboard → Functions → Logs)
- Verify `SESSION_SECRET` environment variable is set
- Ensure database connections (if any) are configured

## Monitoring

View your deployment status and logs:
- **Dashboard**: https://vercel.com/dashboard
- **Analytics**: Available in Vercel dashboard
- **Function Logs**: Real-time logs in Vercel dashboard

## Rollback

If something goes wrong:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

## Production Checklist

Before going live:
- ✅ Environment variables are set
- ✅ Chat functionality works
- ✅ All API endpoints respond correctly
- ✅ Error handling is in place
- ✅ Analytics are configured (optional)
- ✅ Custom domain is set up (optional)

## Cost

- **Vercel Free Tier** includes:
  - 100 GB bandwidth/month
  - Serverless function executions
  - Automatic SSL
  - Preview deployments
  
- **Groq API** is FREE with generous limits

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Groq Documentation**: https://console.groq.com/docs
- **Project Issues**: Open an issue on GitHub

---

**That's it!** Your Gensyn AI Assistant is now live on Vercel with automatic deployments from GitHub! 🚀

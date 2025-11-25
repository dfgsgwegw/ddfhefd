# 🚀 Quick Start - Deploy in 5 Minutes

## Prerequisites
- ✅ GitHub account
- ✅ Vercel account (free: https://vercel.com/signup)
- ✅ Groq API key (free: https://console.groq.com/keys)

## Step 1: Clone & Push to GitHub (2 min)

```bash
# Clone this repo (or fork it on GitHub)
git clone <your-repo-url>
cd gensyn-ai-assistant

# Create a new repo on GitHub, then:
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy to Vercel (2 min)

1. Go to https://vercel.com/new
2. Click "Import" next to your GitHub repository
3. Keep all default settings
4. Click "Deploy"

## Step 3: Add Environment Variables (1 min)

After deployment:
1. Go to your project → Settings → Environment Variables
2. Add these two variables:

```
Name: GROQ_API_KEY
Value: <paste your key from https://console.groq.com/keys>

Name: SESSION_SECRET  
Value: <any random string like: my-super-secret-key-12345>
```

3. Click "Redeploy" to apply the changes

## ✅ Done!

Visit your deployment URL: `https://your-project.vercel.app`

The chat widget should appear in the bottom right. Click it and ask: "What is Gensyn?"

---

## Automatic Updates

Every time you push to GitHub, Vercel automatically deploys the changes!

```bash
# Make changes to your code
git add .
git commit -m "Update chatbot knowledge"
git push

# Vercel auto-deploys in ~2 minutes
```

---

## Troubleshooting

**Chat not responding?**
- Check that `GROQ_API_KEY` is set in Vercel environment variables
- Redeploy after adding environment variables

**Build failed?**
- Check Vercel build logs
- Ensure `npm run build` works locally first

**Need detailed help?**
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide
- Check Vercel function logs for errors

---

**That's it!** Your AI assistant is live! 🎉

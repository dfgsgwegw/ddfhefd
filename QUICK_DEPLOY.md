# 🚀 Quick Deploy to Vercel (5 Minutes)

## Step 1: Get API Keys (2 minutes)

### GROQ API Key
1. Go to https://console.groq.com/keys
2. Sign up (free)
3. Create API key
4. Copy it (starts with `gsk_...`)

### Database URL
1. Go to https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string (starts with `postgresql://`)

### Session Secret
Run this command or use any random string:
```bash
openssl rand -base64 32
```

## Step 2: Deploy (3 minutes)

1. **Go to Vercel**
   - Visit https://vercel.com/new
   - Import your GitHub repository

2. **Add Environment Variables**
   - Click "Environment Variables" before deploying
   - Add these 3 variables:
     ```
     GROQ_API_KEY = your_groq_key_here
     DATABASE_URL = your_database_url_here
     SESSION_SECRET = your_random_secret_here
     ```

3. **Click "Deploy"**
   - Wait 2-3 minutes
   - You'll get a live URL

4. **Initialize Database**
   ```bash
   DATABASE_URL="your_db_url" npm run db:push
   ```

## Done! ✅

Visit your Vercel URL and test the chat!

---

**Need Help?** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

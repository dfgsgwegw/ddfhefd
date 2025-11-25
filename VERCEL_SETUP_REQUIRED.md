# ⚠️ VERCEL ENVIRONMENT VARIABLES REQUIRED

Your serverless function is crashing because it's missing required environment variables.

## 🔧 Required Environment Variables

You **MUST** add these 3 environment variables in Vercel before the app will work:

### 1. GROQ_API_KEY
- **What it does**: Powers the AI chat functionality
- **Get it from**: https://console.groq.com/keys (free account)
- **Value**: Your API key (starts with `gsk_`)

### 2. DATABASE_URL  
- **What it does**: Connects to PostgreSQL database for storing conversations
- **Options**:
  - **Neon** (Recommended - Free tier): https://neon.tech
  - **Vercel Postgres**: Built into Vercel
  - **Supabase**: https://supabase.com
- **Format**: `postgresql://user:password@host:port/database?sslmode=require`

### 3. SESSION_SECRET
- **What it does**: Secures user sessions
- **Value**: Any random string (e.g., `my-secret-key-123456789`)
- **Generate one**: Run `openssl rand -base64 32` in terminal

---

## 📝 How to Add Environment Variables in Vercel

### Step 1: Go to Your Project Settings
1. Open https://vercel.com/dashboard
2. Click on your project (`gensyn-ai-assistant`)
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add Each Variable
For **each** of the 3 variables above:

1. Click **Add New**
2. **Name**: Enter the variable name (e.g., `GROQ_API_KEY`)
3. **Value**: Paste the value
4. **Environment**: Select **ALL** (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy
After adding all 3 variables:

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **︙** menu button
4. Click **Redeploy**
5. Wait for deployment to complete (~1-2 minutes)

---

## 🗄️ Database Setup (After Adding Variables)

Once your app deploys successfully, you need to initialize the database:

### Using Neon (Recommended)

1. Create account at https://neon.tech
2. Create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@host/db?sslmode=require`)
4. Add it to Vercel as `DATABASE_URL`
5. From your local machine, run:
   ```bash
   DATABASE_URL="your-neon-url" npm run db:push
   ```

### Using Vercel Postgres

1. In Vercel project, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. Connect it to your project
4. Vercel automatically adds `DATABASE_URL` to environment variables
5. From your local machine, run:
   ```bash
   DATABASE_URL="your-vercel-postgres-url" npm run db:push
   ```

---

## ✅ Testing

After redeploying with all environment variables:

1. Visit your Vercel URL (e.g., `https://gensyn-ai-assistant.vercel.app`)
2. Click the chat widget in the bottom right
3. Send a message like "What is Gensyn?"
4. The AI should respond!

---

## 🐛 Troubleshooting

### Still seeing "FUNCTION_INVOCATION_FAILED"?
- Check that ALL 3 environment variables are set
- Make sure you clicked "Save" for each one
- Verify you redeployed after adding them
- Check Vercel function logs for specific errors

### How to View Function Logs
1. Go to your project in Vercel
2. Click **Deployments** tab  
3. Click on your latest deployment
4. Click **View Function Logs**
5. Look for error messages

### Database Connection Errors?
- Verify your `DATABASE_URL` is correct
- Make sure the database allows connections from Vercel
- Check that you ran `npm run db:push` to create tables
- Ensure SSL is enabled in the connection string (`?sslmode=require`)

---

## 📋 Quick Checklist

- [ ] Added `GROQ_API_KEY` to Vercel environment variables
- [ ] Added `DATABASE_URL` to Vercel environment variables  
- [ ] Added `SESSION_SECRET` to Vercel environment variables
- [ ] All variables set to "Production, Preview, Development"
- [ ] Redeployed the project
- [ ] Created database and ran `npm run db:push`
- [ ] Tested the chat widget

---

## 💡 Need Help?

If you're still having issues after following this guide:

1. Check the Vercel function logs for specific error messages
2. Verify all 3 environment variables are set correctly
3. Make sure the database is accessible and tables are created
4. Try redeploying one more time

The error you're seeing is **100% due to missing environment variables**. Once you add them and redeploy, your app will work perfectly!

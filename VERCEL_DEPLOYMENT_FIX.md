# Vercel Deployment Fix - Complete Guide

## Problem Fixed
The original error was: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/var/task/server/storage'`

This happened because Vercel's serverless functions couldn't find the TypeScript modules imported from the `server/` and `shared/` directories.

## Solution Implemented

### 1. **Bundled API Function**
- **Source file**: `api/handler.ts` (the original TypeScript source)
- **Bundled output**: `api/index.js` (compiled JavaScript with all dependencies)
- The build process uses `esbuild` to bundle all dependencies into a single file

### 2. **Lazy Database Initialization**
- Fixed `server/db.ts` to use lazy initialization with a Proxy pattern
- Prevents crashes when `DATABASE_URL` is not set at import time
- Only checks for the environment variable when the database is actually accessed

### 3. **Proper Promise Handling**
- The Vercel handler now properly waits for Express responses to finish
- Uses `res.on('finish')` and `res.on('close')` events to resolve the Promise

## How to Deploy to Vercel

### Step 1: Set Environment Variables in Vercel
You **must** configure these environment variables in your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `GROQ_API_KEY`: Your Groq API key for AI chat functionality
   - `DATABASE_URL`: Your PostgreSQL database connection string (Neon or other)

**Important**: Add these to all environments (Production, Preview, Development)

### Step 2: Push Your Changes to GitHub
```bash
git add .
git commit -m "Fix Vercel deployment - bundle API dependencies"
git push origin main
```

### Step 3: Redeploy on Vercel
The deployment will automatically trigger when you push to GitHub. Vercel will:
1. Run `npm run build:vercel` which:
   - Builds the frontend with Vite → `dist/` folder
   - Bundles the API function → `api/index.js`
2. Deploy the frontend from the `dist/` folder
3. Deploy the API serverless function from `api/index.js`

### Step 4: Test Your Deployment
After deployment completes, test these endpoints:
- **Chat API**: `https://your-domain.vercel.app/api/chat`
- **Updates API**: `https://your-domain.vercel.app/api/updates`

Test the chat widget on your deployed website to verify it works.

## Local Development in Replit

The dev server is already running in Replit! You can:
- View the website in the webview pane
- Test the frontend features
- **Note**: Chat functionality requires `GROQ_API_KEY` and `DATABASE_URL` environment variables

To set up local environment variables in Replit:
1. Open the "Secrets" tab (lock icon in the left sidebar)
2. Add `GROQ_API_KEY` and `DATABASE_URL`
3. Restart the workflow

## What Changed

### Files Modified:
1. **`api/index.ts`** → Renamed to **`api/handler.ts`** (source file)
2. **`server/db.ts`** → Added lazy initialization
3. **`package.json`** → Updated `build:vercel` script to bundle the API
4. **`.gitignore`** → Added `api/index.js` (generated file)
5. **`vercel.json`** → No changes needed (already configured correctly)

### Files Generated:
- **`api/index.js`** → Bundled API function (40.5kb, includes all dependencies)

## Troubleshooting

### If chat still doesn't work after deployment:
1. Check Vercel logs for error messages
2. Verify environment variables are set correctly
3. Ensure `GROQ_API_KEY` is valid and has credits
4. Ensure `DATABASE_URL` points to a valid PostgreSQL database

### If you get a different MODULE_NOT_FOUND error:
1. Run `npm run build:vercel` locally to verify the build works
2. Check that `api/index.js` is generated successfully
3. Ensure the bundled file includes all necessary dependencies

## Next Steps

1. **Add environment variables** to Vercel (GROQ_API_KEY, DATABASE_URL)
2. **Push to GitHub** to trigger a new deployment
3. **Test the deployed app** to verify chat functionality works

Your Vercel deployment should now work correctly! 🎉

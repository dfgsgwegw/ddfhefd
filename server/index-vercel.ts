import fs from "node:fs";
import path from "node:path";
import express from "express";
import { app } from "./app";
import { registerRoutesSync } from "./register-routes-sync";

// Check for required environment variables
const requiredEnvVars = ['GROQ_API_KEY', 'DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please set these in your Vercel project settings under Environment Variables');
  
  // Create error handler for missing environment variables
  app.get('*', (_req, res) => {
    res.status(500).json({
      error: 'Server configuration error',
      message: `Missing required environment variables: ${missingVars.join(', ')}`,
      hint: 'Please configure these in Vercel → Project Settings → Environment Variables'
    });
  });
} else {
  // Setup for Vercel serverless - must be done synchronously
  const distPath = path.resolve(process.cwd(), "dist/public");

  // Register routes synchronously
  registerRoutesSync(app);

  // Serve static files from dist/public
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));

    // fall through to index.html if the file doesn't exist
    app.use("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }
}

// Export for Vercel serverless
export default app;

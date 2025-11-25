import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Create connection (works in both serverless and regular environments)
// Gracefully handle missing DATABASE_URL for better error messages
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is required. ' +
    'Please set it in your Vercel project settings under Environment Variables.'
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

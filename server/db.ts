import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

// Lazy initialization to avoid crashing at import time
let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL environment variable is required. ' +
        'Please set it in your Vercel project settings under Environment Variables.'
      );
    }
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Export a proxy that lazily initializes the DB
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const dbInstance = getDb();
    const value = (dbInstance as any)[prop];
    return typeof value === 'function' ? value.bind(dbInstance) : value;
  }
});

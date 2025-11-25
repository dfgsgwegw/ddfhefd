import { randomUUID } from "crypto";

// Simple cookie-based session helper for serverless
export function getSessionId(req: Request): string {
  const cookies = req.headers.get("cookie") || "";
  const match = cookies.match(/sessionId=([^;]+)/);
  return match ? match[1] : randomUUID();
}

export function setSessionCookie(sessionId: string): string {
  // Set HttpOnly, Secure, SameSite cookie
  const maxAge = 30 * 24 * 60 * 60; // 30 days
  return `sessionId=${sessionId}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
}

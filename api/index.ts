import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { storage } from '../server/storage';
import { generateChatResponse } from '../server/groq';
import { contentFetcher } from '../server/content-fetcher';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or create conversation
    let conversation = await storage.getConversation(sessionId);
    if (!conversation) {
      conversation = await storage.createConversation({
        sessionId,
        messages: [],
      });
    }

    // Generate AI response
    const aiResponse = await generateChatResponse(message, history || []);

    // Update conversation with new messages
    const updatedMessages = [
      ...(Array.isArray(conversation.messages) ? conversation.messages : []),
      { role: "user", content: message, timestamp: Date.now() },
      { role: "assistant", content: aiResponse, timestamp: Date.now() },
    ];
    
    await storage.updateConversation(sessionId, updatedMessages);

    res.json({ message: aiResponse });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

// Get content updates
app.get("/api/updates", async (req, res) => {
  try {
    const { limit, source } = req.query;
    const updates = await storage.getContentUpdates(
      limit ? parseInt(limit as string) : 50,
      source as string | undefined
    );
    res.json({ updates });
  } catch (error) {
    console.error("Error fetching updates:", error);
    res.status(500).json({ error: "Failed to fetch updates" });
  }
});

// Manually trigger content fetch
app.post("/api/updates/fetch", async (req, res) => {
  try {
    await contentFetcher.fetchAllUpdates();
    res.json({ message: "Content fetch triggered successfully" });
  } catch (error) {
    console.error("Error triggering fetch:", error);
    res.status(500).json({ error: "Failed to trigger content fetch" });
  }
});

// Get fetcher status
app.get("/api/updates/status", async (req, res) => {
  try {
    const status = contentFetcher.getStatus();
    res.json(status);
  } catch (error) {
    console.error("Error getting status:", error);
    res.status(500).json({ error: "Failed to get status" });
  }
});

// Start auto-fetch
app.post("/api/updates/auto-fetch/start", async (req, res) => {
  try {
    const { intervalMinutes = 30 } = req.body;
    contentFetcher.startAutoFetch(intervalMinutes);
    res.json({ message: "Auto-fetch started", intervalMinutes });
  } catch (error) {
    console.error("Error starting auto-fetch:", error);
    res.status(500).json({ error: "Failed to start auto-fetch" });
  }
});

// Stop auto-fetch
app.post("/api/updates/auto-fetch/stop", async (req, res) => {
  try {
    contentFetcher.stopAutoFetch();
    res.json({ message: "Auto-fetch stopped" });
  } catch (error) {
    console.error("Error stopping auto-fetch:", error);
    res.status(500).json({ error: "Failed to stop auto-fetch" });
  }
});

// Export handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  // Check for required environment variables
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'Missing required environment variable: GROQ_API_KEY',
      hint: 'Please add GROQ_API_KEY in Vercel → Project Settings → Environment Variables. Get a free key at https://console.groq.com/keys'
    });
  }

  // DATABASE_URL is optional - will use in-memory storage if not provided
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set - using in-memory storage (data will not persist between deployments)');
  }

  // Resolve when the response finishes
  return new Promise<void>((resolve) => {
    res.on('finish', () => resolve());
    res.on('close', () => resolve());
    app(req as any, res as any);
  });
};

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';
import { generateChatResponse } from '../server/groq';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for required environment variable
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'Missing required environment variable: GROQ_API_KEY',
      hint: 'Please add GROQ_API_KEY in Vercel → Project Settings → Environment Variables. Get a free key at https://console.groq.com/keys'
    });
  }

  try {
    const { message, sessionId, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Get or create conversation
    let conversation;
    try {
      conversation = await storage.getConversation(sessionId);
      if (!conversation) {
        conversation = await storage.createConversation({
          sessionId,
          messages: [],
        });
      }
    } catch (storageError) {
      console.error("Storage error:", storageError);
      // Continue without storage - we can still generate responses
      conversation = { sessionId, messages: [] } as any;
    }

    // Generate AI response
    let aiResponse;
    try {
      aiResponse = await generateChatResponse(message, history || []);
    } catch (groqError: any) {
      console.error("Groq API error:", groqError);
      return res.status(500).json({ 
        error: "Failed to generate AI response",
        details: groqError?.message || "Unknown error",
        hint: "Please verify GROQ_API_KEY is valid and has credits"
      });
    }

    // Update conversation with new messages
    try {
      if (conversation.id) {
        const updatedMessages = [
          ...(Array.isArray(conversation.messages) ? conversation.messages : []),
          { role: "user", content: message, timestamp: Date.now() },
          { role: "assistant", content: aiResponse, timestamp: Date.now() },
        ];
        await storage.updateConversation(sessionId, updatedMessages);
      }
    } catch (updateError) {
      console.error("Update conversation error:", updateError);
      // Don't fail the request if we can't update storage
    }

    res.json({ message: aiResponse });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ 
      error: "Failed to process chat message",
      details: error?.message || "Unknown error"
    });
  }
}

import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

// Simple in-memory storage for serverless
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

async function generateResponse(message: string, history: ChatMessage[]): Promise<string> {
  const messages: any[] = [
    {
      role: "system",
      content: `You are a helpful AI assistant for Gensyn, a decentralized machine learning compute protocol. 
      
Gensyn connects ML-capable hardware globally and makes it accessible at fair market prices. Key products include:
- Verde Runtime: Cryptographically verifiable runtime for RL workloads
- RL Swarm: Collaborative RL framework (live on testnet)
- Testnet: Open platform for community testing

Be helpful, accurate, and concise in your responses.`
    },
    ...history.map(msg => ({ role: msg.role, content: msg.content })),
    { role: "user", content: message }
  ];

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.7,
    max_tokens: 1024,
  });

  return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
}

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
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate AI response
    const aiResponse = await generateResponse(message, history);

    return res.status(200).json({ message: aiResponse });
  } catch (error: any) {
    console.error("Chat error:", error);
    return res.status(500).json({ 
      error: "Failed to process chat message",
      details: error?.message || "Unknown error",
      hint: error?.message?.includes('API key') ? 'Please verify GROQ_API_KEY is valid and has credits' : undefined
    });
  }
}

import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT - from javascript_gemini integration
// Note that the newest Gemini model series is "gemini-2.5-flash" or "gemini-2.5-pro"
// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Comprehensive Gensyn knowledge base
const GENSYN_KNOWLEDGE = `
# Gensyn AI - Complete Knowledge Base

## Company Overview
- **Founded**: 2020
- **Founders**: Ben Fielding & Harry Grieve
- **Location**: London, UK (Distributed team)
- **Team**: Small, distributed, meritocratic team researching and building the future of machine learning

## Mission
Gensyn is building a decentralized machine learning compute protocol that connects ML-capable hardware worldwide and makes it accessible to engineers, researchers, and academics at fair market prices. The mission is to build open, permissionless, and neutral protocols for machine intelligence to flourish alongside human intelligence.

## Core Technology
Gensyn is a decentralized machine learning compute protocol that:
- Connects ML-capable hardware (GPUs, CPUs) globally
- Makes computational resources accessible at fair market prices
- Provides a decentralized trust layer for machine learning computation
- Uses pay-as-you-go model for developers
- Implements verification & checkpointing for continuous pricing
- Treats execution time (not hardware bundles) as the core asset
- Ensures deterministic execution across different hardware

## Products & Applications

### Verde Runtime
- **Status**: Core technology
- **Description**: Cryptographically verifiable runtime that allocates, schedules, and validates reinforcement learning workloads across the network
- **Features**: Verifiable execution, distributed scheduling, untrusted node support, deterministic across hardware
- **Paper**: "Verde: a verification system for machine learning over untrusted nodes" (June 2025)

### RL Swarm
- **Status**: Live on Testnet
- **Description**: Collaborative reinforcement learning framework over the internet for distributed training
- **Backend**: GenRL (latest, June 2025)
- **Features**: 
  - Works with any environment
  - Includes 100+ environments from Reasoning Gym library
  - Supports models up to 72B parameters
  - Docker deployment available
  - Peer-to-peer cooperative learning

### CodeAssist
- **Status**: Latest (November 2025)
- **Description**: AI coding assistant that learns from your coding behavior using reinforcement + assistance learning
- **Features**:
  - Learns from LeetCode problem-solving patterns
  - Trains an Action-Selection Model from your accepts, edits, and deletions
  - Personalized to your coding style
  - Uses reinforcement learning to improve over time

### BlockAssist
- **Status**: Live (August 2025)
- **Description**: Open-source AI assistant that learns by watching Minecraft gameplay
- **Features**:
  - Turns gameplay into a reinforcement learning environment
  - Open-source implementation
  - Interactive training through game observation

### Judge
- **Status**: Live (August 2025)
- **Description**: Reproducible evaluation system built on Verde with cryptographically verifiable AI model outputs
- **Features**:
  - Eliminates reliance on opaque closed-source judges
  - Cryptographically verifiable evaluation
  - Supports reasoning "prediction market" games
  - Enables benchmarks and peer review

### CodeZero
- **Status**: Live (November 2025)
- **Description**: Environment built on RL-Swarm for cooperative coding agents
- **Features**: Users participate as "Solvers" tackling coding problems so the swarm learns collectively

## Funding & Investment
- **Series A**: $43M in June 2023, led by a16z crypto
- **Total Raised**: $50M+
- **Key Investors**: 
  - a16z crypto (lead)
  - CoinFund
  - Canonical Crypto
  - Protocol Labs
  - Eden Block
  - Maven 11 Capital
  - M31 Capital
  - Various AI/crypto angels

## Research Papers & Publications
1. **NoLoCo: training large models with no all-reduce** (June 25, 2025) - Research on training large models without all-reduce operations
2. **Verde: a verification system for machine learning over untrusted nodes** (June 25, 2025) - Core research on verification technology
3. **Introducing RL Swarm's new backend: GenRL** (June 25, 2025) - Blog post about GenRL backend
4. **Introducing BlockAssist** (August 6, 2025) - Blog post announcing BlockAssist

## Vision & Use Cases
**Current Use Cases**:
- Enable distributed reinforcement learning at scale
- Democratize access to ML compute resources
- Connect underutilized hardware globally

**Future Vision**:
- Make all ML resources "instantaneously programmatically accessible to everyone"
- Break the computational moat held by centralized AI companies
- Build low-level infrastructure to open-source ML resource access

## Key Features & Differentiators
- Open, permissionless, and neutral protocols (like nature)
- Decentralized trust layer for ML computation
- Pay-as-you-go pricing model
- Verification and checkpointing systems
- Execution time as core asset (not hardware bundles)
- Deterministic execution across different hardware configurations

## Resources
- **Documentation**: https://docs.gensyn.ai
- **Litepaper**: https://docs.gensyn.ai/litepaper
- **Testnet**: https://www.gensyn.ai/testnet
- **Discord**: https://discord.com/invite/gensyn
- **Twitter/X**: @gensynai
- **LinkedIn**: https://www.linkedin.com/company/gensynai/
- **Media Pack**: Google Drive folder with brand assets

## Philosophy
Machine intelligence will soon take over humanity's role in knowledge-keeping and creation. What started in the mid-1990s as the gradual off-loading of knowledge to search engines will be rapidly replaced by vast neural networks with all knowledge compressed into their artificial neurons. Unlike organic life (constrained in four dimensions and subject to nature's laws), machine intelligence built within silicon needs protocols to coordinate and grow. These protocols should be open, permissionless, and neutral - just like nature.
`;

export async function generateChatResponse(
  message: string,
  history: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const systemPrompt = `You are an AI assistant for Gensyn AI, a decentralized machine learning compute protocol. 
        
Your role is to help users understand Gensyn's technology, products, mission, and vision. Be helpful, informative, and enthusiastic about Gensyn's work in democratizing access to ML compute.

Here is the complete knowledge base about Gensyn:

${GENSYN_KNOWLEDGE}

Use this information to answer questions accurately. If asked about something not covered in the knowledge base, be honest and direct users to the official resources (docs.gensyn.ai or discord.com/invite/gensyn).

Keep responses concise but informative. Use a friendly, professional tone.`;

    // Build conversation history for Gemini
    const contents: string[] = [];
    
    // Add history
    history.forEach((msg) => {
      if (msg.role === "user") {
        contents.push(`User: ${msg.content}`);
      } else {
        contents.push(`Assistant: ${msg.content}`);
      }
    });
    
    // Add current message
    contents.push(`User: ${message}`);
    
    const fullPrompt = contents.join("\n\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: fullPrompt,
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate response");
  }
}

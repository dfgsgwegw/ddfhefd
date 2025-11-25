import Groq from "groq-sdk";
import { storage } from "./storage";

// Groq offers FREE API access with super fast inference (300+ tokens/sec)
// Supports DeepSeek R1 Distill 70B and Llama 3.3 70B
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

// Function to get dynamic knowledge base including latest updates
async function getKnowledgeBase(): Promise<string> {
  const recentUpdates = await storage.getContentUpdates(20);
  
  let latestUpdatesSection = "";
  if (recentUpdates.length > 0) {
    latestUpdatesSection = "\n\n## LATEST UPDATES\n\n";
    
    const tweets = recentUpdates.filter(u => u.source === "twitter");
    const blogPosts = recentUpdates.filter(u => u.source === "blog");
    const docs = recentUpdates.filter(u => u.source === "docs");
    
    if (tweets.length > 0) {
      latestUpdatesSection += "### Recent Tweets from @gensynai\n";
      tweets.slice(0, 5).forEach(tweet => {
        latestUpdatesSection += `- ${tweet.publishedAt.toLocaleDateString()}: ${tweet.content}\n`;
        if (tweet.url) latestUpdatesSection += `  Link: ${tweet.url}\n`;
      });
      latestUpdatesSection += "\n";
    }
    
    if (blogPosts.length > 0) {
      latestUpdatesSection += "### Recent Blog Posts\n";
      blogPosts.slice(0, 5).forEach(post => {
        latestUpdatesSection += `- **${post.title}** (${post.publishedAt.toLocaleDateString()})\n`;
        latestUpdatesSection += `  ${post.content.substring(0, 200)}...\n`;
        if (post.url) latestUpdatesSection += `  Link: ${post.url}\n`;
      });
      latestUpdatesSection += "\n";
    }
    
    if (docs.length > 0) {
      latestUpdatesSection += "### Recent Documentation Updates\n";
      docs.slice(0, 5).forEach(doc => {
        latestUpdatesSection += `- **${doc.title}** (${doc.publishedAt.toLocaleDateString()})\n`;
        if (doc.url) latestUpdatesSection += `  Link: ${doc.url}\n`;
      });
      latestUpdatesSection += "\n";
    }
  }
  
  return GENSYN_KNOWLEDGE + latestUpdatesSection;
}

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
- **Status**: Latest (November 5, 2025)
- **Description**: AI coding assistant that learns from your coding behavior using reinforcement + assistance learning
- **Features**:
  - Learns from LeetCode problem-solving patterns
  - Trains an Action-Selection Model from your accepts, edits, and deletions
  - Personalized to your coding style
  - Keeps everything local on your device
  - Uses reinforcement learning to improve over time
- **Try it**: https://www.gensyn.ai/testnet

### CodeZero
- **Status**: Latest (November 12, 2025)
- **Description**: New RL-Swarm environment for collaborative code generation with three distinct roles
- **Features**:
  - Built on RL-Swarm framework extending into cooperative coding agents
  - Three roles: Proposers (generate coding tasks), Solvers (tackle problems), Evaluators (judge results)
  - Rule-based reward model that doesn't require code execution
  - Adaptive difficulty that adjusts with solver performance
  - Users participate as Solvers, sharing results for collective learning
- **GitHub**: https://github.com/gensyn-ai/rl-swarm
- **Blog**: https://blog.gensyn.ai/codezero-extending-rl-swarm-toward-cooperative-coding-agents/

### BlockAssist
- **Status**: Live (August 2025)
- **Description**: Open-source AI assistant that learns by watching Minecraft gameplay
- **Features**:
  - Turns gameplay into a reinforcement learning environment
  - Open-source implementation
  - Interactive training through game observation
- **Network Stats**: 122,500+ sessions

### Judge
- **Status**: Live (August 27, 2025)
- **Description**: Reproducible evaluation system built on Verde with cryptographically verifiable AI model outputs
- **Features**:
  - Eliminates reliance on opaque closed-source judges
  - Cryptographically verifiable evaluation with deterministic hardware tracing
  - Scalable verification through refereed delegation
  - Supports reasoning "prediction market" games
  - Enables benchmarks and peer review
- **Network Stats**: 17,000+ participants

## Network Stats (September 2025)
- **Transactions**: 45+ million
- **Users**: 130,000+
- **Models Trained**: Over 1 million on testnet
- **RL Swarm Nodes**: 26,000+
- **BlockAssist Sessions**: 122,500+
- **Judge Participants**: 17,000+

## Mainnet Status
- **Current**: Public Testnet (launched March 2025)
- **Upcoming**: Mainnet launch in preparation
- **Focus**: Building decentralized infrastructure for AI training and inference
- **Testnet Features**: Persistent identity, participation tracking, attribution, payments, remote execution coordination, operation verification, training run logging

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
5. **CodeZero: Extending RL-Swarm Toward Cooperative Coding Agents** (November 12, 2025) - Blog post about CodeZero launch

## Recent Events & Community
- **NeurIPS 2025**: Gensyn hosting coffee truck at conference (Dec 2-7, San Diego)
- **Focus**: Small, accessible models (0.5B parameters) for democratized AI
- **Community**: Active on Discord, Twitter/X, with regular updates and engagement
- **Milestone (November 2025)**: RL-Swarm surpassed 100,000 models trained, a major milestone for the first deployed system

## Community Programs

### Gensyn Pioneer Program
**Status**: Applications are NOW LIVE
**Purpose**: Celebrates the people who shape Gensyn's culture from within and make Gensyn feel alive

The Pioneer Program has a tiered system with three role levels, each earned through visible effort, trust, and how you show up for others.

**Three Pioneer Roles (Tiered System)**:

1. **Rovers** (Entry Level)
   - For consistent contributors who engage, support others, and help shape the daily culture
   - The foundational tier for active community members

2. **Navigators** (Mid Level)
   - For those taking initiative, supporting programs, and creating meaningful things for the community
   - Requires demonstrated leadership and creative contributions

3. **Pathfinders** (Top Level)
   - For the people who live and breathe the Gensyn culture and help carry it forward with others
   - The highest recognition for cultural ambassadors

**How to Apply**:
1. Fill out the application form (3 sections total - must complete and submit all)
2. Share how you've been contributing to the community
3. Applications can be submitted once every two weeks
4. Mods review your consistency, creativity, and impact (not just numbers)
5. Roles are earned through visible effort, trust, and how you show up for others
6. If not accepted initially, you can reapply after a 2-week cooldown once you've made more contributions
7. The more you contribute, the closer you get to higher tiers

**What Counts as Contribution**:
- Being active, positive, and helpful in community chats
- Creating memes, art, threads, or creative posts about Gensyn
- Writing support guides and documentation
- Promoting Gensyn on Twitter/X with updates, memes, or fun content
- Sparking discussions, sharing ideas, or helping build community culture
- Welcoming new members and keeping the vibe strong
- Being the person who keeps things moving in the community

**Benefits**:
- Recognition and belonging within the inner circle of Gensyn's culture
- Roles, badges, and special name colors
- Early information access and private community hangouts
- Occasional surprise events and exclusive access
- Proximity to the core community and shared energy
- Being part of something that's growing together

**Philosophy**: The program isn't about rewards or incentives - it's about recognition, belonging, and culture. Roles and badges are just the surface. What really matters is being part of the culture that drives this place. Born from the swarm, grown by the people who never stopped showing up. Becoming a Pioneer means joining the inner circle of Gensyn's culture, where creativity, curiosity, and consistency come together.

### The Core - Discord Verification System

**Overview**: The Core is the exclusive verification channel used for verifying access to various Gensyn roles and programs.

**Hugging Face Verification**:
- Use the command /verify-huggingface in The Core channel
- This registers your Hugging Face profile with your Discord identity
- Links your Hugging Face contributions to Gensyn

**The Swarm Role**:
- **Current Status**: Temporarily paused due to an on-chain update
- Related to RL-Swarm participation
- Check Discord announcements for updates on when this will be available again

**The Block Verification**:
- **Prerequisites**: Requires both Hugging Face and The Swarm roles
- **How to Get**:
  1. Once you have both roles above, go to the "No Access" channel
  2. Use the command /verify-block
  3. Register your uploaded BlockAssist model
  4. Complete the process to build your @Block profile
- This verification connects your BlockAssist model contributions to your Discord identity

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
    // Get dynamic knowledge base with latest updates
    const knowledgeBase = await getKnowledgeBase();
    
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system",
        content: `You are an AI assistant for Gensyn AI, a decentralized machine learning compute protocol. 

CRITICAL RULES:
1. ONLY use information from the knowledge base provided below
2. NEVER make up or guess information
3. If something is not in the knowledge base, clearly say "I don't have information about that in my knowledge base"
4. Then refer users to official Gensyn sources: Twitter/X (@gensynai) or Discord (discord.com/invite/gensyn)
5. DO NOT provide general information, speculation, or unrelated answers

Your role is to help users understand Gensyn's technology, products, mission, and vision based ONLY on the knowledge base below.

Here is the complete knowledge base about Gensyn (including latest updates from Twitter, blog, and documentation):

${knowledgeBase}

When answering:
- Use ONLY information from the knowledge base above
- Be helpful, informative, and enthusiastic about Gensyn
- When referencing recent updates, mention the source and date
- Keep responses concise but informative
- Use a friendly, professional tone

When you DON'T know something:
- Clearly state you don't have that information
- Refer users to: Twitter/X (@gensynai) or Discord (discord.com/invite/gensyn) for the latest updates
- Do NOT provide general knowledge or make assumptions`,
      },
    ];

    // Add conversation history
    history.forEach((msg) => {
      messages.push({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      });
    });

    // Add current message
    messages.push({
      role: "user",
      content: message,
    });

    // Using Llama 3.3 70B - Free and fast on Groq (300+ tokens/sec)
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to generate response");
  }
}

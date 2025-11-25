# Gensyn AI Assistant

An AI-powered chat assistant with comprehensive knowledge about Gensyn AI, their decentralized machine learning compute protocol, products, and latest updates.

## Features

- 🤖 **AI Chat Assistant** powered by Llama 3.3 70B via Groq (FREE)
- 📚 **Comprehensive Knowledge Base** with latest Gensyn information
- ⚡ **Super Fast** - 300+ tokens/second inference
- 💬 **Interactive Chat Widget** with conversation history
- 🎨 **Modern UI** with dark mode support
- 📱 **Responsive Design** works on all devices

## Latest Gensyn Updates (November 2025)

- **CodeZero** - Collaborative coding agents with RL-Swarm
- **CodeAssist** - AI assistant that learns your coding style
- **130,000+ users** and **45M+ transactions** on testnet
- **1M+ models trained** on the network

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **AI**: Groq API (Llama 3.3 70B) - FREE
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 20+
- Free Groq API key from https://console.groq.com/keys

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd gensyn-ai-assistant
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
SESSION_SECRET=your_random_secret_here
```

4. Run development server
```bash
npm run dev
```

Visit http://localhost:5000

## Deployment

### 🚀 Recommended: Deploy to Vercel (Free & Easy)

This app is production-ready and configured for Vercel deployment:

**Quick Deploy (5 minutes):**
1. Push your code to GitHub
2. Import repository to Vercel at https://vercel.com/new
3. Add environment variables:
   - `GROQ_API_KEY` - Free from https://console.groq.com/keys
   - `DATABASE_URL` - Free PostgreSQL from https://neon.tech
   - `SESSION_SECRET` - Random string (use `openssl rand -base64 32`)
4. Deploy! ✨
5. Initialize database: `DATABASE_URL="your_url" npm run db:push`

**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete step-by-step instructions.**  
**See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for a 5-minute quick start guide.**

**Why Vercel?**
- ✅ Automatic deployments from GitHub
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS and SSL
- ✅ Preview deployments for PRs
- ✅ Global CDN
- ✅ Serverless functions for API

### Alternative Deployment Options

**Replit** (Zero configuration)
- Fork this Repl → Add secrets → Click Run → Publish
- Perfect for quick prototypes and testing

**VPS/Cloud Server** (Full control)
- Works on: Railway, Render, DigitalOcean, AWS, etc.
- Run: `npm run build && npm start`

**Docker** (Advanced)
```bash
docker build -t gensyn-assistant .
docker run -p 5000:5000 -e GROQ_API_KEY=your_key gensyn-assistant
```

## Environment Variables

| Variable | Required | Description | Where to Get |
|----------|----------|-------------|--------------|
| `GROQ_API_KEY` | Yes | Free API key from Groq console | https://console.groq.com/keys |
| `DATABASE_URL` | Yes | PostgreSQL connection string | https://neon.tech (free) |
| `SESSION_SECRET` | Yes | Random string for session encryption | `openssl rand -base64 32` |
| `OPENAI_API_KEY` | No | Alternative if using OpenAI instead | https://platform.openai.com |
| `GEMINI_API_KEY` | No | Alternative if using Google Gemini | https://ai.google.dev |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript

## API Endpoints

- `POST /api/chat` - Send chat message and get AI response

## Project Structure

```
├── client/          # Frontend React app
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       └── lib/          # Utilities
├── server/          # Backend Express app
│   ├── routes.ts    # API routes
│   ├── groq.ts      # Groq AI integration
│   └── storage.ts   # In-memory storage
├── shared/          # Shared types and schemas
└── package.json
```

## Knowledge Base

The AI assistant has comprehensive knowledge about:

- Gensyn company overview and mission
- Core technology and architecture
- All products: Verde, RL Swarm, CodeAssist, CodeZero, BlockAssist, Judge
- Network statistics (130K+ users, 45M+ transactions)
- Latest updates through November 2025
- Funding information and investors
- Research papers and publications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Resources

- **Gensyn Website**: https://www.gensyn.ai
- **Testnet**: https://www.gensyn.ai/testnet
- **Documentation**: https://docs.gensyn.ai
- **Discord**: https://discord.com/invite/gensyn
- **Twitter/X**: @gensynai
- **Groq API**: https://groq.com

## Support

For issues or questions, please open an issue on GitHub or reach out to Gensyn's community on Discord.

---

Built with ❤️ for the Gensyn community

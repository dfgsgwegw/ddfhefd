# Gensyn AI Assistant

## Overview

This is an AI-powered chat assistant with comprehensive knowledge about Gensyn AI, their decentralized machine learning compute protocol, products, and latest updates. The application provides an interactive web experience with a chat widget that uses Groq's API (Llama 3.3 70B) for fast, free inference at 300+ tokens/second. The site showcases Gensyn's products (Verde Runtime, RL Swarm, CodeAssist, etc.), company information, resources, and dynamically fetched content updates from Twitter, blogs, and documentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, built using Vite for fast development and optimized production builds.

**UI Component Library**: shadcn/ui components (Radix UI primitives) with Tailwind CSS for styling. The design follows a "technical elegance" approach inspired by modern tech companies like Stripe and Linear, with focus on clean layouts and progressive disclosure of information.

**Routing**: Client-side routing using Wouter, a lightweight React router alternative. Routes include Home, Products, Company, Resources, Updates, and Pioneer Program pages.

**State Management**: TanStack Query (React Query) for server state management, API requests, and caching. Query client configured with custom fetch functions and error handling.

**Styling System**: Tailwind CSS with custom design tokens defined in CSS variables for light/dark mode support. Uses a spacing system based on multiples of 2, 4, 8, 16, 24 for consistent rhythm. Typography uses Inter for UI/headings and JetBrains Mono for code/technical elements.

### Backend Architecture

**Runtime**: Node.js with Express.js framework for the HTTP server.

**API Structure**: RESTful API with endpoints for:
- `/api/chat` - Chat message processing with session-based conversation history
- `/api/updates` - Content updates retrieval with filtering by source
- `/api/updates/fetch` - Trigger manual content fetching
- `/api/updates/auto-fetch/start` and `/api/updates/auto-fetch/stop` - Control automated content fetching
- `/api/newsletter/subscribe` - Newsletter subscription handling
- `/api/feedback` - User feedback submission

**Development vs Production**: Separate entry points (`index-dev.ts` and `index-prod.ts`) with Vite middleware integration for development and static file serving for production.

**Content Fetching**: Background content fetcher service that can run on intervals to pull updates from Twitter, blogs, and documentation. Stores updates in memory or database with deduplication by URL.

### Data Storage

**ORM**: Drizzle ORM with TypeScript schema definitions for type-safe database operations.

**Database**: Configured for PostgreSQL via Neon serverless driver (`@neondatabase/serverless`). Connection string expected in `DATABASE_URL` environment variable.

**Schema Design**:
- `conversations` - Chat sessions with message history stored as JSONB
- `newsletter_subscriptions` - Email subscriptions with uniqueness constraint
- `feedback` - User feedback with categorization
- `content_updates` - Dynamic content from external sources (Twitter, blogs, docs) with metadata

**In-Memory Fallback**: `MemStorage` class provides in-memory storage implementation for development/testing when database is unavailable.

### AI Integration

**Primary AI Provider**: Groq API using Llama 3.3 70B model for chat functionality. Chosen for free tier and exceptional speed (300+ tokens/second).

**Alternative Providers**: Code includes implementations for Google Gemini (gemini-2.5-flash/pro) and OpenAI (gpt-5), though Groq is the active provider.

**Knowledge Base**: Comprehensive static knowledge about Gensyn hardcoded in backend, augmented dynamically with latest content updates from the database. Includes company overview, products (Verde Runtime, RL Swarm, CodeAssist, BlockAssist, etc.), technical details, and team information.

**Chat Context**: Maintains conversation history per session, passing context to AI for coherent multi-turn conversations.

## External Dependencies

**AI Services**:
- Groq API - Primary LLM provider (requires `GROQ_API_KEY`)
- Google Gemini API - Alternative LLM (requires `GEMINI_API_KEY`)
- OpenAI API - Alternative LLM (requires `OPENAI_API_KEY`)

**Database**:
- Neon Serverless PostgreSQL - Cloud PostgreSQL database (requires `DATABASE_URL`)
- Drizzle Kit - Database migration tooling

**Frontend Libraries**:
- Radix UI - Accessible component primitives (accordion, dialog, dropdown, etc.)
- React Hook Form - Form state management
- TanStack Query - Async state management
- Wouter - Lightweight routing
- date-fns - Date formatting utilities

**Build Tools**:
- Vite - Frontend build tool and dev server
- esbuild - Backend bundler for production
- TypeScript - Type safety across the stack
- Tailwind CSS - Utility-first CSS framework
- PostCSS with Autoprefixer - CSS processing

**Development Tools**:
- Replit plugins - Dev banner, cartographer, runtime error overlay for Replit environment
- tsx - TypeScript execution for development server

**Deployment**:
- Vercel - Configured with `vercel.json` for serverless deployment
- Express static middleware - Serves built frontend in production

**Content Sources** (for auto-fetching):
- Twitter/X API - Fetch @gensynai tweets (would require Twitter API credentials)
- RSS/Web scraping alternatives - For blog and documentation updates
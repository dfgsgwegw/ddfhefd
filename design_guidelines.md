# Gensyn AI Website Design Guidelines

## Design Approach
**Reference-Based Hybrid**: Drawing from modern tech companies - Stripe's clean restraint, Linear's typography excellence, and contemporary AI company aesthetics (Anthropic, OpenAI). Focus on technical sophistication meets approachability.

## Core Design Principles
- **Technical Elegance**: Clean, precise layouts that convey technical depth without overwhelming
- **Progressive Disclosure**: Layer information thoughtfully - from high-level vision to technical details
- **Conversational Integration**: Chatbot isn't tacked on; it's woven into the experience naturally

---

## Typography System
**Font Stack**: 
- Primary: Inter (headings, UI) - weights 400, 500, 600, 700
- Secondary: JetBrains Mono (code snippets, technical callouts) - weight 400

**Hierarchy**:
- Hero H1: text-5xl/text-6xl, font-bold, tracking-tight
- Section H2: text-3xl/text-4xl, font-semibold
- Feature H3: text-xl/text-2xl, font-medium
- Body: text-base/text-lg, font-normal, leading-relaxed
- Technical labels: text-sm, font-mono, tracking-wide, uppercase

---

## Layout System
**Spacing Primitives**: Use tailwind units of 2, 4, 8, 16, 24 for consistent rhythm
- Component internal: p-4, p-8
- Section padding: py-16 to py-24
- Container gaps: gap-8, gap-16

**Grid Structure**:
- Container: max-w-7xl mx-auto px-4/px-8
- Content sections: max-w-6xl for features, max-w-4xl for text-heavy content
- Multi-column grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

---

## Component Library

### Navigation
- Sticky top nav with logo left, links center, "Try Testnet" CTA right
- Mobile: hamburger menu with slide-in panel
- Include: Home, Products, Research, Careers, Docs (external)

### Hero Section
- Large hero image: Abstract visualization of distributed network/neural connections
- Hero spans 85vh with gradient overlay for text readability
- H1 + subtitle + dual CTAs (primary: "Explore Testnet", secondary: "Ask AI Assistant")
- Floating chat bubble indicator in bottom-right corner

### Product Cards
- Grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Each card: icon/logo, product name, 2-3 line description, "Learn more" link
- Subtle border, hover lift effect (transform scale)
- Products: RL Swarm, CodeAssist, BlockAssist, Judge, Verde Runtime

### AI Chat Interface
- Floating widget: bottom-right, expandable to half-screen overlay
- Collapsed state: circular avatar with pulsing indicator
- Expanded: chat history, input field, suggested questions chips
- Message bubbles: user (right-aligned), AI (left-aligned with Gensyn icon)
- Suggested questions: "What is Gensyn?", "How does Verde work?", "What is RL Swarm?"

### Information Sections
- Mission statement: full-width, centered text (max-w-4xl), bold typography
- Company stats: 4-column grid with large numbers + labels (Founded 2020, $50M+ raised, etc.)
- Research papers: Card list with publication date, title, abstract preview
- Team section: "Small, distributed, meritocratic team" + link to careers

### Footer
- Multi-column: Company links | Resources | Community | Newsletter signup
- Social icons: Discord, X, LinkedIn
- Legal/copyright bottom bar

---

## Images

### Hero Image
Large, full-width hero background showing abstract visualization of distributed neural network - interconnected nodes with glowing connections, suggesting global compute network. Should feel technical yet visually striking. Gradient overlay (dark to transparent) for text readability.

### Product Section Graphics
Small icon/logo for each product (can use placeholder squares with product initials if actual logos unavailable)

### Company Section
Optional: Team collaboration photo or office/distributed work visualization

---

## Interactions & Animations
- **Minimal, purposeful animations only**
- Nav: smooth background blur on scroll
- Cards: subtle hover lift (translate-y-1)
- Chat widget: bounce attention animation on first load
- Smooth scroll for anchor links
- Page transitions: none (instant navigation preferred)

---

## Page Structure

**Homepage Flow**:
1. Hero with network visualization + dual CTAs
2. Mission statement section (full-width, centered)
3. "The Technology" - 3-column feature grid
4. Products showcase - card grid with 5 products
5. Latest research - 2-column layout with featured papers
6. Stats/funding highlights - 4-column metrics
7. Careers CTA section
8. Footer with newsletter + links

**Responsive Breakpoints**:
- Mobile: Single column, stacked elements, chat overlay full-screen
- Tablet: 2-column grids, side nav becomes hamburger
- Desktop: Full multi-column layouts, persistent chat widget

---

## Accessibility
- ARIA labels for chat interface
- Keyboard navigation for all interactive elements
- Focus visible states using ring utilities
- Semantic HTML structure throughout
- Alt text for all images
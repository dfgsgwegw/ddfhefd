import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Gamepad2, Gavel, ShieldCheck, Network } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "rl-swarm",
      icon: Network,
      name: "RL Swarm",
      status: "Live",
      description: "Collaborative reinforcement learning framework over the internet for distributed training.",
      features: [
        "GenRL backend with 100+ environments",
        "Supports models up to 72B parameters",
        "Docker deployment available",
        "Peer-to-peer cooperative learning"
      ],
      link: "https://docs.gensyn.ai/testnet"
    },
    {
      id: "codeassist",
      icon: Code,
      name: "CodeAssist",
      status: "Latest",
      description: "AI coding assistant that learns from your coding behavior using reinforcement + assistance learning.",
      features: [
        "Learns from LeetCode problem-solving",
        "Action-Selection Model training",
        "Accepts, edits, and deletion patterns",
        "Personalized to your coding style"
      ],
      link: "https://docs.gensyn.ai/testnet/codeassist"
    },
    {
      id: "blockassist",
      icon: Gamepad2,
      name: "BlockAssist",
      status: "Live",
      description: "Open-source AI assistant that learns by watching Minecraft gameplay.",
      features: [
        "Gameplay-based learning",
        "Reinforcement learning environment",
        "Open-source implementation",
        "Interactive training"
      ],
      link: "https://www.gensyn.ai/articles/blockassist"
    },
    {
      id: "judge",
      icon: Gavel,
      name: "Judge",
      status: "Live",
      description: "Reproducible evaluation system built on Verde with cryptographically verifiable outputs.",
      features: [
        "Eliminates opaque judges",
        "Cryptographic verification",
        "Reasoning prediction markets",
        "Peer review support"
      ],
      link: "https://docs.gensyn.ai/testnet"
    },
    {
      id: "verde",
      icon: ShieldCheck,
      name: "Verde Runtime",
      status: "Core",
      description: "Cryptographically verifiable runtime that allocates, schedules, and validates RL workloads.",
      features: [
        "Verifiable execution",
        "Distributed scheduling",
        "Untrusted node support",
        "Deterministic across hardware"
      ],
      link: "https://www.gensyn.ai/articles/verde"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-products-title">
            Our Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our suite of applications built on the Gensyn network, enabling decentralized machine learning at scale
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.id} className="hover-elevate" data-testid={`card-product-${product.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-md">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" data-testid={`badge-status-${product.id}`}>
                      {product.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full" data-testid={`button-learn-${product.id}`}>
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Build?</h2>
          <p className="text-muted-foreground mb-6">
            Join our testnet and start building with decentralized machine learning
          </p>
          <a href="https://docs.gensyn.ai/testnet" target="_blank" rel="noopener noreferrer">
            <Button size="lg" data-testid="button-start-building">
              Start Building
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

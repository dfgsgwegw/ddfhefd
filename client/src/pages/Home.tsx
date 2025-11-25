import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Network, Shield, Zap, Users } from "lucide-react";
import heroImage from "@assets/1500x500_1763889842435.jpg";

export default function Home() {
  const scrollToChat = () => {
    const event = new CustomEvent("openChat");
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6" data-testid="text-hero-title">
            The Network for Machine Intelligence
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            We network together the core resources required for machine intelligence to flourish alongside human intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="https://www.gensyn.ai/testnet" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary/90 hover:bg-primary" data-testid="button-hero-testnet">
                Explore Testnet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              onClick={scrollToChat}
              data-testid="button-hero-chat"
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Machine intelligence will soon take over humanity's role in knowledge-keeping and creation. 
            Unlike organic life, machine intelligence needs <span className="font-semibold text-foreground">open, permissionless, and neutral protocols</span> to coordinate and grow.
          </p>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">The Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card data-testid="card-feature-decentralized">
              <CardHeader>
                <Network className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Decentralized Compute</CardTitle>
                <CardDescription>
                  Connect ML-capable hardware worldwide and make it accessible at fair market prices
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-testid="card-feature-verification">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Cryptographic Verification</CardTitle>
                <CardDescription>
                  Verde runtime provides verifiable execution for machine learning workloads
                </CardDescription>
              </CardHeader>
            </Card>

            <Card data-testid="card-feature-performance">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Instant Access</CardTitle>
                <CardDescription>
                  Pay-as-you-go model with fast matching and continuous pricing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-founded">
              <div className="text-4xl font-bold text-primary mb-2">2020</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Founded</div>
            </div>
            <div data-testid="stat-funding">
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Raised</div>
            </div>
            <div data-testid="stat-investors">
              <div className="text-4xl font-bold text-primary mb-2">a16z</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Led by</div>
            </div>
            <div data-testid="stat-team">
              <div className="text-4xl font-bold text-primary mb-2">
                <Users className="h-10 w-10 inline-block" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Distributed Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Join the Network</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're a small, distributed, meritocratic team researching and building the future of machine learning
          </p>
          <a href="https://www.gensyn.ai/careers" target="_blank" rel="noopener noreferrer">
            <Button size="lg" data-testid="button-careers">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

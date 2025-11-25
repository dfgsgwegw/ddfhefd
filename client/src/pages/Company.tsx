import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, TrendingUp, MapPin, Target } from "lucide-react";

export default function Company() {
  const fundingRounds = [
    {
      round: "Series A",
      amount: "$43M",
      date: "June 2023",
      lead: "a16z crypto"
    },
    {
      round: "Total Raised",
      amount: "$50M+",
      date: "2020-2023",
      lead: "Multiple investors"
    }
  ];

  const investors = [
    "a16z crypto",
    "CoinFund",
    "Canonical Crypto",
    "Protocol Labs",
    "Eden Block",
    "Maven 11 Capital",
    "M31 Capital"
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-company-title">
            About Gensyn
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Building the future of decentralized machine learning
          </p>
        </div>

        {/* Company Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <Card data-testid="card-mission">
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Gensyn is building a decentralized machine learning compute protocol that connects ML-capable hardware worldwide.
              </p>
              <p>
                We make computational resources accessible to engineers, researchers, and academics at fair market prices, breaking the computational moat held by centralized AI companies.
              </p>
            </CardContent>
          </Card>

          {/* Founding */}
          <Card data-testid="card-founding">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Founding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold mb-1">Founded</div>
                <div className="text-muted-foreground">2020</div>
              </div>
              <div>
                <div className="font-semibold mb-1">Founders</div>
                <div className="text-muted-foreground">Ben Fielding & Harry Grieve</div>
              </div>
              <div>
                <div className="font-semibold mb-1">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location
                </div>
                <div className="text-muted-foreground">London, UK (Distributed Team)</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funding Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold">Funding</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {fundingRounds.map((round, idx) => (
              <Card key={idx} data-testid={`card-funding-${idx}`}>
                <CardHeader>
                  <CardDescription className="text-xs uppercase tracking-wide">
                    {round.round}
                  </CardDescription>
                  <CardTitle className="text-3xl text-primary">{round.amount}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <div>{round.date}</div>
                  <div className="font-medium text-foreground">Led by {round.lead}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card data-testid="card-investors">
            <CardHeader>
              <CardTitle>Investors</CardTitle>
              <CardDescription>
                Backed by leading crypto and AI investors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {investors.map((investor) => (
                  <span
                    key={investor}
                    className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium"
                    data-testid={`investor-${investor.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {investor}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Team</h2>
          <Card data-testid="card-team">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                We're a <span className="font-semibold text-foreground">small, distributed, meritocratic team</span> researching and building the future of machine learning.
              </p>
              <a href="https://www.gensyn.ai/careers" target="_blank" rel="noopener noreferrer">
                <Button data-testid="button-view-positions">
                  View Open Positions
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Vision */}
        <div className="p-8 bg-primary/5 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Make all ML resources instantaneously programmatically accessible to everyone, building the low-level infrastructure to open-source machine learning resource access.
          </p>
        </div>
      </div>
    </div>
  );
}

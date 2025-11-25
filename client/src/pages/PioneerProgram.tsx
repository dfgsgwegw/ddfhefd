import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Sparkles, MessageSquare, Twitter, Heart, UserPlus, Target } from "lucide-react";

export default function PioneerProgram() {
  const roles = [
    {
      id: "pioneer",
      name: "Pioneer",
      icon: Users,
      color: "text-blue-500",
      description: "For consistent contributors who engage, support others, and help shape the daily culture.",
      status: "Applications Open"
    },
    {
      id: "architect",
      name: "Architect",
      icon: Award,
      color: "text-purple-500",
      description: "For those taking initiative, supporting programs, and creating meaningful things for the community.",
      status: "Nomination Based"
    },
    {
      id: "beacon",
      name: "Beacon",
      icon: Sparkles,
      color: "text-amber-500",
      description: "For the people who live and breathe the Gensyn culture and help carry it forward with others.",
      status: "Nomination Based"
    }
  ];

  const contributions = [
    {
      icon: MessageSquare,
      title: "Active Engagement",
      description: "Being active, positive, and helpful in chats"
    },
    {
      icon: Sparkles,
      title: "Creative Content",
      description: "Creating memes, art, threads, or creative posts about Gensyn"
    },
    {
      icon: Twitter,
      title: "Social Promotion",
      description: "Promoting Gensyn on Twitter/X with updates, memes, or fun content"
    },
    {
      icon: Heart,
      title: "Community Building",
      description: "Sparking discussions, sharing ideas, or helping build community culture"
    },
    {
      icon: UserPlus,
      title: "Welcoming Members",
      description: "Welcoming new members and keeping the vibe strong"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary" data-testid="badge-milestone">
            <Sparkles className="h-3 w-3 mr-1" />
            100,000+ Models Trained on RL-Swarm
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-program-title">
            Gensyn Pioneer Program
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Celebrating the ones shaping our culture from within. The people who make Gensyn feel alive.
          </p>
        </div>

        {/* Applications Live Banner */}
        <Card className="mb-12 border-primary/50" data-testid="card-applications-live">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Pioneer Program Applications Are Live!</h2>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <p className="text-center text-muted-foreground max-w-2xl">
                The moment you've all been waiting for is finally here. Applications for the Gensyn Pioneer Program are now open. 
                You've been building, creating, helping, and keeping the swarm alive, and now it's your turn to get recognized for it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a href="https://discord.com/invite/gensyn" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" data-testid="button-apply-now">
                    <Target className="mr-2 h-4 w-4" />
                    Begin Application
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-12" data-testid="card-how-it-works">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div>
                <p className="font-semibold mb-1">Fill out the form</p>
                <p className="text-muted-foreground">
                  Visit the Discord channel and share how you've been contributing to the Gensyn community.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div>
                <p className="font-semibold mb-1">Complete all 3 sections</p>
                <p className="text-muted-foreground">
                  The form has 3 sections. Complete and submit them all to finish your application.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div>
                <p className="font-semibold mb-1">Get recognized</p>
                <p className="text-muted-foreground">
                  If accepted, you'll receive the Pioneer role on Discord and become part of the inner circle.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Applications that don't meet the criteria will not receive a response, but you can reapply 
                after a 2-week cooldown once you've made more contributions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Roles Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Roles Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.id} data-testid={`card-role-${role.id}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-8 w-8 ${role.color}`} />
                      <CardTitle>{role.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="w-fit">{role.status}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{role.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Pioneer applications are open now. Architect and Beacon roles are nomination-based.
          </p>
        </div>

        {/* What Counts as a Contribution */}
        <Card className="mb-12" data-testid="card-contributions">
          <CardHeader>
            <CardTitle className="text-2xl">What Counts as a Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributions.map((contribution, idx) => {
                const Icon = contribution.icon;
                return (
                  <div key={idx} className="flex gap-3" data-testid={`contribution-${idx}`}>
                    <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">{contribution.title}</p>
                      <p className="text-sm text-muted-foreground">{contribution.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-muted/50 rounded-md">
              <p className="text-sm">
                Mods will review your consistency, creativity, and impact—not just numbers. The more you contribute, the closer you get.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What Makes It Special */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card data-testid="card-special">
            <CardHeader>
              <CardTitle>What Makes It Special</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                The Pioneer Program celebrates the heartbeat of Gensyn. Roles, badges, and name colors are just the surface. 
                What really matters is being part of the culture that drives this place.
              </p>
              <p>
                Inside, Pioneers often get early info, private hangouts, and the occasional surprise event. 
                It's not about perks. It's about proximity, shared energy, and being part of something that's growing together.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-meaning">
            <CardHeader>
              <CardTitle>What It Means</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                This isn't about rewards or incentives. It's about recognition, belonging, and culture.
              </p>
              <p>
                Becoming a Pioneer means joining the inner circle of Gensyn's culture, where creativity, curiosity, and 
                consistency come together.
              </p>
              <p className="font-semibold text-foreground">
                Keep showing up. Keep creating. The rest will follow.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12 border-t">
          <h3 className="text-2xl font-bold mb-4">Ready to Join the Swarm?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Born from the swarm, grown by the people who never stopped showing up. Welcome to the next phase of the swarm.
          </p>
          <a href="https://discord.com/invite/gensyn" target="_blank" rel="noopener noreferrer">
            <Button size="lg" data-testid="button-join-discord">
              <MessageSquare className="mr-2 h-4 w-4" />
              Join Discord & Apply
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

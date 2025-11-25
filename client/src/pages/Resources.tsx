import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Book, Package, MessageSquare, Newspaper } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      id: "docs",
      icon: Book,
      title: "Documentation",
      description: "Complete technical documentation for developers building on Gensyn",
      link: "https://docs.gensyn.ai/",
      category: "Technical"
    },
    {
      id: "litepaper",
      icon: FileText,
      title: "Litepaper",
      description: "Overview of Gensyn's architecture, technology, and vision",
      link: "https://docs.gensyn.ai/litepaper",
      category: "Research"
    },
    {
      id: "testnet",
      icon: Package,
      title: "Testnet",
      description: "Try out Gensyn's products including RL Swarm, CodeAssist, and more",
      link: "https://www.gensyn.ai/testnet",
      category: "Platform"
    },
    {
      id: "media-pack",
      icon: Newspaper,
      title: "Media Pack",
      description: "Brand assets, logos, and media resources",
      link: "https://drive.google.com/drive/folders/11yACMeNErMKPZoK4y1PMmUUfVcIHY3CS",
      category: "Brand"
    },
    {
      id: "discord",
      icon: MessageSquare,
      title: "Discord Community",
      description: "Join our community to discuss Gensyn and get support",
      link: "https://discord.com/invite/gensyn",
      category: "Community"
    }
  ];

  const research = [
    {
      title: "NoLoCo: training large models with no all-reduce",
      date: "June 25, 2025",
      type: "Research",
      link: "https://www.gensyn.ai/articles/noloco"
    },
    {
      title: "Verde: a verification system for machine learning over untrusted nodes",
      date: "June 25, 2025",
      type: "Research",
      link: "https://www.gensyn.ai/articles/verde"
    },
    {
      title: "Introducing RL Swarm's new backend: GenRL",
      date: "June 25, 2025",
      type: "Blog Post",
      link: "https://www.gensyn.ai/articles/genrl"
    },
    {
      title: "Introducing BlockAssist",
      date: "August 6, 2025",
      type: "Blog Post",
      link: "https://www.gensyn.ai/articles/blockassist"
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="text-resources-title">
            Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to learn about and build with Gensyn
          </p>
        </div>

        {/* Main Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Documentation & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id} className="hover-elevate" data-testid={`card-resource-${resource.id}`}>
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-md w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full" data-testid={`button-open-${resource.id}`}>
                        Open Resource
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Research & Blog */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Latest Research & Blog Posts</h2>
          <div className="space-y-4">
            {research.map((item, idx) => (
              <Card key={idx} className="hover-elevate" data-testid={`card-research-${idx}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="font-mono">{item.date}</span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                          {item.type}
                        </span>
                      </CardDescription>
                    </div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" data-testid={`button-research-${idx}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://www.gensyn.ai/resources" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" data-testid="button-view-all">
                View All Resources
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

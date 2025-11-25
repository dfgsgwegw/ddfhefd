import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Twitter, FileText, BookOpen, ExternalLink, Play, Square, MessageCircle } from "lucide-react";
import { SiX, SiDiscord } from "react-icons/si";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ContentUpdate } from "@shared/schema";

export default function Updates() {
  const { toast } = useToast();

  const { data: updatesData, isLoading } = useQuery<{ updates: ContentUpdate[] }>({
    queryKey: ["/api/updates"],
  });

  const { data: statusData } = useQuery<{ isRunning: boolean; interval: string }>({
    queryKey: ["/api/updates/status"],
    refetchInterval: 5000,
  });

  const fetchMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/updates/fetch", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/updates"] });
      toast({
        title: "Fetch triggered",
        description: "Content is being fetched from all sources.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to trigger content fetch.",
        variant: "destructive",
      });
    },
  });

  const startAutoFetchMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/updates/auto-fetch/start", { intervalMinutes: 30 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/updates/status"] });
      toast({
        title: "Auto-fetch started",
        description: "Updates will be fetched every 30 minutes.",
      });
    },
  });

  const stopAutoFetchMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/updates/auto-fetch/stop", {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/updates/status"] });
      toast({
        title: "Auto-fetch stopped",
        description: "Automatic updates have been disabled.",
      });
    },
  });

  const updates = updatesData?.updates || [];
  const tweets = updates.filter(u => u.source === "twitter");
  const blogPosts = updates.filter(u => u.source === "blog");
  const docs = updates.filter(u => u.source === "docs");
  const discord = updates.filter(u => u.source === "discord");

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const UpdateCard = ({ update }: { update: ContentUpdate }) => {
    const getIcon = () => {
      switch (update.source) {
        case "twitter": return <SiX className="h-4 w-4" />;
        case "blog": return <FileText className="h-4 w-4" />;
        case "docs": return <BookOpen className="h-4 w-4" />;
        case "discord": return <SiDiscord className="h-4 w-4" />;
        default: return null;
      }
    };

    const getBadgeVariant = () => {
      switch (update.source) {
        case "twitter": return "default";
        case "blog": return "secondary";
        case "docs": return "outline";
        case "discord": return "default";
        default: return "default";
      }
    };

    return (
      <Card data-testid={`card-update-${update.id}`} className="hover-elevate">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {getIcon()}
              <div className="flex-1 min-w-0">
                {update.title && (
                  <CardTitle className="text-base mb-1">{update.title}</CardTitle>
                )}
                {update.authorName && (
                  <CardDescription className="text-sm">
                    {update.authorName}
                    {update.authorHandle && ` (@${update.authorHandle})`}
                  </CardDescription>
                )}
              </div>
            </div>
            <Badge variant={getBadgeVariant()} className="shrink-0">
              {update.source}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-4">
            {update.content}
          </p>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {formatDate(update.publishedAt)}
            </span>
            {update.url && (
              <a
                href={update.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-update-${update.id}`}
              >
                <Button variant="ghost" size="sm" className="gap-1">
                  View
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4" data-testid="text-updates-title">
            Latest Updates
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Stay informed with the latest community announcements from Discord, @gensynai updates, blog posts, and documentation.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => fetchMutation.mutate()}
              disabled={fetchMutation.isPending}
              data-testid="button-fetch-now"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${fetchMutation.isPending ? "animate-spin" : ""}`} />
              Fetch Now
            </Button>

            {statusData?.isRunning ? (
              <Button
                variant="outline"
                onClick={() => stopAutoFetchMutation.mutate()}
                disabled={stopAutoFetchMutation.isPending}
                data-testid="button-stop-auto-fetch"
                className="gap-2"
              >
                <Square className="h-4 w-4" />
                Stop Auto-Fetch
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => startAutoFetchMutation.mutate()}
                disabled={startAutoFetchMutation.isPending}
                data-testid="button-start-auto-fetch"
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Start Auto-Fetch
              </Button>
            )}

            {statusData?.isRunning && (
              <Badge variant="secondary" className="gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Auto-fetch active
              </Badge>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all" data-testid="tab-all">
              All ({updates.length})
            </TabsTrigger>
            <TabsTrigger value="discord" data-testid="tab-discord">
              <SiDiscord className="h-3 w-3 mr-1" />
              Discord ({discord.length})
            </TabsTrigger>
            <TabsTrigger value="twitter" data-testid="tab-twitter">
              <SiX className="h-3 w-3 mr-1" />
              Tweets ({tweets.length})
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              <FileText className="h-3 w-3 mr-1" />
              Blog ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="docs" data-testid="tab-docs">
              <BookOpen className="h-3 w-3 mr-1" />
              Docs ({docs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </>
            ) : updates.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground mb-4">
                    No updates fetched yet. Click "Fetch Now" to get the latest content.
                  </p>
                </CardContent>
              </Card>
            ) : (
              updates.map(update => <UpdateCard key={update.id} update={update} />)
            )}
          </TabsContent>

          <TabsContent value="discord" className="space-y-4">
            {discord.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">No Discord announcements available yet.</p>
                </CardContent>
              </Card>
            ) : (
              discord.map(update => <UpdateCard key={update.id} update={update} />)
            )}
          </TabsContent>

          <TabsContent value="twitter" className="space-y-4">
            {tweets.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">No tweets available yet.</p>
                </CardContent>
              </Card>
            ) : (
              tweets.map(update => <UpdateCard key={update.id} update={update} />)
            )}
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            {blogPosts.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">No blog posts available yet.</p>
                </CardContent>
              </Card>
            ) : (
              blogPosts.map(update => <UpdateCard key={update.id} update={update} />)
            )}
          </TabsContent>

          <TabsContent value="docs" className="space-y-4">
            {docs.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-muted-foreground">No documentation updates available yet.</p>
                </CardContent>
              </Card>
            ) : (
              docs.map(update => <UpdateCard key={update.id} update={update} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

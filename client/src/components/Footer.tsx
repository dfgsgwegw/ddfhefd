import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { SiDiscord, SiX, SiLinkedin } from "react-icons/si";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://www.gensyn.ai/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate active-elevate-2 inline-block px-1 py-0.5 rounded"
                  data-testid="link-careers"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://www.gensyn.ai/testnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate active-elevate-2 inline-block px-1 py-0.5 rounded"
                  data-testid="link-testnet"
                >
                  Testnet
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://docs.gensyn.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate active-elevate-2 inline-block px-1 py-0.5 rounded"
                  data-testid="link-docs"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="https://docs.gensyn.ai/litepaper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate active-elevate-2 inline-block px-1 py-0.5 rounded"
                  data-testid="link-litepaper"
                >
                  Litepaper
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/drive/folders/11yACMeNErMKPZoK4y1PMmUUfVcIHY3CS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate active-elevate-2 inline-block px-1 py-0.5 rounded"
                  data-testid="link-media-pack"
                >
                  Media Pack
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <div className="flex gap-2">
              <a
                href="https://discord.com/invite/gensyn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" data-testid="button-discord">
                  <SiDiscord className="h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://x.com/gensynai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" data-testid="button-twitter">
                  <SiX className="h-4 w-4" />
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/company/gensynai/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="icon" data-testid="button-linkedin">
                  <SiLinkedin className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="w-full"
                disabled={subscribeMutation.isPending}
                data-testid="button-newsletter-subscribe"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Gensyn © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

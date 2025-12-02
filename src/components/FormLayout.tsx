import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface FormLayoutProps {
  children: ReactNode;
  onSubmitAll?: () => void;
  onClearAll?: () => void;
}

export function FormLayout({ children, onSubmitAll, onClearAll }: FormLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-accent/10 transition-colors" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">Joyce Insurance Agency</h1>
                  <p className="text-sm text-muted-foreground">Complete your insurance forms</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {onClearAll && (
                  <Button
                    variant="outline"
                    onClick={onClearAll}
                    className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                  >
                    Clear All Forms
                  </Button>
                )}
                {onSubmitAll && (
                  <Button
                    onClick={onSubmitAll}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit All Forms
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm py-4">
            <div className="container mx-auto px-6 text-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Joyce Insurance Agency. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}

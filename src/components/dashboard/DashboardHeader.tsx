import { Heart, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-xl font-playfair font-bold text-foreground">
                Dreamskrin
              </h1>
              <p className="text-xs text-muted-foreground">Fraud Detection</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </Button>
            </div>
            
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2 pl-4 border-l border-border">
              <div className="w-8 h-8 bg-gradient-lavender rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Risk Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
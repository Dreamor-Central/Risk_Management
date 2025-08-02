import { TrendingUp, TrendingDown, AlertTriangle, Shield, Users, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Total Returns Today",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: Package,
      color: "primary"
    },
    {
      title: "High-Risk Accounts",
      value: "23",
      change: "+3 new",
      trend: "up",
      icon: AlertTriangle,
      color: "risk-high"
    },
    {
      title: "Manual Review Queue",
      value: "15",
      change: "-5 resolved",
      trend: "down",
      icon: Users,
      color: "risk-medium"
    },
    {
      title: "Blacklisted Customers",
      value: "8",
      change: "+2 blocked",
      trend: "up",
      icon: Shield,
      color: "destructive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "down" && stat.title.includes("Queue");
        
        return (
          <Card key={index} className="shadow-card hover:shadow-soft transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                stat.color === 'risk-high' ? 'bg-risk-high-bg text-risk-high' :
                stat.color === 'risk-medium' ? 'bg-risk-medium-bg text-risk-medium' :
                'bg-destructive/10 text-destructive'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground font-playfair">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-risk-low' : 'text-risk-high'}`} />
                ) : (
                  <TrendingDown className={`w-4 h-4 ${isPositive ? 'text-risk-low' : 'text-risk-high'}`} />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-risk-low' : 'text-risk-high'}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
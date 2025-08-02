import { MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const ChatbotAnalytics = () => {
  const chatStats = [
    {
      title: "Active Conversations",
      value: "12",
      change: "+3",
      trend: "up",
      icon: MessageSquare,
      color: "primary"
    },
    {
      title: "Flagged Chats",
      value: "4",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "risk-high"
    },
    {
      title: "Auto-Resolved",
      value: "89%",
      change: "+5%",
      trend: "up",
      icon: CheckCircle,
      color: "risk-low"
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      trend: "down",
      icon: Clock,
      color: "risk-medium"
    }
  ];

  const intentData = [
    { intent: "Return Request", count: 45, percentage: 35, risk: "medium" },
    { intent: "Size Exchange", count: 32, percentage: 25, risk: "low" },
    { intent: "Refund Request", count: 28, percentage: 22, risk: "high" },
    { intent: "Damage Report", count: 15, percentage: 12, risk: "medium" },
    { intent: "General Inquiry", count: 8, percentage: 6, risk: "low" }
  ];

  const flaggedPatterns = [
    {
      pattern: "Multiple returns same day",
      occurrences: 8,
      riskLevel: "high",
      description: "Customers requesting multiple returns within 24 hours"
    },
    {
      pattern: "Expensive item returns",
      occurrences: 12,
      riskLevel: "medium",
      description: "Returns for items above ₹5,000"
    },
    {
      pattern: "Repeated size exchanges",
      occurrences: 6,
      riskLevel: "medium",
      description: "Same customer exchanging sizes multiple times"
    },
    {
      pattern: "Urgent refund requests",
      occurrences: 4,
      riskLevel: "high",
      description: "Customers requesting immediate refunds"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-risk-high-bg text-risk-high border-risk-high/20";
      case "medium": return "bg-risk-medium-bg text-risk-medium border-risk-medium/20";
      case "low": return "bg-risk-low-bg text-risk-low border-risk-low/20";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Chatbot Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chatStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = (stat.trend === "up" && !stat.title.includes("Flagged")) ||
                           (stat.trend === "down" && stat.title.includes("Response Time"));
          
          return (
            <Card key={index} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    stat.color === 'primary' ? 'bg-primary/10 text-primary' :
                    stat.color === 'risk-high' ? 'bg-risk-high-bg text-risk-high' :
                    stat.color === 'risk-low' ? 'bg-risk-low-bg text-risk-low' :
                    'bg-risk-medium-bg text-risk-medium'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge className={`text-xs ${isPositive ? 'bg-risk-low-bg text-risk-low' : 'bg-risk-high-bg text-risk-high'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold font-playfair mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intent Analysis */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Chat Intent Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {intentData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.intent}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                      <Badge className={getRiskColor(item.risk)}>
                        {item.risk}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.percentage} className="flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Flagged Patterns */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span>Flagged Patterns</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedPatterns.map((pattern, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{pattern.pattern}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-muted text-xs">{pattern.occurrences}</Badge>
                      <Badge className={getRiskColor(pattern.riskLevel)}>
                        {pattern.riskLevel}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{pattern.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Escalations */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span>Recent Escalations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                time: "14:45",
                customer: "Priya Mehra (LOV9841)",
                reason: "5th return request this month",
                action: "Escalated to fraud team",
                risk: "high"
              },
              {
                time: "13:30",
                customer: "Rakesh Singh (LOV7832)",
                reason: "Requesting refund for expensive items",
                action: "Manual review required",
                risk: "medium"
              },
              {
                time: "12:15",
                customer: "Anita Gupta (LOV6421)",
                reason: "Suspicious return pattern detected",
                action: "Flagged for verification",
                risk: "medium"
              }
            ].map((escalation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{escalation.customer}</span>
                    <Badge className={getRiskColor(escalation.risk)}>
                      {escalation.risk}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{escalation.reason}</p>
                  <p className="text-xs text-primary">{escalation.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{escalation.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
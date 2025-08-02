import { MapPin, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const FraudHeatmap = () => {
  const cityData = [
    { city: "Mumbai", returns: 45, fraudScore: 78, amount: "₹1,24,000", risk: "high" },
    { city: "Delhi", returns: 38, fraudScore: 65, amount: "₹98,500", risk: "medium" },
    { city: "Bangalore", returns: 42, fraudScore: 82, amount: "₹1,15,000", risk: "high" },
    { city: "Chennai", returns: 22, fraudScore: 45, amount: "₹67,800", risk: "low" },
    { city: "Kolkata", returns: 31, fraudScore: 58, amount: "₹84,200", risk: "medium" },
    { city: "Pune", returns: 28, fraudScore: 72, amount: "₹76,500", risk: "high" },
    { city: "Hyderabad", returns: 25, fraudScore: 52, amount: "₹69,300", risk: "medium" },
    { city: "Ahmedabad", returns: 18, fraudScore: 38, amount: "₹52,100", risk: "low" }
  ];

  const trendData = [
    { metric: "Return Fraud Rate", value: "12.3%", change: "+2.1%", trend: "up", icon: TrendingUp },
    { metric: "Average Loss", value: "₹2,847", change: "-₹234", trend: "down", icon: DollarSign },
    { metric: "Detection Rate", value: "89.5%", change: "+3.2%", trend: "up", icon: AlertTriangle },
    { metric: "False Positives", value: "4.7%", change: "-1.8%", trend: "down", icon: AlertTriangle }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-risk-high-bg text-risk-high border-risk-high/20";
      case "medium": return "bg-risk-medium-bg text-risk-medium border-risk-medium/20";
      case "low": return "bg-risk-low-bg text-risk-low border-risk-low/20";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getIntensityOpacity = (fraudScore: number) => {
    if (fraudScore >= 70) return "opacity-100";
    if (fraudScore >= 50) return "opacity-75";
    if (fraudScore >= 30) return "opacity-50";
    return "opacity-25";
  };

  return (
    <div className="space-y-6">
      {/* Fraud Analytics Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Fraud Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendData.map((item, index) => {
              const Icon = item.icon;
              const isPositive = (item.trend === "up" && item.metric.includes("Detection")) ||
                               (item.trend === "down" && (item.metric.includes("Loss") || item.metric.includes("False")));
              
              return (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isPositive ? 'text-risk-low' : 'text-risk-high'}`} />
                  <p className="text-2xl font-bold font-playfair">{item.value}</p>
                  <p className="text-sm text-muted-foreground mb-1">{item.metric}</p>
                  <Badge className={`text-xs ${isPositive ? 'bg-risk-low-bg text-risk-low' : 'bg-risk-high-bg text-risk-high'}`}>
                    {item.change}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Geographic Heatmap */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Fraud Heatmap by City</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Heatmap Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {cityData.map((city, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                    city.risk === 'high' ? 'bg-gradient-risk-high border-risk-high/30' :
                    city.risk === 'medium' ? 'bg-gradient-risk-medium border-risk-medium/30' :
                    'bg-gradient-risk-low border-risk-low/30'
                  } ${getIntensityOpacity(city.fraudScore)}`}
                >
                  <div className="text-center">
                    <p className="font-bold text-white text-lg">{city.city}</p>
                    <p className="text-white/90 text-sm">{city.returns} returns</p>
                    <p className="text-white font-medium">{city.fraudScore}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed List */}
            <div className="space-y-3">
              {cityData
                .sort((a, b) => b.fraudScore - a.fraudScore)
                .map((city, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      city.risk === 'high' ? 'bg-risk-high' :
                      city.risk === 'medium' ? 'bg-risk-medium' :
                      'bg-risk-low'
                    }`} />
                    <div>
                      <p className="font-medium">{city.city}</p>
                      <p className="text-sm text-muted-foreground">{city.returns} total returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{city.amount}</p>
                      <p className="text-sm text-muted-foreground">Total value</p>
                    </div>
                    <Badge className={getRiskColor(city.risk)}>
                      {city.fraudScore}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-risk-low" />
                <span className="text-sm text-muted-foreground">Low Risk (0-40)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-risk-medium" />
                <span className="text-sm text-muted-foreground">Medium Risk (41-70)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-risk-high" />
                <span className="text-sm text-muted-foreground">High Risk (71+)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  RotateCcw, 
  Calendar, 
  AlertTriangle,
  Smartphone,
  TrendingUp,
  Camera
} from "lucide-react";

interface CustomerDetailProps {
  customerId: string;
}

export const CustomerDetail = ({ customerId }: CustomerDetailProps) => {
  // Mock customer data - would be fetched based on customerId
  const customer = {
    id: "9841",
    name: "Priya Mehra",
    email: "priya.lov@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    riskScore: 84,
    orderCount: 12,
    returnCount: 5,
    returnRate: 42,
    lastReturnDate: "2024-01-15",
    deviceId: "DFPR_7292",
    mlConfidence: 0.89,
    flags: ["Multiple mismatches", "Late returns", "Device sharing"],
    recentReturns: [
      { date: "2024-01-15", reason: "Size mismatch", amount: "₹2,400", status: "Approved" },
      { date: "2024-01-08", reason: "Color difference", amount: "₹1,800", status: "Under review" },
      { date: "2024-01-03", reason: "Damaged item", amount: "₹3,200", status: "Rejected" },
      { date: "2023-12-28", reason: "Wrong item", amount: "₹2,100", status: "Approved" },
      { date: "2023-12-15", reason: "Not as described", amount: "₹2,800", status: "Approved" }
    ]
  };

  const getRiskColor = (score: number) => {
    if (score < 41) return { bg: "bg-risk-low-bg", text: "text-risk-low", ring: "ring-risk-low/20" };
    if (score < 71) return { bg: "bg-risk-medium-bg", text: "text-risk-medium", ring: "ring-risk-medium/20" };
    return { bg: "bg-risk-high-bg", text: "text-risk-high", ring: "ring-risk-high/20" };
  };

  const riskColors = getRiskColor(customer.riskScore);

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-playfair">Customer Profile</CardTitle>
            <Badge className={`${riskColors.bg} ${riskColors.text} border ${riskColors.ring} px-3 py-1`}>
              Risk Score: {customer.riskScore}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{customer.address}</span>
              </div>
            </div>

            {/* Risk Meter */}
            <div className="space-y-4">
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full ${riskColors.bg} ${riskColors.text} border-4 ${riskColors.ring} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl font-bold font-playfair">{customer.riskScore}</span>
                </div>
                <p className="text-sm font-medium">Risk Assessment</p>
                <Progress value={customer.riskScore} className="mt-2" />
              </div>
              
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Device ID</p>
                  <p className="text-xs text-muted-foreground">{customer.deviceId}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-playfair">{customer.orderCount}</p>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <RotateCcw className="w-8 h-8 text-risk-medium mx-auto mb-2" />
            <p className="text-2xl font-bold font-playfair">{customer.returnCount}</p>
            <p className="text-sm text-muted-foreground">Returns</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-risk-high mx-auto mb-2" />
            <p className="text-2xl font-bold font-playfair">{customer.returnRate}%</p>
            <p className="text-sm text-muted-foreground">Return Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span>AI Fraud Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">ML Model Confidence</span>
              <Badge className="bg-primary/10 text-primary">
                {(customer.mlConfidence * 100).toFixed(1)}%
              </Badge>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Detected Patterns:</p>
              <div className="flex flex-wrap gap-2">
                {customer.flags.map((flag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-risk-high-bg rounded-lg">
              <Camera className="w-4 h-4 text-risk-high" />
              <span className="text-sm text-risk-high font-medium">
                Computer Vision: Item tampering detected in last return
              </span>
            </div>
            
            <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded-lg">
              <Camera className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Image Analysis: 2 return images pending verification
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Analysis History */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-primary" />
            <span>Return Image Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">2024-01-15 Return</span>
                  <Badge className="bg-risk-high-bg text-risk-high">REJECT</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Product tampering detected (89% confidence)</p>
                  <p>• Color mismatch: 65% variance from original</p>
                  <p>• Authenticity score: 72%</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">2024-01-08 Return</span>
                  <Badge className="bg-risk-medium-bg text-risk-medium">REVIEW</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Classification confidence: 76%</p>
                  <p>• Minor wear detected</p>
                  <p>• Authenticity score: 94%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Returns */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Recent Return History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customer.recentReturns.map((returnItem, index) => (
              <div key={index}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{returnItem.date}</span>
                      <Badge 
                        variant={returnItem.status === 'Approved' ? 'default' : 
                                returnItem.status === 'Rejected' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {returnItem.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{returnItem.reason}</p>
                  </div>
                  <span className="text-sm font-medium">{returnItem.amount}</span>
                </div>
                {index < customer.recentReturns.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
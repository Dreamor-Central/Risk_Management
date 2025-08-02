import { useState } from "react";
import { Settings, Save, RotateCcw, AlertCircle, Clock, Ban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export const PolicyPanel = () => {
  const [policies, setPolicies] = useState({
    maxReturnsPerMonth: 5,
    highRiskThreshold: 70,
    autoBlockThreshold: 90,
    reviewQueueThreshold: 60,
    enableMLScoring: true,
    enableImageAnalysis: true,
    autoApproveBelow: 40,
    blacklistDuration: 30
  });

  const [auditLogs] = useState([
    {
      timestamp: "2024-01-15 14:30",
      action: "Customer Blocked",
      user: "Admin",
      target: "9841 - Priya Mehra",
      reason: "Risk score exceeded threshold (84)"
    },
    {
      timestamp: "2024-01-15 13:15",
      action: "Policy Updated",
      user: "Risk Manager",
      target: "High Risk Threshold",
      reason: "Changed from 75 to 70"
    },
    {
      timestamp: "2024-01-15 11:45",
      action: "Return Approved",
      user: "AI System",
      target: "7632 - Anita Sharma",
      reason: "Low risk score (35)"
    },
    {
      timestamp: "2024-01-15 10:20",
      action: "Customer Flagged",
      user: "ML Model",
      target: "5421 - Ravi Kumar",
      reason: "Suspicious return pattern detected"
    }
  ]);

  const handlePolicyChange = (key: string, value: number | boolean) => {
    setPolicies(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save policies logic
    console.log("Policies saved:", policies);
  };

  const handleReset = () => {
    setPolicies({
      maxReturnsPerMonth: 5,
      highRiskThreshold: 70,
      autoBlockThreshold: 90,
      reviewQueueThreshold: 60,
      enableMLScoring: true,
      enableImageAnalysis: true,
      autoApproveBelow: 40,
      blacklistDuration: 30
    });
  };

  return (
    <div className="space-y-6">
      {/* Policy Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Policy Configuration</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSave} className="bg-gradient-lovable hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Return Thresholds */}
          <div>
            <h3 className="text-lg font-medium mb-4">Return Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxReturns">Max Returns per Month</Label>
                <Input
                  id="maxReturns"
                  type="number"
                  value={policies.maxReturnsPerMonth}
                  onChange={(e) => handlePolicyChange('maxReturnsPerMonth', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Customers exceeding this limit will be flagged
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="blacklistDuration">Blacklist Duration (days)</Label>
                <Input
                  id="blacklistDuration"
                  type="number"
                  value={policies.blacklistDuration}
                  onChange={(e) => handlePolicyChange('blacklistDuration', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  How long customers remain blocked
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Risk Score Thresholds */}
          <div>
            <h3 className="text-lg font-medium mb-4">Risk Score Thresholds</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="autoApprove">Auto-Approve Below</Label>
                <Input
                  id="autoApprove"
                  type="number"
                  value={policies.autoApproveBelow}
                  onChange={(e) => handlePolicyChange('autoApproveBelow', parseInt(e.target.value))}
                />
                <Badge className="bg-risk-low-bg text-risk-low text-xs">Low Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reviewQueue">Review Queue Above</Label>
                <Input
                  id="reviewQueue"
                  type="number"
                  value={policies.reviewQueueThreshold}
                  onChange={(e) => handlePolicyChange('reviewQueueThreshold', parseInt(e.target.value))}
                />
                <Badge className="bg-risk-medium-bg text-risk-medium text-xs">Medium Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="highRisk">High Risk Above</Label>
                <Input
                  id="highRisk"
                  type="number"
                  value={policies.highRiskThreshold}
                  onChange={(e) => handlePolicyChange('highRiskThreshold', parseInt(e.target.value))}
                />
                <Badge className="bg-risk-high-bg text-risk-high text-xs">High Risk</Badge>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="autoBlock">Auto-Block Above</Label>
                <Input
                  id="autoBlock"
                  type="number"
                  value={policies.autoBlockThreshold}
                  onChange={(e) => handlePolicyChange('autoBlockThreshold', parseInt(e.target.value))}
                />
                <Badge className="bg-destructive/10 text-destructive text-xs">Auto-Block</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* AI Features */}
          <div>
            <h3 className="text-lg font-medium mb-4">AI Features</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable ML Risk Scoring</Label>
                  <p className="text-xs text-muted-foreground">
                    Use machine learning to calculate customer risk scores
                  </p>
                </div>
                <Switch
                  checked={policies.enableMLScoring}
                  onCheckedChange={(checked) => handlePolicyChange('enableMLScoring', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Enable Image Analysis</Label>
                  <p className="text-xs text-muted-foreground">
                    Use computer vision to detect product tampering
                  </p>
                </div>
                <Switch
                  checked={policies.enableImageAnalysis}
                  onCheckedChange={(checked) => handlePolicyChange('enableImageAnalysis', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Audit Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLogs.map((log, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {log.action.includes('Blocked') && <Ban className="w-4 h-4 text-destructive" />}
                  {log.action.includes('Policy') && <Settings className="w-4 h-4 text-primary" />}
                  {log.action.includes('Approved') && <Badge className="w-4 h-4 text-risk-low" />}
                  {log.action.includes('Flagged') && <AlertCircle className="w-4 h-4 text-risk-high" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.target}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {log.reason} • by {log.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
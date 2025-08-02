import { useState } from "react";
import { AlertTriangle, Eye, Ban, Flag, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FlaggedCustomer {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  returnCount: number;
  flagReason: string;
  status: string;
  lastActivity: string;
  amount: string;
}

export const FlaggedCustomers = () => {
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const flaggedCustomers: FlaggedCustomer[] = [
    {
      id: "9841",
      name: "Priya Mehra",
      email: "priya.lov@example.com",
      riskScore: 84,
      returnCount: 5,
      flagReason: "Multiple mismatches",
      status: "Under Review",
      lastActivity: "2024-01-15",
      amount: "₹12,300"
    },
    {
      id: "7832",
      name: "Rakesh Singh",
      email: "rakesh.singh@example.com",
      riskScore: 92,
      returnCount: 8,
      flagReason: "Device sharing",
      status: "Blocked",
      lastActivity: "2024-01-14",
      amount: "₹18,400"
    },
    {
      id: "6421",
      name: "Anita Gupta",
      email: "anita.gupta@example.com",
      riskScore: 76,
      returnCount: 6,
      flagReason: "Late returns pattern",
      status: "Warned",
      lastActivity: "2024-01-13",
      amount: "₹9,800"
    },
    {
      id: "5234",
      name: "Suresh Kumar",
      email: "suresh.k@example.com",
      riskScore: 88,
      returnCount: 7,
      flagReason: "Item tampering",
      status: "Escalated",
      lastActivity: "2024-01-12",
      amount: "₹15,600"
    }
  ];

  const getRiskBadge = (score: number) => {
    if (score < 41) return { color: "bg-risk-low-bg text-risk-low border-risk-low/20", label: "Low" };
    if (score < 71) return { color: "bg-risk-medium-bg text-risk-medium border-risk-medium/20", label: "Medium" };
    return { color: "bg-risk-high-bg text-risk-high border-risk-high/20", label: "High" };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Blocked": return "bg-red-100 text-red-800 border-red-200";
      case "Warned": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Escalated": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredCustomers = flaggedCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === "all" || 
                       (filterRisk === "high" && customer.riskScore >= 71) ||
                       (filterRisk === "medium" && customer.riskScore >= 41 && customer.riskScore < 71) ||
                       (filterRisk === "low" && customer.riskScore < 41);
    
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus;
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Flag className="w-5 h-5 text-primary" />
            <span>Flagged Customers</span>
          </CardTitle>
          <Badge className="bg-risk-high-bg text-risk-high">
            {filteredCustomers.length} flagged
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={filterRisk} onValueChange={setFilterRisk}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
              <SelectItem value="Warned">Warned</SelectItem>
              <SelectItem value="Escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Customer Table */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => {
            const riskBadge = getRiskBadge(customer.riskScore);
            const statusBadge = getStatusBadge(customer.status);
            
            return (
              <div key={customer.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-lavender rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={riskBadge.color}>
                      {customer.riskScore}
                    </Badge>
                    <Badge className={statusBadge}>
                      {customer.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Customer ID</p>
                    <p className="font-medium">{customer.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Returns</p>
                    <p className="font-medium">{customer.returnCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="font-medium">{customer.amount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Activity</p>
                    <p className="font-medium">{customer.lastActivity}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-risk-high" />
                    <span className="text-sm text-risk-high font-medium">{customer.flagReason}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="text-risk-high border-risk-high/20">
                      <Ban className="w-4 h-4 mr-1" />
                      Block
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No flagged customers found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
};
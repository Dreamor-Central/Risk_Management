import { useState } from "react";
import { Search, Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskScore: number;
  orderCount: number;
  returnCount: number;
}

interface CustomerSearchProps {
  onCustomerSelect: (customerId: string) => void;
}

export const CustomerSearch = ({ onCustomerSelect }: CustomerSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Customer[]>([]);

  // Mock customer data
  const mockCustomers: Customer[] = [
    {
      id: "LOV9841",
      name: "Priya Mehra",
      email: "priya.lov@example.com",
      phone: "+91 98765 43210",
      riskScore: 84,
      orderCount: 12,
      returnCount: 5
    },
    {
      id: "LOV7632",
      name: "Anita Sharma",
      email: "anita.sharma@email.com",
      phone: "+91 98765 43211",
      riskScore: 35,
      orderCount: 8,
      returnCount: 1
    },
    {
      id: "LOV5421",
      name: "Ravi Kumar",
      email: "ravi.kumar@example.com",
      phone: "+91 98765 43212",
      riskScore: 67,
      orderCount: 15,
      returnCount: 4
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = mockCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const getRiskBadge = (score: number) => {
    if (score < 41) return { color: "bg-risk-low-bg text-risk-low border-risk-low/20", label: "Low Risk" };
    if (score < 71) return { color: "bg-risk-medium-bg text-risk-medium border-risk-medium/20", label: "Medium Risk" };
    return { color: "bg-risk-high-bg text-risk-high border-risk-high/20", label: "High Risk" };
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-primary" />
          <span>Customer Search</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Search by name, email, or customer ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="bg-gradient-lovable hover:opacity-90">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {searchResults.map((customer) => {
              const riskBadge = getRiskBadge(customer.riskScore);
              return (
                <div
                  key={customer.id}
                  className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                  onClick={() => onCustomerSelect(customer.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{customer.name}</span>
                    </div>
                    <Badge className={riskBadge.color}>
                      {customer.riskScore}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="text-xs">
                      ID: {customer.id} • Orders: {customer.orderCount} • Returns: {customer.returnCount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {searchTerm && searchResults.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No customers found matching "{searchTerm}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};
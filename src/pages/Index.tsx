import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { CustomerSearch } from "@/components/customer/CustomerSearch";
import { CustomerDetail } from "@/components/customer/CustomerDetail";
import { FlaggedCustomers } from "@/components/customer/FlaggedCustomers";
import { PolicyPanel } from "@/components/policy/PolicyPanel";
import { FraudHeatmap } from "@/components/analytics/FraudHeatmap";
import { ImageVerification } from "@/components/returns/ImageVerification";
import { CustomerChatbot } from "@/components/chatbot/CustomerChatbot";
import { ChatbotAnalytics } from "@/components/chatbot/ChatbotAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background font-poppins">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Dashboard Overview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-foreground">
                Fraud Detection Dashboard
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                AI-powered risk management for Dreamskrin Fashion
              </p>
            </div>
          </div>
          
          <DashboardStats />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-card shadow-soft">
            <TabsTrigger value="overview" className="font-medium">Overview</TabsTrigger>
            <TabsTrigger value="customer-search" className="font-medium">Customer Search</TabsTrigger>
            <TabsTrigger value="flagged" className="font-medium">Flagged</TabsTrigger>
            <TabsTrigger value="chatbot" className="font-medium">Live Chat</TabsTrigger>
            <TabsTrigger value="image-verification" className="font-medium">Image AI</TabsTrigger>
            <TabsTrigger value="analytics" className="font-medium">Analytics</TabsTrigger>
            <TabsTrigger value="policy" className="font-medium">Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FraudHeatmap />
              <div className="space-y-4">
                <CustomerSearch onCustomerSelect={setSelectedCustomerId} />
                {selectedCustomerId && (
                  <CustomerDetail customerId={selectedCustomerId} />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customer-search" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1">
                <CustomerSearch onCustomerSelect={setSelectedCustomerId} />
              </div>
              <div className="xl:col-span-2">
                {selectedCustomerId ? (
                  <CustomerDetail customerId={selectedCustomerId} />
                ) : (
                  <div className="bg-card rounded-xl border shadow-card p-8 text-center">
                    <p className="text-muted-foreground">Select a customer to view details</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flagged">
            <FlaggedCustomers />
          </TabsContent>

          <TabsContent value="chatbot">
            <div className="space-y-6">
              <CustomerChatbot />
              <ChatbotAnalytics />
            </div>
          </TabsContent>

          <TabsContent value="image-verification">
            <ImageVerification />
          </TabsContent>

          <TabsContent value="analytics">
            <FraudHeatmap />
          </TabsContent>

          <TabsContent value="policy">
            <PolicyPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

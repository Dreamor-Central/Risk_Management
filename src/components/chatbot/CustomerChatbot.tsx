import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Package, RotateCcw, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  metadata?: {
    intent?: string;
    confidence?: number;
    flagged?: boolean;
    orderRef?: string;
  };
}

interface ChatSession {
  sessionId: string;
  customerId: string;
  customerName: string;
  status: 'active' | 'resolved' | 'escalated' | 'flagged';
  startTime: string;
  lastActivity: string;
  riskScore: number;
  messages: ChatMessage[];
  summary: string;
}

export const CustomerChatbot = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat sessions data
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      sessionId: "CHAT001",
      customerId: "LOV9841",
      customerName: "Priya Mehra",
      status: "flagged",
      startTime: "2024-01-15 14:30",
      lastActivity: "2024-01-15 14:45",
      riskScore: 85,
      summary: "Multiple return requests for expensive items",
      messages: [
        {
          id: "1",
          type: "user",
          message: "Hi, I want to return the designer dress I bought yesterday. It doesn't fit properly.",
          timestamp: "14:30",
          metadata: { intent: "return_request", confidence: 0.95 }
        },
        {
          id: "2",
          type: "bot",
          message: "Hello! I'd be happy to help you with your return. Can you please provide your order number?",
          timestamp: "14:31"
        },
        {
          id: "3",
          type: "user",
          message: "ORD12345",
          timestamp: "14:32",
          metadata: { orderRef: "ORD12345" }
        },
        {
          id: "4",
          type: "bot",
          message: "I see this is your 5th return this month. For quality assurance, this return will need management approval. You'll receive an email within 24 hours.",
          timestamp: "14:33",
          metadata: { flagged: true }
        }
      ]
    },
    {
      sessionId: "CHAT002",
      customerId: "LOV7632",
      customerName: "Anita Sharma",
      status: "active",
      startTime: "2024-01-15 15:00",
      lastActivity: "2024-01-15 15:10",
      riskScore: 25,
      summary: "Size exchange request",
      messages: [
        {
          id: "1",
          type: "user",
          message: "Hello, I need to exchange a top for a different size",
          timestamp: "15:00",
          metadata: { intent: "size_exchange", confidence: 0.92 }
        },
        {
          id: "2",
          type: "bot",
          message: "I can help you with that! What's your order number and what size would you like to exchange to?",
          timestamp: "15:01"
        },
        {
          id: "3",
          type: "user",
          message: "Order ORD67890, I need size M instead of S",
          timestamp: "15:02",
          metadata: { orderRef: "ORD67890" }
        },
        {
          id: "4",
          type: "bot",
          message: "Perfect! I've initiated the size exchange for you. You'll receive a prepaid return label via email, and we'll send the size M once we receive the returned item.",
          timestamp: "15:03"
        }
      ]
    }
  ]);

  const activeSession = chatSessions.find(session => session.sessionId === activeChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  const sendMessage = async () => {
    if (!message.trim() || !activeSession) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
      metadata: {
        intent: detectIntent(message),
        confidence: Math.random() * 0.3 + 0.7 // Mock confidence
      }
    };

    // Update chat session with user message
    setChatSessions(prev => prev.map(session => 
      session.sessionId === activeChat 
        ? { ...session, messages: [...session.messages, newUserMessage] }
        : session
    ));

    setMessage("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message, activeSession);
      setChatSessions(prev => prev.map(session => 
        session.sessionId === activeChat 
          ? { ...session, messages: [...session.messages, botResponse] }
          : session
      ));
      setIsTyping(false);
    }, 1500);
  };

  const detectIntent = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('return')) return 'return_request';
    if (lowerMessage.includes('exchange')) return 'exchange_request';
    if (lowerMessage.includes('size')) return 'size_issue';
    if (lowerMessage.includes('refund')) return 'refund_request';
    if (lowerMessage.includes('damaged')) return 'damage_report';
    return 'general_inquiry';
  };

  const generateBotResponse = (userMessage: string, session: ChatSession): ChatMessage => {
    const intent = detectIntent(userMessage);
    let response = "";
    let flagged = false;

    // Check for fraud patterns
    if (session.riskScore > 70) {
      flagged = true;
      response = "I understand your request. Due to our quality assurance process, this request will be reviewed by our team within 24 hours. You'll receive an email update soon.";
    } else {
      switch (intent) {
        case 'return_request':
          response = "I can help you with your return. Please provide your order number and the reason for return.";
          break;
        case 'exchange_request':
          response = "I'd be happy to help with your exchange. What would you like to exchange and what's your order number?";
          break;
        case 'size_issue':
          response = "Size exchanges are easy! Please share your order number and the size you'd prefer.";
          break;
        case 'refund_request':
          response = "I can assist with your refund request. Please provide your order details.";
          break;
        case 'damage_report':
          response = "I'm sorry to hear about the damage. Please share photos if possible and your order number for a quick resolution.";
          break;
        default:
          response = "How can I help you today? I can assist with returns, exchanges, and order inquiries.";
      }
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      message: response,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5),
      metadata: { flagged }
    };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return "bg-green-100 text-green-800 border-green-200";
      case 'resolved': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'escalated': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'flagged': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskBadge = (score: number) => {
    if (score < 41) return { color: "bg-risk-low-bg text-risk-low border-risk-low/20", label: "Low" };
    if (score < 71) return { color: "bg-risk-medium-bg text-risk-medium border-risk-medium/20", label: "Medium" };
    return { color: "bg-risk-high-bg text-risk-high border-risk-high/20", label: "High" };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat Sessions List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-primary" />
            <span>Active Chats</span>
            <Badge className="bg-primary/10 text-primary">
              {chatSessions.filter(s => s.status === 'active').length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {chatSessions.map((session) => {
                const riskBadge = getRiskBadge(session.riskScore);
                return (
                  <div
                    key={session.sessionId}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                      activeChat === session.sessionId ? 'bg-accent border-primary' : ''
                    }`}
                    onClick={() => setActiveChat(session.sessionId)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{session.customerName}</span>
                      <Badge className={getStatusBadge(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{session.sessionId}</span>
                      <Badge className={riskBadge.color}>
                        {session.riskScore}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {session.summary}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last: {session.lastActivity}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="shadow-card h-full flex flex-col">
          {activeSession ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-lavender rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{activeSession.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {activeSession.customerId} • Started {activeSession.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskBadge(activeSession.riskScore).color}>
                      Risk: {activeSession.riskScore}
                    </Badge>
                    <Badge className={getStatusBadge(activeSession.status)}>
                      {activeSession.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <Separator />

              {/* Messages */}
              <CardContent className="flex-1 p-4">
                <ScrollArea className="h-[350px] pr-4">
                  <div className="space-y-4">
                    {activeSession.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              msg.type === 'user'
                                ? 'bg-gradient-lovable text-white'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            {msg.metadata?.flagged && (
                              <div className="flex items-center space-x-1 mt-2">
                                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400">Flagged for review</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                            {msg.metadata?.intent && (
                              <Badge variant="outline" className="text-xs">
                                {msg.metadata.intent}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' ? 'order-1 ml-2 bg-gradient-lavender' : 'order-2 mr-2 bg-primary/10'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div className="bg-muted p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!message.trim() || isTyping}
                    className="bg-gradient-lovable hover:opacity-90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Lovable Customer Support</p>
                <p className="text-muted-foreground">Select a chat session to view conversation</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
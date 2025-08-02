import { useState, useCallback } from "react";
import { Camera, Upload, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { loadImage, analyzeReturnImage, ImageAnalysisResult } from "@/lib/imageAnalysis";
import { useToast } from "@/hooks/use-toast";

interface ReturnRequest {
  id: string;
  customerId: string;
  customerName: string;
  productName: string;
  orderDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  amount: string;
  images: string[];
  aiAnalysis?: ImageAnalysisResult;
  reviewNotes?: string;
}

export const ImageVerification = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const { toast } = useToast();

  // Mock return requests data
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([
    {
      id: "RET001",
      customerId: "LOV9841",
      customerName: "Priya Mehra",
      productName: "Floral Summer Dress",
      orderDate: "2024-01-10",
      reason: "Size too small",
      status: "pending",
      amount: "₹2,400",
      images: ["dress1.jpg", "dress2.jpg"]
    },
    {
      id: "RET002",
      customerId: "LOV7632",
      customerName: "Anita Sharma",
      productName: "Designer Handbag",
      orderDate: "2024-01-08",
      reason: "Color different from website",
      status: "under_review",
      amount: "₹4,500",
      images: ["bag1.jpg"],
      aiAnalysis: {
        confidence: 0.89,
        classification: "handbag, pocketbook, purse",
        recommendation: "review",
        reasons: ["Color variance detected"],
        damageDetected: false,
        authenticity: 0.95
      }
    }
  ]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysisResult(null);
    }
  }, []);

  const handleAnalyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      const imageElement = await loadImage(selectedFile);
      const result = await analyzeReturnImage(imageElement);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete",
        description: `Recommendation: ${result.recommendation.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReturnDecision = (requestId: string, decision: 'approved' | 'rejected', notes?: string) => {
    setReturnRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: decision, reviewNotes: notes }
        : req
    ));
    
    toast({
      title: `Return ${decision.toUpperCase()}`,
      description: `Request ${requestId} has been ${decision}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'approved': return "bg-green-100 text-green-800 border-green-200";
      case 'rejected': return "bg-red-100 text-red-800 border-red-200";
      case 'under_review': return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'approve': return <CheckCircle className="w-5 h-5 text-risk-low" />;
      case 'reject': return <XCircle className="w-5 h-5 text-risk-high" />;
      case 'review': return <AlertTriangle className="w-5 h-5 text-risk-medium" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload & Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-primary" />
            <span>AI Image Verification</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-lovable rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium mb-2">Upload Return Image</p>
                <p className="text-muted-foreground mb-4">
                  Upload customer return images for AI-powered verification
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button className="bg-gradient-lovable hover:opacity-90" asChild>
                    <span>Choose Image</span>
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Analysis */}
          {previewUrl && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div className="space-y-4">
                <h3 className="font-medium">Image Preview</h3>
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Return item preview" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <Button 
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-lovable hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </div>

              {/* Analysis Results */}
              {analysisResult && (
                <div className="space-y-4">
                  <h3 className="font-medium">AI Analysis Results</h3>
                  <div className="space-y-4 p-4 border rounded-lg bg-accent/30">
                    {/* Recommendation */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recommendation</span>
                      <div className="flex items-center space-x-2">
                        {getRecommendationIcon(analysisResult.recommendation)}
                        <Badge className={
                          analysisResult.recommendation === 'approve' ? 'bg-risk-low-bg text-risk-low' :
                          analysisResult.recommendation === 'reject' ? 'bg-risk-high-bg text-risk-high' :
                          'bg-risk-medium-bg text-risk-medium'
                        }>
                          {analysisResult.recommendation.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Confidence</span>
                        <span className="text-sm font-medium">
                          {(analysisResult.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={analysisResult.confidence * 100} />
                    </div>

                    {/* Classification */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Classification</span>
                      <span className="text-sm font-medium">{analysisResult.classification}</span>
                    </div>

                    {/* Authenticity */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Authenticity</span>
                        <span className="text-sm font-medium">
                          {(analysisResult.authenticity * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={analysisResult.authenticity * 100} />
                    </div>

                    {/* Damage Detection */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Damage Detected</span>
                      <Badge className={analysisResult.damageDetected ? 'bg-risk-high-bg text-risk-high' : 'bg-risk-low-bg text-risk-low'}>
                        {analysisResult.damageDetected ? 'Yes' : 'No'}
                      </Badge>
                    </div>

                    {/* Reasons */}
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Analysis Notes</span>
                      <div className="space-y-1">
                        {analysisResult.reasons.map((reason, index) => (
                          <div key={index} className="text-xs p-2 bg-background rounded border">
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Return Requests Queue */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span>Return Requests Queue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {returnRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-4">
                {/* Request Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{request.id}</span>
                      <Badge className={getStatusBadge(request.status)}>
                        {request.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.customerName} • {request.productName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{request.amount}</p>
                    <p className="text-sm text-muted-foreground">{request.orderDate}</p>
                  </div>
                </div>

                {/* Return Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Return Reason</p>
                    <p className="font-medium">{request.reason}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Images Submitted</p>
                    <p className="font-medium">{request.images.length} image(s)</p>
                  </div>
                </div>

                {/* AI Analysis Results */}
                {request.aiAnalysis && (
                  <div className="p-3 bg-accent/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">AI Analysis</span>
                      <div className="flex items-center space-x-2">
                        {getRecommendationIcon(request.aiAnalysis.recommendation)}
                        <Badge className={
                          request.aiAnalysis.recommendation === 'approve' ? 'bg-risk-low-bg text-risk-low' :
                          request.aiAnalysis.recommendation === 'reject' ? 'bg-risk-high-bg text-risk-high' :
                          'bg-risk-medium-bg text-risk-medium'
                        }>
                          {request.aiAnalysis.recommendation.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Confidence: {(request.aiAnalysis.confidence * 100).toFixed(1)}%</p>
                      <p>Authenticity: {(request.aiAnalysis.authenticity * 100).toFixed(1)}%</p>
                      <p>Reasons: {request.aiAnalysis.reasons.join(', ')}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {request.status === 'pending' || request.status === 'under_review' ? (
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="bg-risk-low hover:bg-risk-low/90"
                      onClick={() => handleReturnDecision(request.id, 'approved', 'Approved after review')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-risk-high text-risk-high hover:bg-risk-high-bg"
                      onClick={() => handleReturnDecision(request.id, 'rejected', 'Rejected due to policy violation')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Status:</strong> {request.status.replace('_', ' ').toUpperCase()}
                      {request.reviewNotes && (
                        <span> • Notes: {request.reviewNotes}</span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
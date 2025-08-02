import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js for browser use
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export interface ImageAnalysisResult {
  confidence: number;
  classification: string;
  recommendation: 'approve' | 'reject' | 'review';
  reasons: string[];
  damageDetected: boolean;
  authenticity: number;
}

export const analyzeReturnImage = async (imageElement: HTMLImageElement): Promise<ImageAnalysisResult> => {
  try {
    console.log('Starting image analysis for return verification...');
    
    // Create image classifier
    const classifier = await pipeline(
      'image-classification',
      'Xenova/vit-base-patch16-224',
      { device: 'webgpu' }
    );
    
    // Convert image to canvas for processing
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    resizeImageIfNeeded(canvas, ctx, imageElement);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    // Classify the image
    const result = await classifier(imageData);
    console.log('Classification result:', result);
    
    // Mock advanced analysis (in real implementation, this would use specialized models)
    const mockAnalysis = analyzeFashionItem(result);
    
    return mockAnalysis;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

// Mock fashion item analysis - in production this would use specialized models
function analyzeFashionItem(classificationResult: any[]): ImageAnalysisResult {
  const topResult = classificationResult[0];
  const confidence = topResult.score;
  
  // Mock damage detection logic
  const damageKeywords = ['damaged', 'torn', 'stained', 'broken', 'worn'];
  const damageDetected = damageKeywords.some(keyword => 
    topResult.label.toLowerCase().includes(keyword)
  );
  
  // Mock authenticity scoring
  const authenticity = Math.random() * 0.3 + 0.7; // 70-100%
  
  // Generate recommendations based on analysis
  let recommendation: 'approve' | 'reject' | 'review' = 'approve';
  const reasons: string[] = [];
  
  if (confidence < 0.6) {
    recommendation = 'review';
    reasons.push('Low classification confidence');
  }
  
  if (damageDetected) {
    recommendation = 'reject';
    reasons.push('Visible damage detected');
  }
  
  if (authenticity < 0.8) {
    recommendation = 'review';
    reasons.push('Authenticity concerns');
  }
  
  // Fashion-specific checks
  const fashionItems = ['shirt', 'dress', 'pants', 'shoe', 'bag', 'jacket'];
  const isFashionItem = fashionItems.some(item => 
    topResult.label.toLowerCase().includes(item)
  );
  
  if (!isFashionItem) {
    recommendation = 'review';
    reasons.push('Item category mismatch');
  }
  
  if (reasons.length === 0) {
    reasons.push('No issues detected');
  }
  
  return {
    confidence,
    classification: topResult.label,
    recommendation,
    reasons,
    damageDetected,
    authenticity
  };
}
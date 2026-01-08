import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Check } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" }).max(255);

interface EmailCaptureProps {
  primaryCategory: string;
  scores: { category: string; score: number; percentile: number }[];
}

export function EmailCapture({ primaryCategory, scores }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call - replace with actual backend integration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log the data that would be sent (placeholder for actual implementation)
    console.log('Email submission:', {
      email: result.data,
      primaryCategory,
      scores,
      timestamp: new Date().toISOString()
    });
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success('Results sent to your email!');
  };
  
  if (isSubmitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <Check className="h-6 w-6 text-primary" />
          </div>
        </div>
        <p className="font-medium">Results sent!</p>
        <p className="text-sm text-muted-foreground">Check your inbox for your bottleneck profile and resources.</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-muted p-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-medium">Get results + resources emailed to you</h4>
          <p className="text-sm text-muted-foreground">We'll email your profile and send you targeted resources</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          maxLength={255}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Results'}
        </Button>
      </form>
    </div>
  );
}

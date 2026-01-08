import { Button } from '@/components/ui/button';
import { ArrowRight, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Target className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          The Bottleneck Audit
        </h1>
        
        <p className="mb-6 text-xl text-muted-foreground">
          Discover why you're stuck in 2 minutes
        </p>
        
        <p className="mb-10 text-muted-foreground">
          Every founder has a core constraint limiting their growth. This quick diagnostic reveals whether you're facing a <span className="font-medium text-tactical">Tactical</span>, <span className="font-medium text-psychological">Psychological</span>, or <span className="font-medium text-systemic">Systemic</span> bottleneck—and what to do about it.
        </p>
        
        <Button 
          size="lg" 
          onClick={onStart}
          className="group gap-2 px-8 py-6 text-lg"
        >
          Start Audit
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <p className="mt-6 text-sm text-muted-foreground">
          9 questions • Takes about 2 minutes
        </p>
      </div>
    </div>
  );
}

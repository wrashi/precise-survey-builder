import { Button } from '@/components/ui/button';
import { ScoreCard } from './ScoreCard';
import { ShareButtons } from './ShareButtons';
import { EmailCapture } from './EmailCapture';
import { 
  CategoryScore, 
  BottleneckCategory,
  CATEGORY_LABELS,
  BOTTLENECK_PROFILES,
  generateInterpretation 
} from '@/lib/surveyData';
import { cn } from '@/lib/utils';
import { RefreshCw, ExternalLink, Lightbulb } from 'lucide-react';

interface ResultsScreenProps {
  scores: CategoryScore[];
  onRetake: () => void;
}

const categoryButtonStyles: Record<BottleneckCategory, string> = {
  tactical: 'bg-tactical hover:bg-tactical/90 text-tactical-foreground',
  psychological: 'bg-psychological hover:bg-psychological/90 text-psychological-foreground',
  systemic: 'bg-systemic hover:bg-systemic/90 text-systemic-foreground'
};

export function ResultsScreen({ scores, onRetake }: ResultsScreenProps) {
  const primaryScore = scores[0];
  const secondaryScore = scores[1];
  const primaryProfile = BOTTLENECK_PROFILES[primaryScore.category];
  const interpretation = generateInterpretation(scores);
  
  // Determine secondary CTA based on which category is secondary
  const secondaryProfile = BOTTLENECK_PROFILES[secondaryScore.category];
  
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            Your Bottleneck Profile
          </h1>
          <p className="text-xl">
            Primary: <span className={cn(
              "font-bold",
              primaryScore.category === 'tactical' && 'text-tactical',
              primaryScore.category === 'psychological' && 'text-psychological',
              primaryScore.category === 'systemic' && 'text-systemic'
            )}>
              {CATEGORY_LABELS[primaryScore.category]}
            </span>
          </p>
        </div>
        
        {/* Score Cards */}
        <div className="mb-10 space-y-4">
          {scores.map((score, index) => (
            <ScoreCard key={score.category} score={score} rank={index + 1} />
          ))}
        </div>
        
        {/* Interpretation */}
        <div className="mb-10 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">What This Means</h3>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            {interpretation}
          </p>
          <p className="font-medium italic">
            "{primaryProfile.hook}"
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="mb-10 space-y-3">
          <h3 className="mb-4 text-lg font-semibold">Your Next Steps</h3>
          <Button 
            className={cn("w-full gap-2 py-6 text-base", categoryButtonStyles[primaryScore.category])}
            onClick={() => {
              // Placeholder URL - replace with actual links
              window.open('#decision-razor-guide', '_blank');
            }}
          >
            {primaryProfile.buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            className="w-full gap-2 py-6 text-base"
            onClick={() => {
              // Placeholder URL - replace with actual links
              window.open('#secondary-resource', '_blank');
            }}
          >
            {secondaryProfile.buttonLabel}
            <ExternalLink className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Replace these placeholder URLs with your actual resource links
          </p>
        </div>
        
        {/* Email Capture */}
        <div className="mb-10">
          <EmailCapture 
            primaryCategory={primaryScore.category} 
            scores={scores.map(s => ({ 
              category: s.category, 
              score: s.score, 
              percentile: s.percentile 
            }))} 
          />
        </div>
        
        {/* Share Section */}
        <div className="mb-10">
          <h3 className="mb-4 text-lg font-semibold">Share Your Results</h3>
          <ShareButtons primaryCategory={primaryScore.category} />
        </div>
        
        {/* Retake Button */}
        <div className="text-center">
          <Button variant="ghost" onClick={onRetake} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retake the Audit
          </Button>
        </div>
      </div>
    </div>
  );
}

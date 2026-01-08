import { CategoryScore, BottleneckCategory } from '@/lib/surveyData';
import { cn } from '@/lib/utils';
import { Trophy, Medal, Award } from 'lucide-react';

interface ScoreCardProps {
  score: CategoryScore;
  rank: number;
}

const rankIcons = {
  1: Trophy,
  2: Medal,
  3: Award
};

const categoryStyles: Record<BottleneckCategory, {
  bg: string;
  border: string;
  bar: string;
  text: string;
  badge: string;
}> = {
  tactical: {
    bg: 'bg-tactical/5',
    border: 'border-tactical/20',
    bar: 'bg-tactical',
    text: 'text-tactical',
    badge: 'bg-tactical text-tactical-foreground'
  },
  psychological: {
    bg: 'bg-psychological/5',
    border: 'border-psychological/20',
    bar: 'bg-psychological',
    text: 'text-psychological',
    badge: 'bg-psychological text-psychological-foreground'
  },
  systemic: {
    bg: 'bg-systemic/5',
    border: 'border-systemic/20',
    bar: 'bg-systemic',
    text: 'text-systemic',
    badge: 'bg-systemic text-systemic-foreground'
  }
};

export function ScoreCard({ score, rank }: ScoreCardProps) {
  const styles = categoryStyles[score.category];
  const Icon = rankIcons[rank as keyof typeof rankIcons];
  
  return (
    <div className={cn(
      "rounded-xl border-2 p-5 transition-all",
      styles.bg,
      styles.border,
      rank === 1 && "ring-2 ring-offset-2 ring-offset-background",
      rank === 1 && score.category === 'tactical' && "ring-tactical",
      rank === 1 && score.category === 'psychological' && "ring-psychological",
      rank === 1 && score.category === 'systemic' && "ring-systemic"
    )}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-lg p-2", styles.badge)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className={cn("text-lg font-bold", styles.text)}>
              {score.label}
            </h3>
            <p className="text-sm text-muted-foreground">
              {score.description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold">{score.score}</span>
          <span className="text-muted-foreground">/9</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
          <div 
            className={cn("h-full transition-all duration-500", styles.bar)}
            style={{ width: `${score.percentile}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className={cn("font-medium", styles.text)}>
            {score.percentile}% Intensity
          </span>
          <span className="text-muted-foreground">
            {rank === 1 ? 'Primary' : rank === 2 ? 'Secondary' : 'Tertiary'}
          </span>
        </div>
      </div>
    </div>
  );
}

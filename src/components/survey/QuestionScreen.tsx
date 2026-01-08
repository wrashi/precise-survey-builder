import { Button } from '@/components/ui/button';
import { ProgressBar } from './ProgressBar';
import { Question } from '@/lib/surveyData';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionScreenProps) {
  return (
    <div className="flex min-h-screen flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-xl">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>
      
      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <div className="w-full max-w-xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {question.title}
          </p>
          
          <h2 className="mb-8 text-2xl font-semibold leading-relaxed md:text-3xl">
            {question.text}
          </h2>
          
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.label}
                onClick={() => onSelect(option.value)}
                className={cn(
                  "w-full rounded-lg border-2 p-4 text-left transition-all",
                  "hover:border-primary hover:bg-primary/5",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "min-h-[56px]",
                  selectedValue === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start gap-4">
                  <span className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    selectedValue === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {option.label}
                  </span>
                  <span className="pt-1 text-base">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mx-auto flex w-full max-w-xl gap-3">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedValue === null}
          className="flex-1 gap-2"
        >
          {isLast ? 'See Results' : 'Next'}
          {!isLast && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

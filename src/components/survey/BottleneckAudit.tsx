import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { QuestionScreen } from './QuestionScreen';
import { ResultsScreen } from './ResultsScreen';
import { QUESTIONS, calculateScores, CategoryScore } from '@/lib/surveyData';

type Screen = 'welcome' | 'questions' | 'results';

export function BottleneckAudit() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [scores, setScores] = useState<CategoryScore[]>([]);
  
  const handleStart = () => {
    setCurrentScreen('questions');
  };
  
  const handleSelectAnswer = (value: number) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate scores and show results
      const calculatedScores = calculateScores(responses);
      setScores(calculatedScores);
      setCurrentScreen('results');
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleRetake = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setScores([]);
    setCurrentScreen('welcome');
  };
  
  if (currentScreen === 'welcome') {
    return <WelcomeScreen onStart={handleStart} />;
  }
  
  if (currentScreen === 'questions') {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const selectedValue = responses[currentQuestion.id] ?? null;
    
    return (
      <QuestionScreen
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={QUESTIONS.length}
        selectedValue={selectedValue}
        onSelect={handleSelectAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === QUESTIONS.length - 1}
      />
    );
  }
  
  return <ResultsScreen scores={scores} onRetake={handleRetake} />;
}

export type BottleneckCategory = 'tactical' | 'psychological' | 'systemic';

export interface Question {
  id: number;
  category: BottleneckCategory;
  title: string;
  text: string;
  options: {
    label: string;
    text: string;
    value: number;
  }[];
}

export interface CategoryScore {
  category: BottleneckCategory;
  score: number;
  percentile: number;
  label: string;
  description: string;
}

export interface BottleneckProfile {
  interpretation: string;
  hook: string;
  solutionPath: string;
  buttonLabel: string;
}

export const CATEGORY_LABELS: Record<BottleneckCategory, string> = {
  tactical: 'Tactical',
  psychological: 'Psychological',
  systemic: 'Systemic'
};

export const CATEGORY_SUBTITLES: Record<BottleneckCategory, string> = {
  tactical: 'Decision Paralysis',
  psychological: 'Self-Governance Failure',
  systemic: 'Leverage Limitation'
};

export const BOTTLENECK_PROFILES: Record<BottleneckCategory, BottleneckProfile> = {
  tactical: {
    interpretation: "You're drowning in low-value decisions. Every $10 decision costs you an hour of mental energy.",
    hook: "Stop wasting 10 hours/week on $10 decisions.",
    solutionPath: "The Decision Razor (Framework to kill low-value choices)",
    buttonLabel: "Get the Decision Razor Guide"
  },
  psychological: {
    interpretation: "Your decision-making drops in quality as the day progresses. Your 'Evening Self' sabotages your progress.",
    hook: "Stop firing your 'Evening Self'. Govern it instead.",
    solutionPath: "The Executive Protocol (Rules-based system for decision-making)",
    buttonLabel: "Learn About the Executive Protocol"
  },
  systemic: {
    interpretation: "You're the bottleneck. Your team can't move without you, and growth stalls when you take time off.",
    hook: "The moment growth accelerates is when you get out of your own way.",
    solutionPath: "The Founder Exit Strategy (Systems to scale past yourself)",
    buttonLabel: "Explore the Founder Exit Strategy"
  }
};

export const QUESTIONS: Question[] = [
  // TACTICAL (Q1-Q3)
  {
    id: 1,
    category: 'tactical',
    title: 'Decision Volume',
    text: 'On average, how many decisions do you personally make per day that affect your business?',
    options: [
      { label: 'A', text: '5–10 decisions', value: 1 },
      { label: 'B', text: '15–30 decisions', value: 2 },
      { label: 'C', text: '30+ decisions (I lose count)', value: 3 }
    ]
  },
  {
    id: 2,
    category: 'tactical',
    title: 'Decision Quality Mismatch',
    text: 'How much time do you spend deciding on things that cost <$100 or take <1 hour to implement?',
    options: [
      { label: 'A', text: 'Rarely—I delegate those', value: 1 },
      { label: 'B', text: 'Sometimes—maybe 20% of my day', value: 2 },
      { label: 'C', text: 'Constantly—it eats hours', value: 3 }
    ]
  },
  {
    id: 3,
    category: 'tactical',
    title: 'The "Maximizer" Flag',
    text: 'Which statement resonates most?',
    options: [
      { label: 'A', text: 'I trust my gut and move fast', value: 1 },
      { label: 'B', text: 'I gather data and weigh options (but usually decide)', value: 2 },
      { label: 'C', text: 'I overthink everything because the "wrong" decision haunts me', value: 3 }
    ]
  },
  // PSYCHOLOGICAL (Q4-Q6)
  {
    id: 4,
    category: 'psychological',
    title: 'The "Evening Self" Recognition',
    text: 'Do you notice your decision-making quality drops significantly after a certain time of day (afternoon/evening)?',
    options: [
      { label: 'A', text: "Not really—I'm consistent", value: 1 },
      { label: 'B', text: "A little—I get tired but still okay", value: 2 },
      { label: 'C', text: "Absolutely—by 5 PM, I'm making reactive, bad decisions", value: 3 }
    ]
  },
  {
    id: 5,
    category: 'psychological',
    title: 'Impulse Control Under Stress',
    text: 'When stressed, which is more true?',
    options: [
      { label: 'A', text: 'I get more disciplined (rise to the occasion)', value: 1 },
      { label: 'B', text: 'I stay about the same', value: 2 },
      { label: 'C', text: 'I sabotage myself (binge-eat, lose focus, make impulsive hires/fires)', value: 3 }
    ]
  },
  {
    id: 6,
    category: 'psychological',
    title: 'Rules vs. Willpower',
    text: 'Which approach works better for you?',
    options: [
      { label: 'A', text: 'Setting goals and relying on willpower', value: 1 },
      { label: 'B', text: 'A mix of both', value: 2 },
      { label: 'C', text: 'Strict rules/systems (I need external constraints to stay on track)', value: 3 }
    ]
  },
  // SYSTEMIC (Q7-Q9)
  {
    id: 7,
    category: 'systemic',
    title: 'The Approval Bottleneck',
    text: 'Does your team wait for your approval/input before moving forward on things?',
    options: [
      { label: 'A', text: "Rarely—they're empowered", value: 1 },
      { label: 'B', text: 'Sometimes—on important stuff', value: 2 },
      { label: 'C', text: 'Often—I seem to be the blocker on most decisions', value: 3 }
    ]
  },
  {
    id: 8,
    category: 'systemic',
    title: 'Delegation Anxiety',
    text: "When you think about delegating a key decision to someone on your team, what's your honest reaction?",
    options: [
      { label: 'A', text: 'Excited—they might do it better than me', value: 1 },
      { label: 'B', text: "Neutral—it's necessary", value: 2 },
      { label: 'C', text: "Anxious—I worry the quality will drop or they'll miss something", value: 3 }
    ]
  },
  {
    id: 9,
    category: 'systemic',
    title: 'Scale Ceiling',
    text: 'What statement feels most true right now?',
    options: [
      { label: 'A', text: "I'm not the constraint on growth", value: 1 },
      { label: 'B', text: 'I might become the constraint soon', value: 2 },
      { label: 'C', text: 'I already am the constraint—growth stalls when I take time off', value: 3 }
    ]
  }
];

export function calculateScores(responses: Record<number, number>): CategoryScore[] {
  const categories: BottleneckCategory[] = ['tactical', 'psychological', 'systemic'];
  
  return categories.map(category => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    const score = categoryQuestions.reduce((sum, q) => sum + (responses[q.id] || 0), 0);
    const percentile = Math.round(((score - 3) / 6) * 100);
    
    return {
      category,
      score,
      percentile: Math.max(0, Math.min(100, percentile)),
      label: CATEGORY_LABELS[category],
      description: CATEGORY_SUBTITLES[category]
    };
  }).sort((a, b) => b.score - a.score);
}

export function generateInterpretation(scores: CategoryScore[]): string {
  const primary = scores[0];
  const secondary = scores[1];
  
  let interpretation = BOTTLENECK_PROFILES[primary.category].interpretation;
  
  // Add combo interpretation if both primary and secondary are high
  if (primary.percentile >= 50 && secondary.percentile >= 50) {
    if (primary.category === 'tactical' && secondary.category === 'psychological') {
      interpretation += " You're drowning in low-value decisions AND sabotaging yourself under stress. This is a 1-2 punch.";
    } else if (primary.category === 'psychological' && secondary.category === 'tactical') {
      interpretation += " Your evening self makes poor choices, and you're already overwhelmed with decision volume. A dangerous combination.";
    } else if (primary.category === 'systemic' && secondary.category === 'tactical') {
      interpretation += " You're the approval bottleneck AND drowning in micro-decisions. Your team is waiting while you're stuck.";
    } else if (primary.category === 'systemic' && secondary.category === 'psychological') {
      interpretation += " You can't let go of control, and your energy crashes by end of day. Delegation feels impossible.";
    }
  }
  
  return interpretation;
}

export function generateShareText(primaryCategory: BottleneckCategory, platform: 'twitter' | 'linkedin' | 'email'): string {
  const bottleneckLabel = CATEGORY_LABELS[primaryCategory];
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  
  switch (platform) {
    case 'twitter':
      return `Just took the Bottleneck Audit. I'm a ${bottleneckLabel} bottleneck type. What's yours? ${url}`;
    case 'linkedin':
      return `Ran the Bottleneck Audit and discovered my primary constraint is ${bottleneckLabel}. Knowing what's blocking you is the first step. Take the audit here: ${url}`;
    case 'email':
      return `My Bottleneck Audit Results: ${bottleneckLabel}`;
  }
}

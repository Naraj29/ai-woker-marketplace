export type WorkerType = 'all' | 'teacher' | 'health' | 'therapist' | 'formatter';

export interface Worker {
  id: string;
  name: string;
  type: Exclude<WorkerType, 'all'>;
  tagline: string;
  description: string;
  hourlyRate: number;
  humanHourlyRate: number;
  rating: number;
  reviews: number;
  available: boolean;
  systemPrompt: string;
  capabilities: string[];
  sampleTopics: string[];
  icon: string;
  badge: string;
}

export const workers: Worker[] = [
  {
    id: 'teacher-1',
    name: 'Gemma Tech & Science Tutor',
    type: 'teacher',
    tagline: 'Master STEM, Coding & Mathematics in minutes',
    description: 'Expert AI educator specialized in Computer Science, Math, Physics, and Data Engineering. Provides step-by-step breakdowns, code walk-throughs, and interactive quiz sessions.',
    hourlyRate: 5,
    humanHourlyRate: 65,
    rating: 4.95,
    reviews: 482,
    available: true,
    systemPrompt: 'You are an elite STEM educator and tech mentor powered by Gemma. Provide clear, encouraging, step-by-step explanations with clean code examples and diagrams where helpful.',
    capabilities: [
      'Algorithm & Data Structure Tutoring',
      'Calculus, Linear Algebra & Physics',
      'System Architecture & Code Review',
      'Exam Preparation & Mock Interviews',
      'Personalized Learning Roadmap'
    ],
    sampleTopics: [
      'Explain Dynamic Programming simply with Python',
      'Help me solve a Calculus derivative step-by-step',
      'Design a scalable microservices database architecture'
    ],
    icon: '🎓',
    badge: 'Top Rated'
  },
  {
    id: 'health-1',
    name: 'Gemma Bio & Fitness Coach',
    type: 'health',
    tagline: 'Personalized Workout, Nutrition & Lifestyle Science',
    description: 'Certified AI Wellness & Bio-Fitness Specialist. Formulates custom workout regimes, macro-balanced meal plans, sleep optimization strategies, and recovery routines.',
    hourlyRate: 4,
    humanHourlyRate: 50,
    rating: 4.88,
    reviews: 329,
    available: true,
    systemPrompt: 'You are a certified health & bio-fitness coach powered by Gemma. Offer evidence-based advice for exercise, nutrition, and wellness. Include clear medical disclaimer.',
    capabilities: [
      'Customized Macro & Diet Planning',
      'Hypertrophy & Fat Loss Workouts',
      'Circadian Rhythm & Sleep Optimization',
      'Post-workout Recovery Protocols',
      'Habit Tracking & Bio-hacking'
    ],
    sampleTopics: [
      'Build me a 4-day workout split for muscle gain',
      'Calculate my daily macros for body recomposition',
      'How do I optimize deep sleep naturally?'
    ],
    icon: '🏃',
    badge: 'Popular'
  },
  {
    id: 'therapist-1',
    name: 'Gemma Mindful Counselor',
    type: 'therapist',
    tagline: 'Empathetic listening, CBT techniques & stress relief',
    description: 'Compassionate AI Mental Wellness Assistant. Offers a safe, non-judgmental space for emotional processing, CBT-based reframing, anxiety reduction, and mindfulness practices.',
    hourlyRate: 6,
    humanHourlyRate: 90,
    rating: 4.97,
    reviews: 614,
    available: true,
    systemPrompt: 'You are a compassionate, empathetic mental wellness counselor powered by Gemma. Create a warm, safe environment, offer evidence-based CBT reframing, and provide crisis hotlines if needed.',
    capabilities: [
      'Cognitive Behavioral Reframing',
      'Guided Breathing & Mindfulness',
      'Burnout & Work Stress Management',
      'Emotional Expression & Grounding',
      'Daily Positivity Check-ins'
    ],
    sampleTopics: [
      'I am feeling overwhelmed with work deadlines',
      'Guide me through a 5-minute grounding exercise',
      'How do I reframe anxious thoughts constructively?'
    ],
    icon: '🧠',
    badge: 'Highly Requested'
  },
  {
    id: 'formatter-1',
    name: 'Gemma Copy & Doc Architect',
    type: 'formatter',
    tagline: 'Transform draft text into publication-ready copy',
    description: 'Master AI Copy Editor & Document Specialist. Polishes grammar, elevates tone, formats executive pitch decks, rewrites resumes, and optimizes tech documentation.',
    hourlyRate: 3,
    humanHourlyRate: 40,
    rating: 4.85,
    reviews: 275,
    available: true,
    systemPrompt: 'You are an executive copywriter and document formatting architect powered by Gemma. Enhance clarity, tone, and grammar while retaining the author’s voice.',
    capabilities: [
      'Executive Tone Elevation',
      'Resume & Cover Letter Polishing',
      'Markdown & LaTeX Formatting',
      'Grammar & Syntax Correction',
      'SEO & Pitch Deck Copy Refinement'
    ],
    sampleTopics: [
      'Rewrite this email to sound professional and persuasive',
      'Format this raw text into a clean Markdown report',
      'Improve my resume bullet points for a Senior AI Engineer role'
    ],
    icon: '✍️',
    badge: 'Fast Response'
  }
];

export const getWorkerById = (id: string): Worker | undefined => {
  return workers.find(worker => worker.id === id);
};

export const getWorkersByType = (type: string): Worker[] => {
  return type === 'all' ? workers : workers.filter(worker => worker.type === type);
};

export const calculateSavings = (worker: Worker): number => {
  return Math.round(((worker.humanHourlyRate - worker.hourlyRate) / worker.humanHourlyRate) * 100);
};
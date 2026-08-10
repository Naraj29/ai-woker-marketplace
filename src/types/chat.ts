export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  workerId?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  currentWorkerId: string | null;
}
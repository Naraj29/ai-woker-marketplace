import type { Worker, WorkerType } from '../utils/workerData';

export type { Worker, WorkerType };

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  workerId?: string;
}

export interface RentalSession {
  id: string;
  workerId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in hours
  cost: number;
  messages: Message[];
  status: 'active' | 'completed' | 'cancelled';
}

export interface RentalOptions {
  duration: number; // in hours
  totalPrice: number;
}
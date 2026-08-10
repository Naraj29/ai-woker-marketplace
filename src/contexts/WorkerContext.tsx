import React, { createContext, useContext, useState } from 'react';
import { workerAPI } from '../api/workers';
import type { Worker } from '../utils/workerData';

interface RentalSession {
  sessionId: string;
  workerId: string;
  duration: number;
  cost: number;
  startTime: Date;
  endTime: Date;
  status: 'active' | 'completed' | 'cancelled';
}

interface WorkerContextType {
  workers: Worker[];
  currentSession: RentalSession | null;
  hireWorker: (workerId: string, duration: number) => Promise<RentalSession>;
  endSession: () => void;
  loading: boolean;
}

const WorkerContext = createContext<WorkerContextType | undefined>(undefined);

export const WorkerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [currentSession, setCurrentSession] = useState<RentalSession | null>(null);
  const [loading, setLoading] = useState(false);

  const loadWorkers = async () => {
    setLoading(true);
    try {
      const workersData = await workerAPI.getAllWorkers();
      setWorkers(workersData);
    } catch (error) {
      console.error('Failed to load workers:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadWorkers();
  }, []);

  const hireWorker = async (workerId: string, duration: number): Promise<RentalSession> => {
    setLoading(true);
    try {
      const session = await workerAPI.hireWorker(workerId, duration);
      setCurrentSession(session);
      return session;
    } catch (error) {
      console.error('Failed to hire worker:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const endSession = () => {
    setCurrentSession(null);
  };

  return (
    <WorkerContext.Provider value={{ workers, currentSession, hireWorker, endSession, loading }}>
      {children}
    </WorkerContext.Provider>
  );
};

export const useWorkers = () => {
  const context = useContext(WorkerContext);
  if (context === undefined) {
    throw new Error('useWorkers must be used within a WorkerProvider');
  }
  return context;
};
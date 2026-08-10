import { workers, getWorkerById, getWorkersByType, type Worker } from '../utils/workerData';

export const workerAPI = {
  getAllWorkers: async (): Promise<Worker[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return workers;
  },

  getWorkerById: async (id: string): Promise<Worker | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getWorkerById(id);
  },

  getWorkersByType: async (type: string): Promise<Worker[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getWorkersByType(type);
  },

  hireWorker: async (workerId: string, durationMinutes: number): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const worker = getWorkerById(workerId);
    if (!worker) {
      throw new Error('Worker not found');
    }
    
    return {
      sessionId: `session-${Date.now()}`,
      workerId,
      duration: durationMinutes,
      cost: Number(((worker.hourlyRate * durationMinutes) / 60).toFixed(2)),
      startTime: new Date(),
      endTime: new Date(Date.now() + durationMinutes * 60 * 1000),
      status: 'active'
    };
  }
};
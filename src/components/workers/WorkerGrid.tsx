import React from 'react';
import type { Worker } from '../../utils/workerData';
import { WorkerCard } from './WorkerCard';

interface WorkerGridProps {
  workers: Worker[];
  loading: boolean;
}

export const WorkerGrid: React.FC<WorkerGridProps> = ({ workers, loading }) => {
  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 20px', gap: 16,
      }}>
        <div style={{
          width: 48, height: 48,
          border: '3px solid rgba(99,102,241,0.2)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}></div>
        <p style={{ color: '#64748b', fontSize: 14, fontWeight: 600 }}>
          Connecting to Gemma Network...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div style={{
        background: 'rgba(18,20,42,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 22, padding: '60px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          No Specialists Found
        </h3>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          Try a different category or clear the search.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 24,
    }}>
      {workers.map(worker => (
        <WorkerCard key={worker.id} worker={worker} />
      ))}
    </div>
  );
};
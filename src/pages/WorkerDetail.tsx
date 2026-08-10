import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkers } from '../contexts/WorkerContext';
import { WorkerProfile } from '../components/workers/WorkerProfile';
import { ChatInterface } from '../components/chat/ChatInterface';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { AppLayout } from '../components/layout/AppLayout';

export const WorkerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { workers, hireWorker, loading } = useWorkers();
  const [showChat, setShowChat] = useState(false);
  const [sessionEndTime, setSessionEndTime] = useState<Date | null>(null);

  const worker = workers.find(w => w.id === id);

  if (!worker) {
    return (
      <AppLayout>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Specialist Not Found</h1>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>The requested AI specialist could not be located.</p>
          <button onClick={() => navigate('/')} className="btn-gradient">
            ← Return to Marketplace
          </button>
        </div>
      </AppLayout>
    );
  }

  const handleHire = async (workerId: string, durationMinutes: number) => {
    try {
      const session = await hireWorker(workerId, durationMinutes);
      setSessionEndTime(session.endTime);
      setShowChat(true);
    } catch (error) {
      console.error('Failed to hire worker:', error);
      alert('Failed to initiate session. Please try again.');
    }
  };

  const handleSessionEnd = () => {
    setShowChat(false);
    setSessionEndTime(null);
  };

  if (showChat && sessionEndTime) {
    return (
      <div style={{ height: '100vh', background: '#080910' }}>
        <ChatInterface
          workerId={worker.id}
          sessionEndTime={sessionEndTime}
          onSessionEnd={handleSessionEnd}
        />
      </div>
    );
  }

  return (
    <AppLayout>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', fontSize: 14, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginBottom: 24, padding: 0, fontFamily: 'inherit',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >
          ← Back to Specialists
        </button>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <WorkerProfile worker={worker} onHire={handleHire} loading={loading} />
        )}

      </div>
    </AppLayout>
  );
};
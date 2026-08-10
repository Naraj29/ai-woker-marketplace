import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useWorkers } from '../../contexts/WorkerContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { SessionTimer } from './SessionTimer';

interface ChatInterfaceProps {
  workerId: string;
  sessionEndTime: Date;
  onSessionEnd: () => void;
}

const accentColors: Record<string, string> = {
  teacher: '#6366f1', health: '#10b981', therapist: '#a855f7', formatter: '#06b6d4',
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ workerId, sessionEndTime, onSessionEnd }) => {
  const { messages, isLoading, error, sendMessage, setCurrentWorkerId } = useChat();
  const { workers } = useWorkers();
  const worker = workers.find(w => w.id === workerId);
  const accent = worker ? (accentColors[worker.type] || '#6366f1') : '#6366f1';

  React.useEffect(() => {
    setCurrentWorkerId(workerId);
    return () => setCurrentWorkerId(null);
  }, [workerId, setCurrentWorkerId]);

  const handleSendMessage = async (text: string) => {
    if (worker) await sendMessage(worker.type, text, worker.type === 'teacher' ? 'STEM' : undefined);
  };

  const handleExportChat = () => {
    if (!messages.length) return;
    const txt = messages.map(m => `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role === 'user' ? 'YOU' : 'GEMMA'}: ${m.content}`).join('\n\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([txt], { type: 'text/plain;charset=utf-8' })),
      download: `Gemma_Session_${worker?.name.replace(/\s+/g, '_')}_${Date.now()}.txt`,
    });
    a.click();
  };

  if (!worker) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#080910', color: '#94a3b8' }}>
      <p style={{ fontSize: 16, marginBottom: 16 }}>Specialist session not found.</p>
      <button onClick={onSessionEnd} className="btn-gradient" style={{ fontSize: 13 }}>
        ← Return to Marketplace
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#080910', color: '#f1f5f9' }}>

      {/* Header Bar */}
      <div style={{
        background: 'rgba(15,17,30,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${accent}40`,
        padding: '14px 24px', flexShrink: 0,
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          
          {/* Worker Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16, fontSize: 24,
              background: `${accent}20`, border: `1px solid ${accent}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{worker.icon}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{worker.name}</h2>
                <span style={{
                  padding: '3px 10px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 99, fontSize: 10, fontWeight: 800, color: '#10b981',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>Gemma 2 Live</span>
              </div>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0 0' }}>{worker.tagline}</p>
            </div>
          </div>

          {/* Controls: Timer, Export, End Session */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <SessionTimer endTime={sessionEndTime} onSessionEnd={onSessionEnd} />
            
            <button
              onClick={handleExportChat}
              disabled={!messages.length}
              style={{
                padding: '8px 16px', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12,
                fontSize: 12, fontWeight: 700, color: '#e2e8f0', cursor: messages.length ? 'pointer' : 'not-allowed',
                opacity: messages.length ? 1 : 0.4, transition: 'all 0.2s', fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              📥 Export
            </button>

            <button
              onClick={onSessionEnd}
              style={{
                padding: '8px 16px', background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.4)', borderRadius: 12,
                fontSize: 12, fontWeight: 800, color: '#f87171', cursor: 'pointer',
                transition: 'all 0.2s', fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              End Session
            </button>
          </div>

        </div>
      </div>

      {/* Messages Feed */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxWidth: 1100, width: '100%', margin: '0 auto' }}>
        <MessageList
          messages={messages}
          workerIcon={worker.icon}
          onSendSuggestion={handleSendMessage}
          sampleTopics={worker.sampleTopics}
        />
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          background: 'rgba(244,63,94,0.15)', borderTop: '1px solid rgba(244,63,94,0.3)',
          padding: '12px 24px', fontSize: 13, color: '#f87171', flexShrink: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span><strong>API Error:</strong> {error}</span>
          <span style={{ fontSize: 11, color: '#fb7185' }}>Check GEMMA_API_KEY environment variable</span>
        </div>
      )}

      {/* Message Input Bar */}
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} loading={isLoading} />
    </div>
  );
};
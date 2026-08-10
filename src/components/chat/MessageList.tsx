import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  workerIcon: string;
  onSendSuggestion?: (text: string) => void;
  sampleTopics?: string[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages, workerIcon, onSendSuggestion, sampleTopics = [] }) => {
  const endRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>

      {/* Empty state */}
      {messages.length === 0 && (
        <div style={{
          maxWidth: 480, margin: '40px auto', padding: 32,
          background: 'rgba(18,20,42,0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22,
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, margin: '0 auto 16px',
          }}>{workerIcon}</div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Ready to help!</h3>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: sampleTopics.length ? 20 : 0 }}>
            Ask anything or pick a starter prompt below.
          </p>
          {sampleTopics.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
              {sampleTopics.map((t, i) => (
                <button key={i} onClick={() => onSendSuggestion?.(t)} style={{
                  width: '100%', padding: '11px 14px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, color: '#94a3b8', fontSize: 12,
                  fontStyle: 'italic', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}>
                  <span>"{t}"</span>
                  <span style={{ color: '#6366f1', fontStyle: 'normal' }}>→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      {messages.map(msg => {
        const isUser = msg.role === 'user';
        return (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start', gap: 10,
          }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: 10, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isUser ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'rgba(255,255,255,0.06)',
              border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)',
              flexShrink: 0,
            }}>{isUser ? '👤' : workerIcon}</div>

            {/* Bubble */}
            <div style={{
              maxWidth: '80%', position: 'relative',
            }}>
              <div style={{
                padding: '12px 16px',
                background: isUser ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(22,25,52,0.9)',
                border: isUser ? 'none' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                fontSize: 14, color: isUser ? '#fff' : '#e2e8f0',
                lineHeight: 1.65, whiteSpace: 'pre-wrap',
                boxShadow: isUser ? '0 4px 20px rgba(99,102,241,0.3)' : '0 4px 15px rgba(0,0,0,0.2)',
              }}>
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
                    {isUser ? 'You' : 'Gemma Specialist'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 10, opacity: 0.4 }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!isUser && (
                      <button onClick={() => copy(msg.id, msg.content)} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 10, color: copiedId === msg.id ? '#10b981' : '#64748b',
                        padding: 0, fontFamily: 'inherit',
                      }}>
                        {copiedId === msg.id ? '✓ Copied' : '📋 Copy'}
                      </button>
                    )}
                  </div>
                </div>
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
};
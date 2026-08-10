import React, { useEffect, useRef, useState } from 'react';

// Lightweight markdown → HTML (no external deps)
function renderMarkdown(text: string): string {
  return text
    // Headings
    .replace(/^### (.+)$/gm, '<h3 style="margin:14px 0 6px;font-size:15px;color:#c7d2fe;font-weight:700;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin:16px 0 8px;font-size:17px;color:#a5b4fc;font-weight:700;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="margin:16px 0 8px;font-size:19px;color:#818cf8;font-weight:800;">$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e2e8f0;font-weight:700;">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em style="color:#cbd5e1;">$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:4px;padding:1px 6px;font-family:monospace;font-size:12px;color:#a5b4fc;">$1</code>')
    // Bullet lists
    .replace(/^\* (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;">$1</li>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;">$1</li>')
    .replace(/^• (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;">$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/(<li[^>]*>[\s\S]*?<\/li>\n?)+/g, '<ul style="margin:8px 0;padding-left:20px;list-style:disc;">$&</ul>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;">$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:14px 0;"/>')
    // Line breaks
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}


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
      flex: 1, overflowY: 'auto', padding: '24px 20px',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>

      {/* Empty / Welcome State */}
      {messages.length === 0 && (
        <div style={{
          maxWidth: 520, margin: '40px auto', padding: 36,
          background: 'rgba(18,20,42,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(99,102,241,0.3)', borderRadius: 24,
          textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: 22,
            background: 'rgba(99,102,241,0.15)', border: '2px solid rgba(99,102,241,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 34, margin: '0 auto 20px',
            boxShadow: '0 0 30px rgba(99,102,241,0.3)',
          }}>{workerIcon}</div>
          
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>
            Session Established
          </h3>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: sampleTopics.length ? 24 : 0 }}>
            Your Gemma AI specialist is connected. Type any query or pick a starter prompt below.
          </p>

          {sampleTopics.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Suggested Starters:
              </span>
              {sampleTopics.map((topic, i) => (
                <button
                  key={i}
                  onClick={() => onSendSuggestion?.(topic)}
                  style={{
                    width: '100%', padding: '14px 18px',
                    background: 'rgba(14,16,34,0.9)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14, color: '#cbd5e1', fontSize: 13,
                    fontStyle: 'italic', cursor: 'pointer', textAlign: 'left',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s', fontFamily: 'inherit',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)';
                    e.currentTarget.style.background = 'rgba(99,102,241,0.15)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.background = 'rgba(14,16,34,0.9)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <span>"{topic}"</span>
                  <span style={{ color: '#06b6d4', fontStyle: 'normal', fontWeight: 800, fontSize: 16 }}>→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Messages Feed */}
      {messages.map(msg => {
        const isUser = msg.role === 'user';
        return (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start', gap: 12,
          }}>
            {/* Avatar */}
            <div style={{
              width: 38, height: 38, borderRadius: 12, fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isUser ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'rgba(14,16,34,0.9)',
              border: isUser ? 'none' : '1px solid rgba(255,255,255,0.12)',
              flexShrink: 0, boxShadow: isUser ? '0 4px 15px rgba(99,102,241,0.4)' : 'none',
            }}>{isUser ? '👤' : workerIcon}</div>

            {/* Bubble */}
            <div style={{ maxWidth: '82%', position: 'relative' }}>
              <div style={{
                padding: '14px 18px',
                background: isUser ? 'linear-gradient(135deg,#6366f1,#4f46e5)' : 'rgba(22,25,52,0.95)',
                border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: isUser ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
                fontSize: 14, color: isUser ? '#fff' : '#e2e8f0',
                lineHeight: 1.7, whiteSpace: 'pre-wrap',
                boxShadow: isUser ? '0 6px 25px rgba(99,102,241,0.35)' : '0 6px 20px rgba(0,0,0,0.25)',
              }}>
                {/* Header row inside bubble */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 16 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {isUser ? 'You' : 'Gemma Specialist'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 10, opacity: 0.5 }}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {!isUser && (
                      <button
                        onClick={() => copy(msg.id, msg.content)}
                        style={{
                          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 6, padding: '2px 6px', cursor: 'pointer',
                          fontSize: 10, color: copiedId === msg.id ? '#10b981' : '#94a3b8',
                          fontFamily: 'inherit', fontWeight: 600,
                        }}
                      >
                        {copiedId === msg.id ? '✓ Copied' : '📋 Copy'}
                      </button>
                    )}
                  </div>
                </div>
                {isUser
                  ? msg.content
                  : <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                }
              </div>
            </div>
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
};
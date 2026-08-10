import React, { useState, type KeyboardEvent } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false, loading = false }) => {
  const [msg, setMsg] = useState('');

  const send = () => {
    if (msg.trim() && !disabled && !loading) { onSendMessage(msg.trim()); setMsg(''); }
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={{
      background: 'rgba(8,9,18,0.95)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '16px 20px', flexShrink: 0,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
            disabled={disabled || loading}
            rows={2}
            style={{
              width: '100%', padding: '12px 16px 12px 16px',
              background: 'rgba(14,16,34,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, color: '#f1f5f9',
              fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif', outline: 'none',
              resize: 'none', transition: 'border-color 0.2s',
              lineHeight: 1.55,
              opacity: disabled ? 0.5 : 1,
            }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <span style={{ position: 'absolute', bottom: 8, right: 12, fontSize: 10, color: '#334155' }}>
            {msg.length}
          </span>
        </div>
        <button
          onClick={send}
          disabled={!msg.trim() || disabled || loading}
          style={{
            height: 52, padding: '0 22px', flexShrink: 0,
            background: (!msg.trim() || disabled || loading) ? 'rgba(6,182,212,0.3)' : 'linear-gradient(135deg,#06b6d4,#3b82f6)',
            color: '#020617',
            fontSize: 13, fontWeight: 900, letterSpacing: '0.02em',
            border: 'none', borderRadius: 14, cursor: (!msg.trim() || disabled || loading) ? 'not-allowed' : 'pointer',
            boxShadow: (!msg.trim() || disabled || loading) ? 'none' : '0 4px 18px rgba(6,182,212,0.4)',
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          {loading ? (
            <>
              <span style={{
                width: 14, height: 14, border: '2px solid rgba(2,6,23,0.3)',
                borderTopColor: '#020617', borderRadius: '50%',
                display: 'inline-block', animation: 'spin 0.8s linear infinite',
              }}></span>
              <span>Thinking</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : (
            <><span>Send</span><span>🚀</span></>
          )}
        </button>
      </div>
    </div>
  );
};
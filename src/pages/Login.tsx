import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setError('Enter a username'); return; }
    setLoading(true); setError('');
    try {
      await login(username);
      navigate('/');
    } catch {
      setError('Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      background: '#080910',
      backgroundImage: 'radial-gradient(ellipse 60% 50% at 30% 20%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 70% 80%, rgba(6,182,212,0.12) 0%, transparent 60%)',
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(16,18,38,0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(99,102,241,0.25)',
        borderRadius: 28,
        padding: '44px 36px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.15)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
            borderRadius: 18, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28,
            boxShadow: '0 0 30px rgba(99,102,241,0.5)',
          }}>⚡</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Sign In to WorkerX
          </h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>
            Access Gemma AI Specialists instantly
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
              color: '#f87171', padding: '10px 14px', borderRadius: 12,
              fontSize: 13, marginBottom: 16,
            }}>{error}</div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g. AlexDev"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(8,9,22,0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, color: '#f1f5f9',
                fontSize: 15, fontFamily: 'inherit', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#6366f1'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '15px',
              background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff', fontSize: 15, fontWeight: 800,
              letterSpacing: '0.04em',
              border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Signing in...' : 'Enter Marketplace →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#334155', marginTop: 20 }}>
            Prototype auth · Powered by Google Gemma 4
          </p>
        </form>
      </div>
    </div>
  );
};
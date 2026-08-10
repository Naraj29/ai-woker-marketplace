import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Access Restricted</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 24 }}>Please log in to view your user dashboard.</p>
        <button onClick={() => navigate('/login')} className="btn-gradient">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 20px' }}>
      
      {/* Profile Banner */}
      <div style={{
        background: 'rgba(18,20,42,0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99,102,241,0.3)',
        borderRadius: 24, padding: 32, marginBottom: 32,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20 }}>
            <img
              src={user.avatar}
              alt={user.username}
              style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.5)', objectFit: 'cover' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: 0 }}>{user.username}</h1>
                <span style={{
                  padding: '3px 12px', background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)', borderRadius: 99,
                  fontSize: 11, fontWeight: 800, color: '#10b981',
                }}>
                  Active Member
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: 14, marginBottom: 12 }}>{user.email}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12, color: '#94a3b8' }}>
                <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
                  GitHub ID: #{user.githubId}
                </span>
                <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/')} className="btn-cyan" style={{ fontSize: 13, padding: '10px 20px', marginLeft: 'auto' }}>
            Browse Specialists →
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)', borderTop: '3px solid #06b6d4',
          borderRadius: 20, padding: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>
            Total Savings
          </span>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#06b6d4' }}>$348.50</div>
          <span style={{ fontSize: 12, color: '#475569', marginTop: 4, display: 'block' }}>vs. human retainer rates</span>
        </div>

        <div style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)', borderTop: '3px solid #a855f7',
          borderRadius: 20, padding: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>
            Gemma Sessions
          </span>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#a855f7' }}>12 Completed</div>
          <span style={{ fontSize: 12, color: '#475569', marginTop: 4, display: 'block' }}>100% Gemma 4 execution</span>
        </div>

        <div style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)', borderTop: '3px solid #10b981',
          borderRadius: 20, padding: 24,
        }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>
            Key Security
          </span>
          <div style={{ fontSize: 32, fontWeight: 900, color: '#10b981' }}>Protected</div>
          <span style={{ fontSize: 12, color: '#475569', marginTop: 4, display: 'block' }}>Vercel Serverless Endpoint</span>
        </div>
      </div>

      {/* Recent Sessions */}
      <div style={{
        background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)', borderRadius: 22, padding: 32,
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 20 }}>Recent Sessions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: 'rgba(8,9,22,0.7)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24 }}>🎓</span>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0 }}>Gemma STEM & Code Tutor</h4>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>30 Min Python & Algorithms Session</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#06b6d4', display: 'block' }}>$2.50</span>
              <span style={{ fontSize: 11, color: '#475569' }}>Saved $30.00</span>
            </div>
          </div>

          <div style={{
            background: 'rgba(8,9,22,0.7)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24 }}>🧠</span>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0 }}>Gemma Mindful Counselor</h4>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>15 Min Grounding & Mindfulness</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#06b6d4', display: 'block' }}>$1.50</span>
              <span style={{ fontSize: 11, color: '#475569' }}>Saved $21.00</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
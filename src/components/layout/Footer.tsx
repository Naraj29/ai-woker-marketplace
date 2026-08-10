import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: '#05060a',
      padding: '48px 24px 32px',
      color: '#94a3b8',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
          marginBottom: 40,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>
              <span>⚡ WorkerX AI</span>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              Empowering global productivity with autonomous AI specialists powered strictly by Google Gemma AI models.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Specialties
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <li><span style={{ color: '#94a3b8' }}>STEM & Code Mentors</span></li>
              <li><span style={{ color: '#94a3b8' }}>Bio & Fitness Coaches</span></li>
              <li><span style={{ color: '#94a3b8' }}>Mindful Counselors</span></li>
              <li><span style={{ color: '#94a3b8' }}>Copy & Doc Architects</span></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Architecture
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <li style={{ color: '#94a3b8' }}>Google Gemma 2 Core</li>
              <li style={{ color: '#94a3b8' }}>Vercel Serverless Endpoint</li>
              <li style={{ color: '#94a3b8' }}>Zero Client API Key Leakage</li>
              <li style={{ color: '#94a3b8' }}>Sub-second Latency</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
              Build With Gemma
            </h4>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
              Official submission for TFUG Prayagraj AI Hackathon.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10,
              color: '#a5b4fc', fontSize: 11, fontWeight: 700,
            }}>
              <span>🏆 100% Gemma Verified</span>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
          gap: 12, fontSize: 12, color: '#475569',
        }}>
          <p>© 2026 WorkerX AI Marketplace. All rights reserved.</p>
          <p>Powered by Google AI Studio Gemma Models</p>
        </div>
      </div>
    </footer>
  );
};
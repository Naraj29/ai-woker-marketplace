import React, { useState } from 'react';
import { calculateSavings, type Worker } from '../../utils/workerData';

interface WorkerProfileProps {
  worker: Worker;
  onHire: (workerId: string, duration: number) => void;
  loading: boolean;
}

const durOpts = [
  { label: '15 Mins', minutes: 15 },
  { label: '30 Mins', minutes: 30 },
  { label: '1 Hour',  minutes: 60 },
  { label: '2 Hours', minutes: 120 },
];

export const WorkerProfile: React.FC<WorkerProfileProps> = ({ worker, onHire, loading }) => {
  const [dur, setDur] = useState<number>(30);
  const savings = calculateSavings(worker);
  const cost = ((worker.hourlyRate * dur) / 60).toFixed(2);
  const humanCost = ((worker.humanHourlyRate * dur) / 60).toFixed(2);

  const accentColors: Record<string, string> = {
    teacher: '#6366f1', health: '#10b981', therapist: '#a855f7', formatter: '#06b6d4',
  };
  const accent = accentColors[worker.type] || '#6366f1';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr min(360px, 100%)', gap: 32, alignItems: 'start' }}>

      {/* LEFT COLUMN */}
      <div style={{ minWidth: 0 }}>
        
        {/* Hero Banner */}
        <div style={{
          background: 'rgba(18,20,42,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${accent}40`,
          borderRadius: 24, padding: 32, marginBottom: 24,
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{
              width: 76, height: 76, borderRadius: 20, fontSize: 36,
              background: `${accent}20`, border: `2px solid ${accent}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{worker.icon}</div>
            
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: 0 }}>
                  {worker.name}
                </h1>
                <span style={{
                  padding: '4px 12px', background: `${accent}20`, border: `1px solid ${accent}50`,
                  borderRadius: 99, fontSize: 10, fontWeight: 800, color: accent,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{worker.badge}</span>
              </div>
              <p style={{ color: accent, fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{worker.tagline}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontSize: 12, color: '#94a3b8' }}>
                <span style={{ color: '#fbbf24', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>★</span><span>{worker.rating}</span>
                </span>
                <span>•</span>
                <span>{worker.reviews} Verified Sessions</span>
                <span>•</span>
                <span style={{ color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                  Available 24/7
                </span>
              </div>
            </div>

            <div style={{
              background: 'rgba(8,9,22,0.85)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18, padding: '16px 22px', textAlign: 'right', flexShrink: 0,
            }}>
              <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.08em' }}>AI Hourly Rate</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>${worker.hourlyRate}<span style={{ fontSize: 13, color: '#64748b', fontWeight: 400 }}>/hr</span></div>
              <div style={{ fontSize: 11, color: '#10b981', fontWeight: 700, marginTop: 4 }}>Save {savings}% vs ${worker.humanHourlyRate}/hr</div>
            </div>
          </div>
        </div>

        {/* About */}
        <section style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28, marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>About this Specialist</h3>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.75 }}>{worker.description}</p>
        </section>

        {/* Capabilities */}
        <section style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28, marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Core Capabilities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {worker.capabilities.map((cap, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '12px 16px', fontSize: 13, color: '#cbd5e1', fontWeight: 500,
              }}>
                <span style={{ color: '#10b981', fontWeight: 900, fontSize: 14 }}>✓</span>
                {cap}
              </div>
            ))}
          </div>
        </section>

        {/* Sample Prompts */}
        <section style={{
          background: 'rgba(18,20,42,0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 16 }}>Sample Session Prompts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {worker.sampleTopics.map((topic, i) => (
              <div key={i} style={{
                background: 'rgba(8,9,22,0.85)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14, padding: '14px 18px',
                fontSize: 13, color: '#94a3b8', fontStyle: 'italic',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ color: accent, fontSize: 16 }}>💬</span>
                "{topic}"
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN – Booking Box */}
      <div style={{
        background: 'rgba(18,20,42,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `2px solid ${accent}50`,
        borderRadius: 24, padding: 28,
        position: 'sticky', top: 88,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${accent}20`,
      }}>
        <h3 style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 4 }}>Book AI Session</h3>
        <p style={{ fontSize: 12, color: '#64748b', marginBottom: 24 }}>Select session duration to connect with Gemma immediately.</p>

        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Select Session Length
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {durOpts.map(opt => (
            <button key={opt.minutes} onClick={() => setDur(opt.minutes)} style={{
              padding: '14px 10px', borderRadius: 14, fontSize: 13, fontWeight: 800,
              cursor: 'pointer', transition: 'all 0.2s',
              background: dur === opt.minutes ? `linear-gradient(135deg, ${accent}, ${accent}bb)` : 'rgba(255,255,255,0.04)',
              color: dur === opt.minutes ? '#fff' : '#64748b',
              border: dur === opt.minutes ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
              boxShadow: dur === opt.minutes ? `0 4px 16px ${accent}40` : 'none',
              fontFamily: 'inherit',
            }}>{opt.label}</button>
          ))}
        </div>

        {/* Price Summary */}
        <div style={{
          background: 'rgba(8,9,22,0.85)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16, padding: 18, marginBottom: 24,
        }}>
          {[
            { label: 'Duration', val: `${dur} Mins`, valStyle: { color: '#fff', fontWeight: 700 } },
            { label: 'Human Pro Equivalent', val: `$${humanCost}`, valStyle: { color: '#64748b', textDecoration: 'line-through' } },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b', marginBottom: 12 }}>
              <span>{row.label}</span>
              <span style={row.valStyle}>{row.val}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontWeight: 800, color: '#fff', fontSize: 14 }}>Total Session Cost</span>
            <span style={{ fontSize: 30, fontWeight: 900, color: '#06b6d4' }}>${cost}</span>
          </div>
        </div>

        {/* Included */}
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24, fontSize: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Instant sub-second connection', 'Powered strictly by Gemma 4 AI', 'Full chat history export'].map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#94a3b8' }}>
              <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span> {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => onHire(worker.id, dur)}
          disabled={loading}
          style={{
            width: '100%', padding: '16px',
            background: loading ? 'rgba(6,182,212,0.4)' : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: '#020617', fontSize: 14, fontWeight: 900,
            letterSpacing: '0.05em', textTransform: 'uppercase',
            border: 'none', borderRadius: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 6px 24px rgba(6,182,212,0.4)',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
          }}
        >
          {loading ? 'Initiating Session...' : 'Start Instant Session →'}
        </button>
      </div>

    </div>
  );
};
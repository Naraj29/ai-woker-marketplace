import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateSavings, type Worker } from '../../utils/workerData';

interface WorkerCardProps {
  worker: Worker;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const navigate = useNavigate();
  const savings = calculateSavings(worker);
  const [hovered, setHovered] = useState(false);

  const accentColors: Record<string, { bg: string; border: string; icon: string }> = {
    teacher:   { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.4)',  icon: '#a5b4fc' },
    health:    { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.4)',  icon: '#34d399' },
    therapist: { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.4)',  icon: '#d8b4fe' },
    formatter: { bg: 'rgba(6,182,212,0.15)',   border: 'rgba(6,182,212,0.4)',   icon: '#67e8f9' },
  };
  const a = accentColors[worker.type] || accentColors.teacher;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(28,31,60,0.9)' : 'rgba(18,20,42,0.75)',
        backdropFilter: 'blur(20px)',
        border: hovered ? `1px solid ${a.border}` : '1px solid rgba(255,255,255,0.07)',
        borderRadius: 22,
        padding: 28,
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${a.border}` : '0 4px 20px rgba(0,0,0,0.2)',
        cursor: 'default',
      }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        {/* Icon */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 58, height: 58, borderRadius: 16,
            background: a.bg, border: `1px solid ${a.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28,
          }}>{worker.icon}</div>
          <span style={{
            position: 'absolute', bottom: -4, right: -4,
            width: 16, height: 16,
            background: '#10b981', borderRadius: '50%',
            border: '2px solid #080910',
          }}></span>
        </div>

        {/* Savings Badge */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 99,
            fontSize: 11, fontWeight: 800, color: '#10b981',
            letterSpacing: '0.05em',
          }}>
            SAVE {savings}%
          </div>
          <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>vs. human rate</div>
        </div>
      </div>

      {/* Name & tagline */}
      <div style={{ marginBottom: 14 }}>
        <h3 style={{
          fontSize: 19, fontWeight: 800, color: hovered ? '#a5b4fc' : '#fff',
          letterSpacing: '-0.02em', marginBottom: 4,
          transition: 'color 0.2s',
        }}>{worker.name}</h3>
        <p style={{ fontSize: 12, fontWeight: 700, color: a.icon, marginBottom: 8 }}>
          {worker.tagline}
        </p>
        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as any, overflow: 'hidden',
        }}>
          {worker.description}
        </p>
      </div>

      {/* Capability chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {worker.capabilities.slice(0, 3).map((cap, i) => (
          <span key={i} style={{
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, fontSize: 11, fontWeight: 600,
            color: '#94a3b8',
          }}>{cap}</span>
        ))}
        {worker.capabilities.length > 3 && (
          <span style={{ padding: '4px 8px', fontSize: 11, color: '#475569' }}>
            +{worker.capabilities.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 'auto',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>
            ★ {worker.rating}
            <span style={{ fontSize: 11, color: '#475569', fontWeight: 400 }}>({worker.reviews})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>${worker.hourlyRate}</span>
            <span style={{ fontSize: 11, color: '#475569' }}>/hr</span>
            <span style={{ fontSize: 11, color: '#334155', textDecoration: 'line-through' }}>${worker.humanHourlyRate}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/worker/${worker.id}`)}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: '#020617',
            fontSize: 12, fontWeight: 800,
            borderRadius: 12, border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(6,182,212,0.4)',
            transition: 'all 0.2s',
            letterSpacing: '0.02em',
          }}
        >
          Hire Now →
        </button>
      </div>
    </div>
  );
};
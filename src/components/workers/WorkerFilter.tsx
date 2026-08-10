import React from 'react';
import type { WorkerType } from '../../utils/workerData';

interface WorkerFilterProps {
  selectedType: WorkerType;
  onTypeChange: (type: WorkerType) => void;
}

export const WorkerFilter: React.FC<WorkerFilterProps> = ({ selectedType, onTypeChange }) => {
  const categories: { id: WorkerType; label: string; icon: string }[] = [
    { id: 'all',       label: 'All Specialists',    icon: '✨' },
    { id: 'teacher',   label: 'STEM & Code Tutor',  icon: '🎓' },
    { id: 'health',    label: 'Fitness Coach',       icon: '🏃' },
    { id: 'therapist', label: 'Mindful Counselor',   icon: '🧠' },
    { id: 'formatter', label: 'Copy Architect',      icon: '✍️' },
  ];

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
      gap: 10, marginBottom: 40,
    }}>
      {categories.map(cat => {
        const active = selectedType === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onTypeChange(cat.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px',
              borderRadius: 999,
              fontSize: 13, fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
              transform: active ? 'scale(1.05)' : 'scale(1)',
              background: active
                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                : 'rgba(255,255,255,0.04)',
              color: active ? '#fff' : '#94a3b8',
              border: active
                ? '1px solid rgba(99,102,241,0.6)'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: active ? '0 6px 20px rgba(99,102,241,0.35)' : 'none',
            }}
          >
            <span style={{ fontSize: 15 }}>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
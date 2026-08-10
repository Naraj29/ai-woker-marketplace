import React, { useState } from 'react';
import { useWorkers } from '../contexts/WorkerContext';
import { WorkerGrid } from '../components/workers/WorkerGrid';
import { WorkerFilter } from '../components/workers/WorkerFilter';
import type { WorkerType } from '../utils/workerData';

export const Home: React.FC = () => {
  const { workers, loading } = useWorkers();
  const [selectedType, setSelectedType] = useState<WorkerType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkers = workers.filter(worker => {
    const matchesType = selectedType === 'all' || worker.type === selectedType;
    const matchesSearch = !searchQuery ||
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const s = {
    hero: {
      position: 'relative' as const,
      overflow: 'hidden',
      background: 'linear-gradient(160deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 40%, rgba(6,182,212,0.06) 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 28,
      padding: '56px 32px',
      textAlign: 'center' as const,
      marginBottom: 48,
    },
    heroGlow1: {
      position: 'absolute' as const, top: -80, left: -80,
      width: 400, height: 400,
      background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none' as const,
    },
    heroGlow2: {
      position: 'absolute' as const, bottom: -80, right: -80,
      width: 400, height: 400,
      background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
      borderRadius: '50%', pointerEvents: 'none' as const,
    },
    tag: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(99,102,241,0.12)',
      border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: 99, padding: '6px 18px',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
      color: '#a5b4fc', textTransform: 'uppercase' as const,
      marginBottom: 24,
    },
    h1: {
      fontSize: 'clamp(28px, 5vw, 58px)',
      fontWeight: 900, color: '#fff',
      letterSpacing: '-0.04em', lineHeight: 1.1,
      marginBottom: 20,
    },
    h1Accent: {
      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    },
    sub: {
      fontSize: 'clamp(14px, 2vw, 18px)', color: '#94a3b8',
      maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7,
    },
    searchWrap: {
      position: 'relative' as const, maxWidth: 560, margin: '0 auto 40px',
    },
    searchIcon: {
      position: 'absolute' as const, left: 16, top: '50%',
      transform: 'translateY(-50%)', fontSize: 18, pointerEvents: 'none' as const,
    },
    searchInput: {
      width: '100%', padding: '14px 48px',
      background: 'rgba(10,12,30,0.8)',
      border: '1px solid rgba(99,102,241,0.35)',
      borderRadius: 16, color: '#f1f5f9',
      fontSize: 14, fontFamily: 'inherit', outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
    },
    metrics: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 16, maxWidth: 640, margin: '0 auto',
      paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)',
    },
    metricItem: { textAlign: 'center' as const },
    metricVal: { fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 900, color: '#fff' },
    metricLabel: { fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 4 },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 24, marginTop: 64,
    },
    featureCard: {
      background: 'rgba(18,20,42,0.75)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      padding: 32, textAlign: 'center' as const,
    },
    featureIcon: {
      width: 52, height: 52,
      borderRadius: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, margin: '0 auto 16px',
    },
    featureTitle: { fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 8 },
    featureDesc: { fontSize: 13, color: '#64748b', lineHeight: 1.7 },
    sectionTitle: { fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, color: '#fff', textAlign: 'center' as const, marginBottom: 12 },
    sectionSub: { fontSize: 14, color: '#64748b', textAlign: 'center' as const, marginBottom: 40 },
  };

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 20px' }}>

      {/* ── HERO ── */}
      <div style={s.hero}>
        <div style={s.heroGlow1}></div>
        <div style={s.heroGlow2}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={s.tag}>🚀 Next-Gen Autonomous AI Workforce</div>

          <h1 style={s.h1}>
            Hire AI Specialists at{' '}
            <span style={s.h1Accent}>1/10th the Cost</span>
          </h1>

          <p style={s.sub}>
            Instantly deploy Google Gemma-powered AI workers for tutoring, coaching, mental wellness, and writing. No waitlists. No contracts.
          </p>

          {/* Search */}
          <div style={s.searchWrap}>
            <span style={s.searchIcon}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search skills — Python, Macros, Mindfulness, Resume..."
              style={s.searchInput}
              onFocus={e => {
                e.target.style.borderColor = '#06b6d4';
                e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.2)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(99,102,241,0.35)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Metrics Row */}
          <div style={s.metrics}>
            <div style={s.metricItem}>
              <div style={{ ...s.metricVal, color: '#fff' }}>90%+</div>
              <div style={s.metricLabel}>Cost Savings</div>
            </div>
            <div style={s.metricItem}>
              <div style={{ ...s.metricVal, color: '#06b6d4' }}>&lt;1s</div>
              <div style={s.metricLabel}>Deploy Time</div>
            </div>
            <div style={s.metricItem}>
              <div style={{ ...s.metricVal, color: '#a855f7' }}>24/7</div>
              <div style={s.metricLabel}>Available</div>
            </div>
            <div style={s.metricItem}>
              <div style={{ ...s.metricVal, color: '#10b981' }}>4.93★</div>
              <div style={s.metricLabel}>Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER ── */}
      <WorkerFilter selectedType={selectedType} onTypeChange={setSelectedType} />

      {/* ── WORKERS GRID ── */}
      <WorkerGrid workers={filteredWorkers} loading={loading} />

      {/* ── WHY SECTION ── */}
      <div style={{ marginTop: 80 }}>
        <h2 style={s.sectionTitle}>Why WorkerX AI?</h2>
        <p style={s.sectionSub}>Built on Google Gemma — no third-party LLMs, no data leaks, zero API key exposure.</p>
        <div style={s.featureGrid}>
          <div style={{ ...s.featureCard, borderTopColor: '#6366f1', borderTopWidth: 2 }}>
            <div style={{ ...s.featureIcon, background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>💎</div>
            <div style={s.featureTitle}>Unmatched Affordability</div>
            <div style={s.featureDesc}>Expert-level help from $3–6/hr. Save up to 92% vs. human professionals.</div>
          </div>
          <div style={{ ...s.featureCard, borderTopColor: '#06b6d4', borderTopWidth: 2 }}>
            <div style={{ ...s.featureIcon, background: 'rgba(6,182,212,0.15)', color: '#67e8f9' }}>⚡</div>
            <div style={s.featureTitle}>Zero Waiting</div>
            <div style={s.featureDesc}>No calendars, no scheduling. Your AI specialist responds in milliseconds.</div>
          </div>
          <div style={{ ...s.featureCard, borderTopColor: '#a855f7', borderTopWidth: 2 }}>
            <div style={{ ...s.featureIcon, background: 'rgba(168,85,247,0.15)', color: '#d8b4fe' }}>🔒</div>
            <div style={s.featureTitle}>Secure by Design</div>
            <div style={s.featureDesc}>API key never reaches the browser. Serverless isolation on Vercel Edge.</div>
          </div>
        </div>
      </div>

    </div>
  );
};
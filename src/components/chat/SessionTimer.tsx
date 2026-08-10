import React, { useState, useEffect, useRef } from 'react';

interface SessionTimerProps {
  endTime: Date;
  onSessionEnd: () => void;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({ endTime, onSessionEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // Store onSessionEnd in a ref so changing it never re-triggers the interval effect
  const onSessionEndRef = useRef(onSessionEnd);
  useEffect(() => { onSessionEndRef.current = onSessionEnd; });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endTime).getTime() - new Date().getTime();
      return Math.max(0, Math.floor(difference / 1000));
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        onSessionEndRef.current(); // Use ref — never changes reference identity
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]); // ONLY re-run when endTime changes, NOT when onSessionEnd changes

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 120;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 12,
      background: isLowTime ? 'rgba(244,63,94,0.15)' : 'rgba(99,102,241,0.12)',
      border: isLowTime ? '1px solid rgba(244,63,94,0.4)' : '1px solid rgba(99,102,241,0.3)',
      color: isLowTime ? '#f87171' : '#06b6d4',
      fontSize: 13,
      fontWeight: 800,
      fontFamily: "'Fira Code', 'Courier New', monospace",
      letterSpacing: '0.04em',
    }}>
      <span style={{ fontSize: 14 }}>⏱️</span>
      <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
      {isLowTime && (
        <span style={{ fontSize: 10, fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', marginLeft: 4 }}>
          Low Time
        </span>
      )}
    </div>
  );
};
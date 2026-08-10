import React, { useState, useEffect } from 'react';

interface SessionTimerProps {
  endTime: Date;
  onSessionEnd: () => void;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({ endTime, onSessionEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

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
        onSessionEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onSessionEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft <= 120; // 2 mins remaining

  return (
    <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
      isLowTime
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
        : 'bg-indigo-500/10 text-cyan-300 border-indigo-500/30'
    }`}>
      <span className="text-sm">⏱️</span>
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
      {isLowTime && <span className="text-[10px] uppercase font-bold text-rose-400">Low Time</span>}
    </div>
  );
};
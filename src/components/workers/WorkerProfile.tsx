import React, { useState } from 'react';
import { calculateSavings, type Worker } from '../../utils/workerData';

interface WorkerProfileProps {
  worker: Worker;
  onHire: (workerId: string, duration: number) => void;
  loading: boolean;
}

export const WorkerProfile: React.FC<WorkerProfileProps> = ({ worker, onHire, loading }) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // in minutes
  const savings = calculateSavings(worker);

  const durationOptions = [
    { label: '15 Mins', minutes: 15 },
    { label: '30 Mins', minutes: 30 },
    { label: '1 Hour', minutes: 60 },
    { label: '2 Hours', minutes: 120 },
  ];

  const calculatedCost = ((worker.hourlyRate * selectedDuration) / 60).toFixed(2);
  const humanEquivalentCost = ((worker.humanHourlyRate * selectedDuration) / 60).toFixed(2);

  const handleHireClick = () => {
    onHire(worker.id, selectedDuration);
  };

  return (
    <div className="space-y-8">

      {/* Header Banner */}
      <div className="glass-panel p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 flex items-center justify-center text-4xl shadow-xl">
              {worker.icon}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h1 className="text-3xl font-extrabold text-white">{worker.name}</h1>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
                  {worker.badge}
                </span>
              </div>
              <p className="text-cyan-400 font-semibold text-sm mb-2">{worker.tagline}</p>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1 text-amber-400 font-bold">
                  <span>★</span>
                  <span>{worker.rating}</span>
                </span>
                <span>•</span>
                <span>{worker.reviews} Verified Sessions</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Available 24/7
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 p-5 rounded-2xl text-right min-w-[200px]">
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">AI Hourly Rate</span>
            <div className="flex items-baseline justify-end space-x-1 my-1">
              <span className="text-3xl font-black text-white">${worker.hourlyRate}</span>
              <span className="text-xs text-slate-400">/hr</span>
            </div>
            <span className="text-xs text-emerald-400 font-semibold block">
              Save {savings}% vs Human (${worker.humanHourlyRate}/hr)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Bio & Capabilities & Topics */}
        <div className="lg:col-span-2 space-y-8">

          {/* About Section */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-3">About this Specialist</h3>
            <p className="text-slate-300 leading-relaxed text-sm">
              {worker.description}
            </p>
          </div>

          {/* Capabilities */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-4">Core Capabilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {worker.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center space-x-2.5 text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Prompts */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-3">Sample Session Prompts</h3>
            <div className="space-y-2">
              {worker.sampleTopics.map((topic, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-white/5 p-3.5 rounded-xl text-slate-300 text-xs italic flex items-center space-x-2">
                  <span className="text-indigo-400">💬</span>
                  <span>"{topic}"</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Hire Box */}
        <div className="space-y-6">
          <div className="glass-panel p-6 border-2 border-indigo-500/40 shadow-2xl sticky top-28">
            <h3 className="text-xl font-bold text-white mb-2">Book AI Session</h3>
            <p className="text-xs text-slate-400 mb-6">Select session duration to connect with Gemma immediately.</p>

            {/* Duration Options */}
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
              Select Session Length
            </label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {durationOptions.map((opt) => (
                <button
                  key={opt.minutes}
                  onClick={() => setSelectedDuration(opt.minutes)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${selectedDuration === opt.minutes
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-slate-500 hover:text-white'
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Price Summary Box */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2 mb-6 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Duration</span>
                <span className="text-white font-semibold">{selectedDuration} Minutes</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Human Pro Equivalent</span>
                <span className="line-through text-slate-500">${humanEquivalentCost}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-bold text-white">Total Session Cost</span>
                <span className="text-2xl font-black text-cyan-400">${calculatedCost}</span>
              </div>
            </div>

            {/* Features Included */}
            <ul className="text-xs text-slate-400 space-y-2 mb-6">
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">✓</span>
                <span>Instant sub-second connection</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">✓</span>
                <span>Powered strictly by Gemma 2 AI</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-emerald-400">✓</span>
                <span>Full chat history export</span>
              </li>
            </ul>

            <button
              onClick={handleHireClick}
              disabled={loading}
              className="w-full btn-cyan py-3.5 text-sm font-extrabold uppercase tracking-wider rounded-xl"
            >
              {loading ? 'Initiating Session...' : 'Start Instant Session →'}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
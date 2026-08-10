import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useWorkers } from '../../contexts/WorkerContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { SessionTimer } from './SessionTimer';

interface ChatInterfaceProps {
  workerId: string;
  sessionEndTime: Date;
  onSessionEnd: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  workerId,
  sessionEndTime,
  onSessionEnd
}) => {
  const { messages, isLoading, error, sendMessage, setCurrentWorkerId } = useChat();
  const { workers } = useWorkers();

  const worker = workers.find(w => w.id === workerId);

  React.useEffect(() => {
    setCurrentWorkerId(workerId);
    return () => {
      setCurrentWorkerId(null);
    };
  }, [workerId, setCurrentWorkerId]);

  const handleSendMessage = async (messageText: string) => {
    if (worker) {
      await sendMessage(worker.type, messageText, worker.type === 'teacher' ? 'STEM' : undefined);
    }
  };

  const handleExportChat = () => {
    if (messages.length === 0) return;
    const textContent = messages
      .map(m => `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role === 'user' ? 'USER' : 'GEMMA'}: ${m.content}`)
      .join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gemma_Session_${worker?.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!worker) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-slate-400">Worker not found</p>
        <button onClick={onSessionEnd} className="mt-4 btn-gradient text-xs">
          Return to Marketplace
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#080911]">

      {/* Header Bar */}
      <div className="bg-[#0f111e] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl">
              {worker.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-extrabold text-white">{worker.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                  Gemma 2 Live
                </span>
              </div>
              <p className="text-xs text-slate-400">{worker.tagline}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <SessionTimer endTime={sessionEndTime} onSessionEnd={onSessionEnd} />

            <button
              onClick={handleExportChat}
              disabled={messages.length === 0}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all disabled:opacity-30"
              title="Export session text"
            >
              📥 Export
            </button>

            <button
              onClick={onSessionEnd}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all"
            >
              End Session
            </button>
          </div>

        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-7xl w-full mx-auto">
        <MessageList
          messages={messages}
          workerIcon={worker.icon}
          onSendSuggestion={handleSendMessage}
          sampleTopics={worker.sampleTopics}
        />
      </div>

      {/* Error Display Banner */}
      {error && (
        <div className="bg-rose-500/10 border-t border-rose-500/30 text-rose-300 px-6 py-3 text-xs font-medium max-w-7xl mx-auto w-full flex items-center justify-between">
          <span><strong>API Error:</strong> {error}</span>
          <span className="text-[10px] text-rose-400">Check server configuration or GEMMA_API_KEY</span>
        </div>
      )}

      {/* Input Bar */}
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        loading={isLoading}
      />

    </div>
  );
};
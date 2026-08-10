import React, { createContext, useContext, useState } from 'react';
import { callWorkerAPI } from '../api/gemma';

// Define interfaces locally to avoid import issues
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  workerId?: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  currentWorkerId: string | null;
}

interface ChatContextType extends ChatState {
  addMessage: (message: Message) => void;
  sendMessage: (workerType: string, content: string, context?: string) => Promise<void>;
  clearMessages: () => void;
  setCurrentWorkerId: (workerId: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    currentWorkerId: null
  });

  const addMessage = (message: Message) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const sendMessage = async (workerType: string, content: string, context?: string) => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      workerId: state.currentWorkerId || undefined
    };
    addMessage(userMessage);

    try {
      const response = await callWorkerAPI(workerType, content, context);
      
      // Add assistant message
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        workerId: state.currentWorkerId || undefined
      };
      addMessage(assistantMessage);

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      }));
    }
  };

  const clearMessages = () => {
    setState(prev => ({
      ...prev,
      messages: [],
      error: null
    }));
  };

  const setCurrentWorkerId = (workerId: string | null) => {
    setState(prev => ({
      ...prev,
      currentWorkerId: workerId
    }));
  };

  return (
    <ChatContext.Provider value={{ ...state, addMessage, sendMessage, clearMessages, setCurrentWorkerId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
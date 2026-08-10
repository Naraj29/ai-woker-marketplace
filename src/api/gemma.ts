import { getSystemPrompt, formatTeacherPrompt, formatHealthPrompt, formatTherapistPrompt, formatFormatterPrompt } from '../utils/gemmaPrompts';

export const callGemmaAPI = async (
  prompt: string,
  systemPrompt: string,
  modelName: string = 'gemma-2-27b-it'
): Promise<string> => {
  try {
    const response = await fetch('/api/gemma', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        systemPrompt,
        modelName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server returned error status ${response.status}`);
    }

    if (data.text) {
      return data.text;
    }

    throw new Error('Invalid response structure from Gemma backend API');
  } catch (error: any) {
    console.error('Error calling Gemma backend endpoint:', error);
    throw error;
  }
};

export const callTeacherAPI = async (subject: string, question: string): Promise<string> => {
  const systemPrompt = getSystemPrompt('teacher', subject);
  const prompt = formatTeacherPrompt(subject, question);
  return callGemmaAPI(prompt, systemPrompt);
};

export const callHealthAPI = async (query: string): Promise<string> => {
  const systemPrompt = getSystemPrompt('health');
  const prompt = formatHealthPrompt(query);
  return callGemmaAPI(prompt, systemPrompt);
};

export const callTherapistAPI = async (message: string): Promise<string> => {
  const systemPrompt = getSystemPrompt('therapist');
  const prompt = formatTherapistPrompt(message);
  return callGemmaAPI(prompt, systemPrompt);
};

export const callFormatterAPI = async (text: string, formatType: string): Promise<string> => {
  const systemPrompt = getSystemPrompt('formatter');
  const prompt = formatFormatterPrompt(text, formatType);
  return callGemmaAPI(prompt, systemPrompt);
};

export const callWorkerAPI = async (
  workerType: string,
  userMessage: string,
  context?: string
): Promise<string> => {
  switch (workerType) {
    case 'teacher':
      return callTeacherAPI(context || 'General', userMessage);
    case 'health':
      return callHealthAPI(userMessage);
    case 'therapist':
      return callTherapistAPI(userMessage);
    case 'formatter':
      return callFormatterAPI(userMessage, context || 'Professional');
    default:
      const systemPrompt = getSystemPrompt(workerType, context);
      return callGemmaAPI(userMessage, systemPrompt);
  }
};
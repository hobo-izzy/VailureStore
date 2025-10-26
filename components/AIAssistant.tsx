import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { getAIResponse } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon, SparklesIcon } from './icons';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinkingMode, setUseThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleToggle = () => setIsOpen(!isOpen);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseData = await getAIResponse(input.trim(), useThinkingMode);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseData.text,
        sources: aiResponseData.sources,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I couldn't process that. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, useThinkingMode]);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome-message',
        sender: 'ai',
        text: "Welcome to VAILURE. How can I assist with your style today?",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-white text-black h-16 w-16 rounded-full shadow-lg flex items-center justify-center hover:bg-zinc-200 transition-all transform hover:scale-110 z-50"
        aria-label="Open AI Assistant"
      >
        <ChatIcon className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-end justify-end p-4 md:p-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl w-full max-w-lg h-[85vh] max-h-[700px] flex flex-col">
            <header className="p-4 border-b border-zinc-700 flex justify-between items-center">
              <h2 className="font-bold text-lg text-white">VAILURE AI Stylist</h2>
              <button onClick={handleToggle} className="text-zinc-400 hover:text-white">
                <CloseIcon className="h-6 w-6" />
              </button>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-200'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 border-t border-zinc-700 pt-2">
                        <h4 className="text-xs font-bold text-zinc-400 mb-1">Sources:</h4>
                        <ul className="space-y-1">
                          {msg.sources.map((source, index) => (
                            <li key={index}>
                              <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate block">
                                {source.title || source.uri}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start animate-fade-in-up">
                    <div className="bg-zinc-800 text-zinc-200 rounded-lg p-3 inline-flex items-center space-x-2">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 border-t border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="thinking-mode-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input 
                                id="thinking-mode-toggle" 
                                type="checkbox" 
                                className="sr-only"
                                checked={useThinkingMode}
                                onChange={() => setUseThinkingMode(!useThinkingMode)}
                            />
                            <div className={`block ${useThinkingMode ? 'bg-white' : 'bg-zinc-600'} w-10 h-6 rounded-full transition`}></div>
                            <div className={`dot absolute left-1 top-1 bg-zinc-900 w-4 h-4 rounded-full transition transform ${useThinkingMode ? 'translate-x-full' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-zinc-300 text-sm flex items-center">
                          <SparklesIcon className={`h-4 w-4 mr-1 ${useThinkingMode ? 'text-yellow-400' : 'text-zinc-500'}`} />
                          Thinking Mode
                        </div>
                    </label>
                </div>

              <div className="flex items-center bg-zinc-800 rounded-lg">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a style question..."
                  className="w-full bg-transparent p-3 text-white placeholder-zinc-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-3 text-zinc-400 hover:text-white disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors"
                >
                  <SendIcon className="h-5 w-5" />
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
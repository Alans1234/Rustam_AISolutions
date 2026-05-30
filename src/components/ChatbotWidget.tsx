import { Bot, ChevronDown, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { apiFetch } from '../utils/mockFetch';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      role: 'assistant',
      content: "Hello! I am your **AI Solution Specialist Coach**. I am grounded live in our database of Services, completed Projects, and expert Blogs.\n\nAsk me about our Custom AI Developments, ML models, or how to schedule an operational intake assessment! You can also leave your contact information right here.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    "What AI services do you offer?",
    "Show recent projects and impact.",
    "Tell me about Machine Learning.",
    "Show me how to contact the office."
  ];

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Map React messages history to backend payload
      const payloadMessages = [...messages, userMsg].map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        content: msg.content
      }));

      const res = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await res.json();
      
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.text || "I apologize, our processor encountered a packet delivery discrepancy. Please re-issue your query.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: "I ran into a server communication timeout. Please try again! Additionally, you can reach out directly via contact@aisolution.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="chatbot-wrapper">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-cyan-500 text-white rounded-full px-5 py-4 shadow-xl transition-all duration-300 hover:scale-105 group font-semibold"
          id="chatbot-floating-trigger"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>
          <span>AI Consulting Specialist</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="w-96 rounded-2xl bg-white border border-slate-100 shadow-2xl overflow-hidden flex flex-col h-[520px] transition-all duration-300 animate-slide-up"
          id="chatbot-window"
        >
          {/* Header */}
          <div className="bg-indigo-600 px-4 py-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-tight flex items-center gap-1.5 font-display">
                  Ground-Intelligence Core
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                </h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-100">ONLINE • Grounded RAG</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              id="chatbot-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Node Container */}
          <div 
            className="flex-1 overflow-y-auto px-4 py-4 bg-slate-50 space-y-4"
            ref={scrollRef}
            id="chatbot-messages-container"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 rounded-tr-none'
                      : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-tl-none'
                  }`}
                >
                  {/* Handle basic markdown formatting (bullets and bold) */}
                  <div className="space-y-1.5 whitespace-pre-wrap">
                    {msg.content.split('\n').map((paragraph, index) => {
                      let processed = paragraph;
                      
                      // Match bullet (* list item)
                      const isBullet = processed.startsWith('* ') || processed.startsWith('- ');
                      if (isBullet) {
                        processed = processed.substring(2);
                      }

                      // Render bold indicators **text**
                      const parts = processed.split('**');
                      const renderedParts = parts.map((part, i) => {
                        if (i % 2 === 1) {
                          return <strong key={i} className="font-bold text-indigo-900 dark:text-cyan-400">{part}</strong>;
                        }
                        return part;
                      });

                      if (isBullet) {
                        return (
                          <div key={index} className="flex items-start space-x-1.5 pl-2">
                            <span className="text-cyan-500 shrink-0 mt-1">•</span>
                            <span>{renderedParts}</span>
                          </div>
                        );
                      }

                      return <p key={index}>{renderedParts}</p>;
                    })}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-white text-slate-500 border border-slate-100 rounded-2xl px-4 py-3 rounded-tl-none shadow-sm flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions Shelf */}
          {messages.length < 5 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-[11px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200/50 transition-colors transition-transform text-left hover:scale-[1.01]"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputVal);
              }}
              placeholder="Query our knowledge core..."
              className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
              id="chatbot-text-input"
            />
            <button
              onClick={() => handleSend(inputVal)}
              className="p-3 bg-indigo-600 hover:bg-cyan-500 text-white rounded-xl shadow-md transition-colors"
              id="chatbot-submit-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

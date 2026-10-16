import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RefreshCw, Compass, Briefcase, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { getChatbotResponse } from '../data/chatbotKnowledge';
import '../styles/chatbot.css';

// Bespoke Futuristic AI Model Logo
export function MKChatbotIcon({ size = 22, className = '' }) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 28 28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`mk-ai-logo-svg ${className}`}
    >
      <defs>
        <linearGradient id={`gradMain_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="35%" stopColor="#7C5CE1" />
          <stop offset="70%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={`gradInner_${uid}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <filter id={`glow_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7C5CE1" floodOpacity="0.35" />
        </filter>
      </defs>
      <path 
        d="M14 2C14.6 8.2 19.8 13.4 26 14C19.8 14.6 14.6 19.8 14 26C13.4 19.8 8.2 14.6 2 14C8.2 13.4 13.4 8.2 14 2Z" 
        fill={`url(#gradMain_${uid})`}
        filter={`url(#glow_${uid})`}
      />
      <circle cx="14" cy="14" r="4.2" fill="#FFFFFF" fillOpacity="0.95" />
      <circle cx="14" cy="14" r="2.6" fill={`url(#gradInner_${uid})`} />
      <circle cx="22.5" cy="5.5" r="1.6" fill="#38BDF8" />
      <circle cx="5.5" cy="22.5" r="1.2" fill="#A855F7" />
    </svg>
  );
}

const SUGGESTED_QUESTIONS = [
  { label: "Core Skills", text: "What are Muhammed's core skills?", icon: Compass },
  { label: "Projects", text: "Tell me about his recent projects", icon: Sparkles },
  { label: "Experience", text: "Where did he work & experience?", icon: Briefcase },
  { label: "Resume", text: "How can I download his CV?", icon: FileText }
];

// Helper to cleanly render markdown bold and clickable links
function FormattedMessage({ text }) {
  if (!text) return null;

  const renderContent = (content) => {
    const parts = [];
    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('[') && token.includes('](')) {
        const label = token.substring(1, token.indexOf(']('));
        const url = token.substring(token.indexOf('](') + 2, token.length - 1);
        const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:');
        parts.push(
          <a
            key={match.index}
            href={url}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            download={url.endsWith('.pdf') ? "MuhammedK-CV.pdf" : undefined}
            className="gemini-chat-link"
          >
            {label}
            <ArrowRight size={11} style={{ display: 'inline', marginLeft: '3px' }} />
          </a>
        );
      } else if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="gemini-chat-strong">
            {token.substring(2, token.length - 2)}
          </strong>
        );
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }
    return parts;
  };

  return (
    <div className="gemini-message-body">
      {renderContent(text)}
    </div>
  );
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! I'm Muhammed's AI Assistant, modeled with full knowledge of his UI/UX design workflow, 8 commercial case studies, experience at Febno & Duplex, tech stack, and official CV. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef(null);
  const chipsRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const handleChipsMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX - chipsRef.current.offsetLeft;
    dragScrollLeft.current = chipsRef.current.scrollLeft;
    chipsRef.current.dataset.dragged = 'false';
    chipsRef.current.style.cursor = 'grabbing';
    chipsRef.current.style.userSelect = 'none';
  };

  const handleChipsMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - chipsRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    if (Math.abs(walk) > 4) {
      chipsRef.current.dataset.dragged = 'true';
    }
    chipsRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const handleChipsDragEnd = () => {
    isDragging.current = false;
    if (chipsRef.current) {
      chipsRef.current.style.cursor = 'grab';
      chipsRef.current.style.userSelect = '';
    }
  };

  const handleChipClick = (text) => {
    if (chipsRef.current?.dataset.dragged === 'true') return;
    handleSend(text);
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (questionText) => {
    const textToSend = questionText || input;
    if (!textToSend.trim()) return;

    if (!hasStartedChat) setHasStartedChat(true);

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend.trim() };
    setMessages(prev => [...prev, userMsg]);
    if (!questionText) setInput('');
    setIsTyping(true);

    const apiEndpoint = import.meta.env.VITE_AI_API_ENDPOINT;

    if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: textToSend })
        });
        if (response.ok) {
          const data = await response.json();
          const reply = data.reply || data.response || getChatbotResponse(textToSend);
          setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
          setIsTyping(false);
          return;
        }
      } catch (err) {
        console.warn('External AI endpoint failed, using local model:', err);
      }
    }

    setTimeout(() => {
      const reply = getChatbotResponse(textToSend);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 400);
  };

  const handleReset = () => {
    setHasStartedChat(false);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Conversation refreshed. Ask anything about Muhammed's design process, commercial case studies, tech stack, or CV!"
      }
    ]);
  };

  const handleChatbotWheel = (e) => {
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.lenisStopPropagation = true;
    }
    if (bodyRef.current && !e.target.closest('.chatbot-body')) {
      bodyRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button 
          className="chatbot-launcher" 
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <div className="chatbot-launcher-avatar">
            <MKChatbotIcon size={20} />
          </div>
          <div className="chatbot-launcher-label">
            <span className="chatbot-launcher-main">Ask AI</span>
            <span className="chatbot-launcher-sub">Always here</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="chatbot-window" 
          role="region" 
          aria-label="MK AI Assistant"
          data-lenis-prevent="true"
          onWheel={handleChatbotWheel}
          onTouchMove={(e) => {
            e.stopPropagation();
            if (e.nativeEvent) e.nativeEvent.lenisStopPropagation = true;
          }}
        >
          {/* Top action row */}
          <div className="chatbot-top-bar">
            <button 
              onClick={handleReset} 
              className="chatbot-action-btn" 
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RefreshCw size={14} />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="chatbot-action-btn close-btn" 
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Hero section - shown when no chat started */}
          {!hasStartedChat && (
            <div className="chatbot-hero">
              {/* Humanized Avatar */}
              <div className="chatbot-hero-avatar-wrap">
                <div className="chatbot-hero-avatar">
                  <span className="chatbot-hero-initials">MK</span>
                </div>
                <div className="chatbot-hero-online" title="Online" />
              </div>

              <div className="chatbot-hero-text">
                <div className="chatbot-hero-name-tag">
                  <span>✦</span>
                  <span>Muhammed K · AI Assistant</span>
                </div>
                <h2 className="chatbot-hero-title">Hi there! <span className="wave-emoji">👋</span></h2>
                <p className="chatbot-hero-subtitle">Ask me anything about Muhammed — his work, skills, or experience.</p>
              </div>
            </div>
          )}

          {/* Chat Messages Body - shown when chat started */}
          {hasStartedChat && (
            <div 
              className="chatbot-body" 
              ref={bodyRef}
              data-lenis-prevent="true"
              onWheel={(e) => {
                e.stopPropagation();
                if (e.nativeEvent) e.nativeEvent.lenisStopPropagation = true;
              }}
            >
              {messages.map(m => (
                <div key={m.id} className={`gemini-msg-row ${m.sender}`}>
                  {m.sender === 'bot' && (
                    <div className="gemini-bot-avatar" aria-hidden="true">
                      <MKChatbotIcon size={16} />
                    </div>
                  )}
                  <div className={`chat-bubble ${m.sender}`}>
                    <FormattedMessage text={m.text} />
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="gemini-msg-row bot">
                  <div className="gemini-bot-avatar" aria-hidden="true">
                    <MKChatbotIcon size={16} />
                  </div>
                  <div className="chat-bubble bot gemini-typing-card">
                    <div className="gemini-shimmer-dots">
                      <span className="gemini-pulse-dot dot-1" />
                      <span className="gemini-pulse-dot dot-2" />
                      <span className="gemini-pulse-dot dot-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prompt Suggestion Chips — Mouse drag/swipe enabled */}
          <div
            className="chatbot-suggestions"
            ref={chipsRef}
            onMouseDown={handleChipsMouseDown}
            onMouseMove={handleChipsMouseMove}
            onMouseUp={handleChipsDragEnd}
            onMouseLeave={handleChipsDragEnd}
            style={{ cursor: 'grab' }}
          >
            {SUGGESTED_QUESTIONS.map((q, idx) => {
              const IconComp = q.icon;
              return (
                <button 
                  key={idx} 
                  className="suggest-chip gemini-chip" 
                  onClick={() => handleChipClick(q.text)}
                >
                  <IconComp size={12} className="chip-icon" />
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="chatbot-footer">
            <form 
              className="chatbot-form gemini-input-pill" 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input 
                type="text" 
                className="chatbot-input" 
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit" 
                className={`chatbot-send-btn ${input.trim() ? 'active' : ''}`} 
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

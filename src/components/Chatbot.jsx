import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, CornerDownLeft } from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "Can I see your projects?",
  "What technologies do you use?",
  "How can I contact you?",
  "Can you help with a website design?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm Muhammed K's portfolio assistant. How can I help you explore his UI/UX design and front-end development work today?"
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Knowledge base retrieval matching portfolio data
  const generatePortfolioResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("service") || q.includes("offer") || q.includes("what do you do")) {
      return "Muhammed K offers UI/UX Design (wireframing, prototypes, user flows, design systems, dashboards) and Front-End Development (responsive business websites, Figma-to-code implementation, and React-based interfaces).";
    }

    if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
      return "Muhammed's key projects include Ronaraiksa (Saudi Restaurant Website), BizDot Dashboard Redesign (ERP Application), Gemini Music Award (National Talent Hunt), GreenTrack (Logistics Website), Styleora (E-commerce), and Nādvora (Travel & Expeditions). You can check the Works section for full case studies!";
    }

    if (q.includes("tech") || q.includes("tool") || q.includes("skill") || q.includes("stack")) {
      return "Muhammed is skilled in Figma, Adobe Photoshop, HTML5, CSS3, JavaScript, React.js (basics), jQuery, Bootstrap Grid, Git/GitHub, and cPanel. He specializes in converting high-fidelity Figma designs into pixel-perfect responsive websites.";
    }

    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("phone")) {
      return `You can reach Muhammed K directly via email at ${profileData.email} or phone/WhatsApp at ${profileData.phone}. He is based in Malappuram, Kerala, India and currently available for opportunities!`;
    }

    if (q.includes("help with") || q.includes("website design") || q.includes("redesign")) {
      return "Yes, absolutely! Muhammed can collaborate with you from early wireframing and interactive prototypes in Figma down to responsive frontend development with clean semantic code.";
    }

    if (q.includes("experience") || q.includes("background") || q.includes("cv") || q.includes("resume")) {
      return "Muhammed worked as a UI/UX Designer at Duplex Solutions Co and UI/UX Design Intern at Febno Technologies. He holds a Skill Diploma in UI/UX Designing from Techno Dot Academy and a BA in Arabic. You can download his verified CV PDF directly from the header!";
    }

    return "Thank you for asking! Muhammed specializes in UI/UX design and front-end development. For customized project inquiries or quote discussions, feel free to drop a message through the Contact page or email him at " + profileData.email;
  };

  const handleSendMessage = async (userText) => {
    const text = (userText || inputMessage).trim();
    if (!text) return;

    const userMessageObj = {
      id: Date.now(),
      sender: "user",
      text: text
    };

    setMessages(prev => [...prev, userMessageObj]);
    setInputMessage("");
    setIsTyping(true);

    // Check if an external backend API is configured
    const apiEndpoint = import.meta.env.VITE_CHATBOT_API_ENDPOINT;

    if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: data.reply || data.message || "Thank you for your message." }
        ]);
        return;
      } catch (err) {
        console.error("Chatbot API fetch error, using local fallback:", err);
      }
    }

    // Local Knowledgebase fallback with realistic typing delay
    setTimeout(() => {
      const reply = generatePortfolioResponse(text);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: "bot", text: reply }
      ]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <button
        type="button"
        className="chatbot-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI assistant chat" : "Open AI assistant chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat modal panel */}
      <aside
        className={`chatbot-panel ${!isOpen ? 'closed' : ''}`}
        aria-label="Muhammed K Portfolio AI Assistant"
      >
        <header className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar" aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="chatbot-title">Portfolio Assistant</h4>
              <span className="chatbot-status">Knowledge Base Active</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close assistant"
            style={{ color: '#FFFFFF', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </header>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Assistant is typing...</span>
            </div>
          )}

          {/* Suggested Quick Questions */}
          {messages.length === 1 && !isTyping && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B7280', marginBottom: '6px' }}>
                Suggested inquiries:
              </div>
              <div className="suggested-questions">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="suggested-btn"
                    onClick={() => handleSendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Ask about my work or skills..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Type message to assistant"
          />
          <button
            type="button"
            className="chatbot-send-btn"
            onClick={() => handleSendMessage()}
            aria-label="Send message"
            disabled={!inputMessage.trim()}
          >
            <Send size={16} />
          </button>
        </div>

        <footer className="chatbot-disclaimer">
          Assistant provides verified portfolio information. Contact Muhammed directly for project bookings.
        </footer>
      </aside>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const QuickChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="user-friendly-chat-widget" id="chatbot-widget" ref={widgetRef}>
      {/* Floating Trigger Button matching original style */}
      <button
        type="button"
        className="uf-trigger-btn"
        id="chatbot-trigger"
        aria-label="Quick Chat"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Quick Chat</span>
        <span className="uf-online-dot"></span>
      </button>

      {/* User Friendly Popover Card */}
      <div className={`uf-chat-card ${isOpen ? 'active' : ''}`} id="chatbot-window">
        {/* Header */}
        <div className="uf-card-header">
          <div className="uf-profile-row">
            <div className="uf-avatar">M</div>
            <div className="uf-profile-text">
              <h4 className="uf-name">Muhammed</h4>
              <span className="uf-status">🟢 Online • Instant Response</span>
            </div>
          </div>
          <button
            type="button"
            className="uf-close-btn"
            id="chatbot-close"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="uf-card-body">
          <div className="uf-welcome-bubble">
            👋 Hi there! Want to discuss a project, ask about pricing, or hire me? Choose an instant option below:
          </div>

          {/* Instant 1-Click Action Buttons */}
          <div className="uf-action-buttons">
            <a
              href="https://wa.me/919656216086?text=Hi%20Muhammed,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="uf-btn-action uf-whatsapp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.196 1.624zm6.097-3.967l.367.218c1.554.922 3.328 1.409 5.132 1.41h.005c5.347 0 9.698-4.351 9.7-9.7.001-2.592-1.009-5.027-2.84-6.858-1.83-1.83-4.264-2.84-6.857-2.84-5.347 0-9.697 4.351-9.699 9.7-.001 1.88.541 3.715 1.567 5.305l.239.372-1.03 3.762 3.866-1.013zm12.351-5.908c-.287-.144-1.696-.837-1.958-.933-.262-.096-.453-.144-.644.144-.191.287-.741.933-.908 1.125-.167.191-.334.215-.621.072-1.838-.919-3.044-1.633-4.261-3.719-.324-.556.324-.516.927-1.723.102-.204.051-.383-.025-.527-.077-.144-.644-1.556-.882-2.128-.232-.557-.468-.48-.644-.489-.167-.008-.359-.008-.55-.008-.191 0-.502.072-.765.359-.263.287-1.004.982-1.004 2.397 0 1.415 1.03 2.784 1.173 2.976.143.191 2.027 3.096 4.911 4.341 2.884 1.245 2.884.83 3.41.772.526-.057 1.696-.693 1.935-1.364.239-.67.239-1.244.167-1.364-.072-.121-.263-.193-.55-.337z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <a href="mailto:muhammedklkm@gmail.com" className="uf-btn-action uf-email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>Send Email Direct</span>
            </a>

            <Link to="/contact" className="uf-btn-action uf-form" onClick={() => setIsOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>Fill Project Form</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickChat;

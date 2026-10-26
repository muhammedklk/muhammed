import React, { useState } from 'react';
import { Mail, Phone, Instagram, Linkedin, MessageCircle, AlertCircle, Send } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './contact.css';

export default function ContactPage() {
  document.title = 'Contact — Muhammed K';
  const { personalInfo } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) newErrors.email = 'Please enter your email';
    if (!formData.message.trim()) newErrors.message = 'Please enter project details';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Opens WhatsApp with formatted message
    const phone = "919656216086";
    const phoneNote = formData.phone ? ` | 📞 ${formData.phone}` : '';
    const text = `Hi Muhammed,\n\nMy name is *${formData.name}*\n📧 ${formData.email}${phoneNote}\n\nI want to discuss:\n${formData.message}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="simple-contact-page">
      <div className="container">
        <div className="simple-contact-wrapper">
          
          {/* ============================================================
              LEFT COLUMN: "Let's talk." & DIRECT CONTACT INFO
          ============================================================ */}
          <div className="simple-contact-left reveal-blur">
            
            {/* 3D Chat Icon Badge */}
            <div className="simple-chat-badge" aria-hidden="true">
              <svg width="44" height="40" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bubbleGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="60%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  <linearGradient id="bubbleGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                  <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#9333ea" floodOpacity="0.25" />
                  </filter>
                </defs>
                {/* Back / smaller bubble */}
                <ellipse cx="28" cy="16" rx="14" ry="12" fill="url(#bubbleGrad2)" filter="url(#shadowGlow)" />
                <path d="M22 24L18 28L25 25Z" fill="url(#bubbleGrad2)" />
                {/* Front / main bubble */}
                <ellipse cx="16" cy="18" rx="14" ry="12" fill="url(#bubbleGrad1)" />
                <path d="M10 26L6 31L13 28Z" fill="url(#bubbleGrad1)" />
              </svg>
            </div>

            {/* Big Headline */}
            <h1 className="simple-contact-title">Let's talk.</h1>

            {/* Contact Details */}
            <div className="simple-contact-details">
              
              {/* Email Me */}
              <a href={`mailto:${personalInfo?.email || 'muhammedklkm@gmail.com'}`} className="simple-detail-item">
                <div className="simple-icon-box email-icon">
                  <Mail size={20} color="#ffffff" strokeWidth={2.2} />
                </div>
                <div className="simple-detail-text">
                  <span className="simple-detail-label">EMAIL ME</span>
                  <span className="simple-detail-value">{personalInfo?.email || 'muhammedklkm@gmail.com'}</span>
                </div>
              </a>

              {/* Call Me */}
              <a href={`tel:${personalInfo?.phone || '+919656216086'}`} className="simple-detail-item">
                <div className="simple-icon-box call-icon">
                  <Phone size={20} color="#ffffff" strokeWidth={2.2} />
                </div>
                <div className="simple-detail-text">
                  <span className="simple-detail-label">CALL ME</span>
                  <span className="simple-detail-value">{personalInfo?.phone || '+91 9656 216 086'}</span>
                </div>
              </a>

            </div>

            {/* Socials Row */}
            <div className="simple-socials-section">
              <span className="simple-socials-label">SOCIALS</span>
              <div className="simple-socials-row">
                
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-social-link"
                >
                  <span className="simple-social-icon-wrapper">
                    <Instagram size={17} />
                  </span>
                  <span>Instagram</span>
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-social-link"
                >
                  <span className="simple-social-icon-wrapper">
                    <Linkedin size={17} />
                  </span>
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-social-link"
                >
                  <span className="simple-social-icon-wrapper">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </span>
                  <span>Facebook</span>
                </a>

                <a
                  href="https://wa.me/919656216086"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="simple-social-link"
                >
                  <span className="simple-social-icon-wrapper">
                    <MessageCircle size={17} />
                  </span>
                  <span>WhatsApp</span>
                </a>

              </div>
            </div>

          </div>

          {/* ============================================================
              RIGHT COLUMN: "Send a message" CARD
          ============================================================ */}
          <div className="simple-contact-right reveal-up reveal-delay-2">
            <div className="simple-form-card">
              <h2 className="simple-form-title">Send a message</h2>

              <form onSubmit={handleSubmit} noValidate>
                
                {/* Field 1: Name */}
                <div className={`simple-field-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="user-name" className="simple-field-prompt">My name is</label>
                  <input
                    type="text"
                    id="user-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="simple-field-input"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="simple-field-error">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Field 2: Email + Phone (same row) */}
                <div className="simple-field-group">
                  <label className="simple-field-prompt">Contact me at</label>
                  <div className="simple-inline-row">
                    <div className={`simple-inline-field ${errors.email ? 'has-error' : ''}`}>
                      <input
                        type="email"
                        id="user-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address *"
                        className="simple-field-input"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span className="simple-field-error">
                          <AlertCircle size={12} /> {errors.email}
                        </span>
                      )}
                    </div>
                    <div className="simple-inline-field">
                      <input
                        type="tel"
                        id="user-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Mobile Number"
                        className="simple-field-input"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 3: Project Details */}
                <div className={`simple-field-group ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="user-message" className="simple-field-prompt">I want to discuss</label>
                  <textarea
                    id="user-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Project Details *"
                    rows={3}
                    className="simple-field-textarea"
                  />
                  {errors.message && (
                    <span className="simple-field-error">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="simple-submit-btn"
                  id="simple-contact-submit"
                >
                  <span>SEND MESSAGE</span>
                </button>

                {/* WhatsApp Notice Note */}
                <p className="simple-subtext-note">
                  Clicking send will open WhatsApp with your message.
                </p>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

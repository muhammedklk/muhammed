import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const LeadModal = ({ isOpen, onClose }) => {
  const { siteSettings } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'UI/UX Design & Prototyping',
    budget: '$1,000 - $3,000',
    timeline: '1-2 Weeks',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const serviceOptions = [
    'UI/UX Design & Prototyping',
    'Custom React Web Application',
    'Mobile App UI/UX',
    'Full Product Design & Development',
    'Design System & Wireframing'
  ];

  const budgetOptions = [
    '< $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000+'
  ];

  const timelineOptions = [
    'ASAP / Urgent',
    '1-2 Weeks',
    '1 Month',
    'Flexible'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: `[LEAD INQUIRY] ${formData.serviceType} (${formData.budget})`,
        message: `Project Service: ${formData.serviceType}\nBudget Range: ${formData.budget}\nTimeline: ${formData.timeline}\nPhone/Contact: ${formData.phone || 'N/A'}\n\nProject Brief:\n${formData.message}`
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to submit lead request. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try sending via WhatsApp or Email.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappNumber = siteSettings?.contactPhone
    ? siteSettings.contactPhone.replace(/[^0-9]/g, '')
    : '919656000000';

  const whatsappMessage = encodeURIComponent(
    `Hi Muhammed! I'm interested in working with you.\n` +
    `Name: ${formData.name || 'A Client'}\n` +
    `Service Needed: ${formData.serviceType}\n` +
    `Budget: ${formData.budget}\n` +
    `Timeline: ${formData.timeline}\n` +
    (formData.message ? `Details: ${formData.message}` : '')
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #090d16 100%)',
          border: '1px solid rgba(210, 234, 38, 0.25)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          position: 'relative',
          color: '#ffffff'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94a3b8',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(210, 234, 38, 0.15)',
                color: '#d2ea26',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}
            >
              <CheckCircle2 size={36} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>
              Project Request Sent!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px' }}>
              Thank you for reaching out. I have received your project details and will reply within 12-24 hours.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: '700',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                <MessageSquare size={16} />
                <span>Instant WhatsApp Chat</span>
              </a>

              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  background: 'rgba(210, 234, 38, 0.12)',
                  color: '#d2ea26',
                  fontSize: '12px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '12px'
                }}
              >
                <Sparkles size={14} />
                <span>Let's Build Something Great</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                Start Your Project Inquiry
              </h2>
              <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                Fill out your project details below to receive a custom estimate & consultation within 24 hours.
              </p>
            </div>

            {errorMsg && (
              <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', color: '#f87171', fontSize: '13px', marginBottom: '18px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Service Selection */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
                  What service do you need?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {serviceOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setFormData({ ...formData, serviceType: opt })}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        border: formData.serviceType === opt ? '1px solid #d2ea26' : '1px solid rgba(255,255,255,0.1)',
                        background: formData.serviceType === opt ? 'rgba(210, 234, 38, 0.15)' : 'rgba(255,255,255,0.03)',
                        color: formData.serviceType === opt ? '#d2ea26' : '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Picker */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Estimated Project Budget
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      style={{
                        padding: '8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: '700',
                        textAlign: 'center',
                        border: formData.budget === b ? '1px solid #d2ea26' : '1px solid rgba(255,255,255,0.1)',
                        background: formData.budget === b ? 'rgba(210, 234, 38, 0.15)' : 'rgba(255,255,255,0.03)',
                        color: formData.budget === b ? '#d2ea26' : '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '13.5px'
                    }}
                  />
                </div>
              </div>

              {/* Project Brief */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>PROJECT DETAILS / BRIEF</label>
                <textarea
                  rows={3}
                  placeholder="Tell me about your goals, target audience, or specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: '#d2ea26',
                    color: '#090d16',
                    fontWeight: '800',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting Request...' : 'Send Lead Request'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '14px 20px',
                    borderRadius: '12px',
                    background: 'rgba(37, 211, 102, 0.15)',
                    border: '1px solid rgba(37, 211, 102, 0.4)',
                    color: '#25D366',
                    fontWeight: '700',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadModal;

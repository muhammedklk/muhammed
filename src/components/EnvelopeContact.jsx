import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, Briefcase, Coffee, FolderPlus } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function EnvelopeContact() {
  const [selectedEnvelope, setSelectedEnvelope] = useState('project');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const envelopes = [
    {
      id: 'project',
      label: 'Project Inquiry',
      subtitle: 'Designing & building a new product or website',
      icon: FolderPlus,
      defaultSubject: 'New Project Collaboration',
      color: '#7C5CE1',
    },
    {
      id: 'hire',
      label: 'Full-Time Role',
      subtitle: 'Joining your design or front-end engineering team',
      icon: Briefcase,
      defaultSubject: 'Product Role Opportunity',
      color: '#2D5A46',
    },
    {
      id: 'coffee',
      label: 'Say Hello',
      subtitle: 'Quick chat, feedback, or digital coffee',
      icon: Coffee,
      defaultSubject: 'Saying Hello from Portfolio',
      color: '#6366F1',
    },
  ];

  const handleSelectEnvelope = (env) => {
    setSelectedEnvelope(env.id);
    setFormData((prev) => ({
      ...prev,
      subject: env.defaultSubject,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section className="envelope-contact-section">
      <div className="card-portfolio p-4 p-md-5">
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="badge-pill mb-3">
            <Sparkles size={14} className="text-accent" />
            <span>Interactive Contact</span>
          </span>
          <h2 className="heading-section font-serif mb-2">Say hello.</h2>
          <p className="subheading-lead mx-auto mb-0 text-center">
            Pick an envelope. Make it yours. Tell me about what you’re building or how we might work together.
          </p>
        </div>

        {/* Envelope Selection Row */}
        <div className="row g-3 mb-5 justify-content-center">
          {envelopes.map((env) => {
            const Icon = env.icon;
            const isSelected = selectedEnvelope === env.id;
            return (
              <div key={env.id} className="col-md-4">
                <div
                  onClick={() => handleSelectEnvelope(env)}
                  className={`envelope-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="envelope-top-bar" style={{ backgroundColor: env.color }}></div>
                  <div className="envelope-icon-wrap" style={{ color: env.color }}>
                    <Icon size={24} />
                  </div>
                  <h4 className="font-serif text-base mb-1">{env.label}</h4>
                  <p className="text-xs text-muted-custom mb-0">{env.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="contact-success-card animate-fade-in text-center py-5">
            <CheckCircle2 size={48} className="text-accent mb-3 mx-auto" />
            <h3 className="heading-section font-serif mb-2">Envelope Sent!</h3>
            <p className="subheading-lead mx-auto mb-4 text-center">
              Thank you, {formData.name}. Muhammed will get back to you at {formData.email} within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
              }}
              className="btn-secondary-custom"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-inner max-w-2xl mx-auto">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label font-sans text-xs font-semibold text-muted-custom">YOUR NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input-custom"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label font-sans text-xs font-semibold text-muted-custom">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input-custom"
                />
              </div>

              <div className="col-12">
                <label className="form-label font-sans text-xs font-semibold text-muted-custom">SUBJECT</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input-custom"
                />
              </div>

              <div className="col-12">
                <label className="form-label font-sans text-xs font-semibold text-muted-custom">YOUR MESSAGE</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell me about the goals, timeline, or idea you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input-custom"
                ></textarea>
              </div>

              <div className="col-12 d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
                <div className="direct-email-note text-xs text-muted-custom">
                  Or email directly at <a href={`mailto:${personalInfo.email}`} className="text-accent underline">{personalInfo.email}</a>
                </div>

                <button type="submit" className="btn-primary-custom px-4 py-3">
                  <Send size={16} />
                  <span>Send Envelope</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .envelope-contact-section {
          margin-top: 3.5rem;
          margin-bottom: 3.5rem;
        }

        .envelope-card {
          position: relative;
          background-color: var(--bg-body);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.25rem;
          cursor: pointer;
          transition: all var(--transition-normal);
          overflow: hidden;
          height: 100%;
        }

        .envelope-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-3px);
        }

        .envelope-card.selected {
          border-color: var(--accent-primary);
          background-color: var(--bg-surface);
          box-shadow: var(--shadow-md);
        }

        .envelope-top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .envelope-icon-wrap {
          margin-bottom: 0.85rem;
        }

        .form-label {
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
          display: block;
        }

        .form-input-custom {
          width: 100%;
          padding: 0.85rem 1.1rem;
          background-color: var(--bg-body);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          outline: none;
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .form-input-custom:focus {
          border-color: var(--accent-primary);
          background-color: var(--bg-surface);
        }

        .max-w-2xl {
          max-width: 640px;
        }

        .max-w-xl {
          max-width: 540px;
        }

        .underline {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Globe2, 
  CheckCircle2, 
  Layers, 
  MessageSquare,
  Phone
} from 'lucide-react';
import ArrowIcon from './ArrowIcon';
import { personalInfo } from '../data/portfolioData';
import '../styles/cta.css';

const SERVICES_OPTIONS = [
  'UI/UX Design',
  'Frontend Engineering',
  'Mobile App Design',
  'SaaS & ERP Dashboard',
  'E-Commerce Experience',
  'Design Systems'
];

export default function CTASection({
  title = "Have an ambitious project in mind?",
  accent = "Let's build something extraordinary.",
  description = "Whether you're starting from a blank canvas, scaling an existing product, or in need of high-performance React front-end development, I'm ready to collaborate."
}) {
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const email = personalInfo.email || 'muhammedklkm@gmail.com';
  const phone = personalInfo.phone || '+91 9656216086';

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const fallbackCopy = () => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    };

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2400);
        })
        .catch(() => {
          fallbackCopy();
        });
    } else {
      fallbackCopy();
    }
  };

  const toggleService = (srv) => {
    setSelectedService((prev) => (prev === srv ? null : srv));
  };

  const contactLink = selectedService 
    ? `/contact?service=${encodeURIComponent(selectedService)}`
    : '/contact';

  return (
    <section className="cta-showcase-section" id="cta-section" aria-label="Call to action">
      <div className="container">
        <div className="cta-stage-card">
          {/* Ambient Lighting Background Accents */}
          <div className="cta-glow-orb cta-glow-primary" aria-hidden="true" />
          <div className="cta-glow-orb cta-glow-secondary" aria-hidden="true" />
          <div className="cta-grid-pattern" aria-hidden="true" />

          <div className="cta-inner-content">
            {/* Top Eyebrow & Status Bar */}
            <div className="cta-top-bar">
              <div className="cta-status-badge">
                <span className="cta-live-pulse-dot" />
                <span className="cta-status-text">AVAILABLE FOR SELECT PROJECTS — 2026</span>
              </div>

              <div className="cta-response-badge">
                <Clock size={13} className="cta-badge-icon" />
                <span>Response time &lt; 24h</span>
              </div>
            </div>

            {/* Main Headline & Narrative */}
            <div className="cta-headline-wrapper">
              <h2 className="cta-main-title">
                {title}<br />
                <span className="cta-title-highlight">{accent}</span>
              </h2>

              <p className="cta-lead-description">
                {description}
              </p>
            </div>

            {/* Interactive Scope / Service Filter Pills */}
            <div className="cta-services-selector">
              <div className="cta-selector-label">
                <Sparkles size={14} className="cta-sparkle-icon" />
                <span>What are you looking to create? (Select to customize inquiry)</span>
              </div>
              <div className="cta-chips-cloud">
                {SERVICES_OPTIONS.map((srv) => {
                  const isSelected = selectedService === srv;
                  return (
                    <button
                      key={srv}
                      type="button"
                      className={`cta-chip-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleService(srv)}
                      aria-pressed={isSelected}
                    >
                      <span className="cta-chip-indicator">{isSelected ? '✓' : '+'}</span>
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Group: Primary Button + Interactive One-Click Copy */}
            <div className="cta-actions-group">
              <Link to={contactLink} className="cta-primary-btn" id="cta-start-project-btn">
                <span>Start a Project</span>
                {selectedService && <span className="cta-btn-selected-tag">({selectedService})</span>}
                <div className="cta-btn-arrow-bubble">
                  <ArrowIcon size={16} />
                </div>
              </Link>

              {/* Direct Email Card with Instant Clipboard Copy */}
              <div className="cta-email-card">
                <div className="cta-email-info">
                  <Mail size={16} className="cta-mail-icon" />
                  <a href={`mailto:${email}`} className="cta-email-address">
                    {email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`cta-copy-action-btn ${copied ? 'copied' : ''}`}
                  title={copied ? "Email copied to clipboard!" : "Copy email address"}
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Phone / Instant WhatsApp Alternative */}
              <a 
                href={`tel:${phone.replace(/\s+/g, '')}`} 
                className="cta-secondary-link"
                title="Direct call"
              >
                <Phone size={14} />
                <span>{phone}</span>
              </a>
            </div>

            {/* Trust & Craft Value Pillars Strip */}
            <div className="cta-value-strip">
              <div className="row g-3">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="cta-value-pill">
                    <div className="cta-value-icon">
                      <Sparkles size={16} />
                    </div>
                    <div className="cta-value-text">
                      <strong className="cta-value-title">Pixel-Perfect Craft</strong>
                      <span className="cta-value-sub">Meticulous typography, spacing & micro-interactions</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12">
                  <div className="cta-value-pill">
                    <div className="cta-value-icon">
                      <Layers size={16} />
                    </div>
                    <div className="cta-value-text">
                      <strong className="cta-value-title">Code-Ready Delivery</strong>
                      <span className="cta-value-sub">Production React, clean CSS & design system tokens</span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-12">
                  <div className="cta-value-pill">
                    <div className="cta-value-icon">
                      <Globe2 size={16} />
                    </div>
                    <div className="cta-value-text">
                      <strong className="cta-value-title">Global Collaboration</strong>
                      <span className="cta-value-sub">Seamless asynchronous workflow across worldwide timezones</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import EnvelopeContact from '../components/EnvelopeContact';
import { Mail, MapPin, Calendar, Clock, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  return (
    <div className="contact-page-container section-padding-hero">
      <div className="container">
        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="badge-pill mb-3">
            <Mail size={14} className="text-accent" />
            <span>Get In Touch</span>
          </span>
          <h1 className="heading-display font-serif mb-3">
            Let’s build something <span className="italic font-normal text-accent">extraordinary</span> together.
          </h1>
          <p className="subheading-lead mx-auto text-center">
            Whether you have a specific project inquiry, a full-time product role opportunity, or just want to connect—I'd love to hear from you.
          </p>
        </div>

        {/* Info Grid */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card-portfolio text-center p-4 h-100">
              <div className="contact-icon-box mx-auto mb-3">
                <Mail size={22} className="text-accent" />
              </div>
              <h5 className="font-serif text-base mb-1">Direct Email</h5>
              <p className="text-xs text-muted-custom mb-3">Response within 24 hours</p>
              <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-accent underline">
                {personalInfo.email}
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-portfolio text-center p-4 h-100">
              <div className="contact-icon-box mx-auto mb-3">
                <MapPin size={22} className="text-accent" />
              </div>
              <h5 className="font-serif text-base mb-1">Location & Timezone</h5>
              <p className="text-xs text-muted-custom mb-3">IST (UTC +5:30) / Remote</p>
              <span className="text-sm font-semibold text-primary">
                {personalInfo.location}
              </span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-portfolio text-center p-4 h-100">
              <div className="contact-icon-box mx-auto mb-3">
                <Calendar size={22} className="text-accent" />
              </div>
              <h5 className="font-serif text-base mb-1">Availability</h5>
              <p className="text-xs text-muted-custom mb-3">Q4 2026 & Beyond</p>
              <span className="status-pill text-xs">
                <span className="status-dot"></span>
                <span>Open for select engagements</span>
              </span>
            </div>
          </div>
        </div>

        {/* Envelope Contact Selector */}
        <EnvelopeContact />
      </div>

      <style>{`
        .contact-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .max-w-2xl {
          max-width: 680px;
        }

        .underline {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

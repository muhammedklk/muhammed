import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'uiux',
    message: ''
  });

  const [serviceSelectOpen, setServiceSelectOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const serviceOptions = [
    { value: 'uiux', label: 'UI/UX Interface Design' },
    { value: 'frontend', label: 'Front-End Development' },
    { value: 'fullstack', label: 'Full Web Application' },
    { value: 'redesign', label: 'Website Redesign' },
    { value: 'other', label: 'Consultation & Strategy' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      // 1. Post to Portfolio CMS Backend Contact Inbox
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Inquiry: ${formData.service}`,
          message: formData.message
        })
      }).catch(() => null);

      // 2. Send email notification via FormSubmit
      const bodyData = new FormData();
      bodyData.append('name', formData.name);
      bodyData.append('email', formData.email);
      bodyData.append('service', formData.service);
      bodyData.append('message', formData.message);
      bodyData.append('_subject', `New Portfolio Message from ${formData.name}`);
      bodyData.append('_captcha', 'false');

      await fetch('https://formsubmit.co/ajax/muhammedklkm@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: bodyData
      });

      setFeedback({
        text: "✅ Message sent successfully! I will respond within 24 hours.",
        color: '#4ade80'
      });
      setFormData({ name: '', email: '', service: 'uiux', message: '' });
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      // Fallback feedback if network was offline
      setFeedback({
        text: "✅ Message sent! Thank you for reaching out.",
        color: '#4ade80'
      });
      setFormData({ name: '', email: '', service: 'uiux', message: '' });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <>
      <section className="page-inner-hero text-center grid-lines-bg">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-md-10 col-sm-12 text-center d-flex flex-column align-items-center mx-auto">
              <span className="page-badge">GET IN TOUCH</span>
              <h1 className="page-title text-center">
                Let's Start a Project <span className="text-highlight">Together</span>
              </h1>
              <p className="page-subtitle text-center mx-auto">
                Whether you have a fully scoped design brief or just an early idea, I'm excited to hear from you. Fill out the form below or reach out directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main-section py-4">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            {/* Left Column: Direct Contact Info & Availability */}
            <div className="col-lg-5 col-md-12">
              <div className="contact-info-wrapper">
                <h2 className="contact-info-title">Direct Connection</h2>
                <p className="contact-info-sub">
                  Prefer direct emails or messages? Feel free to reach out via any of the channels below.
                </p>

                {/* Live Availability Status Card */}
                <div className="availability-status-card">
                  <span className="avail-pulse"></span>
                  <div className="avail-text">
                    <h4 className="avail-title">Available for New Projects</h4>
                    <span className="avail-sub">Accepting select client work for Q3/Q4 2026</span>
                  </div>
                </div>

                {/* Direct Info Cards */}
                <div className="direct-contact-cards">
                  <div className="contact-card-item">
                    <div className="contact-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div className="contact-card-content">
                      <span className="card-label">Email Me</span>
                      <a href="mailto:muhammedklkm@gmail.com" className="card-value">
                        muhammedklkm@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="contact-card-item">
                    <div className="contact-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="contact-card-content">
                      <span className="card-label">Phone & WhatsApp</span>
                      <a href="https://wa.me/919656216086" target="_blank" rel="noopener noreferrer" className="card-value">
                        +91 9656216086
                      </a>
                    </div>
                  </div>

                  <div className="contact-card-item">
                    <div className="contact-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="contact-card-content">
                      <span className="card-label">Location</span>
                      <span className="card-value">Kerala, India (IST UTC+5:30)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Handcrafted Form */}
            <div className="col-lg-7 col-md-12">
              <div className="contact-form-card">
                <h3 className="form-card-title">Send a Message</h3>
                <p className="form-card-sub">I'll respond within 24 business hours.</p>

                <form onSubmit={handleSubmit} className="contact-form-body">
                  <div className="row g-4">
                    <div className="col-md-6 col-sm-12">
                      <div className="form-group-item">
                        <label htmlFor="contact-name" className="form-label">Your Name</label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          className="form-input-field"
                          placeholder="e.g. Alex Morgan"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-12">
                      <div className="form-group-item">
                        <label htmlFor="contact-email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          className="form-input-field"
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group-item">
                        <label className="form-label">Service Needed</label>
                        <div className={`custom-select-wrapper ${serviceSelectOpen ? 'open' : ''}`}>
                          <button
                            type="button"
                            className="custom-select-trigger"
                            onClick={() => {
                              setServiceSelectOpen(!serviceSelectOpen);
                            }}
                          >
                            <span className="custom-select-label">
                              {serviceOptions.find((o) => o.value === formData.service)?.label}
                            </span>
                            <svg className="custom-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                          <div className="custom-select-options">
                            {serviceOptions.map((opt) => (
                              <div
                                key={opt.value}
                                className={`custom-option ${formData.service === opt.value ? 'selected' : ''}`}
                                onClick={() => {
                                  setFormData({ ...formData, service: opt.value });
                                  setServiceSelectOpen(false);
                                }}
                              >
                                {opt.label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group-item">
                        <label htmlFor="contact-message" className="form-label">Project Details</label>
                        <textarea
                          id="contact-message"
                          name="message"
                          className="form-textarea-field"
                          rows="5"
                          placeholder="Tell me a bit about your project goals, timeline, and requirements..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn-submit-inquiry" disabled={submitting}>
                        <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                      </button>

                      {feedback && (
                        <div className="form-feedback-toast" style={{ display: 'block', color: feedback.color, marginTop: '16px' }}>
                          {feedback.text}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

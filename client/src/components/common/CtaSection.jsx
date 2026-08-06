import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section style={{ padding: '40px 0 90px 0' }}>
      <div className="container">
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '28px',
            padding: '64px 32px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}
        >
          <span
            style={{
              color: '#849a00',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'inline-block'
            }}
          >
            LET'S COLLABORATE
          </span>

          <h2
            style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#0f172a',
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em'
            }}
          >
            Have a project in mind?
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: '#64748b',
              maxWidth: '520px',
              margin: '0 auto 28px auto',
              lineHeight: 1.6
            }}
          >
            Let's build something clean, functional, and visually memorable together.
          </p>

          <div>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: '#d2ea26',
                color: '#0f172a',
                borderRadius: '50px',
                fontWeight: '800',
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(210, 234, 38, 0.35)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;

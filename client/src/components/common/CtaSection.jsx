import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

const CtaSection = ({ onOpenLeadModal }) => {
  return (
    <section style={{ padding: '40px 0 90px 0' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid #e2e8f0',
            borderRadius: '28px',
            padding: '64px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.02)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(210, 234, 38, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Header Pill */}
          <span
            style={{
              color: '#4d6b00',
              background: '#f4fce3',
              border: '1px solid #d8f5a2',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: 'clamp(9.5px, 2.8vw, 12px)',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            LET'S COLLABORATE & BUILD YOUR PRODUCT
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
              maxWidth: '540px',
              margin: '0 auto 28px auto',
              lineHeight: 1.6
            }}
          >
            Let's build a clean, high-performance web product or design system tailored for high conversion and user engagement.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/?action=hire"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: '#d2ea26',
                color: '#0f172a',
                border: '1px solid #849a00',
                borderRadius: '50px',
                fontWeight: '800',
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(132, 154, 0, 0.25)',
                transition: 'transform 0.2s ease, boxShadow 0.2s ease'
              }}
            >
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '14.5px',
                textDecoration: 'none',
                transition: 'background 0.2s ease'
              }}
            >
              <MessageSquare size={16} />
              <span>Contact Directly</span>
            </Link>
          </div>

          <div style={{ marginTop: '24px', fontSize: '12.5px', color: '#64748b', fontWeight: '600' }}>
            ⚡ Available for select projects this month • Instant response within 24 hours
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;



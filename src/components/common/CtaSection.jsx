import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

const CtaSection = ({ onOpenLeadModal }) => {
  return (
    <section style={{ padding: '40px 0 90px 0' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #090d16 100%)',
            border: '1px solid rgba(210, 234, 38, 0.2)',
            borderRadius: '28px',
            padding: '64px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(210, 234, 38, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <span
            style={{
              color: '#d2ea26',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>LET'S COLLABORATE & BUILD YOUR PRODUCT</span>
          </span>

          <h2
            style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#ffffff',
              margin: '0 0 12px 0',
              letterSpacing: '-0.02em'
            }}
          >
            Have a project in mind?
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: '#94a3b8',
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
                borderRadius: '50px',
                fontWeight: '800',
                fontSize: '14.5px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(210, 234, 38, 0.35)'
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
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '14.5px',
                textDecoration: 'none'
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


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, ArrowLeft } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ pageName = 'This Page', message }) => {
  const { settings } = usePortfolio();
  const navigate = useNavigate();

  const displayMessage = message || settings?.maintenanceMessage || `${pageName} is currently undergoing scheduled updates and maintenance. Please check back shortly!`;
  const contactEmail = settings?.contactEmail || 'hello@developer.com';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '560px', background: '#0f172a', border: '1px solid rgba(210, 234, 38, 0.25)', borderRadius: '28px', padding: '48px 36px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}>
        
        <div style={{ width: '68px', height: '68px', borderRadius: '20px', background: 'rgba(210, 234, 38, 0.12)', color: '#d2ea26', border: '1px solid rgba(210, 234, 38, 0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <ShieldAlert size={34} />
        </div>

        <div>
          <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', background: 'rgba(210, 234, 38, 0.15)', color: '#d2ea26', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
            PAGE MAINTENANCE IN PROGRESS
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          {pageName} Under Maintenance
        </h1>

        <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: '0 0 32px 0', lineHeight: 1.6 }}>
          {displayMessage}
        </p>

        {/* Back Buttons Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#d2ea26',
              color: '#0f172a',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(210, 234, 38, 0.3)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Go Back to Home</span>
          </Link>

          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '14px',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer'
            }}
          >
            <span>Previous Page</span>
          </button>
        </div>

        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '13px', color: '#cbd5e1', marginBottom: '28px' }}>
          <Mail size={16} color="#d2ea26" />
          <span>Direct Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#d2ea26', fontWeight: '700', textDecoration: 'none' }}>{contactEmail}</a></span>
        </div>

        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a href="/admin/login" style={{ fontSize: '12px', color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} />
            <span>Administrator Access</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

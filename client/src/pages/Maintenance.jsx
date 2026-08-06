import React from 'react';
import { ShieldAlert, Mail, Lock } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ message }) => {
  const { settings } = usePortfolio();

  const displayMessage = message || settings?.maintenanceMessage || 'We are currently upgrading the portfolio infrastructure. Please check back soon!';
  const contactEmail = settings?.contactEmail || 'hello@developer.com';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '520px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '48px 36px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <ShieldAlert size={32} />
        </div>

        <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: '20px', background: 'rgba(239,68,68,0.15)', color: '#ef4444', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Scheduled System Maintenance
        </span>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          Under Active Maintenance
        </h1>

        <p style={{ fontSize: '14.5px', color: '#94a3b8', margin: '0 0 32px 0', lineHeight: 1.6 }}>
          {displayMessage}
        </p>

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

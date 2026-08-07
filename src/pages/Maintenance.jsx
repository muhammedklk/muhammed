import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Mail, ArrowLeft } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ isGlobal = false, pageName = 'This Page', message }) => {
  const { settings, about } = usePortfolio();
  const navigate = useNavigate();

  // If global maintenance switch is ON: title is "Website Under Update"
  // If page maintenance switch is ON: title is "{pageName} Under Update"
  const isWebsiteGlobal = isGlobal || pageName === 'Website' || pageName === 'This Page';

  const titleText = isWebsiteGlobal ? 'Website Under Update' : `${pageName} Under Update`;
  const badgeText = isWebsiteGlobal ? 'Website Update in Progress' : `${pageName} Update in Progress`;

  const defaultMessage = isWebsiteGlobal
    ? 'We are currently upgrading the portfolio website to bring you an improved experience. Please check back soon!'
    : `${pageName} is currently undergoing scheduled updates and maintenance. Please check back shortly!`;

  const displayMessage = message || settings?.maintenanceMessage || defaultMessage;
  
  // Dynamic Email lookup from SiteSettings, About section, or LocalStorage
  const localEmail = typeof window !== 'undefined' ? (localStorage.getItem('portfolio_contact_email') || localStorage.getItem('portfolio_email')) : null;
  const contactEmail = settings?.contactEmail || about?.email || localEmail || 'kmuhammedklk@gmail.com';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: '#f8fafc',
        color: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}
    >
      <style>{`
        @keyframes spinGear {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Clean Light Theme Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          padding: '38px 28px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          margin: 'auto'
        }}
      >
        {/* Soft Light Lime Icon Container */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '18px', background: '#f7fee7', color: '#65a30d', marginBottom: '20px', border: '1px solid #d9f99d', boxShadow: '0 8px 16px rgba(101, 163, 13, 0.1)' }}>
          <Settings size={28} style={{ animation: 'spinGear 8s linear infinite' }} />
        </div>

        {/* Status Pill Badge */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#65a30d' }}></span>
            {badgeText}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          {titleText}
        </h1>

        {/* Message */}
        <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 28px 0', lineHeight: 1.6 }}>
          {displayMessage}
        </p>

        {/* Action Buttons ONLY when NOT global website maintenance */}
        {!isWebsiteGlobal && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
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
                fontSize: '13.5px',
                textDecoration: 'none',
                boxShadow: '0 6px 16px rgba(210, 234, 38, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={16} color="#0f172a" />
              <span>Go Back to Home</span>
            </Link>

            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                background: '#f1f5f9',
                color: '#334155',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '13.5px',
                border: '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              <span>Previous Page</span>
            </button>
          </div>
        )}

        {/* Contact Info */}
        <div style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
          <Mail size={14} color="#65a30d" />
          <span>Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#0f172a', fontWeight: '700', textDecoration: 'none' }}>{contactEmail}</a></span>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

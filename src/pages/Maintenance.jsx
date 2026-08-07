import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, Mail, Lock, ArrowLeft } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ isGlobal = false, pageName = 'This Page', message }) => {
  const { settings } = usePortfolio();
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
  const contactEmail = settings?.contactEmail || 'hello@developer.com';

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
        background: '#090d16',
        color: '#f8fafc',
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

      {/* Clean Minimalist Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '36px 28px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          margin: 'auto'
        }}
      >
        {/* Sleek Gear Icon */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '18px', background: 'rgba(210, 234, 38, 0.1)', color: '#d2ea26', marginBottom: '20px', border: '1px solid rgba(210, 234, 38, 0.2)' }}>
          <Settings size={28} style={{ animation: 'spinGear 8s linear infinite' }} />
        </div>

        {/* Status Pill Badge */}
        <div style={{ marginBottom: '14px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(210, 234, 38, 0.12)', color: '#d2ea26', fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d2ea26' }}></span>
            {badgeText}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
          {titleText}
        </h1>

        {/* Message */}
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 28px 0', lineHeight: 1.6 }}>
          {displayMessage}
        </p>

        {/* Action Buttons */}
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
              transition: 'transform 0.2s ease'
            }}
          >
            <ArrowLeft size={16} color="#0f172a" />
            <span>Go Back to Home</span>
          </Link>

          {!isWebsiteGlobal && (
            <button
              onClick={() => navigate(-1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#e2e8f0',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '13.5px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer'
              }}
            >
              <span>Previous Page</span>
            </button>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>
          <Mail size={14} color="#d2ea26" />
          <span>Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#ffffff', fontWeight: '700', textDecoration: 'none' }}>{contactEmail}</a></span>
        </div>

        {/* Admin Link */}
        <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <a href="/admin/login" style={{ fontSize: '11.5px', color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} />
            <span>Administrator Access</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

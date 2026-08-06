import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, ArrowLeft, Sparkles } from '../admin/components/Icons';
import { usePortfolio } from '../context/PortfolioContext';

const Maintenance = ({ pageName = 'This Page', message }) => {
  const { settings } = usePortfolio();
  const navigate = useNavigate();

  const displayMessage = message || settings?.maintenanceMessage || `${pageName} is currently undergoing scheduled updates and maintenance. Please check back shortly!`;
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
        background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
        color: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        padding: '16px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflowY: 'auto'
      }}
    >
      {/* Keyframe Micro-Animations */}
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.9; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(4deg); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Ambient Floating Decorative Badges */}
      <div style={{ position: 'absolute', top: '10%', left: '8%', animation: 'floatIcon 6s ease-in-out infinite', opacity: 0.35, fontSize: '28px' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '12%', right: '10%', animation: 'floatIcon 7s ease-in-out infinite 1s', opacity: 0.35, fontSize: '32px' }}>🛠️</div>
      <div style={{ position: 'absolute', top: '15%', right: '12%', animation: 'floatIcon 8s ease-in-out infinite 2s', opacity: 0.3, fontSize: '26px' }}>⚡</div>
      <div style={{ position: 'absolute', bottom: '15%', left: '10%', animation: 'floatIcon 5.5s ease-in-out infinite 0.5s', opacity: 0.3, fontSize: '26px' }}>🔒</div>

      {/* Perfectly Centered Responsive Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '28px',
          padding: '36px 28px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          zIndex: 10,
          margin: 'auto'
        }}
      >
        {/* Animated Central Icon with Pulsing Outer Ring */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '26px',
              background: 'rgba(210, 234, 38, 0.45)',
              animation: 'pulseRing 3s ease-in-out infinite',
              filter: 'blur(8px)'
            }}
          />
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '22px',
              background: '#0f172a',
              color: '#d2ea26',
              display: 'inline-flex',
              alignItems: 'center',
              justify: 'center',
              position: 'relative',
              boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)',
              animation: 'floatIcon 4s ease-in-out infinite'
            }}
          >
            <ShieldAlert size={34} />
          </div>
        </div>

        {/* Animated Status Pill */}
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: '20px',
              background: 'rgba(15, 23, 42, 0.06)',
              color: '#0f172a',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            <Sparkles size={13} color="#849a00" style={{ animation: 'spinSlow 10s linear infinite' }} />
            Page Maintenance in Progress
          </span>
        </div>

        {/* Main Light Heading */}
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          {pageName} Under Maintenance
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 28px 0', lineHeight: 1.55 }}>
          {displayMessage}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '28px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#0f172a',
              color: '#ffffff',
              borderRadius: '50px',
              fontWeight: '800',
              fontSize: '13.5px',
              textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.15)',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} color="#d2ea26" />
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
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>Previous Page</span>
          </button>
        </div>

        {/* Direct Contact Bar */}
        <div style={{ padding: '14px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12.5px', color: '#475569', marginBottom: '24px', flexWrap: 'wrap' }}>
          <Mail size={15} color="#0f172a" />
          <span>Direct Contact: <a href={`mailto:${contactEmail}`} style={{ color: '#0f172a', fontWeight: '700', textDecoration: 'none' }}>{contactEmail}</a></span>
        </div>

        {/* Admin Footer Link */}
        <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
          <a href="/admin/login" style={{ fontSize: '11.5px', color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} />
            <span>Administrator Access</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;

import React, { useState } from 'react';
import api from '../../api/axios';

const MaintenanceOverlay = ({ message }) => {
  const [notified, setNotified] = useState(() => {
    try {
      return !!localStorage.getItem('visitor_notify_enabled');
    } catch (e) {
      return false;
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const handle1ClickNotify = async () => {
    setSubmitting(true);
    try {
      await api.post('/inquiries', {
        name: 'Website Visitor (1-Click Notification)',
        email: '1-click-visitor@portfolio.com',
        service: '1-Click Notify When Live',
        budget: 'N/A',
        message: '1-Click Visitor requested notification when portfolio updating is complete.'
      }).catch(() => {});
      localStorage.setItem('visitor_notify_enabled', 'true');
      setNotified(true);
    } catch (err) {
      localStorage.setItem('visitor_notify_enabled', 'true');
      setNotified(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="maintenance-overlay-screen" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      color: '#111827',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
    }}>
      {/* Inline Animation CSS */}
      <style>{`
        @keyframes spinGear {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>

      {/* Main Minimalist Container */}
      <div style={{
        maxWidth: '440px',
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '24px',
        padding: '44px 30px',
        textAlign: 'center',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Animated Spin Icon Wrapper */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#f3f4f6',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'spinGear 6s linear infinite' }}
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>

        {/* Minimal Updating Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '20px',
          backgroundColor: '#fef3c7',
          color: '#b45309',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#d97706',
            animation: 'pulseDot 1.5s infinite ease-in-out'
          }}></span>
          Updating in Progress
        </div>

        {/* Main Clean Heading */}
        <h1 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#111827',
          margin: '0 0 10px 0',
          letterSpacing: '-0.02em'
        }}>
          Website is Currently Updating
        </h1>

        {/* Short Text */}
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0,
          lineHeight: 1.55
        }}>
          {message || 'We are currently making updates to our website. Please check back shortly.'}
        </p>

        {/* 1-Click Notify Me Button Section */}
        <div style={{
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid #f3f4f6'
        }}>
          {notified ? (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#047857',
              borderRadius: '30px',
              padding: '10px 16px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%'
            }}>
              <span>✨</span>
              <span>We will notify you when live!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handle1ClickNotify}
              disabled={submitting}
              style={{
                width: '100%',
                padding: '13px 24px',
                borderRadius: '30px',
                border: 'none',
                backgroundColor: '#111827',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: submitting ? 'wait' : 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.12)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🔔</span>
              <span>{submitting ? 'Setting Notification...' : 'Notify Me When Live'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;

import React from 'react';
import { Link } from 'react-router-dom';

const MaintenanceOverlay = ({ message, onCheckAgain }) => {
  return (
    <div className="maintenance-overlay-screen" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0a0b0e',
      color: '#ffffff',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflowY: 'auto'
    }}>
      {/* Background Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(210, 234, 38, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none',
        borderRadius: '50%'
      }}></div>

      <div style={{
        maxWidth: '640px',
        width: '100%',
        background: 'rgba(18, 20, 26, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '28px',
        padding: '48px 36px',
        textAlign: 'center',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Animated Tool/Pulsing Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(210, 234, 38, 0.12)',
          border: '1px solid rgba(210, 234, 38, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          fontSize: '36px',
          boxShadow: '0 0 30px rgba(210, 234, 38, 0.2)'
        }}>
          🛠️
        </div>

        {/* Live Status Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '30px',
          background: 'rgba(234, 179, 8, 0.15)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          color: '#eab308',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#eab308',
            boxShadow: '0 0 10px #eab308'
          }}></span>
          Portfolio Updating in Progress
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: '16px',
          lineHeight: 1.2
        }}>
          Portfolio is Currently Being Updated ✨
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#94a3b8',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          {message || 'We are currently adding fresh case studies, polishing projects, and making content updates. Please check back in a few minutes!'}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onCheckAgain || (() => window.location.reload())}
            className="btn-primary-glow"
            style={{
              padding: '12px 28px',
              borderRadius: '50px',
              border: 'none',
              background: '#d2ea26',
              color: '#000',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🔄 Check Status Again
          </button>

          <Link
            to="/admin/login"
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🔐 Owner / Admin Login
          </Link>
        </div>

        <div style={{
          marginTop: '36px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '13px',
          color: '#64748b'
        }}>
          Need urgent inquiry? Email: <a href="mailto:muhammedklkm@gmail.com" style={{ color: '#d2ea26', textDecoration: 'none' }}>muhammedklkm@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;

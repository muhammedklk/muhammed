import React from 'react';

const MaintenanceScreen = ({ message }) => {
  const displayMsg = message || 'We are improving the experience for you. Please check back shortly.';

  return (
    <div
      className="maintenance-screen-wrapper"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0b0e',
        color: '#f8fafc',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
        overflow: 'hidden'
      }}
    >
      {/* Dynamic Background Ambient Spotlights */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(210, 234, 38, 0.05) 50%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Inline Keyframe Animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounceDot {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.4; transform: translateY(-4px); }
        }
      `}</style>

      {/* Glassmorphism Main Card Container */}
      <div
        style={{
          maxWidth: '520px',
          width: '100%',
          background: 'rgba(18, 20, 26, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '28px',
          padding: '48px 36px',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 2,
          animation: 'pulseGlow 6s infinite ease-in-out'
        }}
      >
        {/* Brand Header Logo */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
              <rect x="10" y="10" width="12" height="12" rx="3.5" fill="currentColor" />
            </svg>
          </div>
          <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Muhammed<span style={{ color: '#ef4444' }}>.</span>
          </span>
        </div>

        {/* Animated Spin Icon Container */}
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)'
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: 'spinSlow 8s linear infinite' }}
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>

        {/* Status Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '30px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '20px'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              animation: 'bounceDot 1.5s infinite ease-in-out'
            }}
          />
          <span>Maintenance Mode Active</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '0 0 12px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.25
          }}
        >
          Website is Currently Being Updated
        </h1>

        {/* Subtitle / Description */}
        <p
          style={{
            fontSize: '15px',
            color: '#94a3b8',
            margin: '0 0 28px 0',
            lineHeight: 1.6
          }}
        >
          {displayMsg}
        </p>

        {/* Footer Note */}
        <div
          style={{
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '13px',
            color: '#64748b'
          }}
        >
          <span>✨ System upgrades in progress. Automatic return when live.</span>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;

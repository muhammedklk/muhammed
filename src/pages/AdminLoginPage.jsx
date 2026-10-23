import React, { useState, useCallback } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

// Simple session-based admin auth. Password is checked client-side for this portfolio.
// The real protection is that the admin panel URL + password together act as a secret.
const ADMIN_PASSWORD = 'muhammedk@admin2024';
const SESSION_KEY = 'portfolio_admin_auth';

export function isAdminAuthenticated() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function clearAdminAuth() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

export default function AdminLoginPage({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!password) {
        setError('Please enter the admin password.');
        return;
      }
      setLoading(true);
      setError('');
      // Small delay for UX feel
      setTimeout(() => {
        if (password === ADMIN_PASSWORD) {
          try {
            sessionStorage.setItem(SESSION_KEY, 'true');
          } catch {}
          setLoading(false);
          onSuccess?.();
        } else {
          setLoading(false);
          setError('Incorrect password. Please try again.');
          setPassword('');
          setShake(true);
          setTimeout(() => setShake(false), 600);
        }
      }, 500);
    },
    [password, onSuccess]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: "'Mona Sans', system-ui, -apple-system, sans-serif",
        padding: '1.5rem',
      }}
    >
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
        .admin-login-shake { animation: shake 0.5s ease; }
        .admin-login-input:focus { 
          outline: none; 
          border-color: #0f172a !important; 
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08) !important;
        }
        .admin-login-btn:hover:not(:disabled) { background: #1e293b !important; }
        .admin-login-toggle:hover { color: #0f172a !important; }
      `}</style>

      <div
        className={shake ? 'admin-login-shake' : ''}
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
        }}
      >
        {/* Brand Icon */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: '#f1f5f9',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <ShieldCheck size={24} color="#0f172a" />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.02em',
            margin: '0 0 0.35rem 0',
          }}
        >
          Admin Portal
        </h1>
        <p
          style={{
            fontSize: '0.9rem',
            color: '#64748b',
            margin: '0 0 2rem 0',
          }}
        >
          Enter your password to access the CMS.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Error */}
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                color: '#be123c',
                borderRadius: '10px',
                padding: '0.65rem 0.9rem',
                fontSize: '0.84rem',
                fontWeight: 500,
                marginBottom: '1rem',
              }}
            >
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          {/* Password Field */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#475569',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.5rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={15}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                  pointerEvents: 'none',
                }}
              />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                className="admin-login-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  color: '#0f172a',
                  fontSize: '0.95rem',
                  padding: '0.7rem 2.8rem 0.7rem 2.4rem',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              />
              <button
                type="button"
                className="admin-login-toggle"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
            style={{
              width: '100%',
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '0.78rem 1.5rem',
              fontSize: '0.93rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'background 0.2s, opacity 0.2s',
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            {loading ? (
              <>
                <span
                  style={{
                    width: '15px',
                    height: '15px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 0.7s linear infinite',
                  }}
                />
                <span>Verifying…</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Enter Admin Panel</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#94a3b8',
            marginTop: '1.75rem',
            marginBottom: 0,
          }}
        >
          © {new Date().getFullYear()} Muhammed K — Portfolio CMS
        </p>
      </div>
    </div>
  );
}

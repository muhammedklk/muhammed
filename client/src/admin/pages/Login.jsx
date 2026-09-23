import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';
import { Lock, Mail, User, ArrowRight, AlertCircle } from '../components/Icons';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegisteringInitial, setIsRegisteringInitial] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@portfolio.com');
  const [password, setPassword] = useState('adminpassword123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegisteringInitial) {
        await authApi.registerInitial({ name, email, password });
        await login(email, password);
      } else {
        await login(email, password);
      }
      navigate('/admin');
    } catch (err) {
      console.error('Login/Register error:', err);
      let msg = err.data?.message || err.response?.data?.message || err.message;
      if (msg === 'Failed to fetch') {
        msg = 'Cannot connect to Backend API. Please check your network or Vercel server status.';
      }
      setError(msg);
      if (msg && msg.includes('Initial Admin already registered')) {
        setIsRegisteringInitial(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px 32px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)' }}>
        
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: '#0f172a', color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px', marginBottom: '16px', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)' }}>
            CMS
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            {isRegisteringInitial ? 'Setup Initial Admin' : 'Admin Portal Sign In'}
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
            {isRegisteringInitial ? 'Create the master administrator account for your portfolio' : 'Sign in to access your portfolio CMS control center'}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', color: '#dc2626', fontSize: '13px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegisteringInitial && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Senior Software Architect"
                  style={{ width: '100%', padding: '12px 14px 12px 42px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                style={{ width: '100%', padding: '12px 14px 12px 42px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ width: '100%', padding: '12px 14px 12px 42px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', color: '#0f172a', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              background: '#0f172a',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '14.5px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)',
              opacity: loading ? 0.7 : 1
            }}
          >
            <span>{loading ? 'Authenticating...' : isRegisteringInitial ? 'Create Account & Sign In' : 'Sign In to Dashboard'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Toggle Initial Bootstrap */}
        <div style={{ marginTop: '24px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <button
            type="button"
            onClick={() => { setIsRegisteringInitial(!isRegisteringInitial); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12.5px', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600' }}
          >
            {isRegisteringInitial ? 'Already created initial admin? Sign in instead' : 'First time setup? Register initial admin account'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;

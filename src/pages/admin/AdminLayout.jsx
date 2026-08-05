import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    document.body.classList.add('admin-mode');
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', background: '#0b0c10', color: '#e2e8f0', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: '270px',
        background: '#12141a',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        overflowY: 'auto'
      }}>
        {/* Brand Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #d2ea26 0%, #849a00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#08090c',
            fontWeight: 'bold'
          }}>
            M
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#fff' }}>Admin Panel</h3>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Portfolio CMS</span>
          </div>
        </div>

        {/* Navigation Links Grouped by Public Pages */}
        <nav style={{ padding: '20px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', padding: '8px 12px 4px 12px' }}>
            OVERVIEW
          </span>
          
          <NavLink
            to="/admin"
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Dashboard</span>
          </NavLink>

          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', padding: '16px 12px 4px 12px' }}>
            PAGE EDITORS
          </span>

          <NavLink
            to="/admin/page/home"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <span>🏠 Home Page</span>
          </NavLink>

          <NavLink
            to="/admin/page/about"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <span>👤 About Page</span>
          </NavLink>

          <NavLink
            to="/admin/page/works"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <span>💼 Works Page</span>
          </NavLink>

          <NavLink
            to="/admin/case-study/voyagera"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <span>📖 Case Study Page</span>
          </NavLink>

          <NavLink
            to="/admin/page/contact"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <span>✉️ Contact Page</span>
          </NavLink>

          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', padding: '16px 12px 4px 12px' }}>
            CONTENT MANAGERS
          </span>

          <NavLink
            to="/admin/projects"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span>Case Studies Grid</span>
          </NavLink>

          <NavLink
            to="/admin/faqs"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>FAQs Manager</span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>Inquiries</span>
          </NavLink>

          <NavLink
            to="/admin/profile"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Profile & Bio</span>
          </NavLink>

          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px', padding: '16px 12px 4px 12px' }}>
            SYSTEM CONTROLS
          </span>

          <NavLink
            to="/admin/site-controls"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 14px',
              borderRadius: '10px',
              color: isActive ? '#d2ea26' : '#94a3b8',
              background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600
            })}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>Site Controls</span>
          </NavLink>
        </nav>

        {/* Footer Actions */}
        <div style={{ padding: '20px 16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <a
            href="/?preview=admin"
            onClick={() => sessionStorage.setItem('admin_preview_active', 'true')}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#94a3b8',
              textDecoration: 'none',
              fontSize: '13px',
              marginBottom: '16px'
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            <span>View Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '10px',
              padding: '10px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <div style={{ flex: 1, marginLeft: '270px', width: 'calc(100vw - 270px)', minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {/* Topbar */}
        <header style={{
          height: '64px',
          background: 'rgba(18, 20, 26, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          backdropFilter: 'blur(10px)',
          sticky: 'top'
        }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            Authenticated User: <strong style={{ color: '#fff' }}>{user?.username || 'admin'}</strong>
          </div>
          <span style={{
            fontSize: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            padding: '4px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            ● Live API Connected
          </span>
        </header>

        {/* Dynamic Admin Sub-Page */}
        <main style={{ padding: '32px', flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

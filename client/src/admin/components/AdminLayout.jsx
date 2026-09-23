import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../admin.css';
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  Briefcase,
  Wrench,
  MessageSquare,
  Image,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  User,
  FileText
} from './Icons';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Control Dashboard', path: '/admin', icon: LayoutDashboard },
    
    { isHeader: true, title: 'WEBSITE CONTENT' },
    { label: 'Home Page', path: '/admin/home', icon: Sparkles },
    { label: 'Home Mockups', path: '/admin/home-selected-works', icon: FolderKanban },
    { label: 'About Page', path: '/admin/about', icon: User },
    { label: 'Projects Gallery', path: '/admin/projects', icon: FolderKanban },
    { label: 'Case Studies', path: '/admin/case-studies', icon: FileText },
    { label: 'Services & Skills', path: '/admin/services', icon: Wrench },
    { label: 'Experience & Edu', path: '/admin/experience', icon: Briefcase },
    { label: 'Contact Inbox', path: '/admin/contact', icon: MessageSquare },

    { isHeader: true, title: 'SYSTEM & SETTINGS' },
    { label: 'Media Library', path: '/admin/media', icon: Image },
    { label: 'SEO Manager', path: '/admin/seo', icon: Search },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-root" style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9', color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Mobile Drawer Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 998
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`admin-sidebar ${mobileOpen ? 'mobile-show' : ''}`}
        style={{
          width: '260px',
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          boxShadow: '2px 0 10px rgba(15, 23, 42, 0.03)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '22px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#0f172a', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px' }}>
              CMS
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>Portfolio CMS</h2>
              <span style={{ fontSize: '11px', color: '#4f46e5', fontWeight: '800', letterSpacing: '0.04em' }}>LIGHT CONTROL</span>
            </div>
          </div>
          <button className="d-lg-none border-0 bg-transparent" onClick={() => setMobileOpen(false)} style={{ cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item, idx) => {
            if (item.isHeader) {
              return (
                <div key={idx} style={{ fontSize: '10.5px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 10px 8px 10px' }}>
                  {item.title}
                </div>
              );
            }

            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  marginBottom: '4px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? '#ffffff' : '#334155',
                  background: isActive ? '#0f172a' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(15, 23, 42, 0.15)' : 'none',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={isActive ? '#ffffff' : '#64748b'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer User Box */}
        <div style={{ padding: '16px', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={user?.avatar || '/assets/profile_photo.jpg'} alt="Admin" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', display: 'block', lineHeight: 1.2 }}>{user?.name || 'Muhammed'}</span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>{user?.role || 'Administrator'}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', borderRadius: '8px', padding: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper" style={{ flex: 1, marginLeft: '260px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar Header */}
        <header className="admin-top-header" style={{ height: '64px', background: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 900, boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
            <button className="d-lg-none border-0 bg-transparent text-dark" onClick={() => setMobileOpen(true)} style={{ cursor: 'pointer' }}>
              <Menu size={22} />
            </button>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              CMS PORTAL &gt; <strong style={{ color: '#0f172a' }}>{location.pathname}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/?preview=admin"
              target="_blank"
              rel="noreferrer"
              title="Preview live site with Admin bypass token"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Live Website Preview</span>
              <ExternalLink size={14} color="#4f46e5" />
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-content-padding" style={{ flex: 1, padding: '32px 24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

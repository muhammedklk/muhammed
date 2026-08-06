import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  ExternalLink
} from './Icons';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Control Dashboard', path: '/admin', icon: LayoutDashboard },
    
    { isHeader: true, title: 'EDIT WEBSITE PAGES' },
    { label: '🏠 Edit Home Page', path: '/admin/home', icon: Sparkles },
    { label: '🖼️ Edit Home Mockups', path: '/admin/home-selected-works', icon: FolderKanban },
    { label: '👤 Edit About Page', path: '/admin/about', icon: Sparkles },
    { label: '💼 Edit Projects Page', path: '/admin/projects', icon: FolderKanban },
    { label: '📖 Edit Case Studies', path: '/admin/case-studies', icon: Sparkles },
    { label: '🛠️ Edit Services Page', path: '/admin/services', icon: Wrench },
    { label: '🎓 Edit Experience Page', path: '/admin/experience', icon: Briefcase },
    { label: '📬 Edit Contact Page', path: '/admin/contact', icon: MessageSquare },

    { isHeader: true, title: 'ASSETS & SETTINGS' },
    { label: '📁 Media Library', path: '/admin/media', icon: Image },
    { label: '🔍 SEO Manager', path: '/admin/seo', icon: Search },
    { label: '⚙️ Site & Maintenance', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-root" style={{ display: 'flex', minHeight: '100vh', background: '#090d16', color: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Sidebar Navigation */}
      <aside
        className={`admin-sidebar ${mobileOpen ? 'mobile-show' : ''}`}
        style={{
          width: '260px',
          background: '#0f172a',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 999,
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#d2ea26', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              CMS
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>Portfolio CMS</h2>
              <span style={{ fontSize: '11px', color: '#849a00', fontWeight: '700' }}>ADMIN PANEL v1.0</span>
            </div>
          </div>
          <button className="d-md-none border-0 bg-transparent text-white" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item, idx) => {
            if (item.isHeader) {
              return (
                <div key={idx} style={{ fontSize: '10.5px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '18px 10px 8px 10px' }}>
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
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#d2ea26' : '#94a3b8',
                  background: isActive ? 'rgba(210, 234, 38, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(210, 234, 38, 0.2)' : '1px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer User Box */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={user?.avatar || '/assets/profile_photo.jpg'} alt="Admin" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', lineHeight: 1.2 }}>{user?.name || 'Muhammed'}</span>
                <span style={{ fontSize: '10.5px', color: '#64748b' }}>{user?.role || 'Superadmin'}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar Header */}
        <header style={{ height: '64px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="d-md-none border-0 bg-transparent text-white" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>
              CONTROL CENTER &gt; <strong style={{ color: '#ffffff' }}>{location.pathname}</strong>
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
                background: 'rgba(210, 234, 38, 0.15)',
                border: '1px solid rgba(210, 234, 38, 0.3)',
                color: '#d2ea26',
                borderRadius: '10px',
                fontSize: '12.5px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              <span>Live Portfolio (Admin Preview)</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: '32px 24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

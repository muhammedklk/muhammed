import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const MobileDrawer = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fullscreen-menu-overlay ${isOpen ? 'active' : ''}`} id="mobile-drawer">
      <div className="overlay-header">
        <Link to="/" className="site-logo" onClick={onClose}>
          <span className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
              <rect x="10" y="10" width="12" height="12" rx="3.5" fill="currentColor" />
            </svg>
          </span>
          <span className="logo-text">Muhammed<span className="logo-dot">.</span></span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            id="theme-toggle"
            aria-label="Toggle Light/Dark Theme"
            onClick={toggleTheme}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: '50px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</span>
          </button>

          <button
            type="button"
            className="overlay-close-btn"
            id="mobile-drawer-close"
            aria-label="Close Menu"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="overlay-body">
        <div className="overlay-container">
          <div className="overlay-grid">
            {/* Left Navigation Column */}
            <nav className="overlay-nav">
              <ul className="overlay-nav-list">
                <li>
                  <NavLink to="/" className={({ isActive }) => `overlay-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                    <span className="link-num">01.</span>
                    <span className="link-text">HOME</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => `overlay-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                    <span className="link-num">02.</span>
                    <span className="link-text">ABOUT</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/works" className={({ isActive }) => `overlay-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                    <span className="link-num">03.</span>
                    <span className="link-text">PROJECTS</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => `overlay-nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                    <span className="link-num">04.</span>
                    <span className="link-text">CONTACT</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/login" className="overlay-nav-link" onClick={onClose} style={{ color: '#d2ea26' }}>
                    <span className="link-num">05.</span>
                    <span className="link-text">🔒 ADMIN PANEL</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Right Info / Inquiries Column */}
            <div className="overlay-info">
              <div className="info-group">
                <h4 className="info-label">INQUIRIES</h4>
                <a href="mailto:muhammedklkm@gmail.com" className="info-accent-link">muhammedklkm@gmail.com</a>
                <a href="tel:+919656216086" className="info-accent-link">+91 9656216086</a>
              </div>

              <div className="info-group">
                <h4 className="info-label">LOCATION</h4>
                <p className="info-text">Kerala, India (IST UTC+5:30)</p>
              </div>

              <div className="info-group">
                <h4 className="info-label">CONNECT</h4>
                <div className="info-socials">
                  <a href="https://www.linkedin.com/in/muhammed-klkm/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                  <a href="https://github.com/muhammedklk" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                  <a href="https://www.instagram.com/___muhammedk/" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;

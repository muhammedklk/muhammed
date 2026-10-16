import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, FileText, Menu, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Header({ theme, toggleTheme, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/works' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`floating-header-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="header-pill-inner">
          {/* Logo / Brand Name */}
          <Link to="/" className="header-logo">
            <span className="logo-dot"></span>
            <span className="logo-text font-serif">Muhammed K</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="header-nav d-none d-md-flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-item ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="btn-resume-header d-none d-sm-inline-flex"
              title="View & Download Resume"
            >
              <FileText size={15} />
              <span>Resume</span>
            </button>

            {/* Theme Switcher Sun/Moon Toggle */}
            <button
              onClick={toggleTheme}
              className="btn-theme-toggle"
              aria-label="Toggle Light and Dark Mode"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {theme === 'light' ? (
                <Sun size={18} className="theme-icon sun" />
              ) : (
                <Moon size={18} className="theme-icon moon" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-mobile-toggle d-md-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in d-md-none">
          <div className="mobile-drawer-inner">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mobile-drawer-divider"></div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-primary-custom w-100 justify-content-center"
            >
              <FileText size={16} />
              <span>View Resume (PDF)</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .floating-header-wrapper {
          position: fixed;
          top: 1.25rem;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: transform 0.3s ease, top 0.3s ease;
        }

        .header-pill-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: var(--bg-pill);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          padding: 0.6rem 1.4rem;
          box-shadow: var(--shadow-sm);
          transition: background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }

        .is-scrolled .header-pill-inner {
          box-shadow: var(--shadow-md);
          border-color: var(--border-strong);
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.15rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-primary);
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background-color: var(--bg-card);
          padding: 0.25rem;
          border-radius: var(--radius-pill);
          border: 1px solid var(--border-subtle);
        }

        .nav-link-item {
          padding: 0.4rem 1.1rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-pill);
          transition: color var(--transition-fast), background-color var(--transition-fast);
        }

        .nav-link-item:hover {
          color: var(--text-primary);
        }

        .nav-link-item.active {
          color: var(--text-primary);
          background-color: var(--bg-surface);
          box-shadow: var(--shadow-sm);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-resume-header {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.95rem;
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-primary);
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          transition: all var(--transition-fast);
        }

        .btn-resume-header:hover {
          background-color: var(--bg-card-hover);
          border-color: var(--border-strong);
          transform: translateY(-1px);
        }

        .btn-theme-toggle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .btn-theme-toggle:hover {
          background-color: var(--bg-card-hover);
          border-color: var(--border-strong);
          transform: rotate(15deg);
        }

        .theme-icon.sun {
          color: var(--accent-primary);
        }

        .theme-icon.moon {
          color: #A78BFA;
        }

        .btn-mobile-toggle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          margin-top: 0.75rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-nav-item {
          padding: 0.75rem 1rem;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
        }

        .mobile-nav-item.active, .mobile-nav-item:hover {
          color: var(--text-primary);
          background-color: var(--bg-card);
        }

        .mobile-drawer-divider {
          height: 1px;
          background-color: var(--border-subtle);
          margin: 0.5rem 0;
        }
      `}</style>
    </header>
  );
}

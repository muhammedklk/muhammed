import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';
import QuickChat from './QuickChat';
import Preloader from './Preloader';
import ScrollToTop from './ScrollToTop';
import LeadModal from '../common/LeadModal';
import { useLenis } from '../../hooks/useLenis';
import { Sparkles } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useLenis();

  // Auto-trigger Lead Modal if URL contains lead query parameters
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);

    if (
      location.search.includes('action=hire') ||
      location.search.includes('action=quote') ||
      location.search.includes('action=lead')
    ) {
      setIsLeadModalOpen(true);
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <Preloader />

      {/* Global Ambient Background Glows */}
      <div className="global-ambient-wrapper" aria-hidden="true">
        <div className="global-glow-tr"></div>
        <div className="global-glow-bl"></div>
      </div>

      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      <main className="main-content">{children}</main>

      {/* Sticky Floating High-Converting Lead Trigger Button */}
      <button
        type="button"
        onClick={() => setIsLeadModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 990,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #d2ea26 0%, #a8bc18 100%)',
          color: '#090d16',
          fontWeight: '800',
          fontSize: '13px',
          border: 'none',
          boxShadow: '0 10px 25px -5px rgba(210, 234, 38, 0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="lead-float-btn"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <Sparkles size={16} />
        <span>Request a Quote</span>
      </button>

      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      <Footer onOpenLeadModal={() => setIsLeadModalOpen(true)} />
      <QuickChat />
      <ScrollToTop />
    </>
  );
};

export default Layout;


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


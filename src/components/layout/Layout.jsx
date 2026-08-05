import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';
import QuickChat from './QuickChat';
import Preloader from './Preloader';
import ScrollToTop from './ScrollToTop';
import MaintenanceScreen from '../common/MaintenanceScreen';
import { useLenis } from '../../hooks/useLenis';
import { useMaintenance } from '../../context/MaintenanceContext';
import { useAuth } from '../../context/AuthContext';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { isMaintenanceMode, maintenanceMessage, isPreviewAuthorized } = useMaintenance();

  // Initialize Lenis smooth scroll
  useLenis();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.search]);

  // Authorization check for Admin or Token Preview
  const hasAdminToken = !!localStorage.getItem('admin_token');
  const isAdminOrPreview = isAuthenticated || hasAdminToken || isPreviewAuthorized;
  const isPublicRoute = !location.pathname.startsWith('/admin');

  // If Maintenance Mode is ON and user is NOT authorized (regular public visitor) -> Block with Maintenance Screen
  if (isMaintenanceMode && isPublicRoute && !isAdminOrPreview) {
    return <MaintenanceScreen message={maintenanceMessage} />;
  }

  return (
    <>
      <Preloader />

      {/* Admin / Preview Sticky Warning Banner when Maintenance Mode is ON */}
      {isMaintenanceMode && (
        <div
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            padding: '10px 18px',
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 800,
            position: 'sticky',
            top: 0,
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
          }}
        >
          <span>🚧 MAINTENANCE MODE IS ACTIVE Worldwide (Regular visitors see Maintenance Screen).</span>
          <Link
            to="/admin/site-controls"
            style={{
              background: '#ffffff',
              color: '#08090c',
              padding: '4px 14px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            Manage in Site Controls →
          </Link>
        </div>
      )}

      {/* Global Ambient Background Glows */}
      <div className="global-ambient-wrapper" aria-hidden="true">
        <div className="global-glow-tr"></div>
        <div className="global-glow-bl"></div>
      </div>

      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="main-content">{children}</main>

      <Footer />
      <QuickChat />
      <ScrollToTop />
    </>
  );
};

export default Layout;

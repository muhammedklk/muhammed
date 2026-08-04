import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileDrawer from './MobileDrawer';
import SearchOverlay from './SearchOverlay';
import QuickChat from './QuickChat';
import Preloader from './Preloader';
import ScrollToTop from './ScrollToTop';
import MaintenanceOverlay from '../common/MaintenanceOverlay';
import { useLenis } from '../../hooks/useLenis';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Initialize Lenis smooth scroll
  useLenis();

  // Fetch maintenance mode status from profile
  const fetchProfileStatus = async () => {
    try {
      const res = await api.get('/profile');
      if (res.data) {
        setIsMaintenanceMode(!!res.data.isMaintenanceMode);
        setMaintenanceMessage(res.data.maintenanceMessage || '');
      }
    } catch (err) {
      console.error('Error checking portfolio maintenance status:', err);
    }
  };

  useEffect(() => {
    fetchProfileStatus();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Show Maintenance Overlay for visitors when maintenance mode is turned ON in Admin Panel
  const isPublicRoute = !location.pathname.startsWith('/admin');
  if (isMaintenanceMode && !isAuthenticated && isPublicRoute) {
    return (
      <MaintenanceOverlay
        message={maintenanceMessage}
        onCheckAgain={fetchProfileStatus}
      />
    );
  }

  return (
    <>
      <Preloader />

      {/* Admin Floating Banner when Maintenance Mode is ON */}
      {isMaintenanceMode && isAuthenticated && (
        <div style={{
          backgroundColor: '#eab308',
          color: '#000',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 700,
          position: 'sticky',
          top: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span>🚧 Maintenance / Updating Screen is currently ACTIVE for visitors.</span>
          <Link
            to="/admin"
            style={{
              background: '#000',
              color: '#fff',
              padding: '4px 12px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontSize: '12px'
            }}
          >
            Manage in Admin Panel
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

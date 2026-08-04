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
import { getMaintenanceMode } from '../../utils/maintenanceStatus';
import api from '../../api/axios';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Start null = "unknown" so we show a blank screen until API confirms status
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(null);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [adminPreview, setAdminPreview] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Initialize Lenis smooth scroll
  useLenis();

  // Fetch maintenance mode status from API (single source of truth)
  const fetchProfileStatus = async () => {
    try {
      const res = await api.get('/profile');
      if (res.data && res.data.isMaintenanceMode !== undefined) {
        const modeStatus = !!res.data.isMaintenanceMode;
        setIsMaintenanceMode(modeStatus);
        localStorage.setItem('portfolio_maintenance_status', modeStatus ? 'true' : 'false');
        setMaintenanceMessage(res.data.maintenanceMessage || '');
      } else {
        // Fallback to localStorage if API returns no data
        setIsMaintenanceMode(getMaintenanceMode());
      }
    } catch (err) {
      console.error('Error checking portfolio maintenance status:', err);
      setIsMaintenanceMode(getMaintenanceMode());
    } finally {
      setStatusChecked(true);
    }
  };

  useEffect(() => {
    fetchProfileStatus();

    // Live background polling every 6s — all devices sync in real-time
    const interval = setInterval(fetchProfileStatus, 6000);

    const handleStatusUpdate = () => {
      setIsMaintenanceMode(getMaintenanceMode());
    };

    window.addEventListener('maintenance_updated', handleStatusUpdate);
    window.addEventListener('storage', handleStatusUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('maintenance_updated', handleStatusUpdate);
      window.removeEventListener('storage', handleStatusUpdate);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Admin Preview active check (only when clicking "View Public Website" in Admin Panel)
  const isPreviewParam = location.search.includes('preview=admin');
  const isSessionPreview = sessionStorage.getItem('admin_preview_active') === 'true';
  const isExplicitAdminPreview = isAuthenticated && (isPreviewParam || isSessionPreview || adminPreview);
  const isPublicRoute = !location.pathname.startsWith('/admin');

  // ⏳ Block ALL rendering until API status is confirmed — prevents flash of website before overlay
  if (!statusChecked) {
    return <div style={{ position: 'fixed', inset: 0, background: '#ffffff', zIndex: 99999 }} />;
  }

  // ✅ Show Maintenance Overlay when mode is ON (for visitors only)
  if (isMaintenanceMode && isPublicRoute && !isExplicitAdminPreview) {
    return (
      <MaintenanceOverlay message={maintenanceMessage} />
    );
  }

  return (
    <>
      <Preloader />

      {/* Admin Preview Mode Floating Banner when Maintenance Mode is ON */}
      {isMaintenanceMode && (
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
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <span>🚧 Maintenance Mode is ACTIVE (Visitors see "Updating Screen").</span>
          {adminPreview && (
            <button
              onClick={() => setAdminPreview(false)}
              style={{
                background: '#000',
                color: '#fff',
                border: 'none',
                padding: '4px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              🔒 Lock & View Updating Screen
            </button>
          )}
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

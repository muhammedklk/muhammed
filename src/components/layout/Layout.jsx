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
  // Initialize IMMEDIATELY from localStorage — no blocking, instant render
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => getMaintenanceMode());
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [adminPreview, setAdminPreview] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Initialize Lenis smooth scroll
  useLenis();

  // Real-time background sync with MongoDB database for maintenance state
  const fetchProfileStatus = async () => {
    try {
      const res = await api.get('/profile');

      if (res && res.data && res.data.isMaintenanceMode !== undefined) {
        // ✅ Only sync when receiving a REAL response from MongoDB (not offline fallback)
        if (!res._fromFallback) {
          const modeStatus = !!res.data.isMaintenanceMode;
          setIsMaintenanceMode(modeStatus);
          localStorage.setItem('portfolio_maintenance_status', modeStatus ? 'true' : 'false');
          if (res.data.maintenanceMessage) {
            setMaintenanceMessage(res.data.maintenanceMessage);
          }
        }
      }
    } catch (_) {
      // Network error — keep current local state
    }
  };

  useEffect(() => {
    fetchProfileStatus();

    // Poll every 3 seconds — all devices across the world sync maintenance state in real-time
    const interval = setInterval(fetchProfileStatus, 3000);

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


  // Scroll to top on route change & persist admin preview in sessionStorage
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);

    if (location.search.includes('preview=admin')) {
      try {
        sessionStorage.setItem('admin_preview_active', 'true');
      } catch (_) {}
    }
  }, [location.pathname, location.search]);

  // Admin Preview active check — allows logged-in admin to view ALL pages (Home, Works, About, Case Studies, Contact)
  const hasAdminToken = !!localStorage.getItem('admin_token');
  const isPreviewParam = location.search.includes('preview=admin');
  const isSessionPreview = sessionStorage.getItem('admin_preview_active') === 'true';
  const isExplicitAdminPreview = (isAuthenticated || hasAdminToken) || isPreviewParam || isSessionPreview || adminPreview;
  const isPublicRoute = !location.pathname.startsWith('/admin');

  // Show Maintenance Overlay ONLY for regular visitors when mode is ON
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

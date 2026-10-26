import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AIChatbot from './components/AIChatbot';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import ScrollReveal from './components/ScrollReveal';

import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Lazy-load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorksPage = lazy(() => import('./pages/WorksPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const MaintenancePage = lazy(() => import('./pages/MaintenancePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #d4baff 45%, #7C5CE1 90%)',
          boxShadow: '0 8px 20px rgba(124, 92, 225, 0.3)',
          animation: 'spherePulse 1.8s ease-in-out infinite'
        }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Loading…</span>
      </div>
    </div>
  );
}

function MainLayout() {
  const location = useLocation();
  const { maintenanceMode } = usePortfolio();
  const isAdmin = location.pathname.startsWith('/admin');

  // Granular per-page & whole-site maintenance mode check
  const activePageUnderMaintenance = (() => {
    if (isAdmin || !maintenanceMode) return null;
    if (maintenanceMode.enabled || maintenanceMode.pages?.all) return 'Entire Portfolio';
    const path = location.pathname;
    if (path === '/' && maintenanceMode.pages?.home) return 'Home Page';
    if (path.startsWith('/about') && maintenanceMode.pages?.about) return 'About Page';
    if (path.startsWith('/works') && maintenanceMode.pages?.works) return 'Works & Projects';
    if (path.startsWith('/contact') && maintenanceMode.pages?.contact) return 'Contact Page';
    return null;
  })();

  // If maintenance mode is active for this route and visitor is not accessing /admin, show MaintenancePage
  if (activePageUnderMaintenance) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<MaintenancePage targetPage={activePageUnderMaintenance} />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <CustomCursor />
      <AIChatbot />
      <SmoothScroll />
      <ScrollReveal />
      <ScrollToTop />
      {!isAdmin && <Navbar />}

      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/works/:slug" element={<CaseStudyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </PortfolioProvider>
  );
}

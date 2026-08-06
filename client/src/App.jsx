import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './admin/context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import SEO from './components/common/SEO';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';
import Maintenance from './pages/Maintenance';

import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import HeroAboutManager from './admin/pages/HeroAboutManager';
import ProjectsManager from './admin/pages/ProjectsManager';
import CaseStudyEditor from './admin/pages/CaseStudyEditor';
import ExperienceEduManager from './admin/pages/ExperienceEduManager';
import ServicesSkillsManager from './admin/pages/ServicesSkillsManager';
import TestimonialsFaqManager from './admin/pages/TestimonialsFaqManager';
import ContactInbox from './admin/pages/ContactInbox';
import HomeSelectedWorksManager from './admin/pages/HomeSelectedWorksManager';
import CaseStudyManager from './admin/pages/CaseStudyManager';
import MediaLibrary from './admin/pages/MediaLibrary';
import SettingsManager from './admin/pages/SettingsManager';
import SeoManager from './admin/pages/SeoManager';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d2ea26', fontWeight: '800' }}>
        Authenticating CMS Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const PublicRouteGuard = ({ children, pageKey }) => {
  const { settings } = usePortfolio();

  const localSettingsStr = typeof window !== 'undefined' ? localStorage.getItem('portfolio_maintenance_settings') : null;
  let localSettings = null;
  try {
    localSettings = localSettingsStr ? JSON.parse(localSettingsStr) : null;
  } catch (e) {
    localSettings = null;
  }

  const activeSettings = settings || localSettings;

  const isGlobalMaintenance = Boolean(activeSettings?.maintenanceMode);
  const isPageMaintenance = Boolean(
    pageKey && (
      activeSettings?.maintenancePages?.[pageKey] ||
      activeSettings?.maintenancePages?.[pageKey.toLowerCase()] ||
      (pageKey === 'caseStudy' && (activeSettings?.maintenancePages?.caseStudy || activeSettings?.maintenancePages?.casestudy))
    )
  );

  if (isGlobalMaintenance || isPageMaintenance) {
    const isBypass = typeof window !== 'undefined' && window.location.search.includes('preview=admin');
    if (!isBypass) {
      const pageNames = {
        home: 'Home Page',
        about: 'About Bio Page',
        projects: 'Projects Gallery',
        caseStudy: 'Case Study Showcase',
        contact: 'Contact Page'
      };
      return <Maintenance pageName={pageNames[pageKey] || 'This Page'} message={activeSettings?.maintenanceMessage} />;
    }
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<PublicRouteGuard pageKey="home"><Layout><SEO page="home" /><Home /></Layout></PublicRouteGuard>} />
              <Route path="/about" element={<PublicRouteGuard pageKey="about"><Layout><SEO page="about" /><About /></Layout></PublicRouteGuard>} />
              <Route path="/works" element={<PublicRouteGuard pageKey="projects"><Layout><SEO page="works" /><Works /></Layout></PublicRouteGuard>} />
              <Route path="/contact" element={<PublicRouteGuard pageKey="contact"><Layout><SEO page="contact" /><Contact /></Layout></PublicRouteGuard>} />
              <Route path="/case-study" element={<PublicRouteGuard pageKey="caseStudy"><Layout><SEO page="casestudy" /><CaseStudy /></Layout></PublicRouteGuard>} />
              <Route path="/case-study/:id" element={<PublicRouteGuard pageKey="caseStudy"><Layout><SEO page="casestudy" /><CaseStudy /></Layout></PublicRouteGuard>} />

              <Route path="/admin/login" element={<Login />} />

              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="home" element={<HeroAboutManager />} />
                <Route path="home-selected-works" element={<HomeSelectedWorksManager />} />
                <Route path="about" element={<HeroAboutManager />} />
                <Route path="hero-about" element={<HeroAboutManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="case-studies" element={<CaseStudyManager />} />
                <Route path="projects/:id/casestudy" element={<CaseStudyEditor />} />
                <Route path="experience" element={<ExperienceEduManager />} />
                <Route path="services" element={<ServicesSkillsManager />} />
                <Route path="services-skills" element={<ServicesSkillsManager />} />
                <Route path="testimonials-faq" element={<TestimonialsFaqManager />} />
                <Route path="contact" element={<ContactInbox />} />
                <Route path="messages" element={<ContactInbox />} />
                <Route path="media" element={<MediaLibrary />} />
                <Route path="seo" element={<SeoManager />} />
                <Route path="settings" element={<SettingsManager />} />
                <Route path="*" element={<Dashboard />} />
              </Route>

              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

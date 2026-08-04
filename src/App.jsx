import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';

// Admin Routes & Components
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHomeEditor from './pages/admin/AdminHomeEditor';
import AdminAboutEditor from './pages/admin/AdminAboutEditor';
import AdminWorksEditor from './pages/admin/AdminWorksEditor';
import AdminContactEditor from './pages/admin/AdminContactEditor';
import AdminCaseStudyEditor from './pages/admin/AdminCaseStudyEditor';
import AdminProjectsManager from './pages/admin/AdminProjectsManager';
import AdminFaqsManager from './pages/admin/AdminFaqsManager';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminProfileEditor from './pages/admin/AdminProfileEditor';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public Portfolio Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/works" element={<Layout><Works /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/case-study" element={<Layout><CaseStudy /></Layout>} />

            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Full-Stack MERN Admin Panel Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="page/home" element={<AdminHomeEditor />} />
              <Route path="page/about" element={<AdminAboutEditor />} />
              <Route path="page/works" element={<AdminWorksEditor />} />
              <Route path="page/contact" element={<AdminContactEditor />} />
              <Route path="case-study" element={<AdminCaseStudyEditor />} />
              <Route path="case-study/:id" element={<AdminCaseStudyEditor />} />
              <Route path="projects" element={<AdminProjectsManager />} />
              <Route path="faqs" element={<AdminFaqsManager />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="profile" element={<AdminProfileEditor />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

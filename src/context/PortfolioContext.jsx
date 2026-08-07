import React, { createContext, useContext, useState, useEffect } from 'react';
import { caseStudiesData } from '../data/caseStudiesData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const [contentRes, projectsRes] = await Promise.all([
        fetch('/api/content/all?t=' + Date.now()).then(r => r.json()).catch(() => null),
        fetch('/api/projects?t=' + Date.now()).then(r => r.json()).catch(() => null)
      ]);

      if (contentRes && contentRes.data) {
        setContent(contentRes.data);
      }

      const rawProjects = projectsRes?.data?.projects || projectsRes?.data || projectsRes?.projects;
      if (Array.isArray(rawProjects) && rawProjects.length > 0) {
        setProjects(rawProjects);
      } else if (Array.isArray(caseStudiesData)) {
        setProjects(caseStudiesData);
      }
    } catch (err) {
      console.warn('[PortfolioContext] API loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();

    // Re-fetch when user switches tabs back to main site
    const handleFocus = () => {
      fetchPortfolioData();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getProjectBySlug = (slugOrId) => {
    if (!slugOrId) return null;
    const lower = String(slugOrId).toLowerCase();
    
    // Check MongoDB dynamic projects array first with strict and flexible matching
    let match = projects.find(
      (p) =>
        String(p.slug || '').toLowerCase() === lower ||
        String(p.id || '').toLowerCase() === lower ||
        String(p._id || '').toLowerCase() === lower ||
        String(p.title || '').toLowerCase() === lower ||
        (p.slug && lower.includes(String(p.slug).toLowerCase())) ||
        (p.slug && String(p.slug).toLowerCase().includes(lower))
    );

    if (!match) {
      match = caseStudiesData.find(
        (p) =>
          String(p.id || '').toLowerCase() === lower ||
          String(p.slug || '').toLowerCase() === lower ||
          String(p.title || '').toLowerCase() === lower ||
          (p.id && lower.includes(String(p.id).toLowerCase()))
      );
    }

    return match || caseStudiesData[0];
  };

  return (
    <PortfolioContext.Provider
      value={{
        content,
        hero: content?.hero || null,
        about: content?.about || null,
        experiences: content?.experiences || [],
        education: content?.education || [],
        services: content?.services || [],
        skills: content?.skills || [],
        testimonials: content?.testimonials || [],
        faqs: content?.faqs || [],
        settings: content?.settings || null,
        seo: content?.seo || [],
        projects: projects.length > 0 ? projects : caseStudiesData,
        loading,
        error,
        getProjectBySlug,
        refreshPortfolio: fetchPortfolioData
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

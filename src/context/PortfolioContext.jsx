import React, { createContext, useContext, useState, useEffect } from 'react';
import { caseStudiesData } from '../data/caseStudiesData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_content_cache');
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      return null;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('portfolio_projects_cache');
      const parsed = cached ? JSON.parse(cached) : [];
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
    } catch (e) {
      return [];
    }
  });

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
        try { localStorage.setItem('portfolio_content_cache', JSON.stringify(contentRes.data)); } catch (e) {}
      }

      const rawProjects = projectsRes?.data?.projects || projectsRes?.data || projectsRes?.projects;
      if (Array.isArray(rawProjects) && rawProjects.length > 0) {
        setProjects(rawProjects);
        try { localStorage.setItem('portfolio_projects_cache', JSON.stringify(rawProjects)); } catch (e) {}
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

    return match || null;
  };

  const updateProjectLocally = (updatedProj) => {
    if (!updatedProj) return;
    setProjects((prev) => {
      const targetId = updatedProj._id || updatedProj.id;
      const idx = prev.findIndex(p => (p._id || p.id) === targetId || (p.slug && updatedProj.slug && p.slug === updatedProj.slug));
      let newList;
      if (idx !== -1) {
        newList = [...prev];
        newList[idx] = { ...newList[idx], ...updatedProj };
      } else {
        newList = [updatedProj, ...prev];
      }
      try { localStorage.setItem('portfolio_projects_cache', JSON.stringify(newList)); } catch (e) {}
      return newList;
    });
  };

  const updateAllProjectsLocally = (newList) => {
    if (!Array.isArray(newList)) return;
    setProjects(newList);
    try { localStorage.setItem('portfolio_projects_cache', JSON.stringify(newList)); } catch (e) {}
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
        refreshPortfolio: fetchPortfolioData,
        updateProjectLocally,
        updateAllProjectsLocally
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

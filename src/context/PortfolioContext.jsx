import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';
import { projects as defaultProjects } from '../data/projectsData';
import { faqItems as defaultFaqs } from '../data/faqData';

const defaultHomeContent = {
  hero: {
    headline: "Design That Feels. Experiences That Resonate.",
    subtext: "I blend human-centered design, modern front-end engineering, and aesthetic precision to create digital experiences that people connect with — seamlessly across every screen.",
    sideStatement: "Whether through intuitive user interfaces, responsive web systems, or clean front-end code, I craft digital products that people don't just use — they feel.",
    pills: ["UI/UX", "WEB DESIGN", "FRONT-END DEV"],
    ctaText: "LET'S TALK"
  },
  aboutSnippet: {
    tag: "( ABOUT )",
    text1: "Design isn't just what I do —",
    chip1: "/assets/portrait-burgundy.png",
    text2: "it's how I think. I'm",
    chip2: "/assets/mockup-nadvora-monitor.png",
    text3: "Muhammed K, a product designer & front-end developer who believes",
    chip3: "/assets/mockup-styleora.jpg",
    text4: "great products start with",
    chip4: "/assets/mockup-mahora-mobile.png",
    text5: "understanding people, not pixels.",
    readStoryText: "Read Full Story",
    downloadCvText: "DOWNLOAD CV"
  },
  servicesSection: {
    tag: "( SERVICES )",
    headline: "Crafting Intuitive Products Across Every Dimension.",
    subtitle: "I create intuitive digital experiences through human-centered UI/UX design, modern web development, and front-end engineering solutions.",
    cards: [
      {
        number: "01",
        theme: "theme-violet",
        category: "Interface & Systems",
        title: "UI/UX Design",
        tags: ["Figma Systems", "User Research", "Interactive Prototypes", "Design Handoff"],
        linkText: "EXPLORE DESIGN WORKS",
        linkUrl: "/works"
      },
      {
        number: "02",
        theme: "theme-blue",
        category: "Visual & Responsive",
        title: "Web Design",
        tags: ["Responsive Layouts", "Micro-Animations", "Design Tokens", "Brand Direction"],
        linkText: "EXPLORE WEB PROJECTS",
        linkUrl: "/works"
      },
      {
        number: "03",
        theme: "theme-emerald",
        category: "Code & 3D Engineering",
        title: "Frontend Development",
        tags: ["React.js Apps", "Three.js / WebGL", "Modern CSS3", "Performance & SEO"],
        linkText: "START A PROJECT",
        linkUrl: "/contact"
      }
    ]
  },
  worksSection: {
    tag: "( SELECTED WORKS )",
    headline: "Selected Works & Case Studies.",
    subtitle: "A curated collection of commercial UI/UX designs and digital systems.",
    buttonText: "EXPLORE ALL WORKS"
  },
  faqSection: {
    tag: "( FAQ )",
    headline: "Frequently Asked Questions.",
    subtitle: "Everything you need to know before kicking off a project together."
  }
};

const defaultAboutContent = {
  greeting: "Hi, I'm Muhammed",
  tag: "( ABOUT MY CRAFT )",
  badgeTop: "UI/UX & Web Dev",
  badgeBottom: "Available for Hire",
  leadStatement: "Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.",
  bioBody: "I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size. My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.",
  location: "Kerala / Remote",
  specialization: "Web Design, Development",
  photoUrl: "/assets/a_clean_cutout_isolated_portrait_image_on_a_transp.png",
  cards: [
    { number: "01", title: "Design & UI/UX", tag: "01 / DESIGN", description: "Figma, Adobe Photoshop, Wireframing & Prototyping, Design Systems, Mobile & Web Interface Design, UI Animation & Interaction" },
    { number: "02", title: "Frontend Development", tag: "02 / FRONTEND", description: "HTML5, CSS3, JavaScript, Bootstrap, GSAP, Responsive Design, GitHub" },
    { number: "03", title: "Creative Mindset", tag: "03 / MINDSET", description: "Empathetic research, pixel perfection, iterative prototyping, design-to-code execution" }
  ]
};

const defaultMaintenanceMode = {
  enabled: false,
  title: 'Crafting Something Extraordinary',
  message: 'Portfolio is currently undergoing scheduled updates and improvements. We will be back shortly with exciting new case studies and designs.',
  contactEmail: 'muhammedklkm@gmail.com'
};

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
  const [aboutContent, setAboutContent] = useState(defaultAboutContent);
  const [projects, setProjects] = useState(defaultProjects);
  const [faqItems, setFaqItems] = useState(defaultFaqs);
  const [maintenanceMode, setMaintenanceMode] = useState(defaultMaintenanceMode);
  const [homeContent, setHomeContent] = useState(defaultHomeContent);
  const [loading, setLoading] = useState(true);
  const [isServerConnected, setIsServerConnected] = useState(false);

  // Fetch initial data from MongoDB API
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('API response not ok');
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.personalInfo) setPersonalInfo(json.data.personalInfo);
        if (json.data.aboutContent && Object.keys(json.data.aboutContent).length > 0) {
          setAboutContent(prev => ({ ...prev, ...json.data.aboutContent }));
        }
        if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
          setProjects(json.data.projects);
        }
        if (Array.isArray(json.data.faqItems) && json.data.faqItems.length > 0) {
          setFaqItems(json.data.faqItems);
        }
        if (json.data.maintenanceMode) {
          setMaintenanceMode(prev => ({ ...prev, ...json.data.maintenanceMode }));
        }
        if (json.data.homeContent && json.data.homeContent.hero) {
          setHomeContent(prev => ({ ...prev, ...json.data.homeContent }));
        }
        setIsServerConnected(true);
      }
    } catch (err) {
      console.warn('PortfolioContext: Server offline or proxy unavailable, using static fallback data.', err.message);
      setIsServerConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Upload desktop image / file via API
  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Upload failed: ${errText}`);
    }
    const json = await res.json();
    return json; // { success: true, url: '/uploads/filename.ext', ... }
  };

  // Update Personal Info
  const updatePersonalInfo = async (updated) => {
    setPersonalInfo(updated);
    try {
      const res = await fetch('/api/content/personal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update personal info error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update About Content
  const updateAboutContent = async (updated) => {
    setAboutContent(updated);
    try {
      const res = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update about content error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update all projects
  const updateProjects = async (updated) => {
    setProjects(updated);
    try {
      const res = await fetch('/api/content/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update projects error:', e);
      return { success: false, message: e.message };
    }
  };

  // Add a project
  const addProject = async (newProj) => {
    try {
      const res = await fetch('/api/content/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProj)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setProjects(json.data);
      }
      return json;
    } catch (e) {
      console.error('Add project error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update a single project
  const updateProject = async (id, updatedProj) => {
    try {
      const res = await fetch(`/api/content/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProj)
      });
      const json = await res.json();
      if (json.success) {
        setProjects(prev => prev.map(p => (p.id === id || p.slug === id) ? { ...p, ...updatedProj } : p));
      }
      return json;
    } catch (e) {
      console.error('Update single project error:', e);
      return { success: false, message: e.message };
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      const res = await fetch(`/api/content/projects/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      if (json.success && json.projects) {
        setProjects(json.projects);
      } else {
        setProjects(prev => prev.filter(p => p.id !== id && p.slug !== id));
      }
      return json;
    } catch (e) {
      console.error('Delete project error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update FAQs
  const updateFaqItems = async (updated) => {
    setFaqItems(updated);
    try {
      const res = await fetch('/api/content/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update FAQs error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update Maintenance Mode
  const updateMaintenanceMode = async (updated) => {
    setMaintenanceMode(updated);
    try {
      const res = await fetch('/api/content/maintenance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update maintenance mode error:', e);
      return { success: false, message: e.message };
    }
  };

  // Update Home Content
  const updateHomeContent = async (updated) => {
    setHomeContent(updated);
    try {
      const res = await fetch('/api/content/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      return await res.json();
    } catch (e) {
      console.error('Update home content error:', e);
      return { success: false, message: e.message };
    }
  };

  // Reset to defaults
  const resetToDefaults = async () => {
    try {
      const res = await fetch('/api/content/reset-defaults', { method: 'POST' });
      const json = await res.json();
      if (json.success && json.data) {
        setPersonalInfo(json.data.personalInfo);
        setAboutContent(json.data.aboutContent || defaultAboutContent);
        setProjects(json.data.projects || defaultProjects);
        setFaqItems(json.data.faqItems || defaultFaqs);
        setMaintenanceMode(json.data.maintenanceMode || defaultMaintenanceMode);
        setHomeContent(json.data.homeContent || defaultHomeContent);
      }
      return json;
    } catch (e) {
      console.error('Reset error:', e);
      return { success: false, message: e.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        aboutContent,
        homeContent,
        projects,
        faqItems,
        maintenanceMode,
        loading,
        isServerConnected,
        refreshData,
        uploadMedia,
        updatePersonalInfo,
        updateAboutContent,
        updateHomeContent,
        updateProjects,
        addProject,
        updateProject,
        deleteProject,
        updateFaqItems,
        updateMaintenanceMode,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    // If used outside provider, return default static values safely
    return {
      personalInfo: defaultPersonalInfo,
      aboutContent: defaultAboutContent,
      homeContent: defaultHomeContent,
      projects: defaultProjects,
      faqItems: defaultFaqs,
      maintenanceMode: defaultMaintenanceMode,
      loading: false,
      isServerConnected: false,
      uploadMedia: async () => ({ success: false }),
      updatePersonalInfo: async () => {},
      updateAboutContent: async () => {},
      updateHomeContent: async () => {},
      updateProjects: async () => {},
      addProject: async () => {},
      updateProject: async () => {},
      deleteProject: async () => {},
      updateFaqItems: async () => {},
      updateMaintenanceMode: async () => {},
      resetToDefaults: async () => {}
    };
  }
  return ctx;
}

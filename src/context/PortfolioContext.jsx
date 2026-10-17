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
  contactEmail: 'muhammedklkm@gmail.com',
  pages: {
    all: false,
    home: false,
    about: false,
    works: false,
    contact: false
  }
};

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Initialize with localStorage if present to prevent any flash of stale data
  const [personalInfo, setPersonalInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_personal');
      return saved ? JSON.parse(saved) : defaultPersonalInfo;
    } catch { return defaultPersonalInfo; }
  });

  const [aboutContent, setAboutContent] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_about');
      return saved ? JSON.parse(saved) : defaultAboutContent;
    } catch { return defaultAboutContent; }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_projects');
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch { return defaultProjects; }
  });

  const [faqItems, setFaqItems] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_faqs');
      return saved ? JSON.parse(saved) : defaultFaqs;
    } catch { return defaultFaqs; }
  });

  const [maintenanceMode, setMaintenanceMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_maintenance');
      return saved ? JSON.parse(saved) : defaultMaintenanceMode;
    } catch { return defaultMaintenanceMode; }
  });

  const [homeContent, setHomeContent] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_home_content');
      return saved ? JSON.parse(saved) : defaultHomeContent;
    } catch { return defaultHomeContent; }
  });

  const [loading, setLoading] = useState(true);
  const [isServerConnected, setIsServerConnected] = useState(false);

  // Fetch initial data from MongoDB API
  const refreshData = useCallback(async () => {
    try {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('API response not ok');
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.personalInfo) {
          setPersonalInfo(json.data.personalInfo);
          try { localStorage.setItem('portfolio_personal', JSON.stringify(json.data.personalInfo)); } catch {}
        }
        if (json.data.aboutContent && Object.keys(json.data.aboutContent).length > 0) {
          setAboutContent(prev => {
            const next = { ...prev, ...json.data.aboutContent };
            try { localStorage.setItem('portfolio_about', JSON.stringify(next)); } catch {}
            return next;
          });
        }
        if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
          setProjects(json.data.projects);
          try { localStorage.setItem('portfolio_projects', JSON.stringify(json.data.projects)); } catch {}
        }
        if (Array.isArray(json.data.faqItems) && json.data.faqItems.length > 0) {
          setFaqItems(json.data.faqItems);
          try { localStorage.setItem('portfolio_faqs', JSON.stringify(json.data.faqItems)); } catch {}
        }
        if (json.data.maintenanceMode) {
          setMaintenanceMode(prev => {
            const next = { ...prev, ...json.data.maintenanceMode };
            try { localStorage.setItem('portfolio_maintenance', JSON.stringify(next)); } catch {}
            return next;
          });
        }
        if (json.data.homeContent && json.data.homeContent.hero) {
          setHomeContent(prev => {
            const next = { ...prev, ...json.data.homeContent };
            try { localStorage.setItem('portfolio_home_content', JSON.stringify(next)); } catch {}
            return next;
          });
        }
        setIsServerConnected(true);
      }
    } catch (err) {
      console.warn('PortfolioContext: Server offline or proxy unavailable, using cached/static data.', err.message);
      setIsServerConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Real-time automatic maintenance & live sync without page reload (across all devices & tabs)
  useEffect(() => {
    let isMounted = true;
    const checkMaintenance = async () => {
      try {
        const res = await fetch('/api/content/maintenance-status', {
          cache: 'no-store',
          headers: { 'pragma': 'no-cache', 'cache-control': 'no-cache' }
        });
        if (!res.ok) return;
        const json = await res.json();
        if (json.success && json.maintenanceMode && isMounted) {
          setMaintenanceMode(prev => {
            const prevStr = JSON.stringify(prev);
            const nextStr = JSON.stringify(json.maintenanceMode);
            if (prevStr !== nextStr) {
              try {
                localStorage.setItem('portfolio_maintenance', nextStr);
              } catch {}
              return json.maintenanceMode;
            }
            return prev;
          });
        }
      } catch (_) {}
    };

    // Fast 3-second heartbeat polling so any device in the world auto-switches screen
    const interval = setInterval(checkMaintenance, 3000);

    // Cross-tab instant sync via localStorage storage event
    const handleStorage = (e) => {
      if (e.key === 'portfolio_maintenance' && e.newValue && isMounted) {
        try {
          setMaintenanceMode(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Upload desktop image / file with automatic client compression & Base64 fallback for cross-device support
  const uploadMedia = async (file) => {
    if (file && file.type && file.type.startsWith('image/')) {
      try {
        const base64Url = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const maxDim = 1600;
              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              const compressed = canvas.toDataURL('image/webp', 0.82);
              resolve(compressed);
            };
            img.onerror = () => resolve(e.target.result);
          };
          reader.onerror = reject;
        });

        // Try server upload to get a public file URL if server is reachable
        try {
          const formData = new FormData();
          formData.append('file', file);
          const serverRes = await fetch('/api/upload', { method: 'POST', body: formData });
          if (serverRes.ok) {
            const serverJson = await serverRes.json();
            // Return base64Url as primary for multi-device cross-platform reliability, or serverJson.url
            return { success: true, url: base64Url, serverUrl: serverJson.url, filename: file.name };
          }
        } catch (_) {}

        return { success: true, url: base64Url, filename: file.name };
      } catch (err) {
        console.warn('Image processing fallback to server upload', err);
      }
    }

    // Default upload for non-images (PDFs, etc.)
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
    return json;
  };

  // Update Personal Info
  const updatePersonalInfo = async (updated) => {
    setPersonalInfo(updated);
    try { localStorage.setItem('portfolio_personal', JSON.stringify(updated)); } catch {}
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
    try { localStorage.setItem('portfolio_about', JSON.stringify(updated)); } catch {}
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
    try { localStorage.setItem('portfolio_projects', JSON.stringify(updated)); } catch {}
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
        try { localStorage.setItem('portfolio_projects', JSON.stringify(json.data)); } catch {}
      } else {
        const next = [newProj, ...projects];
        setProjects(next);
        try { localStorage.setItem('portfolio_projects', JSON.stringify(next)); } catch {}
      }
      return json;
    } catch (e) {
      console.error('Add project error:', e);
      const next = [newProj, ...projects];
      setProjects(next);
      try { localStorage.setItem('portfolio_projects', JSON.stringify(next)); } catch {}
      return { success: true, message: 'Saved locally' };
    }
  };

  // Update a single project
  const updateProject = async (id, updatedProj) => {
    const nextProjects = projects.map(p => (p.id === id || p.slug === id) ? { ...p, ...updatedProj } : p);
    setProjects(nextProjects);
    try { localStorage.setItem('portfolio_projects', JSON.stringify(nextProjects)); } catch {}

    try {
      const res = await fetch(`/api/content/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProj)
      });
      const json = await res.json();
      return json;
    } catch (e) {
      console.error('Update single project error:', e);
      return { success: true, message: 'Saved locally' };
    }
  };

  // Toggle project featured flag on Home Page
  const toggleProjectFeatured = async (id) => {
    const target = projects.find(p => p.id === id || p.slug === id);
    if (!target) return;
    const updated = { ...target, featured: !target.featured };
    return await updateProject(id, updated);
  };

  // Delete project
  const deleteProject = async (id) => {
    const nextProjects = projects.filter(p => p.id !== id && p.slug !== id);
    setProjects(nextProjects);
    try { localStorage.setItem('portfolio_projects', JSON.stringify(nextProjects)); } catch {}

    try {
      const res = await fetch(`/api/content/projects/${id}`, {
        method: 'DELETE'
      });
      const json = await res.json();
      return json;
    } catch (e) {
      console.error('Delete project error:', e);
      return { success: true, message: 'Deleted locally' };
    }
  };

  // Update FAQs
  const updateFaqItems = async (updated) => {
    setFaqItems(updated);
    try { localStorage.setItem('portfolio_faqs', JSON.stringify(updated)); } catch {}
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
    try { localStorage.setItem('portfolio_maintenance', JSON.stringify(updated)); } catch {}
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
    try { localStorage.setItem('portfolio_home_content', JSON.stringify(updated)); } catch {}
    try {
      const res = await fetch('/api/content/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const json = await res.json();
      if (json && json.data) {
        setHomeContent(json.data);
        try { localStorage.setItem('portfolio_home_content', JSON.stringify(json.data)); } catch {}
      }
      return json;
    } catch (e) {
      console.error('Update home content error:', e);
      return { success: true, message: 'Saved locally' };
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

        try {
          localStorage.setItem('portfolio_personal', JSON.stringify(json.data.personalInfo));
          localStorage.setItem('portfolio_about', JSON.stringify(json.data.aboutContent || defaultAboutContent));
          localStorage.setItem('portfolio_projects', JSON.stringify(json.data.projects || defaultProjects));
          localStorage.setItem('portfolio_faqs', JSON.stringify(json.data.faqItems || defaultFaqs));
          localStorage.setItem('portfolio_maintenance', JSON.stringify(json.data.maintenanceMode || defaultMaintenanceMode));
          localStorage.setItem('portfolio_home_content', JSON.stringify(json.data.homeContent || defaultHomeContent));
        } catch {}
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
        toggleProjectFeatured,
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

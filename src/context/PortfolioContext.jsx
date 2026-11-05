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

const LIVE_URLS_MAP = {
  'ronarai-restaurant': 'https://ronaraiksa.com/',
  'gemini-music-awards': 'https://geminimusicaward.com/',
  'styleora-luxury-store': 'https://styleorashop.vercel.app/',
  'nadvora-expeditions': 'https://nadvoratravel.vercel.app/'
};

const ORDERED_SLUGS = [
  'ronarai-restaurant',
  'gemini-music-awards',
  'styleora-luxury-store',
  'nadvora-expeditions'
];

function syncProjectsOrderAndUrls(projectList) {
  if (!Array.isArray(projectList) || projectList.length === 0) return defaultProjects;
  
  const updatedList = projectList.map(p => {
    const slug = p.slug || p.id;
    if (LIVE_URLS_MAP[slug]) {
      return { ...p, liveUrl: LIVE_URLS_MAP[slug] };
    }
    return p;
  });

  const topProjects = [];
  ORDERED_SLUGS.forEach(slug => {
    const found = updatedList.find(p => p.slug === slug || p.id === slug) ||
                  defaultProjects.find(p => p.slug === slug || p.id === slug);
    if (found && !topProjects.some(tp => (tp.slug || tp.id) === (found.slug || found.id))) {
      topProjects.push(found);
    }
  });

  const remaining = updatedList.filter(p => !ORDERED_SLUGS.includes(p.slug) && !ORDERED_SLUGS.includes(p.id));
  const result = [...topProjects, ...remaining];

  try {
    localStorage.setItem('portfolio_projects', JSON.stringify(result));
  } catch {}

  return result;
}

function syncPersonalInfo(info) {
  if (!info) return defaultPersonalInfo;
  const clone = { ...defaultPersonalInfo, ...info };
  clone.socials = { ...defaultPersonalInfo.socials, ...(info.socials || {}) };
  if (!clone.socials.instagram || clone.socials.instagram.includes('muhammedklk')) {
    clone.socials.instagram = "https://www.instagram.com/___muhammedk/";
  }
  return clone;
}

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  // Initialize with localStorage if present to prevent any flash of stale data
  const [personalInfo, setPersonalInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_personal');
      return saved ? syncPersonalInfo(JSON.parse(saved)) : defaultPersonalInfo;
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
      if (saved) {
        const parsed = JSON.parse(saved);
        return syncProjectsOrderAndUrls(parsed);
      }
      return defaultProjects;
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

  // Fetch initial data from MongoDB API with quick timeout so offline/static loads instantly
  const refreshData = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600);
    try {
      const res = await fetch('/api/content', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('API response not ok');
      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.personalInfo) {
          const syncedPersonal = syncPersonalInfo(json.data.personalInfo);
          setPersonalInfo(syncedPersonal);
          try { localStorage.setItem('portfolio_personal', JSON.stringify(syncedPersonal)); } catch {}
        }
        if (json.data.aboutContent && Object.keys(json.data.aboutContent).length > 0) {
          setAboutContent(prev => {
            const next = { ...prev, ...json.data.aboutContent };
            try { localStorage.setItem('portfolio_about', JSON.stringify(next)); } catch {}
            return next;
          });
        }
        if (Array.isArray(json.data.projects) && json.data.projects.length > 0) {
          const synced = syncProjectsOrderAndUrls(json.data.projects);
          setProjects(synced);
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
      clearTimeout(timeoutId);
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);
      try {
        const res = await fetch('/api/content/maintenance-status', {
          signal: controller.signal,
          cache: 'no-store',
          headers: { 'pragma': 'no-cache', 'cache-control': 'no-cache' }
        });
        clearTimeout(timeoutId);
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
      } catch (_) {
        clearTimeout(timeoutId);
      }
    };

    // 15-second heartbeat polling to avoid blocking main thread when local server is offline
    const interval = setInterval(checkMaintenance, 15000);

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

  // Upload desktop image / file with automatic client compression & server upload
  const uploadMedia = async (file) => {
    if (!file) return { success: false, message: 'No file provided' };

    // 1. Try server upload first if available
    try {
      const formData = new FormData();
      formData.append('file', file);
      const serverRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (serverRes.ok) {
        const serverJson = await serverRes.json();
        if (serverJson.success && serverJson.url) {
          return { success: true, url: serverJson.url, filename: file.name };
        }
      }
    } catch (_) {
      // Server not reachable or error, continue to client fallback
    }

    // 2. Client-side compression for images
    if (file.type && file.type.startsWith('image/')) {
      try {
        const base64Url = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target.result;
            const img = new Image();

            // Attach event handlers BEFORE setting src
            img.onload = () => {
              try {
                const canvas = document.createElement('canvas');
                let width = img.naturalWidth || img.width || 800;
                let height = img.naturalHeight || img.height || 600;
                const maxDim = 1200; // Optimal size for crisp display and minimal memory

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
                if (ctx) {
                  ctx.drawImage(img, 0, 0, width, height);
                  const compressed = canvas.toDataURL('image/webp', 0.82);
                  resolve(compressed || dataUrl);
                } else {
                  resolve(dataUrl);
                }
              } catch (canvasErr) {
                console.warn('Canvas compression error:', canvasErr);
                resolve(dataUrl);
              }
            };

            img.onerror = () => resolve(dataUrl);
            img.src = dataUrl;

            // Handle immediate cached completion
            if (img.complete && img.naturalWidth !== 0) {
              img.onload();
            }
          };

          reader.onerror = () => resolve('');
          reader.readAsDataURL(file);
        });

        if (base64Url) {
          return { success: true, url: base64Url, filename: file.name };
        }
      } catch (err) {
        console.warn('Image processing fallback error:', err);
      }
    }

    // 3. For non-images (PDFs, docs) — convert to raw data URL
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      return { success: true, url: dataUrl, filename: file.name };
    } catch (err) {
      return { success: false, message: `Upload failed: ${err.message}` };
    }
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
    const projWithId = {
      ...newProj,
      id: newProj.id || 'project-' + Date.now(),
      slug: newProj.slug || (newProj.title ? newProj.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'project-' + Date.now())
    };

    const next = [projWithId, ...projects];
    setProjects(next);
    try { localStorage.setItem('portfolio_projects', JSON.stringify(next)); } catch {}

    try {
      const res = await fetch('/api/content/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projWithId)
      });
      const json = await res.json();
      if (json.success && json.data) {
        setProjects(json.data);
        try { localStorage.setItem('portfolio_projects', JSON.stringify(json.data)); } catch {}
      }
      return json;
    } catch (e) {
      console.error('Add project error:', e);
      return { success: true, message: 'Saved locally' };
    }
  };

  // Update a single project
  const updateProject = async (id, updatedProj) => {
    const targetId = id || updatedProj?.id || updatedProj?.slug;
    const nextProjects = projects.map(p => 
      (p.id === targetId || p.slug === targetId || (updatedProj?.slug && p.slug === updatedProj.slug) || (p._id && p._id === targetId))
        ? { ...p, ...updatedProj, id: p.id || targetId }
        : p
    );
    setProjects(nextProjects);
    try { localStorage.setItem('portfolio_projects', JSON.stringify(nextProjects)); } catch {}

    try {
      const res = await fetch(`/api/content/projects/${targetId}`, {
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

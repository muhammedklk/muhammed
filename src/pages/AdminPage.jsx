import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Eye, 
  Layout, 
  User, 
  Briefcase, 
  HelpCircle, 
  FileText, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Lock,
  Hammer,
  Power,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import './admin.css';

export default function AdminPage() {
  const {
    personalInfo,
    aboutContent,
    homeContent,
    projects,
    faqItems,
    maintenanceMode,
    isServerConnected,
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
  } = usePortfolio();

  // Active Tab
  const [activeTab, setActiveTab] = useState('general');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Local Editable States
  const [personalForm, setPersonalForm] = useState(personalInfo);
  const [aboutForm, setAboutForm] = useState(aboutContent);
  const [homeForm, setHomeForm] = useState(homeContent);
  const [projectsList, setProjectsList] = useState(projects);
  const [faqsList, setFaqsList] = useState(faqItems);
  const [maintForm, setMaintForm] = useState(maintenanceMode || { enabled: false });

  // Sync with context
  useEffect(() => { setPersonalForm(personalInfo); }, [personalInfo]);
  useEffect(() => { setAboutForm(aboutContent); }, [aboutContent]);
  useEffect(() => { setHomeForm(homeContent); }, [homeContent]);
  useEffect(() => { setProjectsList(projects); }, [projects]);
  useEffect(() => { setFaqsList(faqItems); }, [faqItems]);
  useEffect(() => { setMaintForm(maintenanceMode || { enabled: false }); }, [maintenanceMode]);

  // Project editing state
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectForm, setProjectForm] = useState(null);

  // Toast / notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedMediaList, setUploadedMediaList] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // Helper for desktop file upload
  const handleFileUpload = async (e, onComplete) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast(`Uploading ${file.name}...`, 'info');
      const res = await uploadMedia(file);
      if (res && res.url) {
        onComplete(res.url);
        setUploadedMediaList(prev => [res.url, ...prev]);
        showToast('Image uploaded successfully from your desktop!', 'success');
      } else {
        throw new Error(res.message || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      showToast(`Upload error: ${err.message}`, 'error');
    } finally {
      e.target.value = '';
    }
  };

  // Toggle Maintenance Mode Quick Switch
  const handleToggleMaintenance = async () => {
    const newStatus = !maintForm.enabled;
    const updated = { ...maintForm, enabled: newStatus };
    setMaintForm(updated);
    setIsSaving(true);
    const res = await updateMaintenanceMode(updated);
    setIsSaving(false);
    if (res && res.success !== false) {
      if (newStatus) {
        showToast('⚠️ Maintenance Mode is now ACTIVE. Public visitors see the Under Maintenance screen.', 'warning');
      } else {
        showToast('✅ Maintenance Mode turned OFF. Site is now LIVE to the public!', 'success');
      }
    } else {
      showToast('Failed to update maintenance mode', 'error');
    }
  };

  const handleSaveMaintenanceSettings = async () => {
    setIsSaving(true);
    const res = await updateMaintenanceMode(maintForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      showToast('Maintenance settings saved to MongoDB!', 'success');
    } else {
      showToast('Failed to save maintenance settings', 'error');
    }
  };

  const handleSaveGeneral = async () => {
    setIsSaving(true);
    const res = await updatePersonalInfo(personalForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      showToast('General profile saved to MongoDB!', 'success');
    } else {
      showToast('Failed to save changes', 'error');
    }
  };

  const handleSaveAbout = async () => {
    setIsSaving(true);
    const res = await updateAboutContent(aboutForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      showToast('About page content saved to MongoDB!', 'success');
    } else {
      showToast('Failed to save changes', 'error');
    }
  };

  const handleSaveFaqs = async () => {
    setIsSaving(true);
    const res = await updateFaqItems(faqsList);
    setIsSaving(false);
    if (res && res.success !== false) {
      showToast('FAQs saved to MongoDB!', 'success');
    } else {
      showToast('Failed to save changes', 'error');
    }
  };

  const handleSaveHome = async () => {
    setIsSaving(true);
    const res = await updateHomeContent(homeForm);
    setIsSaving(false);
    if (res && res.success !== false) {
      showToast('Home page content saved to MongoDB!', 'success');
    } else {
      showToast('Failed to save home content', 'error');
    }
  };

  const handleSaveCurrentProject = async () => {
    if (!projectForm.title || !projectForm.title.trim()) {
      showToast('Project title is required!', 'error');
      return;
    }

    setIsSaving(true);
    if (isCreatingProject) {
      const res = await addProject(projectForm);
      setIsSaving(false);
      if (res && res.success !== false) {
        showToast('New project created and saved to MongoDB!', 'success');
        setIsCreatingProject(false);
        setSelectedProjectId(null);
        setProjectForm(null);
      } else {
        showToast(res.message || 'Failed to create project', 'error');
      }
    } else {
      const res = await updateProject(projectForm.id, projectForm);
      setIsSaving(false);
      if (res && res.success !== false) {
        showToast('Project updated in MongoDB!', 'success');
        setSelectedProjectId(null);
        setProjectForm(null);
      } else {
        showToast(res.message || 'Failed to update project', 'error');
      }
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const res = await deleteProject(id);
      if (res && res.success !== false) {
        showToast(`Project "${title}" deleted`, 'success');
        if (selectedProjectId === id) {
          setSelectedProjectId(null);
          setProjectForm(null);
        }
      } else {
        showToast('Failed to delete project', 'error');
      }
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all portfolio data back to default values?')) {
      const res = await resetToDefaults();
      if (res && res.success !== false) {
        showToast('Reset all portfolio data to defaults successfully!', 'success');
      }
    }
  };

  const menuItems = [
    { id: 'general', label: 'Profile & Hero', icon: User },
    { id: 'home', label: 'Home Page Sections', icon: Layout },
    { id: 'about', label: 'About Page', icon: FileText },
    { id: 'projects', label: 'Works & Projects', icon: Briefcase, count: projectsList?.length || 0 },
    { id: 'faqs', label: 'FAQs Management', icon: HelpCircle, count: faqsList?.length || 0 },
    { id: 'media', label: 'Desktop Media Uploader', icon: ImageIcon },
    { id: 'maintenance', label: 'Maintenance Mode', icon: Hammer, badge: maintForm.enabled ? 'ACTIVE' : null }
  ];

  return (
    <div className="admin-light-layout">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} />}
          {toast.type === 'error' && <AlertCircle size={18} />}
          {toast.type === 'warning' && <AlertCircle size={18} />}
          {toast.type === 'info' && <RefreshCw size={18} className="spin" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ============================================================
          SIDEBAR NAVIGATION (Light Theme)
      ============================================================ */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
        
        {/* Sidebar Brand Header */}
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <div className="admin-brand-icon-light">
              <ShieldCheck size={20} color="#2563eb" />
            </div>
            <div>
              <h2 className="admin-brand-name">Portfolio CMS</h2>
              <span className="admin-brand-badge">Admin Hub</span>
            </div>
          </div>
          <button 
            type="button" 
            className="admin-mobile-close-btn"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Maintenance Switch Widget in Sidebar */}
        <div className="admin-sidebar-maintenance-box">
          <div className="admin-maint-status-row">
            <div className="admin-maint-label-group">
              <span className="admin-maint-title">Site Maintenance</span>
              <span className={`admin-maint-pill ${maintForm.enabled ? 'active' : 'live'}`}>
                {maintForm.enabled ? '⚠️ UNDER MAINTENANCE' : '● LIVE TO PUBLIC'}
              </span>
            </div>

            {/* iOS-Style Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={maintForm.enabled}
              onClick={handleToggleMaintenance}
              className={`admin-toggle-switch ${maintForm.enabled ? 'enabled' : ''}`}
              title={maintForm.enabled ? 'Turn OFF Maintenance Mode' : 'Turn ON Maintenance Mode'}
            >
              <span className="admin-toggle-knob" />
            </button>
          </div>
        </div>

        {/* Navigation Menu List */}
        <nav className="admin-sidebar-nav">
          <span className="admin-nav-section-title">CONTENT SECTIONS</span>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
              >
                <div className="admin-nav-item-left">
                  <Icon size={18} className="admin-nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className="admin-nav-count">{item.count}</span>
                )}
                {item.badge && (
                  <span className="admin-nav-badge-warn">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div className="admin-sidebar-footer">
          <div className="admin-db-status-light">
            <span className={`admin-db-dot ${isServerConnected ? 'connected' : 'offline'}`} />
            <span>{isServerConnected ? 'MongoDB Atlas Connected' : 'Local Fallback Mode'}</span>
          </div>

          <div className="admin-sidebar-action-btns">
            <a href="/" target="_blank" rel="noopener noreferrer" className="admin-sidebar-btn-site">
              <Eye size={15} />
              <span>Preview Site</span>
            </a>
            <button type="button" onClick={handleReset} className="admin-sidebar-btn-reset" title="Reset default data">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* ============================================================
          MAIN CONTENT AREA (Light Theme)
      ============================================================ */}
      <div className="admin-main-wrap">
        
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="admin-breadcrumb">
              <span className="admin-crumb-parent">CMS Admin</span>
              <ChevronRight size={14} color="#94a3b8" />
              <span className="admin-crumb-current">
                {menuItems.find(m => m.id === activeTab)?.label || 'General'}
              </span>
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* Quick Live Preview */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-btn-preview-link"
            >
              <ExternalLink size={14} />
              <span>Open Live Website</span>
            </a>

            {/* User Avatar */}
            <div className="admin-user-pill">
              <div className="admin-user-avatar">MK</div>
              <span className="admin-user-name">Muhammed K</span>
            </div>
          </div>
        </header>

        {/* Tab Body Contents */}
        <main className="admin-content-body">
          
          {/* ============================================================
              TAB 1: GENERAL & PROFILE & HERO
          ============================================================ */}
          {activeTab === 'general' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">Profile & Identity</h2>
                  <p className="admin-card-desc-light">Personal contact numbers, email address, role title, and social accounts.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleSaveGeneral} 
                  disabled={isSaving}
                  className="admin-btn-save-light"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
                </button>
              </div>

              <div className="admin-form-grid-light">
                <div className="admin-form-group-light">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={personalForm.name || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Professional Role / Title</label>
                  <input
                    type="text"
                    value={personalForm.title || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={personalForm.email || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={personalForm.phone || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Location / City</label>
                  <input
                    type="text"
                    value={personalForm.location || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Availability Status Badge</label>
                  <input
                    type="text"
                    value={personalForm.statusText || ''}
                    onChange={(e) => setPersonalForm({ ...personalForm, statusText: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                {/* CV Upload */}
                <div className="admin-form-group-light full-col">
                  <label>Resume / CV (PDF or Download URL)</label>
                  <div className="admin-upload-box-row">
                    <input
                      type="text"
                      value={personalForm.cvPath || ''}
                      onChange={(e) => setPersonalForm({ ...personalForm, cvPath: e.target.value })}
                      placeholder="/assets/muhammedk-cv.pdf"
                      className="admin-input-light"
                    />
                    <label className="admin-btn-upload-light">
                      <Upload size={16} />
                      <span>Upload PDF from Desktop</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => handleFileUpload(e, (url) => setPersonalForm(prev => ({ ...prev, cvPath: url })))}
                      />
                    </label>
                  </div>
                </div>

                {/* Social Networks */}
                <div className="admin-form-group-light full-col">
                  <h3 className="admin-subheading-light">Social Media Links</h3>
                </div>

                <div className="admin-form-group-light">
                  <label>LinkedIn URL</label>
                  <input
                    type="text"
                    value={personalForm.socials?.linkedin || ''}
                    onChange={(e) => setPersonalForm({
                      ...personalForm,
                      socials: { ...personalForm.socials, linkedin: e.target.value }
                    })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>GitHub URL</label>
                  <input
                    type="text"
                    value={personalForm.socials?.github || ''}
                    onChange={(e) => setPersonalForm({
                      ...personalForm,
                      socials: { ...personalForm.socials, github: e.target.value }
                    })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Instagram URL</label>
                  <input
                    type="text"
                    value={personalForm.socials?.instagram || ''}
                    onChange={(e) => setPersonalForm({
                      ...personalForm,
                      socials: { ...personalForm.socials, instagram: e.target.value }
                    })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>WhatsApp Number / Direct Chat</label>
                  <input
                    type="text"
                    value={personalForm.socials?.phone || ''}
                    onChange={(e) => setPersonalForm({
                      ...personalForm,
                      socials: { ...personalForm.socials, phone: e.target.value }
                    })}
                    className="admin-input-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 2: HOME PAGE SECTIONS
          ============================================================ */}
          {activeTab === 'home' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">Home Page Sections</h2>
                  <p className="admin-card-desc-light">Edit hero headline, about snippet, services cards, works section and FAQ section labels.</p>
                </div>
                <button
                  type="button"
                  onClick={handleSaveHome}
                  disabled={isSaving}
                  className="admin-btn-save-light"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save Home Content'}</span>
                </button>
              </div>

              <div className="admin-form-grid-light">

                {/* ── HERO SECTION ── */}
                <div className="admin-form-group-light full-col">
                  <h3 className="admin-subheading-light">🎯 Hero Section</h3>
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Hero Main Headline (2 Lines)</label>
                  <textarea
                    rows={2}
                    value={homeForm?.hero?.headline || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, hero: { ...prev.hero, headline: e.target.value } }))}
                    className="admin-textarea-light"
                    placeholder={"Design That Feels.\nExperiences That Resonate."}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    Tip: Enter key (newline) press cheythal 2 line aayi break aakum. (Allenkil dot '.' vech automatic aayi 2 line aavum)
                  </span>
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Hero Subtext / Description Paragraph</label>
                  <textarea
                    rows={3}
                    value={homeForm?.hero?.subtext || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, hero: { ...prev.hero, subtext: e.target.value } }))}
                    className="admin-textarea-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Hero Side Statement (right column)</label>
                  <textarea
                    rows={2}
                    value={homeForm?.hero?.sideStatement || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, hero: { ...prev.hero, sideStatement: e.target.value } }))}
                    className="admin-textarea-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>CTA Button Text</label>
                  <input
                    type="text"
                    value={homeForm?.hero?.ctaText || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, hero: { ...prev.hero, ctaText: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Service Pills (comma-separated)</label>
                  <input
                    type="text"
                    value={(homeForm?.hero?.pills || []).join(', ')}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, hero: { ...prev.hero, pills: e.target.value.split(',').map(p => p.trim()).filter(Boolean) } }))}
                    className="admin-input-light"
                    placeholder="UI/UX, WEB DESIGN, FRONT-END DEV"
                  />
                </div>

                {/* ── ABOUT SNIPPET SECTION ── */}
                <div className="admin-form-group-light full-col" style={{ marginTop: '1.5rem' }}>
                  <h3 className="admin-subheading-light">📝 About Snippet Section</h3>
                </div>

                <div className="admin-form-group-light">
                  <label>Section Tag Label</label>
                  <input
                    type="text"
                    value={homeForm?.aboutSnippet?.tag || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, tag: e.target.value } }))}
                    className="admin-input-light"
                    placeholder="( ABOUT )"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>"Read Full Story" Button Text</label>
                  <input
                    type="text"
                    value={homeForm?.aboutSnippet?.readStoryText || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, readStoryText: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>"Download CV" Button Text</label>
                  <input
                    type="text"
                    value={homeForm?.aboutSnippet?.downloadCvText || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, downloadCvText: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <h4 style={{ fontWeight: 600, color: '#475569', fontSize: '0.82rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Inline Editorial Text Segments & Image Chips</h4>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {['text1','text2','text3','text4','text5'].map((key, i) => (
                      <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                        <input
                          type="text"
                          value={homeForm?.aboutSnippet?.[key] || ''}
                          onChange={(e) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, [key]: e.target.value } }))}
                          className="admin-input-light"
                          placeholder={`Text segment ${i + 1}`}
                        />
                        {i < 4 && (
                          <div className="admin-upload-box-row">
                            <input
                              type="text"
                              value={homeForm?.aboutSnippet?.[`chip${i + 1}`] || ''}
                              onChange={(e) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, [`chip${i + 1}`]: e.target.value } }))}
                              className="admin-input-light"
                              placeholder={`Image chip ${i + 1} path`}
                            />
                            <label className="admin-btn-upload-light">
                              <Upload size={14} />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFileUpload(e, (url) => setHomeForm(prev => ({ ...prev, aboutSnippet: { ...prev.aboutSnippet, [`chip${i + 1}`]: url } })))}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── SERVICES SECTION ── */}
                <div className="admin-form-group-light full-col" style={{ marginTop: '1.5rem' }}>
                  <h3 className="admin-subheading-light">⚡ Services Section</h3>
                </div>

                <div className="admin-form-group-light">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    value={homeForm?.servicesSection?.tag || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, tag: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Section Headline</label>
                  <input
                    type="text"
                    value={homeForm?.servicesSection?.headline || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, headline: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Section Subtitle</label>
                  <textarea
                    rows={2}
                    value={homeForm?.servicesSection?.subtitle || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, subtitle: e.target.value } }))}
                    className="admin-textarea-light"
                  />
                </div>

                {/* Services Cards */}
                <div className="admin-form-group-light full-col">
                  <div className="admin-split-header-light">
                    <h4 style={{ fontWeight: 600, color: '#475569', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service Cards</h4>
                    <button
                      type="button"
                      className="admin-btn-secondary-light"
                      onClick={() => {
                        const newCard = { number: `0${(homeForm?.servicesSection?.cards?.length || 0) + 1}`, theme: 'theme-violet', category: 'New Category', title: 'New Service', tags: ['Tag 1', 'Tag 2'], linkText: 'EXPLORE', linkUrl: '/works' };
                        setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards: [...(prev.servicesSection?.cards || []), newCard] } }));
                      }}
                    >
                      <Plus size={14} />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="admin-cards-list-light">
                    {(homeForm?.servicesSection?.cards || []).map((card, ci) => (
                      <div key={ci} className="admin-editor-card-item">
                        <div className="admin-editor-card-top">
                          <input
                            type="text"
                            value={card.number || ''}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], number: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light admin-num-input"
                            placeholder="01"
                          />
                          <input
                            type="text"
                            value={card.title || ''}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], title: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light"
                            placeholder="Service Title"
                          />
                          <button
                            type="button"
                            className="admin-btn-trash-light"
                            onClick={() => {
                              const cards = homeForm.servicesSection.cards.filter((_, i) => i !== ci);
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <input
                            type="text"
                            value={card.category || ''}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], category: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light"
                            placeholder="Category label"
                          />
                          <select
                            value={card.theme || 'theme-violet'}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], theme: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light"
                          >
                            <option value="theme-violet">Violet Theme</option>
                            <option value="theme-blue">Blue Theme</option>
                            <option value="theme-emerald">Emerald Theme</option>
                          </select>
                        </div>

                        <input
                          type="text"
                          value={(card.tags || []).join(', ')}
                          onChange={(e) => {
                            const cards = [...(homeForm.servicesSection.cards)];
                            cards[ci] = { ...cards[ci], tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) };
                            setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                          }}
                          className="admin-input-light"
                          placeholder="Figma Systems, User Research, ..."
                          style={{ marginTop: '0.5rem' }}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <input
                            type="text"
                            value={card.linkText || ''}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], linkText: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light"
                            placeholder="Link button text"
                          />
                          <input
                            type="text"
                            value={card.linkUrl || ''}
                            onChange={(e) => {
                              const cards = [...(homeForm.servicesSection.cards)];
                              cards[ci] = { ...cards[ci], linkUrl: e.target.value };
                              setHomeForm(prev => ({ ...prev, servicesSection: { ...prev.servicesSection, cards } }));
                            }}
                            className="admin-input-light"
                            placeholder="/works"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── WORKS SECTION ── */}
                <div className="admin-form-group-light full-col" style={{ marginTop: '1.5rem' }}>
                  <h3 className="admin-subheading-light">🗂️ Selected Works Section</h3>
                </div>

                <div className="admin-form-group-light">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    value={homeForm?.worksSection?.tag || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, worksSection: { ...prev.worksSection, tag: e.target.value } }))}
                    className="admin-input-light"
                    placeholder="( SELECTED WORKS )"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>"Explore All Works" Button Text</label>
                  <input
                    type="text"
                    value={homeForm?.worksSection?.buttonText || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, worksSection: { ...prev.worksSection, buttonText: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Section Headline</label>
                  <input
                    type="text"
                    value={homeForm?.worksSection?.headline || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, worksSection: { ...prev.worksSection, headline: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Section Subtitle</label>
                  <textarea
                    rows={2}
                    value={homeForm?.worksSection?.subtitle || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, worksSection: { ...prev.worksSection, subtitle: e.target.value } }))}
                    className="admin-textarea-light"
                  />
                </div>

                {/* Choose Which Works to Display on Home Page */}
                <div className="admin-form-group-light full-col" style={{ marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.92rem', margin: '0 0 2px' }}>
                        🌟 Choose Which Works to Display on Home Page
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>
                        Select the projects you want to feature on the homepage showcase grid.
                      </p>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '20px' }}>
                      {(projects || []).filter(p => p.featured).length} Active on Home
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                    {(projects || []).map((proj) => {
                      const isFeatured = !!proj.featured;
                      return (
                        <div
                          key={proj.id}
                          onClick={() => {
                            toggleProjectFeatured(proj.id);
                            showToast(isFeatured ? `"${proj.title}" removed from Home` : `"${proj.title}" shown on Home`, 'success');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: isFeatured ? '1.5px solid #3b82f6' : '1px solid #e2e8f0',
                            background: isFeatured ? '#f0f7ff' : '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={() => {}}
                            style={{ width: '18px', height: '18px', accentColor: '#2563eb', cursor: 'pointer' }}
                          />
                          <img
                            src={proj.coverImage || '/assets/mockup-green-track.png'}
                            alt=""
                            style={{ width: '42px', height: '32px', objectFit: 'cover', borderRadius: '4px', background: '#e2e8f0', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {proj.title}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                              {proj.category}
                            </div>
                          </div>
                          <span style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '20px',
                            background: isFeatured ? '#dbeafe' : '#f1f5f9',
                            color: isFeatured ? '#1d4ed8' : '#94a3b8',
                            flexShrink: 0
                          }}>
                            {isFeatured ? 'ON HOME' : 'HIDDEN'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── FAQ SECTION LABELS ── */}
                <div className="admin-form-group-light full-col" style={{ marginTop: '1.5rem' }}>
                  <h3 className="admin-subheading-light">❓ FAQ Section Labels</h3>
                </div>

                <div className="admin-form-group-light">
                  <label>Section Tag</label>
                  <input
                    type="text"
                    value={homeForm?.faqSection?.tag || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, faqSection: { ...prev.faqSection, tag: e.target.value } }))}
                    className="admin-input-light"
                    placeholder="( FAQ )"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>FAQ Headline</label>
                  <input
                    type="text"
                    value={homeForm?.faqSection?.headline || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, faqSection: { ...prev.faqSection, headline: e.target.value } }))}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>FAQ Subtitle</label>
                  <textarea
                    rows={2}
                    value={homeForm?.faqSection?.subtitle || ''}
                    onChange={(e) => setHomeForm(prev => ({ ...prev, faqSection: { ...prev.faqSection, subtitle: e.target.value } }))}
                    className="admin-textarea-light"
                  />
                </div>

              </div>
            </div>
          )}

          {/* ============================================================
              TAB 3: ABOUT PAGE
          ============================================================ */}
          {activeTab === 'about' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">About Page — Bio, Photo & Skills</h2>
                  <p className="admin-card-desc-light">Edit greeting, portrait cutout image, pill badges, and expertise matrix.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleSaveAbout} 
                  disabled={isSaving}
                  className="admin-btn-save-light"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save About Page'}</span>
                </button>
              </div>

              <div className="admin-form-grid-light">
                
                {/* About Portrait Cutout */}
                <div className="admin-form-group-light full-col">
                  <label>About Portrait Image (Cutout PNG)</label>
                  <div className="admin-media-picker-light">
                    {aboutForm.photoUrl && (
                      <div className="admin-preview-thumb-light">
                        <img src={aboutForm.photoUrl} alt="About Portrait" />
                      </div>
                    )}
                    <div className="admin-media-controls-light">
                      <input
                        type="text"
                        value={aboutForm.photoUrl || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, photoUrl: e.target.value })}
                        className="admin-input-light"
                        placeholder="Image URL or upload from desktop"
                      />
                      <label className="admin-btn-upload-light">
                        <Upload size={16} />
                        <span>Upload Photo from Desktop</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleFileUpload(e, (url) => setAboutForm(prev => ({ ...prev, photoUrl: url })))}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="admin-form-group-light">
                  <label>Greeting Title</label>
                  <input
                    type="text"
                    value={aboutForm.greeting || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, greeting: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Section Eyebrow Tag</label>
                  <input
                    type="text"
                    value={aboutForm.tag || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, tag: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Top Photo Pill Badge</label>
                  <input
                    type="text"
                    value={aboutForm.badgeTop || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, badgeTop: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light">
                  <label>Bottom Status Pill Badge</label>
                  <input
                    type="text"
                    value={aboutForm.badgeBottom || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, badgeBottom: e.target.value })}
                    className="admin-input-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Bold Lead Statement</label>
                  <textarea
                    rows={2}
                    value={aboutForm.leadStatement || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, leadStatement: e.target.value })}
                    className="admin-textarea-light"
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Full Narrative Biography</label>
                  <textarea
                    rows={4}
                    value={aboutForm.bioBody || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, bioBody: e.target.value })}
                    className="admin-textarea-light"
                  />
                </div>

                {/* Skills Cards */}
                <div className="admin-form-group-light full-col">
                  <h3 className="admin-subheading-light">Skills & Expertise Cards</h3>
                  <div className="admin-cards-list-light">
                    {(aboutForm.cards || []).map((card, cIdx) => (
                      <div key={cIdx} className="admin-editor-card-item">
                        <div className="admin-editor-card-top">
                          <input
                            type="text"
                            value={card.tag}
                            onChange={(e) => {
                              const c = [...aboutForm.cards];
                              c[cIdx].tag = e.target.value;
                              setAboutForm({ ...aboutForm, cards: c });
                            }}
                            className="admin-input-light admin-num-input"
                            placeholder="01 / DESIGN"
                          />
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const c = [...aboutForm.cards];
                              c[cIdx].title = e.target.value;
                              setAboutForm({ ...aboutForm, cards: c });
                            }}
                            className="admin-input-light"
                            placeholder="Card Title"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={card.description}
                          onChange={(e) => {
                            const c = [...aboutForm.cards];
                            c[cIdx].description = e.target.value;
                            setAboutForm({ ...aboutForm, cards: c });
                          }}
                          className="admin-textarea-light"
                          placeholder="Skills description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: PROJECTS (WORKS) - FULL CRUD
          ============================================================ */}
          {activeTab === 'projects' && (
            <div className="admin-tab-pane">
              
              {(selectedProjectId || isCreatingProject) && projectForm ? (
                <div className="admin-light-card">
                  <div className="admin-card-header-light">
                    <div>
                      <h2 className="admin-card-title-light">
                        {isCreatingProject ? 'Add New Project' : `Edit: ${projectForm.title}`}
                      </h2>
                      <p className="admin-card-desc-light">Project title, category, mockups, challenge, and links.</p>
                    </div>
                    <div className="admin-header-btns-light">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProjectId(null);
                          setIsCreatingProject(false);
                          setProjectForm(null);
                        }}
                        className="admin-btn-secondary-light"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveCurrentProject}
                        disabled={isSaving}
                        className="admin-btn-save-light"
                      >
                        <Save size={16} />
                        <span>{isSaving ? 'Saving...' : 'Save Project to DB'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-grid-light">
                    <div className="admin-form-group-light">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        value={projectForm.title || ''}
                        onChange={(e) => {
                          const title = e.target.value;
                          const slug = isCreatingProject ? title.toLowerCase().replace(/[^a-z0-9]/g, '-') : projectForm.slug;
                          setProjectForm({ ...projectForm, title, slug });
                        }}
                        className="admin-input-light"
                        placeholder="Green Track International Cargo"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Short Title (Card Display)</label>
                      <input
                        type="text"
                        value={projectForm.shortTitle || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, shortTitle: e.target.value })}
                        className="admin-input-light"
                        placeholder="Logistics Website"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>URL Slug (Unique URL)</label>
                      <input
                        type="text"
                        value={projectForm.slug || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                        className="admin-input-light"
                        placeholder="green-track-logistics"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Category</label>
                      <input
                        type="text"
                        value={projectForm.category || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="admin-input-light"
                        placeholder="Logistics, Luxury, Travel..."
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Client</label>
                      <input
                        type="text"
                        value={projectForm.client || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                        className="admin-input-light"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Your Role</label>
                      <input
                        type="text"
                        value={projectForm.role || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                        className="admin-input-light"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Year</label>
                      <input
                        type="text"
                        value={projectForm.year || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="admin-input-light"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label className="admin-checkbox-label-light">
                        <input
                          type="checkbox"
                          checked={!!projectForm.featured}
                          onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        />
                        <span>Featured on Home Page</span>
                      </label>
                    </div>

                    {/* Cover Image Upload */}
                    <div className="admin-form-group-light full-col">
                      <label>Primary Cover Image / Mockup</label>
                      <div className="admin-media-picker-light">
                        {projectForm.coverImage && (
                          <div className="admin-preview-thumb-light">
                            <img src={projectForm.coverImage} alt="Cover Preview" />
                          </div>
                        )}
                        <div className="admin-media-controls-light">
                          <input
                            type="text"
                            value={projectForm.coverImage || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                            className="admin-input-light"
                            placeholder="/assets/mockup-green-track.png"
                          />
                          <label className="admin-btn-upload-light">
                            <Upload size={16} />
                            <span>Upload Mockup from Desktop</span>
                            <input
                              type="file"
                              accept="image/*"
                              hidden
                              onChange={(e) => handleFileUpload(e, (url) => setProjectForm(prev => ({ ...prev, coverImage: url })))}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="admin-form-group-light full-col">
                      <label>Catchy Tagline</label>
                      <input
                        type="text"
                        value={projectForm.tagline || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                        className="admin-input-light"
                      />
                    </div>

                    <div className="admin-form-group-light full-col">
                      <label>Tags (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.tags?.join(', ') || ''}
                        onChange={(e) => setProjectForm({
                          ...projectForm,
                          tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                        })}
                        className="admin-input-light"
                        placeholder="UI/UX Design, Figma, React, Responsive Web"
                      />
                    </div>

                    <div className="admin-form-group-light full-col">
                      <label>Project Overview</label>
                      <textarea
                        rows={3}
                        value={projectForm.overview || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                        className="admin-textarea-light"
                      />
                    </div>

                    <div className="admin-form-group-light full-col">
                      <label>The Challenge</label>
                      <textarea
                        rows={3}
                        value={projectForm.challenge || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                        className="admin-textarea-light"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>Live Demo URL</label>
                      <input
                        type="text"
                        value={projectForm.liveUrl || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="admin-input-light"
                      />
                    </div>

                    <div className="admin-form-group-light">
                      <label>GitHub Repository URL</label>
                      <input
                        type="text"
                        value={projectForm.githubUrl || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="admin-input-light"
                      />
                    </div>

                  </div>
                </div>
              ) : (
                /* Projects List Table */
                <div className="admin-light-card">
                  <div className="admin-card-header-light">
                    <div>
                      <h2 className="admin-card-title-light">All Works & Projects</h2>
                      <p className="admin-card-desc-light">Total {projectsList.length} projects loaded from MongoDB Atlas.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(true);
                        setProjectForm({
                          id: 'project-' + Date.now(),
                          title: '',
                          shortTitle: '',
                          slug: '',
                          category: 'Web Design',
                          year: '2026',
                          client: '',
                          role: 'UI/UX Design & Front-End',
                          featured: false,
                          coverImage: '',
                          deviceMockup: 'monitor',
                          tags: ['UI/UX Design', 'Figma'],
                          overview: '',
                          challenge: '',
                          goals: [],
                          liveUrl: '',
                          githubUrl: ''
                        });
                      }}
                      className="admin-btn-save-light"
                    >
                      <Plus size={16} />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="admin-table-container-light">
                    <table className="admin-table-light">
                      <thead>
                        <tr>
                          <th>Mockup</th>
                          <th>Project Title</th>
                          <th>Category</th>
                          <th style={{ textAlign: 'center' }}>Show on Home</th>
                          <th>Year</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projectsList.map((proj) => (
                          <tr key={proj.id || proj.slug}>
                            <td style={{ width: '70px' }}>
                              <div className="admin-table-thumb-light">
                                {proj.coverImage ? (
                                  <img src={proj.coverImage} alt={proj.title} />
                                ) : (
                                  <ImageIcon size={18} color="#94a3b8" />
                                )}
                              </div>
                            </td>
                            <td>
                              <strong className="admin-proj-name">{proj.title}</strong>
                              <div className="admin-proj-slug">/{proj.slug}</div>
                            </td>
                            <td>
                              <span className="admin-cat-tag-light">{proj.category}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={!!proj.featured}
                                  title={proj.featured ? 'Remove from Home Page' : 'Show on Home Page'}
                                  onClick={async () => {
                                    const updated = { ...proj, featured: !proj.featured };
                                    // Optimistic update
                                    setProjectsList(prev => prev.map(p => (p.id === proj.id || p.slug === proj.slug) ? updated : p));
                                    const res = await updateProject(proj.id || proj.slug, updated);
                                    if (res && res.success !== false) {
                                      showToast(updated.featured ? `"${proj.title}" added to Home Page!` : `"${proj.title}" removed from Home Page`, 'success');
                                    } else {
                                      // Revert on error
                                      setProjectsList(prev => prev.map(p => (p.id === proj.id || p.slug === proj.slug) ? proj : p));
                                      showToast('Failed to update', 'error');
                                    }
                                  }}
                                  className={`admin-toggle-switch ${proj.featured ? 'enabled' : ''}`}
                                  style={{ transform: 'scale(0.85)' }}
                                >
                                  <span className="admin-toggle-knob" />
                                </button>
                                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: proj.featured ? '#16a34a' : '#94a3b8', letterSpacing: '0.03em' }}>
                                  {proj.featured ? 'ON HOME' : 'HIDDEN'}
                                </span>
                              </div>
                            </td>
                            <td>{proj.year || '2026'}</td>
                            <td style={{ textAlign: 'right' }}>
                              <div className="admin-row-actions">
                                <a
                                  href={`/works/${proj.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="admin-btn-icon-light"
                                  title="View Case Study"
                                >
                                  <ExternalLink size={15} />
                                </a>
                                <button
                                  type="button"
                                  className="admin-btn-edit-light"
                                  onClick={() => {
                                    setSelectedProjectId(proj.id || proj.slug);
                                    setIsCreatingProject(false);
                                    setProjectForm({ ...proj });
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="admin-btn-trash-light"
                                  onClick={() => handleDeleteProject(proj.id || proj.slug, proj.title)}
                                  title="Delete project"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ============================================================
              TAB 5: FAQS MANAGEMENT
          ============================================================ */}
          {activeTab === 'faqs' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">Frequently Asked Questions</h2>
                  <p className="admin-card-desc-light">Manage questions and answers displayed in the Home page FAQ section.</p>
                </div>
                <div className="admin-header-btns-light">
                  <button
                    type="button"
                    className="admin-btn-secondary-light"
                    onClick={() => {
                      const newFaq = {
                        id: 'faq-' + Date.now(),
                        question: 'New Question?',
                        answer: 'Answer here...'
                      };
                      setFaqsList([...faqsList, newFaq]);
                    }}
                  >
                    <Plus size={15} />
                    <span>Add FAQ</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveFaqs}
                    disabled={isSaving}
                    className="admin-btn-save-light"
                  >
                    <Save size={16} />
                    <span>{isSaving ? 'Saving...' : 'Save FAQs'}</span>
                  </button>
                </div>
              </div>

              <div className="admin-cards-list-light">
                {faqsList.map((faq, fIdx) => (
                  <div key={faq.id || fIdx} className="admin-editor-card-item">
                    <div className="admin-editor-card-top">
                      <span className="admin-faq-num-pill">Q{fIdx + 1}</span>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...faqsList];
                          updated[fIdx].question = e.target.value;
                          setFaqsList(updated);
                        }}
                        className="admin-input-light admin-faq-title-input"
                        placeholder="Question title..."
                      />
                      <button
                        type="button"
                        className="admin-btn-trash-light"
                        onClick={() => {
                          setFaqsList(faqsList.filter((_, i) => i !== fIdx));
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...faqsList];
                        updated[fIdx].answer = e.target.value;
                        setFaqsList(updated);
                      }}
                      className="admin-textarea-light"
                      placeholder="Detailed answer..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 6: DESKTOP MEDIA UPLOADER
          ============================================================ */}
          {activeTab === 'media' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">Desktop Media Uploader</h2>
                  <p className="admin-card-desc-light">Upload photos, mockups, or PDFs directly from your computer. Copied URLs can be used in any section.</p>
                </div>
              </div>

              {/* Big Dropzone */}
              <div className="admin-dropzone-light">
                <input
                  type="file"
                  id="media-uploader-input-light"
                  accept="image/*,application/pdf"
                  hidden
                  onChange={(e) => {
                    handleFileUpload(e, (url) => {});
                  }}
                />
                <label htmlFor="media-uploader-input-light" className="admin-dropzone-label-light">
                  <div className="admin-dropzone-icon-circle">
                    <Upload size={32} color="#2563eb" />
                  </div>
                  <h3>Click to Select Images from Your PC</h3>
                  <p>Supports PNG, JPG, JPEG, WEBP, SVG, GIF, PDF (saved directly in public/uploads)</p>
                  <span className="admin-btn-browse-light">Browse Local Files</span>
                </label>
              </div>

              {/* Uploaded Gallery */}
              {uploadedMediaList.length > 0 && (
                <div className="admin-gallery-wrap-light">
                  <h3 className="admin-subheading-light">Recently Uploaded Media</h3>
                  <div className="admin-gallery-grid-light">
                    {uploadedMediaList.map((url, uIdx) => (
                      <div key={uIdx} className="admin-gallery-card-light">
                        <div className="admin-gallery-thumb-light">
                          <img src={url} alt="Uploaded Media" />
                        </div>
                        <div className="admin-gallery-bar-light">
                          <input type="text" readOnly value={url} className="admin-input-small-light" />
                          <button
                            type="button"
                            className="admin-btn-copy-light"
                            onClick={() => {
                              navigator.clipboard.writeText(url);
                              showToast('Copied URL to clipboard!', 'info');
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================
              TAB 7: SITE MAINTENANCE MODE SETTINGS
          ============================================================ */}
          {activeTab === 'maintenance' && (
            <div className="admin-light-card">
              <div className="admin-card-header-light">
                <div>
                  <h2 className="admin-card-title-light">Site Maintenance Mode</h2>
                  <p className="admin-card-desc-light">Temporarily take the portfolio offline for updates. Visitors see a custom maintenance screen while you edit in the admin panel.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleSaveMaintenanceSettings} 
                  disabled={isSaving}
                  className="admin-btn-save-light"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              {/* Big Status Switch Banner */}
              <div className={`admin-maintenance-banner ${maintForm.enabled ? 'active-warn' : 'live-safe'}`}>
                <div className="admin-banner-text">
                  <div className="admin-banner-status-tag">
                    {maintForm.enabled ? '⚠️ MAINTENANCE MODE IS ACTIVE' : '✅ PORTFOLIO IS CURRENTLY LIVE'}
                  </div>
                  <p>
                    {maintForm.enabled 
                      ? 'Visitors accessing the website will be shown the Under Maintenance screen. You can continue updating everything here.' 
                      : 'The website is visible to all visitors normally across all pages.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleMaintenance}
                  className={`admin-btn-switch-maint ${maintForm.enabled ? 'btn-turn-off' : 'btn-turn-on'}`}
                >
                  <Power size={16} />
                  <span>{maintForm.enabled ? 'Turn OFF Maintenance' : 'Turn ON Maintenance'}</span>
                </button>
              </div>

              <div className="admin-form-grid-light" style={{ marginTop: '1.5rem' }}>
                <div className="admin-form-group-light full-col">
                  <label>Maintenance Screen Headline</label>
                  <input
                    type="text"
                    value={maintForm.title || ''}
                    onChange={(e) => setMaintForm({ ...maintForm, title: e.target.value })}
                    className="admin-input-light"
                    placeholder="Crafting Something Extraordinary."
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Maintenance Message to Visitors</label>
                  <textarea
                    rows={4}
                    value={maintForm.message || ''}
                    onChange={(e) => setMaintForm({ ...maintForm, message: e.target.value })}
                    className="admin-textarea-light"
                    placeholder="Portfolio is currently undergoing scheduled updates and improvements..."
                  />
                </div>

                <div className="admin-form-group-light full-col">
                  <label>Contact Email on Maintenance Screen</label>
                  <input
                    type="email"
                    value={maintForm.contactEmail || ''}
                    onChange={(e) => setMaintForm({ ...maintForm, contactEmail: e.target.value })}
                    className="admin-input-light"
                    placeholder="muhammedklkm@gmail.com"
                  />
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';

const CaseStudyLightbox = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    let savedScrollY = window.scrollY;

    if (isOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.position = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const cleanTitle = project.title
    ? project.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : 'case-study';

  return (
    <div
      className={`project-lightbox-overlay ${isOpen ? 'active' : ''}`}
      id="project-lightbox"
      onClick={(e) => {
        if (e.target.id === 'project-lightbox') onClose();
      }}
    >
      <div className="lightbox-mac-window">
        {/* Mac Browser Header Bar */}
        <div className="mac-browser-bar">
          <div className="mac-window-dots">
            <span className="mac-dot dot-close" id="mac-dot-close" onClick={onClose}></span>
            <span className="mac-dot dot-min"></span>
            <span className="mac-dot dot-max"></span>
          </div>
          <div className="mac-url-bar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span className="mac-url-text" id="lightbox-url-display">
              muhammed.design/works/{cleanTitle}
            </span>
          </div>
          <button type="button" className="lightbox-close-icon" id="lightbox-close" aria-label="Close Preview" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Case Study Sub Header Info */}
        <div className="mac-case-info-bar">
          <div className="mac-info-left">
            <h3 className="mac-project-title" id="lightbox-title">
              {project.title}
            </h3>
          </div>
          <div className="mac-info-right">
            <span className="mac-hint">Scroll down to view full design ↓</span>
          </div>
        </div>

        {/* Scrollable Case Study Image Container */}
        <div className="mac-browser-body" id="lightbox-body-scroll">
          <div className="mac-img-canvas">
            <img src={project.imgSrc} alt={project.title} id="lightbox-img" className="mac-preview-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyLightbox;

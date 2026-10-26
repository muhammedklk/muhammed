import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectHoverList from '../components/ProjectHoverList';
import { usePortfolio } from '../context/PortfolioContext';
import '../styles/projects.css';
import './works.css';

export default function WorksPage() {
  const { projects } = usePortfolio();
  const [viewMode, setViewMode] = useState('grid');

  // Update document title for SEO
  document.title = 'Selected Works & Case Studies — Muhammed K Portfolio';

  return (
    <div className="works-page">
      {/* ── Page Header Section ── */}
      <section className="works-page-header" aria-label="Works Directory">
        <div className="container">
          <div className="works-header-top reveal-blur">

            {/* Floating Icon Badge — like contact page chat badge */}
            <div className="works-icon-badge" aria-hidden="true">
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="worksGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="55%" stopColor="#7C5CE1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="worksShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#7C5CE1" floodOpacity="0.28" />
                  </filter>
                </defs>
                {/* Rounded square base */}
                <rect x="3" y="3" width="40" height="40" rx="13" fill="url(#worksGrad1)" filter="url(#worksShadow)" />
                {/* Grid / portfolio icon */}
                <rect x="12" y="12" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
                <rect x="26" y="12" width="8" height="8" rx="2" fill="white" fillOpacity="0.55" />
                <rect x="12" y="26" width="8" height="8" rx="2" fill="white" fillOpacity="0.55" />
                <rect x="26" y="26" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
              </svg>
            </div>

            {/* Title Row with inline View Toggle */}
            <div className="works-title-toggle-row">
              <h1 className="works-page-main-title">
                Selected Works.
              </h1>
              {/* View Mode Toggle (Grid / List) */}
              <div className="works-view-toggle">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid Gallery View"
                  aria-label="Grid view"
                >
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Interactive List View"
                  aria-label="List view"
                >
                  <span>List</span>
                </button>
              </div>
            </div>

            <p className="works-page-lead-desc">
              A curated body of {projects.length} commercial case studies across UI/UX design,
              responsive frontend engineering, and mobile applications.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Projects Display Section ── */}
      <section className="works-grid-section" aria-label="Projects list">
        <div className="container">
          {viewMode === 'grid' ? (
            /* ── Balanced 2-Column Gallery Grid (All 8 Projects) ── */
            <div className="row g-4 works-gallery-grid reveal-stagger">
              {projects.map((project, idx) => (
                <div key={project.id} className="col-lg-6 col-12">
                  <ProjectCard project={project} index={idx} />
                </div>
              ))}
            </div>
          ) : (
            /* ── Interactive List with Hover Image Reveal ── */
            <div className="works-list-mode-wrap">
              <ProjectHoverList projects={projects} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

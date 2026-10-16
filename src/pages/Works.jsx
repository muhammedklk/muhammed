import React, { useState } from 'react';
import { projectsData, projectCategories } from '../data/portfolioData';
import ProjectCard from '../components/ProjectCard';
import { Search, Filter, Layers } from 'lucide-react';

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="works-page-container section-padding-hero">
      <div className="container">
        {/* Header */}
        <div className="mb-5">
          <div className="badge-pill mb-3">
            <Layers size={14} className="text-accent" />
            <span>Complete Work Directory</span>
          </div>
          <h1 className="heading-display font-serif mb-3">
            Selected <span className="italic font-normal text-accent">Case Studies</span> & Projects.
          </h1>
          <p className="subheading-lead">
            Explore 8 in-depth product design and front-end engineering case studies spanning drone analytics, aviation guidance, spatial mobile apps, and design systems.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="filter-search-wrapper mb-5 p-3 card-portfolio">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <div className="category-filter-pills">
                {projectCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`filter-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="search-input-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by keyword, tag, or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="card-portfolio p-5 text-center my-5">
            <h4 className="font-serif heading-section mb-2">No projects found</h4>
            <p className="text-secondary text-sm mb-3">Try adjusting your search query or category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="btn-secondary-custom mx-auto"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-list-container">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .filter-search-wrapper {
          background-color: var(--bg-surface);
        }

        .category-filter-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          padding: 0.45rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: var(--radius-pill);
          background-color: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .filter-pill-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-card-hover);
        }

        .filter-pill-btn.active {
          background-color: var(--text-primary);
          color: var(--bg-body);
          border-color: var(--text-primary);
        }

        .search-input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 0.9rem;
          color: var(--text-muted);
        }

        .search-field {
          width: 100%;
          padding: 0.55rem 0.9rem 0.55rem 2.4rem;
          border-radius: var(--radius-pill);
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-body);
          color: var(--text-primary);
          font-size: 0.85rem;
          outline: none;
        }

        .search-field:focus {
          border-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
}

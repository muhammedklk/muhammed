import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/projects.css';

export default function ProjectCard({ project }) {
  // Extract clean editorial tags matching reference (e.g. [SaaS] [Dashboard Design])
  const displayTags = React.useMemo(() => {
    const tags = [];
    if (project.category) tags.push(project.category);

    if (project.tags && project.tags.length > 0) {
      const extra = project.tags.find(t => 
        t !== project.category && 
        !t.toLowerCase().includes(project.category.toLowerCase()) &&
        t.length <= 18
      );
      if (extra) {
        tags.push(extra);
      } else if (project.shortTitle && project.shortTitle !== project.category) {
        tags.push(project.shortTitle);
      } else {
        const fallback = project.tags.find(t => t !== project.category);
        if (fallback) tags.push(fallback);
      }
    } else if (project.shortTitle && project.shortTitle !== project.category) {
      tags.push(project.shortTitle);
    }
    return tags.slice(0, 2);
  }, [project]);

  return (
    <div className="project-card-wrapper">
      <Link
        to={`/works/${project.slug}`}
        className="project-editorial-card spotlight-card"
        aria-label={`View case study: ${project.title}`}
      >
        {/* Full-Bleed Media Container */}
        <div className="project-editorial-media">
          <img
            src={project.coverImage}
            alt={`${project.title} Cover`}
            className="project-editorial-thumb"
            loading="lazy"
          />

          {/* Frosted Glass Bottom Blur Layer */}
          <div className="project-editorial-blur-scrim" />

          {/* Cinematic Vignette Bottom Gradient */}
          <div className="project-editorial-scrim" />

          {/* Bottom-Left Overlay Content (Title + Frosted Pills) */}
          <div className="project-editorial-content">
            <h3 className="project-editorial-title">{project.title}</h3>
            <div className="project-editorial-pills">
              {displayTags.map((tag, idx) => (
                <span key={idx} className="project-editorial-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

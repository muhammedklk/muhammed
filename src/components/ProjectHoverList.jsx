import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import ArrowIcon from './ArrowIcon';
import '../styles/project-hover-list.css';

export default function ProjectHoverList({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const containerRef = useRef(null);
  const prevMouseX = useRef(0);
  const animFrameRef = useRef(null);

  // Smooth lerp for floating card physics
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setCursorPos((prev) => {
        const nextX = lerp(prev.x, targetPos.x, 0.14);
        const nextY = lerp(prev.y, targetPos.y, 0.14);
        return { x: nextX, y: nextY };
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [targetPos]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation tilt based on delta X
    const deltaX = e.clientX - prevMouseX.current;
    prevMouseX.current = e.clientX;
    const tilt = Math.max(-6, Math.min(6, deltaX * 0.45));
    setRotation(tilt);

    setTargetPos({ x, y });
  };

  const handleMouseEnter = (project, e) => {
    setActiveProject(project);
    setIsHoveringList(true);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setTargetPos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringList(false);
    setActiveProject(null);
  };

  return (
    <div
      className="project-hover-list-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Image Preview Follower (Desktop) */}
      <div
        className={`floating-preview-portal ${isHoveringList && activeProject ? 'active' : ''}`}
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        aria-hidden="true"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`floating-preview-card ${activeProject?.id === project.id ? 'visible' : ''}`}
          >
            <div className="preview-image-wrapper">
              <img
                src={project.coverImage}
                alt={project.title}
                className="preview-image"
                loading="lazy"
              />
              <div className="preview-floating-pill">
                <span className="preview-pill-dot" />
                <span>{project.category}</span>
                <ArrowIcon size={14} className="preview-pill-arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Typography Rows */}
      <div className={`project-list-items ${activeProject ? 'has-active-item' : ''}`}>
        {projects.map((project, idx) => {
          const indexNum = String(idx + 1).padStart(2, '0');
          const isCurrentActive = activeProject?.id === project.id;

          return (
            <Link
              key={project.id}
              to={`/works/${project.slug}`}
              className={`project-list-row ${isCurrentActive ? 'row-active' : ''}`}
              onMouseEnter={(e) => handleMouseEnter(project, e)}
              aria-label={`View case study: ${project.title}`}
            >
              <div className="row-inner">
                {/* Left: Index & Title */}
                <div className="row-left">
                  <span className="row-index">{indexNum}</span>
                  <div className="row-title-group">
                    <h3 className="row-title">{project.title}</h3>
                    <span className="row-category-mobile">{project.category}</span>
                  </div>
                </div>

                {/* Center / Right: Meta & Arrow */}
                <div className="row-right">
                  <div className="row-tags">
                    {project.tags?.slice(0, 2).map((tag, tIdx) => (
                      <span key={tIdx} className="row-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="row-category-desktop">{project.category}</span>
                  <span className="row-year">{project.year || '2026'}</span>

                  <span className="row-arrow-circle" aria-hidden="true">
                    <ArrowIcon size={14} />
                  </span>
                </div>
              </div>

              {/* Mobile Inline Preview Card (fallback for touch devices) */}
              <div className="mobile-preview-stage">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="mobile-preview-img"
                  loading="lazy"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projectsData } from '../data/portfolioData';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Clock,
  User,
  ExternalLink,
  Play,
  RotateCcw,
  Sparkles,
  Sliders,
  ShieldCheck,
  CloudRain,
  Camera,
  TrendingUp,
} from 'lucide-react';

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.id === id) || projectsData[0];

  // Interactive Prototype Simulator States
  const [simFilter, setSimFilter] = useState('all');
  const [taggedItems, setTaggedItems] = useState([
    { id: 1, label: 'Thermal Hotspot Det.', status: 'Verified', time: '02:14' },
    { id: 2, label: 'Perimeter Clearance', status: 'Approved', time: '05:40' },
  ]);
  const [simInputValue, setSimInputValue] = useState('');

  // Find prev/next projects
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject =
    projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  const handleAddSimTag = () => {
    if (!simInputValue.trim()) return;
    setTaggedItems([
      ...taggedItems,
      {
        id: Date.now(),
        label: simInputValue,
        status: 'New Tag',
        time: '08:22',
      },
    ]);
    setSimInputValue('');
  };

  return (
    <div className="case-study-page section-padding-hero">
      <div className="container">
        {/* Back Link */}
        <div className="mb-4">
          <Link to="/works" className="btn-secondary-custom py-1.5 px-3 text-xs">
            <ArrowLeft size={14} />
            <span>Back to Case Studies</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="mb-5 max-w-3xl">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge-pill">
              <Layers size={13} className="text-accent" />
              <span>{project.categoryLabel}</span>
            </span>
            <span className="badge-pill font-mono">{project.year}</span>
          </div>

          <h1 className="heading-display font-serif mb-3">{project.title}</h1>
          <p className="subheading-lead mb-0">{project.subtitle}</p>
        </div>

        {/* Meta Grid Box */}
        <div className="card-portfolio p-4 mb-5">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <span className="text-xs font-semibold text-muted-custom font-sans block mb-1">CLIENT</span>
              <span className="text-sm font-medium text-primary">{project.client}</span>
            </div>
            <div className="col-md-3 col-6">
              <span className="text-xs font-semibold text-muted-custom font-sans block mb-1">MY ROLE</span>
              <span className="text-sm font-medium text-primary">{project.role}</span>
            </div>
            <div className="col-md-3 col-6">
              <span className="text-xs font-semibold text-muted-custom font-sans block mb-1">TIMELINE</span>
              <span className="text-sm font-medium text-primary">{project.timeline}</span>
            </div>
            <div className="col-md-3 col-6">
              <span className="text-xs font-semibold text-muted-custom font-sans block mb-1">DELIVERABLES</span>
              <span className="text-sm font-medium text-primary">{project.deliverables.slice(0, 2).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Large Hero Showcase Banner */}
        <div className="case-study-hero-banner mb-5" style={{ background: project.coverColor }}>
          <div className="case-study-screen-mockup">
            <div className="mockup-header-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="text-center py-4">
              <span className="badge-pill mb-2" style={{ color: project.accentColor }}>
                {project.heroBadge}
              </span>
              <h2 className="font-serif text-2xl text-white mb-2">{project.title.split('—')[0]}</h2>
              <p className="text-sm text-white-50 max-w-md mx-auto mb-4">{project.summary}</p>
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-white text-dark text-xs font-semibold">
                <span>Interactive Live Demo Below</span>
                <Sparkles size={14} className="text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Stats Row */}
        <div className="row g-4 mb-5">
          {project.keyMetrics.map((metric, i) => (
            <div key={i} className="col-md-4">
              <div className="card-portfolio p-4 text-center">
                <h3 className="heading-display font-serif text-accent mb-1">{metric.value}</h3>
                <span className="text-xs font-semibold text-muted-custom font-sans uppercase">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Deep-Dive Sections */}
        <div className="row g-5 mb-5">
          {/* Left: Problem & Solution */}
          <div className="col-lg-7">
            <div className="mb-5">
              <h3 className="heading-section font-serif mb-3">The Problem & Challenge</h3>
              <p className="text-secondary leading-relaxed mb-0">{project.problem}</p>
            </div>

            <div className="mb-5">
              <h3 className="heading-section font-serif mb-3">The Design & Build Solution</h3>
              <p className="text-secondary leading-relaxed mb-0">{project.solution}</p>
            </div>

            <div>
              <h3 className="heading-section font-serif mb-3">Key Platform Capabilities</h3>
              <div className="features-checklist">
                {project.features.map((feat, i) => (
                  <div key={i} className="d-flex align-items-start gap-3 mb-3">
                    <CheckCircle2 size={18} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-sm text-primary leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Deliverables & Tech Stack */}
          <div className="col-lg-5">
            <div className="card-portfolio p-4 mb-4">
              <h4 className="font-serif text-lg mb-3">Project Deliverables</h4>
              <ul className="deliverables-list mb-0">
                {project.deliverables.map((del, i) => (
                  <li key={i} className="text-sm text-secondary mb-2">
                    {del}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-portfolio p-4">
              <h4 className="font-serif text-lg mb-3">Technology Stack</h4>
              <div className="d-flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="badge-pill text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Prototype Simulator inside the page */}
        <div className="section-padding py-5 border-top-subtle mb-5">
          <div className="card-portfolio p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
              <div>
                <span className="badge-pill mb-2">
                  <Sparkles size={14} className="text-accent" />
                  <span>Interactive Component Simulator</span>
                </span>
                <h3 className="heading-section font-serif mb-0">Try the Live {project.title.split('—')[0]} Module</h3>
              </div>
              <span className="badge-pill font-mono text-xs">Sandbox Environment</span>
            </div>

            {/* Interactive Demo Surface */}
            <div className="simulator-canvas p-4 bg-body-secondary rounded-lg border-subtle">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="simulator-preview-box p-4 bg-surface rounded-md border-strong">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="font-mono text-xs text-accent">● LIVE TELEMETRY STREAM</span>
                      <span className="text-xs font-mono">1080p @ 60fps</span>
                    </div>
                    <div className="sim-video-placeholder mb-3 text-center py-5 rounded bg-dark text-white">
                      <Play size={32} className="mx-auto text-accent mb-2" />
                      <span className="text-xs font-serif block">Active Feed: Mission Alpha-9</span>
                    </div>
                    <div className="d-flex justify-content-between text-xs text-secondary font-mono">
                      <span>ALT: 120m</span>
                      <span>BATT: 88%</span>
                      <span>GPS: LAT 11.25°</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="simulator-control-panel p-4 bg-surface rounded-md border-strong">
                    <h5 className="font-serif text-base mb-2">Inspection Tag Logger</h5>
                    <p className="text-xs text-muted-custom mb-3">Type an anomaly tag to test real-time annotation sync:</p>

                    <div className="d-flex gap-2 mb-3">
                      <input
                        type="text"
                        value={simInputValue}
                        onChange={(e) => setSimInputValue(e.target.value)}
                        placeholder="e.g. Structural Wear Tag"
                        className="form-input-custom text-xs py-2"
                      />
                      <button onClick={handleAddSimTag} className="btn-primary-custom text-xs py-2 px-3">
                        Tag Anomaly
                      </button>
                    </div>

                    <div className="sim-tags-list">
                      <span className="text-xs font-semibold text-muted-custom block mb-2">ANNOTATED CLAIMS ({taggedItems.length})</span>
                      {taggedItems.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between align-items-center p-2 mb-2 bg-body rounded text-xs">
                          <span className="font-medium">{item.label}</span>
                          <span className="badge-pill font-mono text-xs">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Case Study Navigation */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 py-4 border-top-subtle">
          <Link to={`/work/${prevProject.id}`} className="btn-secondary-custom">
            <ArrowLeft size={16} />
            <span>Previous: {prevProject.title.split('—')[0]}</span>
          </Link>

          <Link to={`/work/${nextProject.id}`} className="btn-primary-custom">
            <span>Next: {nextProject.title.split('—')[0]}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .case-study-hero-banner {
          border-radius: var(--radius-lg);
          padding: 3.5rem 2rem;
          overflow: hidden;
        }

        .case-study-screen-mockup {
          max-width: 760px;
          margin: 0 auto;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }

        .text-2xl {
          font-size: 1.85rem;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.7);
        }

        .deliverables-list {
          padding-left: 1.2rem;
        }

        .simulator-canvas {
          background-color: var(--bg-body-secondary);
        }

        .sim-video-placeholder {
          background: #0B0F19;
        }
      `}</style>
    </div>
  );
}

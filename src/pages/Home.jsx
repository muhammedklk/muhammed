import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code, Layout, Terminal, FileText, Compass } from 'lucide-react';
import { personalInfo, projectsData } from '../data/portfolioData';
import GardenCanvas from '../components/GardenCanvas';
import ProjectCard from '../components/ProjectCard';
import MascotSlingshotGame from '../components/MascotSlingshotGame';
import EnvelopeContact from '../components/EnvelopeContact';

export default function Home({ theme, onOpenResume }) {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="section-padding-hero">
        <div className="container">
          <div className="hero-content-wrapper max-w-3xl">
            {/* Top Badge */}
            <div className="badge-pill mb-3">
              <span className="logo-dot"></span>
              <span>Hello, I’m Muhammed K</span>
            </div>

            {/* Headline matching abhiyyh.com composition */}
            <h1 className="heading-display mb-4">
              A curious <span className="font-serif italic font-normal text-accent">designer & builder</span> who crafts human-centered products.
            </h1>

            {/* Intro Narrative */}
            <p className="subheading-lead mb-4">
              {personalInfo.shortBio}
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
              <Link to="/works" className="btn-primary-custom">
                <span>Explore my work</span>
                <ArrowRight size={16} />
              </Link>
              <button onClick={onOpenResume} className="btn-secondary-custom">
                <FileText size={16} />
                <span>View Resume</span>
              </button>
            </div>
          </div>

          {/* Interactive Botanical Swaying Garden Canvas */}
          <GardenCanvas theme={theme} />
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="section-padding" id="work">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-5">
            <div>
              <span className="badge-pill mb-2">
                <Compass size={14} className="text-accent" />
                <span>Selected Works</span>
              </span>
              <h2 className="heading-section font-serif mb-0">From problem to shipped product.</h2>
            </div>
            <Link to="/works" className="btn-secondary-custom">
              <span>View All 8 Case Studies</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid-list">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Design & Build Philosophy Banner */}
      <section className="section-padding bg-body-secondary py-5 border-top-subtle border-bottom-subtle">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge-pill mb-2">
                <Sparkles size={14} className="text-accent" />
                <span>Craft & Discipline</span>
              </span>
              <h2 className="heading-section font-serif mb-3">
                I work across product design and production code.
              </h2>
              <p className="text-secondary leading-relaxed mb-0">
                I enjoy figuring out how complex systems work, then making them effortless to use. Whether it's turning drone video feeds into instant incident reports or building spatial iOS tools, I shape the idea, the visual design, and every responsive interaction.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="card-portfolio bg-surface p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="icon-badge-box">
                    <Code size={20} className="text-accent" />
                  </div>
                  <div>
                    <h5 className="font-serif mb-0 text-base">Full-Stack Design Handoff</h5>
                    <p className="text-xs text-muted-custom mb-0">Zero friction between design and browser code</p>
                  </div>
                </div>
                <div className="skills-pill-cloud d-flex flex-wrap gap-2">
                  <span className="badge-pill">UI/UX Architecture</span>
                  <span className="badge-pill">React 18</span>
                  <span className="badge-pill">Design Systems</span>
                  <span className="badge-pill">CSS Custom Variables</span>
                  <span className="badge-pill">Framer Motion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mascot Slingshot Mini-Game */}
      <section className="section-padding" id="game">
        <div className="container">
          <MascotSlingshotGame theme={theme} />
        </div>
      </section>

      {/* Interactive Envelope Contact Section */}
      <section className="section-padding" id="contact">
        <div className="container">
          <EnvelopeContact />
        </div>
      </section>

      <style>{`
        .max-w-3xl {
          max-width: 820px;
        }

        .border-top-subtle {
          border-top: 1px solid var(--border-subtle);
        }

        .border-bottom-subtle {
          border-bottom: 1px solid var(--border-subtle);
        }

        .bg-body-secondary {
          background-color: var(--bg-body-secondary);
        }

        .bg-surface {
          background-color: var(--bg-surface) !important;
        }

        .icon-badge-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .italic {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Calendar,
  User,
  Wrench,
  Sparkles,
  Layers
} from 'lucide-react';
import ArrowIcon from '../../components/ArrowIcon';
import { projectsData } from '../../data/projects';
import ResponsiveMockups from '../../components/ResponsiveMockups';
import GlassCard from '../../components/GlassCard';
import Button from '../../components/Button';
import SectionHeading from '../../components/SectionHeading';

export default function CaseStudy({ explicitSlug }) {
  const { slug: routeSlug } = useParams();
  const slug = explicitSlug || routeSlug;
  const navigate = useNavigate();

  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!project) {
    return (
      <div className="section-padding text-center">
        <div className="container">
          <h2>Case Study Not Found</h2>
          <p>The requested case study could not be located in the portfolio repository.</p>
          <Button to="/works" variant="primary" icon={ArrowLeft} iconPosition="left">
            Back to Works
          </Button>
        </div>
      </div>
    );
  }

  // Find previous and next projects
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Related projects (exclude current)
  const relatedProjects = projectsData.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="case-study-page">
      {/* =========================================
          1. BREADCRUMBS & HERO INTRO
          ========================================= */}
      <section className="case-study-hero section-padding-sm bg-subtle" style={{ paddingTop: 'clamp(32px, 5vw, 60px)' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <li>
                <Link to="/" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
              </li>
              <li><ChevronRight size={14} aria-hidden="true" /></li>
              <li>
                <Link to="/works" style={{ color: 'var(--color-text-secondary)' }}>Works</Link>
              </li>
              <li><ChevronRight size={14} aria-hidden="true" /></li>
              <li style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{project.title}</li>
            </ol>
          </nav>

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge-pill" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              {project.category}
            </span>
            {project.isConcept && (
              <span className="concept-badge" style={{ position: 'static' }}>
                Conceptual Project
              </span>
            )}
          </div>

          <h1 style={{ marginBottom: '14px' }}>{project.title}</h1>
          <p className="lead" style={{ maxWidth: '800px', marginBottom: '36px' }}>
            {project.subtitle} — {project.summary}
          </p>

          {/* Project Metadata Grid */}
          <GlassCard style={{ padding: '24px 32px', background: '#FFFFFF' }}>
            <div className="row g-4">
              <div className="col-lg-3 col-sm-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: '6px' }}>
                  <User size={14} color="var(--color-primary)" />
                  <span>Role</span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>
                  {project.role}
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: '6px' }}>
                  <Sparkles size={14} color="var(--color-primary)" />
                  <span>Client / Brand</span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>
                  {project.client}
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: '6px' }}>
                  <Calendar size={14} color="var(--color-primary)" />
                  <span>Timeline</span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>
                  {project.period}
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, marginBottom: '6px' }}>
                  <Wrench size={14} color="var(--color-primary)" />
                  <span>Toolkit</span>
                </div>
                <div style={{ fontWeight: 500, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>
                  {project.tools.slice(0, 3).join(', ')}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* =========================================
          2. HERO FEATURED IMAGE PREVIEW
          ========================================= */}
      <section className="section-padding-sm">
        <div className="container">
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-card-border)', boxShadow: 'var(--shadow-lg)' }}>
            <img
              src={project.thumbnail}
              alt={`${project.title} Hero Preview`}
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* =========================================
          3. BACKGROUND & PROBLEM STATEMENT
          ========================================= */}
      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Context"
                title="Project Background"
                description={project.background}
              />
            </div>

            <div className="col-lg-6">
              <GlassCard style={{ padding: '36px', height: '100%', background: '#FFFFFF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
                  <Sparkles size={16} />
                  <span>The Challenge</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '14px' }}>Problem Statement</h3>
                <p style={{ fontSize: '1.025rem', lineHeight: '1.7', margin: 0 }}>
                  {project.problemStatement}
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          4. OBJECTIVES & TARGET AUDIENCE
          ========================================= */}
      <section className="section-padding bg-subtle">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <SectionHeading
                eyebrow="Key Goals"
                title="Project Objectives"
                accentWords={["Project", "Objectives"]}
              />
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {project.objectives.map((obj, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    <CheckCircle2 size={20} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-5">
              <GlassCard style={{ padding: '32px', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Target Audience</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                  {project.targetAudience}
                </p>

                <div style={{ borderTop: '1px solid var(--color-card-border)', paddingTop: '16px', marginTop: '16px' }}>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Technologies Used</h4>
                  <div className="project-tech-tags" style={{ margin: 0 }}>
                    {project.tools.map((t, idx) => (
                      <span key={idx} className="tech-tag" style={{ padding: '6px 12px' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          5. DESIGN PROCESS
          ========================================= */}
      {project.designProcess && (
        <section className="section-padding">
          <div className="container">
            <SectionHeading
              eyebrow="Execution"
              title="Design &amp; Development Process"
              accentWords={["Design", "Process"]}
              description="Step-by-step methodologies employed from stakeholder discovery to interface implementation."
              centered={true}
            />

            <div className="row g-4">
              {project.designProcess.map((proc, i) => (
                <div key={i} className="col-lg-3 col-sm-6">
                  <GlassCard style={{ padding: '28px 24px', height: '100%', background: '#FFFFFF' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '8px' }}>
                      {proc.step}
                    </div>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
                      {proc.desc}
                    </p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          6. RESPONSIVE DESIGN SHOWCASE (DEDICATED SECTION)
          ========================================= */}
      <section className="section-padding bg-subtle">
        <div className="container">
          <ResponsiveMockups
            desktopImage={project.desktopMockup}
            tabletImage={project.tabletMockup}
            phoneImage={project.phoneMockup}
            projectTitle={project.title}
          />
        </div>
      </section>

      {/* =========================================
          7. KEY FEATURES & CHALLENGES/SOLUTIONS
          ========================================= */}
      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            {/* Key Features */}
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Functionality"
                title="Key Features Implemented"
              />
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {project.keyFeatures.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Solutions */}
            <div className="col-lg-6">
              <SectionHeading
                eyebrow="Problem Solving"
                title="Challenges &amp; Solutions"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {project.challengesAndSolutions.map((cs, i) => (
                  <GlassCard key={i} style={{ padding: '24px 28px', background: '#FFFFFF' }}>
                    <div style={{ fontWeight: 500, color: 'var(--color-text-main)', marginBottom: '8px', fontSize: '1.05rem' }}>
                      Challenge: {cs.challenge}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                      <strong style={{ color: 'var(--color-primary)' }}>Solution: </strong>
                      {cs.solution}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          8. OUTCOMES & LEARNINGS
          ========================================= */}
      <section className="section-padding-sm bg-subtle">
        <div className="container">
          <GlassCard style={{ padding: '40px', background: '#FFFFFF', textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Project Impact</div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '14px' }}>Outcomes &amp; Learnings</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: '1.7', margin: 0 }}>
              {project.outcomes}
            </p>
          </GlassCard>
        </div>
      </section>

      {/* =========================================
          9. PREVIOUS & NEXT PROJECT NAVIGATION
          ========================================= */}
      <section className="section-padding-sm" style={{ borderTop: '1px solid var(--color-card-border)' }}>
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-6">
              <Link to={`/works/${prevProject.slug}`} style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>
                  <ArrowLeft size={14} /> Previous Project
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--color-text-main)' }}>
                  {prevProject.title}
                </span>
              </Link>
            </div>

            <div className="col-6 text-end">
              <Link to={`/works/${nextProject.slug}`} style={{ display: 'inline-flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500, textTransform: 'uppercase' }}>
                  Next Project <ArrowRight size={14} />
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--color-text-main)' }}>
                  {nextProject.title}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          10. FINAL CONTACT CALL TO ACTION
          ========================================= */}
      <section className="section-padding bg-subtle text-center">
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', marginBottom: '12px' }}>
            Interested in working together on a similar project?
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 28px', color: 'var(--color-text-secondary)' }}>
            Let's discuss how my UI/UX design and frontend development skills can add value to your product.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button to="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Get In Touch
            </Button>
            <Button to="/works" variant="outline" size="lg">
              Explore All Projects
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
}

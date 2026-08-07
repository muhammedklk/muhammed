import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
  const { about, settings } = usePortfolio();

  const avatar = (about?.avatarUrl && !about.avatarUrl.includes('gyogrea')) ? about.avatarUrl : '/assets/profile_photo.jpg';
  const title = about?.title || "Hi, I'm Muhammed 👋";
  const subtitle = about?.subtitle || "Multidisciplinary UI/UX Designer & Front-End Developer dedicated to building thoughtful, high-performance web products that feel intuitive and alive.";
  
  const singleParagraph = Array.isArray(about?.bioParagraphs) && about.bioParagraphs.length > 0
    ? about.bioParagraphs.join(' ')
    : "I bridge the gap between creative visual artistry and technical front-end engineering. My goal is to build digital products that not only look breathtaking, but perform flawlessly across every screen size. My approach combines rigorous user research with meticulous typographic hierarchies, smooth micro-interactions, and resilient code to ensure every project leaves a lasting impact.";

  const email = settings?.contactEmail || "muhammedklkm@gmail.com";
  const location = settings?.location || "Kerala, India (Remote Worldwide)";

  // Skill categories matching exact resume
  const designSkills = ['Figma', 'Adobe Photoshop', 'Wireframing & Prototyping', 'Design Systems', 'Mobile & Web Interface Design', 'UI Animation & Interaction'];
  const frontendSkills = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GSAP', 'Responsive Design', 'GitHub'];
  const softSkills = ['Creative Thinking', 'Communication', 'Problem Solving', 'Collaboration'];

  return (
    <>
      {/* Personal Profile Photo & Identity Section */}
      <section className="about-portrait-section grid-lines-bg">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Profile Photo Card (Left) */}
            <div className="col-lg-5 col-md-12">
              <div className="about-portrait-card">
                <div className="portrait-image-wrapper">
                  <img
                    src={avatar}
                    alt="Muhammed - UI/UX Designer & Developer"
                    className="about-portrait-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />

                  {/* Styled Avatar Fallback Render */}
                  <div className="portrait-avatar-fallback">
                    <div className="avatar-circle-inner">
                      <span className="avatar-initials">M</span>
                    </div>
                  </div>

                  <div className="portrait-badges-layer">
                    <div className="portrait-floating-badge badge-role">
                      <span className="badge-icon">⚡</span>
                      <span>UI/UX & Web Dev</span>
                    </div>
                    <div className="portrait-floating-badge badge-avail">
                      <span className="badge-pulse"></span>
                      <span>Available for Hire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Statement & Quick Info (Right) */}
            <div className="col-lg-7 col-md-12">
              <div className="portrait-intro-block">
                <span className="page-badge">ABOUT MY CRAFT</span>
                <h2 className="portrait-intro-name">{title}</h2>
                <h3 className="portrait-intro-role">
                  {subtitle}
                </h3>
                
                <p className="portrait-intro-text">
                  {singleParagraph}
                </p>

                <div className="portrait-quick-details">
                  <div className="quick-detail-item">
                    <span className="detail-label">Location</span>
                    <span className="detail-val">{location}</span>
                  </div>
                  <div className="quick-detail-item">
                    <span className="detail-label">Specialization</span>
                    <span className="detail-val">Web Design, Development</span>
                  </div>
                  <div className="quick-detail-item">
                    <span className="detail-label">Email</span>
                    <a href={`mailto:${email}`} className="detail-val text-link">
                      {email}
                    </a>
                  </div>
                </div>

                {/* Download CV Prominent CTA Buttons */}
                <div className="portrait-actions-row">
                  <a
                    href="assets/cv/Muhammed_K_Resume.pdf"
                    target="_blank"
                    download="Muhammed_K_Resume.pdf"
                    className="btn-download-cv-lg"
                  >
                    <span>Download My CV</span>
                  </a>
                  <Link to="/contact" className="btn-contact-outline-lg">
                    <span>Get in Touch</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Separate Cards for Skills - Light Theme Premium Styling */}
      <section style={{ padding: '40px 0 90px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '36px', textAlign: 'center' }}>
            <span className="page-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>TECHNICAL CAPABILITIES</span>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Skills & Expertise Matrix
            </h2>
          </div>

          <div className="row g-4">
            {/* Card 1: Design */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div style={{ background: '#ffffff', borderRadius: '20px', height: '100%', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                    </div>
                    <span style={{ color: '#65a30d', fontWeight: '800', fontSize: '12px', letterSpacing: '1px' }}>01 / DESIGN</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(101, 163, 13, 0.12)', color: '#65a30d' }}>🎨</span>
                    Design & UI/UX
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {designSkills.map((skill, idx) => (
                      <span key={idx} style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', color: '#0f172a', fontSize: '12.5px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#65a30d' }}></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                  Figma, Photoshop, Interface Systems
                </div>
              </div>
            </div>

            {/* Card 2: Frontend Development */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div style={{ background: '#ffffff', borderRadius: '20px', height: '100%', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                    </div>
                    <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '12px', letterSpacing: '1px' }}>02 / FRONTEND</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.12)', color: '#2563eb' }}>💻</span>
                    Frontend Development
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {frontendSkills.map((skill, idx) => (
                      <span key={idx} style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', color: '#0f172a', fontSize: '12.5px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }}></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                  HTML5, CSS3, JS, React, GSAP, GitHub
                </div>
              </div>
            </div>

            {/* Card 3: Soft Skills */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div style={{ background: '#ffffff', borderRadius: '20px', height: '100%', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                    </div>
                    <span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '12px', letterSpacing: '1px' }}>03 / SOFT SKILLS</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>💡</span>
                    Soft Skills & Mindset
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {softSkills.map((skill, idx) => (
                      <span key={idx} style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', color: '#0f172a', fontSize: '12.5px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed' }}></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                  Collaboration, Problem Solving & Strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

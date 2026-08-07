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

  // Skill categories
  const designSkills = ['Figma', 'Adobe Photoshop', 'Wireframing & Prototyping', 'Design Systems', 'Mobile & Web Interface Design', 'UI Animation & Interaction'];
  const frontendSkills = ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'GSAP', 'Responsive Design', 'GitHub', 'React'];
  const softSkills = ['Creative Thinking', 'Communication', 'Problem Solving', 'Collaboration', 'User Research'];

  // Core Pillars of Craft
  const pillars = [
    {
      number: '01',
      title: 'Visual Excellence',
      icon: '✨',
      badge: 'Design & Aesthetics',
      desc: 'Crafting pixel-perfect, modern UI layouts with harmonious color palettes, fluid micro-interactions, and strong typographic hierarchy.',
      color: '#65a30d',
      bgLight: '#f7fee7'
    },
    {
      number: '02',
      title: 'Technical Mastery',
      icon: '⚡',
      badge: 'Front-End Code',
      desc: 'Building responsive, clean, and accessible code structure utilizing modern HTML5, CSS3, JavaScript, React, and performance best practices.',
      color: '#2563eb',
      bgLight: '#eff6ff'
    },
    {
      number: '03',
      title: 'User-Centric Empathy',
      icon: '💡',
      badge: 'Product Strategy',
      desc: 'Designing intuitive user flows, clear navigation patterns, and seamless interactions that solve real human problems effortlessly.',
      color: '#7c3aed',
      bgLight: '#f5f3ff'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', paddingTop: '20px', paddingBottom: '80px' }}>
      
      {/* ========================================================================= */}
      {/* 1. HERO IDENTITY & PORTRAIT SECTION (LIGHT THEME) */}
      {/* ========================================================================= */}
      <section className="about-portrait-section grid-lines-bg" style={{ padding: '50px 0 70px 0' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            
            {/* Profile Photo Card (Left Column) */}
            <div className="col-lg-5 col-md-12">
              <div className="about-portrait-card" style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '32px',
                padding: '14px',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)'
              }}>
                <div className="portrait-image-wrapper" style={{
                  height: '460px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#f1f5f9'
                }}>
                  <img
                    src={avatar}
                    alt="Muhammed - UI/UX Designer & Developer"
                    className="about-portrait-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />

                  {/* Avatar Fallback */}
                  <div className="portrait-avatar-fallback" style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    gap: '16px'
                  }}>
                    <div className="avatar-circle-inner" style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #d2ea26 0%, #84cc16 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 25px rgba(132, 204, 22, 0.3)'
                    }}>
                      <span className="avatar-initials" style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a' }}>M</span>
                    </div>
                  </div>

                  {/* Floating Badges */}
                  <div className="portrait-badges-layer" style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    right: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid #e2e8f0',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#0f172a',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>⚡</span>
                      <span>UI/UX & Web Dev</span>
                    </div>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid #bbf7d0',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#15803d',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                      <span>Available for Hire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Details (Right Column) */}
            <div className="col-lg-7 col-md-12">
              <div className="portrait-intro-block" style={{ paddingLeft: '10px' }}>
                <span className="page-badge" style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  color: '#475569',
                  marginBottom: '16px'
                }}>
                  ABOUT MY CRAFT & PHILOSOPHY
                </span>

                <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                  {title}
                </h2>

                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
                  {subtitle}
                </h3>
                
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', marginBottom: '28px' }}>
                  {singleParagraph}
                </p>

                {/* Quick Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  padding: '20px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  marginBottom: '28px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Location</span>
                    <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>{location}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Focus</span>
                    <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>Web Design & Development</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Email</span>
                    <a href={`mailto:${email}`} style={{ fontSize: '13.5px', fontWeight: '700', color: '#2563eb', textDecoration: 'none' }}>
                      {email}
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href="assets/cv/Muhammed_K_Resume.pdf"
                    target="_blank"
                    download="Muhammed_K_Resume.pdf"
                    style={{
                      padding: '14px 28px',
                      background: '#0f172a',
                      color: '#ffffff',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Download CV</span>
                    <span>↓</span>
                  </a>

                  <Link
                    to="/contact"
                    style={{
                      padding: '14px 28px',
                      background: '#ffffff',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: '30px',
                      fontSize: '14px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Get in Touch</span>
                    <span>→</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE THREE PILLARS OF CRAFT (LIGHT THEME) */}
      {/* ========================================================================= */}
      <section style={{ padding: '40px 0 60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#65a30d', display: 'block', marginBottom: '8px' }}>
              DESIGN & ENGINEERING TRIAD
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              The 3 Pillars of My Craft
            </h2>
          </div>

          <div className="row g-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 col-sm-12">
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  padding: '30px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <span style={{
                        fontSize: '24px',
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        background: pillar.bgLight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {pillar.icon}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: pillar.color, letterSpacing: '1px' }}>
                        {pillar.number} / {pillar.badge.toUpperCase()}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
                      {pillar.title}
                    </h3>

                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TECHNICAL SKILLS & EXPERTISE MATRIX (LIGHT THEME) */}
      {/* ========================================================================= */}
      <section style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '36px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#2563eb', display: 'block', marginBottom: '8px' }}>
              TECHNICAL CAPABILITIES
            </span>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
              Skills & Tools Matrix
            </h2>
          </div>

          <div className="row g-4">
            
            {/* Card 1: Design */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                height: '100%',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}>
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
                      <span key={idx} style={{
                        padding: '6px 12px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        color: '#0f172a',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#65a30d' }}></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                  Figma, Photoshop, Wireframes & Systems
                </div>
              </div>
            </div>

            {/* Card 2: Frontend Development */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                height: '100%',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}>
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
                      <span key={idx} style={{
                        padding: '6px 12px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        color: '#0f172a',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
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

            {/* Card 3: Mindset & Soft Skills */}
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div style={{
                background: '#ffffff',
                borderRadius: '24px',
                height: '100%',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
                    </div>
                    <span style={{ color: '#7c3aed', fontWeight: '800', fontSize: '12px', letterSpacing: '1px' }}>03 / MINDSET</span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>💡</span>
                    Soft Skills & Mindset
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {softSkills.map((skill, idx) => (
                      <span key={idx} style={{
                        padding: '6px 12px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        color: '#0f172a',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7c3aed' }}></span>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
                  Collaboration, Strategy & Problem Solving
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CALL TO ACTION BANNER (LIGHT THEME) */}
      {/* ========================================================================= */}
      <section style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            border: '1px solid #cbd5e1',
            borderRadius: '32px',
            padding: '50px 30px',
            textAlign: 'center',
            boxShadow: '0 15px 35px rgba(0,0,0,0.03)'
          }}>
            <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#65a30d', display: 'inline-block', marginBottom: '12px' }}>
              LET'S WORK TOGETHER
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Have a Project or Vision in Mind?
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '500px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
              I am available for freelance projects, design systems, and full-time UI/UX or Front-End development roles.
            </p>
            <a
              href={`mailto:${email}`}
              style={{
                padding: '14px 32px',
                background: '#0f172a',
                color: '#ffffff',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)'
              }}
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

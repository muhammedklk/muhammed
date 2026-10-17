import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Mail, ArrowRight, ShieldCheck, Lock, Sparkles, Instagram, Linkedin, Github } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function MaintenancePage({ targetPage }) {
  const { maintenanceMode, personalInfo } = usePortfolio();
  const isSpecificPage = targetPage && targetPage !== 'Entire Portfolio';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 20%, #172554 0%, #030712 70%)',
      color: '#f8fafc',
      fontFamily: "'Mona Sans', system-ui, sans-serif",
      padding: '2rem 1.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient glow circles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '680px',
        width: '100%',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '24px',
        padding: '3rem 2.2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          background: 'rgba(234, 179, 8, 0.12)',
          border: '1px solid rgba(234, 179, 8, 0.35)',
          color: '#fde047',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '1.8rem',
          letterSpacing: '0.04em'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#eab308',
            boxShadow: '0 0 10px #eab308',
            animation: 'pulse 1.8s infinite'
          }} />
          <span>{isSpecificPage ? `${targetPage.toUpperCase()} UNDER MAINTENANCE` : 'SCHEDULED MAINTENANCE IN PROGRESS'}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '1.2rem'
        }}>
          {maintenanceMode?.title || (isSpecificPage ? `${targetPage} Under Maintenance` : 'Crafting Something Extraordinary.')}
        </h1>

        {/* Message */}
        <p style={{
          fontSize: '1.05rem',
          color: '#94a3b8',
          lineHeight: 1.65,
          marginBottom: '2.4rem',
          maxWidth: '540px',
          margin: '0 auto 2.4rem auto'
        }}>
          {maintenanceMode?.message || `Muhammed K's ${isSpecificPage ? targetPage.toLowerCase() : 'portfolio'} is currently undergoing scheduled updates and improvements. We will be live again shortly.`}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {isSpecificPage && (
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none'
              }}
            >
              <span>Back to Home</span>
              <ArrowRight size={15} />
            </Link>
          )}
          <a
            href={`mailto:${personalInfo?.email || 'muhammedklkm@gmail.com'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              background: 'linear-gradient(135deg, #0e2447 0%, #4087fb 35%, #3b82f6 100%)',
              color: '#ffffff',
              padding: '0.75rem 1.6rem',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(64, 135, 251, 0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <Mail size={16} />
            <span>Get in Touch Directly</span>
          </a>

          <Link
            to="/admin"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#e2e8f0',
              padding: '0.75rem 1.4rem',
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <Lock size={15} />
            <span>Admin Portal</span>
          </Link>
        </div>

        {/* Social Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          paddingTop: '1.8rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {personalInfo?.socials?.linkedin && (
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
              <Linkedin size={18} />
            </a>
          )}
          {personalInfo?.socials?.github && (
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
              <Github size={18} />
            </a>
          )}
          {personalInfo?.socials?.instagram && (
            <a href={personalInfo.socials.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8' }}>
              <Instagram size={18} />
            </a>
          )}
        </div>

      </div>

      {/* Footer copyright */}
      <div style={{
        marginTop: '2rem',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        © {new Date().getFullYear()} {personalInfo?.name || 'Muhammed K'}. All rights reserved.
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Linkedin, Github, Instagram } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function MaintenancePage({ targetPage }) {
  const { maintenanceMode, personalInfo } = usePortfolio();
  const isSpecificPage = targetPage && targetPage !== 'Entire Portfolio';

  // Simple, clean text resolution
  const displayTitle = (() => {
    if (maintenanceMode?.title && 
        maintenanceMode.title !== 'Crafting Something Extraordinary.' && 
        maintenanceMode.title !== 'Crafting Something Extraordinary') {
      return maintenanceMode.title;
    }
    if (isSpecificPage) {
      return `${targetPage} is Under Maintenance`;
    }
    return 'Site Under Maintenance';
  })();

  const displayMessage = (() => {
    if (maintenanceMode?.message && 
        !maintenanceMode.message.includes('extraordinary') && 
        !maintenanceMode.message.includes('exciting new case study additions')) {
      return maintenanceMode.message;
    }
    if (isSpecificPage) {
      return `The ${targetPage.toLowerCase()} is temporarily offline for quick updates. Please check back shortly.`;
    }
    return 'We are currently performing scheduled updates and maintenance. We will be back online shortly.';
  })();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f8fafc',
      color: '#0f172a',
      fontFamily: "'Mona Sans', system-ui, -apple-system, sans-serif",
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
      position: 'relative'
    }}>
      
      {/* Light minimalist card */}
      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '3rem 2.25rem 2.5rem',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Simple Status Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          background: '#fef3c7',
          border: '1px solid #fde68a',
          color: '#92400e',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          marginBottom: '1.4rem'
        }}>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#d97706',
            boxShadow: '0 0 0 2px rgba(217, 119, 6, 0.2)'
          }} />
          <span>{isSpecificPage ? `${targetPage.toUpperCase()} • MAINTENANCE` : 'MAINTENANCE IN PROGRESS'}</span>
        </div>

        {/* Simple Clean Headline */}
        <h1 style={{
          fontSize: 'clamp(1.75rem, 3.2vw, 2.25rem)',
          fontWeight: 700,
          color: '#0f172a',
          lineHeight: 1.25,
          letterSpacing: '-0.025em',
          margin: '0 0 0.85rem 0'
        }}>
          {displayTitle}
        </h1>

        {/* Simple Description Text */}
        <p style={{
          fontSize: '0.98rem',
          color: '#64748b',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
          maxWidth: '440px'
        }}>
          {displayMessage}
        </p>

        {/* Clean Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          width: '100%'
        }}>
          {isSpecificPage && (
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.88rem',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
            >
              <span>Back to Home</span>
              <ArrowRight size={14} />
            </Link>
          )}

          <a
            href={`mailto:${maintenanceMode?.contactEmail || personalInfo?.email || 'muhammedklkm@gmail.com'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#0f172a',
              color: '#ffffff',
              padding: '0.65rem 1.35rem',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'background 0.2s',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.12)'
            }}
          >
            <Mail size={15} />
            <span>Contact Muhammed</span>
          </a>
        </div>

        {/* Minimalist Social Icons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #f1f5f9',
          width: '100%'
        }}>
          {personalInfo?.socials?.linkedin && (
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              title="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
          )}
          {personalInfo?.socials?.github && (
            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              title="GitHub"
            >
              <Github size={17} />
            </a>
          )}
          {personalInfo?.socials?.instagram && (
            <a 
              href={personalInfo.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#94a3b8', transition: 'color 0.2s' }}
              title="Instagram"
            >
              <Instagram size={17} />
            </a>
          )}
        </div>

      </div>

      {/* Footer copyright */}
      <div style={{
        marginTop: '1.75rem',
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        © {new Date().getFullYear()} {personalInfo?.name || 'Muhammed K'}. All rights reserved.
      </div>

    </div>
  );
}

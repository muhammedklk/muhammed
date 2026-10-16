import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUpRight, Mail, Globe, Github, Linkedin, Instagram, Lock } from 'lucide-react';
import '../styles/footer.css';

export default function Footer() {
  const { personalInfo } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-glow-footer" id="site-footer">
      <div className="container theme-glow-footer-container">
        {/* Top Invitation Section */}
        <div className="footer-glow-top">
          <h2 className="footer-glow-heading">
            Have a project in mind? Let’s work together.
          </h2>
          <a 
            href={`mailto:${personalInfo?.email || 'muhammedklkm@gmail.com'}`} 
            className="footer-glow-pill-btn"
            id="footer-email-pill"
          >
            <span>{personalInfo?.email || 'muhammedklkm@gmail.com'}</span>
            <ArrowUpRight size={18} className="footer-pill-arrow" />
          </a>
        </div>

        {/* Middle Metadata & Socials Row */}
        <div className="footer-glow-mid-row">
          <div className="footer-glow-copyright" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span>© {currentYear} {personalInfo?.name || 'Muhammed K'}. All rights reserved.</span>
            <Link 
              to="/admin" 
              style={{ 
                color: 'var(--text-muted)', 
                opacity: 0.6, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '4px',
                fontSize: '0.78rem',
                textDecoration: 'none'
              }}
              title="CMS Admin Panel"
            >
              <Lock size={12} />
              <span>CMS</span>
            </Link>
          </div>
          <div className="footer-glow-socials">
            <a 
              href={`mailto:${personalInfo.email}`} 
              aria-label="Email" 
              className="footer-social-icon-btn"
            >
              <Mail size={16} />
            </a>
            <a 
              href={personalInfo.socials.portfolio || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Website" 
              className="footer-social-icon-btn"
            >
              <Globe size={16} />
            </a>
            <a 
              href={personalInfo.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="footer-social-icon-btn"
            >
              <Github size={16} />
            </a>
            <a 
              href={personalInfo.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="footer-social-icon-btn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href={personalInfo.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="footer-social-icon-btn"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Giant Bottom Wordmark inside the container on top of the Theme Color Bottom Glow */}
        <div className="footer-glow-bottom-wordmark" aria-hidden="true">
          <svg 
            viewBox="0 0 1240 210" 
            className="footer-wordmark-svg"
            preserveAspectRatio="xMidYMax meet"
            width="100%"
          >
            <text
              x="50%"
              y="180"
              textAnchor="middle"
              className="footer-wordmark-text"
            >
              MUHAMMED
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
}

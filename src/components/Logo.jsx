import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '', isFooter = false }) {
  return (
    <Link to="/" className={`site-logo ${className} ${isFooter ? 'footer-logo' : ''}`} aria-label="Muhammed K - Home">
      <div className="logo-badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized M & K monogram */}
          <path d="M4 19V5H8L12 12L16 5H20V19H17V10L13.5 16H10.5L7 10V19H4Z" fill="currentColor" />
        </svg>
      </div>
      <div className="logo-text-group">
        <span className="logo-name">Muhammed K</span>
        <span className="logo-title">UI/UX &amp; Front-End</span>
      </div>
    </Link>
  );
}

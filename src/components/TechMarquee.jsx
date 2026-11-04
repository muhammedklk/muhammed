import React from 'react';
import '../styles/tech-marquee.css';

// 3D Model Icons for all requested technologies
export const TECH_ITEMS = [
  {
    id: 'figma',
    name: 'Figma',
    color: '#F24E1E',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="figma-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
          </filter>
          <radialGradient id="fig-orange" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FF7D54" />
            <stop offset="100%" stopColor="#E03A08" />
          </radialGradient>
          <radialGradient id="fig-coral" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFA194" />
            <stop offset="100%" stopColor="#F24E1E" />
          </radialGradient>
          <radialGradient id="fig-purple" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#BE7BFF" />
            <stop offset="100%" stopColor="#8A38F5" />
          </radialGradient>
          <radialGradient id="fig-blue" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#54D5FF" />
            <stop offset="100%" stopColor="#0599DE" />
          </radialGradient>
          <radialGradient id="fig-green" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#3CE4A0" />
            <stop offset="100%" stopColor="#05A665" />
          </radialGradient>
        </defs>
        <g filter="url(#figma-depth)">
          <path d="M19 0H9.5C4.25 0 0 4.25 0 9.5s4.25 9.5 9.5 9.5H19V0z" fill="url(#fig-orange)" />
          <path d="M19 0h9.5C33.75 0 38 4.25 38 9.5S33.75 19 28.5 19H19V0z" fill="url(#fig-coral)" />
          <path d="M0 28.5C0 23.25 4.25 19 9.5 19H19v19H9.5C4.25 38 0 33.75 0 28.5z" fill="url(#fig-purple)" />
          <path d="M19 19h9.5c5.25 0 9.5 4.25 9.5 9.5s-4.25 9.5-9.5 9.5H19V19z" fill="url(#fig-blue)" />
          <path d="M0 47.5C0 42.25 4.25 38 9.5 38H19v9.5c0 5.25-4.25 9.5-9.5 9.5S0 52.75 0 47.5z" fill="url(#fig-green)" />
        </g>
      </svg>
    )
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    color: '#31A8FF',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ps-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00284A" />
            <stop offset="100%" stopColor="#001122" />
          </linearGradient>
          <linearGradient id="ps-border" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C8FF" />
            <stop offset="100%" stopColor="#005A9E" />
          </linearGradient>
          <linearGradient id="ps-text" x1="12" y1="14" x2="36" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#54D5FF" />
            <stop offset="100%" stopColor="#0099FF" />
          </linearGradient>
          <filter id="ps-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0099FF" floodOpacity="0.4" />
          </filter>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="10" fill="url(#ps-bg)" stroke="url(#ps-border)" strokeWidth="2.5" />
        {/* Beveled glossy sheen */}
        <path d="M3 12C3 7 7 3 12 3h24c5 0 9 4 9 9v4C33 18 15 20 3 24v-12z" fill="#FFFFFF" fillOpacity="0.08" />
        <g filter="url(#ps-glow)">
          {/* Letter P */}
          <path d="M14 15h6.5c3.2 0 5.5 1.8 5.5 4.8 0 3-2.3 4.8-5.5 4.8H17.5v8.4H14V15zm3.5 3v6.6h3c1.6 0 2.8-.8 2.8-2.3 0-1.5-1.2-2.3-2.8-2.3h-3z" fill="url(#ps-text)" />
          {/* Letter s */}
          <path d="M29.5 25.4c0-1.4 1.1-2.2 2.7-2.2 1.6 0 2.7.7 2.8 2h-2.1c-.1-.4-.4-.6-.7-.6-.4 0-.6.2-.6.5 0 .4.3.5 1.1.7 1.8.4 2.7 1.2 2.7 2.6 0 1.6-1.3 2.5-3 2.5-1.8 0-3-.9-3.1-2.3h2.2c.1.5.5.8.9.8.4 0 .7-.2.7-.6 0-.4-.4-.6-1.2-.8-1.5-.4-2.5-1-2.5-2.6z" fill="url(#ps-text)" />
        </g>
      </svg>
    )
  },
  {
    id: 'canva',
    name: 'Canva',
    color: '#00C4CC',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="canva-grad" cx="25%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="45%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </radialGradient>
          <filter id="canva-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#7D2AE8" floodOpacity="0.35" />
          </filter>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#canva-grad)" filter="url(#canva-depth)" />
        {/* Gloss highlight */}
        <ellipse cx="24" cy="11" rx="14" ry="5" fill="#FFFFFF" fillOpacity="0.22" />
        {/* Stylized Canva 'C' */}
        <path d="M33 21c-1.2-4.5-5.5-7.5-10.5-7.5-6.6 0-11.5 5.2-11.5 12s4.9 12 11.5 12c5.2 0 9.5-3.2 10.7-8h-4.3c-1 2.6-3.4 4.3-6.4 4.3-4.2 0-7.3-3.4-7.3-8.3s3.1-8.3 7.3-8.3c2.9 0 5.3 1.6 6.3 4H33z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'html5',
    name: 'HTML5',
    color: '#E44D26',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="html-depth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" floodColor="#E44D26" floodOpacity="0.35" />
          </filter>
          <linearGradient id="html-bevel" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6A3D" />
            <stop offset="100%" stopColor="#D03813" />
          </linearGradient>
        </defs>
        <g filter="url(#html-depth)">
          {/* Base Shield */}
          <path d="M7 3l3.6 40.5L24 48l13.4-4.5L41 3H7z" fill="url(#html-bevel)" />
          {/* 3D Fold - Right Shaded Half */}
          <path d="M24 6.5v37.8l10.8-3.6 3-34.2H24z" fill="#F16529" />
          <path d="M24 6.5H10.2l3 34.2L24 44.3V6.5z" fill="#E44D26" />
          {/* Number 5 Left */}
          <path d="M24 14.5H13.6l.4 4.8H24v-4.8zm0 9.8H18.2l.4 4.9H24v-4.9zm0 8.6l-5.6-1.5-.4-4.3H14l.7 8.5 9.3 2.6V32.9z" fill="#EBEBEB" />
          {/* Number 5 Right (Bright Highlight) */}
          <path d="M24 14.5h10.4l-.4 4.8H24v-4.8zm0 9.8h5.3l-.5 5.5-4.8 1.3V35.9l9.3-2.6.9-10.8H24v1.8z" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    id: 'css3',
    name: 'CSS3',
    color: '#1572B6',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="css-depth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="1.8" floodColor="#1572B6" floodOpacity="0.35" />
          </filter>
          <linearGradient id="css-bevel" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2980B9" />
            <stop offset="100%" stopColor="#0E5A93" />
          </linearGradient>
        </defs>
        <g filter="url(#css-depth)">
          <path d="M7 3l3.6 40.5L24 48l13.4-4.5L41 3H7z" fill="url(#css-bevel)" />
          {/* 3D Fold */}
          <path d="M24 6.5H10.2l3 34.2L24 44.3V6.5z" fill="#1572B6" />
          <path d="M24 6.5v37.8l10.8-3.6 3-34.2H24z" fill="#33A9DC" />
          {/* Number 3 Left */}
          <path d="M24 14.5H13.6l.4 4.8H24v-4.8zm0 9.8H18.2l.4 4.9H24v-4.9zm0 8.6l-5.6-1.5-.4-4.3H14l.7 8.5 9.3 2.6V32.9z" fill="#EBEBEB" />
          {/* Number 3 Right */}
          <path d="M24 14.5h10.4l-1 11.2H24v-4.8h5.1l.3-3.6H24v-2.8zm0 9.8h5.3l-.5 5.5-4.8 1.3V35.9l9.3-2.6 1.1-13.8H24v4.8z" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    color: '#F7DF1E',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="js-tile" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF268" />
            <stop offset="100%" stopColor="#F5D000" />
          </linearGradient>
          <filter id="js-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#C99E00" floodOpacity="0.4" />
          </filter>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="8" fill="url(#js-tile)" filter="url(#js-shadow)" />
        {/* Top glossy reflection */}
        <path d="M3 10C3 6 6 3 10 3h28c4 0 7 3 7 7v6L3 22V10z" fill="#FFFFFF" fillOpacity="0.3" />
        {/* Letters JS */}
        <path d="M14 26.5l3.8 2.2c.8-1.5 1.7-2.3 3-2.3 1.3 0 2.2.8 2.2 2.6v9h4.5v-9.3c0-3.9-2.3-5.8-5.8-5.8-3.5 0-5.9 2-7.7 3.6zm17 0l3.8 2.2c1.2-1.8 2.8-2.6 4.8-2.6 2.3 0 3.7 1.1 3.7 2.7 0 1.7-1.3 2.4-3.5 3.3-3.4 1.4-5.4 2.8-5.4 6 0 3.5 2.7 5.7 6.6 5.7 3.5 0 5.8-1.8 7-4.4l-3.8-2.2c-.7 1.4-1.7 2.1-3.2 2.1-1.4 0-2.3-.8-2.3-2 0-1.2.9-1.8 2.9-2.6 3.8-1.6 6-3 6-6.6 0-3.6-2.7-5.5-6.3-5.5-3.8 0-6.7 1.8-8.3 3.9z" fill="#1A1A1A" />
      </svg>
    )
  },
  {
    id: 'reactjs',
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="react-core" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#B3F5FF" />
            <stop offset="50%" stopColor="#61DAFB" />
            <stop offset="100%" stopColor="#0099CC" />
          </radialGradient>
          <filter id="react-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Central 3D sphere */}
        <circle cx="24" cy="24" r="5" fill="url(#react-core)" filter="url(#react-glow)" />
        {/* Orbital rings */}
        <g stroke="#61DAFB" strokeWidth="2.2" fill="none" opacity="0.95">
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(0 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(60 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" transform="rotate(120 24 24)" />
        </g>
      </svg>
    )
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    color: '#7952B3',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bs-pill" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9065D0" />
            <stop offset="100%" stopColor="#59287A" />
          </linearGradient>
          <filter id="bs-depth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#59287A" floodOpacity="0.4" />
          </filter>
        </defs>
        <rect x="3" y="3" width="42" height="42" rx="10" fill="url(#bs-pill)" filter="url(#bs-depth)" />
        {/* Top gloss */}
        <path d="M4 12C4 7 7 4 12 4h24c5 0 8 3 8 8v4C32 18 16 20 4 24v-12z" fill="#FFFFFF" fillOpacity="0.18" />
        {/* Distinctive Folded 3D 'B' */}
        <path d="M16 13h10.5c3.8 0 6.5 1.8 6.5 4.8 0 2.2-1.4 3.7-3.4 4.3 2.6.6 4.4 2.3 4.4 5 0 3.5-3 5.9-7.5 5.9H16V13zm5.5 4.5v5.2h4.5c1.8 0 3-.9 3-2.6 0-1.7-1.2-2.6-3-2.6h-4.5zm0 9.2v5.8h5.2c2.1 0 3.4-1.1 3.4-2.9s-1.3-2.9-3.4-2.9h-5.2z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'gsap',
    name: 'GSAP',
    color: '#88CE02',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gsap-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="gsap-green" x1="10" y1="10" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="50%" stopColor="#88CE02" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
          <filter id="gsap-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#88CE02" floodOpacity="0.45" />
          </filter>
        </defs>
        <rect x="3" y="3" width="42" height="42" rx="10" fill="url(#gsap-bg)" stroke="#334155" strokeWidth="1.5" />
        {/* GreenSock running icon mark */}
        <g filter="url(#gsap-glow)">
          <path d="M12 28l6-14h12l-4 8h8l-12 14 3-7h-8l-5-1z" fill="url(#gsap-green)" />
        </g>
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git',
    color: '#F05032',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="git-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF6B4E" />
            <stop offset="100%" stopColor="#D9381E" />
          </linearGradient>
          <filter id="git-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#D9381E" floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#git-shadow)">
          {/* 3D Tilted Diamond */}
          <rect x="7" y="7" width="34" height="34" rx="7" transform="rotate(45 24 24)" fill="url(#git-bg)" />
          {/* Branch Lines & 3D Nodes */}
          <path d="M17 24h10m0 0l5-5m-5 5v7" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="17" cy="24" r="3.2" fill="#FFFFFF" />
          <circle cx="32" cy="19" r="3.2" fill="#FFFFFF" />
          <circle cx="27" cy="31" r="3.2" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#24292F',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gh-sphere" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3F4652" />
            <stop offset="60%" stopColor="#1E232A" />
            <stop offset="100%" stopColor="#0B0E14" />
          </radialGradient>
          <filter id="gh-depth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>
        <circle cx="24" cy="24" r="21" fill="url(#gh-sphere)" filter="url(#gh-depth)" />
        {/* Specular sheen ring */}
        <circle cx="24" cy="24" r="20" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" fill="none" />
        {/* Official Octocat mark */}
        <path fillRule="evenodd" clipRule="evenodd" d="M24 11C16.8 11 11 16.8 11 24c0 5.7 3.7 10.6 8.9 12.3.7.1.9-.3.9-.6v-2.3c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.1 2 3 1.4 3.7 1.1.1-.8.4-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.7.1-3.5 0 0 1.1-.3 3.6 1.3 1-.3 2.1-.4 3.2-.4s2.2.1 3.2.4c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.3 3.1.1 3.5.8.9 1.3 2.1 1.3 3.5 0 5-3 6-5.9 6.4.5.4.9 1.2.9 2.4v3.5c0 .4.2.8.9.6C33.3 34.6 37 29.7 37 24c0-7.2-5.8-13-13-13z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'gpt',
    name: 'ChatGPT',
    color: '#10A37F',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gpt-core" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1BC99D" />
            <stop offset="100%" stopColor="#0B795D" />
          </linearGradient>
          <filter id="gpt-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#10A37F" floodOpacity="0.45" />
          </filter>
        </defs>
        <circle cx="24" cy="24" r="21" fill="url(#gpt-core)" filter="url(#gpt-glow)" />
        {/* Top glossy dome */}
        <ellipse cx="24" cy="12" rx="14" ry="5.5" fill="#FFFFFF" fillOpacity="0.22" />
        {/* OpenAI Knot Rosette */}
        <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M24 16v16m-7-12l14 8m-14 0l14-8" />
          <path d="M20 14l8 14-4 7-8-14 4-7z" opacity="0.6" />
          <path d="M28 14l-8 14 4 7 8-14-4-7z" opacity="0.6" />
        </g>
      </svg>
    )
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: '#7C3AED',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gemini-sparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#60A5FA" />
            <stop offset="70%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </radialGradient>
          <filter id="gemini-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Background glow disc */}
        <circle cx="24" cy="24" r="20" fill="url(#gemini-sparkle)" opacity="0.15" />
        {/* 4-Point Radiant Gemini Star */}
        <path d="M24 4C24 15 15 24 4 24c11 0 20 9 20 20 0-11 9-20 20-20-11 0-20-9-20-20z" fill="url(#gemini-sparkle)" filter="url(#gemini-glow)" />
        {/* Center brilliant core */}
        <circle cx="24" cy="24" r="3.5" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    id: 'claude',
    name: 'Claude',
    color: '#D97706',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="claude-sun" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="claude-shadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#B45309" floodOpacity="0.4" />
          </filter>
        </defs>
        {/* Anthropic Claude Sunburst Asterisk */}
        <g filter="url(#claude-shadow)" fill="url(#claude-sun)">
          <path d="M22 6h4v36h-4z" />
          <path d="M6 22h36v4H6z" />
          <path d="M12.7 10l2.8-2.8 25.5 25.5-2.8 2.8z" />
          <path d="M10 35.3l2.8 2.8 25.5-25.5-2.8-2.8z" />
          <circle cx="24" cy="24" r="6" fill="#FDE68A" />
        </g>
      </svg>
    )
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    color: '#3B82F6',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ag-prism" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <filter id="ag-depth" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#6366F1" floodOpacity="0.4" />
          </filter>
        </defs>
        {/* Antigravity floating geometric prism & levitation rings */}
        <g filter="url(#ag-depth)">
          {/* Outer levitation ring */}
          <ellipse cx="24" cy="36" rx="16" ry="6" stroke="url(#ag-prism)" strokeWidth="2.5" fill="none" opacity="0.6" />
          {/* Floating Inverted Delta / Levitation Core */}
          <path d="M24 7L38 31H10L24 7z" fill="url(#ag-prism)" />
          {/* Faceted Light Face */}
          <path d="M24 7v24H10L24 7z" fill="#FFFFFF" fillOpacity="0.25" />
          <circle cx="24" cy="20" r="3" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    id: 'stitch',
    name: 'Stitch',
    color: '#EC4899',
    icon: (
      <svg className="tech-icon-3d" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="stitch-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <filter id="stitch-depth" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#EC4899" floodOpacity="0.4" />
          </filter>
        </defs>
        {/* Google Stitch Design & Needle Icon */}
        <g filter="url(#stitch-depth)">
          <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#stitch-grad)" />
          {/* Gloss overlay */}
          <path d="M5 14C5 9 9 5 14 5h20c5 0 9 4 9 9v2C32 18 16 20 5 22v-8z" fill="#FFFFFF" fillOpacity="0.2" />
          {/* Stylized Cross Stitch / S vector */}
          <path d="M16 16l16 16M32 16L16 32" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="4" fill="#FFFFFF" />
        </g>
      </svg>
    )
  }
];

export default function TechMarquee({ className = '' }) {
  return (
    <section className={`tech-marquee-wrapper ${className}`} aria-label="Tools & Technologies Marquee">
      {/* Edge gradient masks for seamless left-right fade */}
      <div className="tech-marquee-fade tech-marquee-fade-left" aria-hidden="true" />
      <div className="tech-marquee-fade tech-marquee-fade-right" aria-hidden="true" />

      {/* Marquee Track Moving Right to Left */}
      <div className="tech-marquee-track">
        {/* Set 1 */}
        <div className="tech-marquee-group" aria-hidden="false">
          {TECH_ITEMS.map((item) => (
            <div key={`set1-${item.id}`} className="tech-marquee-item" style={{ '--accent-color': item.color }}>
              <div className="tech-marquee-icon-box">
                {item.icon}
              </div>
              <span className="tech-marquee-name">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Set 2 (Exact duplicate for gapless infinite loop) */}
        <div className="tech-marquee-group" aria-hidden="true">
          {TECH_ITEMS.map((item) => (
            <div key={`set2-${item.id}`} className="tech-marquee-item" style={{ '--accent-color': item.color }}>
              <div className="tech-marquee-icon-box">
                {item.icon}
              </div>
              <span className="tech-marquee-name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


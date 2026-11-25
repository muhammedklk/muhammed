import React, { useState } from 'react';
import { Layers, Code2, Sparkles, Check, Copy } from 'lucide-react';

/**
 * HeroCraftWidget Component
 * 
 * Interactive Design System & Code Craft Bento Showcase for UI/UX & Front-End Dev.
 * Features:
 * - Live interactive switch between "Design Mode" (Figma Tokens & Auto-Layout) and "Code Mode" (React & Motion)
 * - Interactive color token swatches with active selection
 * - Interactive component sandbox with live clickable variants
 * - Animated collaborative designer cursor ("Muhammed K")
 * - Smart modern badges and fluid micro-interactions
 */
export default function HeroCraftWidget() {
  const [activeTab, setActiveTab] = useState('design'); // 'design' | 'code'
  const [selectedVariant, setSelectedVariant] = useState('primary'); // 'primary' | 'glass' | 'glow'
  const [activeColor, setActiveColor] = useState('#7C5CE1');
  const [copied, setCopied] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const colors = [
    { name: 'Brand Violet', hex: '#7C5CE1' },
    { name: 'Accent Blue', hex: '#3B82F6' },
    { name: 'Emerald Live', hex: '#10B981' },
    { name: 'Obsidian Dark', hex: '#181920' },
  ];

  const handleCopyCode = () => {
    const code = `// Design System Button Component
export const Button = ({ variant = '${selectedVariant}', children }) => (
  <motion.button 
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="btn btn--${selectedVariant}"
    style={{ borderColor: '${activeColor}' }}
  >
    {children}
  </motion.button>
);`;
    navigator.clipboard?.writeText?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hero-craft-widget" role="region" aria-label="Interactive Design System & Code Showcase">
      {/* Top Window Navigation Bar */}
      <div className="craft-widget-header">
        <div className="craft-window-dots" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>

        {/* Tab Switcher: Design vs Code */}
        <div className="craft-tab-switcher">
          <button
            type="button"
            className={`craft-tab-btn ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
            aria-selected={activeTab === 'design'}
          >
            <Layers size={13} />
            <span>Figma System</span>
          </button>
          <button
            type="button"
            className={`craft-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
            aria-selected={activeTab === 'code'}
          >
            <Code2 size={13} />
            <span>React Code</span>
          </button>
        </div>

        <div className="craft-live-beacon" title="Design System Engine Active">
          <span className="craft-beacon-pulse" />
          <span className="craft-beacon-dot" />
          <span className="craft-beacon-text">Ready</span>
        </div>
      </div>

      {/* Main Canvas Stage */}
      <div className="craft-widget-body">
        {activeTab === 'design' ? (
          /* DESIGN SYSTEM / FIGMA CANVAS MODE */
          <div className="craft-design-canvas">
            {/* Blueprint Grid Crosshairs */}
            <div className="craft-crosshair craft-crosshair--tl" aria-hidden="true">+</div>
            <div className="craft-crosshair craft-crosshair--tr" aria-hidden="true">+</div>
            <div className="craft-crosshair craft-crosshair--bl" aria-hidden="true">+</div>
            <div className="craft-crosshair craft-crosshair--br" aria-hidden="true">+</div>

            {/* Floating Auto-Layout Specs Bar */}
            <div className="craft-specs-bar">
              <span className="craft-spec-item">
                <span className="craft-spec-key">Auto-Layout:</span> 12px gap
              </span>
              <span className="craft-spec-divider">•</span>
              <span className="craft-spec-item">
                <span className="craft-spec-key">Radius:</span> 999px
              </span>
              <span className="craft-spec-divider">•</span>
              <span className="craft-spec-item">
                <span className="craft-spec-key">WCAG:</span> AAA
              </span>
            </div>

            {/* Live Interactive Component Card */}
            <div className="craft-component-preview-box">
              <div className="craft-preview-meta">
                <span className="craft-preview-label">Live Component Preview</span>
                <span className="craft-preview-status">Interactive</span>
              </div>

              {/* Variant Selector Pills */}
              <div className="craft-variant-selector">
                <span className="craft-variant-hint">Variant:</span>
                {['primary', 'glass', 'glow'].map((variant) => (
                  <button
                    key={variant}
                    type="button"
                    className={`craft-variant-chip ${selectedVariant === variant ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant}
                  </button>
                ))}
              </div>

              {/* The Clickable Interactive Component */}
              <div className="craft-interactive-action-area">
                <button
                  type="button"
                  className={`craft-live-btn craft-live-btn--${selectedVariant} ${buttonPressed ? 'pressed' : ''}`}
                  style={{
                    '--theme-color': activeColor,
                    ...(selectedVariant === 'glow' ? { boxShadow: `0 10px 28px -4px ${activeColor}55` } : {})
                  }}
                  onMouseDown={() => setButtonPressed(true)}
                  onMouseUp={() => setButtonPressed(false)}
                  onMouseLeave={() => setButtonPressed(false)}
                  onClick={() => {
                    setButtonPressed(true);
                    setTimeout(() => setButtonPressed(false), 200);
                  }}
                >
                  <Sparkles size={15} className="craft-btn-sparkle" />
                  <span>Click to Interact</span>
                  <span className="craft-btn-kbd">⌘K</span>
                </button>
              </div>

              {/* Color Tokens Palette Strip */}
              <div className="craft-tokens-row">
                <span className="craft-tokens-title">Design Tokens:</span>
                <div className="craft-swatches">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      className={`craft-swatch ${activeColor === c.hex ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setActiveColor(c.hex)}
                      title={`${c.name} (${c.hex})`}
                      aria-label={`Select ${c.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Collaborative Designer Cursor (Muhammed K) */}
            <div className="craft-designer-cursor" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="craft-cursor-arrow">
                <path
                  d="M5.5 3.5L19 11.5L12 13.5L8.5 20.5L5.5 3.5Z"
                  fill="#7C5CE1"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="craft-cursor-pill">
                <span className="craft-cursor-name">Muhammed K</span>
                <span className="craft-cursor-badge">Design Lead</span>
              </span>
            </div>
          </div>
        ) : (
          /* CODE / REACT MODE */
          <div className="craft-code-canvas">
            <div className="craft-code-header">
              <div className="craft-code-file">
                <Code2 size={13} className="craft-file-icon" />
                <span>Button.tsx</span>
                <span className="craft-file-tag">TypeScript · React</span>
              </div>
              <button
                type="button"
                className="craft-copy-btn"
                onClick={handleCopyCode}
                title="Copy component code"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="craft-code-body">
              <code>
                <span className="syntax-keyword">import</span> React <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;{'\n'}
                <span className="syntax-keyword">import</span> {'{ motion }'} <span className="syntax-keyword">from</span> <span className="syntax-string">'framer-motion'</span>;{'\n\n'}
                <span className="syntax-comment">// Human-centered Design System Token</span>{'\n'}
                <span className="syntax-keyword">export const</span> <span className="syntax-function">Button</span> = ({'{'}
                {'\n'}  variant = <span className="syntax-string">'{selectedVariant}'</span>,{'\n'}  color = <span className="syntax-string">'{activeColor}'</span>,{'\n'}  children{'\n'}
                {'}'}) =&gt; ({'\n'}  &lt;<span className="syntax-tag">motion.button</span>{'\n'}    <span className="syntax-attr">whileHover</span>={'{{ scale: 1.03, y: -2 }}'}{'\n'}    <span className="syntax-attr">whileTap</span>={'{{ scale: 0.97 }}'}{'\n'}    <span className="syntax-attr">className</span>={`btn btn--${'{variant}'}`}{'\n'}    <span className="syntax-attr">style</span>={'{{ borderColor: color }}'}{'\n'}  &gt;{'\n'}    {'{children}'}{'\n'}  &lt;/<span className="syntax-tag">motion.button</span>&gt;{'\n'});
              </code>
            </pre>

            <div className="craft-code-footer">
              <span className="craft-code-status">✓ 0 Errors</span>
              <span className="craft-code-stat">60 FPS Motion Optimized</span>
              <span className="craft-code-stat">Strict Mode</span>
            </div>
          </div>
        )}

        {/* Floating Smart Badges */}
        <div className="craft-float-badge craft-float-badge--top">
          <span className="craft-badge-icon">✦</span>
          <span>Figma Auto-Layout 5.0</span>
        </div>
        <div className="craft-float-badge craft-float-badge--bottom">
          <span className="craft-badge-icon">✦</span>
          <span>React 18 · TypeScript · Motion</span>
        </div>
      </div>

      {/* Widget Footer Strip: Tech Stack Chips */}
      <div className="craft-widget-footer">
        <p className="craft-footer-statement">
          Crafting thoughtful digital interfaces with pixel precision and clean engineering.
        </p>
        <div className="craft-footer-pills">
          <span className="craft-pill">UI/UX</span>
          <span className="craft-pill">FIGMA</span>
          <span className="craft-pill">REACT</span>
          <span className="craft-pill">TAILWIND</span>
          <span className="craft-pill">DESIGN SYSTEMS</span>
          <span className="craft-pill craft-pill--plus">+</span>
        </div>
      </div>
    </div>
  );
}


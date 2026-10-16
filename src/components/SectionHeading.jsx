import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  accentWords = [],
  description,
  centered = false,
  className = ''
}) {
  // Function to highlight selected words with orange accent
  const renderHighlightedTitle = () => {
    if (!accentWords || accentWords.length === 0) return title;
    
    // Split title by words and wrap matches in span.text-accent
    const words = title.split(' ');
    return words.map((word, i) => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
      const shouldHighlight = accentWords.some(accent => 
        cleanWord.toLowerCase() === accent.toLowerCase()
      );

      return (
        <React.Fragment key={i}>
          {shouldHighlight ? <span className="text-accent">{word}</span> : word}
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  const formatEyebrow = (text) => {
    if (!text) return null;
    const trimmed = String(text).trim();
    if (trimmed.startsWith('(') && trimmed.endsWith(')')) return trimmed;
    return `( ${trimmed.toUpperCase()} )`;
  };

  return (
    <div className={`section-header ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && <span className="section-tag-editorial">{formatEyebrow(eyebrow)}</span>}
      <h2 className="section-title">{renderHighlightedTitle()}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

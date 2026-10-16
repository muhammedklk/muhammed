import React from 'react';

export default function AvailabilityBadge({ label = "Available for Opportunities", className = "" }) {
  return (
    <div className={`availability-pill ${className}`} aria-label={label}>
      <span className="pulse-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

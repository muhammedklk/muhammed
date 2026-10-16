import React from 'react';
import { X, MapPin, Calendar, Camera } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div className="lightbox-backdrop animate-fade-in" onClick={onClose}>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="lightbox-close-btn" aria-label="Close photo modal">
          <X size={20} />
        </button>

        <div className="lightbox-img-wrapper">
          <img src={photo.url} alt={photo.title} className="lightbox-img" />
        </div>

        <div className="lightbox-meta-bar">
          <div>
            <h4 className="font-serif text-lg text-primary mb-1">{photo.title}</h4>
            <div className="d-flex align-items-center gap-3 text-xs text-muted-custom">
              <span className="d-flex align-items-center gap-1">
                <MapPin size={13} className="text-accent" />
                <span>{photo.location}</span>
              </span>
              <span className="d-flex align-items-center gap-1 font-mono">
                <Calendar size={13} />
                <span>{photo.date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background-color: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .lightbox-card {
          position: relative;
          max-width: 900px;
          max-height: 90vh;
          background-color: var(--bg-surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
        }

        .lightbox-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.6);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .lightbox-close-btn:hover {
          background-color: var(--accent-primary);
        }

        .lightbox-img-wrapper {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000000;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 70vh;
          object-fit: contain;
        }

        .lightbox-meta-bar {
          padding: 1.25rem 1.75rem;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
}
